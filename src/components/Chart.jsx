import React from 'react'
import {
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

const Chart = ({ series }) => {
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            scale="log"
            domain={['auto', 'auto']}
            dataKey="errorRate"
            type="number"
            allowDuplicatedCategory={false}
            tickFormatter={(value) => Number((value * 100).toFixed(2)) + '%'}
          />
          <YAxis
            scale="log"
            domain={['auto', 'dataMax']}
            width={100}
            label={{
              value: 'Detection Time (minutes)',
              angle: -90,
              position: 'insideLeft',
            }}
            tickFormatter={(value) => formatMinutes(value)}
          />
          <Tooltip
            formatter={(value) => formatMinutes(value)}
            labelFormatter={(value) => `${(value * 100).toFixed(2)}%`}
          />
          <Legend />
          {series.map((s) => (
            <Line
              dataKey="minutes"
              data={s.data}
              name={s.name}
              key={s.name}
              stroke={s.color}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
