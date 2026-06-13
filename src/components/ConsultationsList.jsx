import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit3,
  User,
  Sparkles,
  PhoneCall,
  X,
} from 'lucide-react';

const ConsultationsList = ({
  consultations,
  astrologers,
  customers,
  onAddConsultation,
  onUpdateStatus,
  onReschedule,
  isModalOpen,
  setModalOpen,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(null); // holds consultation object to reschedule

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // Filter consultations
  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.astrologerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.notes && c.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      statusFilter === 'All' ||
      c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <span className="badge badge-pending">
            <Clock size={12} /> Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="badge badge-confirmed">
            <CheckCircle2 size={12} /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="badge badge-completed">
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="badge badge-cancelled">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleTime) return;

    onReschedule(showRescheduleModal.id, rescheduleDate, rescheduleTime);

    // Reset Form
    setRescheduleDate('');
    setRescheduleTime('');
    setShowRescheduleModal(null);
  };

  // Status Counts
  const counts = {
    All: consultations.length,
    Pending: consultations.filter((c) => c.status.toLowerCase() === 'pending')
      .length,
    Confirmed: consultations.filter(
      (c) => c.status.toLowerCase() === 'confirmed',
    ).length,
    Completed: consultations.filter(
      (c) => c.status.toLowerCase() === 'completed',
    ).length,
    Cancelled: consultations.filter(
      (c) => c.status.toLowerCase() === 'cancelled',
    ).length,
  };

  return (
    <div className="consultations-section animate-fade-in">
      {/* Title bar */}
      <div className="section-title-bar">
        <div>
          <h2>
            <PhoneCall
              size={20}
              className="header-icon-inline text-gold-icon"
            />
            Consultation Bookings
          </h2>
          <p>
            Book new client sessions, update consultation workflows, reschedule
            slots, and verify logs.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} /> Book Consultation
        </button>
      </div>

      {/* Counter filters */}
      <div className="status-counter-bar">
        {Object.keys(counts).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`counter-tab ${statusFilter === status ? 'active' : ''} ${status.toLowerCase()}`}
          >
            <span className="tab-label">{status}</span>
            <span className="tab-number">{counts[status]}</span>
          </button>
        ))}
      </div>

      {/* Filter and Search */}
      <div className="filters-container card">
        <div className="search-field">
          <Search
            className="search-icon-inline"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by customer, astrologer, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input search-input-field"
          />
        </div>
      </div>

      {/* Consultations Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Astrologer</th>
              <th>Schedule</th>
              <th>Notes / Query</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsultations.map((c) => (
              <tr key={c.id}>
                <td className="font-semibold">{c.customerName}</td>
                <td>
                  <span className="ast-tag-inline">
                    <Sparkles
                      size={11}
                      className="star-gold-icon"
                      style={{ color: 'var(--accent)', marginRight: '0.25rem' }}
                    />
                    Pt. {c.astrologerName}
                  </span>
                </td>
                <td>
                  <div className="date-time-cell">
                    <span className="date-text">{c.date}</span>
                    <span className="time-text sub-text-xs">{c.time}</span>
                  </div>
                </td>
                <td>
                  <p
                    className="consultation-notes-cell"
                    title={c.notes}
                  >
                    {c.notes || '-'}
                  </p>
                </td>
                <td>{getStatusBadge(c.status)}</td>
                <td>
                  <div className="operations-cell">
                    {/* Pending Workflow: Confirm, Cancel, Edit */}
                    {c.status.toLowerCase() === 'pending' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(c.id, 'Confirmed')}
                          className="consult-op-btn confirm-btn"
                          title="Confirm Appointment"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => {
                            setShowRescheduleModal(c);
                            setRescheduleDate(c.date);
                            setRescheduleTime(c.time);
                          }}
                          className="consult-op-btn edit-btn"
                          title="Edit Booking"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onUpdateStatus(c.id, 'Cancelled')}
                          className="consult-op-btn cancel-btn"
                          title="Cancel Appointment"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Confirmed Workflow: Complete, Cancel, Edit */}
                    {c.status.toLowerCase() === 'confirmed' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(c.id, 'Completed')}
                          className="consult-op-btn complete-btn"
                          title="Mark Completed"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => {
                            setShowRescheduleModal(c);
                            setRescheduleDate(c.date);
                            setRescheduleTime(c.time);
                          }}
                          className="consult-op-btn edit-btn"
                          title="Edit Booking"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onUpdateStatus(c.id, 'Cancelled')}
                          className="consult-op-btn cancel-btn"
                          title="Cancel Appointment"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* Completed or Cancelled are Read-only */}
                    {(c.status.toLowerCase() === 'completed' ||
                      c.status.toLowerCase() === 'cancelled') && (
                      <span className="no-operations">-</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredConsultations.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="no-results-td"
                >
                  No consultations match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reschedule Booking Modal (used as Edit Consultation Modal) */}
      {showRescheduleModal && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel animate-fade-in">
            <button
              className="close-modal-btn top-right-close"
              onClick={() => setShowRescheduleModal(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <h3>
                <Edit3
                  size={18}
                  className="inline-icon text-indigo"
                />
                Edit Appointment Schedule
              </h3>
            </div>

            <div
              className="reschedule-context"
              style={{
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <p className="font-semibold text-sm">
                Modifying session for{' '}
                <strong>{showRescheduleModal.customerName}</strong> with{' '}
                <strong>Pt. {showRescheduleModal.astrologerName}</strong>.
              </p>
              <span
                className="sub-text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                Current slot: {showRescheduleModal.date} at{' '}
                {showRescheduleModal.time}
              </span>
            </div>

            <form
              onSubmit={handleRescheduleSubmit}
              className="modal-form"
            >
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">New Date</label>
                  <input
                    type="date"
                    required
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Time</label>
                  <input
                    type="time"
                    required
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowRescheduleModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .consultations-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .custom-table td {
          padding: 1.25rem 1.5rem !important; /* Larger row padding for CRM standard spacing */
        }

        .status-counter-bar {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          gap: 1rem;
          scrollbar-width: none;
          padding-bottom: 2px;
        }

        .status-counter-bar::-webkit-scrollbar {
          display: none;
        }

        .counter-tab {
          flex: 1;
          flex-shrink: 0;
          min-width: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--bg-card);
          cursor: pointer;
          transition: all 0.2s;
        }

        .counter-tab:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .counter-tab.active {
          border-color: var(--primary);
          background-color: rgba(79, 70, 229, 0.02);
          box-shadow: var(--shadow-sm);
        }

        .counter-tab.active.all { border-bottom: 4px solid var(--primary); }
        .counter-tab.active.pending { border-bottom: 4px solid var(--accent); }
        .counter-tab.active.confirmed { border-bottom: 4px solid #1D4ED8; }
        .counter-tab.active.completed { border-bottom: 4px solid #10B981; }
        .counter-tab.active.cancelled { border-bottom: 4px solid #EF4444; }

        .tab-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tab-number {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .consultation-notes-cell {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .ast-tag-inline {
          display: inline-flex;
          align-items: center;
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .operations-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        /* Operations Text Buttons */
        .consult-op-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .confirm-btn {
          background-color: var(--status-confirmed-bg);
          color: var(--status-confirmed-text);
        }
        .confirm-btn:hover {
          background-color: var(--status-confirmed-text);
          color: #FFF;
        }

        .complete-btn {
          background-color: var(--status-completed-bg);
          color: var(--status-completed-text);
        }
        .complete-btn:hover {
          background-color: var(--status-completed-text);
          color: #FFF;
        }

        .edit-btn {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        .edit-btn:hover {
          background-color: var(--primary);
          color: #FFF;
        }

        .cancel-btn {
          background-color: var(--status-cancelled-bg);
          color: var(--status-cancelled-text);
        }
        .cancel-btn:hover {
          background-color: var(--status-cancelled-text);
          color: #FFF;
        }

        .no-operations {
          color: var(--text-muted);
          font-style: italic;
          font-size: 0.85rem;
        }

        .top-right-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .top-right-close:hover {
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .section-title-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .section-title-bar button {
            width: 100%;
          }
          .search-field {
            max-width: none;
            width: 100%;
          }
        }
      `,
        }}
      />
    </div>
  );
};

export default ConsultationsList;
