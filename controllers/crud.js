const chalk = require('chalk');
const { isValidObjectId } = require('mongoose');
const biodata = require('../models/biodata');
const history = require('../models/history');
const user = require('../models/user');
const ObjectId = require('mongodb').ObjectId;


//DASHBOARD BIODATA USER
exports.getBiodatas= (req,res,next)=>{
    console.log(chalk.green('masuk Dashboard!'))
    // history.forEach()
    biodata.find()
        .then(biodataAlias=>{
            res.render('dashboardBio',{
                title: 'Biodata',
                bio: biodataAlias,
            })
        });
}

//DASHBOARD FOR SCORES
exports.getScores = async (req,res,next)=>{
    const userId = req.params.userId

    let message = req.flash('error');
    console.log(message);
    if(message.length>0){
        message = message[0]
    }else {
        message = null
    }

    await history.find({user_id:ObjectId(userId)}).exec((err,History)=>{

        console.log(chalk.blue('masuk Score!'))
        console.log(History)

        res.render('score',{
            historyUser: History,
            title: 'Scores',
            errorMessage: message
        })
    })
}

//EDIT DATA
exports.getEdit= (req,res,next)=>{
    let message = req.flash('berhasil');
    console.log(message);

    if(message.length>0){
        message= message[0]
    }else {
        message = null
    }
    //NANGKEP PARAMETER USER ID
    const userId = req.params.userId;

// TODO: dicari berdasarkan user id, dicocokan antara user_id dengan Parameter
    history.findOne({user_id:ObjectId(userId.toString())})

    .then(result=>{
        res.status(200).render('edit.ejs',{
            title: 'Edit',
            // UNTUK DITARO DI FORM ACTION EDIT sebagai parameter yg akan digunakan
            userId
        })
    })
    .catch(err=> console.log(err))
   
};

//POST EDIT DATA
//! KENAPA ADA REQ.PARAMS.USERID DI POST, KETIKA DI SUBMIT(REQ CLIENT untuk server) TERHADAP
// ! score yg ingin di edit berdasarkan userId
exports.postEdit = (req,res,next)=>{
    //TODO NANGKEP PARAMETER
    const idUser = req.params.idUser;

    //TODO REQ BODY PADA FORM
    const {scores} = req.body;
    console.log(req.body);
    
history.findOneAndUpdate({user_id:ObjectId(idUser.toString())})
.then(histori=>{
    histori.scores = scores;
    return histori.save();
})
.then(result=>{
    console.log(chalk.green('UPDATE SCORE!'))
    res.status(200).redirect('/scores/'+ idUser)
})
    .catch(err=> console.log(err));

}

//GET ADD
exports.getAdd =(req,res,next)=>{
    let message = req.flash('error');
    console.log(message);
    if(message.length>0){
        message = message[0]
    }else {
        message = null
    }
 
    const userId = req.params.userId

    console.log(chalk.green('masuk Add'))

    let scoreUser = [];
    const query = history.where(
        {user_id: new ObjectId(userId)}
    )
    
    query.findOne({user_id: ObjectId(userId)},
    (err,History)=>{
        scoreUser.push({
            user_id: History.user_id,
            createdAt: History.createdAt,
            scores: History.scores
        })
    })

    res.render('add',{
        title: 'Add',
        userId,
        errorMessage: message
    })
}

//TODO: POST ADD SCORES DATA
exports.postAdd = (req,res,next)=>{
    const userId = req.params.userId
    const {scores} = req.body;
    console.log(req.body)
    
try {
    if(!scores){
        req.flash('error','Tolong Lengkapi Terlebih Dahulu Datanya!')
        return res.redirect('/scores/'+userId+'/add')
    } else{
        history.findOne({user_id: ObjectId(userId)})
        .then(result=>{
            const score = new history ({
                user_id: ObjectId(userId.toString()), 
                scores:scores, 
                createAt: new Date() 
            })
                score
                    .save()
                    .then(result=>{
                        console.log('Created Product')
                        res.redirect('/scores/'+userId+'/add')
                    })  
        }) 
    }
} catch (error) {
    if(error){
        res.json(error.message)
        console.log(error.message)
    }
}
    
}

// DELETE WITH GET AND PARAMS
exports.getDelete = async (req,res,next)=>{

    const userId = req.params.userId;
     await history.findOneAndDelete({user_id: ObjectId(userId)}, (err, data)=>{
        if(err){
          console.log(err)
        }else{
          console.log(chalk.red('Scores Histori data terhapus: ' + data));
        }
        res.redirect('/scores/delete'+userId)
      });
}

//DELETE WITH POST AND REQ BODY
// exports.postDelete = async (req,res,next)=>{
//     const historiesId = req.body.historiesId
//     findByIdAndDelete({_id:historiesId})
//         .then(result=>{
//             res.redirect('/user/biodata')
//         })
// }

// LOGOUT 
exports.getLogout = (req,res,next)=>{
    res.redirect('/');
}

