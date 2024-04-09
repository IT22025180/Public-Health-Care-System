const mongoose = require('mongoose');
const Clinics = require('./ClinicModel');


const addClinic = async(req,res) => {
    try{
        
            const{ ctype, date , time, drName , venue} = req.body;

            formattedDate = Array.isArray(date) ?  date.join(', ') : date;
            const newClinic =  new Clinics({
                ctype,        
                date : formattedDate,
                time,
                drName,
                venue    
            });

            await newClinic.save();
            res.json({ success : true , message : 'Clinic added successfully'});
        }
    catch(error){
        console.error('Error adding Clinic: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getClinic = async (req,res) => {
    try{
        const allClinics = await Clinics.find();
        res.json({allClinics});
    }catch(error){
        console.error('Error getting Clinic:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateClinic = async (req,res) => {

    try{

        const { _id, ctype, date , time , venue} = req.body;

        formattedDate_u = Array.isArray(date) ?  date.join(', ') : date;

        const updatedClinic= await Clinics.findOneAndUpdate({_id} ,{

                _id,
                ctype,        
                date : formattedDate_u,
                time,
                venue,     
        }, { new : true});

        if(!updatedClinic){
            return res.status(404).json({ success : false, message :'Selected Clinic not found'});
        }

        res.json({ success : true, message : 'Clinic updated successfully' , data : updatedClinic});
    }catch(error){
        console.error('Error updating Clinic:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteClinic = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedClinic = await Clinics.findOneAndDelete({_id});

        if(!deletedClinic){
            return res.status(404).json({ success: false , message : 'Clinic not found'});
        }

        res.json({ success : true , message : 'Clinic deleted successfully' , data : deletedClinic});
    }catch(error){
        console.error('Error deleting Clinic:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addClinic = addClinic;
exports.getClinic = getClinic;
exports.updateClinic = updateClinic;
exports.deleteClinic = deleteClinic;