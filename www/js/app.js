// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers', 'ionic-material', 'ionMdInput', 'ion-autocomplete', 'checklist-model'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        /*
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        */
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.crearpartido', {
        url: '/crearpartido',
        views: {
            'menuContent': {
                templateUrl: 'templates/crearpartido.html',
                controller: 'CrearPartidoCtrl'
            },

        }
    })
    .state('app.partidospendientes', {
        url: '/partidospendientes/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidospendientes.html',
                controller: 'partidospendientesCtrl'
            },

        }
    })

    .state('app.invitar', {
        url: '/invitar/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitar.html',
                controller: 'invitarCtrl'
            },

        }
    })

    .state('app.aceptar', {
        url: '/aceptar/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/aceptar.html',
                controller: 'aceptarCtrl'
            },

        }
    })


    .state('app.cancelar', {
        url: '/cancelar/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/cancelar.html',
                controller: 'cancelarCtrl'
            },

        }
    })

    .state('app.partidoscancelados', {
        url: '/partidoscancelados/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidoscancelados.html',
                controller: 'partidoscanceladosCtrl'
            },

        }
    })


    .state('app.partidosaceptados', {
        url: '/partidosaceptados/:partidoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidosaceptados.html',
                controller: 'partidosaceptadosCtrl'
            },

        }
    })

    .state('app.invitacionescanceladas', {
        url: '/invitacionescanceladas',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionescanceladas.html',
                controller: 'invitacionescanceladasCtrl'
            },

        }
    })
    .state('app.invitacionesaceptadas', {
        url: '/invitacionesaceptadas',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionesaceptadas.html',
                controller: 'invitacionesaceptadasCtrl'
            },

        }
    })
    .state('app.invitacionespendientes', {
        url: '/invitacionespendientes',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionespendientes.html',
                controller: 'invitacionespendientesCtrl'
            },

        }
    })




    .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil.html',
                controller: 'PerfilCtrl'
            },

        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.mispartidos', {
        url: '/mispartidos',
        views: {
            'menuContent': {
                templateUrl: 'templates/mispartidos.html',
                controller: 'mispartidosCtrl'
            },

        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'mispartidosCtrl'
            },

        }
    })



    .state('app.registrarse', {
        url: '/registrarse',
        views: {
            'menuContent': {
                templateUrl: 'templates/registrarse.html',
                controller: 'RegistrarseCtrl'
            },

        }
    })



    .state('app.inicio', {
        url: '/inicio',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio.html',
                controller: 'InicioCtrl'
            },

        }
    })


    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
