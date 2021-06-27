$.trumbowyg.svgPath = '../editor/assets/lib/trumbowyg/icons.svg';

var uploadOptions = {
    serverPath: 'https://api.imgur.com/3/image',
    fileFieldName: 'image',
    headers: {'Authorization': 'Client-ID 9e57cb1c4791cea'},
    urlPropertyName: 'data.link',
    imageWidthModalEdit: true
};

$('#editor')
.trumbowyg({
    btnsDef: {
        image: {
            dropdown: ['insertImage', 'upload'],
            ico: 'insertImage'
        }
    },
   
    btns: [
        ['viewHTML'],
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['image'], 
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen']
     ]
    ,
    plugins: {
        upload: {
            serverPath: 'https://api.imgur.com/3/image',
            fileFieldName: 'image',
            headers: {'Authorization': 'Client-ID 2453cc252ee001d'},
            urlPropertyName: 'data.link'
        }
    }
});