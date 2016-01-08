$(document).ready(function(){
    var e = true;
    $("nav#mainNav li").click(function() {
        if (e) {
            $("html, body").animate({
                scrollTop: $("#" + $(this).text().toLowerCase().replace(" ", "")).position().top
            }, {
                start: function() {
                    e = false
                },
                done: function() {
                    e = true
                }
            })
        }
    });
    $(".band").append("<span class='next'><i class='fa fa-angle-down'></i></span>");
    $("span.next").click(function() {
        $("html, body").animate({
            scrollTop: $(this).parent().position().top
        })
    });
    $("aside #all").click(function() {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(this).parent().find("i").css({
              display: "block",
            }).each(function() {
                $(this).animate({
                  left: $(this).index() * 50
                });
            });
        }else{
            $(this).parent().find("i").each(function() {
                $(this).animate({
                    left: 0
                }, 400, function() {
                    $(this).parent().find(":not(#all)").hide(400);
                })
            })
        }
    });
    $("aside i[data-href], .social").click(function() {
      window.open($(this).attr("data-href"), "_blank")
    });
    $("i#top").click(event, function() {
        if (e) {
            $("html, body").animate({
                scrollTop: 0
            }, {
                start: function() {
                    e = false
                },
                done: function() {
                    e = true
                }
            })
        }
    });
    $("figure").click(function(e) {
        $(this).find("figcaption").css({
            height: "auto"
        }).slideToggle()
    });
    $("#carousel").flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: "#slider"
    });
    $("#slider").flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
    });
});
