// var vId array to contain videoId of each video; videoId specifies which video in the ajax response.items array
var videoIdArray = [];
// var vId stores the randomized youtube videoId
var vId;
// var exercise contains the user's movement choice
// clicking on input element grabs the value of "data-move" stores it in "exercise"
var exercise;
var channel;

// after selecting submit "#move-button" activate query search with value from "exercise"
$('#submit-button').on('click', function() {
    exercise = $('input[type=radio]:checked').data('move');
    channel = $('input[type=radio]:checked').data('channel');

    if (exercise === undefined) {
        $('#move-modal').modal('open');
        $('#move-button').attr('href', '#');
    } else {
        $('#move-button').attr('href', '#eat');
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDK_Rztci24wnYItAD8mAPmF87ZtvCObOs&q=' +
            exercise + '&channelId=' + channel + '&type=video&prettyPrint=false&eventType=completed&maxResults=30&safeSearch=strict&topicId=/m/027x7n';



    $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
        var results = response.items;

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
        var cardReveal = $('<div class="card-reveal"></div>');
            if(exercise === 'yoga'){
                cardReveal.append('<span class="card-title blue-text text-darken-3">What is Yoga?<i class="material-icons right">close</i></span><br>\"...Yoga was developed up to 5,000 years ago in India as a comprehensive system for wellbeing on all levels: physical, mental, emotional and spiritual. While Yoga is often equated with Hatha Yoga, the well-known system of postures and breathing techniques, Hatha Yoga is only a part of the overall discipline of Yoga. Today, many millions of people use various aspects of Yoga to help raise their quality of life in such diverse areas as fitness, stress relief, wellness, vitality, mental clarity, healing, peace of mind and spiritual growth...<br><br> Since the individual experience of Yoga is quite personal and may differ for each practitioner, there are a wide variety of approaches to its practice. Yoga has in recent times branched out in many new directions, some of which are quite different from its traditional emphases. All approaches to Yoga, however, are intended to promote some aspect(s) of wellbeing. As a result, today’s practitioners have more options than ever as they seek to gain the most from the vibrant, ever-expanding field of Yoga.\" <br><br> -Yoga Alliance <br><br> To find out more about yoga or to find a studio and instructor near you, go to the <a href="https://www.yogaalliance.org/Directory?Type=School">Yoga Alliance webpage!</a>  It\'s a great starting point!');
            } else if(exercise === 'cardio'){
                cardReveal.append('<span class="card-title blue-text text-darken-3">What is Cardio?<i class="material-icons right">close</i></span><br>\"Regular aerobic activity such as walking, bicycling or swimming can help you live longer and healthier. Need motivation? See how aerobic exercise affects your heart, lungs and blood flow. Then get moving and start reaping the rewards. <br><br>How your body responds to aerobic exercise<br><br> During aerobic activity, you repeatedly move large muscles in your arms, legs and hips. You\'ll notice your body\'s responses quickly. <br><br>You\'ll breathe faster and more deeply. This maximizes the amount of oxygen in your blood. Your heart will beat faster, which increases blood flow to your muscles and back to your lungs. Your small blood vessels (capillaries) will widen to deliver more oxygen to your muscles and carry away waste products, such as carbon dioxide and lactic acid. Your body will even release endorphins, natural painkillers that promote an increased sense of well-being.\" <br><br>-Mayo Clinic <br><br>To get more ideas on cardio workouts try <a href="https://www.fitnessblender.com/">Fitness Blender</a>. <br><br>They provide a one stop webpage to search for your fitness needs.');
            } else if(exercise === 'strength-training') {
                cardReveal.append('strength-training language');
            }
        // nest the "cardImage" into the "div class='card'"; use .html to replace preloader
        var cardContent = $('<div class="card-content"></div>').append($('<span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i>'));
            if(exercise === 'yoga'){
                cardContent.append('<span class="card-title activator grey-text text-darken-4">What is Yoga?</span>');
            } else if(exercise === 'cardio'){
                cardContent.append('<span class="card-title activator grey-text text-darken-4">What is Cardio?</span>');
            } else if(exercise === 'strength-training') {
                cardContent.append('<span class="card-title activator grey-text text-darken-4">What is Strength?</span>');
            }
        var videoCard = $('<div class="card"></div>').append(cardImage).append(cardContent).append(cardReveal);

        // insert the "videoCard" to the div with id of "player"; it will add once user clicks the submit button with id of move-button; use .html() to prevent multiple videos
        $('#player').addClass('row').html(videoCard);
        });
        $('#results-wrapper').show();

    }


});
