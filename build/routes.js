"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const BuyerController_1 = require("./controller/BuyerController");
const ProducerController_1 = require("./controller/ProducerController");
const buyerController = new BuyerController_1.BuyerController();
const producerController = new ProducerController_1.ProducerController();
exports.router = (0, express_1.Router)();
exports.router.post("/buyer", buyerController.store);
exports.router.get("/buyers", buyerController.index);
exports.router.put("/buyer/:id", buyerController.update);
exports.router.delete("/buyer/:id", buyerController.delete);
exports.router.post("/producer", producerController.store);
exports.router.get("/producers", producerController.index);
//# sourceMappingURL=routes.js.map