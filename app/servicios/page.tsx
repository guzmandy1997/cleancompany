import Link from "next/link";
import prisma from "../../lib/prisma";
import { eliminarServicio } from "./actions";

export default async function ServiciosPage() {
  const servicios = await prisma.servicios.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <Link
          href="/servicios/nuevo"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          + Nuevo servicio
        </Link>
      </div>

      {servicios.length === 0 ? (
        <p className="text-gray-500">No hay servicios registrados todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-slate-800">
                  {servicio.nombre}
                </h2>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    servicio.activo
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {servicio.activo ? "Activo" : "Inactivo"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">{servicio.categoria}</p>

              {servicio.descripcion && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {servicio.descripcion}
                </p>
              )}

              <div className="flex gap-4 mb-4">
                {servicio.precioBase && (
                  <p className="text-sm text-gray-600">
                    Precio: <span className="font-semibold">${servicio.precioBase}</span>
                  </p>
                )}
                {servicio.duracionMin && (
                  <p className="text-sm text-gray-600">
                    Duración: <span className="font-semibold">{servicio.duracionMin} min</span>
                  </p>
                )}
              </div>

              {servicio.imagenUrl && (
                <p className="text-xs text-gray-400 mb-3 truncate">
                  Imagen: {servicio.imagenUrl}
                </p>
              )}

              <div className="flex gap-2">
                <Link
                  href={`/servicios/${servicio.id}/editar`}
                  className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-lg text-center text-sm hover:bg-slate-700 transition"
                >
                  Editar
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await eliminarServicio(servicio.id);
                  }}
                >
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}