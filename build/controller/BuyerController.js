"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../database/client/prisma");
class BuyerController {
    async index(request, response) {
        try {
            const buyers = await prisma_1.prisma.buyer.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    cpf: true,
                    birthDate: true,
                    Address: true,
                },
            });
            if (buyers.length <= 0) {
                return response.status(200).json({ message: "no registered buyer" });
            }
            return response.status(200).json(buyers);
        }
        catch (error) {
            return response.status(400).json({ error });
        }
    }
    async store(request, response) {
        try {
            const { email, name, password } = request.body;
            const isBuyer = await prisma_1.prisma.buyer.findUnique({
                where: {
                    email,
                },
            });
            if (isBuyer) {
                return response
                    .status(400)
                    .json({ error: "there is already a user with this email." });
            }
            const password_hash = await (0, bcryptjs_1.hash)(password, 8);
            const buyer = await prisma_1.prisma.buyer.create({
                data: {
                    email,
                    name,
                    password: password_hash,
                },
                select: {
                    name: true,
                    email: true,
                },
            });
            return response.status(201).json(buyer);
        }
        catch (error) {
            return response.status(400).json(error);
        }
    }
    async update(request, response) {
        try {
            const { id } = request.params;
            const { name, password, cpf, birthDate, phone } = request.body;
            const isBuyer = await prisma_1.prisma.buyer.findUnique({
                where: {
                    id,
                },
            });
            if (!isBuyer) {
                return response.status(400).json({ error: "user not found." });
            }
            const isPasswordValid = await (0, bcryptjs_1.compare)(password, isBuyer.password);
            if (!isPasswordValid) {
                return response.status(401).json({ error: "password invalid" });
            }
            const buyerUpdated = await prisma_1.prisma.buyer.update({
                where: {
                    id,
                },
                data: {
                    name,
                    cpf,
                    birthDate,
                    phone,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    birthDate: true,
                    phone: true,
                    cpf: true,
                },
            });
            return response.status(200).json(buyerUpdated);
        }
        catch (error) {
            return response.status(400).json(error);
        }
    }
    async delete(request, response) {
        try {
            const { id } = request.params;
            const isBuyer = await prisma_1.prisma.buyer.findUnique({
                where: {
                    id,
                },
            });
            if (!isBuyer) {
                return response.status(400).json({ error: "user not found." });
            }
            await prisma_1.prisma.buyer.delete({
                where: {
                    id,
                },
            });
            return response.status(204).json({ ok: true });
        }
        catch (error) {
            return response.status(400).json(error);
        }
    }
}
exports.BuyerController = BuyerController;
//# sourceMappingURL=BuyerController.js.map