import React, { useEffect } from 'react';
import { formatNumberWithLocale } from '../utils/format';
import { useSearchParamsState } from '../utils/state';
import './Form.css';

const Form = ({ onCalculate }) => {
  const [sloTarget, setSloTarget] = useSearchParamsState('slo', 99.9);
  const [sloTimeWindow, setSloTimeWindow] = useSearchParamsState('days', '30');
  const [events, setEvents] = useSearchParamsState('events', '');

  useEffect(() => {
    // Convert formatted total events (in millions) to a numeric value for calculation
    const numericEvents = events.replace(/[^0-9.]/g, '') * 1000000;
    onCalculate({ sloTarget, sloTimeWindow, events: numericEvents});
  }, [sloTarget, sloTimeWindow, events, onCalculate]);

  const handleSloTargetChange = (e) => {
    setSloTarget(e.target.value);
  };

  const handleSloTimeWindowChange = (e) => {
    setSloTimeWindow(e.target.value);
  };

  const handleEventsChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (!isNaN(value) && value !== '') {
      setEvents(formatNumberWithLocale(value));
    } else {
      setEvents('');
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
              SLO burn rates are well-tested for SLO targets &gt;95%. For lower targets, this calculator uses adjusted values, which are suitable for SLOs as low as 85%.
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
      <details className="additional-settings" open={events !== ''}>
        <summary>Additional Settings</summary>
        <div className="form-group">
          <label htmlFor="events">
            Events (Millions)
            <span className="tooltip">
              <span className="tooltip-icon"><sup>?</sup></span>
              <span className="tooltiptext">
                The total number of requests/hits/events expected in the SLO window
              </span>
            </span>
          </label>
          <input
            type="text"
            id="events"
            name="events"
            value={events}
            onChange={handleEventsChange}
          />
        </div>
      </details>
    </form>
  );
};

export default Form;
