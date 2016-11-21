$(document).ready(function() {

    //these are global variables
    var queryURL; //this query is for the recipe API
    var recipeTopic;

    //this array is for the first question that comes up asking the user to select preffered foods from a list
    var foods = ['cashews', 'almonds', 'hazelnuts',
        'brazil nuts', 'peanut butter', 'pumpkin seeds',
        'walnuts', 'lean pork', 'lean beef', ' chicken',
        'turkey', 'salmon', 'eggs', 'tuna', 'leafy greens', 'spinach', 'romaine',
        'sweet potato', 'edamame', 'asparagus', 'oatmeal', 'popcorn',
        'brown rice', 'beans', 'legumes', 'whole grain cereal',
        'quinoa', 'bananas', 'apples', 'oranges', 'blueberries',
        'melons', 'yogurt', 'cheese'
    ];

    //this array populates as foods are clicked by the user.  this is a temporary fix, if you have time you should
    //make it so that the "favorite foods" selected by the user is stored in a firebase object per user, instead of
    //an array in the javascript
    var chosenFoods = [];

    //Terence made the landing/home page with the carousel component. The carousel component is going to be used as the 
    //questionaire and this function populates a certain <div> with the "foods" array as buttons(answer choices) 

    //*** note that the carousel componenet was a change on the front end that was made at the end of class, and so
    //im not sure if this function will work in the same manner as it would on a regular <div>

    // function foodChoiceButtonmaker() {

    //     for (var i = 0; i < foods.length; i++) {

    //         var b = $('<button>');
    //         b.attr('data-foodName', foods[i]);
    //         b.addClass('foodChoice');
    //         b.text(foods[i]);

    //         $('#eat').append(b); //replace "#eat" with whichever div id is the display for the carousel.  
    //     }

    // };


    // this event handler/listener activates the above button making function when the user presses the 
    //"lets get started" button which should be on the first carousel page. So essentially the idea is that
    //the first question in the questionaire is asked after you press "lets get started" button.  But since
    //now were working with a carousel, the questionaire simply starts by sliding carousel pages.  This code
    //was oringally written for an entire page change dedicated to the questionaire,instead of changin pages
    //on a carousel so you may have to make minor changes as deemed necessary
    // $('start-button').on('click', foodChoiceButtonmaker());


    //this on click stores the user's favorite foods into the "chosenFoods" array.
    //(again this should be done though firebase if possible).
    // $('.foodChoice').on('click', function() {
    //     var name = $(this).attr('data-foodName');
    //     chosenFoods.push(name);
    //     $(this).remove();

    //     console.log(chosenFoods);

    // });

    //this on click compiles the answers (as of now only the first question answers) and spits back your 
    //result(recipes) into the appropriate place on the second html which should be found on hadi's branch.  
    //So that means after all the questions are answered on terence's homepage html, it switches to hadi's result
    //html and appends the results using the api's (only the recipe api for now).  So the on click "food-button" should
    //be on the last carousel page.

    //done-btn changed to food-button
    $("#food-button").click(function() {
        $('.carousel').carousel('next');

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


    });

});
