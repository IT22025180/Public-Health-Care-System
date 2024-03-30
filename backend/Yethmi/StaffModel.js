const mongoose = require('mongoose');

const AddStaff = new mongoose.Schema({
    name : String,
    email : String,
    mobile: Number,
    position: String,
    leavestrt : String,
    leaveend : String,
    leaveType: String
},
{
    collection : "Staff"
});

const Staff = mongoose.model('Staff',AddStaff);
module.exports = Staff;