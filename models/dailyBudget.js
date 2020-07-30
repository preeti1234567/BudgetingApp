

module.exports = function (sequelize, DataTypes) {
    var DailyBudget = sequelize.define("dailyBudget", {
        date: DataTypes.STRING,
        dailySaving: DataTypes.INTEGER,
    });
    DailyBudget.associate = function (models) {
        DailyBudget.belongsTo(models.User, { foreignKey: { allowNull: false } })
    }

    DailyBudget.prototype.filterExceptions = function(unnecessaryExpenses, date) {

        for (const expense of unnecessaryExpenses) {
            var exceptions = unnecessaryExpenses.exceptions
            var exceptionsArr = exceptions.split(",")
            if (date in exceptionsArr) {
                delete unnecessaryExpenses.expense
            }
        }
    }

    DailyBudget.prototype.getSavingsForDate = async function(expenseObj, date) {
        // The expense Obj is the result of gathering all expense data.
        var income = expenseObj.income
        var unnecessaryExpenses = expenseObj.unnecessaryExpenses
        var necessaryExpenses = expenseObj.necessaryExpenses
        DailyBudget.filterExceptions(unnecessaryExpenses, date)

        var totalSavings = 0
        for (const row of income) {
            totalSavings += row.amount
        }
        for (const row of unnecessaryExpenses) {
            totalSavings -= row.amount
        }
        for (const row of necessaryExpenses) {
            totalSavings -= row.amount
        }
        console.log("Running")

        return {dailySaving: totalSavings, date: date}


    }

    return DailyBudget;

}

