import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { complementarConvidado, complementarEvento, Convidado, Data, Evento, eventos, Id } from 'core';
import { EventoPrisma } from './evento.prisma';

@Controller('eventos')
export class EventosController {
    constructor(readonly repo: EventoPrisma) {}
    
    @Post()
    async salvarEvento(@Body() evento: Evento) {
        const eventoCadastrado = await this.repo.buscarPorAlias(evento.alias);
        // const eventoCadastrado = eventos.find((ev) => ev.alias === evento.alias);

        if (eventoCadastrado && eventoCadastrado.id !== evento.id) throw new HttpException('Já existe um evento com esse alias.', 400);

        const eventoCompleto = complementarEvento(this.deserializar(evento));

        await this.repo.salvar(eventoCompleto);
        // eventos.push(eventoCompleto);

        // return this.serializar(eventoCompleto);
    }

    @Post(':alias/convidado')
    async salvarConvidado(@Param('alias') alias: string, @Body() convidado: Convidado) {
        const evento = await this.repo.buscarPorAlias(alias);  
        // const evento = eventos.find((evento) => evento.alias === alias);

        if (!evento) throw new HttpException('Evento não encontrado.', 404);

        const convidadoCompleto = complementarConvidado(convidado);

        await this.repo.salvarConvidado(evento, convidadoCompleto);
        // evento.convidados.push(complementarConvidado(convidado));

        // return this.serializar(evento);
    }

    @Post('acessar')
    async acessarEvento(@Body() dados: { id: string, senha: string }) {
        const evento = await this.repo.buscarPorId(dados.id, true);   
        // const evento = eventos.find((evento) => evento.id === dados.id && evento.senha === dados.senha);

        if (!evento) throw new HttpException('Evento não encontrado.', 404);

        if (evento.senha !== dados.senha) throw new HttpException('Senha não corresponde ao evento.', 400);

        return this.serializar(evento);
    }

    @Get()
    async buscarEventos() {
        const eventos = await this.repo.buscarTodos();

        return eventos.map(this.serializar);
    }

    @Get(':idOuAlias')
    async buscarEvento(@Param('idOuAlias') idOuAlias: string) {
        let evento: Evento;

        if (Id.valido(idOuAlias)) {
            evento = await this.repo.buscarPorId(idOuAlias, true);            
            // return this.serializar(eventos.find((evento) => evento.id === idOuAlias));
        } else {
            evento = await this.repo.buscarPorAlias(idOuAlias, true);    
            // return this.serializar(eventos.find((evento) => evento.alias === idOuAlias));
        }

        return this.serializar(evento);
    }

    @Get('validar/:alias/:id')
    async validarAlias(@Param('alias') alias: string, @Param('id') id: string) {
        const evento = await this.repo.buscarPorAlias(alias);  
        // const evento = eventos.find((evento) => evento.alias === alias);

        return { valido: !evento || evento.id === id };
    }	

    private serializar(evento: Evento) {
        if (!evento) return null;

        return {
            ...evento,
            data: Data.formatar(evento.data),
        }
    }

    private deserializar(evento: any): Evento {
        return {
            ...evento,
            data: Data.desformatar(evento.data),
        } as Evento;
    }
}
