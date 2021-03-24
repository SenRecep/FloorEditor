"use strict";
exports.__esModule = true;
var editor_1 = require("./editor");
var editorController_1 = require("./editorController");
window.onload = function () {
    var wrapperElement = document.getElementById("wrapper");
    var editorElement = document.getElementById("editor");
    var btnCenter = document.getElementsByClassName("btn-center")[0];
    var btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
    var btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
    var btnFlip = document.getElementsByClassName("btn-flip")[0];
    var zoomSatus = document.getElementsByClassName('zoom-satus')[0];
    var editorController = new editorController_1.EditorController(btnCenter, btnZoomOut, btnZoomIn, btnFlip, zoomSatus);
    var editor = new editor_1.Editor(wrapperElement, editorElement, editorController);
    editor.Init();
};
