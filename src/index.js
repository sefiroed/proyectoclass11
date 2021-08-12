import express from 'express';
import path from 'path';
import routerProductos from './routes/productosRoute';

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

/* Trabajando con el motor de plantillas pug */
app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


/*Invocamos a nuestra carpeta ruta para realizar las llamadas*/
app.use('/api/productos', routerProductos);
