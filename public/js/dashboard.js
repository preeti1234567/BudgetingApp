$(document).ready(function () {


    $('.dropdown-trigger').dropdown();

    displayFinancials('all')

    $(".finance-choice").on("click", function() {
        var id = $(this).attr('id')
        displayFinancials(id)
    })

    function displayFinancials(budgetType) {
        var financials = $('#financials')
        $(financials).empty()
        var oneTimePurchase = $('#oneTimePurchase');
        $(oneTimePurchase).empty()
        $.ajax({ method: "GET", url: "/api/all" }).then(function (res) {
            console.log(res)
            console.log(budgetType)
            if (budgetType ==='all' && res.oneTimePurchase.length === 1) {
                var saving = 0;
                for (const row of res.income) {
                    saving = saving + row.amount
                }
                for (const row of res.necessaryExpenses) {
                    saving = saving - row.amount
                }
                for (const row of res.unnecessaryExpenses) {
                    saving = saving - row.amount
                }
                $(oneTimePurchase).append(createCard({heading:"Daily Saving", amount: "$" + saving + " per day"}, "saving"))
                $(oneTimePurchase).append(createCard({heading:"One Time Purchase",title:res.oneTimePurchase[0].title, amount: "Total Cost : $" + res.oneTimePurchase[0].amount }, "onetime"))
                $(oneTimePurchase).append(createCard({heading:"One Time Purchase Estimate", amount: "You can purchase after " + Math.floor(res.oneTimePurchase[0].amount/saving) + " days" }, "estimate"))
            }
            
            if (budgetType ==='all' || budgetType === 'income') {
                for (const row of res.income) {
                    
                    var card = createCard(row, "income")
                    console.log(card)
                    $(financials).append(card)
                }
            }

            if (budgetType ==='all' || budgetType === 'necessary') {
                for (const row of res.necessaryExpenses) {
                    $(financials).append(createCard(row, "necessary"))
                }
            }

            if (budgetType ==='all' || budgetType === 'unnecessary') {
                for (const row of res.unnecessaryExpenses) {
                    $(financials).append(createCard(row, "unnecessary"))
                }
            }
        })
    }

    function createCard(rowElement, budgetType) {

        console.log(rowElement)
        if (budgetType === "saving" || budgetType === "onetime" || budgetType === "estimate") {
            var card = $('<div class="card green lighten-4" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content">')
            var cardTitle = $('<span class="card-title">')
            cardTitle.text(rowElement.heading)
            if(rowElement.title !== ""){
            var expenseType = $('<p>')
            expenseType.text(rowElement.title)
            }
            var averageDailyCost = $('<p>')
            averageDailyCost.text(rowElement.amount)
            cardContent.append(cardTitle)
            if(rowElement.title !== ""){cardContent.append(expenseType)}
            cardContent.append(averageDailyCost)
            card.append(cardContent)

        }

        if (budgetType === "income") {

            var card = $('<div class="card green lighten-4" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content">')
            var cardTitle = $('<span class="card-title">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Income")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("+ $" + rowElement.amount + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)

        }

        else if (budgetType === "necessary") {
            var card = $('<div class="card red lighten-2" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content">')
            var cardTitle = $('<span class="card-title">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Necessary Expense")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("- $" + rowElement.amount + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)
    

        }

        else if (budgetType === "unnecessary") {
            
            var card = $('<div class="card red lighten-2" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content">')
            var cardTitle = $('<span class="card-title">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Unnecessary expense")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("- $" + rowElement.amount + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)


        }

        return card


    }

    function stripDateDashes(date) {
        return date.replace(/-/g, "")
    }

    function convertUTC(date) {
        date = parseInt(date)
        date -= 1
        return String(date)
    }

    function getDatesSince(startDate) {
        // startDate will already be stripped of dashes
        startDate = stripDateDashes(startDate)
        startDate = convertUTC(startDate)
        console.log(startDate)
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
        for (i = 0; i < budgetHistory.length; i++) {
            xData.push(xCounter),
            yCounter += budgetHistory[i].dailySaving
            yData.push(yCounter)
            xCounter++;
        }

        var data = {
            labels: xData,
            series: [yData]
        };

        new Chartist.Line('.ct-chart', data)
    }

    console.log("Im here")
    getBudgetData()

});

// Aidan's Stuff
