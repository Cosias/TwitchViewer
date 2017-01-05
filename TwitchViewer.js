
$(document).ready(function(){
	
	// var twitchApi = "https://api.twitch.tv/kraken/streams/lifewithlaughs?callback?=";
	var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","lifewithlaughs","brunofin"];

	// $.ajax({
	// 	type: "GET",
	// 	url: "https://api.twitch.tv/kraken/streams/lifewithlaughs",
	// 	headers:{
	// 		'Client-ID': "xjou88yulf05hx6t7jafgyya0nm541" 
	// 	},
	// 	success: function(data){
	// 		if (data.stream === null) {
	// 			// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "OFFLINE" +'</h2></div>');
	// 			// console.log(data.stream.channel.logo);
	// 			// $("#info").html("OFFLINE");

	// 			$("#streamerName").html('<h1>FreeCodeCamp</h1>');
	// 			$("#streamDisplay").css("background-image",'url("fonts/twitchOffline.png")');
	// 			$("#streamInfo").html('<h3>OFFLINE</h3>');
	// 		}
	// 		else {
	// 			// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "ONLINE" +'</h2></div>');
	// 			console.log(data.stream.channel.logo);
	// 			console.log(data.stream.preview.large);
	// 			// $("#info").html("ONLINE");

	// 			$("#streamerName").html('<h1>'+data.stream.channel.display_name+'</h1>');
	// 			$("#streamDisplay").css("background-image",'url('+data.stream.preview.medium+')');
	// 			$("#streamInfo").html('<h3> '+data.stream.channel.status+'</h3>');

	// 		}
	// 	}
	// })

	// $.getJSON(twitchApi,function(data){
	// 	// console.log(data);

	// 	if (data.stream === null) {
	// 		// $("#streamInfo").html('<div class = "col-md-4"><h2>'+ OFFLINE +'</h2></div>');
	// 		$("#info").html(OFFLINE);
	// 	}
	// 	else {
	// 		// $("#streamInfo").html('<div class = "col-md-4"><h2>'+ ONLINE +'</h2></div>');
	// 		$("#info").html(ONLINE);
	// 	}
	// });
	

	// streamers.forEach(function(streamerName){
	// 	checkUser(streamerName);
	// });
	
	checkUser(streamers);



// function addStreamer(streamerName){

// 		$.ajax({
// 		type: "GET",
// 		url: "https://api.twitch.tv/kraken/streams/"+streamerName,
// 		headers:{
// 			'Client-ID': "xjou88yulf05hx6t7jafgyya0nm541" 
// 		},
// 		success: function(data){
// 			if (data.stream === null) {
// 				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "OFFLINE" +'</h2></div>');
// 				// console.log(data.stream.channel.logo);
// 				// $("#info").html("OFFLINE");

// 				$("#streamerName").html('<h1>'+streamerName+'</h1>');
// 				$("#streamDisplay").css("background-image",'url("fonts/twitchOffline.png")');
// 				$("#streamInfo").html('<h3>OFFLINE</h3>');
// 			}
// 			else {
// 				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "ONLINE" +'</h2></div>');
// 				console.log(data.stream.channel.logo);
// 				console.log(data.stream.preview.large);
// 				// $("#info").html("ONLINE");

// 				$("#streamerName").html('<h1>'+data.stream.channel.display_name+'</h1>');
// 				$("#streamDisplay").css("background-image",'url('+data.stream.preview.medium+')');
// 				$("#streamInfo").html('<h3> '+data.stream.channel.status+'</h3>');

// 			}
// 		}
// 	})
// }


function addStreamer(streamer){

		var streamerName;
		var streamPreview;
		var streamInfo;
		var streamLink;
		var streamStatus;

		$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/kraken/streams/"+streamer,
		headers:{
			'Client-ID': "xjou88yulf05hx6t7jafgyya0nm541" 
		},
		success: function(data){

			if (data.stream === null) {
				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "OFFLINE" +'</h2></div>');
				// console.log(data.stream.channel.logo);
				// $("#info").html("OFFLINE");

				// $("#streamerName").html('<h1>'+streamerName+'</h1>');
				// $("#streamDisplay").css("background-image",'url("fonts/twitchOffline.png")');
				// $("#streamInfo").html('<h3>OFFLINE</h3>');
				streamLink = "https://www.twitch.tv/"+streamer;
				streamerName = streamer;
				streamPreview = "fonts/twitchOffline.png";
				streamInfo = "OFFLINE";
				streamStatus = 'offline';
				// console.log(streamLink);
			}
			else {
				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "ONLINE" +'</h2></div>');
				// console.log(data.stream.channel.logo);
				// console.log(data.stream.preview.large);
				// $("#info").html("ONLINE");

				// $("#streamerName").html('<h1>'+data.stream.channel.display_name+'</h1>');
				// $("#streamDisplay").css("background-image",'url('+data.stream.preview.medium+')');
				// $("#streamInfo").html('<h3> '+data.stream.channel.status+'</h3>');
		
				streamerName = data.stream.channel.display_name;
				streamPreview = data.stream.preview.medium;
				streamInfo = data.stream.channel.status;
				streamLink = data.stream.channel.url;
				streamStatus = 'online';
				// console.log(data);
			}

			console.log(streamPreview);
			createDisplay(streamerName,streamPreview,streamInfo,streamLink,streamStatus);
		}
	});

}

function createDisplay(streamerName,streamPreview,streamInfo,streamLink,streamStatus){
	var userName;
	var view = 
		'<div id = "streamDisplay" class ="col-sm-6 well '+streamerName+ ' '+ streamStatus+'">'
				+'<div id = "delete"> <button id = "deleteBtn" class = "'+ streamerName+'"><i id = "deleteIcon" class = "glyphicon glyphicon-remove"></i></button></div>'
			+ '<div id = "streamerName"> <h1>'+streamerName+ '</h1></div>'+
			 '<a href = "'+ streamLink +'" target = "_blank"><div id ="streamPreview" style="background-image: url(' + streamPreview + ')"> </div></a>'
			 +'<div id = "streamInfo"> <h3>'+streamInfo+ '</h3> </div>' +
		'</div>';
		// console.log(view);
	$(".row").prepend(view);
	// console.log("I ran so far awayyy");
	$("#deleteBtn").click(function(){
		var removeName = $(this).attr("class");
		var removeTarget = '.col-sm-6.well.' + removeName;
	// $(".row").remove(removeTarget);
	streamers.forEach(function(userName,i){
		if (userName.toLowerCase() === removeName.toLowerCase()){
			streamers.splice(i,1);
			console.log(streamers);
		}
	});
	$("div").remove(removeTarget);
	console.log(removeTarget);
});
}

$("#addStream").on('keyup', function (e) {
    if (e.keyCode == 13 && ($("#addStream").val() != '')) {
    	newStream();
    }
});//Submit on enter key 

$("#enterBtn").click(function(){
	if ($("#addStream").val() != ''){
		newStream();
	}
});

function newStream(){
	var streamer = $("#addStream").val();
	console.log(streamers);
	if(streamers.includes(streamer)){
		alert(streamer+" Already Exists!");
		$("#addStream").val(''); 

	} 
	else{
    	checkUser([streamer]);
    	$("#addStream").val(''); 
    	streamers.push(streamer);
	}
}

function checkUser(streamerName){
	var streamerNames = streamerName.slice();
			console.log("streamers " + streamerNames);
			streamerNames.forEach(function(streamerName){
				$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/kraken/users/"+streamerName,
		headers:{
			'Client-ID': "xjou88yulf05hx6t7jafgyya0nm541" 
		},	

		success: function(data){
			
			addStreamer(streamerName);
				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "ONLINE" +'</h2></div>');
				// console.log(data.stream.channel.logo);
				// console.log(data.stream.preview.large);
				// $("#info").html("ONLINE");

				// $("#streamerName").html('<h1>'+data.stream.channel.display_name+'</h1>');
				// $("#streamDisplay").css("background-image",'url('+data.stream.preview.medium+')');
				// $("#streamInfo").html('<h3> '+data.stream.channel.status+'</h3>');
		
				// streamerName = data.stream.channel.display_name;
				// streamPreview = data.stream.preview.medium;
				// streamInfo = data.stream.channel.status;
				// streamLink = data.stream.channel.url;
				// console.log(data);

			//
		},

		error: function(data){

			if (data.error) {
				// $("#streamInfo").append('<div class = "col-md-4"><h2>'+ "OFFLINE" +'</h2></div>');
				// console.log(data.stream.channel.logo);
				// $("#info").html("OFFLINE");

				// $("#streamerName").html('<h1>'+streamerName+'</h1>');
				// $("#streamDisplay").css("background-image",'url("fonts/twitchOffline.png")');
				// $("#streamInfo").html('<h3>OFFLINE</h3>');
				// streamLink = "https://www.twitch.tv/"+streamer;
				// streamerName = streamer;
				streamPreview = "fonts/NoUserTwitch.png";
				streamInfo = "User Does Not Exist";
				streamStatus = "offline";
				createDisplay(streamerName,streamPreview,streamInfo,'#',streamStatus);
				console.log(data);
				// console.log(streamLink);
			}
		}
	
	})
});
}


function removeStreamer(streamerName){
	$(".row").toogle(streamDisplay.streamerName);
}

});


$('#navBtnOn').on('click', function () {
    if($('.offline').is(":visible")){
    	$('.offline').hide();
    	$('.online').show();
    } 
});

$('#navBtnOff').on('click', function () { 
    if($('.online').is(":visible")){
    	$('.online').hide();
    	$('.offline').show();
    }
});

$('#navBtnAll').on('click', function () {
   	$('.online').show();
   	$('.offline').show();
});