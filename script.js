function makeIncrementers(element) {
  //element is the element on the page we are working on
  //first we get the value of its "data-id" property
  var id = element.attributes["data-id"].value;
  //and its data-label property
  var labelinator = element.attributes["data-label"].value;
  //and we make a new label for our element 
  var label = document.createElement('label');
  //we tell the label it is for id
  label.htmlFor = id;
  //and we set its text to the label we grabbed from the property
  label.innerHTML = labelinator;
  //then we tell it where to go on the page - inside of element
  element.appendChild(label);
  element.appendChild(document.createElement('br'));
  //next we make a new minus button
  var minus = document.createElement('div');
  //we tell it that it is a btn, and a btn-primary
  minus.classList.add("btn", "btn_increment");
  //and we say, when it is clicked, it modifies id by subtracting
  //1 from its value
  minus.onclick = function() { modifyIncrement(id, -1); };
  //and we make the text of the minus button a minus sign
  minus.innerHTML = "-";
  //and we add it to the page
  element.appendChild(minus);
  //then we make a text box
  var input = document.createElement('input');
  input.type = "number";
  input.min = parseInt(element.attributes["data-min"].value);
  input.max = parseInt(element.attributes["data-max"].value);
  //the text box initially says zero
  input.value = "0";
  //we give it a name and the id so we can talk about it
  input.name = id;
  input.id = id;
  input.classList.add("fieldday", "reset-number", "resetable")
  //and we put it on the page
  element.appendChild(input);
  //then we add a plus button the same way as the minus
  var plus = document.createElement('div');
  plus.classList.add("btn", "btn_increment");
  plus.onclick = function() { modifyIncrement(id, 1); };
  plus.innerHTML = "+";
  element.appendChild(plus);
}

function makeSliders(element) {
  var id = element.attributes["data-id"].value;
  var labelinator = element.attributes["data-label"].value;
  //and we make a new label for our element 
  var label = document.createElement('label');
  //we tell the label it is for id
  label.htmlFor = id;
  //and we set its text to the label we grabbed from the property
  label.innerHTML = labelinator;
  //then we tell it where to go on the page - inside of element
  element.appendChild(label);
  element.appendChild(document.createElement('br'));
  var datamin = parseInt(element.attributes["data-min"].value);
  var datamax = parseInt(element.attributes["data-max"].value);

  var slider = document.createElement('input');
  slider.setAttribute("type", "range");
  slider.setAttribute("min", datamin);
  slider.setAttribute("max", datamax);
  slider.setAttribute("list", id + "_list");

  slider.classList.add("sliderelement", "resetable");
  slider.id = id;
  element.appendChild(slider);

  var list = document.createElement('datalist');
  list.id = id + "_list";
  element.appendChild(list);
  for (var i = datamin; i <= datamax; i++) {
    var option = document.createElement('option');
    option.setAttribute("value", i);
    list.appendChild(option);
  }


}

function makeToggles(element) {
  var id = element.attributes["data-id"].value;
  var toggle = document.createElement('div');
  toggle.classList.add("btn", "btn_toggle", "resetable");
  toggle.onclick = function() { modifyToggle(id); };
  toggle.innerHTML = element.attributes["data-label"].value;
  toggle.id = id;
  toggle.setAttribute("value", element.getAttribute("value") === "true");
  toggle.setAttribute("style", element.getAttribute("style"));
  element.appendChild(toggle);
}
function modifyToggle(element) {
  //given an id named element, we get that element on the page
  var inputBox = document.getElementById(element);
  inputBox.setAttribute("value", !(inputBox.attributes["value"].value === "true"));
}



function changeBoxes() {
  alert("I AM RUNNING");
  //Get every single element on the page that has a property
  //that says class="incremental"
  var textboxes = document.getElementsByClassName("incremental");
  //This gives us a list of HTML elements. You can get the
  //length of a list by saying name_of_list.length, which
  //is how many things are in the list. The thing below
  //is called a "for loop", and it runs what is in between
  //the {} until the statement in between the ; ; is false
  //So below, we make a variable called i and set it to 0
  //the code in between the {} will run until i is >= the length
  //of the textboxes array. Then the stuff after the ; ; in the for
  //loop will run, which just increases i by 1
  for (var i = 0; i < textboxes.length; i++) {
    //we get the ith thing from the textbox array
    var element = textboxes[i];
    //and we run the doStuff function on that element
    makeIncrementers(element);
  }
  textboxes = document.getElementsByClassName("toggle");
  for (var i = 0; i < textboxes.length; i++) {
    var element = textboxes[i];
    makeToggles(element);
  }
  textboxes = document.getElementsByClassName("slider");
  for (var i = 0; i < textboxes.length; i++) {
    var element = textboxes[i];
    makeSliders(element);
  }
  save_default_values();
}

function modifyIncrement(element, x) {
  //given an id named element, we get that element on the page
  var inputBox = document.getElementById(element);
  //we then take the current value of that element
  //(what is written in the text box)
  //and turn it into a number - before it was text,
  //(the number 3 is different from the text "3")
  //then we add x to that number, and set the value
  //of the textbox to the result
  inputBox.value = parseInt(inputBox.value) + x;
  //now, to make sure the number is in between certain values
  //we can ask if it was too big or too small
  let datamin = parseInt(inputBox.min);
  let datamax = parseInt(inputBox.max);
  if (inputBox.value < datamin) {
    //if it was too small, set it to some minumum value
    inputBox.value = datamin;
  } else {
    //otherwise, if it was too big
    if (inputBox.value > datamax) {
      //set it to some maximum value
      inputBox.value = datamax;
    }
  }
}

changeBoxes();

var fileNumber = 0;

function save_default_values() {
  var resetables = document.getElementsByClassName("resetable");
  for (var i = 0; i < resetables.length; i++) {
    //we get the ith thing from the resetables array
    var element = resetables[i];
    element.setAttribute("value-reset", element.value);
    if (element.value == undefined) {
      element.setAttribute("value-reset", element.attributes["value"].value);
    }
  }
}

function save() {
  console.log("clicked submit");
  var link = document.createElement('a');
  fileNumber = fileNumber + 1;
  var string = "";
  let fields = document.querySelectorAll("input, .btn_toggle, textarea");
  for (var i = 0; i < fields.length; i++) {
    var value = fields[i].value;
    if (fields[i].classList.contains("btn_toggle")) {
      if (fields[i].attributes["value"].value == "true") {
        value = 1;
      } else {
        value = 0;
      }
    }
    if (fields[i].type == "checkbox") {
      if (fields[i].checked == true) {
        value = 1;
      } else {
        value = 0;
      }
    }
    string += '"' + value.toString().replace('"', '""') + '",';
    //string += '"'+fields[i].id.toString().replace('"', '""')+'",';
  }
  var tablet = document.getElementById('Tablet');
  var k = tablet.value + 'data' + fileNumber + '.csv';
  link.download = k;
  var blob = new Blob([string], { type: 'text/plain' });
  //if (window.plugins != undefined) {
  //}
  link.href = window.URL.createObjectURL(blob);
  link.click();
  var matchnum = document.getElementById("Match");
  matchnum.value = parseInt(matchnum.value) + 1;
  var resetables = document.getElementsByClassName("resetable");
  for (var i = 0; i < resetables.length; i++) {
    var element = resetables[i];
    console.log(element.value + " , " + element.attributes["value-reset"].value)
    element.value = element.attributes["value-reset"].value;
    element.setAttribute("value", element.attributes["value-reset"].value);
  }
  document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  document.querySelectorAll('input[type=radio]:checked').forEach(el => el.checked = false);
  write(k, blob);
  window.plugins.toast.showShortBottom("SUBMITTED WITH v23.02.11!");
}