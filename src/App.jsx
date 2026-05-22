import { useState } from "react";
import "./App.css";

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
    <>
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
                  Elite value: &lt;${MACRO_THRESHOLDS[result].elite.toFixed(3)}
                  /g
                </span>
              )}
              {valueStatus === "good" && (
                <span>
                  Great value: ${MACRO_THRESHOLDS[result].elite.toFixed(3)}-$
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

      <section className="thresholds-section">
        <h2>Value Tier Thresholds</h2>
        <div className="thresholds-grid">
          {Object.entries(MACRO_THRESHOLDS).map(([macroKey, macro]) => (
            <div key={macroKey} className="macro-tier">
              <h3>{macroLabels[macroKey]}</h3>
              <div className="tier-item elite-tier">
                <span className="tier-label">Elite</span>
                <span className="tier-value">
                  &lt;${macro.elite.toFixed(3)}/g
                </span>
              </div>
              <div className="tier-item good-tier">
                <span className="tier-label">Great</span>
                <span className="tier-value">
                  ${macro.elite.toFixed(3)}-${macro.good.toFixed(3)}/g
                </span>
              </div>
              <div className="tier-item fair-tier">
                <span className="tier-label">Fair</span>
                <span className="tier-value">
                  ${macro.good.toFixed(3)}-${macro.fair.toFixed(3)}/g
                </span>
              </div>
              <div className="tier-item expensive-tier">
                <span className="tier-label">Expensive</span>
                <span className="tier-value">
                  &gt;${macro.fair.toFixed(3)}/g
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="app-footer">
        <a
          href="https://github.com/Eliwash73/macro-value-calculator"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="github-logo"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </footer>
    </>
  );
}

const macroLabels = {
  protein: "Protein",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
};
