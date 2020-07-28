module.exports = function(sequelize, DataTypes) {
    var NecessaryExpense =sequelize.define("NecessaryExpense", {
        title: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        frequency: DataTypes.STRING,
        exceptions: DataTypes.TEXT
     }
    )
    NecessaryExpense.associate=function(models){
    NecessaryExpense.belongsTo (models.User,{foreignKey: {allowNull:false }})
    }
    return NecessaryExpense;
}
    
