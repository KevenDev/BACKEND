-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fk_id_setor" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefone" (
    "id" SERIAL NOT NULL,
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_setor" INTEGER NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_fk_id_setor_key" ON "user"("fk_id_setor");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_fk_id_setor_fkey" FOREIGN KEY ("fk_id_setor") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_fk_id_setor_fkey" FOREIGN KEY ("fk_id_setor") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
