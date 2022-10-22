"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const prisma_1 = require("../database/client/prisma");
class ProductController {
    async index(request, response) {
        const products = await prisma_1.prisma.product.findMany();
        if (products.length <= 0) {
            return response.status(200).json({ message: "no registered product" });
        }
        return response.status(200).json(products);
    }
    async store(request, response) {
        const { name, amount, value } = request.body;
        const { id } = request.params;
        const requestImage = request.file;
        const isProducer = await prisma_1.prisma.producer.findUnique({
            where: {
                id,
            },
        });
        if (!isProducer) {
            return response.status(400).json({ error: "Producer not found." });
        }
        // const images = requestImages.map((image) => {
        //   return {
        //     path: `https://api-apprural-v1.herokuapp.com/images/${image.filename}`,
        //   };
        // });
        const product = await prisma_1.prisma.product.create({
            data: {
                name,
                amount: Number(amount),
                value: Number(value),
                producerId: id,
                //img: `https://api-apprural-v1.herokuapp.com/images/${requestImage.filename}`,
            },
        });
        return response.status(201).json(product);
    }
    async delete(request, response) {
        try {
            const { id } = request.params;
            const isProduct = await prisma_1.prisma.product.findUnique({
                where: {
                    id,
                },
            });
            if (!isProduct) {
                return response.status(400).json({ error: "Product not found." });
            }
            await prisma_1.prisma.product.delete({
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
    async deleteMany(req, res) {
        await prisma_1.prisma.product.deleteMany();
        return res.status(204).json({ ok: true });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map