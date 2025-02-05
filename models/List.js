module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("List", {
        listTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        index:{
            type: DataTypes.INTEGER,
        }
    }, {
        freezeTableName: true
    });

    List.associate = (models) => {
        List.hasMany(models.Card, {
            onDelete: "cascade"
        });
        List.belongsTo(models.Board, {
            foreign: {
                allowNull: false
            }
        });
    };

    return List;
}