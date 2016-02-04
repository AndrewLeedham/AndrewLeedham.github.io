$(document).ready(function(){



  function scroll(){
    if($(document).scrollTop() > 0)
    {
      $("nav").addClass("fixed");
    }else{
      $("nav").removeClass("fixed");
    }
  }

  scroll();

  $(document).scroll(function(){
    scroll();
  });

  $("a[href*='#']").click(function(event){
    $("html, body").animate({
      scrollTop: $(this.hash).offset().top - $("nav.fixed").outerHeight()
    });
    event.preventDefault();
  });

});
