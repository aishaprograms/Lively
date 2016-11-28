//global variables
var foodInputs = [];
var foodNamesArray = [];
var database = firebase.database();

document.querySelector('#food-button').onclick = function() {
    foodInputs = $('input[type=checkbox]:checked');
    if (foodInputs.length === 0 || foodInputs.length > 4) {
        $('#foods-modal').modal('open');
    } else {
        $('#food-info-section').append('<h4>Food Info</h4>');
        $('#recipe-section').append('<h4>Recipes</h4>');
        for (i = 0; i < foodInputs.length; i++) {
            var input = $(foodInputs[i]);
            var foodInputName = input.data('name');
            foodNamesArray.push(foodInputName);
        }

        foodNamesArray.forEach(function(element) {
            var foodRef = database.ref('/home/foods/' + element);
            foodRef.once('value').then(function(snapshot) {
                var data = snapshot.val();
                var info = data.info;
                var foodName = data.name;
                var cardDiv = $('<div>').addClass('card medium blue');
                var imgCardDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
                var cardImg = $('<img>').attr('src', data.img).addClass('activator');
                imgCardDiv.append(cardImg);
                var cardContent = $('<div>').addClass('card-content white-text');
                var title = $('<span>').addClass('card-title activator white-text text-darken-4');
                title.html(foodName + '<i class="material-icons right">more_vert</i>');
                var truncInfo = $('<p>').addClass('truncate').text(info);
                cardContent.append(title, truncInfo);
                var cardReveal = $('<div>').addClass('card-reveal blue');
                var cardRevealTitle = $('<span>').addClass('card-title white-text text-darken-4');
                cardRevealTitle.html(foodName + '<i class="material-icons right">close</i>');
                var cardInfo = $('<p>').addClass('white-text').text(info);
                cardReveal.append(cardRevealTitle, cardInfo);
                cardDiv.append(imgCardDiv, cardContent, cardReveal);
                var newRow = $('<div>').addClass('row');
                var newCol = $('<div>').addClass('col s12').append(cardDiv);
                newRow.append(newCol);
                $('#food-info-section').append(newRow);
            });

            var queryURL = "https://crossorigin.me/https://api.edamam.com/search?q=" + element +
                "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=10";

            //calling api
            $.ajax({
                url: queryURL,
                method: 'GET',
                async: false,
                beforeSend: function() {
                    $('#food-loader').show();
                },
                complete: function() {
                    $('#food-loader').hide();
                },
            }).done(function(result) {

                var randomRecipeNum = Math.floor(Math.random() * 5);

                var cardRow = $("<div>").addClass("row");

                for (var i = 0; i < 2; i++) {
                    var recipeName = result.hits[randomRecipeNum].recipe.label;

                    var link = $("<a>");
                    link.addClass('deep-orange-text bold');
                    link.attr("href", result.hits[randomRecipeNum].recipe.url);
                    link.attr("target", "_blank");
                    link.html('Get Recipe');

                    var imageURL = result.hits[randomRecipeNum].recipe.image;

                    var card = $("<div>");
                    card.addClass("card medium");

                    var cardImage = $("<div>");
                    cardImage.addClass("card-image");
                    var image = $("<img>");
                    image.attr("src", imageURL);

                    cardImage.append(image);

                    var cardContent = $("<div>").addClass("card-content grey-text text-darken-4");
                    var cardTitleText = $("<span>").addClass('card-title truncate');
                    cardTitleText.text(recipeName);
                    cardContent.append(cardTitleText);

                    var cardAction = $("<div>").addClass("card-action");
                    cardAction.append(link);

                    card.append(cardImage, cardContent, cardAction);
                    var cardCol = $('<div>').addClass('col s6').append(card);
                    cardRow.append(cardCol);

                    randomRecipeNum = Math.floor(Math.random() * 5 + 5);
                }
                $("#recipe-section").append(cardRow);
            });
        });
        $('#index-carousel').slick('slickNext');
    }
};
