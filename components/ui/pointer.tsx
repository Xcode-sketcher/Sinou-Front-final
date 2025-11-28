"use client";
import React, { useEffect, useState, useCallback } from 'react';

/**
 * Interface que define a estrutura de uma partícula de efeito visual
 */
interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  duration: number;
  size: number;
}

/**
 * Componente CustomCursor
 *
 * Cursor personalizado que substitui o ponteiro padrão do mouse.
 * Adiciona efeitos visuais interativos como partículas e mudanças de estado
 * ao clicar ou passar sobre elementos.
 *
 * Funcionalidades:
 * - Cursor circular personalizado com cores da marca Sinout
 * - Efeito de partículas explosivas ao clicar
 * - Feedback visual de clique (redução de escala e opacidade)
 * - Ocultação automática quando o mouse sai da janela
 * - Desativação automática em dispositivos touch/mobile
 *
 * @returns JSX.Element | null - Retorna null em dispositivos móveis/touch
 */
export default function CustomCursor() {
  /**
   * Estado que controla se o cursor personalizado está habilitado.
   * Apenas dispositivos com pointer fino (mouse) e suporte a hover são habilitados.
   */
  const [isEnabled, setIsEnabled] = useState(false);

  /** Posição atual do cursor (coordenadas X e Y) */
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /** Controla a visibilidade do cursor (oculto quando o mouse sai da janela) */
  const [isVisible, setIsVisible] = useState(false);

  /** Estado de clique ativo (usado para efeito de escala) */
  const [isClicked, setIsClicked] = useState(false);

  /** Array de partículas ativas para o efeito de explosão */
  const [particles, setParticles] = useState<Particle[]>([]);

  /** Contador incremental para gerar IDs únicas das partículas */
  const [particleIdCounter, setParticleIdCounter] = useState(0);

  /**
   * Função responsável por criar e adicionar partículas no efeito de clique.
   * Gera entre 5 e 8 partículas com propriedades aleatórias de direção,
   * velocidade, duração e tamanho.
   *
   * @param x - Coordenada X do ponto de origem (posição do clique)
   * @param y - Coordenada Y do ponto de origem (posição do clique)
   */
  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    const numParticles = Math.floor(Math.random() * 4) + 5;

    for (let i = 0; i < numParticles; i++) {
      const id = particleIdCounter + i;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 20 + 10;
      const duration = Math.random() * 0.4 + 0.3;
      const size = Math.random() * 4 + 2;

      newParticles.push({
        id: id,
        x: x,
        y: y,
        angle: angle,
        speed: speed,
        duration: duration,
        size: size,
      });
    }

    setParticles((prevParticles) => [...prevParticles, ...newParticles]);
    setParticleIdCounter((prevCounter) => prevCounter + numParticles);

    // Remove as partículas após a animação para otimização de memória
    newParticles.forEach(p => {
      setTimeout(() => {
        setParticles(prev => prev.filter(particle => particle.id !== p.id));
      }, p.duration * 1000 + 50);
    });
  }, [particleIdCounter]);

  /**
   * Efeito para detectar se o dispositivo suporta pointer fino (mouse).
   * Desabilita o cursor personalizado em dispositivos touch/mobile.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const isTouch = 'ontouchstart' in window || (window as unknown as { ontouchstart?: unknown }).ontouchstart !== undefined;
    setIsEnabled(mq.matches && !isTouch);

    const handler = (e: MediaQueryListEvent) => {
      setIsEnabled(e.matches && !isTouch);
    };

    // Adiciona listener com fallback para navegadores antigos
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if ((mq as MediaQueryList & { addListener?: (callback: (e: MediaQueryListEvent) => void) => void }).addListener) {
      (mq as MediaQueryList & { addListener: (callback: (e: MediaQueryListEvent) => void) => void }).addListener(handler);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else if ((mq as MediaQueryList & { removeListener?: (callback: (e: MediaQueryListEvent) => void) => void }).removeListener) {
        (mq as MediaQueryList & { removeListener: (callback: (e: MediaQueryListEvent) => void) => void }).removeListener(handler);
      }
    };
  }, []);

  /**
   * Efeito para registrar os event listeners de movimento e clique do mouse.
   * Apenas executa quando o cursor está habilitado (dispositivos desktop).
   */
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      createParticles(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isEnabled, createParticles]);

  // Não renderiza nada em dispositivos móveis/touch
  if (!isEnabled) return null;

  // Calcula opacidade e escala baseado no estado atual
  const cursorOpacity = isVisible ? (isClicked ? 0.5 : 1) : 0;
  const cursorScale = isClicked ? 0.8 : 1;

  return (
    <>
      {/* Estilos globais para ocultar o cursor padrão do sistema */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @keyframes particle-fade-out {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>

      {/* Elemento visual do cursor personalizado */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: cursorOpacity,
          transition: 'opacity 0.2s ease, transform 0.1s ease',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill="#FD7B2F" />
          <circle cx="24.5" cy="24.5" r="12.5" fill="white" />
        </svg>
      </div>

      {/* Partículas do efeito de clique */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#FD7B2F',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            animation: `particle-fade-out ${p.duration}s ease-out forwards`,
            transform: `translate(
              ${Math.cos(p.angle) * p.speed}px,
              ${Math.sin(p.angle) * p.speed}px
            )`,
          }}
        />
      ))}
    </>
  );
}