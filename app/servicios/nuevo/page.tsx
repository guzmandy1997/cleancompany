import { crearServicio } from "../actions";

export default function NuevoServicioPage() {
  return (
    <main style={{ padding: "24px", maxWidth: "700px" }}>
      <h1>Nuevo servicio</h1>

      <form
        action={crearServicio}
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
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </div>

        <button type="submit" style={{ padding: "12px 16px" }}>
          Guardar servicio
        </button>
      </form>
    </main>
  );
}