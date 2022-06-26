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

$( () => {
  let logic = new Logic();
  showAllItems();

  const itemnoid = $("#itemno");
  itemnoid.$("blur", () => {
    console.log("blur event");

    //intellligence begins
    let itemno = $("#itemno").value;
    console.log("input is" + itemno);
    let output = logic.getItemDetailsLogic(itemno);
    //if result is false, then assume itemno is not found, else assum eitemno is found

    //intelligence ends here.

    //after you know the output.. think how page chages.
    if (output.result) {
      $("#price").value = output.itemdetails.itemprice;
      $("#qty").value = output.itemdetails.qty;

      $("#update").disabled = false;
      $("#delete").disabled = false;
      $("#clear").disabled = false;
      $("#msg").text( "item details found");
      $("#add").disabled = true;
    } else {
      console.log("no item was found");
      $("#update").disabled = true;
      $("#delete").disabled = true;
      $("#clear").disabled = true;
      $("#msg").text( "item no not found");
      $("#price").value = "";
      $("#qty").value = "";
      $("#add").disabled = false;
    }
  }); //end of event handling registration. blue event.

  const update = $("#update");
  update.$("click", () => {
    //intelligence begins
    let input = {
      itemno: $("#itemno").value,
      itemprice: $("#price").value,
      qty: $("#qty").value,
    };

    console.log(input);
    let output = logic.updateItemDetailsLogic(input); //just true or false or just an int or a string is
    //standard kids disease.

    //intelligence ends here..
    if (output) {
      $("#msg").text( "update suceeded");
      $("#update").disabled = true;
      $("#delete").disabled = true;
      $("#clear").disabled = true;
      $("#itemno").value = "";

      $("#price").value = "";
      $("#qty").value = "";
    } else {
      $("#msg").text( "update failed");

      $("#update").disabled = true;
      $("#delete").disabled = true;
      $("#clear").disabled = true;
    }
    showAllItems();
    //intelligence ends.
  });

  const deletebutton = $("#delete");
  deletebutton.$("click", () => {
    let input = $("#itemno").value;

    console.log(input);
    let output = logic.removeItemDetailsLogic(input); //just true or false or just an int or a string is
    //standard kids disease.
    console.log("after delte function" + output);

    //intelligence ends here..
    if (output) {
      $("#msg").text( "delete suceeded bravery");
      $("#update").disabled = true;
      $("#delete").disabled = true;
      $("#clear").disabled = true;
      $("#itemno").value = "";

      $("#price").value = "";
      $("#qty").value = "";
    } else {
      $("#msg").text( "delete failed");

      $("#update").disabled = true;
      $("#delete").disabled = true;
      $("#clear").disabled = true;
    }
    showAllItems();
  });

  const clear = $("#clear");
  clear.$("click", () => {
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

    $("#contents").html( msg);

    const addEL = $("#add");
    addEL.$("click", () => {
      let input = {
        flag: false,
        addNewItem: {
          itemno: $("#itemno").value,
          itemprice: $("#price").value,
          qty: $("#qty").value,
        },
      };
      if(input.addNewItem.itemprice!='' && input.addNewItem.qty!=''){
        logic.addItem(input);
      showAllItems();
      $("#msg").text( "Item added");
      }
      else{
        $("#msg").text( "Enter all details");
      }
      
    });
  }
});
