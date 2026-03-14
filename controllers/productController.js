const userModel = require("../models/user-model")

module.exports.addToCart = async (req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})

        if(loggedUser.cart.length === 0){
            loggedUser.cart.push(req.params.productid)
            await loggedUser.save()
            req.flash("success", "Added to cart.")
            res.redirect("/shop")
        }else{
            req.flash("error", "Your cart is not empty.")
            res.redirect("/shop")
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.emptyCart = async(req,res)=>{
    try {
        let user = await userModel.findOne({email: req.user.email})

        if(user){
            user.cart.pop()
            await user.save()
            req.flash("success", "Your cart is empty now.")
            return res.status(200).redirect("/shop")
        }else{
            req.flash("success", "Something is wrong.")
            return res.status(403).redirect("/shop")
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.orderProduct = async(req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})
        if(loggedUser.order.length === 0){
            loggedUser.order.push(req.params.productid)
            loggedUser.cart.pop()
            await loggedUser.save()
            req.flash("success", "Order placed successfully.")
            res.redirect("/shop")
        }else{
            req.flash("error", "Sorry, You already have an order in progress.")
            res.redirect("/cart")
        }
    } catch (error) {
        res.send(error.message)
    }
}