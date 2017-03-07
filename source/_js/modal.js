var modals = document.querySelectorAll(".modal");
var modalsLength = modals.length;
var modalContainer = document.querySelector(".modal-container");
var leftControl = modalContainer.querySelector(".left-control");
var rightControl = modalContainer.querySelector(".right-control");
var close = modalContainer.querySelector(".close");
var modalTriggers = modalContainer.querySelectorAll("input[type='radio']");
var startTouchX = 0, startTouchY = 0;
var swipeThreshold = 50;

// IE doesn't support multi parameter add/remove.
function add(element){
    for(var i = 1, len = arguments.length; i < len; i++){
        element.classList.add(arguments[i]);
    }
}

function remove(element){
    for(var i = 1, len = arguments.length; i < len; i++){
        element.classList.remove(arguments[i]);
    }
}

function modalControl(right){
    var currentModal = document.querySelector(".modal.active");
    if(!currentModal){
        currentModal = document.querySelector("input[type='radio']:checked + .modal");
    }
    
    var index = Array.prototype.indexOf.call(modals, currentModal);

    var nextIndex = (index + (right ? 1 : -1)) % modalsLength;
    // % operator is remainder not modulo, this fixes negative remainders!
    if(nextIndex < 0) nextIndex = modalsLength + nextIndex;

    var nextModal = modals[nextIndex];

    // Imitate current scroll position with fixed top position, while animating.
    currentModal.style.top = -modalContainer.scrollTop + "px";
    nextModal.style.removeProperty("top");

    remove(currentModal, "left", "right", "active");
    add(currentModal, "prev", right ? "left" : "right");

    remove(nextModal, "left", "right", "prev");
    add(nextModal, "active", right ? "right" : "left");

    modalContainer.scrollTop = 0;
}

function modalOpen(){
    body.style.width = body.offsetWidth.toString() + "px";
    body.style.overflow = "hidden";
}

function modalClose(){
    body.style.removeProperty("width");
    body.style.removeProperty("overflow");
    for(var i = 0; i < modalsLength; i++){
        remove(modals[i], "left", "right", "prev", "active");
        modals[i].style.removeProperty("top");
    }
}

leftControl.addEventListener("click", function(event){modalControl(false);});
rightControl.addEventListener("click", function(event){modalControl(true);});
close.addEventListener("click", modalClose);
for(var i = 0, len = modalTriggers.length; i < len; i++){
    modalTriggers[i].addEventListener("change", modalOpen);
}

modalContainer.addEventListener("touchstart", function(event){
    startTouchX = event.changedTouches[0].clientX;
    startTouchY = event.changedTouches[0].clientY;
});

modalContainer.addEventListener("touchend", function(event){
    var endTouchX = event.changedTouches[0].clientX;
    var endTouchY = event.changedTouches[0].clientY;
    var lr = endTouchX - startTouchX;
    var ud = endTouchY - startTouchY;
    if(Math.abs(lr) > Math.abs(ud)){
        if(lr > swipeThreshold){
            modalControl(false);
        }else if(lr < -swipeThreshold){
            modalControl(true);
        }
    }
});