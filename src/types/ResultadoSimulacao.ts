export type DadosGrafico = {
  mes: string;
  ano: number;
  saldo: number;
  mesAno: string;
}

export type ResultadoSimulacao = {
  saldoFinal: number;
  totalInvestido: number;
  selic?: number;
  percentualIndice?: number;
  rendimento: number;
  dadosGrafico: DadosGrafico[];
};
