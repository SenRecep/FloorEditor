"use strict";

var _index = _interopRequireDefault(require("https://cdn.interactjs.io/v1.10.11/interactjs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _index["default"])('.resize-drag').resizable({
  // resize from all edges and corners
  edges: {
    left: true,
    right: true,
    bottom: true,
    top: true
  },
  listeners: {
    move: function move(event) {
      var target = event.target;
      var x = parseFloat(target.getAttribute('data-x')) || 0;
      var y = parseFloat(target.getAttribute('data-y')) || 0; // update the element's style

      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px'; // translate when resizing from top or left edges

      x += event.deltaRect.left;
      y += event.deltaRect.top;
      target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = Math.round(event.rect.width) + "\xD7" + Math.round(event.rect.height);
    }
  },
  modifiers: [// keep the edges inside the parent
  _index["default"].modifiers.restrictEdges({
    outer: 'parent'
  }), // minimum size
  _index["default"].modifiers.restrictSize({
    min: {
      width: 100,
      height: 50
    }
  })],
  inertia: true
}).draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [_index["default"].modifiers.restrictRect({
    restriction: 'parent',
    endOnly: true
  })],
  // enable autoScroll
  autoScroll: true,
  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,
    // call this function on every dragend event
    end: function end(event) {
      var textEl = event.target.querySelector('p');
      textEl && (textEl.textContent = 'moved a distance of ' + Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0).toFixed(2) + 'px');
    }
  }
});

function dragMoveListener(event) {
  var target = event.target; // keep the dragged position in the data-x/data-y attributes

  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'; // update the posiion attributes

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
} // this function is used later in the resizing and gesture demos


window.dragMoveListener = dragMoveListener;
var item = document.getElementById('item');
var testitem = document.getElementById('testitem');
var wrapper = document.getElementById('wrapper');
document.getElementById('save').addEventListener('click', function () {
  var height = item.style.height;
  var width = item.style.width;
  var x = item.dataset.x;
  var y = item.dataset.y;
  var left = x / wrapper.offsetWidth * 100;
  var top = y / wrapper.offsetHeight * 100;
  testitem.style.left = "".concat(left, "%");
  testitem.style.top = "".concat(top, "%");
  testitem.style.height = height;
  testitem.style.width = width;
  console.clear();
  console.log({
    left: testitem.style.left,
    top: testitem.style.top
  });
  console.log({
    h: wrapper.offsetHeight,
    w: wrapper.offsetWidth
  });
  console.log({
    height: height,
    width: width,
    x: x,
    y: y
  });
});