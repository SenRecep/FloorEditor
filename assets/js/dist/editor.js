"use strict";
exports.__esModule = true;
exports.Editor = void 0;
var Editor = /** @class */ (function () {
    function Editor(wrapper, editor, editorController) {
        this.x_cursor = 0;
        this.y_cursor = 0;
        this.x_wrapper = 0;
        this.y_wrapper = 0;
        this.scale = 0;
        this.isDrag = false;
        this.isFlip = false;
        this._wrapper = wrapper;
        this._editor = editor;
        this._editorController = editorController;
    }
    Editor.prototype.centerWrapperOnTheScreen = function (isCenterBtn) {
        if (isCenterBtn)
            this.scale = 1;
        var val = (this.scale * 100).toFixed(0);
        this._editorController._zoomSatus.innerHTML = "" + val;
        this._wrapper.style.transform = "translate(-50%,-50%) scaleX(" + this.scale + ") scaleY(" + this.scale + ")";
    };
    Editor.prototype.zoom = function (direction) {
        this.scale += direction ? -(this.scale * 0.3) : 1;
        this.scale = Math.min(Math.max(.125, this.scale), 8);
        this.centerWrapperOnTheScreen(false);
    };
    Editor.prototype.zoomEvent = function (event) {
        event.preventDefault();
        this.zoom(event.deltaY > 0);
    };
    Editor.prototype.mouseStartDrag = function () {
        this.isDrag = true;
        this.x_wrapper = window.event.clientX - this._wrapper.offsetLeft;
        this.y_wrapper = window.event.clientY - this._wrapper.offsetTop;
    };
    Editor.prototype.stop_drag = function () {
        this.isDrag = false;
    };
    Editor.prototype.mouseWhile_drag = function () {
        if (this.isDrag) {
            this.x_cursor = window.event.clientX;
            this.y_cursor = window.event.clientY;
            this._wrapper.style.left = (this.x_cursor - this.x_wrapper) + 'px';
            this._wrapper.style.top = (this.y_cursor - this.y_wrapper) + 'px';
        }
    };
    Editor.prototype.touchWhile_drag = function () {
        if (this.isDrag) {
            var event = window.event;
            var eventDatas = event.changedTouches;
            if (eventDatas.length == 1) {
                var evemtData = eventDatas[0];
                this.x_cursor = evemtData.clientX;
                this.y_cursor = evemtData.clientY;
                this._wrapper.style.left = (this.x_cursor - this.x_wrapper) + 'px';
                this._wrapper.style.top = (this.y_cursor - this.y_wrapper) + 'px';
            }
            else if (eventDatas.length == 2) {
                // var f1=eventDatas[0];
                // var f2=eventDatas[1];
            }
        }
    };
    Editor.prototype.touchstart = function () {
        var event = window.event;
        var evemtData = event.changedTouches[0];
        this.isDrag = true;
        this.x_wrapper = evemtData.clientX - this._wrapper.offsetLeft;
        this.y_wrapper = evemtData.clientY - this._wrapper.offsetTop;
    };
    Editor.prototype.btnCenterClick = function () {
        this._wrapper.style.left = '50%';
        this._wrapper.style.top = '50%';
        this.centerWrapperOnTheScreen(true);
    };
    Editor.prototype.btnZoomOutClick = function () {
        this.zoom(true);
    };
    Editor.prototype.btnZoomInClick = function () {
        this.zoom(false);
    };
    Editor.prototype.btnFlipClick = function () {
        this.isFlip = !this.isFlip;
        var val = this.isFlip ? -this.scale : this.scale;
        this._wrapper.style.transform = "translate(-50%,-50%) scaleX(" + val + ") scaleY(" + this.scale + ")";
    };
    Editor.prototype.Init = function () {
        this._editorController._btnCenter.addEventListener("click", this.btnCenterClick);
        this._editorController._btnZoomOut.addEventListener("click", this.btnZoomOutClick);
        this._editorController._btnZoomIn.addEventListener("click", this.btnZoomInClick);
        this._editorController._btnFlip.addEventListener('click', this.btnFlipClick);
        this._wrapper.addEventListener('touchstart', this.touchstart);
        this._wrapper.addEventListener('mousedown', this.mouseStartDrag);
        this._editor.addEventListener('mousemove', this.mouseWhile_drag);
        this._editor.addEventListener('touchmove', this.touchWhile_drag);
        this._editor.addEventListener('mouseup', this.stop_drag);
        this._editor.addEventListener('touchend', this.stop_drag);
        this._editor.addEventListener('mousewheel', this.zoomEvent);
    };
    return Editor;
}());
exports.Editor = Editor;
