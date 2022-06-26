class Employee {
  constructor(empno, name, email, deptid) {
    this.empno = empno;
    this.name = name;
    this.email = email;
    this.deptid = deptid;
  }

  getEmpDetails() {
    return this.empno + " " + this.name + " " + this.email + " " + this.deptid;
  }

  setEmpDetails(empno, name, email, deptid) {
    this.empno = empno;
    this.name = name;
    this.email = email;
    this.deptid = deptid;
  }
}

class Logic {
  constructor() {
    this.employees = [
      new Employee(111, "ABC", "abc@gmail.com", 10),
      new Employee(222, "DEF", "def@gmail.com", 10),
      new Employee(333, "LMN", "lmn@gmail.com", 20),
      new Employee(444, "PQR", "pqr@gmail.com", 20),
      new Employee(555, "XYZ", "xyz@gmail.com", 30),
    ];
  }

  dispayAllEmployees() {
    return this.employees;
  }

  blurEvent(input) {
    let output = { flag: false, employeeDetails: {} };
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].empno == input) {
        output.flag = true;
        output.employeeDetails = {
          empno: this.employees[i].empno,
          name: this.employees[i].name,
          email: this.employees[i].email,
          deptid: this.employees[i].deptid,
        };
        break;
      }
    }
    return output;
  }

  viewOndeptId(input) {
    let output = { flag: false, employeeDetails: [] };
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].deptid == input) {
        output.flag = true;
        let details = {
          empno: this.employees[i].empno,
          name: this.employees[i].name,
          email: this.employees[i].email,
          deptid: this.employees[i].deptid,
        };
        output.employeeDetails.push(details);
      }
    }

    return output;
  }

  addEmployee(newEmp) {
    this.employees.push({
      empno: newEmp.empno,
      name: newEmp.name,
      email: newEmp.email,
      deptid: newEmp.deptid,
    });
  }

  deleteEmployee(empno) {
    let index = this.employees.map((emp) => emp.empno).indexOf(parseInt(empno));
    this.employees.splice(index, 1);
  }

  modifyEmp(input) {
    if (
      input.modifyEmployee.name != "" &&
      input.modifyEmployee.email != "" &&
      input.modifyEmployee.deptid != ""
    ) {
      let index = this.employees
        .map((emp) => emp.empno)
        .indexOf(parseInt(input.modifyEmployee.empno));
      this.employees[index].name = input.modifyEmployee.name;
      this.employees[index].email = input.modifyEmployee.email;
      this.employees[index].deptid = input.modifyEmployee.deptid;
      input.flag = true;
    }
    return input.flag;
  }
}

$( () => {
  const empnoEL =$("#empno");
  const empnameEL =$("#empname");
  const emailEL =$("#email");
  const deptidEL =$("#deptid");
  const addEL =$("#add");
  const modifyEL =$("#modify");
  const deleteEL =$("#delete");
  const viewEL =$("#view");
  const viewdeptIdEL =$("#odd");
  const msgEl =$("#msg");
  const displaymsgEl =$("#displaymsg");

  let logic = new Logic();

  if (empno.value == "") {
    msgEl.text( "Enter Emp Id");
    addEL.disabled = true;
    modifyEL.disabled = true;
    deleteEL.disabled = true;
  }

  viewEL.$("click", () => {
    console.log(logic.employees);

    let output = logic.dispayAllEmployees();

    for (let i = 0; i < output.length; i++) {
      displaymsgEl.text(
        displaymsgEl.text +
        " Emp No: " +
        output[i].empno +
        " Name:  " +
        output[i].name +
        " Email:  " +
        output[i].email +
        " Dept Id: " +
        output[i].deptid +
        "\n");
    }
    msgEl.html( "Employees Displayed");
    displaymsgEl.text( displaymsgEl.text + "\n");
  });

  empnoEL.$("blur", () => {
    let output = logic.blurEvent(empnoEL.value);
    if (output.flag) {
      empnameEL.value = output.employeeDetails.name;
      emailEL.value = output.employeeDetails.email;
      deptidEL.value = output.employeeDetails.deptid;
      msgEl.html( "Employee Exists");
      modifyEL.disabled = false;
      deleteEL.disabled = false;
      addEL.disabled = true;
    } else {
      empnameEL.value = "";
      emailEL.value = "";
      deptidEL.value = "";
      msgEl.html( "Employee does not exist");
      addEL.disabled = false;
      modifyEL.disabled = true;
      deleteEL.disabled = true;
    }
  });

  viewdeptIdEL.$("click", () => {
    let output = logic.viewOndeptId(deptidEL.value);
    if (output.flag) {
      for (let i = 0; i < output.employeeDetails.length; i++) {
        displaymsgEl.text(
          displaymsgEl.text +
          " Emp No: " +
          output.employeeDetails[i].empno +
          " Name:  " +
          output.employeeDetails[i].name +
          " Email:  " +
          output.employeeDetails[i].email +
          " Dept Id: " +
          output.employeeDetails[i].deptid +
          "\n");
      }
      msgEl.text( "Details displayed on Id");
    } else {
      msgEl.text( "Enter Valid Dept Id");
    }
  });

  addEL.$("click", () => {
    if (empnameEL.value != "" && emailEL.value != "" && deptidEL.value != "") {
      let newEmp = {
        empno: empnoEL.value,
        name: empnameEL.value,
        email: emailEL.value,
        deptid: deptidEL.value,
      };
      logic.addEmployee(newEmp);
      msgEl.text( "Employee Added Successfully");
    } else {
      msgEl.text( "Please Enter all Details");
    }
  });

  deleteEL.$("click", () => {
    logic.deleteEmployee(empnoEL.value);
    msgEl.text( "Employee Deleted");
  });

  modifyEL.$("click", () => {
    let input = {
      flag: false,
      modifyEmployee: {
        empno: empnoEL.value,
        name: empnameEL.value,
        email: emailEL.value,
        deptid: deptidEL.value,
      },
    };

    let output = logic.modifyEmp(input);
    if (output) {
      msgEl.text( "Employee Details Modified");
    } else {
      msgEl.text( "Please Enter all values");
    }
  });
});
