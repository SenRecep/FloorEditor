var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.onload = function () {
    return __awaiter(this, void 0, void 0, function () {
        function writeStat() {
            measurementLine.setAttribute('x1', spx);
            measurementLine.setAttribute('y1', spy);
            measurementLine.setAttribute('x2', epx);
            measurementLine.setAttribute('y2', epy);
            var dist = Math.sqrt(Math.pow((spx - epx), 2) + Math.pow((spy - epy), 2));
            var lw = epx - spx;
            var lh = epy - spy;
            measurementText.innerHTML = dist.toFixed(1) + "px";
            if (lw > 0)
                measurementText.setAttribute('x', spx + Math.abs(lw) / 2);
            else
                measurementText.setAttribute('x', epx + Math.abs(lw) / 2);
            if (lh > 0)
                measurementText.setAttribute('y', spy + Math.abs(lh) / 2);
            else
                measurementText.setAttribute('y', epy + Math.abs(lh) / 2);
        }
        function centerWrapperOnTheScreen(isCenterBtn) {
            if (isCenterBtn)
                scale = 1;
            var val = (scale * 100).toFixed(0);
            zoomSatus.innerHTML = "" + val;
            wrapperElement.style.transform = "translate(-50%,-50%) scaleX(" + scale + ") scaleY(" + scale + ")";
        }
        function zoom(direction) {
            if (!measurementMode) {
                scale += direction ? -(scale * 0.3) : 1;
                scale = Math.min(Math.max(.125, scale), 8);
                centerWrapperOnTheScreen(false);
            }
        }
        function zoomEvent(event) {
            event.preventDefault();
            zoom(event.deltaY > 0);
        }
        function measurementStartDrag() {
            if (measurementMode) {
                spx = window.event.clientX - editorElement.offsetLeft;
                spy = window.event.clientY - editorElement.offsetTop;
                measurementSetStartPoint = true;
                measurementContainer.style.visibility = 'visible';
            }
        }
        function mouseStartDrag() {
            if (!measurementMode) {
                isDrag = true;
                x_wrapper = window.event.clientX - wrapperElement.offsetLeft;
                y_wrapper = window.event.clientY - wrapperElement.offsetTop;
            }
        }
        function stop_drag() {
            if (measurementMode) {
                measurementSetStartPoint = false;
                writeStat();
            }
            else {
                isDrag = false;
            }
        }
        function mouseWhile_drag() {
            if (measurementMode && measurementSetStartPoint) {
                epx = window.event.clientX - editorElement.offsetLeft;
                epy = window.event.clientY - editorElement.offsetTop;
                writeStat();
            }
            else if (isDrag) {
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
        function btnMeasurementClick() {
            var isToggle = btnMeasurements.dataset.toggle == 'true' ? true : false;
            measurementMode = !isToggle;
            measurementSetStartPoint = false;
            measurementContainer.style.visibility = 'hidden';
            btnMeasurements.classList.toggle('active');
            isToggle = !isToggle;
            btnMeasurements.dataset.toggle = isToggle;
        }
        var wrapperElement, editorElement, btnCenter, btnZoomOut, btnZoomIn, btnMeasurements, btnFlip, zoomSatus, measurementContainer, measurementLine, measurementText, houses, x_cursor, y_cursor, x_wrapper, y_wrapper, scale, isDrag, isFlip, measurementMode, measurementSetStartPoint, spx, spy, epx, epy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapperElement = document.getElementById("wrapper");
                    editorElement = document.getElementById("editor");
                    btnCenter = document.getElementsByClassName("btn-center")[0];
                    btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
                    btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
                    btnMeasurements = document.getElementsByClassName('btn-measurements')[0];
                    btnFlip = document.getElementsByClassName("btn-flip")[0];
                    zoomSatus = document.getElementsByClassName('zoom-satus')[0];
                    measurementContainer = document.getElementById('measurements-container');
                    measurementLine = document.getElementById('measurements');
                    measurementText = document.getElementById('measurementsText');
                    return [4 /*yield*/, fetch("db.json").then(function (x) { return x.json(); })];
                case 1:
                    houses = _a.sent();
                    x_cursor = 0, y_cursor = 0, x_wrapper = 0, y_wrapper = 0, scale = 0, isDrag = false, isFlip = false;
                    measurementMode = false, measurementSetStartPoint = false, spx = 0, spy = 0, epx = 0, epy = 0;
                    btnCenter.addEventListener("click", btnCenterClick);
                    btnZoomOut.addEventListener("click", btnZoomOutClick);
                    btnZoomIn.addEventListener("click", btnZoomInClick);
                    btnMeasurements.addEventListener("click", btnMeasurementClick);
                    btnFlip.addEventListener('click', btnFlipClick);
                    wrapperElement.addEventListener('touchstart', touchstart);
                    wrapperElement.addEventListener('mousedown', mouseStartDrag);
                    editorElement.addEventListener('mousedown', measurementStartDrag);
                    editorElement.addEventListener('mousemove', mouseWhile_drag);
                    editorElement.addEventListener('touchmove', touchWhile_drag);
                    editorElement.addEventListener('mouseup', stop_drag);
                    editorElement.addEventListener('touchend', stop_drag);
                    editorElement.addEventListener('mousewheel', zoomEvent);
                    return [2 /*return*/];
            }
        });
    });
};
