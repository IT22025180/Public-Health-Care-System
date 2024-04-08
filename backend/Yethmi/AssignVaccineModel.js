const mongoose = require('mongoose');

const addstaffvaccine= new mongoose.Schema({
    type:String,  
    staffmember:String,    
    date:String,
    location:String,
    description:String, 
},
{
    collection : "Vaccinestaff"
});

const vaccinestaff = mongoose.model('Vaccinestaff',addstaffvaccine);
module.exports = vaccinestaff;