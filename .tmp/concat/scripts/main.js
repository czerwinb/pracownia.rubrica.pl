/*
 Sticky navigation
 ==============================================
 */
var $sticky = $('#sticky-nav');
var $substitute = $('<div/>', {
        'class': 'sticky-substitute',
        'height': parseInt($sticky.outerHeight()) + parseInt($sticky.css('margin-bottom'))
    }
);

if ($sticky.size()) {
    var $stickyNavFunction = function () {
        if (!$sticky.hasClass('navbar-fixed') && $(window).scrollTop() > $sticky.offset().top) {
            $sticky.before($substitute);
            $sticky.addClass("navbar-fixed");
        }
        else if ($sticky.hasClass('navbar-fixed') && $(window).scrollTop() < $substitute.offset().top) {
            $sticky.removeClass("navbar-fixed");
            $substitute.remove();
        }
    };
    // Register SCROLL EVENT HANDLER
    $(window).scroll($stickyNavFunction);
}

/*
 Animated scroll
 ==============================================
 */
$(document).ready(function() {
    $('a[href^="#section-"]').click(function(event) {
        var id = $(this).attr("href");
        var offset = 0;
        var target = $(id).offset().top - offset;
        $('html, body').animate({scrollTop:target}, 500);
        event.preventDefault();
    });
});

/*var str = $('div.motto h1');
var text = str.text();
str.text('');

var spans = '<span>' + text.split(/\s+/).join(' </span><span>') + '</span>';
$(spans).hide().appendTo('div.motto h1').each(function(i) {
    $(this).delay(800 * i).fadeIn();
});*/
