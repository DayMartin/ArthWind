import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";
import CalendarioPrincipal from "./dashboard/CalendarioPrincipal/CalendarioPrincipal";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/router";
import { Activity } from "@/shared/interfaces/EventoInterface";

const mockActivities: Activity[] = [
  { id: '1', title: 'Reunião', date: '2024-11-01' },
  { id: '2', title: 'Almoço com Cliente', date: '2024-11-01' },
];

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login/Login");
    } else {
      const fetchActivities = async () => {
        try {
          setActivities(mockActivities);
        } catch (err) {
          setError('Erro ao carregar as atividades');
        } finally {
          setLoading(false);
        }
      };

      fetchActivities();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <BarraInicialHome />
      <CalendarioPrincipal activities={activities} />
    </div>
  );
}
