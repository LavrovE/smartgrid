"use strict";
$(document).ready(function () {

    $(document).on('click', '.toggle', function () {
        $(this).siblings('.toggle__list').stop().slideToggle(400);
        $(this).children('i').toggleClass('active');
    });

    $(document).on('click', '.textarea__ckeditor', function () {
            var textareaInitialize = $($(this)[0]);
            textareaInitialize.html('');
            var textareaName = textareaInitialize.parent('.textarea').children('textarea').attr('name');
           initializeCKEDITOR(textareaName);
    });

    $('.profile_mini_user').on('click', function (event) {

    });

    var asideHeight = $('aside').outerHeight() - $('.breadcrumbs').outerHeight();
    $('.content__wrapper').css('min-height', asideHeight);
    $('.invitation__code').on('click', function () {
        var code = $(this).attr('data-code');
        $(this).addClass('active').text(code);
    });

    $('.codes__item.codes__unregistered').clone().appendTo('.codes__tab#unregistered');
    $('.codes__item.codes__registered').clone().appendTo('.codes__tab#registered');

    $('#print-content').on('click', function () {
        $(".codes__wrapper").print({
            //Use Global styles
            globalStyles: false,
            //Add link with attrbute media=print
            mediaPrint: false,
            //Custom stylesheet
            stylesheet: "../css/main.css",
            //Print in a hidden iframe
            iframe: false,
            //Don't print this
            noPrintSelector: ".avoid-this",
            //Add this at top
            //Log to console when printing is done via a deffered callback
            deferred: $.Deferred().done(function () {
                console.log('Printing done', arguments);
            })
        });
    });

    $('.codes__cross').on('click', function () {
        $(this).parent('.codes__item').hide();
    });

    $('.button_showhide').on('click', function () {
        $(this).parent().siblings('.showhide').show();
        $(this).parent($('.write')).after('<span class="inline">Ctrl+Enter - надіслати повідомлення</span>');
        $(this).remove();

    });
//    control + enter submit
    $('.custom-textarea').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            // Ctrl-Enter pressed
            // console.log(this);
            $(this).siblings('.submit').trigger('click');
        }
    });

    $('.language__selected').on('click', function (event) {
        $(document).on("click", function () {
            $('.language__selected').removeClass('active');
            $('.language__items').hide();
            $(document).off("click");
        });
        $('.language__items li a ').on("click", function (event) {
            // event.stopPropagation();
        });
    });

    $('.slct').on('click', function (event) {
        event.stopPropagation();
        $(document).on("click", function () {
            $('.slct').removeClass('active');
            $('.custom-select').slideUp();
            $(document).off("click");
        });
    });
// name of town
    $('.header__school-name').text(function (i, text) {
        if (text.length >= 29) {
            text = text.substring(0, 29);
            var lastIndex = text.lastIndexOf(" ");       // позиция последнего пробела
            text = text.substring(0, lastIndex) + '...'; // обрезаем до последнего слова
        }
        $(this).text(text);
    });


    var imagesHeight = $('.photos__item').outerHeight() + 'px';


    $('.photos__list.last-img').each(function () {
        var imagesLeft = $(this).attr('data-count_all') - $(this).attr('data-count_visible');
        var imagesHref = $(this).attr('data-url');
        if ($(this).attr('data-count_all') > 5) {
            $(this).find('.photos__item:last-child').append('<a href="' + imagesHref + '" class="photos__last">+' + imagesLeft + '</a>');
            $('.photos__last').css('line-height', imagesHeight);
        }
    });

    $('.jsphoto').change(function () {
        var reader = new FileReader(),
            file = this.files[0], div = $('.profile__photo-js');
        reader.onloadend = function () {
            div.css('background-image', 'url(' + this.result + ')');
        };

        file ? reader.readAsDataURL(file) : div.css('background-image', 'url(/img/uknown.png)');
    });

    $('.jsphotos').change(function () {
        var reader = new FileReader(),
            file = this.files[0], div = $('.album__added-img');

        var albumPhoto = '<div class="album__insert">\n' +
            '                                <div class="inline v-align-top">\n' +
            '                                    <a class="album__preview album__added-img" href="#"></a>\n' +
            '                                </div>\n' +
            '                                <div class="inline v-align-top"><textarea\n' +
            '                                        class="custom-textarea album__added-description" placeholder="Опис фото"\n' +
            '                                        name="photo_description" id=""></textarea>\n' +
            '                                </div>\n' +
            '                            </div>'

        reader.onloadend = function () {
            $(".album__added").append(albumPhoto);
            div.css('background-image', 'url(' + this.result + ')');
            console.log('text');

        };

        file ? reader.readAsDataURL(file) : div.css('background-image', 'url(/img/uknown.png)');
    });


    $('.students__choose ul li').on('click', function () {
        var urlSelect = $(this).data('url');
        $('.students__url').attr({
            href: urlSelect,
            disabled: false
        });

    });

    $('.fake-facebook__share').on('click', function () {
        $('.fb-like.fb_iframe_widget a > button').click();
    });

    $('.subscribe').on('click', function (event) {
        event.stopPropagation();
        $('.notification__news').show();
        $(document).on("click", function () {
            $('.notification__news').hide();
            $(document).off("click");
        });
        $('.notification').on("click", function (event) {
            event.stopPropagation();
        });
    });


    if ($('input').hasClass('fileMulti')) {
        $('.fileMulti').on('change', handleFileSelectMulti);
    }

    $('.workingday__icon').hover(
        function () {
            $(this).siblings().show();
        }, function () {
            $(this).siblings().hide();
        }
    );
    $('.workingday__icon').siblings().hover(
        function () {
            $(this).show();
        }, function () {
            $(this).hide();
        }
    );
    $('.drop').parents().css('position', 'relative');

//    votes
    $('.votes button').on('click', function (event) {
        var url = $(this).siblings('input').val();
        if ( url !== '' && url !== undefined ) {
            var data = getAjaxHtml(url);
            $(this).closest('.votes__wrapper').html('').append(data);
            // myToggle();
        }

    });
// ONLY FOR LOCAL MODE!!!!
//     $('form').submit(function () {
//         return false;
//     });
// ONLY FOR LOCAL MODE!!!!
    function unique(arr) {
        var result = [];

        nextInput:
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i]; // для каждого элемента
                for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
                    if (result[j] == str) {
                        continue nextInput; // если да, то следующий
                    }
                }
                result.push(str);
            }

        return result;
    }

    // typical ajax for local
    function getAjaxHtml(url) {
        var results = '';
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'html',
            async: false,
            success: function(result) {
                results = result;
            },
            error: function(result) {
                console.log(result);
            }
        });
        return results;
    }
    // myToggle();

    window.arrayDelete = [];

    $(document).on('click', '.addinput__delete', function () {
        var itemDelete = $(this).closest('li');
        arrayDelete.push(itemDelete.data('id'));
        arrayDelete = unique(arrayDelete);
        itemDelete.closest('ul').siblings('.addinput__delete-input').val(arrayDelete);
        $(this).closest('li').find('input').attr('disabled', true);
        $(this).closest('.addinput__visible').hide().siblings('.addinput__hidden').show();
    });
    $(document).on('click', '.addinput__resume', function () {
        $(this).closest('li').find('input').attr('disabled', false);
        $(this).closest('.addinput__hidden').hide().siblings('.addinput__visible').show();
        var itemDelete = $(this).closest('li');
        for (var i = 0; i < arrayDelete.length; i++) {
            if(arrayDelete[i] === itemDelete.data('id')) {
                arrayDelete.splice(i, 1);
            }
        }
        itemDelete.closest('ul').siblings('.addinput__delete-input').val(arrayDelete);
    });

//   change text form openhide
    $(document).on('click', '.changetext__toggle', function () {
        $('.changetext').toggle();
    });


// download file

// end ready
});
var ckeditorTexts = {
    ru: {
        redactor: 'Вiзуальний Редактор'
    },
    ua: {
        redactor: 'Вiзуальний Редактор'
    },
    en: {
        redactor: 'Вiзуальний Редактор'
    }
};
function textCkeditor(key) {
    var currentLanguage = $('html').attr('lang');
    return (ckeditorTexts[currentLanguage][key]);
}


var uploadText = {
    ru: {
        deleteText: 'Удалить'
    },
    ua: {
        deleteText: 'Видалити'
    },
    en: {
        deleteText: 'delete'
    }
};
function uploadLoc(key) {
    var currentLanguage = $('html').attr('lang');
    return (uploadText[currentLanguage][key]);
}


Dropzone.autoDiscover = false;
$(".download__files-contacts").dropzone({
    maxFilesize: 16,
    addRemoveLinks: true,
    createImageThumbnails: false,
    dictResponseError: 'Server not Configured',
    acceptedFiles: ".pdf,.docx,.doc,.rtf,.txt,.odt,.zip,.rar,.tiff,.jpeg,.jpg,.png",
    init:function(){
        var self = this;
        // config
        self.options.addRemoveLinks = true;
        self.options.dictRemoveFile = uploadLoc('deleteText');
        //New file added
        self.on("addedfile", function (file) {
            // console.log('new file added ', file);
        });
        // Send file starts
        self.on("sending", function (file) {
            // console.log('upload started', file);
            $('.meter').show();
        });

        // File upload Progress
        self.on("totaluploadprogress", function (progress) {
            // console.log("progress ", progress);
            $('.roller').width(progress + '%');
        });

        self.on("queuecomplete", function (progress) {
            $('.meter').delay(999).slideUp(999);
        });

        // On removing file
        self.on("removedfile", function (file) {
            // console.log(file);
        });
    },
    removedfile: function(file) {
        // $(this) item !!!
        // var filesFile = $(this).closest('.dz-preview');
        // $(this) item !!!
        var filesFile = $(file.previewElement);
        // hidden input
        // var hiddenInput = $(this).closest('.download__files').siblings('input.download__files__input');
        // hidden input
        var hiddenInput = $(this.clickableElements[0]).closest('.download__files').siblings('input.download__files__input');
        var filesArray = hiddenInput.val().split(',');
        console.log(filesArray);
        for (var i = 0; i < filesArray.length; i++) {
            console.log(filesArray[i],filesFile.data('id'));
            if(filesArray[i] == filesFile.data('id')) {
                console.log('udaleno');
                filesArray.splice(i, 1);
                console.log(filesArray);
            }
        }
        var deleteUrl = filesFile.attr('href');
        $.ajax({
            url: deleteUrl,
            method: 'GET',
            dataType: 'html',
            async: false,
            success: function(result) {
                console.log('ajax uletel')
            },
            error: function(result) {

            }
        });
        filesArray = unique(filesArray);
        hiddenInput.val(filesArray);
        console.log(hiddenInput.val());
        filesFile.remove();
    },
    previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n        <div class=\"dz-filename\"><span data-dz-name></span></div>\n <div class=\"dz-size\"><span data-dz-size></span></div>\n </div>\n   <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
    success: function(file, response){
        var filesFile = $(file.previewElement);
        var filesArray = [];
        var innerParsed = response;
        // var innerParsed = JSON.parse(inner);
        var hiddenInput = $(this.clickableElements[0]).closest('.download__files').siblings('input.download__files__input');
        if ( hiddenInput.val() !== false && hiddenInput.val() !== '') {
            filesArray.push(hiddenInput.val());
        }
        filesFile.attr('data-id',innerParsed.id );
        filesArray.push(innerParsed.id);
        $(hiddenInput).val(filesArray);
        filesFile.children('.dz-remove').attr('href', innerParsed.delete_url);
        console.log(hiddenInput.val());
    }
});
// album new photo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(".download__files-album").dropzone({
    maxFilesize: 16,
    addRemoveLinks: true,
    createImageThumbnails: true,
    dictResponseError: 'Server not Configured',
    acceptedFiles: ".jpeg,.jpg,.png",
    previewTemplate: "<div class='dz-preview dz-file-preview'><div class='dz-inline'><div class='dz-image'><img data-dz-thumbnail/></div><div class='dz-progress'><span class='dz-upload' data-dz-uploadprogress></span></div><div class='dz-error-message'><span data-dz-errormessage></span></div><div class='dz-success-mark'></div><div class=\'dz-error-mark\'></div></div><div class='dz-inline dz-big'></div></div>",
    init:function(){
        var self = this;
        // config
        self.options.addRemoveLinks = true;
        self.options.dictRemoveFile = uploadLoc('deleteText');
        //New file added
        self.on("addedfile", function (file) {
            // console.log('new file added ', file);
        });
        // Send file starts
        self.on("sending", function (file) {
            // console.log('upload started', file);
            $('.meter').show();
        });

        // File upload Progress
        self.on("totaluploadprogress", function (progress) {
            // console.log("progress ", progress);
            $('.roller').width(progress + '%');
        });

        self.on("queuecomplete", function (progress) {
            $('.meter').delay(999).slideUp(999);
        });

        // On removing file
        self.on("removedfile", function (file) {
            // console.log(file);
        });
    },
    removedfile: function(file) {
        var filesFile = $(file.previewElement);
        var hiddenInput = $(this.clickableElements[0]).closest('.download__files').siblings('input.download__files__input');
        var filesArray = hiddenInput.val().split(',');
        var id = filesFile.data('id');
        for (var i = 0; i < filesArray.length; i++) {
            if(filesArray[i] == id) {
                filesArray.splice(i, 1);
            }
        }
        var deleteUrl = filesFile.attr('href');
        $.ajax({
            url: deleteUrl,
            method: 'GET',
            dataType: 'html',
            async: false,
            success: function(result) {
            },
            error: function(result) {

            }
        });
        filesArray = unique(filesArray);
        hiddenInput.val(filesArray);
        filesFile.remove();
    },
    success: function(file, response){
        // refreshing CKEditor

        // global object
        var filesFile = $(file.previewElement);
        // array for values in input
        var filesArray = [];
        var innerParsed = response;
        // var innerParsed = JSON.parse(response);
        // object ID
        var id = innerParsed.id;
        var id_int = +innerParsed.id;
        // delete url
        var deleteUrl = innerParsed.delete_url;
        // input with values (hidden)
        var hiddenInput = $(this.clickableElements[0]).closest('.download__files').siblings('input[name="attachments"]');
        // custom placeholder for all textareas (this scope)
        var placeholder = $(this.clickableElements[0]).closest('.download__files').siblings('.hidden-textarea').children('textarea').attr('placeholder');
        // custom text for checkboxes
        var textCheckboxes = $(this.clickableElements[0]).closest('.download__files').siblings('.checkboxes-hidden').children('.check').text();
        // generate name for textarea
        var textAreaName = "images["+id+"][description]";
        console.log(textAreaName);
        //generate name for checkbox
        var nameCheckboxes = "images["+id_int+"][is_main]";
        // get redactor text localization
        // var redactorText = $(this.clickableElements[0]).closest('form').find('.ckeditor-samlpe-text').text();
        // creating new textarea with unique Name
        var textArea = document.createElement('div');
        textArea = $(textArea);
        textArea.addClass('textarea');
        textArea.html("<textarea class='custom-textarea' placeholder='"+placeholder+"' name='"+textAreaName+"' ></textarea><div class=\"textarea__ckeditor\">\n" +
            "                                <i><img class=\"profile__icon\" src=\"/img/pancil2.png\"></i>\n" +
            "                                <span\n" +
            "                                        class=\"edit inline mr v-align-top\">"+textCkeditor('redactor')+"\n" +
            "                                </span>\n" +
            "                            </div>");
        var checkboxes = document.createElement('div');
        checkboxes = $(checkboxes);
        checkboxes.addClass('checkboxes dz-checkboxes');
        checkboxes.html("<div class='check'>"+textCheckboxes+"<input type='checkbox' name='"+nameCheckboxes+"' value='1'></div>");
        // inserting new textarea
        $(filesFile).find('.dz-big').prepend(textArea).append($(checkboxes)).append($(filesFile).find('.dz-remove'));



        for( var name in CKEDITOR.instances)
        {
            CKEDITOR.instances[name].destroy(true);
        }
        initializeCKEDITOR();
        // checkboxesFunc();
        // adding value data etc
        if ( hiddenInput.val() !== false && hiddenInput.val() !== '') {
            filesArray.push(hiddenInput.val());
        }
        filesFile.attr('data-id',id );
        filesArray.push(id);
        $(hiddenInput).val(filesArray);
        //for nextstep ajax delete
        filesFile.attr('data-deleteurl', deleteUrl);

    }
});
function unique(arr) {
    var result = [];
    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i]; // для каждого элемента
            for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
                if (result[j] == str)
                {
                    continue nextInput; // если да, то следующий
                }
            }
            result.push(str);
        }

    return result;
}

$(document).on('click', '.dz-remove', function () {
    var filesFile = $(this).closest('.dz-preview');
    var hiddenInput = $(this).closest('.download__files').siblings('input.download__files__input');
    var filesArray = hiddenInput.val().split(',');
    var id = filesFile.data('id');
    console.log(filesArray);
    for (var i = 0; i < filesArray.length; i++) {
        if(filesArray[i] == id) {
            console.log('udaleno');
            filesArray.splice(i, 1);
            console.log(filesArray);
        }
    }
    var deleteUrl = filesFile.data('deleteurl');
    $.ajax({
        url: deleteUrl,
        method: 'GET',
        dataType: 'html',
        async: false,
        success: function(result) {
            console.log('ajax uletel');
        },
        error: function(result) {
        }
    });
    filesArray = unique(filesArray);
    hiddenInput.val(filesArray);
    console.log(hiddenInput.val());
    filesFile.remove();
});
