import type { ResultadoSimulacao } from "../types/ResultadoSimulacao";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  resultado: ResultadoSimulacao;
}

type CustomTickProps = {
  x: number;
  y: number;
  payload: {
    value: string;
  };
};

const CustomTick = ({ x, y, payload }: CustomTickProps) => (
  <text
    x={x}
    y={y}
    dy={16}
    textAnchor="end"
    transform={`rotate(-45, ${x}, ${y})`}
    fontSize={12}
  >
    {payload.value}
  </text>
);

export default function Result({ resultado }: Props) {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <div className="w-full h-64 pt-5 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={resultado.dadosGrafico}>
            <XAxis
              dataKey="mesAno"
              tick={(props) => <CustomTick {...props} />}
              height={40}
            />
            <YAxis dataKey="saldo" domain={["dataMin - 50", "dataMax + 50"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="saldo"
              stroke="#22c55e"
              strokeWidth={3}
              activeDot={{ r: 4, fill: "red" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h2 className="text-xl font-bold mb-2">Resultado aproximado</h2>
      <p>Total Investido: R$ {resultado.totalInvestido.toFixed(2)}</p>
      <p>Juros Ganhos: R$ {resultado.rendimento.toFixed(2)}</p>
      <p>Saldo Final: R$ {resultado.saldoFinal.toFixed(2)}</p>
    </div>
  );
}
