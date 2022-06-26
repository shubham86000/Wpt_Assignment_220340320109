const employees = [
    { empno: 111, name: "ABC", email: "abc@gmail.com", deptid: 10 },
    { empno: 222, name: "DEF", email: "def@gmail.com", deptid: 10 },
    { empno: 333, name: "LMN", email: "lmn@gmail.com", deptid: 20 },
    { empno: 444, name: "PQR", email: "pqr@gmail.com", deptid: 20 },
    { empno: 555, name: "XYZ", email: "xyz@gmail.com", deptid: 30 }
]

window.addEventListener('DOMContentLoaded', () => {
    const empnoEL = document.getElementById("empno");
    const empnameEL = document.getElementById("empname");
    const emailEL = document.getElementById("email");
    const deptidEL = document.getElementById("deptid");
    const addEL = document.getElementById("add");
    const modifyEL = document.getElementById("modify");
    const deleteEL = document.getElementById("delete");
    const viewEL = document.getElementById("view");
    const viewdeptIdEL = document.getElementById("odd");
    const msgEl = document.getElementById("msg");
    const displaymsgEl = document.getElementById("displaymsg");

    if (empno.value == '') {
        msgEl.innerText = "Enter Emp Id";
        addEL.disabled = true;
        modifyEL.disabled = true;
        deleteEL.disabled = true;
    }

    empnoEL.addEventListener('blur', () => {
        let flag = false;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].empno == empnoEL.value) {
                flag = true;
                empnameEL.value = employees[i].name;
                emailEL.value = employees[i].email;
                deptidEL.value = employees[i].deptid;
                msgEl.innerHTML = "Employee Exists";
                modifyEL.disabled = false;
                deleteEL.disabled = false;
                addEL.disabled = true;

            }
        }
        if (flag == false) {
            empnameEL.value = "";
            emailEL.value = "";
            deptidEL.value = "";
            msgEl.innerHTML = "Employee does not exist";
            addEL.disabled = false;
            modifyEL.disabled = true;
            deleteEL.disabled = true;
        }
    });

    addEL.addEventListener('click', () => {
        if (empnameEL.value != '' && emailEL.value != '' && deptidEL.value != '') {
            employees.push({ empno: empnoEL.value, name: empnameEL.value, email: emailEL.value, deptid: deptidEL.value });
            msgEl.innerText = "Employee Added Successfully";
        }
        else {
            msgEl.innerText = "Please Enter all Details";
        }
    });


    modifyEL.addEventListener('click', () => {
        let flag = false;
        let index = employees.map(emp => emp.empno).indexOf(parseInt(empnoEL.value));
        if (empnameEL.value != '' && emailEL.value != '' && deptidEL.value != '') {
            employees[index].name = empnameEL.value;
            employees[index].email = emailEL.value;
            employees[index].deptid = deptidEL.value;
            flag = true;
            msgEl.innerText = "Employee Details Modified";
        }
        if (flag == false) {
            msgEl.innerText = "Please Enter all values";
        }
    });

    deleteEL.addEventListener('click', () => {
        let index = employees.map(emp => emp.empno).indexOf(parseInt(empnoEL.value));
        employees.splice(index, 1);
        msgEl.innerText = "Employee Deleted";
    });

    viewEL.addEventListener('click', () => {
        for (let i = 0; i < employees.length; i++) {
            displaymsgEl.innerText = displaymsgEl.innerText + " Emp No: " + employees[i].empno + " Name:  " +
                employees[i].name + " Email:  " + employees[i].email + " Dept Id: " + employees[i].deptid + "\n";
        }
        msgEl.innerHTML = "Employees Displayed";
        displaymsgEl.innerText = displaymsgEl.innerText + "\n";
    });

    viewdeptIdEL.addEventListener('click', () => {
        if (deptidEL != '') {
            let flag = false;
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].deptid == deptidEL.value) {
                    displaymsgEl.innerText = displaymsgEl.innerText + " Emp No: " + employees[i].empno + " Name:  " +
                        employees[i].name + " Email:  " + employees[i].email + " Dept Id: " + employees[i].deptid + "\n";
                    flag = true;
                }
                msgEl.innerHTML = "Employees Displayed";
            }
            if (flag == false) {
                msgEl.innerHTML = "Enter valid Dept Id";
            }
        }
        displaymsgEl.innerText = displaymsgEl.innerText + "\n";
    });
});