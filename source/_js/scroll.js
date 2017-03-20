var sections = document.querySelectorAll("section");
var totalSections = sections.length;
var sectionTitles = [];
loop(sections, function(section){
    sectionTitles.push(section.querySelector(".section__title"));
});
var ticking = false;
var triggerScroll = window.scrollY;
var header = document.getElementById("parallax");
var headerBg = header.querySelector(".header__image--background");
var headerFg = header.querySelector(".header__image--foreground");
var menuToggle = document.getElementById("toggle-menu");
var menuLabel = document.querySelector(".menu-toggle");
var scrollLinks = document.querySelectorAll("a[href*='#']");

var scrollAnimationStart = null;
var userChangedMenu = false;
var fY = 0;
var viewport = {w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)};

var FOREGROUND_DISTANCE = 100;
var BACKGROUND_DISTANCE = -150;

function loop(array, callback){
    for(var i = 0, len = array.length; i < len; i++){
        callback(array[i], i);
    }
}

function getScroll(){
    return window.scrollY ? window.scrollY : window.pageYOffset;
}

function parallax(){
    var vs = getScroll();
    headerFg.style.transform = "translateX(-50%) translateY(-50%) translateY(" + ((FOREGROUND_DISTANCE / viewport.h) * vs) + "px)";
    headerBg.style.transform = "translateX(-50%) translateY(-50%) translateY(" + ((BACKGROUND_DISTANCE / viewport.h) * vs - (BACKGROUND_DISTANCE / 2)) + "px)";
}
parallax();


function hideTitles(){
    for(var i = 0; i < totalSections; i++){
        if(getScroll()+ viewport.h <= sections[i].offsetTop){
            sectionTitles[i].classList.remove("in");
        }
        else{
            sectionTitles[i].classList.add("in");
        }
    }
}
hideTitles();

function hideMenu(){
    if(!userChangedMenu){
        if(getScroll() <= viewport.h / 2){
            menuToggle.checked = true;
        }else{
            menuToggle.checked = false;
        }
    }
}
hideMenu();

function tick(duration, each){
    if(scrollAnimationStart === null){
        var e = function(timestamp){
            if(!scrollAnimationStart) scrollAnimationStart = timestamp;
            var elapsed = timestamp - scrollAnimationStart;
            if(elapsed < duration){
                each(Math.floor((elapsed / duration) * 100)/100);
                window.requestAnimationFrame(e);
            }else{
                each(1.0);
                scrollAnimationStart = null;
            }
        }
        window.requestAnimationFrame(e);
    }
}

function scrollToElement(element, duration){
    var targetY = element.offsetTop;
    var startY = getScroll();
    var distance = targetY - startY;
    if(Math.abs(distance) > 0){
        tick(Math.floor(Math.abs(distance) * duration), function(progress){
            window.scroll(0, startY + distance * progress);
        });
    }
}

window.addEventListener("scroll", function(){
    if(!ticking){
        window.requestAnimationFrame(function(){
            hideTitles();
            parallax();
            hideMenu();
            ticking = false;
        });
    }
    ticking = true;
});

window.addEventListener("resize", function(){
    viewport.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    viewport.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    hideTitles();
    parallax();
    hideMenu();
});

menuLabel.addEventListener("click", function(){
    userChangedMenu = true;
});

loop(scrollLinks, function(item, index){
    item.addEventListener("click", function(event){
        userChangedMenu = true;
        event.preventDefault();
        scrollToElement(document.querySelector(this.getAttribute("href")), 0.1);
    });
});