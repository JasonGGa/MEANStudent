(function() {
  //agregamos el servicio al modelo
  angular
    .module('meanstudent')
    .service('blogData', blogData);
  
  //establecemos la función que injectara la data
  blogData.$inject = ['$http'];
  function blogData ($http) {
    var articulos = function () {
      //ejecutamos la consulta a la API y la devolvemos
      return $http.get('/api/articulos/');
    };

    return {
      articulos:articulos
    };
  }

})();
