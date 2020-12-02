const Technology = require('../models').Technology;
const Employee = require('../models').Employee;
const TeamLead = require('../models').TeamLead;

module.exports = {
  list(req, res) {
    return Technology
      .findAll({
        include: [{
          model: Employee,
          as: 'employees'
        },{
          model: TeamLead,
          as: 'teamlead'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Employee, as: 'employees' }, 'createdAt', 'DESC'],
        ],
      })
      .then((technologies) => res.status(200).send(technologies))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Technology
      .findByPk(req.params.id, {
        include: [{
          model: Technology,
          as: 'technology'
        }],
      })
      .then((technology) => {
        if (!technology) {
          return res.status(404).send({
            message: 'Technology Not Found',
          });
        }
        return res.status(200).send(technology);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Technology
      .create({
        technology_name: req.body.technology_name,
      })
      .then((technology) => res.status(201).send(technology))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Technology
      .findByPk(req.params.id, {
        include: [{
          model: Technology,
          as: 'technology'
        }],
      })
      .then(technology => {
        if (!technology) {
          return res.status(404).send({
            message: 'Technology Not Found',
          });
        }
        return technology
          .update({
            technology_name: req.body.technology_name || floor.technology_name,
          })
          .then(() => res.status(200).send(technology))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Technology
      .findByPk(req.params.id)
      .then(technology => {
        if (!technology) {
          return res.status(400).send({
            message: 'Technology Not Found',
          });
        }
        return technology
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};