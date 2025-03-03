import { useState, useCallback } from 'react'
import { formatNumberWithLocale } from './utils/format'
import Form from './components/form'
import Table from './components/table'
import Chart from './components/chart'
import './app.css'
import { AlertData } from './types'

interface CalculateParams {
  sloTarget: number;
  sloTimeWindow: string | number;
  events: number;
  isUptime: boolean;
}

// Define the error rates array
const errorRates: number[] = [
  0.00001,
  0.00002,
  0.00003,
  0.00004,
  0.00005,
  0.00006,
  0.00007,
  0.00008,
  0.00009,
  0.0001,
  0.0002,
  0.0003,
  0.0004,
  0.0005,
  0.0006,
  0.0007,
  0.0008,
  0.0009,
  0.001,
  0.002,
  0.003,
  0.004,
  0.005,
  0.006,
  0.007,
  0.008,
  0.009,
  0.01,
  0.0125,
  0.0150,
  0.0175,
  0.02,
  0.025,
  0.030,
  0.040,
  0.050,
  0.06,
  0.07,
  0.08,
  0.09,
  0.10,
  0.15,
  0.20,
  0.25,
  0.30,
  0.35,
  0.40,
  0.45,
  0.50,
]

// Calculate the time it takes to consume the error budget at the given burn rate
function timeToConsumeSLO(burnRate: number, sloTimeWindow: number): number {
  return sloTimeWindow / burnRate;
}

// Calculate the burn rate at the given error rate and error budget
function burnRate(errorRate: number, errorBudget: number): number {
  return errorRate / errorBudget;
}

// Calculate the burn rate at the given error rate and error budget
export function calculateBurnRate(
  sloTimeWindow: number, 
  errorBudgetConsumed: number, 
  longWindow: number
): number {
  return Number((((sloTimeWindow * 24) * errorBudgetConsumed) / (longWindow / 60)).toFixed(1));
}

function App() {
  const [tableData, setTableData] = useState<AlertData[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]); // Consider creating a type for this

  const calculateAlerts = useCallback(({ sloTarget, sloTimeWindow, events, isUptime }: CalculateParams) => {
    if (!sloTarget || !sloTimeWindow) return;
    
    const numericSloTimeWindow = typeof sloTimeWindow === 'string' 
      ? parseInt(sloTimeWindow, 10) 
      : sloTimeWindow;
      
    const errorBudget = 1 - sloTarget / 100;
    
    var budgetConsumed;
    // Theoretical error budget consumption
    // See https://docs.datadoghq.com/service_management/service_level_objectives/burn_rate
    if (numericSloTimeWindow < 14) {
      budgetConsumed = [.10, .20, .40];
    } else if (numericSloTimeWindow > 45) {
      budgetConsumed = [.01, .03, .05];
    } else {
      budgetConsumed = [.02, .05, .10];
    }

    const burnRates: AlertData[] = [
      // longWindow and shortWindow are in minutes, error budget consumed is in ratio, and burnRate is unitless
      { name: "fast-burn", longWindow: 60, shortWindow: 5, errorBudgetConsumed: budgetConsumed[0] , color: "#FF0000"}, // 1 hour, 5 minutes
      { name: "mid-burn", longWindow: 360, shortWindow: 30, errorBudgetConsumed: budgetConsumed[1], color: "#C64B8C"}, // 6 hours, 30 minutes
      { name: "slow-burn", longWindow: 1440, shortWindow: 120, errorBudgetConsumed: budgetConsumed[2], color: "#311432"} // 1 days, 2 hours
    ];

    burnRates.forEach(rate => {
      // for ≤95% SLOs, the normal recommendations don't apply. We can either use a smaller value for theoretical error
      // budget consumed, or a higher value for the long window.
      // Using a 1/4 reduction in theoretical-error-budget-consumed supports 30day SLOs as low as 72.22%.
      if (sloTarget <= 95) {
        rate.errorBudgetConsumed = Number((.25 * rate.errorBudgetConsumed).toFixed(4));
      }

      if (isUptime) {
        rate.consumed = Number((errorBudget * numericSloTimeWindow * 1440 * rate.errorBudgetConsumed).toFixed(1)) + ' minutes';
      }

      if (events) {
        rate.consumed = formatNumberWithLocale(events * errorBudget * rate.errorBudgetConsumed) + ' events';
      }

      rate.burnRate = calculateBurnRate(numericSloTimeWindow, rate.errorBudgetConsumed, rate.longWindow);
      rate.errorRate = rate.burnRate * errorBudget;
      rate.exhaustionIn = timeToConsumeSLO(rate.burnRate, numericSloTimeWindow * 1440);
    });
    setTableData(burnRates);

    const series = burnRates.map(r => {
      return {
        name: r.name,
        color: r.color,
        data: errorRates.map(errorRate => {
          const minutes = timeToConsumeSLO(
            burnRate(errorRate, errorBudget),
            numericSloTimeWindow * 1440 * r.errorBudgetConsumed
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
