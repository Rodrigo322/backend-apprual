import { Router } from "express";
import multer from "multer";

import { AuthBuyerController } from "./controller/AuthBuyerController";
import { AuthProducerController } from "./controller/AuthProducerController";
import { BuyerController } from "./controller/BuyerController";
import { ProducerController } from "./controller/ProducerController";
import { ProductController } from "./controller/ProductController";

import uploadConfig from "./config/multer";
import { authMiddleware } from "./middlewares/auth";
const upload = multer(uploadConfig);

const buyerController = new BuyerController();
const producerController = new ProducerController();
const productController = new ProductController();
const authBuyerController = new AuthBuyerController();

export const router = Router();

router.post("/authBuyer", authBuyerController.authenticate);
router.post("/authProducer", new AuthProducerController().authenticate);

router.post("/buyer", buyerController.store);

router.get("/buyers", authMiddleware, buyerController.index);
router.put("/buyer/:id", authMiddleware, buyerController.update);
router.delete("/buyer/:id", authMiddleware, buyerController.delete);

router.post("/producer", producerController.store);

router.get("/producers", authMiddleware, producerController.index);
router.delete("/producer/:id", authMiddleware, producerController.delete);

router.post(
  "/producer/:id/product",
  authMiddleware,
  upload.single("images"),
  productController.store
);
router.get("/products", authMiddleware, productController.index);
router.delete("/product/:id", authMiddleware, productController.delete);
router.delete("/products", authMiddleware, productController.deleteMany);
