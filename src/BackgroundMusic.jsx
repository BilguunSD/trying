import { useEffect, useRef, useState } from "react";
import "./BackgroundMusic.css";

export default function BackgroundMusic({
  src = "./assets/coloryournight.mp3",
}) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  // Keep the audio element's volume in sync with the slider
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Try to autoplay; if blocked, start on first interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "keydown", "touchstart"];

    const removeListeners = () =>
      events.forEach((e) => document.removeEventListener(e, start));

    function start() {
      audio
        .play()
        .then(removeListeners)
        .catch(() => {});
    }

    audio.play().catch(() => {
      events.forEach((e) => document.addEventListener(e, start));
    });

    return removeListeners;
  }, []);

  const icon = volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊";

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <div className="volume-control">
        <span>{icon}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
        />
      </div>
    </>
  );
}
