export const dynamic = "force-dynamic";
import prisma from "../../../lib/prisma";
import { crearCotizacion } from "../actions";

export default async function NuevaCotizacionPage() {
  const clientes = await prisma.cliente.findMany({
    orderBy: { id: "desc" },
  });

  const servicios = await prisma.servicios.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Nueva cotización</h1>

      <form
        action={crearCotizacion}
        style={{ display: "grid", gap: "16px", marginTop: "24px" }}
      >
        <div>
          <label htmlFor="clienteId">Cliente</label>
          <br />
          <select
            id="clienteId"
            name="clienteId"
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
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
          <label htmlFor="servicioId">Servicio</label>
          <br />
          <select
            id="servicioId"
            name="servicioId"
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
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
          <label htmlFor="estado">Estado</label>
          <br />
          <select
            id="estado"
            name="estado"
            defaultValue="pendiente"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div>
          <label htmlFor="fechaProgramada">Fecha programada</label>
          <br />
          <input
            id="fechaProgramada"
            name="fechaProgramada"
            type="datetime-local"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div>
          <label htmlFor="direccionServicio">Dirección del servicio</label>
          <br />
          <input
            id="direccionServicio"
            name="direccionServicio"
            type="text"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div>
          <label htmlFor="comentarios">Comentarios</label>
          <br />
          <textarea
            id="comentarios"
            name="comentarios"
            rows={4}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <button type="submit" style={{ padding: "12px 16px", cursor: "pointer" }}>
          Guardar cotización
        </button>
      </form>
    </main>
  );
}