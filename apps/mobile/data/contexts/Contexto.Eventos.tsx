import { createContext, useEffect, useState } from "react";
import { Evento, eventos as eventosMock } from "core";
import useAPI from "../hooks/useAPI";
import useLocalStorage from "../hooks/useLocalStorage";

interface ContextoEventosProps {
    evento: Evento | null;
    eventos: Evento[];

    selecionarEvento(id: string): void;
    excluirEvento(id: string): void;
    adicionarEventoViaQrCode(qrcode: string): void;
}

const ContextoEventos = createContext<ContextoEventosProps>({} as any);

export function ProvedorEventos(props: any) { 
    const { httpPost } = useAPI();
    const { salvarItem, obterItem } = useLocalStorage();
    const [evento, setEvento] = useState<Evento | null>(null);
    // const [eventos, setEventos] = useState<Evento[]>(eventosMock); // Mock
    const [eventos, setEventos] = useState<Evento[]>([]);

    async function selecionarEvento(id: string) {
        if (!eventos) return;
        
        const evento = eventos.find((e) => e.id === id);
        
        // setEvento(evento ?? null); // Mock

        const eventoCarregado = await carregarEvento(id, evento?.senha || ""); // API

        setEvento(eventoCarregado ?? null);  // API
    }

    function excluirEvento(id: string) {
        const novosEventos = eventos.filter((e) => e.id !== id);

        salvarItem("eventos", novosEventos);
        setEventos(novosEventos);
    }

    async function adicionarEventoViaQrCode(qrcode: string) {
        try {
            const idESenha = JSON.parse(qrcode);
            // alert(`${idESenha.id} - ${idESenha.senha}`);
            const evento = await carregarEvento(idESenha.id, idESenha.senha);
            
            if (!evento) {
                return excluirEvento(idESenha.id);
            }
            
            const novosEventos = eventos.filter((e) => e.id !== idESenha.id);

            novosEventos.push(evento);

            salvarItem("eventos", novosEventos);
            setEventos(novosEventos);
        } catch (error: any) {
           alert(JSON.stringify(error));
        }
    }

    async function carregarEvento(id: string, senha: string) {
        const evento = await httpPost('evento/acessar', { id, senha });

        return evento;
    }

    async function carregarEventos() {
        const eventos = await obterItem("eventos");

        //setEventos(eventosMock || []); // Mock
        setEventos(eventos || []); // API
    }

    useEffect(() => {
        carregarEventos();
    }, []);

    return (
        <ContextoEventos.Provider value={{
            evento,
            eventos,
            selecionarEvento,
            excluirEvento,
            adicionarEventoViaQrCode,
        }}>
            {props.children}
        </ContextoEventos.Provider>
    );
}

export default ContextoEventos;