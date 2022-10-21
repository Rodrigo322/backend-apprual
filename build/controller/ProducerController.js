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
        const isEmail = await prisma_1.prisma.producer.findUnique({
            where: {
                email,
            },
        });
        if (isEmail) {
            return response
                .status(400)
                .json({ error: "there is already a producer with this email." });
        }
        const isCPF = await prisma_1.prisma.producer.findUnique({
            where: {
                cpf,
            },
        });
        if (isCPF) {
            return response
                .status(400)
                .json({ error: "there is already a producer with this CPF." });
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
    async delete(request, response) {
        try {
            const { id } = request.params;
            const isProducer = await prisma_1.prisma.producer.findUnique({
                where: {
                    id,
                },
            });
            if (!isProducer) {
                return response.status(400).json({ error: "Producer not found." });
            }
            await prisma_1.prisma.producer.delete({
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
exports.ProducerController = ProducerController;
//# sourceMappingURL=ProducerController.js.map