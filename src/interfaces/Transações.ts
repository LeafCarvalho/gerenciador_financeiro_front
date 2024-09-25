export interface Entradas {
    nomeEntrada: string;
    tipoEntrada: string;
    valorEntrada: number;
    dataEntrada: string;
    reciboEntrada: string;
}
  
export interface Saidas {
    nomeSaida: string;
    tipoSaida: string;
    valorSaida: number;
    categoria: string;
    dataVencimento: string;
    reciboSaida: string;
}
  
export interface Investimentos {
    nomeInvestimento: string;
    tipoInvestimento: string;
    valorInvestimento: number;
    categoria: string;
    dataInvestimentoInicial: string;
    dataInvestimentoFinal: string;
    reciboInvestimento: string;
}
  
export type TipoTransacao = 'entradas' | 'saidas' | 'investimentos';
  