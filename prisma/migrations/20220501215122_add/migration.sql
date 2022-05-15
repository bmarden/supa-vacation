/*
  Warnings:

  - Added the required column `ownerId` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN "ownerId" TEXT;

/* UpdateDate - Add efault owner value to existing homes */
UPDATE "Home" SET "ownerId" = 'auth0|626de8637140330070b363aa' WHERE "ownerId" IS NULL;

/* AlterColumn - Change ownerId to a required column */
ALTER TABLE "Home" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
