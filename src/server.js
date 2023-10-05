import express from "express";
import { routerProduct } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { routerViews } from "./routes/views.router.js";
import { ProductManager } from "../src/productManager.js";

const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", routerProduct);

app.use("/api/carts", routerCart);

app.use("/api/views", routerViews);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});



 