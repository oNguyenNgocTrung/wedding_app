"use client";

import { useState, useRef, useEffect } from "react";

const SOUNDCLOUD_URL =
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/66757544&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true";

export default function MusicPlayer() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasInteracted = useRef(false);

  // Modern browsers block autoplay until user interacts with the page.
  // We listen for the first click/touch/keydown anywhere, then start playback.
  useEffect(() => {
    const startOnInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        setPlaying(true);
      }
    };

    window.addEventListener("click", startOnInteraction, { once: true });
    window.addEventListener("touchstart", startOnInteraction, { once: true });
    window.addEventListener("keydown", startOnInteraction, { once: true });

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          if (playing) {
            setPlaying(false);
          } else {
            setPlaying(true);
          }
          setShowPlayer(!showPlayer);
        }}
        className="music-toggle"
        aria-label="Toggle music"
      >
        <svg
          className={`w-5 h-5 text-white ${playing ? "animate-pulse" : "opacity-60"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </button>

      {/* Hidden iframe that plays music as soon as user interacts with the page */}
      {playing && (
        <iframe
          src={SOUNDCLOUD_URL}
          width="0"
          height="0"
          allow="autoplay"
          title="Wedding Music"
          className={`fixed z-50 shadow-xl rounded-lg overflow-hidden transition-all ${
            showPlayer
              ? "top-16 right-4 w-72 h-80"
              : "w-0 h-0 -top-full -right-full"
          }`}
        />
      )}
    </>
  );
}
