var express = require('express');
var router = express.Router();

const floorController = require('../controllers').floor;
const employeeController = require('../controllers').employee;
const teamleadController = require('../controllers').teamlead;
const technologyController = require('../controllers').technology;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Floor Router */
router.get('/api/floor', floorController.list);
router.get('/api/floor/:id', floorController.getById);
router.post('/api/floor', floorController.add);
router.put('/api/floor/:id', floorController.update);
router.delete('/api/floor/:id', floorController.delete);

/* Employee Router */
router.get('/api/employee', employeeController.list);
router.get('/api/employee/:id', employeeController.getById);
router.post('/api/employee', employeeController.add);
router.put('/api/employee/:id', employeeController.update);
router.delete('/api/employee/:id', employeeController.delete);

/* TeamLead Router */
router.get('/api/leamlead', teamleadController.list);
router.get('/api/leamlead/:id', teamleadController.getById);
router.post('/api/leamlead', teamleadController.add);
router.put('/api/leamlead/:id', teamleadController.update);
router.delete('/api/leamlead/:id', teamleadController.delete);

/* Technology Router */
router.get('/api/technology', technologyController.list);
router.get('/api/technology/:id', technologyController.getById);
router.post('/api/technology', technologyController.add);
router.put('/api/technology/:id', technologyController.update);
router.delete('/api/technology/:id', technologyController.delete);

/* Advance Router */
router.post('/api/employee/add_technology', employeeController.addTechnology);
router.post('/api/floor/add_with_employee', floorController.addWithEmployees);
router.post('/api/teamlead/add_with_technology', teamleadController.addWithTechnology);

module.exports = router;