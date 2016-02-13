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
});
