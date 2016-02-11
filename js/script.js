$(document).ready(function(){
  $("a[href*='#']").click(function(event){
    $("html, body").animate({
      scrollTop: $(this.hash).offset().top - $("nav").outerHeight()
    });
    event.preventDefault();
  });
});
