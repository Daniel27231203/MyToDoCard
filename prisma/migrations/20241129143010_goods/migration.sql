/*
  Warnings:

  - Added the required column `raiting` to the `Goods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goods" ADD COLUMN     "raiting" DOUBLE PRECISION NOT NULL;
