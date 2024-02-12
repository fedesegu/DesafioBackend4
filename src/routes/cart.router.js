import { Router } from 'express';
import { cartManager } from '../manager/cartManager.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCartsList();

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "No carts found" });
        }

        res.status(200).json({ message: "Carts found", carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server internal error" });
    }
});

router.post("/", async (req, res) => {

    try {
        const cart = await cartManager.createCart();
        res.status(201).json({ message: "Cart created", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartManager.getCartById(+cid);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await cartManager.addProductCart(+cid, +pid);
        console.log(response);
        if (!response) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Product added to cart", cart: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;