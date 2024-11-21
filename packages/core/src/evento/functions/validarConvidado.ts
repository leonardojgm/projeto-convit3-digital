import Convidado from "../model/Convidado";

export default function validarConvidado(convidado: Partial<Convidado>): string[] {
    const erros: string[] = [];

    if (!convidado.nome) {
        erros.push('Nome é obrigatorio');
    }

    if (!convidado.email) { 
        erros.push('E-mail é obrigatorio');
    }    

    return erros;
}