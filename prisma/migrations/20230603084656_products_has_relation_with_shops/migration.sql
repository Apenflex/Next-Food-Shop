/*
  Warnings:

  - You are about to drop the column `shop` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `shopId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "shop",
DROP COLUMN "userId",
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
