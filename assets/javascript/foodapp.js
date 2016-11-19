var database = firebase.database();

document.querySelector('#search-food').onclick = function() {
    var food = $('#food-input').val().trim();
    var foodRef = database.ref('/home/foods/nuts/cashews');
    foodRef.once('value').then(function(snapshot) {
        var info = snapshot.val().info;
        var foodName = snapshot.val().name;
        var newDiv = $('<div>');
        var newImg = $('<img>');
        newImg.attr('src', 'assets/images/cashews.jpg');
        newDiv.append(foodName);
        newDiv.append(newImg);
        newDiv.append(info);
        $('#test-div').append(newDiv);
    });
};
