$(document).ready(function(){
  $("a[href*='#']").click(function(event){
    $("html, body").animate({
      scrollTop: $(this.hash).offset().top - $("nav").outerHeight()
    });
    event.preventDefault();
  });
  function select(){
    $("[data-year]").hide();
    $("[data-year="+$("select#year option:selected").val()+"]").show();
  }

  function click(element){
    $("[data-month]").hide();
    $("[data-month="+$(element).attr("data-m")+"]").show();
    $("#months li").removeClass("active");
    $(element).parent().addClass("active");
  }
  select();
  click($("#months li.active a"));
  $("select#year").change(function(){
    select();
  });
  $("#months li a").click(function(event){
    click(this);
    event.preventDefault();
  });

  $(window).resize(function(){
    if($(document).outerWidth() > 500){
      $("body").css({
        left: "",
        position: "",
        width: ""
      });
      $("nav #links").css({
        display: "",
        left: ""
      });
      $("nav").css({
        left: ""
      });
    }
  });

  $("div.photo").click(function(event){
    $(".fullscreen-photo").fadeIn().append($(this).clone().css({
      position: "fixed",
      top: $(this).offset().top - $(document).scrollTop(),
      left: $(this).offset().left - $("body").offset().left,
      width: $(this).outerWidth(),
      height: $(this).outerHeight()
    }).animate({
      left: 0,
      top: 0,
      width: $(window).outerWidth(),
      height: $(window).outerHeight()
    }, {
      complete: function(){
        $(this).css({
          width: "100%",
          height: "100%"
        });
      }
    }));
    event.preventDefault();
  });
  $(".fullscreen-photo").click(function(){
    $(this).empty();
    $(this).fadeOut();
  });

});
