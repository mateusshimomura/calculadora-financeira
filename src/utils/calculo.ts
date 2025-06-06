import type { ResultadoSimulacao } from "../types/ResultadoSimulacao";

export function calcularJurosCompostos(
  valorInicial: number,
  selic: number,
  percentualIndice: number,
  periodo: number
): ResultadoSimulacao {
  const dataAtual: Date = new Date();
  const dataFinal: Date = new Date(dataAtual);
  dataFinal.setMonth(dataFinal.getMonth() + periodo);
  let totalDiasUteis: number = 0;

  //verificar quantidade de dias úteis
  while (dataAtual <= dataFinal) {
    const diaDaSemana = dataAtual.getDay();
    if (diaDaSemana !== 0 && diaDaSemana !== 6) totalDiasUteis++;
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  /*
    montante = valorInicial * (1 + (((1 + cdiAnual) ^ (1 / 252)) - 1) * percentualCdi) ^ diasUteis
  */
  const cdiDiario: number = Math.pow((1 + ((selic - 0.1)/100)), 1/252) - 1;
  const percentualRendimento: number = cdiDiario * (percentualIndice / 100);
  const fatorCrescimentoDiario: number = percentualRendimento + 1;
  const saldoFinal: number =
    valorInicial * Math.pow(fatorCrescimentoDiario, totalDiasUteis);

  const rendimento = Number((saldoFinal - valorInicial).toFixed(2));

  return { saldoFinal, totalInvestido: valorInicial, rendimento };
}
