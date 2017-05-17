var url = 'https://api.trello.com/1/search?idBoards=54ad9476179886c979b60080';
var apiKey = '4cc334d87ada29b1884404fe3f30956a';

var xhttp = new XMLHttpRequest();
xhttp.open('GET', url, true);

$('#btn').click(function() {
    $("#recipe").html('');
    
    var cokolwiek = $("#products").val();
    
    $.get(url + '&query=' + cokolwiek + '&key=' + apiKey, function(data){
        if (data.cards.length == 0) {
            $("#recipe").html('Brak przepisów. Spróbuj zmienić liczbę pojedynczą skladników na liczbę mnogą. Jeśli to nie pomoże, usuń jakiś składnik i wyszukaj ponownie');
        } else {
            data.cards.forEach(function(przepis) {
                var opis = przepis.desc;
                var tab = opis.split("\n");
                
                $("#recipe").html($("#recipe").html() + przepis.name + '<br>');
                
                for (var i = 0; i < tab.length; i++) {
                    $("#recipe").html($("#recipe").html() + tab[i] + '<br>');
                }
                
                $("#recipe").html($("#recipe").html() + '<br><hr width="80%" align="center"><br>');
            });
        }
    });
});