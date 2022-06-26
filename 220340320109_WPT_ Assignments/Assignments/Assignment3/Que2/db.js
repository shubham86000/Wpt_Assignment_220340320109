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


app.get("/getItem",(req,resp)=>{
let input = req.query.x;
console.log(input);
let output ={ itemnofoundstatus:false, itemdetails:{itemno:33,itemname:'wheat',price:350} };

con.query('select * from item where itemno =?',[input],(error,rows)=>{

    if(rows.length > 0)
    {
        output.itemnofoundstatus=true;
        output.itemdetails=rows[0];

    }
    resp.send(output);
}
);

});

app.get("/update",(req,resp)=>{
    let no = req.query.a;
    let name = req.query.b;
    let price = req.query.c;
    console.log(no);
    let output ={ itemnofoundstatus:false, itemdetails:{itemno:33,itemname:'wheat',price:350} };
    
    con.query('update item set itemname=?, price=? where itemno=?',[name,price,no],(error,rows)=>{
    
        if(rows.affectedRows > 0)
        {
            output.itemnofoundstatus=true;

    
        }
        resp.send(output);
    }
    );
    
    });


    app.get("/getall",(req,resp)=>{
       
      

        
        con.query('select * from item',[],(error,rows)=>{
        
           
            resp.send(rows);
        }
        );
        
        });


        app.get("/insert",(req,resp)=>{
            let no = req.query.a;
            let name = req.query.b;
            let price = req.query.c;
            // let input={itemno:req.query.a,itemname:req.query.b,price:req.query.c};
            console.log(no);
            let output ={ itemnofoundstatus:false};
            
            con.query('insert into item (itemno,itemname,price) values(?,?,?)',[no,name,price],(error,rows)=>{
            
        if (rows.affectedRows > 0) {
            output.itemnofoundstatus = true;
             }
     

                resp.send(output);
            }
            );
            
            });
    

app.listen(900, function () {
    console.log("server listening at port 900...");
});