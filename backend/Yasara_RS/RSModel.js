const mongoose = require('mongoose');

const AddRaidSub = new mongoose.Schema({
    location: String,
    details: String,
    specialNotes : String,
},
{
    collection : "RaidSubmission"
});

const RS = mongoose.model('RaidSubmission',AddRaidSub);
module.exports = RS;

