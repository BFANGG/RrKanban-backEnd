module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define("Label", {
        text: {
            type: DataTypes.STRING,
            allowNull:true
        },
        color: {
            type:  DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Label.associate = (models) => {
        Label.belongsTo(models.Board, {
            foreign: {
                allowNull: true
            }
        });
        Label.belongsToMany(models.Card, { through: models.Label_Card });
    };
    return Label;
}