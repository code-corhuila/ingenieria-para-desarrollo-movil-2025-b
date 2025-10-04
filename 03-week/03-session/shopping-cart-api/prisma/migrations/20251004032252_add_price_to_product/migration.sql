/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalCents` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `unitPriceCents` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `priceCents` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_userId_fkey`;

-- DropIndex
DROP INDEX `CartItem_userId_productId_key` ON `CartItem`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `userId`,
    ADD COLUMN `cartId` VARCHAR(191) NOT NULL,
    ADD COLUMN `subtotal` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `totalCents`,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `unitPriceCents`,
    ADD COLUMN `subtotal` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `unitPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `priceCents`,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_productId_key` ON `CartItem`(`cartId`, `productId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
