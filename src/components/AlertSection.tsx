import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface AlertSectionProps {
  alerts: { id: string; text: string; checked: boolean }[];
  onAlertChange: (id: string, checked: boolean) => void;
}

const AlertSection = ({ alerts, onAlertChange }: AlertSectionProps) => {
  const checkedCount = alerts.filter(a => a.checked).length;
  const showWarning = checkedCount >= 2;

  return (
    <Card className="p-6 bg-card border-destructive/20 shadow-card animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="text-destructive w-6 h-6 mt-1" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Sinais de Alerta — Pare e Observe
          </h2>
          <p className="text-sm text-muted-foreground italic">
            "Perceber é o primeiro passo para cuidar."
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3">
            <Checkbox
              id={alert.id}
              checked={alert.checked}
              onCheckedChange={(checked) => onAlertChange(alert.id, checked as boolean)}
              className="mt-1 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
            />
            <label
              htmlFor={alert.id}
              className="text-sm leading-relaxed cursor-pointer text-foreground"
            >
              {alert.text}
            </label>
          </div>
        ))}
      </div>

      {showWarning && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-scale-in">
          <p className="text-sm text-destructive font-medium">
            ⚠️ Você marcou {checkedCount} sinais de alerta.
          </p>
          <p className="text-sm text-foreground mt-2">
            Procure apoio psicológico ou grupos de suporte familiar. 
            Cuidar de você também é cuidar da sua família.
          </p>
        </div>
      )}
    </Card>
  );
};

export default AlertSection;
