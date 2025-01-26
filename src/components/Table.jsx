import React from 'react'
import { formatNumberWithLocale, formatMinutes } from '../utils/format'
import './Table.css'

const Table = ({ data }) => {
  return (
    <table className="alert-table">
      <thead>
        <tr>
          <th>Long window</th>
          <th>Short window</th>
          <th>
            Budget consumed
            <span className="tooltip">
              <span className="tooltip-icon">?</span>
              <span className="tooltiptext">
                This is the error budget consumed in the long window before alerting
                { data[0] && data[0].errors && '; or, the equivalent number of errors seen in the long window before alerting.' }
              </span>
            </span>
          </th>
          <th>
            Burn Rate
            <span className="tooltip">
              <span className="tooltip-icon">?</span>
              <span className="tooltiptext">
                The burn rate is the ratio of two error rates; it&apos;s a unitless number
                <math>
                  <mo>Burn Rate=</mo>
                  <mfrac>
                    <mi>Error Rate</mi>
                    <mi>Error Budget</mi>
                  </mfrac>
                </math>
              </span>
            </span>
          </th>
          <th>
            Budget Exhausted In
            <span className="tooltip">
              <span className="tooltip-icon">?</span>
              <span className="tooltiptext">
                Assuming a continuous error rate, this is when the error budget will be exhausted, equal to <br/>
                <math>
                  <mfrac>
                      <mi>SLO Time Window</mi>
                      <mi>Burn Rate</mi>
                    </mfrac>
                </math>
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{formatMinutes(item.longWindow)}</td>
            <td>{formatMinutes(item.shortWindow)}</td>
            <td>
              {item.errorBudgetConsumed * 100}%
              {item.errors && ' (' + formatNumberWithLocale(item.errors) + ' errors)'}
            </td>
            <td>
              {item.burnRate}
              <span className="tooltip">
                <span className="tooltip-icon">*</span>
                <span className="tooltiptext">
                  Assuming a continuous error rate, this is equivalent to an error rate of {(item.errorRate * 100).toFixed(2)}%
                </span>
              </span>
            </td>
            <td>{formatMinutes(item.exhaustionIn)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
