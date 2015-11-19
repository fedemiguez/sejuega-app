// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ion-autocomplete', 'checklist-model'])

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
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    .state('app.partidospendientes', {
        url: '/partidospendientes',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidospendientes.html',
                controller: 'partidospendientesCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
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

    .state('app.partidoscancelados', {
        url: '/partidoscancelados',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidoscancelados.html',
                controller: 'partidoscanceladosCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })


    .state('app.partidosaceptados', {
        url: '/partidosaceptados',
        views: {
            'menuContent': {
                templateUrl: 'templates/partidosaceptados.html',
                controller: 'partidosaceptadosCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.invitacionescanceladas', {
        url: '/invitacionescanceladas',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionescanceladas.html',
                controller: 'invitacionescanceladasCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    .state('app.invitacionesaceptadas', {
        url: '/invitacionesaceptadas',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionesaceptadas.html',
                controller: 'invitacionesaceptadasCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    .state('app.invitacionespendientes', {
        url: '/invitacionespendientes',
        views: {
            'menuContent': {
                templateUrl: 'templates/invitacionespendientes.html',
                controller: 'invitacionespendientesCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
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
