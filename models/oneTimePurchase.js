module.exports = function (sequelize, DataTypes) {
    var oneTimePurchase = sequelize.define("oneTimePurchase", {
        title: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        date: DataTypes.STRING
    })
    oneTimePurchase.associate = function (models) {
        oneTimePurchase.belongsTo(models.User, { foreignKey: {allowNull:false}})
    }
    return oneTimePurchase;
}

