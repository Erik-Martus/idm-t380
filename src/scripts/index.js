//initialize color picker with iro
var colorPicker = new iro.ColorPicker("#picker", {
    // Set the size of the color picker wheel. can only be modified in js in px
    width: 200,
    // Set the initial color to pure white
    color: "#fff"
});

//open modal
const picker_tool = document.getElementById('color-picker');
picker_tool.addEventListener('mousedown', function () {
    openModal(this.id);
});

const image_gallery = document.getElementById('image-gallery');
const gallery_modal = document.getElementById('image-gallery_modal');
image_gallery.addEventListener('mousedown', function () {
    if (gallery_modal.classList.contains('active')) {
        gallery_modal.classList.remove('active');
    } else {
        gallery_modal.classList.add('active');
    }
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
    window.onclick = function (event) {
        if (event.target == modal) {
            window.modal.classList.remove('active');
        }
    }
};

//container for previous actions for undo/redo
let undoStack = [];
let redoStack = [];

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
colorPicker.on('color:change', function (color) {
    window.newColor = document.getElementById('hexchange').innerHTML = (color.hexString);
    document.getElementById('selected-color-shower').style.backgroundColor = window.newColor;
});

//cache color as an option
let customcolori = 0;
function cachecolor() {
    //use the almighty modulo to cache the new color
    colorswatches[customcolori % 5].style.background = window.newColor;
    customcolori += 1;
    //close the modal upon adding new color
    window.modal.classList.remove('active');
    setColor(colorswatches[(customcolori % 5) - 1]);
    console.log(colorswatches[customcolori % 5]);
}

//driver for when you click inside the coloring page
//driver for changing color, as well as helper functions for undo/redo
function clickEvent(evt) {
    const target = evt.target; //the path that was clicked on
    if (target.classList.contains('paintable')) {
        checkTool(); //change global currentColor based on if pencil or eraser is selected
        undoRedoManage(target); //a function for changing whats stored in undo/redo when things are colored
        target.setAttribute('fill', currentColor); //the line that actually colors the target when its clicked on
    }
}

//modify undo/redo stack when the user colors something
function undoRedoManage(target) {
    redoStack = []; //can't redo if the last action wasn't an undo
    let prevColor = target.getAttribute('fill'); //current color before its changed
    undoStack.push([target, prevColor]); //push target with previous color to undo stack
    checkTool();
    undoStack.push([target, currentColor]); //push target with current color to undo stack
}

//modifies global var currentColor based on if pencil or eraser is selected
function checkTool() {
    if (pencil.classList.contains('active')) {
        console.log('Using pencil tool');
        currentColor = selectedColor;
    } else if (eraser.classList.contains('active')) {
        currentColor = '#ffffff';
    }
}

//initialize coloring tools
const pencil = document.getElementById('pencilTool');
const eraser = document.getElementById('eraserTool');

//set new color to pencil in
function setColor(evt) {
    console.log(evt);
    selectedColorItem = evt;
    selectedColor = getComputedStyle(evt).backgroundColor;
    selectedColor = RGBToHex(selectedColor);
    var colorswatches = document.querySelectorAll('.swatch');
    colorswatches.forEach(swatch => {
        swatch.classList.remove('active');
    });
    window.setTimeout(() => {
        selectedColorItem.classList.add('active');
    }, 100);
};

//set pencil tool functionality
pencil.addEventListener('click', function () {
    if (eraser.classList.contains('active')) {
        eraser.classList.remove('active');
        pencil.classList.add('active');
    }
})

//set eraser tool functionality
eraser.addEventListener('click', function () {
    if (pencil.classList.contains('active')) {
        pencil.classList.remove('active');
        eraser.classList.add('active');
    }
})

//undo previous color change to svg
function undoColor() {
    if (undoStack.length > 0) {
        let theObject = undoStack[undoStack.length - 2][0];
        let theColor = undoStack[undoStack.length - 2][1];
        theObject.setAttribute('fill', theColor);
        redoStack.push(undoStack.pop()); //pop the one to redo to from undo to redo
        redoStack.push(undoStack.pop()); //pop the one you undo'd to from undo to redo
    }
}

//redo. this only happens if the last thing you did was an undo
function redoColor() {
    if (redoStack.length > 0) {
        let theObject = redoStack[redoStack.length - 2][0];
        let theColor = redoStack[redoStack.length - 2][1];
        theObject.setAttribute('fill', theColor);
        undoStack.push(redoStack.pop()); //pop the one you undo'd to from redo to undo
        undoStack.push(redoStack.pop()); //pop the one to redo to from redo to undo
    }
}

// Back Button
function confirmAction() {
    var txt;
    if (confirm("Are you sure you want to go back? All changes will be lost!")) {
        window.history.back();
    }
}

// Toggle background color
function changeBackground() {
    var element = document.body;
    var isColored = false;

    if (isColored) {
        isColored = false;
    } else {
        element.classList.toggle("accessibility-mode")
        element.classList.toggle("accessibility-mode-off")
        isColored = true;
    }
}