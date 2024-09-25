import { Entradas, Investimentos, Saidas } from "./Transações";

export interface ResponseUsuario {
  id: string;
  token: string;
  name: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ModalCreateInfosProps {
  titulo: string;
  conteudo: string;
}