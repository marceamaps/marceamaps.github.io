import React, { useState, useRef } from "react";
import { Volume2 } from "lucide-react";

interface AudioPronunciationProps {
  text: string;
  audioSrc: string;
}

export default function AudioPronunciation({
  text,
  audioSrc,
}: AudioPronunciationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <button
        onClick={handlePlay}
        className="group flex items-center gap-2 px-0 py-4 rounded-md transition-all cursor-pointer focus:outline-none focus-visible:outline-none"
        aria-label="Play pronunciation"
      >
        <span className="text-gray-600 font-medium">{text}</span>

        <div className="relative">
          <Volume2
            className={`w-5 h-5 text-blue-600 transition-all ${isPlaying ? "scale-110" : ""}`}
          />

          {isPlaying && (
            <>
              <span className="absolute -inset-3 rounded-full border-2 border-blue-400 opacity-60 animate-ping" />
              <span className="absolute -inset-2 rounded-full border-2 border-blue-400 opacity-40 animate-pulse" />
            </>
          )}
        </div>
      </button>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        src={audioSrc}
      />
    </>
  );
}
