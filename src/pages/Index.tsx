import { useState, useEffect } from "react";
import { Heart, Sun, Users, Coffee, Droplets } from "lucide-react";
import ChecklistSection from "@/components/ChecklistSection";
import ChecklistItem from "@/components/ChecklistItem";
import ProgressFlower from "@/components/ProgressFlower";
import AlertSection from "@/components/AlertSection";
import ReflectionBox from "@/components/ReflectionBox";
import { useToast } from "@/hooks/use-toast";

interface ChecklistState {
  [key: string]: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [alerts, setAlerts] = useState({
    alert1: false,
    alert2: false,
    alert3: false,
    alert4: false,
    alert5: false,
  });
  const [reflection, setReflection] = useState("");

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cuidar-de-quem-cuida");
    if (saved) {
      const data = JSON.parse(saved);
      setChecklist(data.checklist || {});
      setAlerts(data.alerts || alerts);
      setReflection(data.reflection || "");
    }
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("cuidar-de-quem-cuida", JSON.stringify({ checklist, alerts, reflection }));
  }, [checklist, alerts, reflection]);

  const handleCheckChange = (id: string, checked: boolean) => {
    setChecklist((prev) => ({ ...prev, [id]: checked }));

    if (checked) {
      toast({
        description: "Parabéns por cuidar de você! 💜",
        duration: 2000,
      });
    }
  };

  const handleAlertChange = (id: string, checked: boolean) => {
    setAlerts((prev) => ({ ...prev, [id]: checked }));
  };

  // Calcular progresso (excluindo alertas)
  const totalItems = 15; // 5 + 5 + 5 itens do checklist
  const checkedItems = Object.values(checklist).filter(Boolean).length;
  const progress = Math.round((checkedItems / totalItems) * 100);

  const personalCareItems = [
    { id: "sleep", text: "Dormi o suficiente nas últimas 24h" },
    { id: "meal", text: "Fiz ao menos uma refeição com calma" },
    { id: "water", text: "Tomei água ao longo do dia" },
    { id: "breathe", text: "Parei por 1 minuto para respirar profundamente" },
    { id: "pleasure", text: "Me permiti um pequeno prazer (um café, música, banho tranquilo)" },
  ];

  const routineItems = [
    { id: "delegate", text: "Deleguei ou pedi ajuda em alguma tarefa" },
    { id: "limits", text: "Evitei assumir mais do que consigo fazer hoje" },
    { id: "prepare", text: "Preparei algo que vai facilitar o dia de amanhã" },
    { id: "breaks", text: "Fiz pausas curtas entre as obrigações" },
    { id: "celebrate", text: "Celebrei uma pequena conquista do dia" },
  ];

  const relationshipItems = [
    { id: "talk", text: "Conversei com alguém em quem confio" },
    { id: "quality-time", text: "Passei um momento de carinho com meu(s) filho(s), sem pressa" },
    { id: "self-compassion", text: 'Disse a mim mesmo(a): "Estou fazendo o melhor que posso"' },
    { id: "gratitude", text: "Reconheci algo bom que aconteceu hoje" },
    { id: "smile", text: "Sorri ou me permiti rir — mesmo que um pouquinho" },
  ];

  const alertItems = [
    { id: "alert1", text: "Me sinto constantemente cansado(a)?" },
    { id: "alert2", text: "Tenho chorado com frequência ou sentido irritação sem motivo?" },
    { id: "alert3", text: "Tenho dificuldade de sentir prazer nas interações com meus filhos?" },
    { id: "alert4", text: "Estou me isolando de amigos ou familiares?" },
    { id: "alert5", text: "Meu corpo tem mostrado sinais (dores, insônia, palpitação)?" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Heart className="text-primary w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cuidar de Quem Cuida</h1>
              <p className="text-sm text-muted-foreground">
                Dicas para prevenir a sobrecarga emocional e o burnout parental
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Crônica introdutória */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-center text-foreground/80 italic text-lg leading-relaxed mb-12 animate-fade-in">
            "Na correria do dia, ela se esqueceu de si. Até que uma respiração profunda lembrou:
            <span className="text-primary font-semibold">
              {" "}
              cuidar de si é o primeiro gesto de amor que chega até os filhos.
            </span>
            "
          </blockquote>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
          {/* Conteúdo principal */}
          <div className="space-y-6">
            {/* Como usar */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-card animate-fade-in">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                Como usar este checklist
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Marque o que conseguiu fazer hoje — sem culpa se nem tudo estiver marcado</li>
                <li>• Leia como um lembrete gentil, não como uma lista de tarefas</li>
                <li>• Tire um momento de respiração antes de começar</li>
              </ul>
            </div>

            {/* Seção 1: Cuidado Pessoal */}
            <ChecklistSection
              title="1. Meu Cuidado Pessoal"
              subtitle="Antes de cuidar, eu preciso estar bem."
              icon={<Coffee />}
              reminder='Lembrete: "Pequenos cuidados constroem grandes forças."'
            >
              {personalCareItems.map((item) => (
                <ChecklistItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={checklist[item.id] || false}
                  onChange={(checked) => handleCheckChange(item.id, checked)}
                />
              ))}
            </ChecklistSection>

            {/* Seção 2: Rotina com Leveza */}
            <ChecklistSection
              title="2. Minha Rotina com Leveza"
              subtitle="Eu posso planejar, mas também posso ajustar."
              icon={<Sun />}
              reminder="Lembrete: Meu 'Adulto' pode equilibrar o que o 'Pai/Mãe protetor(a)' quer fazer e o que minha 'Criança' precisa sentir."
            >
              {routineItems.map((item) => (
                <ChecklistItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={checklist[item.id] || false}
                  onChange={(checked) => handleCheckChange(item.id, checked)}
                />
              ))}
            </ChecklistSection>

            {/* Seção 3: Relações e Apoio */}
            <ChecklistSection
              title="3. Minhas Relações e Apoio"
              subtitle="Eu não estou só — posso compartilhar o peso."
              icon={<Users />}
              reminder='Lembrete: "Quando acolho minhas emoções, abro espaço para a calma."'
            >
              {relationshipItems.map((item) => (
                <ChecklistItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={checklist[item.id] || false}
                  onChange={(checked) => handleCheckChange(item.id, checked)}
                />
              ))}
            </ChecklistSection>

            {/* Seção 4: Sinais de Alerta */}
            <AlertSection
              alerts={alertItems.map((item) => ({
                ...item,
                checked: alerts[item.id as keyof typeof alerts],
              }))}
              onAlertChange={handleAlertChange}
            />

            {/* Seção 5: Reflexão */}
            <ReflectionBox value={reflection} onChange={setReflection} />
          </div>

          {/* Sidebar: Flor de progresso */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ProgressFlower progress={progress} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm mt-12 py-8">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Droplets className="w-4 h-4 text-secondary" />
            Feito com cuidado para quem cuida
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-muted-foreground mb-2">
              Projeto desenvolvido para o <strong>PET Saúde da UNCISAL</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Desenvolvido pelas alunas:</strong><br />
              Vitória Manuelly Alves Ribeiro - Tecnologia em Radiologia<br />
              Daniely Evellin da Silva Vasconcelos - Sistemas para Internet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
