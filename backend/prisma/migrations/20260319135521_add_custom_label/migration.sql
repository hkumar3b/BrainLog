/*
  Warnings:

  - You are about to drop the column `description` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "description",
ADD COLUMN     "customLabel" TEXT;
