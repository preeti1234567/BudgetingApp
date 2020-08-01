module.exports = function (sequelize, DataTypes) {
    var oneTimePurchase = sequelize.define("oneTimePurchase", {
        title: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        exceptions: DataTypes.TEXT,
    })
    oneTimePurchase.associate = function (models) {
        oneTimePurchase.belongsTo(models.User, { foreignKey: {allowNull:false}})
    }
    return oneTimePurchase;
}

