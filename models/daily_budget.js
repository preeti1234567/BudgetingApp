module.exports = function(sequelize, DataTypes) {
    var dailyBudget = sequelize.define("dailyBudget", {
        
        date: DataTypes.STRING,
        dailysaving: DataTypes.INTEGER,
      });
      dailyBudget.associate=function(models){
    dailyBudget.belongsTo (models.User,{foreignKey: {allowNull:false }})
}
    return dailyBudget;
     
}