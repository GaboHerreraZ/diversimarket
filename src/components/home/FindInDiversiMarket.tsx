import "./style.css";
import { ZoomImage } from "./ZoomImage";

const images = [
  {
    className: "anillos",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/anillos.jpg?t=2024-03-15T19%3A20%3A28.552Z",
    label: "Anillos",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CAnillos",
    alt: "Anillos en BellArte",
  },

  {
    className: "cadenas",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/cadena.jpg?t=2024-03-15T19%3A20%3A03.045Z",
    label: "Cadenas",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CCadenas",
    alt: "Cadenas en BellArte",
  },

  {
    className: "aretes",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/aretes.jpg?t=2024-03-15T19%3A20%3A37.464Z",
    label: "Candongas",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CCandongas",
    alt: "Candongas en BellArte",
  },

  {
    className: "dijes",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/dije.jpeg?t=2024-03-15T19%3A20%3A45.457Z",
    label: "Dijes",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CDijes",
    alt: "Dijes en BellArte",
  },

  {
    className: "pulseras",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/pulsera.jpg",
    label: "Pulseras",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CPulseras",
    alt: "Pulseras en BellArte",
  },

  {
    className: "tobilleras",
    urlImage:
      "https://neemxhjfpkzimvlwwlpe.supabase.co/storage/v1/object/public/publicImage/home/tobilleras.jpg",
    label: "Tobilleras",
    link: "https://diversimarket.com/genero/all?subcategoria=%2CTobilleras",
    alt: "Tobilleras en BellArte",
  },
];

export const FindInDiversiMarket = () => {
  return (
    <section className="grid justify-center py-10 bg-main/10">
      <h1 className="font-bold py-10 text-main text-center text-3xl">
        ENCUENTRA EN DIVERSIMARKET
      </h1>

      <div className="wrapper">
        {images.map((image) => (
          <ZoomImage key={image.label} {...image} />
        ))}
      </div>
    </section>
  );
};
