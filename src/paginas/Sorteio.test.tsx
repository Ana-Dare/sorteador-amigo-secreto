import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Sorteio from "./Sorteio";

const mockNavegacao = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

jest.mock("../state/hook/useListaDeParticipantes");

describe("pagian de sorteio", () => {
  const participantes = ["ana", "clara", "julia", "tais"];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });

  test("todos os participantes podem exibir seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio/>
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole("option");
    expect(opcoes).toHaveLength(participantes.length);
  });
});
