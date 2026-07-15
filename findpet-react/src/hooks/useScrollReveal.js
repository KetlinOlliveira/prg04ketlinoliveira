import { useEffect, useRef, useState } from "react";

// Detecta quando um elemento entra na tela (via IntersectionObserver) para
// disparar animações de entrada ao rolar a página. Retorna uma ref pra
// colocar no elemento e um boolean que vira true assim que ele aparece
// (só dispara uma vez, não volta a esconder ao rolar pra cima de novo).
export function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;

    if (!elemento) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.unobserve(elemento);
        }
      },
      { threshold }
    );

    observer.observe(elemento);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visivel];
}
