import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextToSpeechProps {
  text?: string;
  audioSrc?: string;
  className?: string;
}

const TextToSpeech = ({ text = "", audioSrc, className = "" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    const handlePause = () => {
      if (audio.ended || audio.currentTime === 0) {
        setIsPlaying(false);
        setIsPaused(false);
        return;
      }

      setIsPlaying(true);
      setIsPaused(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      audio.currentTime = 0;
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioSrc || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);

      synth.cancel();
    };
  }, []);

  const selectBestVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    const portugueseVoices = availableVoices.filter((voice) => {
      const lang = voice.lang.toLowerCase();
      return lang.startsWith("pt");
    });

    if (portugueseVoices.length === 0) return undefined;

    const scoreVoice = (voice: SpeechSynthesisVoice) => {
      const name = voice.name.toLowerCase();
      const lang = voice.lang.toLowerCase();

      let score = 0;

      if (lang.startsWith("pt-br")) score += 100;
      else if (lang.startsWith("pt")) score += 60;

      if (name.includes("natural") || name.includes("neural") || name.includes("online")) score += 30;
      if (name.includes("google") || name.includes("microsoft")) score += 15;
      if (voice.default) score += 10;

      return score;
    };

    return [...portugueseVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
  };

  const speak = async () => {
    if (audioRef.current) {
      window.speechSynthesis.cancel();
      audioRef.current.currentTime = 0;
      try {
        await audioRef.current.play();
      } catch {
        setIsPlaying(false);
        setIsPaused(false);
      }
      return;
    }

    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const bestVoice = selectBestVoice(voices);

      utterance.lang = 'pt-BR';

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.rate = 0.98;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      return;
    }

    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0) {
      void audioRef.current.play();
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!audioSrc && !("speechSynthesis" in window)) {
    return null; // Não mostrar se não suportar
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!isPlaying ? (
        <Button
          onClick={speak}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          title="Ouvir texto"
        >
          <Volume2 className="w-4 h-4" />
          <span className="sr-only">Ouvir</span>
        </Button>
      ) : (
        <div className="flex gap-1">
          {isPaused ? (
            <Button
              onClick={resume}
              variant="outline"
              size="sm"
              title="Continuar"
            >
              <Play className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={pause}
              variant="outline"
              size="sm"
              title="Pausar"
            >
              <Pause className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={stop}
            variant="outline"
            size="sm"
            title="Parar"
          >
            <VolumeX className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;