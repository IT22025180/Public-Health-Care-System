const mongoose = require('mongoose');
const VioReport = require('./RVModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const absolutePath = path.resolve(__dirname, '../../frontend/src/EviImages/');
        cb(null, absolutePath);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

const addVioReport = async (req, res) => {
    try {
        upload.single('evidence')(req, res, async (error) => {
            if (error) {
                console.error('Error uploading image:', error);
                return res.status(500).json({ success: false, message: 'Error uploading image', error: error.message });
            }
            
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            console.log('req.file:', req.file);
            const imageFileName = req.file.filename;
            const {
                ro_name,
                ro_email,
                ro_mobile,
                v_location,
                date,
                v_type,
                v_description,
                v_name,
                v_nic,
                v_mobile,
                v_email
            } = req.body;

            const newVioReport = new VioReport({
                ro_name,
                ro_email,
                ro_mobile,
                v_location,
                date,
                v_type,
                v_description,
                v_name,
                v_email,
                v_mobile,
                v_nic,
                evidence: imageFileName,
            });

            await newVioReport.save();
            res.json({ success: true, message: 'Violation report added successfully' });
        });
    } catch (error) {
        console.error('Error adding Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


const getVioReport = async (req, res) => {
    try {
        const allVioReports = await VioReport.find();
        res.json({ success: true, allVioReports });
    } catch (error) {
        console.error('Error getting Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateVioReport = async (req, res) => {
    try {
        const { _id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email } = req.body;

        const updatedVioReport = await VioReport.findOneAndUpdate({ _id }, {
            ro_name,
            ro_email,
            ro_mobile,
            date,
            v_location,
            v_type,
            v_description,
            v_name,
            v_email,
            v_mobile,
            v_nic,
        }, { new: true });

        if (!updatedVioReport) {
            return res.status(404).json({ success: false, message: 'Selected Violation report not found' });
        }

        res.json({ success: true, message: 'Violation report updated successfully', data: updatedVioReport });
    } catch (error) {
        console.error('Error updating Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteVioReport = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedVioReport = await VioReport.findOneAndDelete({ _id });

        if (!deletedVioReport) {
            return res.status(404).json({ success: false, message: 'Violation report not found' });
        }

        res.json({ success: true, message: 'Violation report deleted successfully', data: deletedVioReport });
    } catch (error) {
        console.error('Error deleting Violation report:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { addVioReport, getVioReport, updateVioReport, deleteVioReport };
