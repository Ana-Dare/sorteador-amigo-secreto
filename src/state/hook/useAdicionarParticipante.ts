import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { erroState, listaDeParticipanteState } from "../atom";

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaDeParticipanteState);
  const lista = useRecoilValue(listaDeParticipanteState);
  const setErro = useSetRecoilState(erroState);
  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro("Nomes duplicados não são permitidos!");
      setTimeout(() => {
        setErro("");
      }, 5000);
    }

    return setLista((listaAtual) => [...listaAtual, nomeDoParticipante]);
  };
};
