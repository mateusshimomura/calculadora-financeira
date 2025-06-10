import type {
  ResultadoSimulacao,
  DadosGrafico,
} from "../types/ResultadoSimulacao";

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function calculo(
  valorInicial: number,
  selic: number,
  percentualIndice: number,
  periodo: number
): ResultadoSimulacao {
  const dadosGrafico: DadosGrafico[] = [];
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

  let saldo: number = valorInicial;
  for (let i = 0; i < periodo - 1; i++) {
    const data: Date = new Date(new Date());
    data.setMonth(data.getMonth() + i);
    const dados: DadosGrafico = {
      mes: meses[data.getMonth()],
      saldo,
      ano: data.getFullYear(),
      mesAno: labelEixoX(meses[data.getMonth()], data.getFullYear())
    };
    dadosGrafico.push(dados);
    saldo = calculoJurosSimples(
      saldo,
      ((selic - 0.1) * (percentualIndice / 100)) / 12
    );
  }

  /*
    montante = valorInicial * (1 + (((1 + cdiAnual) ^ (1 / 252)) - 1) * percentualCdi) ^ diasUteis
  */
  const cdiDiario: number = Math.pow(1 + (selic - 0.1) / 100, 1 / 252) - 1;
  const percentualRendimento: number = cdiDiario * (percentualIndice / 100);
  const fatorCrescimentoDiario: number = percentualRendimento + 1;
  const saldoFinal: number =
    valorInicial * Math.pow(fatorCrescimentoDiario, totalDiasUteis);

  const rendimento = Number((saldoFinal - valorInicial).toFixed(2));

  const dadosUltimoMes: DadosGrafico = {
    mes: meses[dataFinal.getMonth() % 12],
    saldo: +saldoFinal.toFixed(2),
    ano: dataFinal.getFullYear(),
    mesAno: labelEixoX(
      meses[dataFinal.getMonth() % 12],
      dataFinal.getFullYear()
    ),
  };
  dadosGrafico.push(dadosUltimoMes);

  return { saldoFinal, totalInvestido: valorInicial, rendimento, dadosGrafico };
}

export function calculoJurosSimples(capital: number, taxa: number): number {
  return +(capital + capital * (taxa / 100)).toFixed(2);
}

export function labelEixoX(mes: string, ano: number): string {
  return `${mes}/${ano.toString().slice(-2)}`;
}
