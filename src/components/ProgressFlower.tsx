import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressFlowerProps {
  progress: number;
}

const ProgressFlower = ({ progress }: ProgressFlowerProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);

  const getFlowerState = () => {
    if (displayProgress === 0) return "seed";
    if (displayProgress < 30) return "sprout";
    if (displayProgress < 60) return "growing";
    if (displayProgress < 90) return "blooming";
    return "full-bloom";
  };

  const flowerState = getFlowerState();

  return (
    <div className="sticky top-8 bg-gradient-calm rounded-2xl p-6 shadow-gentle">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Flor que cresce baseada no progresso */}
          <div className="absolute inset-0 flex items-end justify-center">
            {/* Caule */}
            <div 
              className={cn(
                "w-2 bg-secondary transition-all duration-700 rounded-t-full",
                flowerState === "seed" ? "h-0" : "h-16"
              )}
            />
          </div>
          
          {/* Pétalas */}
          <div className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-700",
            flowerState === "seed" && "scale-0 opacity-0",
            flowerState === "sprout" && "scale-50 opacity-50",
            flowerState === "growing" && "scale-75 opacity-75",
            flowerState === "blooming" && "scale-90 opacity-90",
            flowerState === "full-bloom" && "scale-100 opacity-100 animate-bloom"
          )}>
            <div className="relative w-24 h-24">
              {/* Pétalas em círculo */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-8 h-12 bg-primary rounded-full origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                  }}
                />
              ))}
              {/* Centro da flor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">
            {displayProgress}%
          </div>
          <div className="text-sm text-white/90">
            {flowerState === "seed" && "Comece sua jornada de autocuidado"}
            {flowerState === "sprout" && "Você está plantando sementes de bem-estar"}
            {flowerState === "growing" && "Seu cuidado está florescendo"}
            {flowerState === "blooming" && "Quase lá! Continue cuidando de você"}
            {flowerState === "full-bloom" && "Você se cuidou hoje! ✨"}
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-4">
            <div 
              className="h-full bg-white transition-all duration-700 rounded-full"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressFlower;
