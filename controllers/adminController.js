const productModel = require("../models/product-model");

module.exports.createProduct = async (req,res)=>{
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
}