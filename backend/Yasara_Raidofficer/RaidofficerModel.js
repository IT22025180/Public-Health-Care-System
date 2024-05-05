const mongoose = require('mongoose');

const addraidofficer = new mongoose.Schema({
    Name:String,
    Type:String , 
    Address :String,    
},
{
    collection : "RaidOfficer"
});

const raidofficer = mongoose.model('RaidOfficer',addraidofficer);
module.exports = raidofficer;