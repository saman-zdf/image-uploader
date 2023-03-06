/*
  Warnings:

  - You are about to drop the column `image` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image",
ADD COLUMN     "imageURL" VARCHAR(255) NOT NULL;
