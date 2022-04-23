const { raw } = require('body-parser');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
        // get(){
        //   const rawId = this.getDataValue('id');
        //   return  "DB" + rawId;
        // },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey:true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      }
    },
    directions: {
      type: DataTypes.TEXT,
    }
  }, {
    timestamps: false
  });
};
