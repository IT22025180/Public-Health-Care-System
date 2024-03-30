const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routerDC = require('./Manuji_DCamp/CampaignRoute');
const routerCmp = require('./Vihanga/ComplainRoute');
const routerRF = require('./Yasara_RF/RFRoute');


dotenv.config();

//rest
const app = express();

const uri = 'mongodb+srv://vanuja2024:7289@phisystem.r1glzmh.mongodb.net/';

const connect = async() => {
    try{
        await mongoose.connect(uri);
        console.log('Connected to mongodb');
    }catch(error){
        console.log('Mongodb error: ' , error);
    }
};

connect();

app.use(cors());

app.get('/',(req,res) => {
    res.send({
        message: 'Welcome to PHI Backend'
    });
});

app.use(express.json());

//port
const PORT = process.env.PORT || 4000;

//run
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});


app.use('/api' , routerDC);
app.use('/api' , routerCmp);
app.use('/api' , routerRF);
