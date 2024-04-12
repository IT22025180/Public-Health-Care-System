const mongoose = require('mongoose');

const addstaffvaccineSchema = new mongoose.Schema({
    type: String,
    staffmember: String,
    date: String,
    location: String,
    description: String,
}, {
    collection: "Vaccinestaff"
});

const Vaccinestaff = mongoose.model('Vaccinestaff', addstaffvaccineSchema);
module.exports = Vaccinestaff;
