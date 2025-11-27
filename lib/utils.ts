import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Função utilitária para combinação otimizada de classes CSS
 *
 * Esta função combina múltiplas classes CSS de forma inteligente,
 * resolvendo conflitos entre utilitários Tailwind CSS e garantindo
 * que apenas as classes necessárias sejam aplicadas.
 *
 * Funcionalidades principais:
 * - Combinação de classes usando clsx para lógica condicional
 * - Resolução de conflitos Tailwind com twMerge
 * - Type safety completo com TypeScript
 * - Otimização automática do CSS final
 *
 * @param inputs - Array de valores que podem ser strings, objetos ou arrays de classes CSS
 * @returns String otimizada contendo todas as classes CSS válidas sem conflitos
 *
 * @example
 * ```tsx
 * // Uso básico
 * <div className={cn("text-red-500", "bg-blue-500")} />
 *
 * // Com condições
 * <div className={cn(
 *   "base-class p-4",
 *   isActive && "bg-blue-500 text-white",
 *   size === "large" && "text-lg p-6"
 * )} />
 *
 * // Com objetos condicionais
 * <div className={cn({
 *   "text-red-500": hasError,
 *   "text-green-500": isSuccess,
 *   "font-bold": isImportant
 * })} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
