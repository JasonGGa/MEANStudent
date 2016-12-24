(function () {
  //establecemos ngRoute como dependencia del modulo
  angular.module('meanstudent', ['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',    //vista
        controller: 'homeCtrl',                 //controlador
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  //agregamos la función creada al modulo
  angular
    .module('meanstudent')
    .config(['$routeProvider', config]);
})();
