'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeTechnology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EmployeeTechnology.init({
    employee_id: DataTypes.INTEGER,
    technology_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EmployeeTechnology',
  });
  return EmployeeTechnology;
};