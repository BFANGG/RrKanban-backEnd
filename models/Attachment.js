module.exports = (sequelize, DataTypes) => {
    const Attachment = sequelize.define("Attachment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type:{
            type:DataTypes.STRING,
            defaultValue:false
        },
        path:{
            type:DataTypes.STRING,
            defaultValue:false
        }
    }, {
        freezeTableName: true
    });

    Attachment.associate = (models) => {
        Attachment.belongsTo(models.Card, {
            foreign: {
                allowNull: false
            }
        });
    };
    return Attachment;
}