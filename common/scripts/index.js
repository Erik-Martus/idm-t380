//for now still not using the node package
//const iro = require('@jaames/iro');
const picker_tool = document.getElementById('color-picker');

picker_tool.addEventListener('mousedown', function() {
    openModal(this.id);
});

//initialize color picker with iro
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker wheel. can only be modified in js in px
  width: 200,
  // Set the initial color to pure red
  color: "#fff"
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
let i = 0;
colorPicker.on('color:change', function(color) {
    document.getElementById('hexchange').innerHTML=(color.hexString);
    //use the almighty modulo to cache the new color
    colorswatches[i%5].style.background=color.hexString;
    i+= 1;
});

function clickEvent(evt) {
    evt.target.setAttribute('fill', currentColor)
}

function setColor(evt) {
    // Remove active class from all swatches

    currentColorItem = evt;
    currentColor = getComputedStyle(evt).background;
    currentColor = RGBToHex(currentColor);
    console.log(currentColor);
    currentColorItem.classList.add('active');
};




