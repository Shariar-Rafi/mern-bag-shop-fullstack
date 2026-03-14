const express = require("express")
const router = express.Router()
const {registerUser, loginUser, logoutUser} = require("../controllers/authContoller")
const isLoggedIn = require("../middlewares/isLoggedIn")
const userModel = require("../models/user-model")
const upload = require("../config/multer-config")
const { updateUserProfile, cancelOrder } = require("../controllers/userController")


router.get("/", isLoggedIn, (req,res)=>{
    // res.send("hey user!")
    let success = req.flash("success")
    let error = req.flash("error")
    res.redirect("/users/profile", {success, error})
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

router.get("/orders",isLoggedIn,async(req,res)=>{
    try {
        let loggedUser = await userModel
        .findOne({email: req.user.email})
        .populate("order")

        if(loggedUser.order.length === 0){
            req.flash("error","No orders found!")
            res.status(200).redirect("/shop")
        }else{
            const bill = (Number(loggedUser.order[0].price)+20)-Number(loggedUser.order[0].discount)
            res.status(200).render("orders",{user: loggedUser, bill})
        }
    } catch (error) {
        res.send(error.message)
    }

})

router.post("/profile/update",isLoggedIn,upload.single("profilePic"), updateUserProfile)

router.post("/order/cancel", isLoggedIn, cancelOrder)

// --------------------------auth------------------------------
router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/logout", logoutUser )

module.exports = router;