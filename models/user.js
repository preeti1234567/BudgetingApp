var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = function (models) {
    User.hasMany(models.Income, { onDelete: "cascade" });
    User.hasMany(models.NecessaryExpense, { onDelete: "cascade" });
    User.hasMany(models.UnnecessaryExpense, { onDelete: "cascade" });
    User.hasMany(models.dailyBudget, { onDelete: "cascade" });
    User.hasMany(models.oneTimePurchase, { onDelete: "cascade" });
  };
  return User;
}


