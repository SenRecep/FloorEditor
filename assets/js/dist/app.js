window.onload = function () {
    var wrapperElement = document.getElementById("wrapper");
    var editorElement = document.getElementById("editor");
    var btnCenter = document.getElementsByClassName("btn-center")[0];
    var btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
    var btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
    var btnFlip = document.getElementsByClassName("btn-flip")[0];
    var zoomSatus = document.getElementsByClassName('zoom-satus')[0];
    var x_cursor = 0, y_cursor = 0, x_wrapper = 0, y_wrapper = 0, scale = 0, isDrag = false, isFlip = false;
    function centerWrapperOnTheScreen(isCenterBtn) {
        if (isCenterBtn)
            scale = 1;
        var val = (scale * 100).toFixed(0);
        zoomSatus.innerHTML = "" + val;
        wrapperElement.style.transform = "translate(-50%,-50%) scaleX(" + scale + ") scaleY(" + scale + ")";
    }
    function zoom(direction) {
        scale += direction ? -(scale * 0.3) : 1;
        scale = Math.min(Math.max(.125, scale), 8);
        centerWrapperOnTheScreen(false);
    }
    function zoomEvent(event) {
        event.preventDefault();
        zoom(event.deltaY > 0);
    }
    function mouseStartDrag() {
        isDrag = true;
        x_wrapper = window.event.clientX - wrapperElement.offsetLeft;
        y_wrapper = window.event.clientY - wrapperElement.offsetTop;
    }
    function stop_drag() {
        isDrag = false;
    }
    function mouseWhile_drag() {
        if (isDrag) {
            x_cursor = window.event.clientX;
            y_cursor = window.event.clientY;
            wrapperElement.style.left = (x_cursor - x_wrapper) + 'px';
            wrapperElement.style.top = (y_cursor - y_wrapper) + 'px';
        }
    }
    function touchWhile_drag() {
        if (isDrag) {
            var event = window.event;
            var eventDatas = event.changedTouches;
            if (eventDatas.length == 1) {
                var evemtData = eventDatas[0];
                x_cursor = evemtData.clientX;
                y_cursor = evemtData.clientY;
                wrapperElement.style.left = (x_cursor - x_wrapper) + 'px';
                wrapperElement.style.top = (y_cursor - y_wrapper) + 'px';
            }
            else if (eventDatas.length == 2) {
                // var f1=eventDatas[0];
                // var f2=eventDatas[1];
            }
        }
    }
    function touchstart() {
        var event = window.event;
        var evemtData = event.changedTouches[0];
        isDrag = true;
        x_wrapper = evemtData.clientX - wrapperElement.offsetLeft;
        y_wrapper = evemtData.clientY - wrapperElement.offsetTop;
    }
    function btnCenterClick() {
        wrapperElement.style.left = '50%';
        wrapperElement.style.top = '50%';
        centerWrapperOnTheScreen(true);
    }
    function btnZoomOutClick() {
        zoom(true);
    }
    function btnZoomInClick() {
        zoom(false);
    }
    function btnFlipClick() {
        isFlip = !isFlip;
        var val = isFlip ? -scale : scale;
        wrapperElement.style.transform = "translate(-50%,-50%) scaleX(" + val + ") scaleY(" + scale + ")";
    }
    btnCenter.addEventListener("click", btnCenterClick);
    btnZoomOut.addEventListener("click", btnZoomOutClick);
    btnZoomIn.addEventListener("click", btnZoomInClick);
    btnFlip.addEventListener('click', btnFlipClick);
    wrapperElement.addEventListener('touchstart', touchstart);
    wrapperElement.addEventListener('mousedown', mouseStartDrag);
    editorElement.addEventListener('mousemove', mouseWhile_drag);
    editorElement.addEventListener('touchmove', touchWhile_drag);
    editorElement.addEventListener('mouseup', stop_drag);
    editorElement.addEventListener('touchend', stop_drag);
    editorElement.addEventListener('mousewheel', zoomEvent);
};
