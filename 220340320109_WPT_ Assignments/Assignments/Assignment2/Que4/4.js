
const express = require('express');
const app = express();

app.use(express.static("cp"));


app.get("/additem",(req,resp)=>{
    resp.send("item added");
});

app.get("/updateo=item",(req,resp)=>{
    resp.send("item updated");
});

app.listen(1000,function(){
    console.log("runniing server...");
});