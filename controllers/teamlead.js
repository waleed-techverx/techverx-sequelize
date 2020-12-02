const TeamLead = require('../models').TeamLead;
const Technology = require('../models').Technology;

module.exports = {
  list(req, res) {
    return TeamLead
      .findAll({
        include: [{
          model: Technology,
          as: 'technology'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Technology, as: 'technology' }, 'createdAt', 'DESC'],
        ],
      })
      .then((teamleads) => res.status(200).send(teamleads))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return TeamLead
      .findByPk(req.params.id, {
        include: [{
          model: Technology,
          as: 'technology'
        }],
      })
      .then((teamlead) => {
        if (!teamlead) {
          return res.status(404).send({
            message: 'Teamlead Not Found',
          });
        }
        return res.status(200).send(teamlead);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return TeamLead
      .create({
        teamlead_name: req.body.teamlead_name,
      })
      .then((teamlead) => res.status(201).send(teamlead))
      .catch((error) => res.status(400).send(error));
  },

  addWithTechnology(req, res) {
    return TeamLead
      .create({
        teamlead_name: req.body.teamlead_name,
        technology: req.body.technology
      }, {
        include: [{
          model: Technology,
          as: 'technology'
        }]
      })
      .then((teamlead) => res.status(201).send(teamlead))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return TeamLead
      .findByPk(req.params.id, {
        include: [{
          model: Technology,
          as: 'technology'
        }],
      })
      .then(teamlead => {
        if (!teamlead) {
          return res.status(404).send({
            message: 'Teamlead Not Found',
          });
        }
        return teamlead
          .update({
            teamlead_name: req.body.teamlead_name || floor.teamlead_name,
          })
          .then(() => res.status(200).send(teamlead))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return TeamLead
      .findByPk(req.params.id)
      .then(teamlead => {
        if (!teamlead) {
          return res.status(400).send({
            message: 'Teamlead Not Found',
          });
        }
        return teamlead
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};