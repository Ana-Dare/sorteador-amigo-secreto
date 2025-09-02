import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe("Testes com o componente formulário", () => {
  test("quando o input esta vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    const botao = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });

  test("adicionar um perticipante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Laura",
      },
    });

    fireEvent.click(botao);

    expect(input).toHaveFocus();
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados a lsita", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Laura",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Laura",
      },
    });

    fireEvent.click(botao);

    const mensagemErro = screen.getByRole("alert");

    expect(mensagemErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("mensagem de erro deve sumir após o timer", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Laura",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Laura",
      },
    });

    fireEvent.click(botao);

    let mensagemErro = screen.queryByRole("alert");
    expect(mensagemErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemErro = screen.queryByRole("alert");
    expect(mensagemErro).toBeNull();
  });
});
