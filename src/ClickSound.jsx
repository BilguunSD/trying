import { useEffect } from "react";

export default function ClickSound({ src }) {
  useEffect(() => {
    const sound = new Audio(src);

    const play = () => {
      sound.play().catch(() => {});
    };

    document.addEventListener("pointerdown", play, { once: true });

    return () => document.removeEventListener("pointerdown", play);
  }, [src]);
  return null;
}
