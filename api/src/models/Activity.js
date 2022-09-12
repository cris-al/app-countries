const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('activity', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty:{
            type: DataTypes.STRING,
            allowNull: false
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false
        },
        season:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}