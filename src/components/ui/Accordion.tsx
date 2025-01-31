import clsx from "clsx";
import { ReactNode, useState } from "react";
import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
interface AccordionProps {
  title: string;
  children: ReactNode;
}
export default function Accordion({
  title,
  children,
}: Readonly<AccordionProps>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full bg-slate-50 rounded-lg">
      <h2 className="font-medium">
        <button
          className="flex justify-between items-center w-full text-left bg-blue-100 text-blue-950"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}{" "}
          {!isOpen ? (
            <ArrowDown01Icon fontSize={24} />
          ) : (
            <ArrowUp01Icon fontSize={24} />
          )}
        </button>
      </h2>
      <div className={clsx(!isOpen && "hidden")}>{children}</div>
    </div>
  );
}
