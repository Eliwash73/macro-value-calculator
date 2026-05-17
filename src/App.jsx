import { useState } from "react";

// Value thresholds for each macro (cost per gram)
const MACRO_THRESHOLDS = {
  protein: {
    elite: 0.04,
    good: 0.07,
    fair: 0.11,
    expensive: 0.15,
    labels: {
      elite: "Elite Value!",
      good: "Great Value!",
      fair: "Fair Value",
      expensive: "Expensive",
    },
    messages: {
      elite: "Outstanding protein value! Exceptional deal - stock up!",
      good: "Excellent protein value! This is a cost-effective source.",
      fair: "Reasonable protein value. Mid-range pricing for protein.",
      expensive: "High protein cost. Consider alternatives for better value.",
    },
  },
  carbohydrates: {
    elite: 0.008,
    good: 0.015,
    fair: 0.03,
    expensive: 0.05,
    labels: {
      elite: "Elite Value!",
      good: "Great Value!",
      fair: "Fair Value",
      expensive: "Expensive",
    },
    messages: {
      elite: "Outstanding carb value! Unbeatable pricing on carbohydrates.",
      good: "Excellent carb value! Great bang for your buck.",
      fair: "Reasonable carb value. Typical market pricing.",
      expensive: "High carb cost. Shop around for better deals.",
    },
  },
  fat: {
    elite: 0.02,
    good: 0.04,
    fair: 0.07,
    expensive: 0.1,
    labels: {
      elite: "Elite Value!",
      good: "Great Value!",
      fair: "Fair Value",
      expensive: "Expensive",
    },
    messages: {
      elite: "Outstanding fat value! Exceptional pricing on fats.",
      good: "Excellent fat value! Very cost-effective.",
      fair: "Reasonable fat value. Standard market price.",
      expensive: "High fat cost. Look for more affordable options.",
    },
  },
};

function getValueStatus(calculatedResult, macro) {
  const thresholds = MACRO_THRESHOLDS[macro];
  if (calculatedResult < thresholds.elite) {
    return "elite";
  } else if (calculatedResult < thresholds.good) {
    return "good";
  } else if (calculatedResult < thresholds.fair) {
    return "fair";
  } else {
    return "expensive";
  }
}

export default function App() {
  const [price, setPrice] = useState("");
  const [macro, setMacro] = useState("");
  const [servings, setServings] = useState("");
  const [result, setResult] = useState("protein");

  const calculatedResult =
    price && macro && servings ? (price / (macro * servings)).toFixed(2) : null;

  const valueStatus = calculatedResult
    ? getValueStatus(Number(calculatedResult), result)
    : null;

  const macroLabels = {
    protein: "Protein",
    carbohydrates: "Carbohydrates",
    fat: "Fat",
  };

  const handleClear = () => {
    setPrice("");
    setMacro("");
    setServings("");
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

      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>

      {calculatedResult && (
        <section className={`result-section result-${valueStatus}`}>
          <div className="result-header">
            <div className="result-value">${calculatedResult}</div>
            <div className="result-status">
              {MACRO_THRESHOLDS[result].labels[valueStatus]}
            </div>
          </div>
          <div className="result-label">
            per gram of {macroLabels[result].toLowerCase()}
          </div>
          <div className="result-message">
            {MACRO_THRESHOLDS[result].messages[valueStatus]}
          </div>
          <div className="threshold-info">
            {valueStatus === "elite" && (
              <span>
                Elite value: &lt;${MACRO_THRESHOLDS[result].elite.toFixed(3)}/g
              </span>
            )}
            {valueStatus === "good" && (
              <span>
                Good value: ${MACRO_THRESHOLDS[result].elite.toFixed(3)}-$
                {MACRO_THRESHOLDS[result].good.toFixed(3)}/g
              </span>
            )}
            {valueStatus === "fair" && (
              <span>
                Fair value: ${MACRO_THRESHOLDS[result].good.toFixed(3)}-$
                {MACRO_THRESHOLDS[result].fair.toFixed(3)}/g
              </span>
            )}
            {valueStatus === "expensive" && (
              <span>
                Expensive: &gt;${MACRO_THRESHOLDS[result].fair.toFixed(3)}/g
              </span>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
