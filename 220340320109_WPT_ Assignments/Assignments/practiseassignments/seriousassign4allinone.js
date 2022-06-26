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



app.use(express.static("sp"));
app.get("/getemp",(req,resp)=>{
    let input = req.query.x;
    console.log(input);
    let output ={ empfoundstatus:false};
    
    con.query('select * from emp where empno =?',[input],(error,rows)=>{
    
        if(rows.length > 0)
        {
            output.empfoundstatus=true;
            output.empdetails=rows[0];
         console.log(output);
        }
        resp.send(output);
    }
    );

    
    
    });
    app.get("/add",(req,resp)=>{
        let empno = req.query.a;
        let ename = req.query.b;
        let deptno = req.query.c;
        // let input={itemno:req.query.a,itemname:req.query.b,price:req.query.c};
        console.log(empno);
        let output ={ empfoundstatus:false};
        
        con.query('insert into emp (empno,ename,deptid) values(?,?,?)',[empno,ename,deptno],(error,rows)=>{
        
    if (rows.affectedRows > 0) {
        output.empfoundstatus = true;
         }
 

            resp.send(output);
        }
      );
    });




    app.listen(900, function () {
        console.log("server listening at port 900...");
    });