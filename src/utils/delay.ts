/*
 * Introduce un retraso en la ejecución
 *
 * @params ms - Tiempo en milisegundos
 * @returns Una promesa que se resuelve luego de un tiempo especificado
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
