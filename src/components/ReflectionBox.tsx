import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ReflectionBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const ReflectionBox = ({ value, onChange }: ReflectionBoxProps) => {
  return (
    <Card className="p-6 bg-gradient-warm shadow-card animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
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
