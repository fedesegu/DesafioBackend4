import { Router } from "express";
import {productManager} from '../manager/productManager'

const router = Router();

router.get("/home", async (req, res) => {
    try {
        const products = await productManager.getProductList();
    res.render("home", { products });
    } catch {
        error
    }
});

router.get("/changeproducts", async (req, res) => {
    try {
    res.render("changeproducts");
    } catch {
        error
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
    res.render("realTimeProducts");
    } catch {
        error
    }
});


export default router;