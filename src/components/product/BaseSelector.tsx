"use client";
import { Base } from "@/interfaces/base";
import { useState } from "react";

export const BaseSelector = ({
  base,
  filter,
  setParams,
  state,
}: {
  base: Base[];
  filter: string;
  state: string[];
  setParams: (filter: string, filters: string[]) => void;
}) => {
  const [baseSelected, setBaseSelected] = useState<string[]>(() => [...state]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setBaseSelected((state) =>
        state.includes(value) ? state : [...state, event.target.value]
      );
      setParams(filter, [baseSelected, value]);
    } else {
      setBaseSelected((state) => [...state.filter((s) => s !== value)]);
      setParams(filter, [...baseSelected.filter((v) => v !== value)]);
    }
  };

  return (
    <div className="p-2">
      {base.map((b) => (
        <div key={b.id} className="flex my-2 flex-row items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            value={b.name}
            checked={baseSelected.includes(b.name)}
            id={`${b.id}`}
            className="appearance-none h-6 w-6 bg-white border-[1px] border-slate-200 rounded-full checked:bg-main checked:scale-75 transition-all duration-200 peer"
          />
          <div className="h-6 w-6 absolute rounded-full pointer-events-none peer-checked:border-main peer-checked:border-2"></div>
          <label
            htmlFor={`${b.id}`}
            className="flex flex-col justify-center px-2 peer-checked:text-white text-raffle-text select-none"
          >
            {b.name}
          </label>
        </div>
      ))}
    </div>
  );
};
