const mongoose = require('mongoose');

const AddComplain = new mongoose.Schema({

    fname: String,
    lname: String,
    mobile: Number,
    email: String,
    NIC: Number,
    yaddress: String,
    ctype: String,
    cdesc: String,
    images: String,
    area: String,
    location: String
},
{
    collection : "Complains"
});

const Complains = mongoose.model('Complains',AddComplain);
module.exports = Complains;