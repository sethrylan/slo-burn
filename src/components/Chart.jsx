import React from 'react'
import {
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatMinutes } from '../utils/format'
import { useTheme } from '../utils/ThemeContext'

const Chart = ({ series }) => {
  const { darkMode } = useTheme();
  
  return (
    <div style={{ margin: '40px 80px 40px 80px' }}>
      <h2>
        Detection Times
        <span className="tooltip">
          <span className="tooltip-icon">*</span>
          <span className="tooltiptext">
            Assuming a continuous error rate, the time to detection equals the time to consume
            X% of error budget, where X is taken from the table above
            <br />
            <math display="inline">
              <msub>
                <mi>T</mi>
                <mn></mn>
              </msub>
              <mo>=</mo>
              <mo>X·</mo>
              <mfrac>
                <mi>SLO Window</mi>
                <mi>Burn Rate</mi>
              </mfrac>
            </math>
          </span>
        </span>
      </h2>
      <ResponsiveContainer width="100%" height={800}>
        <LineChart>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={darkMode ? "#444" : "#ddd"}
          />
          <XAxis
            scale="log"
            domain={['auto', 'auto']}
            height={70}
            dataKey="errorRate"
            type="number"
            allowDuplicatedCategory={false}
            tickFormatter={(value) => Number((value * 100).toFixed(2)) + '%'}
            tick={{ fill: darkMode ? "#f0f0f0" : "#333" }}
          >
            <Label
              value="Error Rate"
              style={{ fill: darkMode ? "#f0f0f0" : "#333" }}
            />
          </XAxis>
          <YAxis
            scale="log"
            domain={['auto', 'dataMax']}
            width={100}
            tickFormatter={(value) => formatMinutes(value)}
            tick={{ fill: darkMode ? "#f0f0f0" : "#333" }}
          >
            <Label
              value="Detection Time (minutes)"
              angle={-90}
              position="insideLeft"
              style={{ fill: darkMode ? "#f0f0f0" : "#333" }}
            />
          </YAxis>
          <Tooltip
            formatter={(value) => formatMinutes(value)}
            labelFormatter={(value) => `${(value * 100).toFixed(2)}%`}
            contentStyle={{ 
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#f0f0f0" : "#333",
              border: `1px solid ${darkMode ? "#444" : "#ddd"}`
            }}
          />
          {series.map((s) => (
            <Line
              dataKey="minutes"
              data={s.data}
              name={s.name}
              key={s.name}
              stroke={s.color}
            />
          ))}
          <Legend 
            layout="horizontal"
            align="center"
            verticalAlign="top"
            wrapperStyle={{ color: darkMode ? "#f0f0f0" : "#333" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
