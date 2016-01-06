function load(_callback){
	$.getScript("http://andrew-leedham.tumblr.com/api/read/json", function(script, param2, param3){
		if(tumblr_api_read){
			var found = tumblr_api_read.posts[Math.floor((Math.random() * tumblr_api_read.posts.length) - 1)]; 
			while(found["type"] != "photo"){
				found = tumblr_api_read.posts[Math.floor((Math.random() * tumblr_api_read.posts.length) - 1)]; 
			}
			$("header")[0].style.backgroundImage = "url("+found["photo-url-1280"]+")";
		}
		// var list = "<ul>";
		// var max = tumblr_api_read.posts.length > 16 ? 16 : tumblr_api_read.posts.length;
		// for(var i = 0; i < max; i++){
		//   if(tumblr_api_read.posts[i]["type"] == "photo"){
		//     list += "<li><a href="+tumblr_api_read.posts[i]["url"]+" target='_blank'><img src='"+tumblr_api_read.posts[i]["photo-url-250"]+"'/></a></li>";
		//   }else{
		//     i++;
		//     max += 1;
		//   }
		// }
		// list += "</ul>";
		// $("#tumblr > section").append(list);
	}).done(_callback);
}

$(document).ready(function(){
	load(function(){
		$("#load").fadeOut();
	});
});