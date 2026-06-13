import React from 'react';
import { 
  UserRound, 
  Users, 
  PhoneCall, 
  AlertCircle,
  Star,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Plus,
  Activity,
  UserPlus,
  Compass
} from 'lucide-react';

const DashboardHome = ({ 
  astrologers, 
  consultations, 
  setActiveTab,
  stats,
  recentActivities = [],
  onQuickAddAstrologer,
  onQuickAddCustomer,
  onQuickBook
}) => {

  // Get recent 5 consultations
  const recentConsultations = consultations.slice(0, 5);
  
  // Get featured astrologers
  const featuredAstrologers = astrologers.slice(0, 4);

  // Filter upcoming (Pending or Confirmed) consultations
  const upcomingConsultations = consultations
    .filter(c => c.status.toLowerCase() === 'pending' || c.status.toLowerCase() === 'confirmed')
    .slice(0, 4); // Show top 4 upcoming

  // Helper for status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <span className="badge badge-pending"><Clock size={12} /> Pending</span>;
      case 'confirmed':
        return <span className="badge badge-confirmed"><CheckCircle2 size={12} /> Confirmed</span>;
      case 'completed':
        return <span className="badge badge-completed"><CheckCircle2 size={12} /> Completed</span>;
      case 'cancelled':
        return <span className="badge badge-cancelled"><AlertCircle size={12} /> Cancelled</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  // Helper for avatar background colors
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
    <div className="dashboard-home animate-fade-in">
      {/* Page Header */}
      <div className="welcome-banner glass-panel">
        <div className="welcome-text-wrapper">
          <h2>
            <Compass size={22} className="header-icon-inline animate-spin-slow" />
            Operations Overview
          </h2>
          <p>Welcome back, Admin. Manage consultations, astrologers, and clients efficiently.</p>
        </div>
        
        <div className="banner-right-wrapper">
          <div className="quick-actions-inline">
            <button className="btn btn-secondary quick-action-btn-sm" onClick={onQuickAddAstrologer}>
              <Plus size={14} /> Add Astrologer
            </button>
            <button className="btn btn-secondary quick-action-btn-sm" onClick={onQuickAddCustomer}>
              <UserPlus size={14} /> Add Customer
            </button>
            <button className="btn btn-secondary quick-action-btn-sm" onClick={onQuickBook}>
              <PhoneCall size={14} /> Book Consultation
            </button>
          </div>
          <div className="banner-date">
            <Calendar size={15} />
            <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon-wrapper ast-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <h3 className="stat-value">₹{stats.totalRevenue.toLocaleString('en-IN')}</h3>
          </div>
          <div className="stat-trend positive">
            <TrendingUp size={14} />
            <span>Operational total</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-wrapper cust-icon">
            <DollarSign size={24} style={{ color: 'var(--secondary)' }} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Average Fee</span>
            <h3 className="stat-value">₹{stats.avgConsultationFee}</h3>
          </div>
          <div className="stat-trend positive">
            <span>Per session average</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-wrapper cons-icon">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed Bookings</span>
            <h3 className="stat-value">{stats.totalCompletedConsultations}</h3>
          </div>
          <div className="stat-trend positive">
            <TrendingUp size={14} />
            <span>Successful readings</span>
          </div>
        </div>

        <div className="stat-card card top-ast-card">
          <div className="stat-icon-wrapper pend-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Top Astrologer</span>
            <h3 className="stat-value top-astrologer-name">{stats.topPerformingAstrologer}</h3>
          </div>
          <div className="stat-trend positive">
            <span>Highest completions</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT DASHBOARD GRID */}
      <div className="dashboard-grid">
        {/* Left Column: Recent Consultations & Featured Astrologers */}
        <div className="dashboard-left-col">
          {/* Recent Consultations */}
          <div className="dashboard-table-section card">
            <div className="section-header">
              <h3>Recent Bookings</h3>
              <button onClick={() => setActiveTab('consultations')} className="btn btn-outline btn-xs">
                View All
              </button>
            </div>
            {recentConsultations.length === 0 ? (
              <div className="empty-state">
                <p>No consultations logged yet.</p>
              </div>
            ) : (
              <div className="table-container borderless">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Astrologer</th>
                      <th>Date &amp; Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentConsultations.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div className="customer-cell">
                            <div className="cust-avatar-sm" style={{ background: getAvatarGradient(c.customerName) }}>
                              {c.customerName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold">{c.customerName}</p>
                            </div>
                          </div>
                        </td>
                        <td>{c.astrologerName}</td>
                        <td>
                          <div className="date-time-cell">
                            <span className="date-text">{c.date}</span>
                            <span className="time-text sub-text-xs">{c.time}</span>
                          </div>
                        </td>
                        <td>{getStatusBadge(c.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Featured Astrologers */}
          <div className="dashboard-table-section card mt-6" style={{ marginTop: '1.5rem' }}>
            <div className="section-header">
              <h3>Featured Consultants</h3>
              <button onClick={() => setActiveTab('astrologers')} className="btn btn-outline btn-xs">
                Manage
              </button>
            </div>
            <div className="featured-astrologers-mini-grid">
              {featuredAstrologers.map((ast) => (
                <div key={ast.id} className="ast-mini-card">
                  <div className="ast-avatar-wrapper">
                    <div className="ast-avatar" style={{ background: getAvatarGradient(ast.name) }}>
                      {ast.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`availability-dot ${ast.available ? 'online' : 'offline'}`} />
                  </div>
                  <div className="ast-mini-info">
                    <div className="ast-mini-title">
                      <h4>{ast.name}</h4>
                      <span className="ast-spec-badge">{ast.specialization}</span>
                    </div>
                    <div className="ast-mini-meta">
                      <span className="ast-exp">₹{ast.fee}/session</span>
                      <span className="ast-rating">
                        <Star size={12} className="star-gold" />
                        {ast.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming & Recent Activity */}
        <div className="dashboard-right-col">
          {/* Upcoming Consultations Widget */}
          <div className="dashboard-widget-card card">
            <div className="widget-header">
              <Clock size={18} className="widget-icon text-indigo" />
              <h3>Upcoming Consultations</h3>
            </div>
            <div className="upcoming-list">
              {upcomingConsultations.length === 0 ? (
                <div className="empty-state-small">
                  <p>No upcoming sessions scheduled.</p>
                </div>
              ) : (
                upcomingConsultations.map((c) => (
                  <div key={c.id} className="upcoming-item">
                    <div className="upcoming-time-badge">
                      <span className="time-val">{c.time}</span>
                      <span className="date-val">{c.date.slice(5)}</span>
                    </div>
                    <div className="upcoming-details">
                      <h4>{c.customerName}</h4>
                      <p>Consulting with <strong>{c.astrologerName}</strong></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity Widget */}
          <div className="dashboard-widget-card card mt-6" style={{ marginTop: '1.5rem' }}>
            <div className="widget-header">
              <Activity size={18} className="widget-icon text-purple" />
              <h3>Recent Activities</h3>
            </div>
            <div className="activity-feed">
              {recentActivities.length === 0 ? (
                <div className="empty-state-small">
                  <p>No activity logs recorded.</p>
                </div>
              ) : (
                recentActivities.map((act) => (
                  <div key={act.id} className="activity-item">
                    <div className="activity-indicator"></div>
                    <div className="activity-desc">
                      <h5>{act.action}</h5>
                      <p>{act.details}</p>
                      <span className="activity-time">{act.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .dashboard-home {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .header-icon-inline {
          color: var(--accent);
          margin-right: 0.75rem;
          vertical-align: middle;
        }

        .welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
          border: 1px solid rgba(79, 70, 229, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .welcome-text-wrapper h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
        }

        .welcome-text-wrapper p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .banner-right-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .quick-actions-inline {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .quick-action-btn-sm {
          padding: 0.5rem 0.85rem !important;
          border-radius: var(--radius-sm);
          font-size: 0.8rem !important;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, var(--secondary) 0%, #6D28D9 100%) !important;
          color: #FFF !important;
          box-shadow: var(--shadow-sm);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-action-btn-sm:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
          filter: brightness(1.05);
        }

        .banner-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          background-color: var(--bg-card);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }

        /* Stats Cards Override */
        .top-ast-card {
          border-left: 4px solid var(--accent);
        }

        .top-astrologer-name {
          font-size: 1.35rem !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .ast-icon { background-color: rgba(79, 70, 229, 0.08); color: var(--primary); }
        .cust-icon { background-color: rgba(124, 58, 237, 0.08); color: var(--secondary); }
        .cons-icon { background-color: rgba(16, 185, 129, 0.08); color: #10B981; }
        .pend-icon { background-color: rgba(245, 158, 11, 0.08); color: var(--accent); }

        .stat-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .stat-label {
          font-size: 0.825rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.25rem 0;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.5rem;
          color: var(--text-muted);
        }

        /* Layout Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.7fr 1.3fr;
          gap: 1.5rem;
        }

        .dashboard-left-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 100%;
        }

        .dashboard-right-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 100%;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .section-header h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .borderless { border: none; }

        .btn-xs {
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
        }

        /* Table Customer avatar */
        .customer-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cust-avatar-sm {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .font-semibold {
          font-weight: 600;
          color: var(--text-primary);
        }

        .date-time-cell {
          display: flex;
          flex-direction: column;
        }

        .date-text { font-weight: 500; }
        .sub-text-xs { font-size: 0.75rem; color: var(--text-muted); }

        /* Mini cards grid for Featured Astrologers */
        .featured-astrologers-mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .ast-mini-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          transition: transform 0.2s, border-color 0.2s;
        }

        .ast-mini-card:hover {
          transform: translateY(-2px);
          border-color: rgba(124, 58, 237, 0.2);
        }

        .ast-avatar-wrapper {
          position: relative;
        }

        .ast-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .availability-dot {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1.5px solid var(--bg-card);
        }

        .availability-dot.online { background-color: #10B981; }
        .availability-dot.offline { background-color: #EF4444; }

        .ast-mini-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ast-mini-title h4 {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ast-spec-badge {
          display: inline-block;
          font-size: 0.65rem;
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.05rem 0.35rem;
          border-radius: var(--radius-sm);
          margin-top: 0.15rem;
          font-weight: 600;
        }

        .ast-mini-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.15rem;
        }

        .ast-exp {
          font-size: 0.725rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .ast-rating {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .star-gold {
          color: var(--accent);
          fill: var(--accent);
        }

        /* Widgets on the Right */
        .dashboard-widget-card {
          padding: 1.5rem;
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.65rem;
        }

        .widget-header h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .widget-icon.text-indigo { color: var(--primary); }
        .widget-icon.text-purple { color: var(--secondary); }

        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .upcoming-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
        }

        .upcoming-time-badge {
          background-color: var(--primary-light);
          color: var(--primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          min-width: 70px;
          text-align: center;
        }

        .upcoming-time-badge .time-val {
          font-size: 0.75rem;
        }

        .upcoming-time-badge .date-val {
          font-size: 0.6rem;
          opacity: 0.8;
          text-transform: uppercase;
        }

        .upcoming-details h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .upcoming-details p {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        /* Activity Feed */
        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 0.85rem;
          position: relative;
        }

        .activity-item::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 15px;
          bottom: -20px;
          width: 2px;
          background-color: var(--border-color);
        }

        .activity-item:last-child::before {
          display: none;
        }

        .activity-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--secondary);
          border: 2px solid var(--bg-card);
          box-shadow: 0 0 0 2px var(--secondary-light);
          margin-top: 4px;
          z-index: 2;
          flex-shrink: 0;
        }

        .activity-desc {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .activity-desc h5 {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .activity-desc p {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .activity-time {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .empty-state, .empty-state-small {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .empty-state-small {
          padding: 1rem;
        }

        /* Responsive Layout overrides */
        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .featured-astrologers-mini-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .stat-card {
            padding: 1rem;
          }
          .stat-value {
            font-size: 1.4rem;
          }
          .top-astrologer-name {
            font-size: 1.15rem !important;
          }
          .welcome-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
            padding: 1rem 1.25rem;
          }
          .banner-right-wrapper {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .quick-actions-inline {
            width: 100%;
            gap: 0.5rem;
          }
          .quick-action-btn-sm {
            flex: 1;
            min-width: 130px;
            justify-content: center;
          }
          .banner-date {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default DashboardHome;
