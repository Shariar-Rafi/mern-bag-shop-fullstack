const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")
const { addToCart, emptyCart, orderProduct } = require("../controllers/productController")
const router = express.Router()

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
    let error = req.flash("error")
    res.render("shop",{ products, user: loggedUser, success, error })
})

router.get("/cart",isLoggedIn, async(req,res)=>{
    try {
        let loggedUser = await userModel
        .findOne({email: req.user.email})
        .populate("cart")

        if(loggedUser.cart.length === 0){
            req.flash("error", "Your cart is empty!")
            res.redirect("/shop")
        }else{
            const bill = (Number(loggedUser.cart[0].price)+20)-Number(loggedUser.cart[0].discount)
            let success = req.flash("success")
            let error = req.flash("error")
            res.render("cart", {user: loggedUser, bill, success, error})
        }
    } catch (error) {
        res.send(error.message)
    }
})

// ----------------------cart logics---------------------------
router.get("/addtocart/:productid",isLoggedIn, addToCart)

router.post("/cart/empty",isLoggedIn, emptyCart)

router.post("/cart/order/:productid",isLoggedIn, orderProduct)


module.exports = router;