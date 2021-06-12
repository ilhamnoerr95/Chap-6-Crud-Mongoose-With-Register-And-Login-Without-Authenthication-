const chalk = require('chalk');
const user = require('../models/user');
const biodata = require('../models/biodata');
const history = require('../models/history');


//* GET FOR LOGIN
exports.getLogin = (req,res,next)=>{
    //! QUERY STRING FOR NOTIFICATIONs
    // let status = req.query.notif;
        //REQUEST FLASH DENGAN NAMA ERROR
        let message = req.flash('error');
        console.log(message);
    
        //! JIKA ERROR MESSAGENYA ADA ALIAS LEBIH DARI 0 MAKA:
        if(message.length>0){
            //! VARIABEL MESSAGE DIATAS DI UPDATE DENGAN MESSAGE ERROR INDEX 0
            message= message[0]
        } else {
            message = null
        }

    res.status(200).render(
        'auth/login',{
            title: 'Login',
            // notif_status: status,
            errorMessage: message
        }
    )
};
//* POST FOR LOGIN 
exports.postLogin = (req,res,next)=>{
    const {username,password} = req.body;

    //CARI BERDASARKAN USERNAME PADA USER SKEMA MODEL
    user.findOne({
        username: username
    })
    .then(userAlias=>{
        //!apabila usernamenya gak ada 
        if(!userAlias){
            console.log(chalk.red('Username tak ada!'));
            req.flash('error','Username tak ade!')
            return res.redirect('/login')
        }
        if(userAlias.password != password){
            console.log(chalk.red('Password salah!'));
            req.flash('error', 'Password Salah!')
            return res.redirect('/login')
        }
        else {
            res.redirect('user/biodata');
        }

        
    })
    .catch(err=>{
        console.log(err);
    })
};

//* GET FOR REGISTER
exports.getRegister = (req,res,next)=>{
    //REQUEST FLASH DENGAN NAMA ERROR
    let message = req.flash('error');
    console.log(message);

    //! JIKA ERROR MESSAGENYA ADA ALIAS LEBIH DARI 0 MAKA:
    if(message.length>0){
        //! VARIABEL MESSAGE DIATAS DI UPDATE DENGAN MESSAGE ERROR INDEX 0
        message= message[0]
    } else {
        message = null
    }

    res.status(200).render(
        'auth/register',{
            title: 'Register',
            errorMessage: message
        }
    )
};
//*POST FOR REGISTER
exports.postRegister = (req,res,next)=>{
    const {username,name,email,password, confirmPassword}= req.body;

    // CARI USER BERDASARKAN USERNAME PADA USER SCHEMA/MODEL
    user.findOne({
        username: username
    })
    //userAlias take it from user name scema model
        .then(userAlias=>{
            //! apabila username pada user skema suda terdaftar
            if(userAlias){
                console.log(chalk.red('USERNAME SUDAH TERDAFTAR!'))
                //REQUEST FLASH APABILA USERNAME SUDAH TERDAFTAR!
                req.flash('error', 'Username Sudah Terdaftar, silahkan gunakan email yang lain!')
                return res.redirect('/register');
            }
            //!APABILA SEMUA FILE TIDAK DISII
            if(!username||!name||!email||!password||!confirmPassword){
            console.log(chalk.red('tolong diisi dulu formnya!'))
            //  ! REQ.FLASH = MESSAGE
                req.flash('error','Tolong Lengkapi Terlebih Dahulu Datanya!')
                return res.redirect('/register')
            } 
            //! APABILA PASSWORD DAN CONFIRM TIDAK COCOK MAKA:
            if(password != confirmPassword){
                console.log(chalk.red('PASSWORD TIDAK SAMA!'));
                req.flash('error','Password Tidak Sama!');
                return res.redirect('/register');
            }
            else {
                const newUser = new user({
                    username: username,
                    password: password
                });
                newUser.save()

                const newBiodata = new biodata({
                    user_id: newUser,
                    username: username,
                    email: email,
                    name: name 
                })
                newBiodata.save()

                const newHistory = new history({
                    user_id: newUser,
                    scores: 0,
                    createdAt: new Date()
                })
                newHistory.save()
            }  
        })
        .then(result=>
            {return res.redirect('/login')})
            
        .catch(err => {
            console.log(err)
        });
};



