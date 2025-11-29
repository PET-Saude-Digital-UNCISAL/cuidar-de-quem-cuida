import { useState } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextToSpeechProps {
  text: string;
  className?: string;
}

const TextToSpeech = ({ text, className = "" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Parar qualquer fala anterior
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
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