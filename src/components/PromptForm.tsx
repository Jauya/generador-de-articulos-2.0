"use client";

import { configSite } from "@/config/site";
import { usePromptStore } from "@/stores/promptStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Accordion from "./ui/Accordion";
import { useArticleStore } from "@/stores/articlestore";
import { generateContent } from "@/actions/geminiActions";
import clsx from "clsx";
import { useApikeyStore } from "@/stores/apikeyStore";
import { delay } from "@/utils/delay";
import { json2csv } from "json-2-csv";
import { MagicWand01Icon } from "hugeicons-react";
import FetchStatusTable from "./FetchStatusTable";
import TextareaField from "./TextareaField";

// Validacion de campos
const formSchema = z.object({
  promptTemplate: z
    .string()
    .min(10, "La plantilla debe de tener como minimo 10 caracteres"),
  keywords: z
    .string()
    .min(3, "Las keywords deben de tener almenos 3 caracteres")
    .regex(
      /^[^<>&"]*$/,
      "Las Keywords no pueden contener caracteres especiales"
    ),
  delayTime: z
    .number()
    .int("El valor debe ser un número entero") // Asegura que no sea flotante
    .min(6000, "El tiempo mínimo permitido es 6000 ms"), // Mínimo 5000ms
});

//Se infiere el tipo  de formSchema
type FormData = z.infer<typeof formSchema>;

export default function PromptForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const promptTemplate = watch("promptTemplate");
  const keywords = watch("keywords");
  const delayTime = watch("delayTime");

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const [messageResult, setMessageResult] = useState("");
  const [totalSent, setTotalSent] = useState(0);
  const cancelRequested = useRef(false);

  const { addArticle, clearArticles, articles } = useArticleStore();
  const { addPrompts, prompts, isSending, setIsSending } = usePromptStore();
  const { apikey } = useApikeyStore();

  useEffect(() => {
    const promptArray: string[] = [];
    if (promptTemplate && keywords.trim()) {
      const keywordArray = keywords
        .split("\n")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);

      keywordArray.map((keyword) => {
        const prompt = promptTemplate.replace("KEYWORD", keyword);
        promptArray.push(prompt);
      });
    }
    addPrompts(promptArray);
  }, [keywords, promptTemplate, addPrompts]);

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelRequested.current = true;
    setIsSending(false);
    setMessageResult("Cancelando...");
  };

  const onSubmit = async () => {
    cancelRequested.current = false;
    clearArticles();
    setTotalSent(0);
    setTimer(true);
    setTime(0);
    setMessageResult("Pendiente");
    setIsSending(true);
    try {
      const articlesResponse = prompts.map(async (prompt, index) => {
        await delay(delayTime * index);
        if (cancelRequested.current) throw new Error("Cancelado");
        const article = await generateContent(prompt, apikey);
        if (cancelRequested.current) throw new Error("Cancelado");
        addArticle(article.data);
        setTotalSent((prev) => prev + 1);
      });
      await Promise.all(articlesResponse);
      if (cancelRequested.current) throw new Error("Cancelado");

      setMessageResult("Completado!");
    } catch (error) {
      if (error instanceof Error) {
        setMessageResult(error.message);
      }
      setTimer(false);
    } finally {
      setIsSending(false);
      setTimer(false);
    }
  };

  const downloadCSV = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const csv = json2csv(articles, {
        delimiter: {
          wrap: "",
        },
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      console.log(link);
      const url = URL.createObjectURL(blob);
      console.log(url);
      link.setAttribute("href", url);
      link.setAttribute("download", "articles.csv");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 justify-between h-full"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          <TextareaField
            id="promptTemplate"
            label="Plantilla del prompt"
            register={register}
            isTextarea
            disabled={isSending || !apikey}
            defaultValue={configSite.defaultPrompt}
            errorMessage={errors.promptTemplate}
            required
          />
          <TextareaField
            id="keywords"
            label="Palabras clave -"
            extraLabel="keyword"
            register={register}
            isTextarea
            disabled={isSending || !apikey}
            errorMessage={errors.keywords}
            required
          />
        </div>
        <div>
          <TextareaField
            id="delayTime"
            label="Delay (ms)"
            defaultValue={6000}
            register={register}
            disabled={isSending || !apikey}
            errorMessage={errors.delayTime}
            required
          />
        </div>
        <Accordion title="Prompts generados">
          <ul
            className={clsx(
              "grid 2xl:grid-cols-3 xl:grid-cols-2 text-xs gap-2",
              prompts.length == 0 ? "" : "p-2 "
            )}
          >
            {prompts.map((prompt, i) => (
              <li className="p-2 rounded-lg bg-blue-100 text-blue-900" key={i}>
                {prompt}
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
      <div className="flex flex-col gap-5 bg-gradient-to-t from-white from-80% to-transparent sticky bottom-0 py-4">
        <div className="flex flex-col gap-1">
          <FetchStatusTable
            messageResult={messageResult}
            setTime={setTime}
            time={time}
            timer={timer}
            totalSent={totalSent}
          />
          <hr />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              className="disabled:saturate-50 flex justify-between items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-blue-500/50"
              type="submit"
              disabled={isSending || !apikey}
            >
              Generar <MagicWand01Icon />
            </button>
            {isSending && (
              <button
                onClick={handleCancel}
                type="button"
                className="bg-blue-50 text-blue-500"
              >
                Cancelar
              </button>
            )}
          </div>
          <button
            className="bg-emerald-600"
            type="button"
            onClick={downloadCSV}
          >
            Descargar CSV
          </button>
        </div>
      </div>
    </form>
  );
}
