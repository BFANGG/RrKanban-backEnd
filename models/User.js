module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'http://localhost:3001/images/defaultAvatar.png'
        }
    }, {
        freezeTableName: true
    });

    User.associate = (models) => {
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
         User.belongsToMany(models.Board, { through: models.User_Board });
         User.belongsToMany(models.Card, { through: models.User_Card });
    }

    return User;
}