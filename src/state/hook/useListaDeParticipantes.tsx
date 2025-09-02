import { useRecoilValue } from "recoil"
import { listaDeParticipanteState } from "../atom"

export const useListaDeParticipantes = () => {
    return useRecoilValue(listaDeParticipanteState)
}