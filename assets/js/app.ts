window.onload = function () {
    const wrapperElement = <HTMLElement>document.getElementById("wrapper");
    const editorElement = <HTMLElement>document.getElementById("editor");

    const btnCenter = document.getElementsByClassName("btn-center")[0];
    const btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
    const btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
    const btnFlip = document.getElementsByClassName("btn-flip")[0];
    const zoomSatus = document.getElementsByClassName('zoom-satus')[0];

    var
     x_cursor: number = 0,
     y_cursor: number = 0,
     x_wrapper: number = 0,
     y_wrapper: number = 0,
     scale: number = 0,
     isDrag: boolean = false,
     isFlip: boolean = false;

    function centerWrapperOnTheScreen(isCenterBtn: boolean) {
        if (isCenterBtn)
            scale = 1;
        var val = (scale * 100).toFixed(0);
        zoomSatus.innerHTML = `${val}`;
        wrapperElement.style.transform = `translate(-50%,-50%) scaleX(${scale}) scaleY(${scale})`;
    }

    function zoom(direction: boolean) {
        scale += direction ? -(scale * 0.3) : 1;
        scale = Math.min(Math.max(.125, scale), 8);
        centerWrapperOnTheScreen(false);
    }

    function zoomEvent(event: any) {
        event.preventDefault();
        zoom(event.deltaY > 0);
    }

    function mouseStartDrag() {
        isDrag = true;
        x_wrapper = (<any>window.event).clientX - wrapperElement.offsetLeft;
        y_wrapper = (<any>window.event).clientY - wrapperElement.offsetTop;
    }

    function stop_drag() {
        isDrag = false;
    }

    function mouseWhile_drag() {
        if (isDrag) {
            x_cursor = (<any>window.event).clientX;
            y_cursor = (<any>window.event).clientY;
            wrapperElement.style.left = (x_cursor - x_wrapper) + 'px';
            wrapperElement.style.top = (y_cursor - y_wrapper) + 'px';
        }
    }

    function touchWhile_drag() {
        if (isDrag) {
            var event: TouchEvent = <TouchEvent>window.event;
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
        var event: TouchEvent = <TouchEvent>window.event;
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
        wrapperElement.style.transform = `translate(-50%,-50%) scaleX(${val}) scaleY(${scale})`;
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

}


