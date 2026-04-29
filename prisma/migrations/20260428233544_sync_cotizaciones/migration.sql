-- CreateTable
CREATE TABLE "Cotizaciones" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "fechaCotizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaProgramada" TIMESTAMP(3),
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "direccionServicio" TEXT,
    "comentarios" TEXT,

    CONSTRAINT "Cotizaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cotizaciones" ADD CONSTRAINT "Cotizaciones_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizaciones" ADD CONSTRAINT "Cotizaciones_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
