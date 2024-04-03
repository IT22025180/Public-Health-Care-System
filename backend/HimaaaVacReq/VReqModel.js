const mongoose = require('mongoose');

const AddReqVac = new mongoose.Schema({
    vName : String, 
    quantity: Number,
},
{
    collection : "VaccineReq"
});

const VaccineRq = mongoose.model('VaccineReq',AddReqVac);
module.exports = VaccineRq;