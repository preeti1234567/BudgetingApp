var moment = require("moment")

module.exports = function(sequelize, DataTypes) {

var UnnecessaryExpense =sequelize.define("UnnecessaryExpense", {
    title: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    frequency: DataTypes.STRING, 
    exceptions: DataTypes.TEXT
 }
)

UnnecessaryExpense.prototype.isTodayException = function() {
    var today = moment().format("YYYYMMDD")
    var exceptionDates = this.parseExceptions()
    if (today in exceptionDates) {
        return true
    }
    return false
}
UnnecessaryExpense.prototype.parseExceptions = function() {
    if (!this.exceptions) {
        return []
    }
    var unparsedDates = this.exceptions
    var dateArr = unparsedDates.split(",")
    return dateArr
}

UnnecessaryExpense.associate=function(models){
    UnnecessaryExpense.belongsTo (models.User,{foreignKey: {allowNull:false }})
}
return UnnecessaryExpense;
    
}