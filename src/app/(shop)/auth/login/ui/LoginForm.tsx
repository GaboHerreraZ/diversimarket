"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { Login } from "@/interfaces/login";
import { useAuthStore, useLoadingStore, useUserStore } from "@/store";
import Input from "@/components/ui/input/Input";
import {
  signInWithPassword,
  getUser,
  getUserByAuthId,
  createUserAdmin,
} from "@/actions";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const toggleLoading = useLoadingStore((state) => state.toggleLoading);
  const signInWithOAuth = useAuthStore((state) => state.signInWithOAuth);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Login>();

  const onSubmit = async (login: Login) => {
    toggleLoading(true);
    const { data, error } = await signInWithPassword(
      login.email,
      login.password
    );

    toggleLoading(false);

    if (error) {
      const message =
        error === "Invalid login credentials" ? "Contraseña incorrecta" : error;
      setErrorMessage(message);
      return;
    }

    const { role } = data.user!;

    if (["admin", "super-admin"].includes(role!)) {
      router.push("/admin");
    } else {
      router.replace("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithOAuth();
    const { id } = await getUser();

    const user = await getUserByAuthId(id!);
    setUser(user);
  };

  return (
    <div className="grid px-2  md:p-0 mt-20 w-full items-center md:justify-center py-10">
      <div className="flex  w-full md:w-[280px] flex-col  md:flex-row shadow rounded ">
        <div className="w-full p-5 ">
          <header className=" flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-semibold text-main text-center">
              Bienvenido
            </h1>
            <small className="text-lg text-slate-950 text-center">
              Por favor ingresa tus datos
            </small>
          </header>

          <form className="mt-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Input
                {...register("email", { required: true })}
                placeholder="Ingresa tu email"
                error={errors.email && "Email requerido"}
              />

              <Input
                {...register("password", { required: true })}
                placeholder="Ingresa tu contraseña"
                type="password"
                autoComplete="current-password"
                error={errors.email && "Contraseña requerido"}
              />
            </div>

            <div className="my-3 flex flex-wrap content-center">
              <a href="#" className="text-xs font-semibold text-main">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div>
              {errorMessage && (
                <p className="bg-red-700 text-center text-white p-2 my-2">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="mb-1.5 block w-full text-center button-main text-white "
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex text-white flex-wrap justify-center w-full button-main "
              >
                <FcGoogle size={25} />
                Iniciar sesión con Google
              </button>
            </div>
          </form>

          <div>
            <span className="text-xs text-slate-950 font-semibold">
              ¿No tienes una cuenta aún?
            </span>
            <Link
              href="/auth/registrarse"
              className="text-sm ml-2 font-semibold text-main underline italic"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
