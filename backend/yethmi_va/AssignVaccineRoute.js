const express = require('express');
const routerVS = express.Router();
const Vaccine_staffcontroller = require('./AssignVaccineController');

<<<<<<< HEAD
routerVS.post('/addstaffvaccine', Vaccine_staffcontroller.addstaffvaccine);
routerVS.get('/getstaffvaccine', Vaccine_staffcontroller.getstaffvaccine);
routerVS.post('/updatestaffvaccine', Vaccine_staffcontroller.updatestaffvaccine);
routerVS.post('/deletestaffvaccine', Vaccine_staffcontroller.deletestaffvaccine);
=======
routerVS.post('/addstaffvaccine' , Vaccine_staffcontroller.addstaffvaccine);
routerVS.get('/getstaffvaccine' , Vaccine_staffcontroller.getstaffvaccine);
routerVS.post('/updatestaffvaccine' , Vaccine_staffcontroller.updatestaffvaccine);
routerVS.post('/deletestaffvaccine' , Vaccine_staffcontroller.deletestaffvaccine);
>>>>>>> 99e4d552 (Yethmi)

module.exports = routerVS;
