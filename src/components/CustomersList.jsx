import React, { useState } from 'react';
import { Search, UserCheck, Calendar, Phone, Mail, Award, X, Plus, Edit3, Trash2, Users, Sparkles } from 'lucide-react';

const CustomersList = ({ customers, astrologers, onAddCustomer, onEditCustomer, onDeleteCustomer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Search filter
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    (c.assignedAstrologer && c.assignedAstrologer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAvatarGradient = (name) => {
    const colors = [
      'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)',
      'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
      'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="customers-section animate-fade-in">
      {/* Title bar */}
      <div className="section-title-bar">
        <div>
          <h2>
            <Users size={20} className="header-icon-inline text-indigo" />
            Customer Directory
          </h2>
          <p>View registered clients, monitor their consultations, edit profiles, and view account histories.</p>
        </div>
        <button className="btn btn-primary" onClick={onAddCustomer}>
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="filters-container card">
        <div className="search-field">
          <Search className="search-icon-inline" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, phone, or astrologer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input search-input-field"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Client Profile</th>
              <th>Contact Details</th>
              <th>Assigned Astrologer</th>
              <th>Last Consultation</th>
              <th>Total Bookings</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="customer-cell">
                    <div 
                      className="cust-avatar-sm" 
                      style={{ background: getAvatarGradient(c.name) }}
                    >
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <span className="sub-text-xs">Joined: {c.joinedDate}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <span className="contact-item"><Mail size={12} /> {c.email}</span>
                    <span className="contact-item sub-text-xs"><Phone size={12} /> {c.phone}</span>
                  </div>
                </td>
                <td>
                  {c.assignedAstrologer && c.assignedAstrologer !== 'None' ? (
                    <span className="ast-tag-inline">
                      <Sparkles size={11} className="star-gold-icon" style={{ color: 'var(--accent)', marginRight: '0.25rem' }} />
                      Pt. {c.assignedAstrologer}
                    </span>
                  ) : (
                    <span className="no-ast-assigned">None Assigned</span>
                  )}
                </td>
                <td>
                  {c.lastConsultationDate && c.lastConsultationDate !== 'N/A' ? (
                    <span className="date-badge">{c.lastConsultationDate}</span>
                  ) : (
                    <span className="no-history">-</span>
                  )}
                </td>
                <td>
                  <span className="consultation-count">{c.consultationsCount} bookings</span>
                </td>
                <td>
                  <div className="operations-cell">
                    <button 
                      onClick={() => setSelectedCustomer(c)} 
                      className="cust-op-btn cust-view-btn"
                      title="View Details"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => onEditCustomer(c)} 
                      className="cust-op-btn cust-edit-btn"
                      title="Edit Customer Profile"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDeleteCustomer(c.id, c.name)} 
                      className="cust-op-btn cust-delete-btn"
                      title="Delete Customer Profile"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="6" className="no-results-td">
                  No customers matched your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedCustomer && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel animate-fade-in customer-modal">
            <button className="close-modal-btn top-right-close" onClick={() => setSelectedCustomer(null)}>
              <X size={20} />
            </button>
            
            <div className="modal-customer-header">
              <div 
                className="modal-avatar" 
                style={{ background: getAvatarGradient(selectedCustomer.name), width: '72px', height: '72px', fontSize: '1.75rem' }}
              >
                {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="modal-customer-meta">
                <h3>{selectedCustomer.name}</h3>
                <span className="customer-id-tag">Joined Humara Pandit: {selectedCustomer.joinedDate}</span>
              </div>
            </div>

            <div className="modal-customer-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-val">{selectedCustomer.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-val">{selectedCustomer.phone}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Assigned Astrologer</span>
                  <span className="detail-val">Pt. {selectedCustomer.assignedAstrologer || 'None'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Consultations</span>
                  <span className="detail-val">{selectedCustomer.consultationsCount} Sessions</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Last Consultation Date</span>
                  <span className="detail-val">{selectedCustomer.lastConsultationDate || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account status</span>
                  <span className="detail-val text-success-inline">Active Client</span>
                </div>
              </div>

              <div className="customer-history-summary">
                <h4>Client Account Summary</h4>
                <div className="patron-tier-box">
                  <Award size={18} className="tier-icon" />
                  <div>
                    <h5>{selectedCustomer.consultationsCount >= 5 ? 'Premium Patron' : 'Standard Account'}</h5>
                    <p>
                      {selectedCustomer.consultationsCount >= 5 
                        ? 'This customer is a premium user with high appointment frequency. Eligible for priority consultation scheduling.' 
                        : 'Standard consulting customer. Eligible for general astrology and tarot services.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .customers-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .custom-table td {
          padding: 1.25rem 1.5rem !important; /* Larger row height for better scannability */
        }

        .contact-cell {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .contact-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-primary);
        }

        .contact-item.sub-text-xs {
          color: var(--text-muted);
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

        .no-ast-assigned {
          color: var(--text-muted);
          font-size: 0.8rem;
          font-style: italic;
        }

        .date-badge {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .no-history {
          color: var(--text-muted);
        }

        .consultation-count {
          font-weight: 600;
          color: var(--primary);
        }

        .operations-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        /* Text Action Buttons */
        .cust-op-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .cust-view-btn {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        .cust-view-btn:hover {
          background-color: var(--primary);
          color: #FFF;
        }

        .cust-edit-btn {
          background-color: var(--secondary-light);
          color: var(--secondary);
        }
        .cust-edit-btn:hover {
          background-color: var(--secondary);
          color: #FFF;
        }

        .cust-delete-btn {
          background-color: #FEE2E2;
          color: #EF4444;
        }
        .cust-delete-btn:hover {
          background-color: #EF4444;
          color: #FFF;
        }

        .no-results-td {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        /* Modal Details styling */
        .customer-modal {
          max-width: 550px;
        }

        .top-right-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
        }

        .top-right-close:hover {
          color: var(--text-primary);
        }

        .modal-customer-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .modal-avatar {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-weight: 700;
          box-shadow: var(--shadow-md);
        }

        .modal-customer-meta h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .customer-id-tag {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
        }

        .modal-customer-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.725rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-val {
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .text-success-inline {
          color: #10B981;
          font-weight: 600;
        }

        .customer-history-summary {
          margin-top: 0.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .customer-history-summary h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .patron-tier-box {
          display: flex;
          gap: 1rem;
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.85rem;
          border-radius: var(--radius-md);
        }

        .tier-icon {
          color: var(--accent-hover);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .patron-tier-box h5 {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .patron-tier-box p {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.4;
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
          .detail-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .modal-customer-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
          }
          .search-field {
            max-width: none;
            width: 100%;
          }
          .patron-tier-box {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}} />
    </div>
  );
};

export default CustomersList;
