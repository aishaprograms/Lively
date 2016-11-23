// var vId array to contain videoId of each video; videoId specifies which video in the ajax response.items array
var videoIdArray = [];

var vId;
// var exercise contains the user's movement choice
var exercise;
// clicking on input element grabs the value of "data-move" stores it in "exercise"
$('input[name=move-group]').on('click', function() {
    exercise = $(this).data('move');

    // after selecting submit "#move-button" activate query search with value from "exercise"
    $('#move-button').on('click', function() {

        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' + exercise + '&type=video';


        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
            var results = response.items;

            // take out this console.log before production!
            console.log(response);

            //  need to add for loop and randomize video
            for (var i = 0; i < results.length; i++) {

            // assign vId the videoId from the response object; vId is declared as global var at the top
            videoIdArray.push(results[i].id.videoId);

            }
            // randomize the videoId stored in the videoIdArray; assign this random value to var "vId"
            vId = videoIdArray[Math.floor(Math.random() * videoIdArray.length)];

            // create iframe element with frame properties and attributes; store in var video
            var video = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0"></iframe>');

            // append attribute with src of youtube + the videoId stored in var vId
            video.attr('src', 'https://www.youtube.com/embed/' + vId);

            // append the video to the div with id of "player"; it will append once user clicks the submit button with id of move-button
            $('#player').append(video);
            // take out this console.log before production!
            console.log(videoIdArray);
            console.log(vId);
        });
    });
});
