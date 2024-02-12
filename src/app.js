import  express  from 'express';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { productManager } from './manager/productManager.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use("/api/views", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    try {
        const productosActualizados = await productManager.getProductList();
        socketServer.emit('productosActualizados', productosActualizados);
        console.log('A client has been connect');

        socket.on('agregado', async (nuevoProducto) => {
            try {
                const products = await productManager.addProduct(nuevoProducto);
                const productosActualizados = await productManager.getProductList();
                console.log(productosActualizados);

                socketServer.emit('productosActualizados', productosActualizados);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        });

        socket.on('eliminar', async (id) => {
            try {
                const products = await productManager.deleteProductById(id);
                const productosActualizados = await productManager.getProductList();
                console.log(productosActualizados);
            
                socketServer.emit('productosActualizados', productosActualizados);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
    })  

    socket.on('disconnect', () => {
        console.log('A client has been disconect');
    })}
            catch (error) {
                console.error ("Conexion error")
};
})