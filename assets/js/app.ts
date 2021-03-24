import {Editor} from './editor';
import {EditorController} from './editorController';

window.onload = function () {
    const wrapperElement= <HTMLElement>document.getElementById("wrapper");
    const editorElement=<HTMLElement>document.getElementById("editor");

    const btnCenter=document.getElementsByClassName("btn-center")[0];
    const btnZoomOut=document.getElementsByClassName("btn-zoomout")[0];
    const btnZoomIn=document.getElementsByClassName("btn-zoomin")[0];
    const btnFlip=document.getElementsByClassName("btn-flip")[0];
    const zoomSatus= document.getElementsByClassName('zoom-satus')[0];
    

    const editorController:EditorController=new EditorController(
        btnCenter,
        btnZoomOut,
        btnZoomIn,
        btnFlip,
        zoomSatus);
    const editor :Editor=new Editor(wrapperElement,editorElement,editorController);
    editor.Init();
}


