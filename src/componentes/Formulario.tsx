import { useRef, useState } from "react";
import styled from "styled-components";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemErro } from "../state/hook/useMensagemErro";

const Button = styled.button<{ $primary?: boolean }>`
  --accent-color: #170101;

  /* This renders the buttons above... Edit me! */
  background: #877d7d;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }
  ${(props) =>
    props.$primary &&
    `
      background: var(--accent-color);
      color: black;
    `}
`;

const Formulario = () => {
  const [nome, setNome] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  const mensagemErro = useMensagemErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticipante}>
      <input
        ref={inputRef}
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        type="text"
        placeholder="Inisira os nomes dos participantes"
      />
      <Button disabled={!nome}>Adicionar</Button>
      {mensagemErro && <p role="alert">{mensagemErro}</p>}
    </form>
  );
};

export default Formulario;
