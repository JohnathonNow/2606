var theBestString = "i love robotics";
console.log(theBestString);

function doStuff(element) {
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
    minus.classList.add("btn", "btn-primary");
    //and we say, when it is clicked, it modifies id by subtracting
    //1 from its value
    minus.onclick = function(){modify(id, -1);};
    //and we make the text of the minus button a minus sign
    minus.innerHTML = "-";
    //and we add it to the page
    element.appendChild(minus);
    //then we make a text box
    var input = document.createElement('input');
    //the text box initially says zero
    input.value = "0";
    //we give it a name and the id so we can talk about it
    input.name = id;
    input.id = id;
    input.classList.add("fieldday");
    input.classList.add("reset-number");
    input.classList.add("resetable");
    //and we put it on the page
    element.appendChild(input);
    //then we add a plus button the same way as the minus
    var plus = document.createElement('div');
    plus.classList.add("btn", "btn-primary");
    plus.onclick = function(){modify(id, 1);};
    plus.innerHTML = "+";
    element.appendChild(plus);
}

function changeBoxes() {
    console.log("I AM RUNNING");
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
        doStuff(element);
    }
  save_default_values();
}

function modify(element, x) {
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
    if (inputBox.value < 0) {
        //if it was too small, set it to some minumum value
        inputBox.value = 0;
    } else {
        //otherwise, if it was too big
        if (inputBox.value > 2607) {
            //set it to some maximum value
            inputBox.value = 2607;
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
    }
}

function save() {
  //if (window.plugins != undefined && window.plugins.toast != undefined) {
    window.plugins.toast.showShortBottom("SUBMITTED WITH v22.02.27!");
  //}
    console.log("clicked submit");

    var matchnum = document.getElementById("matchnum");
    var whoami = document.getElementById("whoami");
    var teamnum = document.getElementById("teamnum");
    var auton_upper_hub_count = document.getElementById("auton-upper-hub-count");
    var auton_lower_hub_count = document.getElementById("auton-lower-hub-count");
    var teleop_upper_hub_count = document.getElementById("teleop-upper-hub-count");
    var teleop_lower_hub_count = document.getElementById("teleop-lower-hub-count");
    var wholeradio = document.getElementsByName("avengersendgame")
    var checkboxes = document.getElementsByName("checkbox")
    window.plugins.toast.showShortBottom("test1");
    for (let i of wholeradio) {
        if (i.checked) {
            var avengersendgame = i.value
        }
    }
    var comments = document.getElementById("comments");
    console.log(comments.value)
    window.plugins.toast.showShortBottom("teststevensonteststevenson")
    var string = "" + matchnum.value + "," + whoami.value + "," + teamnum.value + "," + auton_upper_hub_count.value + "," + auton_lower_hub_count.value + "," + teleop_upper_hub_count.value + "," + teleop_lower_hub_count.value + "," + avengersendgame + ",\"" + (comments.value.replace(/\"/g, "\"\"")) + "\"";
    window.plugins.toast.showShortBottom("this is how we finally narrow it down.")
    for (let i of checkboxes) {
        if (i.checked == true) {
            i = i.value;
        } else {
            i = "NO " + i.value;
        }
        string += "," + i;
    }
    window.plugins.toast.showShortBottom("test2222222222222");
    var link = document.createElement('a');
    window.plugins.toast.showShortBottom("test333333333333333333333333333");
    fileNumber = fileNumber + 1;
    var k = 'data' + fileNumber + '.csv';
    window.plugins.toast.showShortBottom("test44444444444444444444444444444444444444444444444444");
    link.download = k;
    var blob = new Blob([string], {type: 'text/plain'});
    //if (window.plugins != undefined) {
      write(k, blob);
    //}
    link.href = window.URL.createObjectURL(blob);
    link.click();
    window.plugins.toast.showShortBottom("test55555555555555555555555555555555555555555555555555555555555555555555555555");
    var matchnum = document.getElementById("matchnum");
    matchnum.value = parseInt(matchnum.value) + 1;
    var resetables = document.getElementsByClassName("resetable");
    for (var i = 0; i < resetables.length; i++) {
        //we get the ith thing from the resetables array
        var element = resetables[i];
        console.log(element.value + " , " + element.attributes["value-reset"].value)
        element.value = element.attributes["value-reset"].value;
    }
  document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  document.querySelectorAll('input[type=radio]:checked').forEach(el => el.checked = false);
}







/* var matchnum = document.getElementById("matchnum");
var whoami = document.getElementById("whoami");
var teamnum = document.getElementById("teamnum");
var tarmac = document.getElementById("tarmac");
var auton_upper_hub_count = document.getElementById("auton-upper-hub-count");
var auton_lower_hub_count = document.getElementById("auton-lower-hub-count");
var teleop_upper_hub_count = document.getElementById("teleop-upper-hub-count");
var teleop_lower_hub_count = document.getElementById("teleop-lower-hub-count");
var fender = document.getElementById("fender");
var launch_pad = document.getElementById("launch pad");
var terminal = document.getElementById("terminal");
var mid_field = document.getElementById("mid-field");
var defense = document.getElementById("defense");
var nodefense = document.getElementById("nodefense");
var hp = document.getElementById("hp");
var ground = document.getElementById("ground");
var wholeradio = document.getElementsByName("avengersendgame")
var checkboxes = document.getElementsByName("checkbox")
var endgamedefense = document.getElementById("endgamedefense");
var continuetoscore = document.getElementById("continuetoscore");
var comments = document.getElementById("comments");
for (let i of wholeradio) {
  if (i.checked) {
    var avengersendgame = i.value
  }
}
for (let i of checkboxes) {
  if (i.checked == true) {
    i = i.value;
  } else {
    i = "NO";
  }
}

var string = "" + matchnum.value + "," + whoami.value + "," + teamnum.value + "," + tarmac.value + "," + auton_upper_hub_count.value + "," + auton_lower_hub_count.value + "," + teleop_upper_hub_count.value + "," + teleop_lower_hub_count.value + "," + fender.value + "," + terminal.value + ","  + launch_pad.value + ","+ mid_field.value + "," + defense.value + "," + nodefense.value + "," + hp.value + "," + ground.value + "," + avengersendgame + "," + endgamedefense.value + "," + continuetoscore.value + "," + comments.value;*/
