$(function () {
    let expandedMenuIndex = -1;
    $('a.c-dropdown-toggle').click(function () {
        var index = $(this).parent().index();
        if (expandedMenuIndex == -1)
            expandedMenuIndex = index;
        else if (expandedMenuIndex == index) {
            $(this).next('ul.c-dropdown-menu').hide();
            expandedMenuIndex = -1;
        }
        else if (expandedMenuIndex != index) {
            let oldElementTest = $('li.c-dropdown')[expandedMenuIndex];
            let oldElementUlTag = $(oldElementTest).children('ul.c-dropdown-menu')[0];
            $(oldElementUlTag).hide();
            expandedMenuIndex = index;
        }
        if (expandedMenuIndex == index) 
            $(this).next('ul.c-dropdown-menu').show();
    });
});
