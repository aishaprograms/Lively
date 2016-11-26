$(document).ready(function() {
    //outer variables
    var queryURL;
    var recipeTopic;
    var chosenFoods = [];

    //removes element from array
    function removeA(arr) {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) != -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    //stores user clicks for favorite foods, and deletes elements if item is checked off.
    $('.userInput').on('click', function() {

        var name = this.id;

        if (chosenFoods.includes(name)) {
            for (var i = 0; i < chosenFoods.length; i++) {
                if (this.id == chosenFoods[i]) {
                    removeA(chosenFoods, this.id)


                }
            }
        } else {
            chosenFoods.push(name);
        }

    });

    //when the user presses next
    $("#food-button").click(function() {

        //store user chosen foods in local storage
        localStorage.setItem("chosenFoods", chosenFoods);

        //don't allow user to go on if 3 items are not picked
        if (chosenFoods.length < 3) {
            $('#modal1').modal('open');
        }

        //allow to continue if 3 items or more are picked
        else {

            //next carouself question
            $('.carousel').carousel('next');

            //replaces old recipe text with new text
            $("#recipesParagraph").empty();
            $("#recipesParagraph").text("Here are some high-energy recipes you can try today! Click the recipes to learn them.");
            $("#recipesParagraph").css("font-size", "x-large");

<<<<<<< HEAD
            //function that uses ajax to call api data and make a card and display info on it   
            function recipeGrabber() {

                //html created for preloader and appended when waiting for results
                var circle3 = $('<div>');
                circle3.addClass('circle');

                var circleClip2 = $('<div>');
                circleClip2.addClass('circle-clipper right');
                circleClip2.append(circle3);

                var circle = $('<div>');
                circle.addClass('circle');

                var circleClip = $('<div>');
                circleClip.addClass('circle-clipper left');
                circleClip.append(circle);

                var spinLayer = $('<div>');
                spinLayer.addClass('spinner-layer');
                spinLayer.append(circleClip, circleClip2);

                var loadingHolder = $('<div>');
                loadingHolder.addClass('preloader-wrapper big active');
                loadingHolder.append(spinLayer);


                $("#recipeRow").append(loadingHolder);


                //calling api
                $.ajax({
                    url: queryURL,
                    method: 'GET',
                }).done(function(response) {

                    //remove preloader when results are received
                    loadingHolder.remove();


                    var result = response;
                    var randomRecipeNum = Math.floor(Math.random() * 3);

                    //the following is card html data being dynamically created with recipe data in it and displayed
                    var link = $("<a>");
                    link.attr("href", result.hits[randomRecipeNum].recipe.url);
                    link.attr("target", "_blank");
=======
    //this on click compiles the answers (as of now only the first question answers) and spits back your 
    //result(recipes) into the appropriate place on the second html which should be found on hadi's branch.  
    //So that means after all the questions are answered on terence's homepage html, it switches to hadi's result
    //html and appends the results using the api's (only the recipe api for now).  So the on click "food-button" should
    //be on the last carousel page.
    // Slick Carousel code for slider
    $('#index-carousel').slick({
        dots: false,
        arrows: false
    });
    $('#start-button').on('click', function() {
        $('#index-carousel').slick('slickNext');
    });
    //done-btn changed to food-button
    $("#food-button").click(function() {
        $('#index-carousel').slick('slickNext');

        //this function uses the recipe api to pull three recipes from and display them to the page.  Now that we're switching pages
        //though after the questoinaire, the data in the chosenFoods array should be stored in the browser, at least for the time being,
        //or most optimally in firebase.  Becuase otherwise, this javascript will/might reset the data in the chosenFoods array to be empty
        //when the pages switch.
        function recipeGrabber() {

            //these were used for the original html design, to clear the page before appending the results.
            $("#recipe-section").empty();

            //calling api
            $.ajax({
                url: queryURL,
                method: 'GET',
            }).done(function(response) {

                var result = response;
                console.log(result);

                //these three blocks of code are ugly but i did them just to see if it was working.  if pulls the image data and recipe
                //titles from the first three recipe objects that are pulled from the api and displays them on the page.
                var div1 = $('<div>');
                var link1 = $('<a>');
                link1.attr('href', result.hits[0].recipe.url);
                link1.attr('target', '_blank');
                var imageURL1 = result.hits[0].recipe.image;
                var image1 = $('<img>');
                image1.addClass('responsive-img');
                image1.attr('src', imageURL1);
                var recipe1 = result.hits[0].recipe.label;
                var title1 = $('<h6>');
                title1.text(recipe1);
                title1.addClass('truncate');
                link1.append(title1);
                link1.append(image1);
                div1.append(link1);
                $('#recipe-section').append(div1); //change "#recipe-section" to whichever div necessary

                var div2 = $('<div>');
                var link2 = $('<a>');
                link2.attr('href', result.hits[1].recipe.url);
                link2.attr('target', '_blank');
                var imageURL2 = result.hits[1].recipe.image;
                var image2 = $('<img>');
                image2.addClass('responsive-img');
                image2.attr('src', imageURL2);
                var recipe2 = result.hits[1].recipe.label;
                var title2 = $('<h6>');
                title2.addClass('truncate');
                title2.text(recipe2);
                link2.append(title2);
                link2.append(image2);
                div2.append(link2);
                $('#recipe-section').append(div2); //change "#recipe-section" to whichever div necessary

                var div3 = $('<div>');
                var link3 = $('<a>');
                link3.attr('href', result.hits[2].recipe.url);
                link3.attr('target', '_blank');
                var imageURL3 = result.hits[2].recipe.image;
                var image3 = $('<img>');
                image3.addClass('responsive-img');
                image3.attr('src', imageURL3);
                var recipe3 = result.hits[2].recipe.label;
                var title3 = $('<h6>');
                title3.text(recipe3);
                title3.addClass('truncate');
                link3.append(title3);
                link3.append(image3);
                div3.append(link3);
                $('#recipe-section').append(div3); //change "#recipe-section" to whichever div necessary


            });
        }
        //************
        //temporary code
        //************
        chosenFoods = ['cashews', 'almonds', 'hazelnuts'];
        //************
        //************
        //this simply randomizes recipeTopics for the user each time he logs on to use it, so it doesnt pop out the same
        //recipes all the time.
        recipeTopic = chosenFoods[Math.floor(Math.random() * chosenFoods.length)];

        //this then takes the randomly chosen recipeTopic from chosenFoods array and then calls the api function
        console.log(recipeTopic);
        queryURL = "https://crossorigin.me/https://api.edamam.com/search?q=" + recipeTopic + "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=3";
        recipeGrabber(); //api function being evoked after query is updated 
>>>>>>> foodapp-branch

                    var imageURL1 = result.hits[randomRecipeNum].recipe.image;

                    var image = $("<img>");
                    image.addClass("responsive-img");
                    image.attr("src", imageURL1);
                    image.css("width", "328.5px");

                    var recipeName = result.hits[randomRecipeNum].recipe.label;

                    var cardTitleText = $("<div>");
                    cardTitleText.text(recipeName);
                    cardTitleText.css("text-align", "center");
                    // cardTitleText.css("height", "108.5px");

                    var cardTitle = $("<div>");
                    cardTitle.addClass("card-title");
                    cardTitle.css("padding", "13.25px");
                    cardTitle.css("border-top", "4px dotted");
                    cardTitle.css("min-height", "138.5px");
                    cardTitle.append(cardTitleText);

                    var cardImageHolder = $("<div>");
                    cardImageHolder.attr("id", "card-image");

                    cardImageHolder.append(image, cardTitle);
                    link.append(cardImageHolder);

                    var card = $("<div>");
                    card.addClass("card");
                    card.append(link);

                    var cardAction = $("<div>");
                    cardAction.addClass("card-action");

                    var cardContent = $("<div>");
                    cardContent.addClass("card-content");
                    // cardContent.text();

                    var cardCol = $("<div>");
                    cardCol.addClass("col s4");
                    cardCol.append(card, cardContent);

                    $("#recipeRow").append(cardCol);

                });
            }

            //this keeps track of random numbers chosen randomly
            var recipeTopicTracker = [];

            //keep choosing random numbers if the previous number chosen is not in recipeTopicTracker 
            //until array reaches length of 3
            function recipeTopicPicker() {

                while (recipeTopicTracker.length < 3) {
                    var randomnumber = Math.floor(Math.random() * chosenFoods.length)
                    if (recipeTopicTracker.indexOf(randomnumber) > -1) continue;
                    recipeTopicTracker[recipeTopicTracker.length] = randomnumber;
                }
            };

            recipeTopicPicker();

            //call api 3 times using the 3 random numbers from above to get three random recipes from chosenFoods
            for (var i = 0; i < 3; i++) {

                recipeTopic = chosenFoods[recipeTopicTracker[i]];
                queryURL = "https://crossorigin.me/https://api.edamam.com/search?q=" + recipeTopic + "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=3";
                recipeGrabber();

            }



        }
    });

});
