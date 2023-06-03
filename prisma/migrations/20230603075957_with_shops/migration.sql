-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "shop" TEXT NOT NULL DEFAULT 'shop';

-- CreateTable
CREATE TABLE "Shops" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Shops_pkey" PRIMARY KEY ("id")
);
