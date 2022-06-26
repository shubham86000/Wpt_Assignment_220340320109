class ItemStatus {
  constructor(status, itemobject) {
    this.status = false;
    this.itemobject = itemobject;
  }
}

class Item {
  constructor(itemno, itemprice, qty) {
    this.itemno = itemno;
    this.itemprice = itemprice;
    this.qty = qty;
  }

  setItemDetails(itemno, itemprice, qty) {
    this.itemno = itemno;
    this.itemprice = itemprice;
    this.qty = qty;
  }

  getItemDetails() {
    return this.itemno + "--" + this.itemprice + "--" + this.qty;
  }
}

class Logic {
  constructor() {
    this.items = [
      new Item(1, 4, 5),
      new Item(2, 6, 7),
      new Item(3, 9, 10),
      new Item(41, 123, 133),
    ]; //assume this is
  }

  getItemDetailsLogic(itemno) {
    let output = new ItemStatus(false, {});
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].itemno == itemno) {
        output.result = true;
        output.itemdetails = this.items[i];
        break;
      }
    }
    return output;
  }

  updateItemDetailsLogic(updateditem) {
    console.log(updateditem.itemno);
    let output = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].itemno == updateditem.itemno) {
        this.items[i].setItemDetails(
          updateditem.itemno,
          updateditem.itemprice,
          updateditem.qty
        );
        output = true;
        break;
      }
    }
    console.log("inside update function" + output);
    return output;
  }

  removeItemDetailsLogic(itemno) {
    let output = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].itemno == itemno) {
        this.items.splice(i, 1); // which position, how many elements to remove
        output = true;
        break;
      }
    }
    console.log("inside delte function" + output);
    return output;
  }

  getAllItems() {
    return this.items;
  }

  addItem(input) {
    this.items.push({
      itemno: input.addNewItem.itemno,
      itemprice: input.addNewItem.itemprice,
      qty: input.addNewItem.qty,
    });
  }
} //end of the logic class

window.addEventListener("DOMContentLoaded", () => {
  let logic = new Logic();
  showAllItems();

  const itemnoid = document.querySelector("#itemno");
  itemnoid.addEventListener("blur", () => {
    console.log("blur event");

    //intellligence begins
    let itemno = document.querySelector("#itemno").value;
    console.log("input is" + itemno);
    let output = logic.getItemDetailsLogic(itemno);
    //if result is false, then assume itemno is not found, else assum eitemno is found

    //intelligence ends here.

    //after you know the output.. think how page chages.
    if (output.result) {
      document.querySelector("#price").value = output.itemdetails.itemprice;
      document.querySelector("#qty").value = output.itemdetails.qty;

      document.querySelector("#update").disabled = false;
      document.querySelector("#delete").disabled = false;
      document.querySelector("#clear").disabled = false;
      document.querySelector("#msg").innerText = "item details found";
      document.querySelector("#add").disabled = true;
    } else {
      console.log("no item was found");
      document.querySelector("#update").disabled = true;
      document.querySelector("#delete").disabled = true;
      document.querySelector("#clear").disabled = true;
      document.querySelector("#msg").innerText = "item no not found";
      document.querySelector("#price").value = "";
      document.querySelector("#qty").value = "";
      document.querySelector("#add").disabled = false;
    }
  }); //end of event handling registration. blue event.

  const update = document.querySelector("#update");
  update.addEventListener("click", () => {
    //intelligence begins
    let input = {
      itemno: document.querySelector("#itemno").value,
      itemprice: document.querySelector("#price").value,
      qty: document.querySelector("#qty").value,
    };

    console.log(input);
    let output = logic.updateItemDetailsLogic(input); //just true or false or just an int or a string is
    //standard kids disease.

    //intelligence ends here..
    if (output) {
      document.querySelector("#msg").innerText = "update suceeded";
      document.querySelector("#update").disabled = true;
      document.querySelector("#delete").disabled = true;
      document.querySelector("#clear").disabled = true;
      document.querySelector("#itemno").value = "";

      document.querySelector("#price").value = "";
      document.querySelector("#qty").value = "";
    } else {
      document.querySelector("#msg").innerText = "update failed";

      document.querySelector("#update").disabled = true;
      document.querySelector("#delete").disabled = true;
      document.querySelector("#clear").disabled = true;
    }
    showAllItems();
    //intelligence ends.
  });

  const deletebutton = document.querySelector("#delete");
  deletebutton.addEventListener("click", () => {
    let input = document.querySelector("#itemno").value;

    console.log(input);
    let output = logic.removeItemDetailsLogic(input); //just true or false or just an int or a string is
    //standard kids disease.
    console.log("after delte function" + output);

    //intelligence ends here..
    if (output) {
      document.querySelector("#msg").innerText = "delete suceeded bravery";
      document.querySelector("#update").disabled = true;
      document.querySelector("#delete").disabled = true;
      document.querySelector("#clear").disabled = true;
      document.querySelector("#itemno").value = "";

      document.querySelector("#price").value = "";
      document.querySelector("#qty").value = "";
    } else {
      document.querySelector("#msg").innerText = "delete failed";

      document.querySelector("#update").disabled = true;
      document.querySelector("#delete").disabled = true;
      document.querySelector("#clear").disabled = true;
    }
    showAllItems();
  });

  const clear = document.querySelector("#clear");
  clear.addEventListener("click", () => {
    console.log("clear event");
  }); //end of event handling setup for buttons

  function showAllItems() {
    console.log("show all items");

    let output = logic.getAllItems();

    let msg = "";
    for (
      let i = 0;
      i < output.length;
      i++ //dinosaur way..
    )
      msg +=
        "<Br/>" +
        output[i].itemno +
        " --- " +
        output[i].itemprice +
        "--" +
        output[i].qty;

    document.querySelector("#contents").innerHTML = msg;

    const addEL = document.getElementById("add");
    addEL.addEventListener("click", () => {
      let input = {
        flag: false,
        addNewItem: {
          itemno: document.querySelector("#itemno").value,
          itemprice: document.querySelector("#price").value,
          qty: document.querySelector("#qty").value,
        },
      };
      if(input.addNewItem.itemprice!='' && input.addNewItem.qty!=''){
        logic.addItem(input);
      showAllItems();
      document.querySelector("#msg").innerText = "Item added";
      }
      else{
        document.querySelector("#msg").innerText = "Enter all details";
      }
      
    });
  }
});