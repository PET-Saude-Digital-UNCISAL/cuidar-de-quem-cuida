import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";

interface ReflectionBoxProps {
  value: string;
  onChange: (value: string) => void;
  audioText?: string;
  audioSrc?: string;
}

const ReflectionBox = ({ value, onChange, audioText, audioSrc }: ReflectionBoxProps) => {
  return (
    <Card className="p-6 bg-gradient-warm shadow-card animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <Sparkles className="text-accent w-6 h-6 mt-1 animate-float" />
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Espaço para Reflexão da Semana
            </h2>
            <p className="text-sm text-muted-foreground">
              O que quero fazer por mim nos próximos dias:
            </p>
          </div>
        </div>
        {(audioText || audioSrc) && <TextToSpeech text={audioText} audioSrc={audioSrc} className="mt-1" />}
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva aqui seus pensamentos, desejos ou planos para se cuidar melhor..."
        className="min-h-[120px] bg-white/80 border-accent/30 focus:border-accent resize-none"
      />
    </Card>
  );
};

export default ReflectionBox;
