const express = require('express');
const routerDocM = express.Router();
const DocMController = require('./DocMController');

routerDocM.post('/addDocM' , DocMController.addDocM);
routerDocM.get('/Documents' , DocMController.getDocM);
routerDocM.post('/updateDocM' , DocMController.updateDocM);
routerDocM.post('/deleteDocM' , DocMController.deleteDocM);

module.exports = routerDocM;