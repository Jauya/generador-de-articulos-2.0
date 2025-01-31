import Modal from "./ui/Modal";
import { MouseEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyApiKey } from "@/actions/geminiActions";
import { useApikeyStore } from "@/stores/apikeyStore";
import { delay } from "@/utils/delay";
import { AlertCircleIcon, CheckmarkCircle01Icon } from "hugeicons-react";
import clsx from "clsx";

const formSchema = z.object({
  "api-key": z.string().length(39, "La API Key es incorrecta"),
});

type FormData = z.infer<typeof formSchema>;

export default function KeyValidation() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { addApikey, clearApikey, apikey, successMessage } = useApikeyStore();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const resetKey = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    clearApikey();
  };
  const verifyKey = async (formData: FormData) => {
    try {
      const apiKey = formData["api-key"];
      const verify = await verifyApiKey(apiKey);
      if (verify.success) {
        addApikey(apiKey);
        await delay(500);
        closeModal();
      } else {
        setError("api-key", {
          type: "invalidToken",
          message: "Token no válido. Por favor, verifica tu API Key",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-5">
      <button onClick={openModal}>Validar API key</button>
      <div className="relative flex justify-center items-center">
        <CheckmarkCircle01Icon
          className={clsx(
            "transition-colors absolute",
            apikey ? "text-green-600" : "text-transparent"
          )}
        />
        <AlertCircleIcon
          className={clsx(
            "transition-colors absolute",
            !apikey ? "text-red-600" : "text-transparent"
          )}
        />
      </div>
      <Modal isOpen={isOpenModal} onClose={closeModal} title="Cargar API Key">
        <form
          className="flex flex-col w-full gap-5"
          onSubmit={handleSubmit(verifyKey)}
        >
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="apikey">
              API key
            </label>
            <input
              {...register("api-key")}
              disabled={!!apikey}
              defaultValue={apikey}
              type="password"
              id="apikey"
            />

            {isSubmitted && errors["api-key"]?.message && (
              <span className="font-light text-sm text-red-800 pl-1">
                {errors["api-key"]?.message}
              </span>
            )}
            {successMessage && (
              <span className="font-light text-sm text-green-600 pl-1">
                {successMessage}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-50 text-blue-500"
              onClick={closeModal}
            >
              Cancelar
            </button>
            {apikey ? (
              <button className="bg-blue-800" type="button" onClick={resetKey}>
                Reiniciar Token
              </button>
            ) : (
              <button type="submit">Guardar</button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
