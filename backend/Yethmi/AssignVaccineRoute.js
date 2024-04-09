const express = require('express');
const routerVS = express.Router();
const Vaccine_staffcontroller = require('./AssignVaccineController');

routerVS.post('/api/addstaffvaccine' , Vaccine_staffcontroller.addstaffvaccine);
routerVS.get('/api/getstaffvaccine' , Vaccine_staffcontroller.getstaffvaccine);
routerVS.post('/api/updatestaffvaccine' , Vaccine_staffcontroller.updatestaffvaccine);
routerVS.post('/api/deletestaffvaccine' , Vaccine_staffcontroller.deletestaffvaccine);

module.exports = routerVS;
