import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [protein, setProtein] = useState("");
  const [servings, setServings] = useState("");

  const result =
    price && protein && servings
      ? (price / (protein * servings)).toFixed(2)
      : null;

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
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {result && <h2>${result} per gram of protein</h2>}
    </div>
  );
}
