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
            var newDiv = $('<div>').addClass('card medium');
            var subNewDiv = $('<div>').addClass('card-image');
            var newImg = $('<img>').attr('src', data.img);
            subNewDiv.append(newImg);
            var title = $('<span>').text(foodName).addClass('card-title');
            subNewDiv.append(title);
            var cardInfo = $('<div>').addClass('card-content').text(info);
            newDiv.append(subNewDiv);
            newDiv.append(cardInfo);
            var newCol = $('<div>').addClass('col s4').append(newDiv);
            $('#food-info-section').append(newCol);
        });
    }
};
