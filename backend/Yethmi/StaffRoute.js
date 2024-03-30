const express = require('express');
const routerST = express.Router();
const StaffController = require('./StaffController');

routerST.post('/addStaff' , StaffController.addStaff);
routerST.get('/Staff' , StaffController.getStaff);
routerST.post('/updateStaff' , StaffController.updateStaff);
routerST.post('/deleteStaff' , StaffController.deleteStaff);

module.exports = routerST;