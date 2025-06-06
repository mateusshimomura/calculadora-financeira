import { useState } from "react";
import { calcularJurosCompostos } from "../utils/calculo";
import Result from "./Result"
import type { ResultadoSimulacao } from '../types/ResultadoSimulacao';

export default function Form() {
  const [valorInicial, setValorInicial] = useState(1000);
  const [selic, setSelic] = useState(1);
  const [percentualIndice, setPercentualIndice] = useState(1);
  const [meses, setMeses] = useState(12);
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);

  function simular() {
    const r : ResultadoSimulacao = calcularJurosCompostos(valorInicial, selic, percentualIndice, meses);
    setResultado(r);
  }

  return(
    <div className="p-4 max-w-xl mx-auto">
      <div className="grid gap-4">
        <label>
          Valor Inicial:
          <input
            type="number"
            value={valorInicial}
            onChange={(e) => setValorInicial(+e.target.value)}
            className="input"
          />
        </label>
        <label>
          SELIC (%):
          <input
            type="number"
            value={selic}
            onChange={(e) => setSelic(+e.target.value)}
            className="input"
          />
        </label>
        <label>
          LCI (%):
          <input
            type="number"
            value={percentualIndice}
            onChange={(e) => setPercentualIndice(+e.target.value)}
            className="input"
          />
        </label>
        <label>
          Duração (meses):
          <input
            type="number"
            value={meses}
            onChange={(e) => setMeses(+e.target.value)}
            className="input"
          />
        </label>
        <button
          onClick={simular}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Simular
        </button>
      </div>

      {resultado && <Result resultado={resultado} />}
    </div>
  )
}
