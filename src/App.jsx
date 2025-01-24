import React, { useState, useCallback } from 'react'
import Form from './components/Form'
import Table from './components/Table'
import Chart from './components/Chart'
import './App.css'

const errorRates = [
  0.00050,
  0.00075,
  0.0010,
  0.0025,
  0.0050,
  0.0075,
  0.010,
  0.0125,
  0.0150,
  0.0175,
  0.025,
  0.050,
  0.075,
  0.10,
  0.125,
  0.150,
  0.175,
  0.250,
]

// Calculate the time it takes to consume the error budget at the given burn rate
function timeToConsumeSLO(burnRate, sloTimeWindow) {
  return sloTimeWindow / burnRate
}

// Calculate the burn rate at the given error rate and error budget.
// E.g., error rate of 0.02 (2%) and the error budget is 0.001 (from a 99.9% SLO), the burn rate is 20.
function burnRate(errorRate, errorBudget) {
  return errorRate / errorBudget
}

// Calculate the burn rate at the given error rate and error budget
export function calculateBurnRate(sloTimeWindow, errorBudgetConsumed, longWindow) {
  return Number((((sloTimeWindow * 24) * errorBudgetConsumed) / (longWindow / 60)).toFixed(1));
}

function App() {
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const calculateAlerts = useCallback(({ sloTarget, sloTimeWindow, totalEvents }) => {
    if (!sloTarget || !sloTimeWindow) return;
    const errorBudget = 1 - sloTarget / 100;

    // Theoretical error budget consumption, based on https://docs.datadoghq.com/service_management/service_level_objectives/burn_rate/
    var errorBudgets;
    if (sloTimeWindow < 14) {
      errorBudgets = [.10, .20, .40];
    } else if (sloTimeWindow > 45) {
      errorBudgets = [.01, .03, .05];
    } else {
      errorBudgets = [.02, .05, .10];
    }

    const burnRates = [
      // longWindow and shortWindow are in minutes, error budget consumed is in ratio, and burnRate is unitless
      { name: "fast-burn", longWindow: 60, shortWindow: 5, errorBudgetConsumed: errorBudgets[0] , color: "#FF0000"}, // 1 hour, 5 minutes
      { name: "mid-burn", longWindow: 360, shortWindow: 30, errorBudgetConsumed: errorBudgets[1], color: "#C64B8C"}, // 6 hours, 30 minutes
      { name: "slow-burn", longWindow: 1440, shortWindow: 120, errorBudgetConsumed: errorBudgets[2], color: "#311432"} // 3 days, 6 hours
    ];

    burnRates.forEach(rate => {
      rate.totalErrors = totalEvents ? totalEvents * errorBudget * rate.errorBudgetConsumed : null;
      rate.errorRate = rate.burnRate * errorBudget;
      rate.burnRate = calculateBurnRate(sloTimeWindow, rate.errorBudgetConsumed, rate.longWindow);
      rate.exhaustionIn = timeToConsumeSLO(rate.burnRate, sloTimeWindow * 1440);
    });
    setTableData(burnRates);

    const series = burnRates.map(r => {
      return {
        name: r.name,
        color: r.color,
        data: errorRates.map(errorRate => {
          const minutes = timeToConsumeSLO(
            burnRate(errorRate, errorBudget),
            sloTimeWindow * 1440 * r.errorBudgetConsumed
          )
          if (minutes <= r.longWindow) {
            return {
              errorRate,
              minutes: minutes
            }
          } else {
            return undefined;
          }
        }).filter(function( element ) {
          return element !== undefined;
       })
      }
    });
    
    setGraphData(series);
  }, []);

  return (
    <div className="App">
      <h1>Multiwindow Burn Rate Alerts</h1>
      <Form onCalculate={calculateAlerts} />
      <Table data={tableData} />
      <Chart series={graphData} />
    </div>
  );
}

export default App;
