// exports.getIndex = (req,res,next)=>{
//     res.status(200).json({
//         message: 'berhasil masuk'
//     })
// };

exports.getIndex = (req,res,next)=>{
    res.status(200).render('index',{
        title: 'DASHBOARD'
    })
};

