import { usePromptStore } from "@/stores/promptStore";
import Timer from "./Timer";
import clsx from "clsx";

interface FetchStatusTableProps {
  time: number;
  setTime: (time: number) => void;
  timer: boolean;
  messageResult: string;
  totalSent: number;
}
export default function FetchStatusTable({
  messageResult,
  setTime,
  time,
  timer,
  totalSent,
}: FetchStatusTableProps) {
  const { prompts } = usePromptStore();
  return (
    <table className="text-sm">
      <thead>
        <tr>
          <th className="text-start w-1/3">Tiempo</th>
          <th className="text-start w-1/3">Peticiones</th>
          <th className="text-start w-1/3">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Timer setTime={setTime} time={time} timer={timer} />
          </td>
          <td>{`${totalSent}/${prompts.length} resultados`}</td>
          <td
            className={clsx(
              messageResult == "Cancelado" || messageResult == "Cancelando..."
                ? "text-red-600"
                : messageResult == "Pendiente"
                ? "text-blue-500"
                : "text-green-500"
            )}
          >
            {messageResult}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
