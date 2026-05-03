export const dynamic = "force-dynamic";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { eliminarCliente } from "./actions";

export default async function ClientesPage() {
  const clientes = await prisma.cliente.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link
          href="/clientes/nuevo"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          + Nuevo cliente
        </Link>
      </div>

      {clientes.length === 0 ? (
        <p className="text-gray-500">No hay clientes registrados todavía.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {cliente.telefono || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {cliente.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {cliente.direccion || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/clientes/${cliente.id}/editar`}
                        className="bg-slate-800 text-white px-3 py-1 rounded text-sm hover:bg-slate-700 transition"
                      >
                        Editar
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await eliminarCliente(cliente.id);
                        }}
                        className="inline"
                      >
                        <button
                          type="submit"
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                        >
                          Eliminar
                        </button>
                      </form>
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