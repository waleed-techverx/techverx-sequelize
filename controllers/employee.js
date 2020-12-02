const Employee = require('../models').Employee;
const Floor = require('../models').Floor;
const Technology = require('../models').Technology;

module.exports = {
  list(req, res) {
    return Employee
      .findAll({
        include: [{
          model: Floor,
          as: 'floor'
        },{
          model: Technology,
          as: 'technologies'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Technology, as: 'technologies' }, 'createdAt', 'DESC'],
        ],
      })
      .then((employees) => res.status(200).send(employees))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Employee
      .findByPk(req.params.id, {
        include: [{
          model: Floor,
          as: 'floor'
        },{
          model: Technology,
          as: 'technologies'
        }],
      })
      .then((employee) => {
        if (!employee) {
          return res.status(404).send({
            message: 'Employee Not Found',
          });
        }
        return res.status(200).send(employee);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Employee
      .create({
        floor_id: req.body.floor_id,
        employee_name: req.body.employee_name,
      })
      .then((employee) => res.status(201).send(employee))
      .catch((error) => res.status(400).send(error));
  },

  addTechnology(req, res) {
    return Employee
      .findByPk(req.body.employee_id, {
        include: [{
          model: Floor,
          as: 'floor'
        },{
          model: Technology,
          as: 'technologies'
        }],
      })
      .then((employee) => {
        if (!employee) {
          return res.status(404).send({
            message: 'Employee Not Found',
          });
        }
        Technology.findByPk(req.body.technology_id).then((technology) => {
          if (!technology) {
            return res.status(404).send({
              message: 'Technology Not Found',
            });
          }
          employee.addTechnology(technology);
          return res.status(200).send(employee);
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Employee
      .findByPk(req.params.id, {
        include: [{
          model: Floor,
          as: 'floor'
        },{
          model: Technology,
          as: 'technologies'
        }],
      })
      .then(employee => {
        if (!employee) {
          return res.status(404).send({
            message: 'Employee Not Found',
          });
        }
        return employee
          .update({
            employee_name: req.body.employee_name || employee.employee_name,
          })
          .then(() => res.status(200).send(employee))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Employee
      .findByPk(req.params.id)
      .then(employee => {
        if (!employee) {
          return res.status(400).send({
            message: 'Employee Not Found',
          });
        }
        return employee
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};