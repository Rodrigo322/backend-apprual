"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBuyerController = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../database/client/prisma");
class AuthBuyerController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const buyer = await prisma_1.prisma.buyer.findUnique({ where: { email } });
        if (!buyer) {
            return res.json({ error: "user not found" });
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, buyer.password);
        if (!isPasswordValid) {
            return res.json({ error: "password invalid" });
        }
        const token = (0, jsonwebtoken_1.sign)({ id: buyer.id }, "çlknçkljashnçfsddkljaslçkjsd", {
            expiresIn: "1d",
        });
        const { id } = buyer;
        return res.json({ user: { id, email }, token });
    }
}
exports.AuthBuyerController = AuthBuyerController;
//# sourceMappingURL=AuthBuyerController.js.map