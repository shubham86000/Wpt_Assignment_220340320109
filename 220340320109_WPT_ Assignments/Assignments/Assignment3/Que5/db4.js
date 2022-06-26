let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
	port:3306
}; 
const mysql = require('mysql2'); //fate
const con=mysql.createConnection(dbparams);//fate  

const express = require('express');
const app = express();

app.use(express.static("cp"));


app.get("/getbal",(req,resp)=>{
    let input = req.query.x;
    console.log(input);
    let output ={ bankfoundstatus:false};
    
    con.query('select * from bank where accno =?',[input],(error,rows)=>{
    
        if(rows.length > 0)
        {
            output.bankfoundstatus=true;
            output.bankdetails=rows[0];
    
        }
        resp.send(output);
    }
    );
    
    });



    app.listen(900, function () {
        console.log("server listening at port 900...");
    });
