import Image from "next/image";

export interface EstatisticaProps {
    texto: string;
    valor: any;
    image: string;
}

export default function Estatistica(props: EstatisticaProps) {
    return (
        <div className="flex items-center bg-zinc-900 px-6 py-2.5 rounded-lg gap-5">
            <div className="flex flex-col flex-1">
                <span className="font-light text-zinc-400">{props.texto}</span> 
                <span className="text-2xl font-black">{props.valor}</span> 
            </div>
            <Image src={props.image} width={80} height={80} alt="ícone"/>
        </div>
    );
}