 queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAiXi8_bMdiB0BhLbX6wGog3iuYCChKKD0&q=yoga&type=video";

 $.ajax({
     url: queryURL,
     method: 'GET',
 }).done(function(response) {
     console.log(response);
 });
