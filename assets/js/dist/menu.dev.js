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
});