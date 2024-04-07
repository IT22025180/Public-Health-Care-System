const mongoose = require('mongoose');

const AddReportVio = new mongoose.Schema({
    ro_name : String, 
    ro_email : String,
    ro_mobile : Number,
    date : String,
    v_location : String,
    v_type : String,
    v_description : String,
    v_name : String ,
    v_email : String,
    v_mobile : Number,    
    evidance : String,
    v_nic : Number
},
{
    collection : "ViolationReport"
});

const VioReport = mongoose.model('ViolationReport',AddReportVio);
module.exports = VioReport;