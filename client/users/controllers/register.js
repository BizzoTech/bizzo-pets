angular.module("pets").controller("RegisterCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
 
    vm.credentials = {
      email: '',
      password: '',
      profile : {
        name : '',
        age: '',
        profilePhoto :'',
        about:'',
        zipCode : ''
      }
    };
 
    vm.error = '';
 
    vm.register = function () {
      vm.credentials.profile.email = vm.credentials.email;
      $meteor.createUser(vm.credentials).then(
        function () {
          $state.go('home');
        },
        function (err) {
          vm.error = 'Registration error - ' + err;
        }
      );
    };
  }
]);