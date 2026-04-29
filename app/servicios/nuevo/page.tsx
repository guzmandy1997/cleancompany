import { crearServicio } from "../actions";

export default function NuevoServicioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nuevo servicio</h1>

      <form
        action={crearServicio}
        className="bg-white rounded-lg p-6 shadow space-y-4 max-w-2xl"
      >
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Post-construccion">Post-construcción</option>
            <option value="Profunda">Profunda</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="precioBase" className="block text-sm font-medium text-gray-700 mb-1">
              Precio base ($)
            </label>
            <input
              id="precioBase"
              name="precioBase"
              type="number"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="duracionMin" className="block text-sm font-medium text-gray-700 mb-1">
              Duración (minutos)
            </label>
            <input
              id="duracionMin"
              name="duracionMin"
              type="number"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="imagenUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL de imagen
          </label>
          <input
            id="imagenUrl"
            name="imagenUrl"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="activo"
            name="activo"
            type="checkbox"
            defaultChecked
            className="w-4 h-4 text-slate-800 rounded focus:ring-slate-500"
          />
          <label htmlFor="activo" className="text-sm text-gray-700">
            Activo
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition font-medium"
        >
          Guardar servicio
        </button>
      </form>
    </div>
  );
}