import { Router } from "express";

import { BuyerController } from "./controller/BuyerController";
import { ProducerController } from "./controller/ProducerController";

const buyerController = new BuyerController();
const producerController = new ProducerController();

export const router = Router();

router.post("/buyer", buyerController.store);
router.get("/buyers", buyerController.index);
router.put("/buyer/:id", buyerController.update);
router.delete("/buyer/:id", buyerController.delete);

router.post("/producer", producerController.store);
router.get("/producers", producerController.index);
