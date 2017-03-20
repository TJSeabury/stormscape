function makeActive($pass) {
    $pass.addClass( function() {
        $(".navItem").removeClass("active");
        return "active";
    });
}

$(function() {
    $(".navItem").mouseup(function() {
        makeActive($(this));
    });
});

function resizeImage() {
    var $pageHeight = $('html').height();
    $('.navItem').each(function() {
        var $eachItem = $(this);
        $eachItem.height(($pageHeight / 7) - 1);
    });
    $('.navItem').parent().parent().width($("html").width() / 9.5);
}
                 
$(function() {
    resizeImage();
    $(window).resize(function() {
        resizeImage();
    });
});