var sections = document.querySelectorAll("section");
var totalSections = sections.length;
var sectionTitles = [];
sections.forEach(function(section){
    sectionTitles.push(section.querySelector(".section__title"));
}, this);
var ticking = false;
var triggerScroll = window.scrollY;
var header = document.getElementById("parallax");
var headerBg = header.querySelector(".header__image--background");
var headerFg = header.querySelector(".header__image--foreground");
var fY = 0;
var viewport = {w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                scroll: 0};

var FOREGROUND_DISTANCE = 100;
var BACKGROUND_DISTANCE = -150;



function parallax(){
    headerFg.style.transform = "translate(-50%, calc(-50% + " + ((FOREGROUND_DISTANCE / viewport.h) * viewport.scroll) + "px))";
    headerBg.style.transform = "translate(-50%, calc(-50% + " + ((BACKGROUND_DISTANCE / viewport.h) * viewport.scroll - (BACKGROUND_DISTANCE / 2)) + "px))";
}
parallax();




function hideTitles(){
    for(var i = 0; i < totalSections; i++){
        if(viewport.scroll + viewport.h <= sections[i].offsetTop){
            sectionTitles[i].classList.remove("in");
        }
        else{
            sectionTitles[i].classList.add("in");
        }
    }
}
hideTitles(triggerScroll);

window.addEventListener("scroll", function(){
    // var scrollChange = window.scrollY - triggerScroll;
    // triggerScroll = window.scrollY;
    viewport.scroll = window.scrollY;
    if(!ticking){
        window.requestAnimationFrame(function(){
            hideTitles();
            // if(triggerScroll <= header.clientHeight){
                parallax();
            // }
            ticking = false;
        });
    }
    ticking = true;
});