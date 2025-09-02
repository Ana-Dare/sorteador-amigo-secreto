import Formulario from "../componentes/Formulario";
import ListaParticipantes from "../componentes/listaParticipantes";
import Rodape from "../componentes/Rodape";
import Card from "../componentes/card";

const Configuracao = () => {
    return (
        <Card>
            <section>
                <h2>Vamos começar!</h2>
                <Formulario />
                <ListaParticipantes />
                <Rodape />
            </section>
        </Card>
    )
}

export default Configuracao;
