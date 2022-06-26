const employees = [
    {empno:111,name:"ABC",email:"abc@gmail.com",deptid:10},
    {empno:222,name:"DEF",email:"def@gmail.com",deptid:10},
    {empno:333,name:"LMN",email:"lmn@gmail.com",deptid:20},
    {empno:444,name:"PQR",email:"pqr@gmail.com",deptid:20},
    {empno:555,name:"XYZ",email:"xyz@gmail.com",deptid:30}
]
$(()=>{
    const empnoEL = $("#empno");
    const empnameEL = $("#empname");
    const emailEL = $("#email");
    const deptidEL = $("#deptid");
    const addEL = $("#add");
    const modifyEL = $("#modify");
    const deleteEL = $("#delete");
    const viewEL = $("#view");
    const viewdeptIdEL = $("#odd");
    const msgEl = $("#msg");
    const displaymsgEl = $("#displaymsg");

    if(empno.value==''){
        msgEl.text( "Enter Emp Id");
        addEL.disabled = true;
        modifyEL.disabled = true;
        deleteEL.disabled = true;
    }

    empnoEL.$('blur',()=>{
        let flag = false;
        for(let i=0;i<employees.length;i++){
            if(employees[i].empno == empnoEL.value){
                flag = true;
                empnameEL.value = employees[i].name;
                emailEL.value = employees[i].email;
                deptidEL.value = employees[i].deptid;
                msgEl.html( "Employee Exists");
                modifyEL.disabled = false;
                deleteEL.disabled = false;
                addEL.disabled = true;

            }
        }
        if(flag==false) {
            empnameEL.value = "";
            emailEL.value = "";
            deptidEL.value = "";
            msgEl.html( "Employee does not exist");
            addEL.disabled = false;
            modifyEL.disabled = true;
            deleteEL.disabled = true;
        }
    });

    addEL.$('click',()=>{
        if(empnameEL.value != '' && emailEL.value != '' && deptidEL.value != ''){
            employees.push({empno:empnoEL.value,name:empnameEL.value,email:emailEL.value,deptid:deptidEL.value});
            msgEl.text( "Employee Added Successfully");
        }
        else{
            msgEl.text( "Please Enter all Details");
        }
    });


    modifyEL.$('click',()=>{
        let flag = false;
        let index = employees.map(emp => emp.empno).indexOf(parseInt(empnoEL.value));
        if(empnameEL.value != '' && emailEL.value != '' && deptidEL.value != ''){
            employees[index].name = empnameEL.value;
            employees[index].email = emailEL.value;
            employees[index].deptid = deptidEL.value;
            flag = true;
            msgEl.text( "Employee Details Modified");
        }
        if(flag == false){
            msgEl.text( "Please Enter all values");
        }
    });

    deleteEL.$('click',()=>{
        let index = employees.map(emp => emp.empno).indexOf(parseInt(empnoEL.value));
        employees.splice(index,1);
        msgEl.text( "Employee Deleted");
    });

    viewEL.$('click',()=>{
        for(let i=0;i<employees.length;i++){
            displaymsgEl.text(  displaymsgEl.text+" Emp No: "+employees[i].empno+" Name:  "+
                employees[i].name+" Email:  "+employees[i].email+" Dept Id: "+employees[i].deptid+"\n");
        }
        msgEl.html( "Employees Displayed");
        displaymsgEl.text(  displaymsgEl.text+"\n");
    });

    viewdeptIdEL.$('click',()=>{
        if(deptidEL!=''){
            let flag = false;
            for(let i=0;i<employees.length;i++){
                if(employees[i].deptid == deptidEL.value){
                    displaymsgEl.text(  displaymsgEl.text+" Emp No: "+employees[i].empno+" Name:  "+
                    employees[i].name+" Email:  "+employees[i].email+" Dept Id: "+employees[i].deptid+"\n");
                    flag = true;
                }
                msgEl.html( "Employees Displayed");  
            }
            if(flag == false){
                msgEl.html( "Enter valid Dept Id"); 
            }
        }
        displaymsgEl.text(  displaymsgEl.text+"\n");
    });
});