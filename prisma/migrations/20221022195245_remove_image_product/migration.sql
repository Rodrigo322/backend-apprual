/*
  Warnings:

  - You are about to drop the `ImageProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "img" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ImageProduct";
PRAGMA foreign_keys=on;
