const mongoose = require('mongoose');
const VioReport = require('./RVModel');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const absolutePath = path.resolve(__dirname, '../../frontend/src/EviImages/');
        cb(null, absolutePath);
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage : storage});


const addVioReport = async(req,res) => {
    try{
        upload.single('evidance')(req,res, async (error) => {
            if(error){
                console.error('Error uploading image: ' , error);
                return res.status(500).json({ success : false, message: 'Error uploading image'});
            }
            console.log('req.file:',req.file);
            const imageFileName = req.file.filename;
            const{ro_name, ro_email , ro_mobile, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email} = req.body;

            /*const offset = 5.5; // +5.30 is 5 hours and 30 minutes ahead of UTC
            const utcMilliseconds = new Date().getTime();
            const localOffset = new Date().getTimezoneOffset();
            const localMilliseconds = utcMilliseconds - (localOffset * 60000);
            const targetMilliseconds = localMilliseconds + (offset * 3600000);
            const createdAt = new Date(targetMilliseconds);*/

            const newVioReport = new VioReport({

                ro_name,
                ro_email,
                ro_mobile,
                v_location,
                v_type,
                v_description,
                v_name,
                v_nic,
                v_mobile,
                v_email,
                evidance : imageFileName,
                
            });

            await newVioReport.save();
            res.json({ success : true , message : 'Violation report added successfully'});
        });
        }
    catch(error){
        console.error('Error adding Violation report: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getVioReport = async (req,res) => {
    try{
        const allVioReports = await VioReport.find();
        res.json({allVioReports});
    }catch(error){
        console.error('Error getting Violation report:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateVioReport = async (req,res) => {

    try{

        const { _id, ro_name, ro_email , ro_mobile, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email} = req.body;

        const updatedVioReport = await VioReport.findOneAndUpdate({_id} ,{
            ro_name,
            ro_email,
            ro_mobile,
            v_location,
            v_type,
            v_description,
            v_name,
            v_nic,
            v_mobile,
            v_email, 
        }, { new : true});

        if(!updatedVioReport){
            return res.status(404).json({ success : false, message :'Selected Violation report not found'});
        }

        res.json({ success : true, message : 'Violation report updated successfully' , data : updatedVioReport});
    }catch(error){
        console.error('Error updating Violation report:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteVioReport = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedVioReport= await VioReport.findOneAndDelete({_id});

        if(!deletedVioReport){
            return res.status(404).json({ success: false , message : 'Violation report not found'});
        }

        res.json({ success : true , message : 'Violation report deleted successfully' , data : deletedVioReport});
    }catch(error){
        console.error('Error deleting Violation report:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addVioReport = addVioReport;
exports.getVioReport = getVioReport;
exports.updateVioReport = updateVioReport;
exports.deleteVioReport = deleteVioReport;