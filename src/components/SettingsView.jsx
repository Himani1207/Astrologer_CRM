import React, { useState } from 'react';
import { User, Bell, Shield, Settings, Sliders, DollarSign, Clock, Save, Check } from 'lucide-react';

const SettingsView = ({ adminName, onUpdateAdminName }) => {
  const [name, setName] = useState(adminName);
  const [email, setEmail] = useState('admin@humarapandit.com');
  const [password, setPassword] = useState('password123');
  
  // App states
  const [currency, setCurrency] = useState('INR');
  const [basePrice, setBasePrice] = useState('499');
  const [sessionDuration, setSessionDuration] = useState('30');
  
  // Notification states
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyInstant, setNotifyInstant] = useState(true);
  const [notifyDaily, setNotifyDaily] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      onUpdateAdminName(name);

      setTimeout(() => {
        setSavedSuccess(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="settings-section animate-fade-in">
      <div className="section-title-bar">
        <div>
          <h2>CRM Configurations</h2>
          <p>Configure operational parameters, update administration details, and adjust consultation defaults.</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Form Container */}
        <form onSubmit={handleSave} className="settings-form-wrapper">
          {/* Admin Profile */}
          <div className="settings-card card">
            <div className="card-header-simple">
              <User size={18} className="header-icon-indigo" />
              <h3>Admin Profile Settings</h3>
            </div>
            
            <div className="form-grid-settings">
              <div className="form-group">
                <label className="form-label">Administrator Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">CRM Portal Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Change password..."
              />
            </div>
          </div>

          {/* Consultation Settings */}
          <div className="settings-card card">
            <div className="card-header-simple">
              <Sliders size={18} className="header-icon-purple" />
              <h3>Consultation Variables</h3>
            </div>

            <div className="form-grid-settings">
              <div className="form-group">
                <label className="form-label">Default Currency</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="form-input"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Standard Base Fee</label>
                <div className="input-prefix-wrapper">
                  <span className="input-prefix">{currency === 'INR' ? '₹' : '$'}</span>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="form-input pl-8"
                    style={{ paddingLeft: '2.25rem' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Default Consultation Duration (Minutes)</label>
              <div className="input-prefix-wrapper">
                <span className="input-prefix"><Clock size={16} /></span>
                <input
                  type="number"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="form-input pl-8"
                  style={{ paddingLeft: '2.25rem' }}
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="settings-card card">
            <div className="card-header-simple">
              <Bell size={18} className="header-icon-gold" />
              <h3>System Notification Preferences</h3>
            </div>

            <div className="toggle-list">
              <label className="toggle-item">
                <div className="toggle-desc">
                  <h5>Email Reports</h5>
                  <p>Send summary reports for newly scheduled sessions to admin email.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="switch-input"
                />
              </label>

              <label className="toggle-item">
                <div className="toggle-desc">
                  <h5>Instant Alerts</h5>
                  <p>Display popup notifications on this dashboard when clients book sessions.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyInstant}
                  onChange={(e) => setNotifyInstant(e.target.checked)}
                  className="switch-input"
                />
              </label>

              <label className="toggle-item">
                <div className="toggle-desc">
                  <h5>Daily Summary Digests</h5>
                  <p>Generate automatic PDF reports summarizing today's revenue and attendance.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDaily}
                  onChange={(e) => setNotifyDaily(e.target.checked)}
                  className="switch-input"
                />
              </label>
            </div>
          </div>

          {/* Save Action */}
          <div className="save-bar">
            {savedSuccess && (
              <span className="success-toast animate-fade-in">
                <Check size={16} /> Configuration saved successfully!
              </span>
            )}
            
            <button
              type="submit"
              className="btn btn-primary save-settings-btn"
              disabled={isSaving}
            >
              {isSaving ? (
                <>Saving Configurations...</>
              ) : (
                <><Save size={16} /> Save Preferences</>
              )}
            </button>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .settings-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-header-simple {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .card-header-simple h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .header-icon-indigo { color: var(--primary); }
        .header-icon-purple { color: var(--secondary); }
        .header-icon-gold { color: var(--accent); }

        .form-grid-settings {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .input-prefix-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-prefix {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
        }

        .toggle-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .toggle-desc h5 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .toggle-desc p {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .switch-input {
          width: 40px;
          height: 20px;
          appearance: none;
          background-color: var(--border-color);
          border-radius: 10px;
          position: relative;
          outline: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .switch-input:checked {
          background-color: var(--primary);
        }

        .switch-input::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #FFF;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }

        .switch-input:checked::before {
          transform: translateX(20px);
        }

        .save-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .success-toast {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--status-completed-bg);
          color: var(--status-completed-text);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          font-weight: 600;
        }

        .save-settings-btn {
          padding: 0.85rem 1.5rem;
        }

        @media (max-width: 600px) {
          .form-grid-settings {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default SettingsView;
