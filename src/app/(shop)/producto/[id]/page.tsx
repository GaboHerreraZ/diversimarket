import { getAllProducts, getProductBySlug } from "@/actions";
import { ProductDetail } from "@/components";
import { Product } from "@/interfaces/product";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const product = await getAllProducts();
  return product.map((product) => ({
    id: product.slug,
  }));
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(id);

  return {
    metadataBase: new URL(
      `https://diversimarket.com/producto/${product!.slug}`
    ),
    title: product!.name,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      siteName: "BellArte Joyerúa",
      url: `https://diversimarket.com/producto/${product?.slug}`,
      images: [
        {
          url: product?.productImage[0].url!,
          width: 800,
          height: 600,
        },
      ],
    },
    verification: {
      google:
        "google-site-verification=ml8yek4F0ARyMjz2nZhGf96nTfb3JA7AIN4yq3MOkcQ",
    },
  };
}

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductBySlug(id);

  return <ProductDetail product={product as Product} />;
}
