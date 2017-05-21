var url = 'https://api.trello.com/1/search?idBoards=54ad9476179886c979b60080';
var apiKey = '4cc334d87ada29b1884404fe3f30956a';
var n = 1, m = 1;

var app = angular.module("myApp", ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/main", {
            templateUrl: "main.html",
            controller: "myCtrl"
        })
        .when("/zaloguj", {
            templateUrl: "zaloguj.html",
            controller: "myCtrl"
        })
        .when("/zarejestruj", {
            templateUrl: "zarejestruj.html",
            controller: "myCtrl"
        })
        .when("/ulubione", {
            templateUrl: "ulubione.html"
        })
        .when("/menuUzytkownika", {
            templateUrl: "menuUzytkownika.html"
        })
        .otherwise({
            redirectTo: $routeProvider});
}]);

app.controller("myCtrl", function($scope, $http, $location) {
    $scope.sprawdz = function() {
        var cokolwiek = $("#products").val();
        $http.get(url + '&query=' + cokolwiek + '&key=' + apiKey).then(function(response) {
            $scope.przepisy = response.data.cards;
        });
    }
    $scope.insertData = function() {
        if ($scope.password != $scope.repassword) {
            $scope.help = "Podane hasła nie są identyczne, spróbuj jeszcze raz!";
        } else {
            $http.post('zarejestruj.php', {
                'email': $scope.email,
                'password': $scope.password
            }).success(function() {
                alert("Rejestracja powiodła się!");
                $location.url("/zaloguj");
            });
        }
    }

    $scope.checkData = function() {
        $http.post('test.php', {
            'username': $scope.email,
            'pass': $scope.password
        });

        console.log("bababababba");
        $.get("http://v-ie.uek.krakow.pl/~s187805/WpolDoKotleta/test.php", function(data) {
            var response = data;
            //if(response == "Podano błędne hasło lub email") {
                console.log(response);
            //} else {
            //    sessionStorage.setItem("email", response);
            //}
        })
    }

    $scope.add = function(recipe) {
        console.log(recipe);
    }

    $scope.addToMenu = function(recipe) {
        var przepis = recipe;
        if (sessionStorage.getItem("infiniteScrollEnabled") === null) {
            sessionStorage.setItem("danie" + n, przepis);
            n++;
        }
    }
    $scope.displayMenu = function() {
        while(sessionStorage.getItem("infiniteScrollEnabled") === null) {
            console.log(m + ") " + sessionStorage.getItem("danie" + m));
            m++;
        }
    }
});