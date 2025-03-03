import React, { useEffect, useState, ChangeEvent } from 'react';
import { formatMinutes } from '../utils/format';
import { useSearchParamsState } from '../utils/state';
import './form.css';
import { FormProps } from '../types';

const Form: React.FC<FormProps> = ({ onCalculate }) => {
  const [sloTarget, setSloTarget] = useSearchParamsState<number>('slo', 99.9);
  const [sloTimeWindow, setSloTimeWindow] = useSearchParamsState<string>('days', '30');
  const [events, setEvents] = useSearchParamsState<string>('events', '');
  const [isUptime, setIsUptime] = useState(false);

  useEffect(() => {
    // Convert decimal string input (in millions) to numeric value for calculation
    const numericEvents = parseFloat(events) * 1000000 || 0;
    onCalculate({ 
      sloTarget: Number(sloTarget), 
      sloTimeWindow, 
      events: numericEvents, 
      isUptime 
    });
  }, [sloTarget, sloTimeWindow, events, isUptime, onCalculate]);

  const handleSloTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSloTarget(Number(e.target.value));
  };

  const handleSloTimeWindowChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSloTimeWindow(e.target.value);
  };

  const handleEventsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
    setEvents(sanitizedValue);
  };

  const handleIsUptimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('isUptime', e.target.checked);
    setIsUptime(e.target.checked);
    if (e.target.checked) {
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
      <details className="additional-settings" open={events !== '' || isUptime}>
        <summary>Additional Settings</summary>
        <div className="form-group">
          <label htmlFor="uptimeSlo">
            Uptime SLO
            <span className="tooltip">
              <span className="tooltip-icon"><sup>?</sup></span>
              <span className="tooltiptext">
                Check this box if you are calculating an uptime SLO, with an error 
                budget of {formatMinutes((1 - (sloTarget / 100)) * (1440 * sloTimeWindow))}
              </span>
            </span>
          </label>
          <input
            type="checkbox"
            id="uptimeSlo"
            name="uptimeSlo"
            checked={isUptime}
            onChange={handleIsUptimeChange}
          />
        </div>
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
            disabled={isUptime}
          />
        </div>
      </details>
    </form>
  );
};

export default Form;
