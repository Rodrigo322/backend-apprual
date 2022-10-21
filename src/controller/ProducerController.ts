import { hash } from "bcryptjs";
import { Request, Response } from "express";

import { prisma } from "../database/client/prisma";

export class ProducerController {
  async index(request: Request, response: Response) {
    const producers = await prisma.producer.findMany({
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
  async store(request: Request, response: Response) {
    const { name, email, cpf, password } = request.body;

    const isEmail = await prisma.producer.findUnique({
      where: {
        email,
      },
    });

    if (isEmail) {
      return response
        .status(400)
        .json({ error: "there is already a producer with this email." });
    }

    const isCPF = await prisma.producer.findUnique({
      where: {
        cpf,
      },
    });

    if (isCPF) {
      return response
        .status(400)
        .json({ error: "there is already a producer with this CPF." });
    }

    const password_hash = await hash(password, 8);

    const producer = await prisma.producer.create({
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

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const isProducer = await prisma.producer.findUnique({
        where: {
          id,
        },
      });

      if (!isProducer) {
        return response.status(400).json({ error: "Producer not found." });
      }

      await prisma.producer.delete({
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
