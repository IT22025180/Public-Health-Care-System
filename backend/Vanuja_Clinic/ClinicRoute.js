const express = require('express');
const routerClnc = express.Router();
const ClinicController = require('./ClinicController');

routerClnc.post('/addClinic' , ClinicController.addClinic);
routerClnc.get('/Clinics' , ClinicController.getClinic);
routerClnc.post('/updateClinic' , ClinicController.updateClinic);
routerClnc.post('/deleteClinic' , ClinicController.deleteClinic);

module.exports = routerClnc;