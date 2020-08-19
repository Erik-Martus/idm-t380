"use strict";

//for now still not using the node package
//const iro = require('@jaames/iro');
var picker_tool = document.getElementById('color-picker'); // hi

picker_tool.addEventListener('mousedown', function () {
  openModal(this.id);
}); //initialize color picker with iro

var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker wheel. can only be modified in js in px
  width: 200,
  // Set the initial color to pure red
  color: "#fff"
}); // Function displays selected modal. Accepts paramater of the clicked element's ID.

function openModal(e) {
  var modal = document.getElementById("".concat(e, "_modal"));
  modal.classList.add('active');
  closeBtn = document.querySelector('.active .close');
  closeBtn.addEventListener('mousedown', function () {
    modal.classList.remove('active');
  }); // If user clicks outside of the modal content box, modal will clos
  // Note this requires content inside of the modal content box to work (not positioned absolutely)

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('active');
    }
  };
}

; //display hex code when picker is used

colorPicker.on('color:change', function (color) {
  document.getElementById('hexchange').innerHTML = color.hexString;
});
//# sourceMappingURL=main.js.map
