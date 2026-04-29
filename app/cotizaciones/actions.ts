"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";

export async function crearCotizacion(formData: FormData) {
  const clienteId = Number(formData.get("clienteId"));
  const servicioId = Number(formData.get("servicioId"));
  const estado = formData.get("estado")?.toString() || "pendiente";
  const direccionServicio = formData.get("direccionServicio")?.toString().trim() || "";
  const comentarios = formData.get("comentarios")?.toString().trim() || "";
  const fechaProgramadaRaw = formData.get("fechaProgramada")?.toString();

  if (!clienteId || !servicioId) {
    throw new Error("Cliente y servicio son obligatorios");
  }

  await prisma.cotizaciones.create({
    data: {
      clienteId,
      servicioId,
      estado,
      direccionServicio: direccionServicio || null,
      comentarios: comentarios || null,
      fechaProgramada: fechaProgramadaRaw ? new Date(fechaProgramadaRaw) : null,
    },
  });

  revalidatePath("/cotizaciones");
  redirect("/cotizaciones");
}

export async function eliminarCotizacion(id: number) {
  await prisma.cotizaciones.delete({
    where: { id },
  });

  revalidatePath("/cotizaciones");
}

export async function actualizarCotizacion(id: number, formData: FormData) {
  const clienteId = Number(formData.get("clienteId"));
  const servicioId = Number(formData.get("servicioId"));
  const estado = formData.get("estado")?.toString() || "pendiente";
  const direccionServicio =
    formData.get("direccionServicio")?.toString().trim() || "";
  const comentarios =
    formData.get("comentarios")?.toString().trim() || "";
  const fechaProgramadaRaw = formData.get("fechaProgramada")?.toString();

  if (!clienteId || !servicioId) {
    throw new Error("Cliente y servicio son obligatorios");
  }

  await prisma.cotizaciones.update({
    where: { id },
    data: {
      clienteId,
      servicioId,
      estado,
      direccionServicio: direccionServicio || null,
      comentarios: comentarios || null,
      fechaProgramada: fechaProgramadaRaw ? new Date(fechaProgramadaRaw) : null,
    },
  });

  revalidatePath("/cotizaciones");
  revalidatePath(`/cotizaciones/${id}/editar`);
  redirect("/cotizaciones");
}