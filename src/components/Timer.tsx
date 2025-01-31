"use client";
import { useEffect, useRef } from "react";

interface Props {
  timer: boolean;
  time: number;
  setTime: (time: number) => void;
}
const Timer = ({ timer, time, setTime }: Props) => {
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (timer) {
      // Inicia el temporizador
      counterRef.current = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (counterRef.current) {
      // Pausa el temporizador
      clearInterval(counterRef.current);
      counterRef.current = null;
    }

    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, [timer, time, setTime]);

  // Función para formatear el tiempo
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
  };

  return (
    <div className="timer">
      <div className="time">
        <p>{formatTime(time)}</p>
      </div>
    </div>
  );
};

export default Timer;
