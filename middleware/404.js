const Error4 = function (req,res,next){
    res.status(404).json("Error Bor!")
    next()

}

module.exports = Error4