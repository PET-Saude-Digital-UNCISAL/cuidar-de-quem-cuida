import { useEffect, useState } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextToSpeechProps {
  text: string;
  className?: string;
}

const TextToSpeech = ({ text, className = "" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const selectBestVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    if (availableVoices.length === 0) return undefined;

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

    return [...availableVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Parar qualquer fala anterior
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const bestVoice = selectBestVoice(voices);

      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang;
      } else {
        utterance.lang = 'pt-BR';
      }

      utterance.rate = 0.95;
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
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!('speechSynthesis' in window)) {
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