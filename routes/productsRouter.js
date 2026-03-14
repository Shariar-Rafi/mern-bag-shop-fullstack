const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const isLoggedIn = require("../middlewares/isLoggedIn")
const { createProduct } = require("../controllers/adminController")

router.get("/", isLoggedIn, (req,res)=>{
    // res.send("hey")
    res.redirect("/owners/admin")
})

router.post("/create", isLoggedIn, upload.single('image'), createProduct)

module.exports = router;