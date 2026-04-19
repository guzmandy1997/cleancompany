import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import { actualizarServicio } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params;

  const servicio = await prisma.servicios.findUnique({
    where: { id: Number(id) },
  });

  if (!servicio) return notFound();

  const action = async (formData: FormData) => {
    "use server";
    await actualizarServicio(servicio.id, formData);
  };

  return (
    <main style={{ padding: "24px", maxWidth: "700px" }}>
      <h1>Editar servicio</h1>

      <form
        action={action}
        style={{ display: "grid", gap: "12px", marginTop: "20px" }}
      >
        <div>
          <label htmlFor="titulo">Título</label>
          <br />
          <input
            id="titulo"
            name="titulo"
            type="text"
            required
            defaultValue={servicio.titulo}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <br />
          <textarea
            id="descripcion"
            name="descripcion"
            rows={5}
            defaultValue={servicio.descripcion ?? ""}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <div>
          <label htmlFor="imagenUrl">URL de imagen</label>
          <br />
          <input
            id="imagenUrl"
            name="imagenUrl"
            type="text"
            defaultValue={servicio.imagenUrl ?? ""}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
}