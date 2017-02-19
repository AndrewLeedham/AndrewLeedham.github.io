var modals = document.querySelectorAll(".modal");
var modalsLength = modals.length;
var leftControl = document.querySelector(".modal-container .left-control");
var rightControl = document.querySelector(".modal-container .right-control");
var close = document.querySelector(".modal-container .close");
var body = document.querySelector("body");
var modalTriggers = document.querySelectorAll(".modal-container input[type='radio']");

function modalControl(event, right){
    var dir = right ? "left" : "right";
    var oppDir = right ? "right" : "left";
    var currentModal = document.querySelector(".modal.active");
    if(!currentModal){
        currentModal = document.querySelector("input[type='radio']:checked + .modal");
    }
    var index = Array.prototype.indexOf.call(modals, currentModal);
    var nextIndex = (index + (right ? 1 : -1)) % modalsLength;
    // % operator is remainder not modulo, this fixes negative remaineders!
    if(nextIndex < 0) nextIndex = modalsLength + nextIndex;
    var nextModal = modals[nextIndex];

    currentModal.classList.remove("left");
    currentModal.classList.remove("right");
    currentModal.classList.remove("active");
    currentModal.classList.add("prev");
    currentModal.classList.add(dir);

    nextModal.classList.remove("left");
    nextModal.classList.remove("right");
    nextModal.classList.remove("prev");
    nextModal.classList.add("active");
    nextModal.classList.add(oppDir);
}

function modalOpen(){
    body.style.overflow = "hidden";
}

function modalClose(){
    body.style.overflow = null;
    for(var i = 0; i < modalsLength; i++){
        modals[i].classList.remove("left");
        modals[i].classList.remove("right");
        modals[i].classList.remove("prev");
        modals[i].classList.remove("active");
    }
}

leftControl.addEventListener("click", function(event){modalControl(event, false);});
rightControl.addEventListener("click", function(event){modalControl(event, true);});
close.addEventListener("click", modalClose);
for(var i = 0, len = modalTriggers.length; i < len; i++){
    modalTriggers[i].addEventListener("change", modalOpen);
}

// var modalRight = document.querySelector(".modal-container .right-control");
// var modalLeft = document.querySelector(".modal-container .left-control");
// var allModals = document.querySelectorAll(".modal-container");
// var totalModals = allModals.length;

// function modalClickControl(event, right){
//     var curModal = document.querySelector(".active");
//     if(!curModal){
//         curModal = document.querySelector("");
//     }
//     var index = Array.prototype.indexOf.call(allModals, curModal.parentNode);
//     var nextIndex = (index + (right ? 1 : -1)) % totalModals;
//     var nextModal = allModals[nextIndex].querySelector(".modal");
//     var cur = right ? "left" : "right";
//     var next = right ? "right" : "left";
    
//     curModal.classList.remove(next);
//     curModal.classList.remove("active");
//     if(!curModal.classList.contains(cur)){
//         curModal.classList.add(cur);
//     }
//     nextModal.classList.remove(cur);
//     if(!nextModal.classList.contains(next)){
//         nextModal.classList.add(next);
//     }
//     if(!nextModal.classList.contains("active")){
//         nextModal.classList.add("active");
//     }
// }

// modalRight.addEventListener("click", function(event){
//     console.log("right");
//     modalClickControl(event, true);
// });

// modalLeft.addEventListener("click", function(event){
//     console.log("left");
//     modalClickControl(event, false);
// });