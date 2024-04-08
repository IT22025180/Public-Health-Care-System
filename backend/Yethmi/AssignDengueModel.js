const mongoose = require('mongoose');

const addstaffdengue = new mongoose.Schema({
    type:String,  
    staffmember:String,    
    date:String,
    location:String,
    description:String, 
},
{
    collection : "Denguestaff"
});

const denguestaff = mongoose.model('Denguestaff',addstaffdengue);
module.exports = denguestaff;