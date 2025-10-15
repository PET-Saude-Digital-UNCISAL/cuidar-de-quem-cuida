import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  id: string;
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ChecklistItem = ({ id, text, checked, onChange }: ChecklistItemProps) => {
  return (
    <div className="flex items-start gap-3 group">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <label
        htmlFor={id}
        className={cn(
          "text-sm leading-relaxed cursor-pointer transition-all duration-300",
          checked 
            ? "text-muted-foreground line-through opacity-70" 
            : "text-foreground group-hover:text-primary"
        )}
      >
        {text}
      </label>
    </div>
  );
};

export default ChecklistItem;
