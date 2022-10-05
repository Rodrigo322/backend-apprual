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

    const isProducer = await prisma.producer.findUnique({
      where: {
        email,
      },
    });

    if (isProducer) {
      return response
        .status(400)
        .json({ error: "there is already a producer with this email." });
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
}
