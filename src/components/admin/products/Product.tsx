"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";

import { Base } from "@/interfaces/base";
import { Product } from "@/interfaces/product";
import { useLoadingStore, useUserStore } from "@/store";
import { toastError, toastSuccess } from "@/utils/notifications";
import { createProduct, deleteImage } from "@/actions";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import { getProductNextSku } from "@/actions/product/get-product-next-sku";

interface Props {
  product: Partial<Product>;
  categories: Base[];
  subcategories: Base[];
}

export const ProductPage = ({ product, categories, subcategories }: Props) => {
  let prefix = !product.id
    ? categories[0].prefix
    : categories.find((category) => category.id === product.categoryId)?.prefix;
  const router = useRouter();
  const toggleLoading = useLoadingStore((state) => state.toggleLoading);
  const user = useUserStore((state) => state.user);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      ...product,
      sku: !product.id ? prefix : product.sku,
    },
  });

  const getPrefix = async () => {
    const { categoryId } = getValues();
    prefix = categories.find(
      (category) => `${category.id}` === `${categoryId}`
    )?.prefix;
    toggleLoading(true);
    const skuCount = await getProductNextSku(Number(categoryId));
    toggleLoading(false);
    setValue("sku", `${prefix}${skuCount + 1}`);
  };

  const onSubmit = async (data: Product) => {
    const formData = new FormData();
    const { images, ...rest } = data;

    if (data.available && Number(data.quantity) === 0) {
      toastError("El producto no puede estar disponible si la cantidad es 0");
      return;
    }

    if (images?.length === 0 && product.productImage?.length === 0) {
      toastError("Se requiere al menos una imagen");
      return;
    }

    if (product.productImage?.length === 4) {
      toastError("No se pueden subir más de 4 imagenes");
      return;
    }

    toggleLoading(true);

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("sku", getValues().sku);
    formData.append("name", rest.name);
    formData.append("slug", rest.slug);
    formData.append("ownerId", user.authId);
    formData.append("description", rest.description);
    formData.append("youtubeLink", rest.youtubeLink);
    formData.append("price", rest.price.toString());
    formData.append("multiplier", rest.multiplier.toString());
    formData.append("quantity", rest.quantity.toString());
    formData.append("categoryId", rest.categoryId.toString());
    formData.append("subcategoryId", rest.subcategoryId.toString());
    formData.append("available", rest.available.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: productCreated } = await createProduct(formData);

    ok
      ? toastSuccess(
          `Producto ${product.id ? "actualizado" : "creado"} correctamente`
        )
      : toastError(
          `Error al ${product.id ? "actualizar" : "crear"} el producto`
        );

    toggleLoading(false);

    if (ok) router.replace(`/admin/producto/${productCreated?.sku}`);
  };

  const handleDeleteImage = async (id: number, folder: string) => {
    toggleLoading(true);
    const { ok, data } = await deleteImage(id, product.sku!, folder);
    ok
      ? toastSuccess("Imagen eliminada correctamente")
      : toastError("Error eliminando la imagen");

    toggleLoading(false);
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="flex justify-between items-center border-b-[1px] border-gray-300 mb-5">
          <h1 className="text-xl font-extrabold  uppercase">Producto</h1>
          <button type="submit" className="button-main mb-2">
            Guardar
          </button>
        </header>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <Input
            {...register("sku", {
              required: true,
              disabled: true,
              pattern: /^[a-zA-Z0-9-]+(?:-[a-zA-Z0-9]+)*$/,
            })}
            placeholder="Sku"
            error={errors.sku && "Sku requerido"}
          />
          <Input
            {...register("slug", {
              required: true,
              pattern: /^[a-zA-Z0-9-]+(?:-[a-zA-Z0-9]+)*$/,
            })}
            placeholder="Slug"
            error={errors.slug && "Slug requerido ej: anillo-dorado"}
          />
          <Input
            {...register("name", { required: true })}
            placeholder="Nombre"
            error={errors.name && "Nombre requerido"}
          />
          <Input
            {...register("description", { required: true })}
            placeholder="Descripción"
            error={errors.description && "Descripción requerida"}
          />
          <Input
            type="number"
            {...register("price", { required: true })}
            placeholder="Precio"
            error={errors.price && "Precio requerido"}
          />

          <Input
            type="number"
            {...register("quantity", { required: true })}
            placeholder="Cantidad"
            error={errors.quantity && "Cantidad requerida"}
          />

          <Input
            type="number"
            {...register("multiplier", { required: true })}
            placeholder="Multiplicador"
            error={errors.multiplier && "Multiplicador requerido"}
          />

          <Select
            error={errors.categoryId && "Categoría requerida"}
            placeholder="Selecciona una categoría"
            {...register("categoryId", {
              required: true,
              onChange: () => {
                getPrefix();
              },
            })}
            options={categories}
          />

          <Select
            error={errors.subcategoryId && "Subcategoría requerida"}
            placeholder="Selecciona una subcategoría"
            {...register("subcategoryId", { required: true })}
            options={subcategories}
          />

          <Input
            type="text"
            {...register("youtubeLink", {
              pattern:
                /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|shorts\/)?([A-Za-z0-9\-_]{11})/,
            })}
            placeholder="Link de Youtube"
          />

          <Checkbox {...register("available")} placeholder="Disponible" />
        </div>
        <h1 className="border-b-[1px] mt-5 border-gray-300 text-xl font-extrabold  uppercase">
          Adjuntar Imagenes
        </h1>
        <div className="mt-2">
          <label className="flex flex-col">
            <input
              type="file"
              multiple
              id="custom-input"
              className="text-raffle-text"
              {...register("images")}
            />
          </label>
        </div>
      </form>
      <div className="mt-5">
        <h1 className="border-b-[1px] mt-5 border-gray-300 text-xl font-extrabold  uppercase">
          Imagenes cargadas
        </h1>
        <div className="flex gap-4 mt-3">
          {product?.productImage?.map((url, index) => (
            <div key={index} className="grid gap-2 ">
              <button
                onClick={() => handleDeleteImage(url.id, url.folder)}
                className="text-red-500 flex justify-center"
              >
                <FaRegTrashAlt size={15} />
              </button>
              <Image src={url.url} alt={url.url} width={150} height={150} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
