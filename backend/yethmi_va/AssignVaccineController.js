const mongoose = require('mongoose');
const Vaccinestaff = require('./AssignVaccineModel'); 

const addstaffvaccine = async (req, res) => {
    try {
      const { type, staffmember, date, location, description } = req.body;
      const d_assigndate = Array.isArray(date) ? date.join(', ') : date;
      
      const newassignforvaccine = new Vaccinestaff({
        type,
        staffmember,
        date: d_assigndate,
        location,
        description,
      });
  
      await newassignforvaccine.save();
      res.json({ success: true, message: 'Staff added successfully' });
    } catch (error) {
      console.error('Error adding staff: ', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

const getstaffvaccine = async (req,res) => {
    try{
        const allstaffvaccine = await Vaccinestaff.find();
        res.json({allstaffvaccine});
    }catch(error){
        console.error('Error getting Staff:' , error);
        res.status(500).json({ success : false , message : 'Internal server error'});
    }
}

const updatestaffvaccine = async (req, res) => {
    try {
        const{type,staffmember,date,location,description}=req.body;

        const updatedstaffvaccine= await Vaccinestaff.findOneAndUpdate({ _id }, {
            type,  
            staffmember,    
            date:d_assigndate,
            location,
            description,
        }, { new: true });

        if (!updatedstaffvaccine) {
            return res.status(404).json({ success: false, message: 'Selected staff not found' });
        }

        res.json({ success: true, message: 'Leave updated successfully', data: updatedstaffvaccine});
    } catch (error) {
        console.error('Error updating Leave:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deletestaffvaccine = async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedstaffvaccine= await Vaccinestaff.findOneAndDelete({ _id });

        if (!deletedvaccine) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        res.json({ success: true, message: 'staff deleted successfully', data: deletedstaffvaccine });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



exports.addstaffvaccine = addstaffvaccine;
exports.getstaffvaccine = getstaffvaccine;
exports.updatestaffvaccine=updatestaffvaccine;
exports.deletestaffvaccine = deletestaffvaccine;