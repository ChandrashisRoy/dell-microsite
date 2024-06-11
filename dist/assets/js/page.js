jQuery('.nav--item').click(function () {
    var scrollToSection = jQuery(this).data('nav');
    jQuery('#section-' + scrollToSection)[ 0 ].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

jQuery('#nav--top').click(function () {
    jQuery('#top')[ 0 ].scrollIntoView();
});

var topofDiv = jQuery("#header").offset().top; //gets offset of header
var height = jQuery("#header").outerHeight(); //gets height of header

jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > (topofDiv + height) + 60) {
        jQuery("#nav").css({
            position: 'fixed',
            margin: '0 -15px 0 -15px',
            width: '100%'
        });
    }
    else {
        jQuery("#nav").css({
            position: 'relative',
            margin: '5px 0 0 0',
            width: 'calc(100% + 30px)'
        });
    }
});

jQuery('.nav--item').each(function (index) {
    var itemIndex = index + 1;
    // inView('#row--heading-' + itemIndex).on('enter', function () {
    //     console.log(itemIndex);
    //     jQuery(".nav--item").removeClass('nav--active');
    //     jQuery("#nav--item-" + itemIndex).addClass('nav--active');
    // });
    var nav = new Waypoint.Inview({
        element: $('#row--heading-' + itemIndex),
        entered: function() {
            jQuery(".nav--item").removeClass('nav--active');
            jQuery("#nav--item-" + itemIndex).addClass('nav--active');
        },
        exited: function(direction) {
            if(direction === 'down' && itemIndex !== jQuery('.nav--item').length) {
                jQuery(".nav--item").removeClass('nav--active');
                jQuery("#nav--item-" + (itemIndex + 1)).addClass('nav--active');
            } else if (direction === 'up') {
                jQuery(".nav--item").removeClass('nav--active');
                jQuery("#nav--item-" + (itemIndex - 1)).addClass('nav--active');
            }
        }
    })
});

window.addEventListener('message', handleMessage, false);

function handleMessage(event) {
    if (event.origin !== "") {
        return;
    }
    sendAnalyticsEvent('click', event.data);
}

function sendAnalyticsEvent(action, label) {
    ga('send', 'event', 'Vendor Non-Interactive', action, label);
}