module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("Board", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bgImage: {
            type: DataTypes.STRING,
            allowNull:false
        },
        isStarred: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Board.associate = (models) => {
        Board.hasMany(models.List, {
            onDelete: "cascade"
        });
        Board.hasMany(models.Label, {
            onDelete: "cascade"
        });
        Board.belongsToMany(models.User, { through: models.User_Board });
    };

    return Board;
}