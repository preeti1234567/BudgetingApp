
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
        startDate = stripDateDashes(startDate)
        var dateArr = getDatesSince(startDate)
        var budgetHistory = []

        function makeCall(counter, expenseObj) {
            if (counter === dateArr.length) {
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
    console.log(budgetHistory)
}

console.log("Im here")
getBudgetData()

// Aidan's Stuff
