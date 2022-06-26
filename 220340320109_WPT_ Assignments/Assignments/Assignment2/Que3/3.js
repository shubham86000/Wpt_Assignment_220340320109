const http = require('http');
let url = require("url");

http.createServer((req,res)=>{
    var q = url.parse(req.url,true).query;
    console.log("call back function");
    res.write("diameter = "+ 2*q.x);
    res.end();
}).listen(900);