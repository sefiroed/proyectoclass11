import express from 'express';
import Producto from '../productos';

/**
 * DATOS A MANIPULAR
 */


const router = express.Router();

/*Mostrando los productos*/
const miProducto = new Producto();
router.get('/listar', (req, res) => {
  const data = miProducto.leer();
  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados',
    });
  }
  res.json({
    data,
  });
});

/*Listando los productos por id*/
router.get('/listar/:id', (req, res) => {
    const id = req.params.id;
    const data = miProducto.leerPorId(id);
    if (!data) {
      res.json({
        msg: 'Error producto no encontrado',
      });
    }
    res.json({
      data,
    });
  });

  /* Creamos nuestra llamada vista */
router.get('/vista', (req, res) => {
  const dinamicData = {
    style:'table-dark',
    data: miProducto.leer(),
  }
  
  res.render('main', dinamicData);
});

/*Para agregar productos a nuestra api*/
router.post('/guardar', (req, res) => {
    const body = req.body;
    const producto = miProducto.guardar(body);
    res.json({
      producto,
    });
  });

/*Para actualizar productos por id*/  
router.put('/actualizar/:id', (req, res) => {
    const body = req.body; 
    const id = req.params.id;
    const producto = miProducto.actualizar(body,id);
    res.json({
      producto,
    });
  });  

/*Para borrar productos por id*/   
router.delete('/borrar/:id', (req, res) => {
    const id = req.params.id;
    const producto = miProducto.borrar(id);
    res.json({
      producto,
    });
  });   

/*Utilizando Multer para subir nuestro archivo index.html ubicado 
en la carpeta public*/  
const multer = require('multer');
const upload = multer({ dest: './uploads' });  

/*Creando la carpeta uploads para cargar archivos*/
const folderName = './uploads';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

/*Mediante la llamada post cargamos el archivo en la carpeta uploads*/  
const uploadMejorado = multer({ storage: storage });
router.post('/single', uploadMejorado.single('imagen'), (req, res) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });


export default router;















