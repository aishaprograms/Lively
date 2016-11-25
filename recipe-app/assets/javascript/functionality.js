

$(document).ready(function() {



    var queryURL; 
    var recipeTopic;
    var chosenFoods = [];


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

  
    $("#food-button").click(function() {

        localStorage.setItem("chosenFoods", chosenFoods);

        if(chosenFoods.length<3){
            $('#modal1').modal('open');   
        }    


        else{

        $('.carousel').carousel('next');

        $("#recipesParagraph").empty();
        $("#recipesParagraph").text("Here are some high-energy recipes you can try today! Click the recipes to learn them.");
        $("#recipesParagraph").css("font-size","x-large");
        
            
        function recipeGrabber() {                   
                
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
                loadingHolder.remove();

                var result = response;
                console.log(result);
                var randomRecipeNum = Math.floor(Math.random() * 3);


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

        var recipeTopicTracker=[];

        function recipeTopicPicker(){
                
                while(recipeTopicTracker.length < 3){
                var randomnumber = Math.floor(Math.random()*chosenFoods.length)
                if(recipeTopicTracker.indexOf(randomnumber) > -1) continue;
                recipeTopicTracker[recipeTopicTracker.length] = randomnumber;
                }
        };
            
        recipeTopicPicker();


        for (var i = 0; i < 3; i++) {

        recipeTopic=chosenFoods[recipeTopicTracker[i]];
        queryURL = "https://crossorigin.me/https://api.edamam.com/search?q=" + recipeTopic + "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=3";
        recipeGrabber();

        }



        }       
    });

});
