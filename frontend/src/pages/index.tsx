import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";
import  CustomCalendar  from "./dashboard/calendario_principal/CustomCalendar";

const mockActivities = [
  { id: '1', title: 'Reunião', date: '2024-11-01' },
  { id: '2', title: 'Almoço com Cliente', date: '2024-11-01' },
];


export default function Home() {
  return (
    <div>
      <BarraInicialHome
      />
      <CustomCalendar activities={mockActivities} />
    </div>
  );
}
