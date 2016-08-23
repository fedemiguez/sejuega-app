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
 
    $rootScope.userToken="";
            $location.path('/app/inicio');


    }


})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})





.controller('RegistrarseCtrl', function($rootScope, $scope, $timeout, $stateParams, ionicMaterialInk, $http, $location, $ionicPopup) {
    

        

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();


        $scope.user={};
        $scope.user.picture='';
        $scope.user.name='';
        $scope.user.email='';
        $scope.user.fecha='';
        $scope.user.provincia='';
        $scope.user.localidad='';
        $scope.user.barrio='';
        $scope.user.id =''; 
  
  
   $scope.doRegister = function() {
      $http.post('http://apisejuega.puntodesignweb.com.ar/usuario',$scope.user ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'Usuario Creado con exito',
             template: 'Ingresa ahora'
           });
           alertPopup.then(function(res) {
             $location.path('/app/usuarios');
           });
          
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });


    $scope.partido = [];

    $http.get('http://apisejuega.puntodesignweb.com.ar/partidos/'+$stateParams.partidoId, {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.partido = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });



    $scope.invitados = [];

    $http.get('http://apisejuega.puntodesignweb.com.ar/partidos/'+$stateParams.partidoId+'/invitados', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.invitados = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

           $scope.aceptados = function() {

              $location.path('/app/partidosaceptados/'+$stateParams.partidoId);
           };

            $scope.cancelados = function() {

              $location.path('/app/partidoscancelados/'+$stateParams.partidoId);
           };

 
             $scope.pendientes = function() {

              $location.path('/app/partidospendientes/'+$stateParams.partidoId);
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });

    $scope.partidos = [];

       $http.get('http://apisejuega.puntodesignweb.com.ar/mispartidos', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
         $scope.partidos = resp.data.data;
         console.log('Succes partidos', resp.data.data);


       }, function(err) {
         console.error('ERR', err);
         // err.status will contain the status code
       });

    $scope.doDelete = function(Id) {
    $http.delete('http://apisejuega.puntodesignweb.com.ar/partidos/'+ $stateParams.Id, $scope.partido).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/partidos');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };
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
      $http.post('http://apisejuega.puntodesignweb.com.ar/login',$scope.user).then(function(resp) {
         $rootScope.userToken = resp.data.token;
         $location.path('/app/perfil');

    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Email o contraseña invalido',
            });
           alertPopup.then(function(res) {
             $location.path('/app/inicio');
           });
      // err.status will contain the status code
    });
    };



})


.controller('partidoscanceladosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $location, $rootScope) {
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });



    $scope.cancelados = [];

    $http.get('http://apisejuega.puntodesignweb.com.ar/partidos/'+$stateParams.partidoId+'/cancelados', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.cancelados = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

 

           $scope.aceptados = function() {

              $location.path('/app/partidosaceptados/'+$stateParams.partidoId);
           };

            $scope.cancelados = function() {

              $location.path('/app/partidoscancelados/'+$stateParams.partidoId);
           };


             $scope.pendientes = function() {

              $location.path('/app/partidospendientes/'+$stateParams.partidoId);
           };

})





.controller('partidosaceptadosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $location, $rootScope) {
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });



    $scope.aceptados = [];

    $http.get('http://apisejuega.puntodesignweb.com.ar/partidos/'+$stateParams.partidoId+'/aceptados', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.aceptados = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

           $scope.aceptados = function() {

              $location.path('/app/partidosaceptados/'+$stateParams.partidoId);
           };

            $scope.cancelados = function() {

              $location.path('/app/partidoscancelados/'+$stateParams.partidoId);
           };
 
             $scope.pendientes = function() {

              $location.path('/app/partidospendientes/'+$stateParams.partidoId);
           };

})




.controller('invitacionespendientesCtrl', function($location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http) {
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
    $scope.partidos = [];

    $http.get('http://apisejuega.puntodesignweb.com.ar/misinvitaciones', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.partidos = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });

     $http.get('http://apisejuega.puntodesignweb.com.ar/misinvitacionescanceladas', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.partidos = resp.data.data;
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });

 $http.get('http://apisejuega.puntodesignweb.com.ar/misinvitacionesaceptadas', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.partidos = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });


})







.controller('CrearPartidoCtrl', function( $location, $rootScope, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $ionicPopup) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
    $scope.partidos={};
    $scope.partidos.nombre='';
    $scope.partidos.participantes='';
    $scope.partidos.fecha='';
    $scope.partidos.hora='';

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


    $scope.user = [];
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });
    


          $scope.doCreate = function() {

      $http.post('http://apisejuega.puntodesignweb.com.ar/partidos', $scope.partidos, {headers: {'auth-token': $rootScope.userToken}}  ).then(function(resp) {
        console.log(resp.data);

    $scope.ultimopartido = [];

       $http.get('http://apisejuega.puntodesignweb.com.ar/ultimopartido', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
         $scope.ultimopartido = resp.data.data;
         console.log('Succes partidos', resp.data.data);

          $location.path('/app/invitar/'+$scope.ultimopartido.id);


       }, function(err) {
         console.error('ERR', err);

         // err.status will contain the status code
       });

    }, function(err) {
      console.error('ERR', err);

         var alertPopup = $ionicPopup.alert({
             title: 'Problema al Invitar',
             template: 'Ya invitaste a este jugador'
           });
           alertPopup.then(function(res) {
             $location.path('/app/crearpartido');
           });  

    });
    };




})


.controller('invitarCtrl', function($scope, $http, $location, $rootScope, $stateParams, $ionicPopup) {

    console.log($rootScope.userToken);     
    
    $scope.user = [];



$scope.getUsuarioList = function(){
    $http.get('http://apisejuega.puntodesignweb.com.ar/jugadores/'+$scope.user.id).then(function(resp) {
        $scope.usuarioList = resp.data.data;
        console.log('usuariolist', resp.data.data);
    }, function(err) {
        console.error('ERR', err);
    }); 
}

$http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
  $scope.user = resp.data.data;
  $scope.getUsuarioList();
  console.log('userid', resp.data.data);
}, function(err) {
  console.error('ERR', err);
  $location.path('/app/entrar');
  // err.status will contain the status code
});


        $scope.selected = {
        id_u: []
        };




      $scope.doInvitar = function() {
      $http.post('http://apisejuega.puntodesignweb.com.ar/partidos/'+ $stateParams.partidoId+'/invitar', $scope.selected , {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        console.log(resp.data);

     var alertPopup = $ionicPopup.alert({
             title: 'Invitado con Exito!',
             template: 'Segui invitando jugadores'
           });
           alertPopup.then(function(res) {
             $location.path('/app/partidospendientes/'+$stateParams.partidoId);
           });

    }, function(err) {
      console.error('ERR', err);

         var alertPopup = $ionicPopup.alert({
             title: 'Problema al Invitar',
             template: 'Ya invitaste a este jugador'
           });
           alertPopup.then(function(res) {
             $location.path('/app/invitar/'+$stateParams.partidoId);
           });  
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


.controller('PerfilCtrl', function($rootScope, $scope, $stateParams, $timeout, $ionicPopup, $cordovaFileTransfer, ionicMaterialInk, ionicMaterialMotion, $http, $location, $cordovaImagePicker, $ionicPlatform) {
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

    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });





 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" style="color:black" ng-model="user.name"> <br/>  <input  style="color:black" type="text" ng-model="user.email">',
     title: 'Editar mi Perfil',
     scope: $scope,
     buttons: [
       {
         text: '<b>Guardar</b>',
         type: 'button-positive',
       },
     ]
   });
   myPopup.then(function(res) {
     $scope.doSave();
   });

  };

  $scope.doSave = function() {



    $http.put('http://apisejuega.puntodesignweb.com.ar/usuario/'+ $scope.user.id, $scope.user).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/perfil');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  };

 
$scope.getImage = function() {  

var options = {
   maximumImagesCount: 10,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);

       $cordovaFileTransfer.upload('http://apisejuega.puntodesignweb.com.ar/subirfoto', results[i], {headers: {'auth-token': $rootScope.userToken}})
      .then(function(result) {
        console.log;
      }, function(err) {
        // Error
      }, function (progress) {
        // constant progress updates
      });

      }
    }, function(error) {
      // error getting photos
    });

};






})

.controller('aceptarCtrl', function($rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, $location) {
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });



  $scope.aceptar = function() {
    $http.put('http://apisejuega.puntodesignweb.com.ar/aceptarinvitacion/'+ $stateParams.partidoId,  {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/invitacionespendientes');

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  };

})

.controller('cancelarCtrl', function($rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, $location) {
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
    $http.get('http://apisejuega.puntodesignweb.com.ar/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/inicio');
      // err.status will contain the status code
    });



  $scope.cancelar = function() {
    $http.put('http://apisejuega.puntodesignweb.com.ar/cancerlarinvitacion/'+ $stateParams.partidoId,  {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      console.log(resp.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  };

});
