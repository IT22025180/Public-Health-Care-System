const express = require('express');
const routerRA = express.Router();
const Raids_staffcontroller = require('./AssignRaidsController');


routerRA.post('/addstaffraids', Raids_staffcontroller.addstaffraids);
routerRA.get('/getstaffraids', Raids_staffcontroller.getstaffraids);
routerRA.put('/updatestaffraids', Raids_staffcontroller.updatestaffdraids);
routerRA.delete('/deletestaffraids', Raids_staffcontroller.deleteRaidAssignment);

module.exports = routerRA;
