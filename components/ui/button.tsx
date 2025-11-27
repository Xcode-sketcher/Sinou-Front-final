/**
 * Componente Button
 *
 * Botão versátil e acessível baseado no design system Shadcn/ui.
 * Suporta múltiplas variantes visuais, tamanhos e estados, com foco
 * na acessibilidade e experiência do usuário.
 *
 * Funcionalidades principais:
 * - Múltiplas variantes (default, destructive, outline, secondary, ghost, link)
 * - Diferentes tamanhos (sm, default, lg, icon)
 * - Suporte a Radix Slot para composição
 * - Estados de foco e hover acessíveis
 * - Desabilitação automática com opacidade reduzida
 * - Transições suaves entre estados
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/**
 * Propriedades do componente Button
 * Extende as propriedades nativas do HTMLButtonElement e variantes do CVA
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  /** Se true, renderiza o conteúdo filho como elemento raiz usando Radix Slot */
  asChild?: boolean
}

/**
 * Componente Button com forwardRef para acesso ao elemento DOM
 * Utiliza composição com Radix Slot quando asChild é true
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determina se usar Slot do Radix ou elemento button nativo
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
