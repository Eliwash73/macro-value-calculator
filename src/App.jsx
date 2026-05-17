import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [macro, setMacro] = useState("");
  const [servings, setServings] = useState("");
  const [result, setResult] = useState("protein");

  const calculatedResult =
    price && macro && servings ? (price / (macro * servings)).toFixed(2) : null;

  const macroLabels = {
    protein: "Protein",
    carbohydrates: "Carbohydrates",
    fat: "Fat",
  };

  return (
    <main className="app-container">
      <header>
        <h1>Macro Value Calculator</h1>
        <p>Calculate the cost per gram of any macronutrient</p>
      </header>

      <form className="select-section">
        <label htmlFor="macro-select">Select a macro to calculate</label>
        <select
          id="macro-select"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        >
          <option value="protein">Protein</option>
          <option value="carbohydrates">Carbohydrates</option>
          <option value="fat">Fat</option>
        </select>
      </form>

      <div className="form-group">
        <label htmlFor="price-input">Total Price</label>
        <div className="input-wrapper">
          <input
            id="price-input"
            type="number"
            placeholder="Enter price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="macro-input">{macroLabels[result]} per serving</label>
        <div className="input-wrapper">
          <input
            id="macro-input"
            type="number"
            placeholder={`Enter grams of ${macroLabels[result].toLowerCase()}`}
            value={macro}
            onChange={(e) => setMacro(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="servings-input">Number of Servings</label>
        <div className="input-wrapper">
          <input
            id="servings-input"
            type="number"
            placeholder="Enter number of servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            min="0"
            step="0.5"
          />
        </div>
      </div>

      {calculatedResult && (
        <section className="result-section">
          <div className="result-value">${calculatedResult}</div>
          <div className="result-label">
            per gram of {macroLabels[result].toLowerCase()}
          </div>
        </section>
      )}
    </main>
  );
}
