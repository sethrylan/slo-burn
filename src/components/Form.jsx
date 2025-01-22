import React, { useEffect } from 'react'
import { formatNumberWithLocale } from '../utils/format'
import './Form.css'
import { useSearchParamsState } from '../utils/state'

const Form = ({ onCalculate }) => {
  const [sloTarget, setSloTarget] = useSearchParamsState('slo', 99.9)
  const [sloTimeWindow, setSloTimeWindow] = useSearchParamsState('days', 30)
  const [totalEvents, setTotalEvents] = useSearchParamsState('events', '')

  useEffect(() => {
    // Convert formatted total events to a numeric value for calculation
    const numericTotalEvents = totalEvents.replace(/[^0-9.]/g, '')
    onCalculate({ sloTarget, sloTimeWindow, totalEvents: numericTotalEvents })
  }, [sloTarget, sloTimeWindow, totalEvents, onCalculate])

  const handleSloTargetChange = (e) => {
    setSloTarget(e.target.value)
  }

  const handleSloTimeWindowChange = (e) => {
    setSloTimeWindow(e.target.value)
  }

  const handleTotalEventsChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    if (!isNaN(value) && value !== '') {
      setTotalEvents(formatNumberWithLocale(value))
    } else {
      setTotalEvents('')
    }
  }

  return (
    <form className="alert-form">
      <div className="form-group">
        <label htmlFor="sloTarget">SLO Target (%)</label>
        <input
          type="number"
          id="sloTarget"
          name="sloTarget"
          value={sloTarget}
          onChange={handleSloTargetChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="sloTimeWindow">SLO Time Window (days)</label>
        <input
          type="number"
          id="sloTimeWindow"
          name="sloTimeWindow"
          value={sloTimeWindow}
          onChange={handleSloTimeWindowChange}
          required
        />
      </div>
      <details className="additional-settings">
        <summary>Additional Settings</summary>
        <div className="form-group">
          <label htmlFor="totalEvents">Total Events</label>
          <input
            type="text"
            id="totalEvents"
            name="totalEvents"
            value={totalEvents}
            onChange={handleTotalEventsChange}
            placeholder="Enter total events"
          />
        </div>
      </details>
    </form>
  )
}

export default Form
