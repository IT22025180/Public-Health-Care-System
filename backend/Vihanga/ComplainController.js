const mongoose = require('mongoose');
const Complain = require('./ComplainModel');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const absolutePath = path.resolve(__dirname, '../../frontend/src/CImages/');
        cb(null, absolutePath);
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage : storage});

const addComplain = async(req,res) => {
    try{
        
        upload.single('images')(req,res, async (error) => {
            if(error){
                console.error('Error uploading image: ' , error);
                return res.status(500).json({ success : false, message: 'Error uploading image'});
            }
            console.log('req.file:',req.file);
            const imageFileName = req.file.filename;
            const{fname, lname , mobile, email, NIC, yaddress, ctype, cdesc, area, location} = req.body;

            /*const offset = 5.5; // +5.30 is 5 hours and 30 minutes ahead of UTC
            const utcMilliseconds = new Date().getTime();
            const localOffset = new Date().getTimezoneOffset();
            const localMilliseconds = utcMilliseconds - (localOffset * 60000);
            const targetMilliseconds = localMilliseconds + (offset * 3600000);
            const createdAt = new Date(targetMilliseconds);*/

            const newComplain = new Complain({

                fname,
                lname,
                mobile,
                email,
                NIC,
                yaddress,
                ctype,
                cdesc,
                area,
                location,
                images : imageFileName,
                
            });

            await newComplain.save();
            res.json({ success : true , message : 'Complain added successfully'});
        });
        }
    catch(error){
        console.error('Error adding Dengue Complain: ' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const getComplain = async (req,res) => {
    try{
        const allComplain = await Complain.find();
        res.json({allComplain});
    }catch(error){
        console.error('Error getting Complain:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updateComplain = async (req,res) => {

    try{

        const { _id, fname, lname , mobile, email, NIC, yaddress, ctype, cdesc, area, location} = req.body;

        const updatedComplain = await Complain.findOneAndUpdate({_id} ,{
                fname,
                lname,
                mobile,
                email,
                NIC,
                yaddress,
                ctype,
                cdesc,
                area,
                location
        }, { new : true});

        if(!updatedComplain){
            return res.status(404).json({ success : false, message :'Selected dengue Complain not found'});
        }

        res.json({ success : true, message : 'Dengue complain updated successfully' , data : updatedCampaign});
    }catch(error){
        console.error('Error updating complain:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const deleteComplain = async (req,res) => {
    try{
        const {_id} = req.body;

        const deletedComplain = await Complain.findOneAndDelete({_id});

        if(!deletedComplain){
            return res.status(404).json({ success: false , message : 'Complain not found'});
        }

        res.json({ success : true , message : 'Complain deleted successfully' , data : deletedComplain});
    }catch(error){
        console.error('Error updating complain:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}
exports.addComplain = addComplain;
exports.getComplain = getComplain;
exports.updateComplain = updateComplain;
exports.deleteComplain = deleteComplain;