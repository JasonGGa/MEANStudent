var express = require('express');
var router = express.Router();

//indicamos el directorio que contiene los controladores
var ctrlArticulos = require('../controllers/articulos');
var ctrlComentarios = require('../controllers/comentarios');

//definimos las rutas para los servicios CRUD de articulo
router.get('/articulos', ctrlArticulos.articulosRead);
router.post('/articulos', ctrlArticulos.articulosCreate);
router.get('/articulos/:artid', ctrlArticulos.articulosReadOne);
router.put('/articulos/:artid', ctrlArticulos.articulosUpdateOne);
router.delete('/articulos/:artid', ctrlArticulos.articulosDeleteOne);

//definimos las rutas para los servicios CRUD de los comentarios
router.post('/articulos/:artid/comen', ctrlComentarios.comenCreate);
router.get('/articulos/:artid/comen/:comenid', ctrlComentarios.comenRead);
router.put('/articulos/:artid/comen/:comenid', ctrlComentarios.comenUpdate);
router.delete('/articulos/:artid/comen/:comenid', ctrlComentarios.comenDelete);

//exportamos las rutas
module.exports = router;
