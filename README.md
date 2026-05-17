# Macro Value Calculator

A modern, responsive web app that calculates the cost per gram of any macronutrient (protein, carbohydrates, or fat). Get instant value assessments with color-coded results to help you make smarter food purchasing decisions.

## Live Application
https://project-ugpgf.vercel.app/

## Features

- **Calculate macro costs** - Find the price per gram of any macronutrient
- **Color-coded value tiers** - Elite (teal), Good (green), Fair (amber), and Expensive (red)
- **Four-tier assessment** - Get detailed feedback on whether you're getting a good deal
- **Fully responsive** - Works perfectly from small screens to large desktop screens
- **Dark mode support** - Seamless light and dark theme
- **Lightning fast** - Built with React and Vite
- **Accessible** - Proper labels, focus management, and semantic HTML

##w to Use

1. **Select a macro** - Choose between Protein, Carbohydrates, or Fat
2. **Enter the total price** - Cost of the product in dollars
3. **Enter macro amount** - Grams of the selected macro per serving
4. **Enter servings** - Number of servings in the product
5. **View the result** - Get an instant valuation with color-coded assessment and explanation

**Clear** button resets all inputs for a new calculation.

## Value Tier Thresholds

### Protein

| Tier      | Range           | Color    |
| --------- | --------------- | -------- |
| Elite     | < $0.04/g       | 🟦 Teal  |
| Good      | $0.04 - $0.07/g | 🟢 Green |
| Fair      | $0.07 - $0.11/g | 🟡 Amber |
| Expensive | > $0.11/g       | 🔴 Red   |

### Carbohydrates

| Tier      | Range             | Color    |
| --------- | ----------------- | -------- |
| Elite     | < $0.008/g        | 🟦 Teal  |
| Good      | $0.008 - $0.015/g | 🟢 Green |
| Fair      | $0.015 - $0.03/g  | 🟡 Amber |
| Expensive | > $0.03/g         | 🔴 Red   |

### Fat

| Tier      | Range           | Color    |
| --------- | --------------- | -------- |
| Elite     | < $0.02/g       | 🟦 Teal  |
| Good      | $0.02 - $0.04/g | 🟢 Green |
| Fair      | $0.04 - $0.07/g | 🟡 Amber |
| Expensive | > $0.07/g       | 🔴 Red   |

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Setup

```bash
# Clone or navigate to the project
cd protein-calculator

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack
- React 18 - UI framework
- Vite - Lightning-fast build tool
- CSS3 - Modern styling with CSS custom properties and media queries
Responsive Design - Mobile-first approach supporting devices from 280px to 1126px wide

## Design Features
- CSS Custom Properties - Easily adjustable spacing, colors, and transitions via CSS variables
- Mobile-First - Optimized for small screens first, scales beautifully to desktop
- Dark Mode - Automatically adapts to system preference with prefers-color-scheme
- Smooth Animations - Slide-up animation when results appear
- Interactive Feedback - Hover states, focus rings, and button animations


## Customization

### Adjusting Value Thresholds

Edit the MACRO_THRESHOLDS object in App.jsx:
```jsx
const MACRO_THRESHOLDS = {
  protein: {
    elite: 0.04,
    good: 0.07,
    fair: 0.11,
    expensive: 0.15,
    // ... labels and messages
  },
  // ... other macros
};
```
### Modifying Colors
Update the CSS variables in App.css for each value tier (.result-elite, .result-good, .result-fair, .result-expensive).

## Future Enhancements
- Macro comparison - Compare price to preferred source of macro
- Price history tracking - Compare prices over time
- Save favorites - Store frequently checked products
- Batch calculator - Compare multiple products at once
- Nutritional comparison - Compare macros across different foods
- Multi-currency support - Works with different currencies