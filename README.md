# 🏛️ Resilience Blueprint Builder

> A SaaS platform that builds personalized resilience blueprints for small businesses — map risk factors, generate adaptive strategies, and stress-test your plan against real-world disruption scenarios.

---

## 🎯 Problem Solved

Micro-enterprises and family businesses (billions worldwide) lack structured frameworks to weather economic dips or disruptions — they react too late. This tool gives them a **proactive survival toolkit**.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Risk Intelligence Map** | Input risk factors by category, severity, likelihood, and weight |
| **Industry Templates** | Pre-loaded risk profiles for 8 industry types (Retail, F&B, Tech, Manufacturing, Healthcare, etc.) |
| **Visual Blueprint Canvas** | Interactive SVG node-graph showing risks, strategies, milestones, and outcomes |
| **Adaptive Strategy Engine** | TypeScript engine that auto-generates prioritized strategies from your risk profile |
| **Blueprint Stress Tests** | Simulate 6 real-world disruption scenarios (Recession, Pandemic, Cyberattack, etc.) |
| **Field Reports Library** | Anonymized success stories from real businesses, filterable by industry and topic |
| **Resilience Scoring** | Live 0–100 resilience score that updates as you add risks and strategies |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation & status bar
│   ├── Dashboard.tsx       # Command center overview
│   ├── RiskFactorInput.tsx # Risk mapping & profile setup
│   ├── BlueprintCanvas.tsx # Interactive SVG blueprint
│   ├── BlueprintView.tsx   # Blueprint page (canvas + strategies)
│   ├── StrategyPanel.tsx   # Adaptive strategy roadmap
│   ├── StressTest.tsx      # Scenario simulation engine
│   └── SuccessStories.tsx  # Field reports archive
│
├── engine/
│   ├── riskCalculator.ts   # Risk scoring algorithms
│   ├── strategyEngine.ts   # Strategy generation logic
│   ├── stressTestEngine.ts # Stress test simulation
│   └── blueprintLayout.ts  # Canvas node positioning
│
├── hooks/
│   └── useBlueprint.ts     # Central state management hook
│
├── data/
│   ├── industryTemplates.ts  # 8 industry risk templates
│   └── successStories.ts     # 8 anonymized field reports
│
├── types/
│   └── index.ts            # All TypeScript interfaces & types
│
├── App.tsx                 # Root component & routing
├── main.tsx                # Entry point
└── index.css               # Global styles (war-room aesthetic)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/resilience-blueprint-builder.git
cd resilience-blueprint-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ How It Works

### 1. Business Profile
Set your business name, industry, size, and current resilience factors (insurance, emergency fund, etc.)

### 2. Risk Mapping
Add risk factors manually or load an industry template. Each risk is scored by:
- **Severity** (Low → Critical)  
- **Likelihood** (Rare → Almost Certain)
- **Business Weight** (1–10)
- **Computed Risk Score** (0–100)

### 3. Blueprint Generation
The strategy engine analyzes your risk profile and generates:
- Prioritized adaptive strategies (Immediate / Short-term / Long-term)
- Interactive visual blueprint canvas
- Overall resilience score (0–100)

### 4. Stress Testing
Simulate how your blueprint holds up against:
- Economic Recession
- Health Crisis / Pandemic
- Ransomware Attack
- Supply Chain Collapse
- Natural Disaster
- Key Person Loss

### 5. Learn from Field Reports
Browse anonymized success stories filtered by industry and topic tags.

---

## 🎨 Design Philosophy

The UI follows a **"strategic war room"** aesthetic — dark industrial tones, amber accents, blueprint-paper grid backgrounds, and monospace data typography. Designed to feel serious, trustworthy, and mission-critical.

**Fonts:** Syne (display) · DM Sans (body) · Space Mono (data/labels)  
**Colors:** Deep navy bg · Amber primary · Red/Green severity indicators

---

## 🔧 Customization

- **Industry Templates**: Add entries to `src/data/industryTemplates.ts`
- **Strategy Library**: Extend `src/engine/strategyEngine.ts`
- **Stress Scenarios**: Add scenarios to `src/engine/stressTestEngine.ts`
- **Success Stories**: Add to `src/data/successStories.ts`

---

## 📄 License

MIT License — free to use, modify, and distribute.
