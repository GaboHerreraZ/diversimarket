import { ContactForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://diversimarket.com/contacto"),
  title: "Contáctanos",
  description:
    "Contáctanos en Diversi Market para consultas o pedidos personalizados. Nuestro equipo está listo para ayudarte a encontrar la joya perfecta o resolver tus dudas.",
};

export default function ContactPage() {
  return <ContactForm />;
}
