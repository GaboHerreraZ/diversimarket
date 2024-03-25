import { Column } from "@/interfaces/column";
import { User } from "@/interfaces/user";
import { ActionRow, DateRow, StateRow, Table, TextRow } from "@/components/ui";
import { BiSolidEdit } from "react-icons/bi";
import { NewWholesaler } from "./NewWholesaler";

interface Props {
  users: User[];
  totalPages: number;
  title: string;
}

const columns: Column[] = [
  { label: "Nombre" },
  { label: "Email" },
  { label: "Phone" },
  { label: "Perfil Completo" },
  { label: "Fecha Creación" },
  { label: "Acciones" },
];

export const UserGrid = ({ users, totalPages, title }: Props) => {
  return (
    <section className="container md:mx-auto px-2 lg:px-10 mt-5">
      <header className="flex justify-between items-center border-b-[1px] border-gray-300">
        <h1 className="text-xl font-extrabold mb-5 uppercase">{title}</h1>
      </header>
      {title === "Mayoristas" && <NewWholesaler />}
      <Table columns={columns} totalPages={totalPages}>
        {users.map((user) => (
          <tr key={user.id}>
            <TextRow label={`${user.name} ${user.lastName}`} />
            <TextRow label={user.email} />
            <TextRow label={user.phone} />
            <StateRow
              state={user.completeProfile}
              falseLabel="No"
              trueLabel="Si"
            />
            <DateRow date={user.createdAt} />
            <ActionRow
              actions={[
                {
                  icon: <BiSolidEdit size={25} />,
                  href: `/admin/usuario/${user.authId}`,
                  id: user.authId,
                },
              ]}
            />
          </tr>
        ))}
      </Table>
    </section>
  );
};
