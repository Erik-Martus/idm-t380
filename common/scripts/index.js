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
    var modal = document.getElementById(`${e}_modal`);
    modal.classList.add('active');

    closeBtn = document.querySelector('.active .close');
    closeBtn.addEventListener('mousedown', function () {
        modal.classList.remove('active');
    });

    // If user clicks outside of the modal content box, modal will clos
    // Note this requires content inside of the modal content box to work (not positioned absolutely)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('active');
        }
    }
};

//initialize undo button
const undoBtn = document.getElementById('undoButton');
undoBtn.addEventListener('click', undoColor);

//container for previous actions for undo
const theStack = [];

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
//also cache it as an option
var colorswatches = document.getElementsByClassName("swatch");
let customcolori = 0;
colorPicker.on('color:change', function(color) {
    window.newColor = document.getElementById('hexchange').innerHTML=(color.hexString);
    //use the almighty modulo to cache the new color
    colorswatches[customcolori%5].style.background=color.hexString;
    customcolori+= 1;
});


//recolor SVG
//also add previous item/color combo to stack for undo function
function clickEvent(evt) {
    console.log(evt.target);
    const target = evt.target;
    if (target.classList.contains('paintable')) {
      window.prevItem = evt.target;
      window.prevColor=(evt.target.getAttribute('fill'));
      theStack.push([window.prevItem, window.prevColor]);
      //below is what changes the color
      evt.target.setAttribute('fill', currentColor);
    }
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
        theStack.pop();
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

// Back Button
function confirmAction() {
	var txt;
	if (confirm("Are you sure you want to go back? All changes will be lost!")) {
		window.history.back();
	}
}	