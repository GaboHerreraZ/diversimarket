"use client";
import { createCategory } from "@/actions";
import Input from "@/components/ui/input/Input";
import { Base } from "@/interfaces/base";
import { useLoadingStore } from "@/store";
import { toastError, toastSuccess } from "@/utils/notifications";
import { useForm } from "react-hook-form";

export const CategoryForm = ({ category }: { category: Base | undefined }) => {
  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Base>({ defaultValues: category });

  const onSubmit = async (data: Base) => {
    toggleLoading(true);
    try {
      const response = await createCategory(data);
      if (response) toastSuccess("Categoría creada correctamente");
      reset();
      toggleLoading(false);
    } catch (error) {
      toastError("Error al crear categoría");
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex md:flex-row items-end flex-col gap-2">
        <Input
          placeholder="Nombre"
          {...register("name", { required: true })}
          error={errors.name && "Nombre requerido"}
        />
        <Input
          placeholder="Descripción"
          {...register("description", { required: true })}
          error={errors.description && "Descripción requerida"}
        />
        <Input
          placeholder="Link"
          {...register("link", { required: true })}
          error={errors.link && "Link requerid0"}
        />
        <Input
          placeholder="Prefijo Referencia"
          {...register("prefix", {
            required: true,
            minLength: 2,
            maxLength: 2,
          })}
          error={errors.prefix && "Prefijo requerido"}
        />
        <div>
          <button className="button-main  " type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};
