const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//SCEMA PRIMARY KEY
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: 3
    },
    password: {
        type:String,
        required: true
    },
    biodata:{
        type:Schema.Types.ObjectId,
        ref: 'biodata'
    },
    history:{
        type:Schema.Types.ObjectId,
        ref: 'history'
    }
});

//OBJEK MODEL
const user = mongoose.model('user', userSchema );

//Export
module.exports = user;