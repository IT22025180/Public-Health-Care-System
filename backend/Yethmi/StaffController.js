const mongoose = require('mongoose');
const Staff = require('./StaffModel');


const addStaff = async(req,res) => {
    try{
        
            const{  name,
                    email,
                    mobile,
                    position,
                    leavestrt,
                    leaveend,
                    leaveType 
                } = req.body;
            const newStaff =  new Staff({
                name,      
                email,
                mobile,
                position,
                leavestrt,
                leaveend,
                leaveType       
            });

            await newStaff.save();
            res.json({ success : true , message : 'Staff added successfully'});
        }
    catch(error){
        console.error('Error adding Staff: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getStaff = async (req,res) => {
    try{
        const allStaff = await Staff.find();
        res.json({allStaff});
    }catch(error){
        console.error('Error getting staff:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateStaff = async (req,res) => {

    try{

        const { _id, name, email, mobile, position, leavestrt, leaveend, leaveType} = req.body;

        const updatedStaff = await Staff.findOneAndUpdate({_id} ,{
            name,      
            email,
            mobile,
            position,
            leavestrt,
            leaveend,
            leaveType    
        }, { new : true});

        if(!updatedStaff){
            return res.status(404).json({ success : false, message :'Selected staff not found'});
        }

        res.json({ success : true, message : 'staff updated successfully' , data : updatedStaff});
    }catch(error){
        console.error('Error updating staff:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteStaff = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedStaff = await Baby.findOneAndDelete({_id});

        if(!deletedStaff){
            return res.status(404).json({ success: false , message : 'Staff not found'});
        }

        res.json({ success : true , message : 'Staff deleted successfully' , data : deletedStaff});
    }catch(error){
        console.error('Error deleting Staff:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addStaff = addStaff;
exports.getStaff = getStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;