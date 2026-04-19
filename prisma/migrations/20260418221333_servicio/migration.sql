/*
  Warnings:

  - You are about to drop the `Obra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Obra";

-- CreateTable
CREATE TABLE "Servicios" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagenUrl" TEXT,
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadaEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id")
);
