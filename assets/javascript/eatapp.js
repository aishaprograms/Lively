//global variables
var foodInputs = [];
var foodNamesArray = [];
var database = firebase.database();
var counter = 0;
var urlArray = [];

$('#submit-button').on('click', function() {
    //foodInputs is array of all checked input checkboxes
    foodInputs = $('input[type=checkbox]:checked');
    $('#food-info-section').append('<h4>Food Info</h4>');
    $('#recipe-section').append('<h4>Recipes</h4>');
    //foodNamesArray has all the data-name values for the checked inputs
    for (i = 0; i < foodInputs.length; i++) {
        var input = $(foodInputs[i]);
        var foodInputName = input.data('name');
        foodNamesArray.push(foodInputName);
    }

    foodNamesArray.forEach(function(element) {
        //using data-name for each food item, creates info card using data from firebase
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
        //urlArray is array of all urls to be passed to ajax call
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + element +
            "&app_id=a131e0d4&app_key=b0fab7e7fe1dbcd87138b0464ab43cb5&from=0&to=10";
        urlArray.push(queryURL);
    });
    //getData recursively for each url in urlArray so that calls are asynchronous and sequential
    var getData = function() {
        if (counter === urlArray.length) {
            counter = 0;
        } else {
            //calling api
            $.ajax({
                url: urlArray[counter],
                method: 'GET',
                success: function(result) {
                    var randomRecipeNum = Math.floor(Math.random() * 5);

                    var cardRow = $("<div>").addClass("row");
                    //creates two cards for two randomly selected recipes
                    for (var i = 0; i < 2; i++) {
                        var recipeName = result.hits[randomRecipeNum].recipe.label;

                        var link = $("<a>");
                        link.addClass('deep-orange-text bold');
                        link.attr("href", result.hits[randomRecipeNum].recipe.url);
                        link.attr("target", "_blank");
                        link.html('Get The Recipe');

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
                        var cardCol = $('<div>').addClass('col s12 m6 l6').append(card);
                        cardRow.append(cardCol);

                        randomRecipeNum = Math.floor(Math.random() * 5 + 5);
                    }
                    $("#recipe-section").append(cardRow);
                    counter++;
                    if (counter < urlArray.length) {
                        getData();
                    }
                }
            });
        }
    };
    getData();
});
