"use strict";

$(function () {
  var expandedMenuIndex = -1;
  $('a.c-dropdown-toggle').click(function () {
    var index = $(this).parent().index();
    if (expandedMenuIndex == -1) expandedMenuIndex = index;else if (expandedMenuIndex == index) {
      $(this).next('div.c-dropdown-menu').hide();
      expandedMenuIndex = -1;
    } else if (expandedMenuIndex != index) {
      var oldElementTest = $('li.c-dropdown')[expandedMenuIndex];
      var oldElementUlTag = $(oldElementTest).children('div.c-dropdown-menu')[0];
      $(oldElementUlTag).hide();
      expandedMenuIndex = index;
    }
    if (expandedMenuIndex == index) $(this).next('div.c-dropdown-menu').show();
  });
  $('.menu-close-btn').click(function () {
    $(this).parent().parent().hide();
    expandedMenuIndex = -1;
  });
});

function printDiv() {
  var divToPrint = document.getElementById('wrapper');
  var newWin = window.open('', 'Print-Window');
  newWin.document.open();
  newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
  newWin.document.close();
  setTimeout(function () {
    newWin.close();
  }, 10);
}