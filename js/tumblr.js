$.getScript("http://andrew-leedham.tumblr.com/api/read/json", function(script, param2, param3){
  if(tumblr_api_read){
    var list = "<ul>";
    var max = tumblr_api_read.posts.length > 16 ? 16 : tumblr_api_read.posts.length;
    var rand = Math.floor((Math.random()*max)) - 1
    var size = "1280";
    if($(window).width() <= 959 && $(window).width() >= 768){
      size = "500";
    }else if($(window).width() <= 767){
      size = "250";
    }
    console.log(rand);
    for(var i = 0; i < max; i++){
      if(tumblr_api_read.posts[i]["type"] == "photo"){
        list += "<li><a href="+tumblr_api_read.posts[i]["url"]+" target='_blank'><img src='"+tumblr_api_read.posts[i]["photo-url-250"]+"'/></a></li>";
        if(i == rand){
          var image = tumblr_api_read.posts[i];
          $('<img/>').attr('src', image["photo-url-"+size]).load(function() {
             $(this).remove();
             $('nav#mainNav').css("background-image", "url("+image["photo-url-"+size]+")");
          });
        }
      }else{
        max += 1;
      }
    }
    list += "</ul>";
    $("#tumblr > section").append(list);
  }
  $("#load").fadeOut();
});
