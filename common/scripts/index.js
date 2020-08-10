//initialize color picker with iro
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker wheel. can only be modified in js in px
  width: 200,
  // Set the initial color to pure white
  color: "#fff"
});

//open modal
const picker_tool = document.getElementById('color-picker');
picker_tool.addEventListener('mousedown', function() {
    openModal(this.id);
});

// Function displays selected modal. Accepts paramater of the clicked element's ID.
function openModal(e) {
    window.modal = document.getElementById(`${e}_modal`);
    window.modal.classList.add('active');

    closeBtn = document.querySelector('.active .close');
    closeBtn.addEventListener('mousedown', function () {
        window.modal.classList.remove('active');
    });

    // If user clicks outside of the modal content box, modal will close
    // Note this requires content inside of the modal content box to work (not positioned absolutely)
    window.onclick = function(event) {
        if (event.target == modal) {
            window.modal.classList.remove('active');
        }
    }
};

//container for previous actions for undo
const theStack = [];
const redoStack = []; //another one

//initialize undo button
const undoBtn = document.getElementById('undoButton');
undoBtn.addEventListener('click', undoColor);

//initialize redo button
const redoBtn = document.getElementById('redoButton');
redoBtn.addEventListener('click', redoColor);

//confirmation button for color picker
const confirm = document.getElementById('confirm');
confirm.addEventListener('click', cachecolor);

//convert rgb to hex
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

//display hex code when picker is used
var colorswatches = document.getElementsByClassName("swatch");
colorPicker.on('color:change', function(color) {
    window.newColor = document.getElementById('hexchange').innerHTML = (color.hexString);
    document.getElementById('selected-color-shower').style.backgroundColor=window.newColor;
});

//cache color as an option
let customcolori = 0;
function cachecolor() {
    //use the almighty modulo to cache the new color
    colorswatches[customcolori%5].style.background=window.newColor;
    customcolori+= 1;
    //close the modal upon adding new color
    window.modal.classList.remove('active');
}

//recolor SVG
//also add previous item/color combo to stack for undo function
function clickEvent(evt) {
<<<<<<< Updated upstream
    window.prevItem = evt.target;
    window.prevColor=(evt.target.getAttribute('fill'));
    theStack.push([window.prevItem, window.prevColor]);
    //below is what changes the color
    evt.target.setAttribute('fill', currentColor);
=======
    const target = evt.target;
    if (target.classList.contains('paintable')) {
      window.prevItem = evt.target;
      window.prevColor=(evt.target.getAttribute('fill'));
      theStack.push([window.prevItem, window.prevColor]);
      //below is what changes the color
      evt.target.setAttribute('fill', currentColor);
    }
>>>>>>> Stashed changes
}

//set new color to pencil in
function setColor(evt) {
    // Remove active class from all swatches
    currentColorItem = evt;
    currentColor = getComputedStyle(evt).background;
    currentColor = RGBToHex(currentColor);
    //console.log(currentColor);
    currentColorItem.classList.add('active');
};

//undo previous color change to svg
function undoColor(){
    if (theStack.length>0){
        let theObject = theStack[theStack.length-1][0];
        let theColor = theStack[theStack.length-1][1];
        if(theColor == null){
            theColor = checkDefault(theObject);
        }
        theObject.setAttribute('fill', theColor);
        redoStack.push(theStack.pop()); //pop from undo to redo
        console.log(redoStack);
    }
}

function redoColor(){
    console.log('hi')
    if (redoStack.length>0){
        let theObject = redoStack[redoStack.length-1][0];
        let theColor = redoStack[redoStack.length-1][1];
        if(theColor == null){
            theColor = checkDefault(theObject);
        }
        theObject.setAttribute('fill', theColor);
        theStack.push(redoStack.pop());
    }
}

function checkDefault(theItem){
    if(theItem.classList.contains('defaultBlack')){
        return '#000000';
    }
    else {
        return '#FFFFFF';
    }
}