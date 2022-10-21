import { Request, Response } from "express";

import { prisma } from "../database/client/prisma";

export class ProductController {
  async index(request: Request, response: Response) {
    const products = await prisma.product.findMany({});

    if (products.length <= 0) {
      return response.status(200).json({ message: "no registered product" });
    }

    return response.status(200).json(products);
  }
  async store(request: Request, response: Response) {
    const { name, amount, value } = request.body;
    const { id } = request.params;

    const isProducer = await prisma.producer.findUnique({
      where: {
        id,
      },
    });

    if (!isProducer) {
      return response.status(400).json({ error: "Producer not found." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        amount,
        value,
        producerId: id,
      },
    });

    return response.status(201).json(product);
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const isProduct = await prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!isProduct) {
        return response.status(400).json({ error: "Product not found." });
      }

      await prisma.product.delete({
        where: {
          id,
        },
      });

      return response.status(204).json({ ok: true });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
