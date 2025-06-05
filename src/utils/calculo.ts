import type { ResultadoSimulacao } from "../types/ResultadoSimulacao";

export function calcularJurosCompostos(
  valorInicial: number,
  aporteMensal: number,
  jurosMensal: number,
  periodo: number
): ResultadoSimulacao {
  const historico: number[] = [];
  let saldo = valorInicial;
  const taxa = jurosMensal / 100;

  for (let i = 0; i < periodo; i++) {
    saldo = saldo * (1 + taxa) + aporteMensal;
    historico.push(saldo);
  }

  const totalInvestido = valorInicial + aporteMensal * periodo;
  const juros = saldo - totalInvestido;

  return { saldoFinal: saldo, totalInvestido, juros, historico };
}
