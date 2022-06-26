const arr = Array.from({
    length: 10
}, () => Math.floor(Math.random() * 100));

$(()=>{
    const displayEL =$("#display");
    const addEL =$("#add");
    const editEL =$("#edit");
    const deleteEL =$("#delete");
    const viewEL =$("#view");
    const oddEL =$("#odd");
    const msgEl =$("#msg");
    const displaymsgEl =$("#displaymsg");




    
    console.log(arr);


    
    if(displayEL.value == ''){
        addEL.disabled = true;
        editEL.disabled = true;
        deleteEL.disabled = true;
    }


    displayEL.$('blur',()=>{
       let flag = false;
        for(let i=0;i<arr.length;i++){
            if(displayEL.value == arr[i]){
                flag = true;
            }
       }
       if(flag==true){
           editEL.disabled = false;
           deleteEL.disabled = false;
           addEL.disabled = true;
       }else{
           addEL.disabled = false;
           deleteEL.disabled = true;
           editEL.disabled = true;
       }
    });


    viewEL.$('click',()=>{
        displaymsgEl.text(  displaymsgEl.text + arr+"\n");
        msgEl.text( "Array Displayed");
    });
    

    oddEL.$('click',()=>{
        for(let i=1;i<arr.length;i=i+2){
            displaymsgEl.text( displaymsgEl.text + arr[i]+", ");
        }
        displaymsgEl.text( displaymsgEl.text+"\n");
        msgEl.text( "Odd Positions");
    });


    addEL.$('click',()=>{
        arr.push(displayEL.value);
        msgEl.text( "Array Item added");
    });    


    editEL.$('click',()=>{
        let newValue = parseInt(window.prompt("Enter new Value"));
        let flag = false;
        for(let i=0;i<arr.length;i++){
            if(newValue == arr[i]){
                flag = true;
            }
       }
       if(flag == false){
            let index = arr.indexOf(parseInt(displayEL.value));
           
            arr[index] = newValue;
            msgEl.text( "Element Replaced");
       }
       else{
           msgEl.text( "Element already exists");
       }

    });

        
    
    deleteEL.$('click',()=>{
        let index = arr.indexOf(parseInt(displayEL.value));




        arr.splice(index,1);
        msgEl.text( "Element deleted");
    });









});
