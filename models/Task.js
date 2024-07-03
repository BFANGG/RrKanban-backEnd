module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    }, {
        freezeTableName: true
    });

    Task.associate = (models) => {
        Task.belongsTo(models.Card, {
            foreign: {
                allowNull: false
            }
        });
    };
    return Task;
}