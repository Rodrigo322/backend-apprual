import { Router } from "express";
import multer from "multer";

import { AuthBuyerController } from "./controller/AuthBuyerController";
import { BuyerController } from "./controller/BuyerController";
import { ProducerController } from "./controller/ProducerController";
import { ProductController } from "./controller/ProductController";

import uploadConfig from "./config/multer";
const upload = multer(uploadConfig);

const buyerController = new BuyerController();
const producerController = new ProducerController();
const productController = new ProductController();
const authBuyerController = new AuthBuyerController();

export const router = Router();

router.post("/authBuyer", authBuyerController.authenticate);

router.post("/buyer", buyerController.store);
router.get("/buyers", buyerController.index);
router.put("/buyer/:id", buyerController.update);
router.delete("/buyer/:id", buyerController.delete);

router.post("/producer", producerController.store);
router.get("/producers", producerController.index);
router.delete("/producer/:id", producerController.delete);

router.post(
  "/producer/:id/product",
  upload.array("images"),
  productController.store
);
router.get("/products", productController.index);
router.delete("/product/:id", productController.delete);
router.delete("/products", productController.deleteMany);
