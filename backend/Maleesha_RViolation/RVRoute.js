const express = require('express');
const routerVReport = express.Router();
const VioReportController = require('./RVController');

routerVReport.post('/addVioR' , VioReportController.addVioReport);
routerVReport.get('/VioReports' , VioReportController.getVioReport);
routerVReport.post('/updateVioR' , VioReportController.updateVioReport);
routerVReport.post('/deleteVioR' , VioReportController.deleteVioReport);

module.exports = routerVReport;