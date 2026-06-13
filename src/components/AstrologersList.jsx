import React, { useState } from 'react';
import { Plus, Search, Star, MessageSquare, Trash2, Edit3, Award, Briefcase, CheckCircle, XCircle, Globe, Sparkles, X } from 'lucide-react';

const AstrologersList = ({ 
  astrologers, 
  onToggleAvailability, 
  onDeleteAstrologer, 
  onEditAstrologer, 
  onAddAstrologer 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);

  // Filter astrologers
  const filteredAstrologers = astrologers.filter(ast => {
    const matchesSearch = ast.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ast.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (ast.languages && ast.languages.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = specializationFilter === 'All' || ast.specialization === specializationFilter;
    return matchesSearch && matchesFilter;
  });

  const specializations = ['All', 'Vedic Astrology', 'Career Astrology', 'Numerology', 'Tarot Reading', 'Palmistry', 'Vastu Shastra'];

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
    <div className="astrologers-section animate-fade-in">
      {/* Title block */}
      <div className="section-title-bar">
        <div>
          <h2>
            <Sparkles size={20} className="header-icon-inline text-gold-icon" />
            Astrologer Directory
          </h2>
          <p>Manage verified consultants, modify pricing, adjust schedules, and view rating records.</p>
        </div>
        <button className="btn btn-primary" onClick={onAddAstrologer}>
          <Plus size={18} /> Add Astrologer
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="filters-container card">
        <div className="search-field">
          <Search className="search-icon-inline" size={16} />
          <input
            type="text"
            placeholder="Search by name, spec, or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input search-input-field"
          />
        </div>
        
        <div className="tab-filters">
          {specializations.map(spec => (
            <button
              key={spec}
              onClick={() => setSpecializationFilter(spec)}
              className={`filter-tab-btn ${specializationFilter === spec ? 'active' : ''}`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredAstrologers.length === 0 ? (
        <div className="empty-directory card">
          <Award size={48} className="empty-icon text-muted" />
          <h3>No Astrologers Found</h3>
          <p>No astrologers match your search criteria. Try modifying your filters or add a new specialist.</p>
          <button className="btn btn-primary mt-4" onClick={onAddAstrologer} style={{ marginTop: '1rem' }}>
            Register Astrologer
          </button>
        </div>
      ) : (
        <div className="astrologers-grid">
          {filteredAstrologers.map((ast) => (
            <div key={ast.id} className="ast-card card">
              <div className="ast-card-header">
                <div 
                  className="ast-card-avatar" 
                  style={{ background: getAvatarGradient(ast.name) }}
                >
                  {ast.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <button 
                  onClick={() => onToggleAvailability(ast.id)}
                  className={`availability-toggle-badge ${ast.availability === 'Available' ? 'online' : 'offline'}`}
                  title="Click to toggle availability"
                >
                  {ast.availability === 'Available' ? (
                    <><CheckCircle size={12} /> Available</>
                  ) : (
                    <><XCircle size={12} /> Busy</>
                  )}
                </button>
              </div>

              <div className="ast-card-body">
                <div className="ast-name-row">
                  <h3 className="ast-card-name">Pt. {ast.name}</h3>
                  <span className="ast-card-spec">{ast.specialization}</span>
                </div>
                
                {/* Metrics */}
                <div className="ast-details-block">
                  <div className="ast-detail-line">
                    <span className="line-lbl">Session Fee:</span>
                    <span className="line-val fee-val">₹{ast.fee}/session</span>
                  </div>
                  <div className="ast-detail-line">
                    <span className="line-lbl">Languages:</span>
                    <span className="line-val text-truncate" title={ast.languages}>{ast.languages}</span>
                  </div>
                </div>

                <div className="ast-card-stats">
                  <div className="ast-stat-item" title="Experience">
                    <Briefcase size={14} className="ast-stat-icon" />
                    <span>{ast.experience}</span>
                  </div>
                  <div className="ast-stat-item" title="Rating">
                    <Star size={14} className="ast-stat-icon star-gold-icon" />
                    <span className="font-bold">{ast.rating}</span>
                  </div>
                  <div className="ast-stat-item" title="Completed Bookings">
                    <MessageSquare size={14} className="ast-stat-icon" />
                    <span>{ast.consultationsCompleted} sessions</span>
                  </div>
                </div>
              </div>

              <div className="ast-card-footer">
                <button 
                  onClick={() => setSelectedAstrologer(ast)}
                  className="ast-view-details-btn"
                  title="View Profile Details"
                >
                  View Details
                </button>
                <div className="ast-card-actions-right">
                  <button 
                    onClick={() => onEditAstrologer(ast)}
                    className="ast-action-icon-btn edit-btn"
                    title="Edit Astrologer Details"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => onDeleteAstrologer(ast.id, ast.name)}
                    className="ast-action-icon-btn delete-btn"
                    title="Remove Astrologer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Details Local Modal */}
      {selectedAstrologer && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel animate-fade-in customer-modal">
            <button className="close-modal-btn top-right-close" onClick={() => setSelectedAstrologer(null)}>
              <X size={20} />
            </button>
            
            <div className="modal-customer-header">
              <div 
                className="modal-avatar" 
                style={{ background: getAvatarGradient(selectedAstrologer.name), width: '72px', height: '72px', fontSize: '1.75rem' }}
              >
                {selectedAstrologer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="modal-customer-meta">
                <h3>Pt. {selectedAstrologer.name}</h3>
                <span className="customer-id-tag">{selectedAstrologer.specialization}</span>
              </div>
            </div>

            <div className="modal-customer-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-val">{selectedAstrologer.email || 'pt.devendra@humarapandit.com'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-val">{selectedAstrologer.phone || '+91 99999 00000'}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Consultation Fee</span>
                  <span className="detail-val fee-val">₹{selectedAstrologer.fee}/session</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Experience</span>
                  <span className="detail-val">{selectedAstrologer.experience}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Languages Spoken</span>
                  <span className="detail-val">{selectedAstrologer.languages}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rating</span>
                  <span className="detail-val" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                    <Star size={14} className="star-gold-icon" style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
                    {selectedAstrologer.rating} / 5.0
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Completed Consultations</span>
                  <span className="detail-val">{selectedAstrologer.consultationsCompleted} Sessions</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current Availability</span>
                  <span className={`detail-val ${selectedAstrologer.availability === 'Available' ? 'text-success-inline' : 'text-danger-inline'}`}>
                    {selectedAstrologer.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .astrologers-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title-bar h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
        }

        .section-title-bar p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .filters-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.25rem;
        }

        .search-field {
          position: relative;
          max-width: 360px;
        }

        .search-icon-inline {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input-field {
          padding-left: 2.25rem;
        }

        .tab-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-tab-btn {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tab-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .filter-tab-btn.active {
          background-color: var(--primary);
          color: var(--text-light);
          border-color: var(--primary);
        }

        .astrologers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          align-items: stretch; /* Stretching card item heights to make them equal */
        }

        .ast-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          height: 100%; /* Height 100% inside container grid */
          min-height: 320px;
          border-radius: var(--radius-md);
        }

        .ast-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .ast-card-avatar {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-size: 1.15rem;
          font-weight: 750;
        }

        .availability-toggle-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.725rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .availability-toggle-badge.online {
          background-color: var(--status-completed-bg);
          color: var(--status-completed-text);
        }

        .availability-toggle-badge.offline {
          background-color: var(--status-cancelled-bg);
          color: var(--status-cancelled-text);
        }

        .availability-toggle-badge:hover {
          filter: brightness(0.95);
          transform: scale(1.03);
        }

        .ast-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ast-name-row {
          margin-bottom: 0.75rem;
        }

        .ast-card-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .ast-card-spec {
          display: inline-block;
          font-size: 0.7rem;
          background-color: var(--secondary-light);
          color: var(--secondary);
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
        }

        /* Fee and Languages block */
        .ast-details-block {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ast-detail-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.775rem;
        }

        .line-lbl {
          color: var(--text-muted);
          font-weight: 500;
        }

        .line-val {
          color: var(--text-primary);
          font-weight: 600;
        }

        .fee-val {
          color: var(--primary);
        }

        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }

        .ast-card-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--border-color);
        }

        .ast-stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .ast-stat-icon {
          color: var(--text-muted);
        }

        .star-gold-icon {
          color: var(--accent);
          fill: var(--accent);
        }

        .font-bold {
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Card Footer buttons */
        .ast-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color);
          margin-top: 0.75rem;
          gap: 0.5rem;
        }

        .ast-view-details-btn {
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          color: var(--primary);
          padding: 0.45rem 0.75rem;
          border: 1px solid var(--primary-light);
          background-color: var(--primary-light);
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }

        .ast-view-details-btn:hover {
          background-color: var(--primary);
          color: var(--text-light);
        }

        .ast-card-actions-right {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .ast-action-icon-btn {
          border: 1px solid var(--border-color);
          background-color: var(--bg-main);
          color: var(--text-secondary);
          padding: 0.45rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ast-action-icon-btn.edit-btn:hover {
          background-color: var(--secondary-light);
          color: var(--secondary);
          border-color: var(--secondary-light);
        }

        .ast-action-icon-btn.delete-btn:hover {
          background-color: #FEE2E2;
          color: #EF4444;
          border-color: #FEE2E2;
        }

        .empty-directory {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 500px;
          margin: 2rem auto;
        }

        .empty-icon {
          margin-bottom: 1rem;
          opacity: 0.4;
        }

        .empty-directory h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-directory p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Detail Modal Specifics */
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

        .text-danger-inline {
          color: #EF4444;
          font-weight: 600;
        }

        .text-primary-inline {
          color: var(--primary);
          font-weight: 600;
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
          .tab-filters {
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
            padding-bottom: 2px;
          }
          .tab-filters::-webkit-scrollbar {
            display: none;
          }
          .filter-tab-btn {
            flex-shrink: 0;
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
          .filters-container {
            gap: 0.75rem;
          }
          .search-field {
            max-width: none;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
};

export default AstrologersList;
