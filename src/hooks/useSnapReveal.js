import { useEffect, useRef } from 'react';

export function useSnapReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Esperar al próximo frame para que el DOM esté listo
    requestAnimationFrame(() => {
      if (!element) return;

      // Estado inicial
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)'; // Distancia que sube (más = más dramático)
      element.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Duración (0.2s = rápido, 0.4s = más calmado)


      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            observer.unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(element);
    });
  }, []);

  return ref;
}