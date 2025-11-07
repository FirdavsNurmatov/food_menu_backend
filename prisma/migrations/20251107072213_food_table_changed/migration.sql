/*
  Warnings:

  - You are about to drop the column `category` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Food` ADD COLUMN `category` ENUM('FOOD', 'DRINK') NOT NULL DEFAULT 'FOOD';

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `category`;
