(function(){'use scrict';function modalControl(e,o){var l=o?"left":"right",t=o?"right":"left",r=document.querySelector(".modal.active");r||(r=document.querySelector("input[type='radio']:checked + .modal"));var a=Array.prototype.indexOf.call(modals,r),s=(a+(o?1:-1))%modalsLength;s<0&&(s=modalsLength+s);var d=modals[s];r.classList.remove("left"),r.classList.remove("right"),r.classList.remove("active"),r.classList.add("prev"),r.classList.add(l),d.classList.remove("left"),d.classList.remove("right"),d.classList.remove("prev"),d.classList.add("active"),d.classList.add(t)}function modalOpen(){body.style.overflow="hidden"}function modalClose(){body.style.overflow=null;for(var e=0;e<modalsLength;e++)modals[e].classList.remove("left"),modals[e].classList.remove("right"),modals[e].classList.remove("prev"),modals[e].classList.remove("active")}var modals=document.querySelectorAll(".modal"),modalsLength=modals.length,leftControl=document.querySelector(".modal-container .left-control"),rightControl=document.querySelector(".modal-container .right-control"),close=document.querySelector(".modal-container .close"),body=document.querySelector("body"),modalTriggers=document.querySelectorAll(".modal-container input[type='radio']");leftControl.addEventListener("click",function(e){modalControl(e,!1)}),rightControl.addEventListener("click",function(e){modalControl(e,!0)}),close.addEventListener("click",modalClose);for(var i=0,len=modalTriggers.length;i<len;i++)modalTriggers[i].addEventListener("change",modalOpen);})();