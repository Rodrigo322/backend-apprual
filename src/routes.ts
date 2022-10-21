import { Router } from "express";

import { BuyerController } from "./controller/BuyerController";
import { ProducerController } from "./controller/ProducerController";
import { ProductController } from "./controller/ProductController";

const buyerController = new BuyerController();
const producerController = new ProducerController();
const productController = new ProductController();

export const router = Router();

router.post("/buyer", buyerController.store);
router.get("/buyers", buyerController.index);
router.put("/buyer/:id", buyerController.update);
router.delete("/buyer/:id", buyerController.delete);

router.post("/producer", producerController.store);
router.get("/producers", producerController.index);
router.delete("/producer/:id", producerController.delete);

router.post("/producer/:id/product", productController.store);
router.get("/products", productController.index);
router.delete("/product/:id", productController.delete);
