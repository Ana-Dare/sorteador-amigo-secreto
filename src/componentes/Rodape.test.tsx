import { screen, render, fireEvent } from "@testing-library/react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

jest.mock("../state/hook/useSorteador", () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

describe("quantidade de participantes", () => {
  test("menor que 3 deve desabilitar o botão", () => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("maior ou igual a 3 deve habilitar o botão", () => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      "ana",
      "clara",
      "livia",
      "laura",
    ]);
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  test("a brincadeira foi iniciada", () => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      "ana",
      "clara",
      "livia",
    ]); // >=3 para habilitar o botão

    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith("/sorteio");
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
