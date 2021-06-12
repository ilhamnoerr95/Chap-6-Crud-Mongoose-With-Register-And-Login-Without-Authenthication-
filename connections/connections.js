const mongoose = require('mongoose');
const chalk = require('chalk');

//CONNECTION TO MONGODB SERVER
mongoose.connect('mongodb://localhost:27017/crud_mvc_mongoose',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const db = mongoose.connection
db.on('error', console.error.bind('console', 'connection error:'));
db.once('open', ()=>{
        console.log(chalk.blue('Database Connected!'))
})