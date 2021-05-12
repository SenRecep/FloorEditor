"use strict";

window.onload = function () {
  var wrapperElement = document.getElementById("wrapper");
  var editorElement = document.getElementById("editor");
  var btnCenter = document.getElementsByClassName("btn-center")[0];
  var btnZoomOut = document.getElementsByClassName("btn-zoomout")[0];
  var btnZoomIn = document.getElementsByClassName("btn-zoomin")[0];
  var btnMeasurements = document.getElementsByClassName('btn-measurements')[0];
  var btnFlip = document.getElementsByClassName("btn-flip")[0];
  var zoomSatus = document.getElementsByClassName('zoom-satus')[0];
  var measurementContainer = document.getElementById('measurements-container');
  var measurementLine = document.getElementById('measurements');
  var measurementText = document.getElementById('measurementsText');
  var floorBg = $('.floor img')[0];
  var x_cursor = 0,
      y_cursor = 0,
      x_wrapper = 0,
      y_wrapper = 0,
      scale = 1,
      isDrag = false;
  var measurementMode = false,
      measurementSetStartPoint = false,
      spx = 0,
      spy = 0,
      epx = 0,
      epy = 0;

  function getWrapperSize() {
    return {
      Height: wrapperElement.offsetHeight * scale,
      Width: wrapperElement.offsetWidth * scale
    };
  }

  function pxSizeToInch(size) {
    return {
      Height: pxToInch(size.Height),
      Width: pxToInch(size.Width)
    };
  }

  function pxToInch(px) {
    return px * 0.010416667;
  }

  function measureRealLengthCalculator(size) {
    var wrapperSize = pxSizeToInch(getWrapperSize());
    var floorSize = getCurrentFloor().Size;
    size = pxSizeToInch(size);
    size.Height = floorSize.Height * size.Height / wrapperSize.Height;
    size.Width = floorSize.Width * size.Width / wrapperSize.Width;
    return size;
  }

  function measureTextCalculator(dist) {
    // return dist.toFixed(1) + "inch";
    var val = dist / 12;
    var feat = parseInt(val);
    var inch = Math.round((val - feat) * 10);
    return "".concat(feat, "' ").concat(inch, "\"");
  }

  function writeStat() {
    measurementLine.setAttribute('x1', spx);
    measurementLine.setAttribute('y1', spy);
    measurementLine.setAttribute('x2', epx);
    measurementLine.setAttribute('y2', epy);
    var lw = epx - spx;
    var lh = epy - spy;
    var size = measureRealLengthCalculator({
      Height: Math.abs(lh),
      Width: Math.abs(lw)
    });
    dist = Math.sqrt(Math.pow(size.Height, 2) + Math.pow(size.Width, 2));
    measurementText.innerHTML = measureTextCalculator(dist);
    if (lw > 0) measurementText.setAttribute('x', spx + Math.abs(lw) / 2);else measurementText.setAttribute('x', epx + Math.abs(lw) / 2);
    if (lh > 0) measurementText.setAttribute('y', spy + Math.abs(lh) / 2);else measurementText.setAttribute('y', epy + Math.abs(lh) / 2);
  }

  function centerWrapperOnTheScreen(isCenterBtn) {
    if (isCenterBtn) scale = 1;
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
    } else {
      isDrag = false;
    }
  }

  function mouseWhile_drag() {
    if (measurementMode && measurementSetStartPoint) {
      epx = window.event.clientX - editorElement.offsetLeft;
      epy = window.event.clientY - editorElement.offsetTop;
      writeStat();
    } else if (isDrag) {
      x_cursor = window.event.clientX;
      y_cursor = window.event.clientY;
      wrapperElement.style.left = x_cursor - x_wrapper + 'px';
      wrapperElement.style.top = y_cursor - y_wrapper + 'px';
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
        wrapperElement.style.left = x_cursor - x_wrapper + 'px';
        wrapperElement.style.top = y_cursor - y_wrapper + 'px';
      } else if (eventDatas.length == 2) {// var f1=eventDatas[0];
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
    if (!measurementMode) {
      wrapperElement.style.left = '50%';
      wrapperElement.style.top = '50%';
      centerWrapperOnTheScreen(true);
    }
  }

  function btnZoomOutClick() {
    zoom(true);
  }

  function btnZoomInClick() {
    zoom(false);
  }

  function btnFlipClick() {
    setFlip(!getFlip());
    var floor = getCurrentFloor();
    var isFlip = getFlip();
    if (isFlip) $(floorBg).attr('src', "./assets/img/floors/".concat(floor.Images.Invers));else $(floorBg).attr('src', "./assets/img/floors/".concat(floor.Images.Normal));
    getOptions().forEach(function (item) {
      drawDirectionOption(item, isFlip);
    }); // var val = isFlip ? -scale : scale;
    // wrapperElement.style.transform = "translate(-50%,-50%) scaleX(" + val + ") scaleY(" + scale + ")";
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

  $("#detailButton").click(function () {
    var house = getCurrentHouse();
    $('#houseName').text(house.Name);
    $("#houseImage").attr('src', "./assets/img/houses/".concat(house.Image));
  });
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
};