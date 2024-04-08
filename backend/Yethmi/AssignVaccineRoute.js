const express = require('express');
const routerVS = express.Router();
const Vaccine_staffcontroller = require('./AssignVaccineController');

routerDS.post('/addstaffvaccine' , Vaccine_staffcontroller.addstaffvaccine);
routerDS.get('/getstaffvaccine' , Vaccine_staffcontroller.getstaffvaccine);
routerDS.post('/updatestaffvaccine' , Vaccine_staffcontroller.updatestaffvaccine);
routerDS.post('/deletestaffvaccine' , Vaccine_staffcontroller.deletestaffvaccine);

module.exports = routerVS;