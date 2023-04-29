-- CreateTable
CREATE TABLE "Product" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
