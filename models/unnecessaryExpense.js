module.exports = function(sequelize, DataTypes) {

var UnnecessaryExpense =sequelize.define("UnnecessaryExpense", {
    title: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    frequency: DataTypes.STRING
 }
)
UnnecessaryExpense.associate=function(models){
    UnnecessaryExpense.belongsTo (models.User,{foreignKey: {allowNull:false }})
}
return UnnecessaryExpense;
    
}