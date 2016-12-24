(function () {
  //agregamos el controlador al modulo
  angular
    .module('meanstudent')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'blogData'];
  function homeCtrl ($scope, blogData) {
    var vm = this;
    vm.pageHeader = {
      title: 'MEANStudent'
    };
    vm.message = "Buscando articulos";
    
    //Obtenemos la data a traves del servicio
    vm.getData = function () {
      blogData.articulos
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No hay articulos aún";
          vm.data = { articulos: data };
        })
        .error(function (e) {
          vm.message = "Algo fue mal, intentelo denuevo en un momento";
        });
    };
  }

})();
