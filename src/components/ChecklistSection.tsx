import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ChecklistSectionProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  reminder?: string;
}

const ChecklistSection = ({ title, subtitle, icon, children, reminder }: ChecklistSectionProps) => {
  return (
    <Card className="p-6 bg-card shadow-card border-border/50 hover:shadow-gentle transition-all duration-300 animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-primary text-2xl mt-1 animate-gentle-bounce">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground italic">
            "{subtitle}"
          </p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {children}
      </div>
      
      {reminder && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-primary/80 italic">
            {reminder}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ChecklistSection;
