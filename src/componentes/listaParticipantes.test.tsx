import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from "./listaParticipantes";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const participantes = ["luiz", "joao"];

describe("lista de participantes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("deve ser renderizado sem elementos", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(0);
  });

  test("deve ser renderizado com elementos", () => {
    // sobrescreve o mock para retornar participantes
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);

    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(participantes.length);
  });
});
