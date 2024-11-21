import Evento from "../model/Evento";

export default function complementarEvento(evento: Partial<Evento>): string[] {
    const erros: string[] = [];

    if (!evento.alias) {
        erros.push('Alias é obrigatorio.');
    }

    if (!evento.nome) {
        erros.push('Nome é obrigatorio.');
    }

    if (!evento.data) {
        erros.push('Data é obrigatoria.');
    }

    if (!evento.local) {
        erros.push('Local é obrigatorio.');
    }

    if (!evento.publicoEsperado || evento.publicoEsperado < 1) {
        erros.push('Público esperado é obrigatorio.');
    }

    if (!evento.imagem) {
        erros.push('Imagem é obrigatorio.');
    }

    if (!evento.imagemBackground) {
        erros.push('Imagem de fundo é obrigatorio.');
    }

    return erros;
}