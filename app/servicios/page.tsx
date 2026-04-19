import Link from "next/link";
import prisma from "../../lib/prisma";
import { eliminarServicio } from "./actions";

export default async function ServiciosPage() {
  const servicios = await prisma.servicios.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Servicios</h1>

        <Link
          href="/servicios/nuevo"
          style={{
            padding: "10px 14px",
            border: "1px solid #ccc",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          Nuevo servicio
        </Link>
      </div>

      {servicios.length === 0 ? (
        <p>No hay servicios registrados todavía.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {servicios.map((servicio) => (
            <article
              key={servicio.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ marginBottom: "8px" }}>{servicio.titulo}</h2>
                {servicio.descripcion && (
                  <p style={{ marginBottom: "8px" }}>{servicio.descripcion}</p>
                )}
                {servicio.imagenUrl && (
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Imagen: {servicio.imagenUrl}
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  href={`/servicios/${servicio.id}/editar`}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
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
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      backgroundColor: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                    }}
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}