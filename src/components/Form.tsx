import { useState } from "react";
import { calculo } from "../utils/calculo";
import Result from "./Result";
import type { ResultadoSimulacao } from "../types/ResultadoSimulacao";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [valorInicial, setValorInicial] = useState(1000);
  const [selic, setSelic] = useState(14.75);
  const [percentualIndice, setPercentualIndice] = useState(95);
  const [meses, setMeses] = useState(12);
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);

  function simular() {
    const r: ResultadoSimulacao = calculo(
      valorInicial,
      selic,
      percentualIndice,
      meses
    );
    setResultado(r);
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="valorInicial">Valor Inicial</Label>
          <Input
            type="number"
            id="valorInicial"
            placeholder="Valor Inicial"
            value={valorInicial}
            onChange={(e) => setValorInicial(+e.target.value)}
            className="input-no-spinner"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="selic">Selic (%)</Label>
          <Input
            type="number"
            id="selic"
            placeholder="Selic (%)"
            value={selic}
            onChange={(e) => setSelic(+e.target.value)}
            className="input-no-spinner"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="lci">LCI (%)</Label>
          <Input
            type="number"
            id="lci"
            placeholder="LCI (%)"
            value={percentualIndice}
            onChange={(e) => setPercentualIndice(+e.target.value)}
            className="input-no-spinner"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="meses">Duração</Label>
          <Input
            type="number"
            id="meses"
            placeholder="Duração"
            value={meses}
            onChange={(e) => setMeses(+e.target.value)}
            className="input-no-spinner"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1">
          <button
            onClick={simular}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Simular
          </button>
        </div>
      </div>

      {resultado && <Result resultado={resultado} />}
    </div>
  );
}
