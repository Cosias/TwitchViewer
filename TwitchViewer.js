
$(document).ready(function(){
	
	var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","lifewithlaughs","brunofin"];
	
	checkUser(streamers);

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

					streamLink = "https://www.twitch.tv/"+streamer;
					streamerName = streamer;
					streamPreview = "fonts/twitchOffline.png";
					streamInfo = "OFFLINE";
					streamStatus = 'offline';
				}
				else {

					streamerName = data.stream.channel.display_name;
					streamPreview = data.stream.preview.medium;
					streamInfo = data.stream.channel.status;
					streamLink = data.stream.channel.url;
					streamStatus = 'online';
				}

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

		$(".row").prepend(view);

		$("#deleteBtn").click(function(){
			var removeName = $(this).attr("class");
			var removeTarget = '.col-sm-6.well.' + removeName;

			streamers.forEach(function(userName,i){
				if (userName.toLowerCase() === removeName.toLowerCase()){
					streamers.splice(i,1);
				}
			});

			$("div").remove(removeTarget);
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
		streamerNames.forEach(function(streamerName){
			$.ajax({
				type: "GET",
				url: "https://api.twitch.tv/kraken/users/"+streamerName,
				headers:{
					'Client-ID': "xjou88yulf05hx6t7jafgyya0nm541" 
				},	

				success: function(data){
					addStreamer(streamerName);
				},

				error: function(data){
					if (data.error) {
						streamPreview = "fonts/NoUserTwitch.png";
						streamInfo = "User Does Not Exist";
						streamStatus = "offline";
						createDisplay(streamerName,streamPreview,streamInfo,'#',streamStatus);
					}
				}
			})
		});
	}

	function removeStreamer(streamerName){
		$(".row").toogle(streamDisplay.streamerName);
	}

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

});


