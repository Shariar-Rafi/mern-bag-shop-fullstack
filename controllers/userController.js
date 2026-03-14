const userModel = require("../models/user-model")

module.exports.updateUserProfile =  async(req,res)=>{
    try {
        let {fullname, contact} = req.body
        await userModel.findOneAndUpdate({email: req.user.email},{fullname, contact},{new:true})
        if(req.file){
            await userModel.findOneAndUpdate({email: req.user.email},{profilePic: req.file.buffer},{new:true})
        }
        req.flash("success","Profile updated.")
        res.redirect("/users/profile")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.cancelOrder = async(req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})
        loggedUser.order.pop()
        await loggedUser.save()
        req.flash("success", "Your ongoing order has been canceled.")
        res.redirect("/shop")
    } catch (error) {
        res.send(error.message)
    }
}