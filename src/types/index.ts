export interface AlertData {
  name: string;
  longWindow: number;
  shortWindow: number;
  errorBudgetConsumed: number;
  color: string;
  burnRate?: number;
  errorRate?: number;
  consumed?: string;
  exhaustionIn?: number;
}

export interface FormProps {
  onCalculate: (values: {
    sloTarget: number;
    sloTimeWindow: string | number;
    events: number;
    isUptime: boolean;
  }) => void;
}

export interface TableProps {
  data: AlertData[];
}

export interface ChartProps {
  series: {
    name: string;
    color: string;
    data: {
      errorRate: number;
      minutes: number;
    }[];
  }
}[];
