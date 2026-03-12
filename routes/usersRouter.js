const express = require("express")
const router = express.Router()
const {registerUser, loginUser, logoutUser} = require("../controllers/authContoller")
const isLoggedIn = require("../middlewares/isLoggedIn")
const userModel = require("../models/user-model")
const upload = require("../config/multer-config")


router.get("/", (req,res)=>{
    // res.send("hey user!")
    let success = req.flash("success")
    res.redirect("/users/profile", {success})
})

router.get("/profile",isLoggedIn,async(req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})
        let success = req.flash("success")
        res.render("profile", {success, user: loggedUser})
    } catch (error) {
        res.send(error.message);
    }
})

router.post("/profile/update",isLoggedIn,upload.single("profilePic"), async(req,res)=>{
    try {
        let {fullname, contact} = req.body
        await userModel.findOneAndUpdate({email: req.user.email},{fullname, contact},{new:true})
        if(req.file){
            await userModel.findOneAndUpdate({email: req.user.email},{profilePic: req.file.buffer},{new:true})
        }
        req.flash("success","Profile updated successfully!")
        res.redirect("/users/profile")
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/orders",isLoggedIn,async(req,res)=>{
    try {
        let loggedUser = await userModel
        .findOne({email: req.user.email})
        .populate("order")

        if(loggedUser.order.length === 0){
            req.flash("success","No orders found! Order something to see the details.")
            res.status(200).redirect("/shop")
        }else{
            const bill = (Number(loggedUser.order[0].price)+20)-Number(loggedUser.order[0].discount)
            res.status(200).render("orders",{user: loggedUser, bill})
        }
    } catch (error) {
        res.send(error.message)
    }

})

router.post("/order/cancel", isLoggedIn, async(req,res)=>{
    try {
        let loggedUser = await userModel.findOne({email: req.user.email})
        loggedUser.order.pop()
        await loggedUser.save()
        req.flash("success", "Your ongoing order has been canceled.")
        res.redirect("/shop")
    } catch (error) {
        res.send(error.message)
    }
})

// --------------------------auth------------------------------
router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/logout", logoutUser )

module.exports = router;