"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";

export async function crearServicio(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  const categoria = formData.get("categoria")?.toString().trim() || "";
  const precioBaseValue = formData.get("precioBase")?.toString().trim() || "";
  const duracionMinValue = formData.get("duracionMin")?.toString().trim() || "";
  const imagenUrl = formData.get("imagenUrl")?.toString().trim() || "";
  const activoValue = formData.get("activo")?.toString();

  if (!nombre) {
    throw new Error("El nombre es obligatorio");
  }

   if (!categoria) {
    throw new Error("La categoria es obligatorio");
  }

  const precioBase = precioBaseValue ? parseFloat(precioBaseValue) : null;
  const duracionMin = duracionMinValue ? parseInt(duracionMinValue, 10) : null;
  const activo = activoValue === "on";

  await prisma.servicios.create({
    data: {
  
      nombre,
      descripcion: descripcion || null,
      categoria,
      precioBase,
      duracionMin,
      activo,
      imagenUrl: imagenUrl || null,
    },
  }

);
revalidatePath("/servicios");
  redirect("/servicios");

  
}

export async function eliminarServicio(id: number) {
  await prisma.servicios.delete({
    where: { id },
  });

  revalidatePath("/servicios");
}

export async function actualizarServicio(id: number, formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  const categoria = formData.get("categoria")?.toString().trim() || "";
  const precioBase = formData.get("precioBase")?.toString().trim() || "";
  const duracionMin = formData.get("duracionMin")?.toString().trim() || "";
  const imagenUrl = formData.get("imagenUrl")?.toString().trim() || "";

  if (!nombre) {
    throw new Error("El título es obligatorio");
  }

  await prisma.servicios.update({
    where: { id },
    data: {
      nombre,
      descripcion: descripcion || null,
      categoria,
      precioBase: precioBase ? parseFloat(precioBase) : null,
      duracionMin: duracionMin ? parseInt(duracionMin) : null,
      imagenUrl: imagenUrl || null,
    },
  });

  revalidatePath("/servicios");
  redirect("/servicios");
}