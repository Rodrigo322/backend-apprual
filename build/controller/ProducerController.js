"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../database/client/prisma");
class ProducerController {
    async index(request, response) {
        const producers = await prisma_1.prisma.producer.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
            },
        });
        if (producers.length <= 0) {
            return response.status(200).json({ message: "no registered producer" });
        }
        return response.status(200).json(producers);
    }
    async store(request, response) {
        const { name, email, cpf, password } = request.body;
        const isProducer = await prisma_1.prisma.producer.findUnique({
            where: {
                email,
            },
        });
        if (isProducer) {
            return response
                .status(400)
                .json({ error: "there is already a producer with this email." });
        }
        const password_hash = await (0, bcryptjs_1.hash)(password, 8);
        const producer = await prisma_1.prisma.producer.create({
            data: {
                name,
                email,
                cpf,
                password: password_hash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
            },
        });
        return response.status(201).json(producer);
    }
}
exports.ProducerController = ProducerController;
//# sourceMappingURL=ProducerController.js.map