import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [macro, setMacro] = useState("");
  const [servings, setServings] = useState("");
  const [result, setResult] = useState("protein");

  const calculatedResult =
    price && macro && servings ? (price / (macro * servings)).toFixed(2) : null;

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 20,
        // maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <h1>Macro Value Calculator</h1>

      <p>select a macro to calculate value</p>
      <select
        value={result ? result : "protein"}
        onChange={(e) => setResult(e.target.value)}
      >
        <option value="protein">Protein</option>
        <option value="carbohydrates">Carbohydrates</option>
        <option value="fat">Fat</option>
      </select>

      <input
        type="number"
        placeholder="Total price ($)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Protein per serving (g)"
        value={macro}
        onChange={(e) => setMacro(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {result && (
        <h2>
          ${calculatedResult} per gram of {result}
        </h2>
      )}
    </div>
  );
}
