export default class Alias {
    static formatar(valor: string): string {
        return valor.replace(/ /g, '-').toLowerCase();
    }
}


// console.log(Alias.formatar('Evento de Desenvolvimento Fullstack'));