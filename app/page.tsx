export const dynamic = "force-dynamic";
import prisma from "../lib/prisma";

export default async function DashboardPage() {
  const totalServicios = await prisma.servicios.count();
  const serviciosActivos = await prisma.servicios.count({
    where: { activo: true },
  });

  const totalClientes = await prisma.cliente.count();

  const totalCotizaciones = await prisma.cotizaciones.count();
  const cotizacionesPendientes = await prisma.cotizaciones.count({
    where: { estado: "pendiente" },
  });

  const cotizacionesAceptadas = await prisma.cotizaciones.count({
    where: { estado: "aceptada" },
  });

  const cotizacionesCanceladas = await prisma.cotizaciones.count({
    where: { estado: "cancelada" },
  });

  const totalIngresos = await prisma.cotizaciones.findMany({
    where: { estado: "aceptada" },
    include: { servicio: true },
  });

  const ingresosTotales = totalIngresos.reduce((acc, cot) => {
    return acc + (cot.servicio.precioBase || 0);
  }, 0);

  const ultimasCotizaciones = await prisma.cotizaciones.findMany({
    take: 5,
    orderBy: { fechaCotizacion: "desc" },
    include: {
      cliente: true,
      servicio: true,
    },
  });

  const cotizacionesPorEstado = [
    { estado: "pendiente", count: cotizacionesPendientes, color: "bg-gray-100 text-gray-700" },
    { estado: "aceptada", count: cotizacionesAceptadas, color: "bg-green-100 text-green-700" },
    { estado: "cancelada", count: cotizacionesCanceladas, color: "bg-red-100 text-red-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Servicios Activos</p>
            <span className="text-2xl">🧹</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{serviciosActivos}</p>
          <p className="text-xs text-gray-400 mt-1">de {totalServicios} totales</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Clientes Totales</p>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalClientes}</p>
          <p className="text-xs text-gray-400 mt-1">registrados</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Cotizaciones Pendientes</p>
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-3xl font-bold text-orange-500">{cotizacionesPendientes}</p>
          <p className="text-xs text-gray-400 mt-1">requieren atención</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Ingresos Estimados</p>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-green-500">${ingresosTotales}</p>
          <p className="text-xs text-gray-400 mt-1">cotizaciones aceptadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Últimas Cotizaciones</h2>

          {ultimasCotizaciones.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay cotizaciones recientes.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-gray-600 font-medium text-sm">Cliente</th>
                    <th className="pb-3 text-gray-600 font-medium text-sm">Servicio</th>
                    <th className="pb-3 text-gray-600 font-medium text-sm">Estado</th>
                    <th className="pb-3 text-gray-600 font-medium text-sm">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasCotizaciones.map((cotizacion) => (
                    <tr key={cotizacion.id} className="border-b last:border-0">
                      <td className="py-3 text-sm">{cotizacion.cliente.nombre}</td>
                      <td className="py-3 text-sm">{cotizacion.servicio.nombre}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
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
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(cotizacion.fechaCotizacion).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Resumen por Estado</h2>

          <div className="space-y-4">
            {cotizacionesPorEstado.map((item) => (
              <div key={item.estado} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{item.estado}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-2">Total cotizaciones</p>
            <p className="text-2xl font-bold text-slate-800">{totalCotizaciones}</p>
          </div>
        </div>
      </div>
    </div>
  );
}