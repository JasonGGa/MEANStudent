var mongoose = require('mongoose');

//establecemos el subesquema para los comentarios
var comenSchema = new mongoose.Schema({
   usuario: {type: String, required: true},
   comentario: {type: String, required: true},
   fecha: {type: Date, "default":Date.now}
});

//establecemos el esquema para el articulo
var articuloSchema = new mongoose.Schema({
   titulo: {type: String, required: true},
   cuerpo: {type: String, required: true},
   autor: {type: String, required: true},
   fecha: {type: Date, "default":Date.now},
   comentarios: [comenSchema]
});

mongoose.model('Articulo', articuloSchema);
