// clicking on input element grabs the value of "data-move" stores it in "exercise"
$('input').on('click', function(){
	var exercise = $(this).data('move');
// after selecting submit "#move-button" activate query search with value from "exercise"
	$('#move-button').on('click', function() {
	        
	        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' + exercise + '&type=video';

	        $.ajax({url: queryURL, method: 'GET'})
	            .done(function(response) {
	                var results = response.data; // .data is a key value in the response object, console .log response to get the key name

	                console.log(response);

	            });
	});
});

