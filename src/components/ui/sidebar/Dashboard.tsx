import { SideBar } from "./Sidebar";
import { TopeMenu } from "./TopMenu";

export const Dashboard = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  return (
    <>
      <div className="relative">
        <SideBar role={role} />
        <TopeMenu>{children}</TopeMenu>
      </div>
    </>
  );
};
