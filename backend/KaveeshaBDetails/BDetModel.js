const mongoose = require('mongoose');

const AddBaby = new mongoose.Schema({
    bname : String,
    age : Number,
    weight: Number,
    c_no : String,
    notes : String
},
{
    collection : "Baby"
});

const Baby = mongoose.model('Baby',AddBaby);
module.exports = Baby;