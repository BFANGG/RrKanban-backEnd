module.exports = (sequelize, DataTypes) => {
    const Label_Card = sequelize.define('Label_Card', {

    },
    { 
        timestamps: false 
    });
    return Label_Card;
}
