"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// CONFIGURACIÓN DE MÚSICA EN BUCLE
const MUSIC_CONFIG = {
  title: "Welcome Chris — Andrea Guerra",
  youtubeId: "y2OfE-RBuJ8",
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytPlayerRef = useRef<any>(null);

  // Animación de entrada suave al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Inicialización de YouTube IFrame API con Autoplay y Bucle automático
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        new window.YT.Player("youtube-bg-player", {
          height: "200",
          width: "200",
          videoId: MUSIC_CONFIG.youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: MUSIC_CONFIG.youtubeId,
            playsinline: 1,
            enablejsapi: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              ytPlayerRef.current = event.target;
              try {
                event.target.playVideo();
              } catch (_) {}
            },
            onStateChange: (event: any) => {
              if (event.data === 1) setIsPlaying(true);
              if (event.data === 2) setIsPlaying(false);
              if (event.data === 0) {
                // Bucle infinito garantizado
                try {
                  event.target.playVideo();
                } catch (_) {}
              }
            },
          },
        });
      } catch (err) {
        console.error("Error initializing YouTube Player:", err);
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(tag, firstScript);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    // Desbloqueo automático al primer toque/scroll (Safari, iOS y Android)
    const unlockAutoplay = () => {
      const player = ytPlayerRef.current;
      if (player && typeof player.playVideo === "function") {
        try {
          player.playVideo();
        } catch (_) {}
      }
    };

    window.addEventListener("click", unlockAutoplay, { once: true });
    window.addEventListener("touchstart", unlockAutoplay, { once: true });
    window.addEventListener("scroll", unlockAutoplay, { once: true });

    return () => {
      window.removeEventListener("click", unlockAutoplay);
      window.removeEventListener("touchstart", unlockAutoplay);
      window.removeEventListener("scroll", unlockAutoplay);
    };
  }, []);

  const toggleMusic = () => {
    const player = ytPlayerRef.current;
    if (!player) return;

    try {
      if (isPlaying) {
        if (typeof player.pauseVideo === "function") {
          player.pauseVideo();
        }
        setIsPlaying(false);
      } else {
        if (typeof player.playVideo === "function") {
          player.playVideo();
        }
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error controlando música:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#EAE2D7] relative">
      {/* Reproductor de YouTube invisible en segundo plano */}
      <div className="fixed -bottom-96 -right-96 w-64 h-64 opacity-0 pointer-events-none overflow-hidden">
        <div id="youtube-bg-player"></div>
      </div>

      {/* BOTÓN FLOTANTE MINIMALISTA DE CONTROL */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-stone-200/80 shadow-[0_8px_25px_rgba(28,25,23,0.08)] hover:shadow-[0_12px_30px_rgba(28,25,23,0.12)] transition-all duration-300 hover:scale-[1.02] text-stone-800"
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-stone-700 animate-pulse h-full"></span>
              <span className="w-0.5 bg-stone-700 animate-pulse h-2"></span>
              <span className="w-0.5 bg-stone-700 animate-pulse h-3"></span>
            </div>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-stone-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
          <span className="font-sans text-[11px] tracking-wide text-stone-700">
            {isPlaying ? MUSIC_CONFIG.title : "Tocar música"}
          </span>
        </button>
      </div>

      {/* 1. INTRODUCCIÓN */}
      <section className="min-h-screen flex flex-col justify-between items-center px-6 py-16 sm:py-24 text-center">
        <span className="text-[11px] uppercase tracking-[0.35em] text-stone-400 font-sans">
          Para Ali
        </span>

        <div className="max-w-xl mx-auto space-y-4 my-auto animate-fade-in">
          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-light text-stone-900 leading-[1.15] tracking-tight">
            Feliz cumpleaños, Ali.
          </h1>
          <p className="font-sans text-stone-500 text-sm sm:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed">
            La niña que fuiste, las raíces que te cuidan y la mujer increíble que eres hoy.
          </p>
        </div>

        <div className="animate-pulse-slow flex flex-col items-center gap-2 text-stone-400">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans">
            Desliza
          </span>
          <svg
            className="w-4 h-4 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* 2. LA PROTAGONISTA: LA PEQUEÑA ALI (Foto 01) */}
      <section className="fade-up px-6 py-20 sm:py-32 max-w-3xl mx-auto">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_20px_50px_rgba(28,25,23,0.06)]">
          <Image
            src="/photos/01.jpg"
            alt="Ali de pequeña sonriendo en el jardín"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center transition-transform duration-1000 hover:scale-[1.01]"
          />
        </div>
        <div className="mt-8 text-center sm:text-left">
          <p className="font-serif italic text-2xl sm:text-3xl text-stone-800">
            La misma sonrisa intacta.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-sans mt-2">
            Desde niña ya tenías esa luz capaz de iluminarlo todo
          </p>
        </div>
      </section>

      {/* 3. CAPÍTULO I: TRAVESURAS, ESTILO Y ESPONTANEIDAD (Fotos 07, 10, 09) */}
      <section className="px-6 py-20 sm:py-32 max-w-4xl mx-auto space-y-32 sm:space-y-44">
        {/* Foto 07: Trampolín con lentes de flores */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/07.jpg"
                alt="Ali de pequeña con gafas de flores en el trampolín"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              Personalidad
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
              Esa personalidad tan tuya, auténtica y libre desde el primer día.
            </p>
          </div>
        </div>

        {/* Foto 10: Pose de modelo en traje de baño */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:order-1 order-2 md:pr-4 space-y-3 md:text-right">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              Actitud Única
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
              Toda una reina desde pequeña, con esa chispa y gracia inigualables.
            </p>
          </div>
          <div className="md:col-span-7 md:order-2 order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/10.jpg"
                alt="Ali posando divertida con las manos en la cintura"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Foto 09: Carita pintada */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/09.jpg"
                alt="Ali de pequeña con carita pintada"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              Inocencia
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
              La ternura y la mirada curiosa que todavía viven intactas en tus ojos.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CAPÍTULO II: TUS RAÍCES, TU FAMILIA (Fotos 06, 02, 11, 03) */}
      <section className="px-6 py-24 sm:py-36 max-w-4xl mx-auto space-y-28 sm:space-y-40">
        <div className="fade-up text-center max-w-lg mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans">
            Herencia de Amor
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-stone-900 mt-2">
            Tus raíces, tu lugar seguro
          </h2>
        </div>

        {/* Foto 06: Mamá cargándola de bebé */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/06.jpg"
                alt="Mamá cargando a Ali de bebé en brazos"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-4 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              En sus brazos
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed">
              Los primeros abrazos de mamá, donde todo comenzó a construirse con cariño infinito.
            </p>
          </div>
        </div>

        {/* Foto 02: Con Papá en el fútbol */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:order-1 order-2 md:pr-4 space-y-2 md:text-right">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              Con Papá
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed">
              La protección y el orgullo en los ojos de papá, cuidando cada uno de tus pasos.
            </p>
          </div>
          <div className="md:col-span-7 md:order-2 order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/02.jpg"
                alt="Ali de pequeña abrazando a su papá"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Foto 11: Con su hermano Poncho */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/11.jpg"
                alt="Ali junto a su hermano Poncho, de pequeños y de grandes"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-4 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
              Hermanos
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
              Con Poncho.
            </p>
            <p className="font-sans text-stone-600 text-sm font-light leading-relaxed">
              Quien ha estado contigo en cada etapa, creciendo a tu lado, cuidándote siempre y siendo ese refugio y cómplice incondicional de vida.
            </p>
          </div>
        </div>

        {/* Foto 03: Con Mamá ya grandes */}
        <div className="fade-up max-w-xl mx-auto space-y-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_20px_50px_rgba(28,25,23,0.06)]">
            <Image
              src="/photos/03.jpg"
              alt="Ali y su mamá sonriendo juntas"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="text-center space-y-1">
            <p className="font-serif italic text-xl sm:text-2xl text-stone-800">
              Complicidad que no cambia con el tiempo.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans">
              Dos miradas, el mismo amor incondicional
            </p>
          </div>
        </div>
      </section>

      {/* 5. CAPÍTULO III: HUELLAS EN EL CORAZÓN (Fotos 08 y 04) */}
      <section className="px-6 py-24 sm:py-36 max-w-4xl mx-auto">
        <div className="fade-up text-center mb-16 max-w-md mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans">
            Compañeros de Vida
          </span>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-stone-800 mt-2">
            El amor más leal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-start">
          {/* Foto 08: Jacke (En memoria) */}
          <div className="fade-up space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/08.jpg"
                alt="Ali abrazando con amor a Jacke"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
                Siempre en el corazón
              </span>
              <p className="font-serif italic text-lg text-stone-800">
                Para Jacke.
              </p>
              <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                El amor más puro nunca se va; se queda grabado en cada recuerdo y te acompaña siempre desde un lugar de paz.
              </p>
            </div>
          </div>

          {/* Foto 04: Gorda (La consentida) */}
          <div className="fade-up space-y-4 md:pt-12">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_16px_40px_rgba(28,25,23,0.05)]">
              <Image
                src="/photos/04.jpg"
                alt="Gorda descansando boca arriba con carita graciosa"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-sans block">
                La Consentida
              </span>
              <p className="font-serif italic text-lg text-stone-800">
                Y la Gorda.
              </p>
              <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                Con sus locuras, su ternura sin filtro y esa forma tan suya de sacarte una sonrisa en cualquier día normal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAPÍTULO IV: TÚ, HOY (Foto 05) */}
      <section className="fade-up px-6 py-24 sm:py-36 max-w-2xl mx-auto text-center space-y-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-stone-400 font-sans">
          El Presente
        </span>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 shadow-[0_24px_60px_rgba(28,25,23,0.08)]">
          <Image
            src="/photos/05.jpg"
            alt="Ali sonriendo en calma durante nuestra cita"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-cover"
          />
        </div>
        <div className="space-y-2 pt-2">
          <p className="font-serif italic text-2xl sm:text-3xl text-stone-900 leading-snug">
            La mujer maravillosa en la que te has convertido.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-sans">
            Paz, dulzura y la certeza de estar en el lugar correcto
          </p>
        </div>
      </section>

      {/* 7. MENSAJE (Carta Romántica & Agradecimiento) */}
      <section className="fade-up px-6 py-28 sm:py-36 max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-stone-900 font-light tracking-tight mb-8">
          Gracias por existir.
        </h2>
        <div className="space-y-6 text-stone-600 font-serif text-lg sm:text-xl leading-relaxed font-light">
          <p>
            Amo conocer a la niña que fuiste, a la familia que te dio tanto amor y valores, y la ternura infinita con la que cuidas a tus perritos y a los que amas.
          </p>
          <p>
            Todo lo que has vivido te trajo hasta aquí, convertida en la persona más dulce, noble e increíble que conozco. Caminar a tu lado y verte sonreír en la calma de cualquier día es mi mayor fortuna.
          </p>
          <p className="italic text-stone-800 pt-4">
            Deseo que este nuevo año de vida te devuelva multiplicado todo el amor, la paz y la felicidad que tú le das al mundo.
          </p>
        </div>
      </section>

      {/* 8. FINAL ELEGANTE */}
      <section className="fade-up px-6 pt-12 pb-32 sm:pb-40 max-w-xl mx-auto text-center space-y-3">
        <p className="font-serif text-3xl sm:text-4xl text-stone-900 leading-snug">
          Feliz cumpleaños, Ali <span className="text-[#8E3B3B]">❤️</span>
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-stone-400 font-sans">
          Hoy y siempre
        </p>
      </section>
    </main>
  );
}
