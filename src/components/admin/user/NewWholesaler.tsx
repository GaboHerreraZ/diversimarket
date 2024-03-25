"use client";

import { createUserAdmin } from "@/actions";
import Input from "@/components/ui/input/Input";
import { useLoadingStore } from "@/store";
import { toastError, toastSuccess } from "@/utils/notifications";
import { useForm } from "react-hook-form";

export const NewWholesaler = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<{ email: string; password: string }>();

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const onSubmit = async (userData: { email: string; password: string }) => {
    toggleLoading(true);
    const { error } = await createUserAdmin(userData.email, userData.password);
    toggleLoading(false);
    if (error) {
      toastError(error);
      return;
    }
    reset();
    toastSuccess("Usuario creado correctamente");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-end gap-10 flex-col my-4 md:flex-row"
    >
      <Input
        {...register("email", { required: true })}
        placeholder="Correo Electrónico"
        type="email"
        error={errors.email && "Este campo es requerido"}
      />
      <Input
        {...register("password", { required: true })}
        placeholder="Contraseña"
        type="password"
        error={errors.password && "Este campo es requerido"}
      />
      <div>
        <button type="submit" className="button-main">
          Guardar
        </button>
      </div>
    </form>
  );
};
