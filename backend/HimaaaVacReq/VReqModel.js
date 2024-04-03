const mongoose = require('mongoose');

const AddReqVac = new mongoose.Schema({
    vname : String, 
    quantity: Number,
},
{
    collection : "VaccineReq"
});

const VaccineRq = mongoose.model('VaccineReq',AddReqVac);
module.exports = VaccineRq;