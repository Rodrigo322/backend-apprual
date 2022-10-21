import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { prisma } from "../database/client/prisma";

export class AuthBuyerController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const buyer = await prisma.buyer.findUnique({ where: { email } });

    if (!buyer) {
      return res.json({ error: "user not found" });
    }

    const isPasswordValid = await compare(password, buyer.password);

    if (!isPasswordValid) {
      return res.json({ error: "password invalid" });
    }

    const token = sign({ id: buyer.id }, "çlknçkljashnçfsddkljaslçkjsd", {
      expiresIn: "1d",
    });

    const { id } = buyer;

    return res.json({ user: { id, email }, token });
  }
}
