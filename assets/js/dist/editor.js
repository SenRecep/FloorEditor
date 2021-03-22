window.onload = function () {
    var wrapper = document.getElementById("wrapper");
    var editor = document.getElementById("editor");
    var btnCenter = document.getElementsByClassName("btn-center")[0];
    var btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
    var btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
    var btnFlip = document.getElementsByClassName("btn-flip")[0];
    var zoomSatus = document.getElementById('zoom-satus');
    var x_cursor = 0, y_cursor = 0, x_wrapper = 0, y_wrapper = 0, scale = 1, isDrag = false, isFlip = false;
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
        x_wrapper = window.event.clientX - wrapper.offsetLeft;
        y_wrapper = window.event.clientY - wrapper.offsetTop;
    }
    function stop_drag() {
        isDrag = false;
    }
    function mouseWhile_drag() {
        if (isDrag) {
            x_cursor = window.event.clientX;
            y_cursor = window.event.clientY;
            wrapper.style.left = (x_cursor - x_wrapper) + 'px';
            wrapper.style.top = (y_cursor - y_wrapper) + 'px';
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
                wrapper.style.left = (x_cursor - x_wrapper) + 'px';
                wrapper.style.top = (y_cursor - y_wrapper) + 'px';
            }
            else if (eventDatas.length == 2) {
                var f1 = eventDatas[0];
                var f2 = eventDatas[1];
            }
        }
    }
    function touchstart() {
        var event = window.event;
        var evemtData = event.changedTouches[0];
        isDrag = true;
        x_wrapper = evemtData.clientX - wrapper.offsetLeft;
        y_wrapper = evemtData.clientY - wrapper.offsetTop;
    }
    function centerWrapperOnTheScreen(isCenterBtn) {
        if (isCenterBtn)
            scale = 1;
        var val = (scale * 100).toFixed(0);
        zoomSatus.innerHTML = "" + val;
        wrapper.style.transform = "translate(-50%,-50%) scaleX(" + scale + ") scaleY(" + scale + ")";
    }
    btnCenter.addEventListener("click", function () {
        wrapper.style.left = '50%';
        wrapper.style.top = '50%';
        centerWrapperOnTheScreen(true);
    });
    btnZoomOut.addEventListener("click", function () { return zoom(true); });
    btnZoomIn.addEventListener("click", function () { return zoom(false); });
    btnFlip.addEventListener('click', function () {
        isFlip = !isFlip;
        var val = isFlip ? -scale : scale;
        wrapper.style.transform = "translate(-50%,-50%) scaleX(" + val + ") scaleY(" + scale + ")";
    });
    wrapper.addEventListener('touchstart', touchstart);
    wrapper.addEventListener('mousedown', mouseStartDrag);
    editor.addEventListener('mousemove', mouseWhile_drag);
    editor.addEventListener('touchmove', touchWhile_drag);
    editor.addEventListener('mouseup', stop_drag);
    editor.addEventListener('touchend', stop_drag);
    editor.addEventListener('mousewheel', zoomEvent);
};
