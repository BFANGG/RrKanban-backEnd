module.exports = (sequelize, DataTypes) => {
    const User_Card = sequelize.define('User_Card', {

    },
    { 
        timestamps: false 
    });
    return User_Card;
}
