import express from 'express';
import path from 'path';
import routerProductos from './routes/productosRoute';
import handlebars from 'express-handlebars';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);
/*Levantando el server*/
server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

/*Con los siguientes metodos podemos pasar el body via postman*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Invocamos a nuestra archivo index.html con una llamada al localhost:8080*/
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

/*Invocamos los path para utilizarlos en el motor de plantillas */
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');

/* Trabajamos con el motor de plantillas handlebars */
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);

/*Invocamos a nuestra carpeta ruta para realizar las llamadas*/
app.use('/api/productos', routerProductos);
