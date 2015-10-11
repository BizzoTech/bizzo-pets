angular.module('pets').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'index.ng.html',
        controller: 'HomeCtrl',
        controllerAs: 'h',
        resolve: {
          currentUser: ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('addPet', {
        url: '/addpet',
        templateUrl: 'client/pets/views/add.ng.html',
        controller: 'AddPetCtrl',
        controllerAs: 'ptc',
        resolve: {
          currentUser: ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('petProfile', {
        url: '/pet/:petId',
        templateUrl: 'client/pets/views/profile.ng.html',
        controller: 'PetProfileCtrl',
        controllerAs: 'pvc',
        resolve: {
          currentUser: ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('image', {
        url: '/image/:petId/:imageId',
        templateUrl: 'client/pets/views/image.ng.html',
        controller: 'PetImageCtrl',
        controllerAs: 'pic',
        
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/users/views/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'client/users/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc'
      })
      .state('profile',{
        url: '/profile',
        templateUrl: 'client/users/views/profile.ng.html',
        controller: 'ProfileCtrl',
        controllerAs: 'pc'
      })
      .state('resetpw', {
        url: '/resetpw',
        templateUrl: 'client/users/views/reset-password.ng.html',
        controller: 'ResetCtrl',
        controllerAs: 'rpc'
      })
      .state('logout', {
        url: '/logout',
        resolve: {
          "logout": ['$meteor', '$state', function($meteor, $state) {
            return $meteor.logout().then(function(){
              $state.go('home');
            }, function(err){
              console.log('logout error - ', err);
            });
          }]
        }
      })
      .state('createFamily', {
        url: '/createfamily',
        templateUrl: 'client/families/views/create.ng.html',
        controller: 'FamilyCreateCtrl',
        controllerAs: 'fc'
      })
      .state('family', {
        url: '/family',
        templateUrl: 'client/families/views/view.ng.html',
        controller: 'FamilyViewCtrl',
        controllerAs: 'fv'
      });

      
      

    $urlRouterProvider.otherwise("/");
  }]);

angular.module('pets').run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $meteor.requireUser() promise is rejected
    // and redirect the user back to the login page
    if (error === "AUTH_REQUIRED") {
        // It is better to use $state instead of $location. See Issue #283.
        $state.go('login');
    }
  });
}]);