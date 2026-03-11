const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.get("/", async(req,res)=>{
    try {
        if(req.cookies.token) return res.redirect("/shop");

        let error = req.flash("error")
        res.render("index", {error, loggedIn: false})

    } catch (error) {
        res.send(error.message)
    }
})


router.get("/shop",isLoggedIn, async(req,res)=>{
    let products = await productModel.find()
    let loggedUser = await userModel.findOne({email: req.user.email})
    let success = req.flash("success")
    res.render("shop",{ products, user: loggedUser, success })
})

router.get("/addtocart/:productid",isLoggedIn,async (req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})

        if(loggedUser.cart.length === 0){
            loggedUser.cart.push(req.params.productid)
            await loggedUser.save()
            req.flash("success", "Added to cart.")
            res.redirect("/shop")
        }else{
            req.flash("success", "Your cart is not empty.")
            res.redirect("/shop")
        }
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/cart",isLoggedIn, async(req,res)=>{
    try {
        let loggedUser = await userModel
        .findOne({email: req.user.email})
        .populate("cart")

        if(loggedUser.cart.length === 0){
            req.flash("success", "Your cart is empty!")
            res.redirect("/shop")
        }else{
            const bill = (Number(loggedUser.cart[0].price)+20)-Number(loggedUser.cart[0].discount)
            let success = req.flash("success")
            res.render("cart", {user: loggedUser, bill, success})
        }
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/cart/empty",isLoggedIn, async(req,res)=>{
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
})

router.post("/cart/order/:productid",isLoggedIn, async(req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})
        if(loggedUser.order.length === 0){
            loggedUser.order.push(req.params.productid)
            loggedUser.cart.pop()
            await loggedUser.save()
            req.flash("success", "Your order has been set successfully.")
            res.redirect("/shop")
        }else{
            req.flash("success", "Sorry, You already have an order in progress.")
            res.redirect("/cart")
        }
    } catch (error) {
        res.send(error.message)
    }
    
})

module.exports = router;