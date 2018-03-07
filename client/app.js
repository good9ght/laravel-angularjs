let app = angular.module("meuApp", ["ngRoute", 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "templates/home.html",
        controllerAs: "ctrl",
        controller  : function($window, $routeParams, $http, $cookies) {

            this.token = $routeParams;
            console.log(this.token);
            this.accessToken = this.token.access_token
            this.usuario = [];

            this.autenticar = function() {
                // Redirecionando para a página de autenticação com os parâmetros necessários:
                // client_id
                // redirect_uri
                // response_type = token
                // scope

                $window.location.href = "http://127.0.0.1:8000/oauth/authorize?client_id=1&redirect_uri&response_type=token&scope"
            }

            this.get = function() {
                let self = this;
                console.log(self.accessToken);
                $http({
                    method  : 'GET',
                    url     : 'http://127.0.0.1:8000/api/user',
                    headers : {
                        'Accept': 'Application/json',
                        'Authorization' : 'Bearer '+ self.accessToken,
                    }
                })
                .then(function(resultado) {
                    console.log($cookies.getAll());
                    console.log(resultado.data);
                    self.usuario = resultado.data;
                });
            }

            this.post = function(dados) {
                let self = this;
                $http({
                    method  : 'POST',
                    url     : 'http://127.0.0.1:8000/api/posts',
                    data: dados,
                    headers : {
                        'Accept': 'Application/json',
                        'Authorization' : 'Bearer '+ self.accessToken,

                    }
                })
                .then(function(resultado) {
                    console.log(resultado.data);
                });
            }
         }
    });
});
