import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";
import { BarraMusicos } from "./components/BarraMusicos";
import MusicosListagem from "./components/MusicosListagem"

const Musicos = () => {
    return (
        <div>
            <BarraInicialHome />
            <MusicosListagem/>
        </div>
    )
}

export default Musicos;