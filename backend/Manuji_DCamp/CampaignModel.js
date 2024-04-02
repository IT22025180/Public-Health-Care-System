const mongoose = require('mongoose');

const AddCampaign = new mongoose.Schema({
    venue : String,
    date : String,
    time : String,
    drName : String

},
{
    collection : "Campaign"
});

const Campaigns = mongoose.model('Campaign',AddCampaign);
module.exports = Campaigns;