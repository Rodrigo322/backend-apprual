import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { prisma } from "../database/client/prisma";

export class AuthProducerController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const producer = await prisma.producer.findUnique({ where: { email } });

    if (!producer) {
      return res.json({ error: "user not found" });
    }

    const isPasswordValid = await compare(password, producer.password);

    if (!isPasswordValid) {
      return res.json({ error: "password invalid" });
    }

    const token = sign({ id: producer.id }, "secret", {
      expiresIn: "1d",
    });

    const { id } = producer;

    return res.json({ user: { id, email }, token });
  }
}
