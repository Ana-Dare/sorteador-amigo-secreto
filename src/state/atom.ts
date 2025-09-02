import { atom } from "recoil";

export const listaDeParticipanteState = atom<string[]>({
  key: "listaDeParticipanteState",
  default: [],
});

export const erroState = atom<string>({
  key: "erroState",
  default:'',
});
