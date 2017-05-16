/**
 * Created by pietr on 16.05.2017.
 */
var url = 'https://www.googleapis.com/blogger/v3/blogs/113364381386655970/posts/search';
var apiKey = 'AIzaSyDon0gNSw6xDILElBRj6vNFQsdHrfB-_Jo';
var xhttp = new XMLHttpRequest();

xhttp.open('GET', url, true);

$('#btn').click(function() {
    var cokolwiek = $("#products").val();
    $.get(url + '?q=' + cokolwiek + '&key=' + apiKey, function(data){

        data.items.forEach(function(item){
            console.log("it works!");
            $("#recipe").html($("#recipe").html() + item.title + '<br>' + item.content + '<br><hr width="80%" align="center"><br><br>');
        });
    });
});