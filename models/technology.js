'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Technology.belongsToMany(models.Employee, {
        through: 'EmployeeTechnology',
        as: 'employees',
        foreignKey: 'technology_id'
      });
      Technology.belongsTo(models.TeamLead, {
        foreignKey: 'teamlead_id',
        as: 'teamlead'
      });
    }
  };
  Technology.init({
    teamlead_id: DataTypes.INTEGER,
    technology_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Technology',
  });
  return Technology;
};