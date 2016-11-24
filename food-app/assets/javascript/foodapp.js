var database = firebase.database();

document.querySelector('#food-button').onclick = function() {
    var food = $('input[type=checkbox]:checked').data('name');
    console.log(food);
    var foodRef = database.ref('/home/foods/' + food);
    foodRef.once('value').then(function(snapshot) {
        var data = snapshot.val();
        var info = data.info;
        var foodName = data.name;
        var newDiv = $('<div>');
        var sub1NewDiv = $('<div>');
        //adds materilize card  to div
        newDiv.addClass('row col s12 m7 card  small');
        sub1NewDiv.addClass('card-image');
        sub1NewDiv.append($('<span>').text(foodName).addClass('card-title'));
        var newImg = $('<img>');
        newImg.attr('src', data.img);
        newDiv.append(foodName);
        newDiv.append(newImg);
        newDiv.append(info);
        $('#food-info-section').append(newDiv);
    });
};
