const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//SCEMA
const historySchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    scores: {
        type:Number,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

//OBJEK MODEL
const history = mongoose.model('history', historySchema );

//Export
module.exports = history;