const express = require('express');
const routerCmp = express.Router();
const ComplainController = require('./ComplainController');

routerCmp.post('/addComplain' , ComplainController.addComplain);
routerCmp.get('/Complain' , ComplainController.getComplain);
routerCmp.post('/updateComplain' , ComplainController.updateComplain);
routerCmp.post('/deleteComplain' , ComplainController.deleteComplain);

module.exports = routerCmp;