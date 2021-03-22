window.onload = function () {
    const wrapper:HTMLElement=document.getElementById("wrapper");
    const editor:HTMLElement=document.getElementById("editor");
    
    var 
        x_cursor = 0,
        y_cursor = 0,
        x_wrapper = 0,
        y_wrapper = 0,
        scale = 1,
        isDrag:Boolean=false;



    function zoom(event:any) {
        event.preventDefault();
        scale += event.deltaY * -0.01;
        scale = Math.min(Math.max(.125, scale),8);
        wrapper.style.transform = `scale(${scale})`;
    }


    function mouseStartDrag() {
        isDrag=true;
        x_wrapper = (<any>window.event).clientX - wrapper.offsetLeft;
        y_wrapper = (<any>window.event).clientY - wrapper.offsetTop;

    }

    function stop_drag() {
        isDrag=false;
    }

    function mouseWhile_drag() {
        if (isDrag) {
            x_cursor = (<any>window.event).clientX;
            y_cursor = (<any>window.event).clientY;
            wrapper.style.left = (x_cursor - x_wrapper) + 'px';
            wrapper.style.top = (y_cursor - y_wrapper) + 'px';
        }
    }


    function touchWhile_drag() {
        if (isDrag) {
            var event:TouchEvent=<TouchEvent>window.event; 
            var eventDatas= event.changedTouches;
            if(eventDatas.length==1){
                var evemtData=eventDatas[0];
                x_cursor = evemtData.clientX;
                y_cursor = evemtData.clientY;
                wrapper.style.left = (x_cursor - x_wrapper) + 'px';
                wrapper.style.top = (y_cursor - y_wrapper) + 'px';
            }
            else if(eventDatas.length==2){
                var f1=eventDatas[0];
                var f2=eventDatas[1];
                
            }
        }
    }

    function touchstart(){
        var event:TouchEvent=<TouchEvent>window.event; 
        var evemtData= event.changedTouches[0];
        isDrag=true;
        x_wrapper =evemtData.clientX - wrapper.offsetLeft;
        y_wrapper = evemtData.clientY - wrapper.offsetTop;
    }

    wrapper.addEventListener('touchstart', touchstart);
    wrapper.addEventListener('mousedown', mouseStartDrag);

    editor.addEventListener('mousemove', mouseWhile_drag);
    editor.addEventListener('touchmove', touchWhile_drag);
    
    editor.addEventListener('mouseup', stop_drag);
    editor.addEventListener('touchend', stop_drag);
    
    editor.addEventListener('mousewheel', zoom);
}


