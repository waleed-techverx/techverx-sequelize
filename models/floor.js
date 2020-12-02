'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Floor.hasMany(models.Employee, {
        foreignKey: 'floor_id',
        as: 'employees',
      });
    }
  };
  Floor.init({
    floor_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Floor',
  });
  return Floor;
};