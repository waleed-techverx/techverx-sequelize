'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamLead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamLead.hasOne(models.Technology, {
        foreignKey: 'teamlead_id',
        as: 'technology',
      });
    }
  };
  TeamLead.init({
    teamlead_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TeamLead',
  });
  return TeamLead;
};