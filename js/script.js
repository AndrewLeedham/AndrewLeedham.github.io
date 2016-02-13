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
    console.log($("body").outerWidth());
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

  $("#mobile").click(function(event){
    if($("nav #links").css("display") == "none"){
      $("nav #links").show().animate({
        left: $("body").outerWidth()-$("nav #links").outerWidth()
      });
      $("body").css({
        position: "absolute",
        width: $("body").outerWidth()
      }).animate({
        left: -($("nav #links").outerWidth())
      });
      $("nav.fixed").animate({
        left: -($("nav #links").outerWidth())
      });
    }else{
      $("nav #links").animate({
        left: $("body").outerWidth(),
      }, {
        complete: function(){
          $("nav #links").css({
            display: "",
            left: ""
          });
        }
      });
      $("body").animate({
        left: 0
      }, {
        complete: function(){
          $(this).css({
            position: "",
            width: ""
          });
        }
      });
      $("nav.fixed").animate({
        left: 0
      });
    }
  });
});
