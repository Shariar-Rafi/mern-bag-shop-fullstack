const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken")
const userModel = require("../models/user-model")

module.exports.registerUser = async(req,res)=>{
    try {
        let {fullname, email, password} = req.body;
        let user = await userModel.findOne({email: email})
        

        if(user){
            req.flash("error", "You already have an account! Please log in.")
            return res.status(403).redirect("/")
        }


        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            if(err) return res.send(err.message);
        bcrypt.hash(password, salt, async (err, hash)=> {
            if(err) return res.send(err.message);
            let createdUser = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                })
                let token = generateToken(createdUser)
                res.cookie("token", token)
                res.status(200).redirect("/shop"); 
            });
        });
    }catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async(req,res)=>{
    try {
        let {email, password} = req.body
        let user = await userModel.findOne({email})

        if(!user){
            req.flash("error", "Email or password incorrect!")
            return res.status(403).redirect("/")
        }
        
        bcrypt.compare(password, user.password, (err,result)=>{
            if(err) return res.send(err.message);
            if(result){
                let token = generateToken(user);
                res.cookie("token", token)
                res.status(200).redirect("/shop")
            }else{
                req.flash("error", "Email or password incorrect!")
                res.status(403).redirect("/")
            }

    })}catch (err) {
        res.send(err.message);
    }
}

module.exports.logoutUser = async(req,res)=>{
    res.cookie("token","")
    req.flash("error", "User logged out!")
    res.redirect("/")
}
