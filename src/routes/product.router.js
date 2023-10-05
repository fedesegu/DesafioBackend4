import { Router } from "express";
import {manager} from "../productManager.js";
const router = Router()

router.get("/", async (req, res) => {
    try {
      const products = await manager.getProducts(req.query);
      res.status(200).json({ message: "Products Found", products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get("/:idProduct", async (req, res) => {
    console.log(req.params)
    const { idProduct } = req.params;
    try {
      const product = await manager.getProductById(+idProduct);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product found", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category} = req.body;
    if (!title || !description || !price || !stock || !code || !status || !category) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    try {
      const response = await manager.addProduct(req.body);
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.delete("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      const response = await manager.deleteProductById(+idProduct);
      if (!response) {
        return res
          .status(404)
          .json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.put("/products/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      const response = await manager.updateProduct(+idProduct, req.body);
      if (!response) {
        return res
          .status(404)
          .json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router