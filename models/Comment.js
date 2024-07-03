module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Card, {
            foreign: {
                allowNull: false
            }
        });
        Comment.belongsTo(models.User, {
            foreign: {
                allowNull: false
            }
        });
    };
    return Comment;
}