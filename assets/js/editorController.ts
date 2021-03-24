export  class EditorController{
    public readonly _btnCenter:Element;
    public readonly _btnZoomOut:Element;
    public readonly _btnZoomIn:Element;
    public readonly _btnFlip:Element;
    public readonly _zoomSatus:Element;

    constructor(
        btnCenter:Element,
        btnZoomOut:Element,
        btnZoomIn:Element,
        btnFlip:Element,
        zoomSatus:Element){
            this._btnCenter=btnCenter;
            this._btnZoomOut=btnZoomOut;
            this._btnZoomIn=btnZoomIn;
            this._btnFlip=btnFlip;
            this._zoomSatus=zoomSatus;
    }
};