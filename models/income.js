var moment = require('moment')

module.exports = function(sequelize, DataType) {
var Income =sequelize.define("Income", {
    title: DataType.STRING,
    amount: DataType.INTEGER,
    frequency: DataType.STRING,
    startDate: {
        type: DataType.STRING,
        allowNull: false,
        defaultvalue: moment().format("YYYYMMDD")
    },
    endDate: DataType.STRING
 }
)
Income.associate=function(models){
    Income.belongsTo (models.User,{foreignKey: {allowNull:false }})  
  
}
return Income;
}
