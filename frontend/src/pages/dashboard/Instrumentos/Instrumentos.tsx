import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";
import InstrumentosListagem from "./components/InstrumentosListagem"

const Instrumentos = () => {
    return (
        <div>
            <BarraInicialHome />
            <InstrumentosListagem/>
        </div>
    )
}

export default Instrumentos;