/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $http, $location, $rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.doLogout = function(){
    $http.get('http://sejuega.herokuapp.com/logout').then(function(resp) {
    $scope.user = resp.data.data;
    $location.path('/app/inicio');
    $rootScope.userToken="";

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

        }


})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})





.controller('RegistrarseCtrl', function($rootScope, $scope, $timeout, $stateParams, ionicMaterialInk, $http, $location) {
    
        if($rootScope.user){

            $scope.user = $rootScope.user;
        }else{

        $scope.user={};
        $scope.user.picture='';
        $scope.user.name='';
        $scope.user.email='';
        $scope.user.id ='';
    
        }
        

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.doRegister = function() {

      $http.post('http://sejuega.herokuapp.com/usuario',$scope.user ).then(function(resp) {
        console.log(resp.data);
        $location.path('/app/perfil');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    };

        $scope.doShare = function() {
            FB.ui(
             {
              method: 'share',
              href: 'https://netflix.com'
            }, function(response){});
    };


$scope.doRegisterFB = function() {
    
    FB.login(function(){
    // Note: The call will only work if you accept the permission request
    FB.api('/me?fields=id,name,picture{url},email', 'get', function(data){


      $scope.user.picture = data.picture.data.url;
      $scope.user.name = data.name;
      $scope.user.email = data.email;
      $scope.user.id = data.id;
      $rootScope.user = $scope.user;
      $scope.$apply();
      console.log($scope.user);

        }); $location.path('/app/perfil');

  }, {scope: 'public_profile, user_friends, email'});



  };





})

.controller('mispartidosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $location, $rootScope) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });

    $scope.partidos = [];

       $http.get('http://sejuega.herokuapp.com/mispartidos', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
         $scope.partidos = resp.data.data;
         console.log('Succes partidos', resp.data.data);


       }, function(err) {
         console.error('ERR', err);
         // err.status will contain the status code
       });

 
})

.controller('InicioCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicPopup, $location, $http, $rootScope) {

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();


        $rootScope.userToken = ''; 
        $scope.user={};
        $scope.user.email='';
        $scope.user.password =''; 
  
   $scope.doLogin = function() {
      $http.post('http://sejuega.herokuapp.com/login',$scope.user).then(function(resp) {
         $rootScope.userToken = resp.data.token;
         $location.path('/app/perfil');

    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Email o contraseña invalido'
           });
           alertPopup.then(function(res) {
             $location.path('/app/inicio');
           });
      // err.status will contain the status code
    });
    };



})
.controller('partidospendientesCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $location, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });

})

.controller('partidoscanceladosCtrl', function($http, $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})
.controller('partidosaceptadosCtrl', function($http, $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})

.controller('invitacionespendientesCtrl', function($location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
    $scope.partidos = [];


      $http.get('http://127.0.0.1/pruebaapi/api.php/partidos').then(function(resp) {
      $scope.partidos = resp.data.data;
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})
.controller('invitacionescanceladasCtrl', function($http, $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})
.controller('invitacionesaceptadasCtrl', function($http, $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})



.controller('invitacionesaceptadasCtrl', function($http, $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

        $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
})



.controller('CrearPartidoCtrl', function( $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
      $scope.partidos={};
        $scope.partidos.nombre='';
        $scope.partidos.participantes='';
        $scope.partidos.fecha='';
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


    $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
    


          $scope.doCreate = function() {

      $http.post('http://sejuega.herokuapp.com/partidos', $scope.partidos, {headers: {'auth-token': $rootScope.userToken}}  ).then(function(resp) {
        console.log(resp.data);
              $location.path('/app/mispartidos');

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    };




})


.controller('invitarCtrl', function($scope, $http, $location, $rootScope, $stateParams, $ionicPopup) {

    console.log($rootScope.userToken);     
    
    $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/entrar');
      // err.status will contain the status code
    });



  $scope.usuarioList = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://sejuega.herokuapp.com/usuario').then(function(resp) {
      $scope.usuarioList = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

        $scope.selected = {
        usuarios: []
      };


      $scope.doInvitar = function() {
      $http.post('http://sejuega.herokuapp.com/partidos/'+ $stateParams.partidoId+'/invitar', $scope.selected , {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        console.log(resp.data);

     var alertPopup = $ionicPopup.alert({
             title: 'Invitado con Exito!',
             template: 'Segui invitando jugadores'
           });
           alertPopup.then(function(res) {
             $location.path('/app/invitar/'+$stateParams.partidoId);
           });

    }, function(err) {
      console.error('ERR', err);
 
      // err.status will contain the status code
    });
    };



                    $scope.model = "";
                    $scope.clickedValueModel = "";
                    $scope.removedValueModel = "";

                    $scope.getTestItems = function (query) {
                        if (query) {
                            return {
                                items: [
                                    {id: "1", name: query + "1", view: "view: " + query + "1"},
                                    {id: "2", name: query + "2", view: "view: " + query + "2"},
                                    {id: "3", name: query + "3", view: "view: " + query + "3"}]
                            };
                        }
                        return {items: []};
                    };

                    $scope.itemsClicked = function (callback) {
                        $scope.clickedValueModel = callback;
                    };
                    $scope.itemsRemoved = function (callback) {
                        $scope.removedValueModel = callback;
                    };


})


.controller('PerfilCtrl', function($rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, $location) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    $scope.user = $rootScope.user;

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.user = [];
    $http.get('http://sejuega.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });



  $scope.doSave = function() {
    $http.put('http://sejuega.herokuapp.com/usuario/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  };

})

;
