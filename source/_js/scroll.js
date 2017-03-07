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


function parallax(scrollChange){
    // console.log(scrollChange);
    fY += scrollChange;
    headerFg.style.transform = "translateY(" + ((100/1080) * fY - 100) + "px)";
    headerBg.style.transform = "translateY(" + ((-150/1080) * fY) + "px)";
}
parallax(triggerScroll);




function hideTitles(scroll){
    for(var i = 0; i < totalSections; i++){
        if(scroll + window.innerHeight <= sections[i].offsetTop){
            sectionTitles[i].classList.remove("in");
        }
        else{
            sectionTitles[i].classList.add("in");
        }
    }
}
hideTitles(triggerScroll);

window.addEventListener("scroll", function(){
    var scrollChange = window.scrollY - triggerScroll;
    triggerScroll = window.scrollY;
    if(!ticking){
        window.requestAnimationFrame(function(){
            hideTitles(triggerScroll);
            // if(triggerScroll <= header.clientHeight){
                parallax(scrollChange);
            // }
            ticking = false;
        });
    }
    ticking = true;
});