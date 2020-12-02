'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Floor, {
        foreignKey: 'floor_id',
        as: 'floor'
      });
      Employee.belongsToMany(models.Technology, {
        through: 'EmployeeTechnology',
        as: 'technologies',
        foreignKey: 'employee_id'
      });
    }
  };
  Employee.init({
    floor_id: DataTypes.INTEGER,
    employee_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};