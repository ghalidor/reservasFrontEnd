$(window).on("load", function() {
    "use strict";

    // miscellaneous var 

    var allelement = $('div, h1, h2, h3, h4, h5, p, ul, li, a, i, button, section, span');
    var holdside = $('.holdsidebar');

    // wrapper var
    var fastrestopage = $('.fastresto-page');
    var whitepage = $('.white-page');

    // page var 
    var fastrestohome = $('.contentfastresto');
    var bgslideshow = $('#bgslideshow, #particles, .bgfastresto');
    var slidtext = $('#slidertext');

    // button var 
    var galnav = $('#opengal');
    var galclose = $('.nav-bottom-close, .btn-content');
    var iconnav = $('.anim-nav');
    var menumobile = $('#main-menu');

    //gallery
    var maingall = $('.bottom-option');

    //scroll var
    var nice = $("#wraperfastresto");
    var totop = $('#totop');
    var topblock = $('.nav-top-block');


    // start function


    if (jQuery(window).width() < 1025) {
        allelement.addClass('no-animation').each(function() {
            $(this).removeAttr(" data-time");
        });
    }

    // call function all element animation when page has loaded
    page();


    //navigation icon mobile
    iconnav.on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        menumobile.toggleClass('menu-show');
    });

    // navigation slide up gallery
    galnav.on('click', function(e) {
        $(this).fadeOut(500);
        maingall.removeClass('fadeOutDown').fadeIn(1000).addClass('animfadeInUpBig');
    });
    // navigation slide down gallery
    galclose.on('click', function(e) {
        galnav.fadeIn(500);
        maingall.addClass('fadeOutDown').fadeOut(1500);
    });

    // main animation all element
    function page() {
        $([allelement]).each(function(index, foundElements) {
            foundElements.each(function(element) {
                var $this = $(this);
                var time = $(this).attr('data-time');
                setTimeout(function() {
                    $this.addClass('intro');
                }, time);
            });
            setTimeout(function() {
                holdside.hide();
            }, 2500);
            $('.opening').hide();
        });


    } // end function

    // reset animation
    function pagereset() {
        allelement.removeClass('intro');
    }




    // plugin start

    //slideshow background
    // $(function() {
    //     var slideBegin = 4000,
    //         transSpeed = 1000,
    //         simple_slideshow = bgslideshow,
    //         listItems = simple_slideshow.children('.bgfastresto'),
    //         listLen = listItems.length,
    //         i = 0,
    //         changeList = function() {
    //             listItems.eq(i).fadeOut(transSpeed);
    //             i += 1, i === listLen && (i = 0), listItems.eq(i).fadeIn(transSpeed);
    //         };
    //     listItems.not(':first').hide(), setInterval(changeList, slideBegin);
    // });

    //slideshow text home
    // $(function() {
    //     var slideBegin = 3000,
    //         transSpeed = 500,
    //         simple_slideshow = slidtext,
    //         listItems = simple_slideshow.children('.main-text'),
    //         listLen = listItems.length,
    //         i = 0,
    //         changeList = function() {
    //             listItems.eq(i).fadeOut(transSpeed, function() {
    //                 i += 1, i === listLen && (i = 0), listItems.eq(i).fadeIn(transSpeed)
    //             })
    //         };
    //     listItems.not(':first').hide(), setInterval(changeList, slideBegin);
    // });


    // Magnific Popup img
    $('.big-img').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: false
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });


    // Magnific Popup dailymotion
    $('.big-video').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                dailymotion: {
                    index: 'dailymotion.com',
                    id: function(url) {
                        var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                        if (m !== null) {
                            if (m[4] !== undefined) {
                                return m[4];
                            }
                            return m[2];
                        }
                        return null;
                    },
                    src: 'http://www.dailymotion.com/embed/video/%id%'
                }
            }
        }
    });

    // Magnific Popup youtube
    // $('.big-youtube').magnificPopup({
    //     disableOn: 700,
    //     type: 'iframe',
    //     mainClass: 'mfp-with-zoom mfp-img-mobile',
    //     removalDelay: 0,
    //     preloader: false,
    //     fixedContentPos: false,
    //     iframe: {
    //         patterns: {
    //             youtube: {
    //                 src: 'http://www.youtube.com/embed/%id%?autoplay=1&rel=0'
    //             }
    //         }
    //     }
    // });

    //Magnific Popup html
    // $('.detail-page').magnificPopup({
    //     type: 'ajax',
    //     alignTop: true,
    //     overflowY: 'scroll'
    // });

    // Magnific Popup form
    // $('.popup-form').magnificPopup({
    //     type: 'inline',
    //     preloader: false
    // });



    // owlCarousel gallery
    var owl = $("#owl-gal");
    owl.owlCarousel({
        navigation: true,
        autoPlay: 3000,
        stopOnHover: true,
        itemsDesktop: [1600, 4],
        itemsDesktopSmall: [1024, 3],
        itemsTablet: [800, 2],
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],

    });


    // owl slider home
    var time = 7; // time in seconds

    var $progressBar,
        $bar,
        $elem,
        isPause,
        tick,
        percentTime;

    //Init the carousel
    // $("#owl-slider-home").owlCarousel({
    //     slideSpeed: 500,
    //     paginationSpeed: 500,
    //     singleItem: true,
    //     // afterInit: progressBar,
    //     // afterMove: moved,
    //     loop: true,
    //     autoHeight: true,
    //     touchDrag: false,
    //     mouseDrag: false
    // });

    //Init progressBar where elem is $("#owl-slider-home")
    function progressBar(elem) {
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

    //create div#progressBar and div#bar then prepend to $("#owl-slider-home")
    function buildProgressBar() {
        $progressBar = $("<div>", {
            id: "progressBar"
        });
        $bar = $("<div>", {
            id: "bar"
        });
        $progressBar.append($bar).prependTo($elem);
    }

    function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = setInterval(interval, 10);
    };

    function interval() {
        if (isPause === false) {
            percentTime += 1 / time;
            $bar.css({
                width: percentTime + "%"
            });
            //if percentTime is equal or greater than 100
            if (percentTime >= 100) {
                //slide to next item 
                $elem.trigger('owl.next')
            }
        }
    }

    //moved callback
    function moved() {
        //clear interval
        clearTimeout(tick);
        //start again
        start();
    }
});