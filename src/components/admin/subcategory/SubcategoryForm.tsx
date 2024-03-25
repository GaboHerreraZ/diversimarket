"use client";
import { createSubcategory } from "@/actions";
import Input from "@/components/ui/input/Input";
import { Base } from "@/interfaces/base";
import { useLoadingStore } from "@/store";
import { toastError, toastSuccess } from "@/utils/notifications";
import { useForm } from "react-hook-form";

export const SubcategoryForm = ({
  category,
}: {
  category: Base | undefined;
}) => {
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
      const response = await createSubcategory(data);
      if (response) toastSuccess("Subcategoría creada correctamente");
      reset();
      toggleLoading(false);
    } catch (error) {
      toastError("Error al crear Subcategoría");
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-end flex-row md:flex-cols gap-2">
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
          error={errors.link && "Link requerida"}
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
