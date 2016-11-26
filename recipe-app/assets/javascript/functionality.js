
$(document).ready(function() {
    //outer variables
    var queryURL; 
    var recipeTopic;
    var chosenFoods = [];

    //removes element from array
    function removeA(arr){
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length){
        what= a[--L];
        while((ax= arr.indexOf(what))!= -1){
            arr.splice(ax, 1);
        }
    }
    return arr;
    }

    //stores user clicks for favorite foods, and deletes elements if item is checked off.
    $('.userInput').on('click', function() {
        
        var name = this.id;

        if(chosenFoods.includes(name)){
            for (var i = 0; i <chosenFoods.length; i++) {
                if(this.id==chosenFoods[i]){
                    removeA(chosenFoods,this.id)


                }
            }
        }

        else{
        chosenFoods.push(name);
        }

    });

    //when the user presses next
    $("#food-button").click(function() {

        //store user chosen foods in local storage
        localStorage.setItem("chosenFoods", chosenFoods);

        //don't allow user to go on if 3 items are not picked
        if(chosenFoods.length<3){
            $('#modal1').modal('open');   
        }    

        //allow to continue if 3 items or more are picked
        else{

        //next carouself question
        $('.carousel').carousel('next');

        //replaces old recipe text with new text
        $("#recipesParagraph").empty();
        $("#recipesParagraph").text("Here are some high-energy recipes you can try today! Click the recipes to learn them.");
        $("#recipesParagraph").css("font-size","x-large");
        
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

                var imageURL1 = result.hits[randomRecipeNum].recipe.image;

                var image= $("<img>");
                image.addClass("responsive-img");
                image.attr("src", imageURL1);
                image.css("width","328.5px");

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
                cardImageHolder.attr("id","card-image");
                
                cardImageHolder.append(image, cardTitle);
                link.append(cardImageHolder);

                var card= $("<div>");
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
        var recipeTopicTracker=[];

        //keep choosing random numbers if the previous number chosen is not in recipeTopicTracker 
        //until array reaches length of 3
        function recipeTopicPicker(){
                
                while(recipeTopicTracker.length < 3){
                var randomnumber = Math.floor(Math.random()*chosenFoods.length)
                if(recipeTopicTracker.indexOf(randomnumber) > -1) continue;
                recipeTopicTracker[recipeTopicTracker.length] = randomnumber;
                }
        };
            
        recipeTopicPicker();

        //call api 3 times using the 3 random numbers from above to get three random recipes from chosenFoods
        for (var i = 0; i < 3; i++) {

        recipeTopic=chosenFoods[recipeTopicTracker[i]];
        queryURL = "https://crossorigin.me/https://api.edamam.com/search?q=" + recipeTopic + "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=3";
        recipeGrabber();

        }



        }       
    });

});
