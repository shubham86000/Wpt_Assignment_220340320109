const arr = Array.from({
    length: 10
}, () => Math.floor(Math.random() * 100));

window.addEventListener('DOMContentLoaded', () => {
    const displayEL = document.getElementById("display");
    const addEL = document.getElementById("add");
    const editEL = document.getElementById("edit");
    const deleteEL = document.getElementById("delete");
    const viewEL = document.getElementById("view");
    const oddEL = document.getElementById("odd");
    const msgEl = document.getElementById("msg");
    const displaymsgEl = document.getElementById("displaymsg");





    console.log(arr);



    if (displayEL.value == '') {
        addEL.disabled = true;
        editEL.disabled = true;
        deleteEL.disabled = true;
    }


    displayEL.addEventListener('blur', () => {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            if (displayEL.value == arr[i]) {
                flag = true;
            }
        }
        if (flag == true) {
            editEL.disabled = false;
            deleteEL.disabled = false;
            addEL.disabled = true;
        } else {
            addEL.disabled = false;
            deleteEL.disabled = true;
            editEL.disabled = true;
        }
    });


    viewEL.addEventListener('click', () => {
        displaymsgEl.innerText = displaymsgEl.innerText + arr + "\n";
        msgEl.innerText = "Array Displayed";
    });


    oddEL.addEventListener('click', () => {
        for (let i = 1; i < arr.length; i = i + 2) {
            displaymsgEl.innerText = displaymsgEl.innerText + arr[i] + ", ";
        }
        displaymsgEl.innerText = displaymsgEl.innerText + "\n";
        msgEl.innerText = "Odd Positions";
    });


    addEL.addEventListener('click', () => {
        arr.push(displayEL.value);
        msgEl.innerText = "Array Item added";
    });


    editEL.addEventListener('click', () => {
        let newValue = parseInt(window.prompt("Enter new Value"));
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            if (newValue == arr[i]) {
                flag = true;
            }
        }
        if (flag == false) {
            let index = arr.indexOf(parseInt(displayEL.value));

            arr[index] = newValue;
            msgEl.innerText = "Element Replaced";
        }
        else {
            msgEl.innerText = "Element already exists";
        }

    });



    deleteEL.addEventListener('click', () => {
        let index = arr.indexOf(parseInt(displayEL.value));




        arr.splice(index, 1);
        msgEl.innerText = "Element deleted";
    });









});
