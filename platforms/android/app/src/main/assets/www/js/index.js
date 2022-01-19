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
var fileNumber = 0;

function saveme() {
    console.log("hi");
    var matchnum = document.getElementById("matchnum");
    matchnum.value = parseInt(matchnum.value) + 1;
    var string = "hi";
    var link = document.createElement('a');
    fileNumber = fileNumber + 1;
    link.download = 'data' + fileNumber + '.csv';
    var blob = new Blob([string], {type: 'text/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
    write("bob.txt", null);
}

var el = document.getElementById("submit");
el.addEventListener("click", saveme, false);
changeBoxes();
function write(name, data) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile(name, { create: true, exclusive: false }, function (fileEntry) {

        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        writeFile(fileEntry, data);

    }, onErrorCreateFile);

}, onErrorLoadFs);
}
function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

