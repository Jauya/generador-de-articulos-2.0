import { Cancel01Icon } from "hugeicons-react";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: Readonly<ModalProps>) {
  if (!isOpen) return null;
  return createPortal(
    <div className="absolute top-0 left-0 w-full h-screen bg-black/5 flex justify-center items-center">
      <div className="bg-white p-5  rounded-2xl border flex flex-col gap-5 w-[400px]">
        <div className="flex w-full justify-center items-center relative">
          <h2 className="text-center font-medium text-xl">{title}</h2>
          <Cancel01Icon
            className="cursor-pointer absolute right-0"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
