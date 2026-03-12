const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")
const isLoggedIn = require("../middlewares/isLoggedIn")

router.get("/", isLoggedIn, (req,res)=>{
    // res.send("hey")
    res.redirect("/owners/admin")
})

router.post("/create", isLoggedIn, upload.single('image'), async (req,res)=>{
    try {
        let {name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgColor : bgcolor,
            panelColor : panelcolor,
            textColor : textcolor,
        })

        req.flash("success", "Product created successfully.")
        res.redirect("/owners/admin")
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;