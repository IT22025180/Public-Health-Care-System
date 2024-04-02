const mongoose = require('mongoose');

const AddVac = new mongoose.Schema({
    vname : String,
    manf_date : String,
    exp_Date: String,
    quantity: Number,
    notes : String,
},
{
    collection : "Vaccine"
});

const Vaccine = mongoose.model('Vaccine',AddVac);
module.exports = Vaccine;