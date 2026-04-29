import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clean Company",
  description: "Sistema de gestión de servicios de limpieza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="flex min-h-screen">
          <aside className="w-64 bg-slate-800 text-white fixed h-full">
            <div className="p-6">
              <h1 className="text-xl font-bold">Clean Company</h1>
            </div>
            <nav className="mt-4">
              <Link
                href="/"
                className="block px-6 py-3 hover:bg-slate-700 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/servicios"
                className="block px-6 py-3 hover:bg-slate-700 transition"
              >
                Servicios
              </Link>
              <Link
                href="/clientes"
                className="block px-6 py-3 hover:bg-slate-700 transition"
              >
                Clientes
              </Link>
              <Link
                href="/cotizaciones"
                className="block px-6 py-3 hover:bg-slate-700 transition"
              >
                Cotizaciones
              </Link>
            </nav>
          </aside>

          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}