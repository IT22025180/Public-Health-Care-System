const mongoose = require('mongoose');

const AddTDis = new mongoose.Schema({
    type : String,
    est_Date : String,
    quantity: Number,
},
{
    collection : "Triposha"
});

const Triposha = mongoose.model('Triposha',AddTDis);
module.exports = Triposha;