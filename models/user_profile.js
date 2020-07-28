module.exports = function(sequelize, DataTypes) {
    var UserProfile = sequelize.define("UserProfile", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
      });
         
        UserProfile.associate=function(models){
        UserProfile.belongsTo (models.User,{foreignKey: {allowNull:false }})  
         
      };
      return UserProfile;
    }