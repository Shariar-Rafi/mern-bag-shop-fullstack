const express = require("express")
const router = express.Router()

const ownerModel = require("../models/owner-model")

if(process.env.NODE_ENV == "development"){
    try {
        router.post("/create", async (req,res)=>{
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res.status(503).send("You do not have any permission to create new owner!")
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,    
            email,
            password,
        })

        res.status(200).send(createdOwner)
    })
    } catch (error) {
        console.log(error);
    }
}

router.get("/", (req,res)=>{
    res.send("hey owners")
})

module.exports = router;