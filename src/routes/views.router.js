import { Router } from "express";

import { ProductManager } from "../productManager.js";

const productManager = new ProductManager();

const routerViews = Router();

routerViews.get("/", async (req, res) => {
  let products = await productManager.getProduct();

  res.render("home", {
    products: products,
  });
});

routerViews.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export { routerViews };