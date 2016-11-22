var vId = [];
var exercise;
// clicking on input element grabs the value of "data-move" stores it in "exercise"
$('input').on('click', function(){
	exercise = $(this).data('move');
	
// after selecting submit "#move-button" activate query search with value from "exercise"
	$('#move-button').on('click', function() {
	        
	        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' + exercise + '&type=video';
	        

	        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
	                var results = response.items; 

	                console.log(response);

	                // for (var i = 0; i < results.length; i++) {
	                	vId = results[0].id.videoId;
	                var video = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0"></iframe>');

	                video.attr('src', 'https://www.youtube.com/embed/' + vId);

	                $('#player').append(video);
	                // }

	                console.log(vId);
   			});
	});
}); 