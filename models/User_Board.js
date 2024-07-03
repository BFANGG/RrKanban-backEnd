module.exports = (sequelize, DataTypes) => {
    const User_Board = sequelize.define('User_Board', {
        isAdmin: DataTypes.BOOLEAN
    }, 
    { 
        timestamps: false 
    });
    return User_Board;
}

