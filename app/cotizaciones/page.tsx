export const dynamic = "force-dynamic";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { eliminarCotizacion } from "./actions";
import DeleteCotizacionButton from "./DeleteCotizacionButton";

export default async function CotizacionesPage() {
  const cotizaciones = await prisma.cotizaciones.findMany({
    orderBy: { id: "desc" },
    include: {
      cliente: true,
      servicio: true,
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cotizaciones</h1>
        <Link
          href="/cotizaciones/nuevo"
          className="rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          + Nueva cotización
        </Link>
      </div>

      {cotizaciones.length === 0 ? (
        <p className="text-gray-500">No hay cotizaciones registradas todavía.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Fecha programada
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {cotizaciones.map((cotizacion) => (
                <tr key={cotizacion.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {cotizacion.cliente.nombre}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {cotizacion.servicio.nombre}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        cotizacion.estado === "aceptada"
                          ? "bg-green-100 text-green-700"
                          : cotizacion.estado === "cancelada"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cotizacion.estado}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {cotizacion.fechaProgramada
                      ? new Date(cotizacion.fechaProgramada).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/cotizaciones/${cotizacion.id}/editar`}
                        className="rounded bg-slate-800 px-3 py-1 text-sm text-white transition hover:bg-slate-700"
                      >
                        Editar
                      </Link>

                      <DeleteCotizacionButton
                        action={async () => {
                          "use server";
                          await eliminarCotizacion(cotizacion.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}