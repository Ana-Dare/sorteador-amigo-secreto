import { realizarSorteio } from "./realizarSorteio"

describe('sorteio de amigo secreto', () =>{
    test('cada participante não sorteie o próprio nome', () => {
        const participantes = [
            'Ana',
            'Laura',
            'Joana',
            'Felipe'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})