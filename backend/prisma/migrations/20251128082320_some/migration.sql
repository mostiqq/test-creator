/*
  Warnings:

  - Added the required column `score` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "score" INTEGER NOT NULL;
