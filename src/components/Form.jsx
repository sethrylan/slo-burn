import React, { useEffect } from 'react';
import { formatNumberWithLocale } from '../utils/format';
import { useSearchParamsState } from '../utils/state';
import './Form.css';

const Form = ({ onCalculate }) => {
  const [sloTarget, setSloTarget] = useSearchParamsState('slo', 99.9);
  const [sloTimeWindow, setSloTimeWindow] = useSearchParamsState('days', '30');
  const [totalEvents, setTotalEvents] = useSearchParamsState('events', '');

  useEffect(() => {
    // Convert formatted total events to a numeric value for calculation
    const numericTotalEvents = totalEvents.replace(/[^0-9.]/g, '');
    onCalculate({ sloTarget, sloTimeWindow, totalEvents: numericTotalEvents });
  }, [sloTarget, sloTimeWindow, totalEvents, onCalculate]);

  const handleSloTargetChange = (e) => {
    setSloTarget(e.target.value);
  };

  const handleSloTimeWindowChange = (e) => {
    setSloTimeWindow(e.target.value);
  };

  const handleTotalEventsChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (!isNaN(value) && value !== '') {
      setTotalEvents(formatNumberWithLocale(value));
    } else {
      setTotalEvents('');
    }
  };

  return (
    <form className="alert-form">
      <div className="form-group">
        <label htmlFor="sloTarget">
          SLO Target (%)
        </label>
        <input
          type="number"
          id="sloTarget"
          name="sloTarget"
          value={sloTarget}
          onChange={handleSloTargetChange}
          required
        />
        {sloTarget <= 95 && (
          <span className="warning-tooltip">
            ⚠️
            <span className="tooltiptext">
              SLO burn rates are well-tested for SLO targets &gt;95%. For lower targets, this calculator uses adjusted values.
            </span>
          </span>
        )}
      </div>
      <div className="form-group">
        <label>SLO Time Window (days)</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sloTimeWindow"
              value="7"
              checked={sloTimeWindow === '7'}
              onChange={handleSloTimeWindowChange}
            />
            7
          </label>
          <label>
            <input
              type="radio"
              name="sloTimeWindow"
              value="30"
              checked={sloTimeWindow === '30'}
              onChange={handleSloTimeWindowChange}
            />
            30
          </label>
          <label>
            <input
              type="radio"
              name="sloTimeWindow"
              value="90"
              checked={sloTimeWindow === '90'}
              onChange={handleSloTimeWindowChange}
            />
            90
          </label>
        </div>
      </div>
      <details className="additional-settings" open={totalEvents !== ''}>
        <summary>Additional Settings</summary>
        <div className="form-group">
          <label htmlFor="totalEvents">Total Events</label>
          <input
            type="text"
            id="totalEvents"
            name="totalEvents"
            value={totalEvents}
            onChange={handleTotalEventsChange}
          />
        </div>
      </details>
    </form>
  );
};

export default Form;
