import Link from "next/link";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { getUser } from "@/actions";
import clsx from "clsx";

export const Profile = async ({ className }: { className?: string }) => {
  const { id, role } = await getUser();

  return (
    <div className={clsx("flex gap-3 justify-center ", className)}>
      {role !== "admin" && <CartButton />}

      {!id ? (
        <Link href="/auth/login" className="button-main">
          Iniciar Sesión
        </Link>
      ) : (
        <>{role !== "admin" && <ProfileButton />}</>
      )}
    </div>
  );
};
