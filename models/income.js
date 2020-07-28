module.exports = function(sequelize, DataType) {
var Income =sequelize.define("Income", {
    title: DataType.STRING,
    amount: DataType.INTEGER,
    frequency: DataType.STRING
 }
)
Income.associate=function(models){
    Income.belongsTo (models.User,{foreignKey: {allowNull:false }})  
  
}
return Income;
}
