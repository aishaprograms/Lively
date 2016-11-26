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
            var newDiv = $('<div>');
            var sub1NewDiv = $('<div>');
            //adds materilize card  to div
            newDiv.addClass('card  large');
            sub1NewDiv.addClass('card-image');
            sub1NewDiv.append($('<span>').text(foodName).addClass('card-title'));
            var newImg = $('<img>');
            newImg.attr('src', data.img);
            newDiv.append(foodName);
            newDiv.append(newImg);
            newDiv.append(info);
            $('#food-info-section').append(newDiv);
        });
    }
};
