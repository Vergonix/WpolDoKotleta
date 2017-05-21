var url = 'https://api.trello.com/1/search?idBoards=54ad9476179886c979b60080';
var apiKey = '4cc334d87ada29b1884404fe3f30956a';
var n = 1;
var dishes = "";

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
            templateUrl: "ulubione.html",
            controller: "myCtrl"
        })
        .when("/menuUzytkownika", {
            templateUrl: "menuUzytkownika.html",
            controller: "myCtrl"
        })
        .when("/zalogujSie", {
            templateUrl: "zalogujSie.html"
        })
        .otherwise({
            redirectTo: $routeProvider});
}]);

app.controller("myCtrl", function($scope, $http, $location) {
    $scope.sprawdz = function() {
        var ingredient = $("#products").val();
        $http.get(url + '&query=' + ingredient + '&key=' + apiKey).then(function(response) {
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

    $scope.login = function() {
        var parameter = JSON.stringify({user: $scope.user, pass: $scope.pwd});
        
        $http.post('zaloguj.php', parameter).then(function(response) {
            if (response.data.records.length === 1) {
                sessionStorage.setItem("user", response.data.records[0].id);
                $location.url("/main");
            } else {
                alert("Podano błędny email lub hasło");
            }
        });
    }
    $scope.addToFav = function(n, d) {
        var recipeName = n;
        var user = sessionStorage.getItem("user");
        if(user != null) {
            var name = JSON.stringify({name: recipeName, id: user});
            $http.post('ulubione.php', name).then(function(odp) {
                if (odp.data === true) {
                    alert("Dodano do ulubionych!")
                } else {
                    alert("Coś poszło nie tak, spróbuj jeszcze raz");
                }
            });
        } else {
            alert("Zaloguj się, aby dodać przepis do ulubionych");
        }
    }
    $scope.fav = function() {
        var userId = sessionStorage.getItem("user");
        if (userId != null) {
            var user = JSON.stringify({id: userId});
            $http.post('wyswietlUlubione.php', user).then(function(result) {
                if (result.data.records.length > 0) {
                    $scope.ulubione = result.data.records;
                } else {
                    alert("Brak ulubionych przepisów");
                }
            });
        } else {
            $location.url("/zalogujSie");
        }
    }
    $scope.search = function(e) {
        var name = e;
        $http.get(url + '&query=' + name + '&key=' + apiKey).then(function(response) {
            $scope.desc = response.data.cards[0].desc;
        });
    }
    $scope.addToMenu = function(recipe) {
        var przepis = recipe;
        if (sessionStorage.getItem("infiniteScrollEnabled") === null) {
            sessionStorage.setItem("danie" + n, przepis);
            n++;
        }
    }

    $scope.displayMenu = function() {
        for(var i=0; i<=(n-2); i++) {
            dishes += ("- " + sessionStorage.getItem("danie" + (i+1)) + "<br>");
        }
        $("#menuList").html(dishes);
    }
});