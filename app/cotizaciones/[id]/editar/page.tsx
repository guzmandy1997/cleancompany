import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import { actualizarCotizacion } from "../../actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarCotizacionPage({ params }: PageProps) {
  const { id } = await params;
  const cotizacionId = Number(id);

  if (Number.isNaN(cotizacionId)) {
    notFound();
  }

  const [cotizacion, clientes, servicios] = await Promise.all([
    prisma.cotizaciones.findUnique({
      where: { id: cotizacionId },
    }),
    prisma.cliente.findMany({
      orderBy: { nombre: "asc" },
    }),
    prisma.servicios.findMany({
      orderBy: { nombre: "asc" },
    }),
  ]);

  if (!cotizacion) {
    notFound();
  }

  const actualizarCotizacionConId = actualizarCotizacion.bind(null, cotizacion.id);

  const fechaProgramada = cotizacion.fechaProgramada
    ? new Date(cotizacion.fechaProgramada).toISOString().slice(0, 16)
    : "";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Editar cotización
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Actualiza la información de esta cotización.
            </p>
          </div>

          <Link
            href="/cotizaciones"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Volver a cotizaciones
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <form action={actualizarCotizacionConId} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="clienteId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Cliente
                </label>
                <select
                  id="clienteId"
                  name="clienteId"
                  defaultValue={cotizacion.clienteId}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                >
                  <option value="">Selecciona un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="servicioId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Servicio
                </label>
                <select
                  id="servicioId"
                  name="servicioId"
                  defaultValue={cotizacion.servicioId}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  defaultValue={cotizacion.estado}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobada">Aprobada</option>
                  <option value="rechazada">Rechazada</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="fechaProgramada"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Fecha programada
                </label>
                <input
                  id="fechaProgramada"
                  name="fechaProgramada"
                  type="datetime-local"
                  defaultValue={fechaProgramada}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="direccionServicio"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Dirección del servicio
              </label>
              <input
                id="direccionServicio"
                name="direccionServicio"
                type="text"
                defaultValue={cotizacion.direccionServicio ?? ""}
                placeholder="Ej: Calle 123 #45-67, Bogotá"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="comentarios"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Comentarios
              </label>
              <textarea
                id="comentarios"
                name="comentarios"
                rows={5}
                defaultValue={cotizacion.comentarios ?? ""}
                placeholder="Agrega detalles importantes de la cotización"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/cotizaciones"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}