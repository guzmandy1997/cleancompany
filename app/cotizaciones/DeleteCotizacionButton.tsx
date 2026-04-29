"use client";

type Props = {
  action: () => Promise<void>;
};

export default function DeleteCotizacionButton({ action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm("¿Seguro que quieres eliminar esta cotización?");
        if (!ok) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Eliminar
      </button>
    </form>
  );
}