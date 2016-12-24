var mongoose = require('mongoose');
var Art = mongoose.model('Articulo');

//definimos una función que utilizaremos en todos los servicios para enviar una el status y un objeto JSON
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Metodo GET para obtener todos los articulos
module.exports.articulosRead = function(req, res) {
   Art
      .find()
      .exec(function(err, articulos){
         if (articulos.length == 0) {     //No existen articulos aún
            sendJSONresponse(res, 204, {"message":"No se encontraron articulos"});
            return;
         } else if(err) {
            sendJSONresponse(res, 404, err);
            return;
         }
         //todo se ejecuta correctamente
         sendJSONresponse(res, 200, articulos);
      });
};

//Metodo GET para encontrar un articulo con su id
module.exports.articulosReadOne = function(req, res) {
  if (req.params && req.params.artid) {
    Art
      .findById(req.params.artid)
      .exec(function(err, articulo) {
        if (!articulo) {      //si no se envio ningun id
          sendJSONresponse(res, 404, {
            "message": "artid no encontrado"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 200, articulo);
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No existen parametros necesarios"
    });
  }
};

//Metodo POST para crear un nuevo articulo
module.exports.articulosCreate = function(req, res) {
  console.log(req.body);
  Art.create({
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    autor: req.body.autor
  }, function(err, articulo) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, articulo);
    }
  });
};

//Metodo PUT para actualizar un articulo con su id
module.exports.articulosUpdateOne = function(req, res) {
   if (req.params.artid) {
      Art
         .findById(req.params.artid)
         .select('-comentarios')    //seleccionamos todo menos los comentarios
         .exec(function(err, articulo) {
            if (!articulo) {
               sendJSONresponse(res, 404, {
                  "message": "No se encontro articulo con ese id"
               });
               return;
            } else if (err) {
               sendJSONresponse(res, 400, err);
               return;
            }
            articulo.titulo: req.body.titulo;
            articulo.cuerpo: req.body.cuerpo;
            articulo.autor: req.body.autor;
            articulo.save(function(err, articulo) {
               if (err) {
                  sendJSONresponse(res, 404, err);
               } else {
                  sendJSONresponse(res, 200, articulo);
               }
            });
         });
   }else {
      sendJSONresponse(res, 404, {
         "message": "No existen parametros necesarios"
      });
      return;
   }
};

//Metodo DELETE para eliminar un articulo con su id
module.exports.articulosDeleteOne = function(req, res) {
   if (req.params.artid) {
      Art
         .findByIdAndRemove(req.params.artid)
         .exec(function(err, articulo) {
            if (err) {
               sendJSONresponse(res, 404, err);
               return;
            }
            sendJSONresponse(res, 204, null);
         });
   } else {
      sendJSONresponse(res, 404, {
         "message": "No existen parametros necesarios"
      });
   }
};
