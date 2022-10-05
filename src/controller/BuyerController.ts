import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";

import { prisma } from "../database/client/prisma";

export class BuyerController {
  async index(request: Request, response: Response) {
    try {
      const buyers = await prisma.buyer.findMany({
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
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const { email, name, password } = request.body;

      const isBuyer = await prisma.buyer.findUnique({
        where: {
          email,
        },
      });

      if (isBuyer) {
        return response
          .status(400)
          .json({ error: "there is already a user with this email." });
      }

      const password_hash = await hash(password, 8);

      const buyer = await prisma.buyer.create({
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
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, password, cpf, birthDate, phone } = request.body;

      const isBuyer = await prisma.buyer.findUnique({
        where: {
          id,
        },
      });

      if (!isBuyer) {
        return response.status(400).json({ error: "user not found." });
      }

      const isPasswordValid = await compare(password, isBuyer.password);

      if (!isPasswordValid) {
        return response.status(401).json({ error: "password invalid" });
      }

      const buyerUpdated = await prisma.buyer.update({
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
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const isBuyer = await prisma.buyer.findUnique({
        where: {
          id,
        },
      });

      if (!isBuyer) {
        return response.status(400).json({ error: "user not found." });
      }

      await prisma.buyer.delete({
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
