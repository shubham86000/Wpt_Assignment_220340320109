const express = require('express');
const app = express();

const mysql = require('mysql2');


let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
	port:3306
}; //

const con=mysql.createConnection(dbparams);

app.use(express.static("sf")) ;// here sf is folder which will contains html
//files and other javascript files which should not be processed by the server.

//setup up URI's what is URI, a scenario in your http


app.get("/login",(req,resp)=>{

//reading username and password from the http request.
    let pincode1 =req.query.pincode;//syntx will change depending on whih
    //http server we are using that nodejs inbuilt http server or 
    //express http server.
    
    console.log("talking to database that can be done later on");
    
    let loginstatus={ status:false, message:"area not found"};
    //here put the databse part
    //create the connection.
    con.query('select area from  pin  where pincode=?', 
    [pincode1], 
(err, rows) => {
    if (err) {
        console.log("error has occured let us see");  
    } else {
        if(rows.length > 0)
        {
        loginstatus.status=true;
        loginstatus.message= JSON.stringify(rows);
    }

    }
    resp.send(loginstatus);//observe this line inside the call back
    //function of query 
}
);
  
});

app.get("/updateprofile",(req,resp)=> {
    resp.send("ok for update profile");
});

//setup the server.
app.listen(900, function () {
    console.log("server listening at port 900...");
});