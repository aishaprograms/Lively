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

        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' + exercise + '&type=video&prettyPrint=false&eventType=completed&maxResults=15&safeSearch=strict&topicId=/m/027x7n&topicId=/m/0kt51';


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


            // create var "video" iframe element with frame properties and attributes; store in var video
            var video = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0"></iframe>');

            // add attribute with src of youtube + the randomized videoId stored in var "vId"
            video.attr('src', 'https://www.youtube.com/embed/' + vId);

            // there are so many ".append()" steps in order to nest the divs in the correct order to produce the materialize card effect
            // var "cardImage" has class of "video-container" which allows video to be responsive
            var cardImage = $('<div class="video-container"></div>').append(video);
            // nest the "cardImage" into the "div class='card'"
            var videoCard = $('<div class="card"></div>').append(cardImage).append($('<div class="card content"><span class="card-title activator grey-text text-darken-4">Need more?<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Check out more of these workout tips!<i class="material-icons right">close</i></span><p>More workout links</p></div>'));
            // append the "videoCard" to the div with id of "player"; it will append once user clicks the submit button with id of move-button
            $('#player').html(videoCard);
            // take out this console.log before production!
        });
    });

    $(document).on('click', '.material-icons', function() {

        var queryURL = 'https://www.googleapis.com/youtube/v3/channels?part=snippet&contentDetails&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' + exercise + '&id=UCtzvzjLp-K71bBnIxjkjE4Q';


        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
            var results = response;

            console.log(response);
       	}); 
    });    
});

