"use client";
import React, { useEffect, useState, useCallback } from 'react';

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
 * - Cursor circular personalizado
 * - Efeito de rastro com partículas
 * - Feedback visual de clique (escala)
 * - Ocultação automática quando o mouse sai da janela
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  // Novo estado para as partículas
  const [particles, setParticles] = useState<Particle[]>([]);
  // Contador para IDs únicas das partículas
  const [particleIdCounter, setParticleIdCounter] = useState(0);

  // Função para criar e adicionar partículas
  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    // Gera um número pequeno de partículas (ex: 3 a 6)
    const numParticles = Math.floor(Math.random() * 4) + 5;

    for (let i = 0; i < numParticles; i++) {
      const id = particleIdCounter + i;
      // Define uma direção e velocidade aleatórias para cada partícula
      const angle = Math.random() * Math.PI * 2; // Ângulo em radianos (0 a 360 graus)
      const speed = Math.random() * 20 + 10; // Velocidade (distância que percorre)
      const duration = Math.random() * 0.4 + 0.3; // Duração da animação (0.3s a 0.7s)
      const size = Math.random() * 4 + 2; // Tamanho da partícula (2px a 6px)

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

    // Remove as partículas após a duração da animação para otimização
    newParticles.forEach(p => {
      setTimeout(() => {
        setParticles(prev => prev.filter(particle => particle.id !== p.id));
      }, p.duration * 1000 + 50); // Adiciona um pequeno buffer
    });
  }, [particleIdCounter]); // particleIdCounter como dependência para o useCallback

  useEffect(() => {
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
      // Cria partículas na posição do clique
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
  }, [createParticles]); // createParticles como dependência

  const cursorOpacity = isVisible ? (isClicked ? 0.5 : 1) : 0;
  const cursorScale = isClicked ? 0.8 : 1;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        // Keyframes para a animação das partículas
        @keyframes particle-fade-out {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            // O translate aqui será sobrescrito pelo estilo inline para cada partícula
          }
        }
      `}</style>

      {/* Cursor personalizado */}
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

      {/* Renderização das partículas */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#FD7B2F', // Mesma cor do cursor
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998, // Um pouco abaixo do cursor principal
            // Animação de movimento e fade out
            animation: `particle-fade-out ${p.duration}s ease-out forwards`,
            transform: `translate(
              ${Math.cos(p.angle) * p.speed}px,
              ${Math.sin(p.angle) * p.speed}px
            )`,
            // Para garantir que o translate inicial seja 0 antes da animação, 
            // a animação controlará o movimento.
            // O transform acima é o valor final para a animação.
            // Para o movimento, vamos definir via Keyframes no CSS.
            //`animation-fill-mode: forwards` vai manter o estado final do keyframe.
            // Para ter a transição suave de início até o `transform` final, 
            // precisamos definir o `transform` inicial no keyframe.
          }}
        ></div>
      ))}
    </>
  );
}