const mongoose = require('mongoose');

const AddDocM = new mongoose.Schema({
    r_id : String, 
    ro_name : String,
    date : String,
    v_name : String,
    v_type : String,
    documents : String
},
{
    collection : "DocumentM"
});

const DocM = mongoose.model('DocumentM',AddDocM);
module.exports = DocM;