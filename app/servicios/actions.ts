"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";

export async function crearServicio(formData: FormData) {
  const titulo = formData.get("titulo")?.toString().trim() || "";
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  const imagenUrl = formData.get("imagenUrl")?.toString().trim() || "";

  if (!titulo) {
    throw new Error("El título es obligatorio");
  }

  await prisma.servicios.create({
    data: {
      titulo,
      descripcion: descripcion || null,
      imagenUrl: imagenUrl || null,
    },
  });

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
  const titulo = formData.get("titulo")?.toString().trim() || "";
  const descripcion = formData.get("descripcion")?.toString().trim() || "";
  const imagenUrl = formData.get("imagenUrl")?.toString().trim() || "";

  if (!titulo) {
    throw new Error("El título es obligatorio");
  }

  await prisma.servicios.update({
    where: { id },
    data: {
      titulo,
      descripcion: descripcion || null,
      imagenUrl: imagenUrl || null,
    },
  });

  revalidatePath("/servicios");
  redirect("/servicios");
}