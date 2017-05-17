var url = 'https://api.trello.com/1/search?idBoards=54ad9476179886c979b60080';
var apiKey = '4cc334d87ada29b1884404fe3f30956a';

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
    $scope.pobierz = function() {
        var cokolwiek = $("#products").val();
        $http.get(url + '&query=' + cokolwiek + '&key=' + apiKey).then(function(response) {
            $scope.przepisy = response.data.cards;
        });
    }
});