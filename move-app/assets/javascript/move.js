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

	                // }

	                console.log(vId);
	                // 2. This code loads the IFrame Player API code asynchronously.
                var tag = document.createElement('script');

                      tag.src = "https://www.youtube.com/iframe_api";
                      var firstScriptTag = document.getElementsByTagName('script')[0];
                      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                       // 3. This function creates an <iframe> (and YouTube player)
                      //    after the API code downloads.
                      var player;
                      function onYouTubeIframeAPIReady() {
                        player = new YT.Player('player', {
                          height: '390',
                          width: '640',
                          videoId: 'vId',
                          events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                          }
                        });
                      }

                      // 4. The API will call this function when the video player is ready.
                      function onPlayerReady(event) {
                        event.target.playVideo();
                      }

                      // 5. The API calls this function when the player's state changes.
                      //    The function indicates that when playing a video (state=1),
                      //    the player should play for six seconds and then stop.
                      var done = false;
                      function onPlayerStateChange(event) {
                        if (event.data == YT.PlayerState.PLAYING && !done) {
                          setTimeout(stopVideo, 6000);
                          done = true;
                        }
                      }
                      function stopVideo() {
                        player.stopVideo();
                      }
   			});
	});
}); 
	           

                      
	

				