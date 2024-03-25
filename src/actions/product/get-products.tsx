import { Product } from "@/interfaces/product";
import prisma from "@/lib/prisma";

interface Props {
  page?: number;
  take?: number;
  category?: string;
  subcategory?: string[];
  orderBy?: string;
  order?: string;
  wholesaler: boolean;
}

export const getProducts = async ({
  page = 1,
  take = 10,
  category,
  subcategory,
  orderBy = "name",
  order = "asc",
  wholesaler,
}: Props) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const whereClause = {
    category: {
      link: category,
    },
    ...(subcategory?.length && {
      OR: [
        {
          subcategory: {
            link: {
              in: subcategory,
            },
          },
        },
      ],
    }),
  };

  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * take,
      take,
      where: !category
        ? {
            ...(subcategory?.length && {
              OR: [
                {
                  subcategory: {
                    name: {
                      in: subcategory,
                    },
                  },
                },
              ],
            }),
          }
        : whereClause,
      include: {
        productImage: true,
      },
      orderBy: {
        [orderBy]: order,
      },
    });

    const totalCount = await prisma.product.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
      })) as Product[],
    };
  } catch (e) {
    return null;
  }
};
