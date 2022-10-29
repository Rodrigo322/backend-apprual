"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProducerController = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../database/client/prisma");
class AuthProducerController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const producer = await prisma_1.prisma.producer.findUnique({ where: { email } });
        if (!producer) {
            return res.json({ error: "user not found" });
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, producer.password);
        if (!isPasswordValid) {
            return res.json({ error: "password invalid" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: producer.id }, "secret", {
            expiresIn: "1d",
        });
        const { id } = producer;
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthProducerController = AuthProducerController;
//# sourceMappingURL=AuthProducerController.js.map