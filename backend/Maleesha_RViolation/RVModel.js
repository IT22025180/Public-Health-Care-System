const mongoose = require('mongoose');

const AddReportVio = new mongoose.Schema({
    ro_name : String, 
    ro_email : String,
    ro_mobile : Number,
    v_location : String,
    v_type : String,
    v_description : String,
    v_name : String ,
    v_nic : Number,
    v_mobile : Number,
    v_email : String,
    evidance : String
},
{
    collection : "ViolationReport"
});

const VioReport = mongoose.model('ViolationReport',AddReportVio);
module.exports = VioReport;