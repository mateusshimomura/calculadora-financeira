import type { ResultadoSimulacao } from "../types/ResultadoSimulacao";

interface Props {
  resultado: ResultadoSimulacao;
}

export default function Result({ resultado }: Props) {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Resultado</h2>
      <p>Total Investido: R$ {resultado.totalInvestido.toFixed(2)}</p>
      <p>Juros Ganhos: R$ {resultado.juros.toFixed(2)}</p>
      <p>Saldo Final: R$ {resultado.saldoFinal.toFixed(2)}</p>
    </div>
  );
}
