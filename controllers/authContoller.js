const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken")
const userModel = require("../models/user-model")

module.exports.registerUser = async(req,res)=>{
    try {
        let {fullname, email, password} = req.body;
        let user = await userModel.findOne({email: email})
        

        if(user) return res.status(403).send("You already have an account! Please log in.")


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
                res.status(200).send(createdUser); 
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

        if(!user) return res.status(403).send("Email or password incorrect!")
        
        bcrypt.compare(password, user.password, (err,result)=>{
            if(err) return res.send(err.message);
            if(result){
                let token = generateToken(user);
                res.cookie("token", token)
                res.status(200).send("You can log in now.")
            }else{
                res.status(403).send("Email or password incorrect!")
            }

    })}catch (err) {
        res.send(err.message);
    }
}

module.exports.logoutUser = async(req,res)=>{
    
}
