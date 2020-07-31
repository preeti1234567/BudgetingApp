
function stripDateDashes(date) {
    return date.replace(/-/g, "")
}
function getDatesSince(startDate) {
    // startDate will already be stripped of dashes
    startDate = stripDateDashes(startDate)
    var stopDate = moment()
    var dateArray = [];
    var currentDate = moment(startDate)
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format("YYYYMMDD"))
        currentDate = moment(currentDate).add(1, 'days')
    }
    return dateArray

}


async function getBudgetData() {
    $.ajax({ method: "GET", url: "/api/user_data" }).then(function (res) {
        var startDate = res.startDate
        console.log(startDate)
        startDate = stripDateDashes(startDate)
        var dateArr = getDatesSince(startDate)
        var budgetHistory = []

        function makeCall(counter, expenseObj) {
            if (counter === dateArr.length) {
                console.log(budgetHistory)
                renderHistory(budgetHistory)
            }
            else {
                date = dateArr[counter]
                queryUrl = "/api/dailyBudget/" + date

                $.ajax({ method: "POST", url: queryUrl, data: expenseObj }).then(function (result) {
                    console.log(result)
                    budgetHistory.push(result)
                    counter++
                    makeCall(counter, expenseObj)
                })

            }
        }

        $.ajax({ method: "GET", url: "/api/all" }).then(response => {
            var expenseObj = response
            for (key in expenseObj) {
                var array = expenseObj[key]
                expenseObj[key] = JSON.stringify(array)
            }

            makeCall(0, expenseObj)

        })
    })
}

function renderHistory(budgetHistory) {
    var xData = [0]
    var yData = [0]
    var xCounter = 1
    var yCounter = 0
    for (i=0; i<budgetHistory.length; i++) {
        xData.push(xCounter),
        yData.push(budgetHistory[i])
        xCounter++;
        yCounter++;
    }

    var data = {
      labels: xData,
      series: [yData]
    };
    new Chartist.Line('.ct-chart', data)
}

console.log("Im here")
getBudgetData()

// Aidan's Stuff
