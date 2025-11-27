/**
 * Componentes Card
 *
 * Sistema de componentes para criação de cartões flexíveis e acessíveis.
 * Fornece uma estrutura consistente para exibir conteúdo organizado em
 * seções distintas com cabeçalho, conteúdo e rodapé.
 *
 * Componentes incluídos:
 * - Card: Container principal com bordas arredondadas e sombra
 * - CardHeader: Seção de cabeçalho com espaçamento padronizado
 * - CardTitle: Título do cartão com tipografia otimizada
 * - CardDescription: Descrição secundária com cor muted
 * - CardContent: Área principal de conteúdo
 * - CardFooter: Rodapé com alinhamento flexível
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Componente Card - Container principal
 * Cria um cartão com bordas arredondadas, borda e sombra sutil
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Componente CardHeader - Cabeçalho do cartão
 * Área superior com espaçamento padronizado para títulos e descrições
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Componente CardTitle - Título do cartão
 * Elemento de cabeçalho otimizado para títulos principais
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Componente CardDescription - Descrição do cartão
 * Texto secundário com cor muted para informações complementares
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Componente CardContent - Conteúdo principal
 * Área central do cartão para o conteúdo principal
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * Componente CardFooter - Rodapé do cartão
 * Área inferior com layout flexível para ações e informações adicionais
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
