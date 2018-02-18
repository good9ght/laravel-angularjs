let app = angular.module("meuApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "templates/home.html",
        controllerAs: "ctrl",
        controller  : function($window, $routeParams, $http) {
            console.log($routeParams);
            let routeParams = $routeParams;
            console.log(routeParams.access_token);
            this.accessToken = routeParams.access_token
            this.userToken = "";
            this.autenticar = function() {
                $window.location.href = "http://127.0.0.1:8000/oauth/authorize?client_id=1&redirect_uri&response_type=token&scope"
            }

            this.token = function() {
                let t = this;
                $http({
                    method  : 'GET',
                    url     : 'http://127.0.0.1:8000/api/user/token',
                    headers : {
                        'Accept': 'Application/json',
                        'Authorization' : 'Bearer '+ t.accessToken,

                    }
                })
                .then(function(resultado) {
                    console.log(resultado.data);
                    t.userToken = resultado.data.id;
                });
            }

            this.tokens = function() {
                let t = this;
                $http({
                    method  : 'GET',
                    url     : 'http://127.0.0.1:8000/oauth/personal-access-tokens',
                    headers : {
                        'Accept': 'Application/json',
                        'Authorization' : 'Bearer '+ t.userToken,

                    }
                });
            }

         }
    });
});
