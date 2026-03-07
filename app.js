const express = require("express")
const app = express()


app.get("/",(req,res)=>{
    res.send("Initial Setup Done")
})

app.listen(3000)