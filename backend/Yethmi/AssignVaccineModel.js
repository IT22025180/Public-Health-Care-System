const mongoose = require('mongoose');

const addstaffvaccine= new mongoose.Schema({
    v_type:String,  
    v_staffmember:String,    
    v_date:String,
    v_location:String,
    v_description:String, 
},
{
    collection : "Vaccinestaff"
});

const vaccinestaff = mongoose.model('Vaccinestaff',addstaffvaccine);
module.exports = vaccinestaff;