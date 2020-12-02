const Floor = require('../models').Floor;
const Employee = require('../models').Employee;

module.exports = {
  list(req, res) {
    return Floor
      .findAll({
        include: [{
          model: Employee,
          as: 'employees'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Employee, as: 'employees' }, 'createdAt', 'DESC'],
        ],
      })
      .then((floors) => res.status(200).send(floors))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Floor
      .findByPk(req.params.id, {
        include: [{
          model: Employee,
          as: 'employees'
        }],
      })
      .then((floor) => {
        if (!floor) {
          return res.status(404).send({
            message: 'Floor Not Found',
          });
        }
        return res.status(200).send(floor);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Floor
      .create({
        floor_name: req.body.floor_name,
      })
      .then((floor) => res.status(201).send(floor))
      .catch((error) => res.status(400).send(error));
  },

  addWithEmployees(req, res) {
    return Floor
      .create({
        floor_name: req.body.floor_name,
        employees: req.body.employees,
      }, {
      	include: [{
          model: Employee,
          as: 'employees'
        }]
      })
      .then((floor) => res.status(201).send(floor))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Floor
      .findByPk(req.params.id, {
        include: [{
          model: Employee,
          as: 'employees'
        }],
      })
      .then(floor => {
        if (!floor) {
          return res.status(404).send({
            message: 'Floor Not Found',
          });
        }
        return floor
          .update({
            floor_name: req.body.floor_name || floor.floor_name,
          })
          .then(() => res.status(200).send(floor))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Floor
      .findByPk(req.params.id)
      .then(floor => {
        if (!floor) {
          return res.status(400).send({
            message: 'Floor Not Found',
          });
        }
        return floor
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};