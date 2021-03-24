import {EditorController} from './editorController'
export class Editor {
    private readonly _wrapper: HTMLElement;
    private readonly _editor: HTMLElement;
    private readonly _editorController: EditorController;


    private x_cursor: number = 0;
    private y_cursor: number = 0;
    private x_wrapper: number = 0;
    private y_wrapper: number = 0;
    private scale: number = 0;
    private isDrag: boolean = false;
    private isFlip: boolean = false;

    constructor(wrapper: HTMLElement, editor: HTMLElement, editorController: EditorController) {
        this._wrapper = wrapper;
        this._editor = editor;
        this._editorController = editorController;
    }

    private centerWrapperOnTheScreen(isCenterBtn: boolean) {
        if (isCenterBtn)
            this.scale = 1;
        var val = (this.scale * 100).toFixed(0);
        this._editorController._zoomSatus.innerHTML = `${val}`;
        this._wrapper.style.transform = `translate(-50%,-50%) scaleX(${this.scale}) scaleY(${this.scale})`;
    }


    private zoom(direction: boolean) {
        this.scale += direction ? -(this.scale * 0.3) : 1;
        this.scale = Math.min(Math.max(.125, this.scale), 8);
        this.centerWrapperOnTheScreen(false);
    }

    private zoomEvent(event: any) {
        event.preventDefault();
        this.zoom(event.deltaY > 0);
    }

    private mouseStartDrag() {
        this.isDrag = true;
        this.x_wrapper = (<any>window.event).clientX - this._wrapper.offsetLeft;
        this.y_wrapper = (<any>window.event).clientY - this._wrapper.offsetTop;
    }

    private stop_drag() {
        this.isDrag = false;
    }

    private mouseWhile_drag() {
        if (this.isDrag) {
            this.x_cursor = (<any>window.event).clientX;
            this.y_cursor = (<any>window.event).clientY;
            this._wrapper.style.left = (this.x_cursor - this.x_wrapper) + 'px';
            this._wrapper.style.top = (this.y_cursor - this.y_wrapper) + 'px';
        }
    }

    private touchWhile_drag() {
        if (this.isDrag) {
            var event: TouchEvent = <TouchEvent>window.event;
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
    }

    private touchstart() {
        var event: TouchEvent = <TouchEvent>window.event;
        var evemtData = event.changedTouches[0];
        this.isDrag = true;
        this.x_wrapper = evemtData.clientX - this._wrapper.offsetLeft;
        this.y_wrapper = evemtData.clientY - this._wrapper.offsetTop;
    }

    private btnCenterClick() {
        this._wrapper.style.left = '50%';
        this._wrapper.style.top = '50%';
        this.centerWrapperOnTheScreen(true);
    }
    private btnZoomOutClick(){
        this.zoom(true);
    }

    private btnZoomInClick(){
        this.zoom(false);
    }
    
    private btnFlipClick(){
        this.isFlip = !this.isFlip;
        var val = this.isFlip ? -this.scale : this.scale;
        this._wrapper.style.transform = `translate(-50%,-50%) scaleX(${val}) scaleY(${this.scale})`;
    }

    public Init() {
        this._editorController._btnCenter.addEventListener("click", this.btnCenterClick);
        this._editorController._btnZoomOut.addEventListener("click",this.btnZoomOutClick);
        this._editorController._btnZoomIn.addEventListener("click",this.btnZoomInClick);

        this._editorController._btnFlip.addEventListener('click', this.btnFlipClick);

        this._wrapper.addEventListener('touchstart', this.touchstart);
        this._wrapper.addEventListener('mousedown', this.mouseStartDrag);

        this._editor.addEventListener('mousemove', this.mouseWhile_drag);
        this._editor.addEventListener('touchmove', this.touchWhile_drag);

        this._editor.addEventListener('mouseup', this.stop_drag);
        this._editor.addEventListener('touchend', this.stop_drag);

        this._editor.addEventListener('mousewheel', this.zoomEvent);
    }
}