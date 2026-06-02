/*
  Warnings:

  - You are about to drop the `Departments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joiningDate` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Staff` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `employeeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `joiningDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Active',
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Departments`;

-- CreateTable
CREATE TABLE `Department` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_employeeId_key` ON `Staff`(`employeeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_email_key` ON `Staff`(`email`);
