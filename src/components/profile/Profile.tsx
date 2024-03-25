"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { User } from "@/interfaces/user";
import Input from "../ui/input/Input";
import Select from "../ui/select/Select";
import { dateFormat, getDaysByMonth } from "@/utils";
import Checkbox from "../ui/checkbox/Checkbox";
import { useLoadingStore } from "@/store";
import { createUpdatedUser } from "@/actions";
import { toastError, toastSuccess } from "@/utils/notifications";

interface Props {
  user: Partial<User>;
  disabled: boolean;
}

const MONTHS = [
  { id: "1", description: "1-Ene", name: "1-Ene" },
  { id: "2", description: "2-Feb", name: "2-Feb" },
  { id: "3", description: "3-Mar", name: "3-Mar" },
  { id: "4", description: "4-Abr", name: "4-Abr" },
  { id: "5", description: "5-May", name: "5-May" },
  { id: "6", description: "6-Jun", name: "6-Jun" },
  { id: "7", description: "7-Jul", name: "7-Jul" },
  { id: "8", description: "8-Ago", name: "8-Ago" },
  { id: "9", description: "9-Sep", name: "9-Sep" },
  { id: "10", description: "10-Oct", name: "10-Oct" },
  { id: "11", description: "11-Nov", name: "11-Nov" },
  { id: "12", description: "12-Dic", name: "12-Dic" },
];

export const Profile = ({ user, disabled }: Props) => {
  const [days, setDays] = useState<
    { id: string; name: string; description: string }[]
  >(getDaysByMonth(Number(user.birthMonth)));

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);

  const onChangeMonth = (month: string) => {
    const year = new Date().getFullYear();
    const daysByMonth = getDaysByMonth(Number(month), year);
    setDays(daysByMonth);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({ defaultValues: user, disabled });

  const onSubmit = async (data: User) => {
    data.authId = user.authId!;

    try {
      toggleLoading(true);
      const response = await createUpdatedUser(data);
      if (response.ok) toastSuccess("Perfil actualizado");
    } catch (error) {
      console.log("error", error);
      toastError("Error al actualizar el perfil");
    }
    toggleLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="flex items-center text-slate-950 font-bold text-3xl justify-between border-b-[1px] border-gray-200 pb-5">
        <h1>Perfil</h1>
        {disabled && (
          <Link className="text-sm underline italic" href={`/admin/usuarios`}>
            Volver
          </Link>
        )}
      </header>
      <h5 className="text-end my-2 text-xs w-full">
        Última actualización:
        <span className="font-bold">{dateFormat(user.updatedAt!, "es")}</span>
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 ">
        <Input
          {...register("name", { required: true })}
          placeholder="Nombre"
          error={errors.name && "Nombre requerido"}
        />
        <Input
          {...register("lastName", { required: true })}
          placeholder="Apellidos"
          error={errors.lastName && "Apellidos requeridos"}
        />
        <Input
          {...register("phone", { required: true })}
          placeholder="Teléfono"
          error={errors.phone && "Teléfono requerido"}
        />
        <Select
          placeholder="Mes de nacimiento"
          {...register("birthMonth", {
            onChange: (e) => onChangeMonth(e.target.value),
          })}
          options={MONTHS}
        />
        <Select
          id="birthDay"
          placeholder="Día de nacimiento"
          {...register("birthDay")}
          options={days}
        />
        <Input
          {...register("email")}
          placeholder="Correo Electrónico"
          disabled
        />
      </div>
      <header className="flex mt-4 justify-between border-b-[1px] border-gray-200 pb-5">
        <h1 className="text-2xl text-slate-950 font-bold">Preferencias</h1>
      </header>
      <div className="mt-4">
        <h2 className="text-lg font-bold">¿Qué productos te intersan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
          <Checkbox
            {...register("preference.kitchen")}
            placeholder="Tobilleras"
          />
          <Checkbox {...register("preference.toys")} placeholder="Pulseras" />
        </div>
      </div>
      {!disabled && (
        <div className="flex justify-end">
          <button type="submit" className=" button-main  mt-4">
            Guardar
          </button>
        </div>
      )}
    </form>
  );
};
