const mongoose = require('mongoose');

const AddVacApp = new mongoose.Schema({
    vname : String, 
    quantity: Number,
    date: String,
    location : String
},
{
    collection : "VacAppointments"
});

const VacAppointment = mongoose.model('VacAppointments',AddVacApp);
module.exports = VacAppointment;