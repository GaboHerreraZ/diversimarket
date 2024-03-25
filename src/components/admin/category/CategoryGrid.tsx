import { Table, TextRow } from "@/components/ui";
import { Base } from "@/interfaces/base";
import { Column } from "@/interfaces/column";
import { DeleteCategory } from "./DeleteCategory";
import { CategoryForm } from "./CategoryForm";

const columns: Column[] = [
  { label: "Nombre" },
  { label: "Descripción" },
  { label: "Link" },
  { label: "Prefijo Referencia" },
  { label: "Acciones" },
];

export const CategoryGrid = ({ categories }: { categories: Base[] }) => {
  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row pb-2 justify-between md:items-center border-b-[1px] border-gray-300">
        <h1 className="text-xl font-extrabold mb-5 uppercase">Categorías</h1>
      </div>
      <CategoryForm category={undefined} />
      <Table columns={columns} totalPages={0}>
        {categories.map((category) => {
          return (
            <tr key={category.id}>
              <TextRow label={category.name} />
              <TextRow label={category.description} />
              <TextRow label={category.link} />
              <TextRow label={category.prefix!} />
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <DeleteCategory id={category.id} />
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
};
