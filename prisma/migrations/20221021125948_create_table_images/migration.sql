-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImageProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ImageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImageProduct" ("id", "path", "productId") SELECT "id", "path", "productId" FROM "ImageProduct";
DROP TABLE "ImageProduct";
ALTER TABLE "new_ImageProduct" RENAME TO "ImageProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
