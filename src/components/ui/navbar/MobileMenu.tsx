import Image from "next/image";

import logo from "../../../../public/png/Logo_negro.png";
import { Profile } from "./Profile";
import { MobileToggleButton } from "./MobileToggleButton";
import { MobileToggleMenu } from "./MobileToggleMenu";
import Link from "next/link";

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="sticky z-50 top-0 ">
        <nav className="grid bg-white">
          <header className="flex justify-around z-10  items-center text-white w-full p-2 ">
            <MobileToggleButton />
            <div className="flex ml-2 w-[150px] relative  justify-self-center flex-row">
              <Link href="/">
                <Image
                  className="z-10 "
                  src={logo}
                  alt="Diversi Market"
                  width={100}
                />
              </Link>
            </div>
            <Profile />
          </header>
          <MobileToggleMenu />
        </nav>
      </div>

      {children}
    </>
  );
};
