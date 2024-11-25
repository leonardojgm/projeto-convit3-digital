import { useContext } from "react";
import ContextoEventos from "../contexts/Contexto.Eventos";

const useEventos = () => useContext(ContextoEventos);

export default useEventos;
