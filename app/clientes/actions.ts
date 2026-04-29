"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";

export async function crearCliente(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const telefono = formData.get("telefono")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const direccion = formData.get("direccion")?.toString().trim() || "";
  const notas = formData.get("notas")?.toString().trim() || "";

  if (!nombre) throw new Error("El nombre es obligatorio");

  await prisma.cliente.create({
    data: {
      nombre,
      telefono: telefono || null,
      email: email || null,
      direccion: direccion || null,
      notas: notas || null,
    },
  });

  revalidatePath("/clientes");
  redirect("/clientes");
}

export async function eliminarCliente(id: number) {
  await prisma.cliente.delete({
    where: { id },
  });

  revalidatePath("/clientes");
}

export async function actualizarCliente(id: number, formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const telefono = formData.get("telefono")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const direccion = formData.get("direccion")?.toString().trim() || "";
  const notas = formData.get("notas")?.toString().trim() || "";

  if (!nombre) throw new Error("El nombre es obligatorio");

  await prisma.cliente.update({
    where: { id },
    data: {
      nombre,
      telefono: telefono || null,
      email: email || null,
      direccion: direccion || null,
      notas: notas || null,
    },
  });

  revalidatePath("/clientes");
  redirect("/clientes");
}