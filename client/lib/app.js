angular.module('pets',['angular-meteor', 'ui.router', 'ngMaterial',]);

angular.module('pets').config(['$mdIconProvider', function($mdIconProvider){
  $mdIconProvider
  .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
  .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
  .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
  .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
  .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
  .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
  .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

}]);

angular.module("pets").controller('AppCtrl', function($scope) {
  $scope.imagePath = 'images/groupofpets.jpg';
});

angular.module("pets").controller('proCtrl', function($scope) {
});


angular.module("pets").controller('HeaderController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
});


angular.module("pets").controller('LeftNavCtrl', ['$scope', '$rootScope', '$meteor', '$state', 
  function($scope, $rootScope, $meteor, $state) {
    $scope.currentUser = $rootScope.currentUser;

  }
]);

angular.module("pets").controller("HomeCtrl", ['$meteor', '$state', 'currentUser',
  function ($meteor, $state, currentUser) {
    //user = $meteor.requireUser();
    this.currentUser = currentUser;
    var userFamilyId = currentUser.profile.family;
    if(userFamilyId != undefined){
      this.family = $meteor.object(Families, userFamilyId, false);;
    }else{
      this.family = false;
    }
  }
]);


angular.module("pets").directive("rating", function() {
  var directive = { };
  directive.restrict = 'AE';

  directive.scope = {
    score: '=score',
    max: '=max'
  };

  directive.template = '<div class="rating">' +
                       '  <a ng-repeat="star in stars" ng-click="setRating($index)"> ' +
                       '    <md-icon md-svg-src="/images/{{starIcon(star, $index)}}.svg" aria-label="star border "></md-icon> ' +
                       '  </a> ' +
                       '</div>';

  directive.link = function(scope, elements, attr) {
    scope.updateStars = function() {
      var idx = 0;
      scope.stars = [ ];
      for (idx = 0; idx < scope.max; idx += 1) {
        scope.stars.push({
          full: scope.score !== null && scope.score !== undefined && scope.score > idx
        });
      }
    };
    scope.starIcon = function(star, idx) {
      var starIcon = 'ic_star_border_black_24px';
      if (star.full) {
        starIcon = 'ic_star_black_24px';
      }
      return starIcon;
    };
    scope.$watch('score', function(newValue, oldValue) {
      scope.updateStars();
    });
    scope.setRating = function(idx) {
      scope.score = idx + 1;
    };
  };

  return directive;
});


angular.module("pets").directive("distance",['$meteor', function($meteor) {
  var directive = { };
  directive.restrict = 'AE';

  directive.scope = {
    origin: '=origin',
    destination: '=destination'
  };

  directive.template = '<span class="distance">' +
                       '  {{distance}} ' +
                       '</span>';

  directive.link = function(scope, elements, attr) {
    scope.$watch('origin', function(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        $meteor.call('calcDistance', scope.origin, scope.destination).then(function(distance){
          scope.distance = distance.text;
        },function(error){
          scope.distance = "Provide valid zip codes to view distance";
        });
      }
    });
    
  };

  return directive;
}]);