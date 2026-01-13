-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
