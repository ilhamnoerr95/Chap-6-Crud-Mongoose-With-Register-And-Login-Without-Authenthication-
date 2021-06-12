const express = require('express');
const app = express();

const chalk = require('chalk');
const dotenv = require('dotenv');

const morgan = require('morgan');

//TODO: FLASH NEED SESSION
const flash = require('connect-flash');
const session = require('express-session')
// Session save in mongodb 
const MongoDBStore = require('connect-mongodb-session')(session);
//UNTUK STORE SESSION TO MONGODB
const store = new MongoDBStore({
    url: 'mongodb://localhost:27017/crud_mvc_mongoose',
    collection: 'sessions'
});

// const expressLayout = require("express-ejs-layouts");

//SET EXPRESS EJS LAYOUTS
// app.set('layout', './layouts/master.ejs')
//set view ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

//SET MIDDLEWARE EXPRES LAYOUT
// app.use(expressLayout)

//*  MIDDLEWARE BODYPARSER NANGKEP FORM
app.use(express.urlencoded({extended:true}));

//* MIDDLEWARE STATIC PUBLIC FILE
app.use(express.static('public'));
// app.use('/css',express.static(__dirname +'public/css'))
// app.use('/img',express.static(__dirname +'public/img'))

//log Request with Morgan 
app.use(morgan('tiny'));

//MIDDLEWARE SESIONS
app.use(session({
    //namanya bebas
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    store: store
}));

//MIDDLEWARE FLASH
app.use(flash());

//LOAD ROUTES INDEX
app.use(require('./routes/indexRouth'));
//LOAD ROUTES REGISTER
app.use(require('./routes/registerRouth'));
//LOAD ROUTES CRUD USER
app.use(require('./routes/crudRouth'));

app.use(require('./middleware/404.js'))


//TODO LOAD ENV
dotenv.config({
    path:'./config/config.env'
});

//KONEKSI PORT TO LOCALHOST
const port = process.env.PORT || 4040;
app.listen(port,()=>{
    console.log(chalk.blue(`Server running on http://localhost:${port}`));
})




