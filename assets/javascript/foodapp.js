var database = firebase.database();

document.querySelector('#food-button').onclick = function() {
    var food = $('input[type=checkbox]:checked');
    //Loop through foods checked and push all data names to food-info-section
    for (i = 0; i < food.length; i++) {
        var input = $(food[i]);
        var foodN = input.data('name');

        var foodRef = database.ref('/home/foods/' + foodN);
        foodRef.once('value').then(function(snapshot) {
            var data = snapshot.val();
            var info = data.info;
            var foodName = data.name;
            var cardDiv = $('<div>').addClass('card medium hoverable');
            var imgCardDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
            var cardImg = $('<img>').attr('src', data.img).addClass('activator');
            imgCardDiv.append(cardImg);
            var cardContent = $('<div>').addClass('card-content');
            var title = $('<span>').addClass('card-title activator grey-text text-darken-4');
            title.html(foodName + '<i class="material-icons right">more_vert</i>');
            var truncInfo = $('<p>').addClass('truncate').text(info);
            cardContent.append(title, truncInfo);
            var cardReveal = $('<div>').addClass('card-reveal');
            var cardRevealTitle = $('<span>').addClass('card-title grey-text text-darken-4');
            cardRevealTitle.html(foodName + '<i class="material-icons right">close</i>');
            var cardInfo = $('<p>').text(info);
            cardReveal.append(cardRevealTitle, cardInfo);
            cardDiv.append(imgCardDiv, cardContent, cardReveal);
            var newCol = $('<div>').addClass('col s4').append(cardDiv);
            $('#food-info-section').addClass('row').append(newCol);
        });
    }
};
