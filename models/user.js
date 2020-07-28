
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.hasMany(models.Income, { onDelete: "cascade" });
    User.hasMany(models.NecessaryExpense, { onDelete: "cascade" });
    User.hasMany(models.UnnecessaryExpense, { onDelete: "cascade" });
    User.hasMany(models.dailyBudget, { onDelete: "cascade" });
  };
  return User;
}


