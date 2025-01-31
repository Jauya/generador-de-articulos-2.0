"use client";
import { configSite } from "@/config/site";
import Link from "next/link";
import { LicenseDraftIcon } from "hugeicons-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import KeyValidation from "./KeyValidation";
import { usePromptStore } from "@/stores/promptStore";

export default function Sidebar() {
  const pathname = usePathname();
  const { isSending } = usePromptStore();
  return (
    <div
      className={clsx(
        "content-wrapper max-w-[320px]",
        isSending && "pointer-events-none"
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <LicenseDraftIcon size={30} />
        <h1 className="flex font-semibold text-xl ">Generador de articulos</h1>
      </div>
      <KeyValidation />
      <nav className="flex flex-col gap-1 ">
        {configSite.navMenuItem.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "py-2 px-3",
              pathname == item.href && "bg-blue-50 text-blue-600 rounded-lg"
            )}
          >
            {item.label.replace(/^./, (char) => char.toUpperCase())}
          </Link>
        ))}
      </nav>
    </div>
  );
}
