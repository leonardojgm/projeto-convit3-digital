export interface InformacoesProps {
    label: string;
    children: any;
}

export default function Informacao(props: InformacoesProps) {
    return (
        <div className="flex flex-col flex-1 item-start border border-zinc-800 px-6 py-3 rounded-lg">
            <span className="text-zinc-400 font-bold">{props.label}</span>
            <div className="text-xl">{props.children}</div>
        </div>
    );
}