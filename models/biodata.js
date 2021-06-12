const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//SCEMA
const biodataSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    username:{
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

//OBJEK MODEL
const biodata = mongoose.model('biodata', biodataSchema );

//Export
module.exports = biodata;