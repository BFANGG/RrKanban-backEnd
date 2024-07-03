module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define("Card", {
        cardTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        index: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: true
    });

    Card.associate = (models) => {
        Card.hasMany(models.Task, {
            onDelete: "cascade"
        });
        Card.hasMany(models.Comment, {
            onDelete: "cascade"
        });
        Card.hasMany(models.Attachment, {
            onDelete: "cascade"
        });

        Card.belongsToMany(models.Label, { through: models.Label_Card });
        Card.belongsToMany(models.User, { through: models.User_Card });

    };

    return Card;
}