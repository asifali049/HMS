/*
  Warnings:

  - You are about to drop the column `description` on the `Hospital` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hospital` DROP COLUMN `description`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `logo` VARCHAR(191) NULL,
    ADD COLUMN `pincode` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL;
