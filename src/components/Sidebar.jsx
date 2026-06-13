import React from 'react';
import { 
  LayoutDashboard, 
  UserRound, 
  Users, 
  PhoneCall, 
  BarChart3, 
  Settings, 
  LogOut,
  Compass
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'astrologers', label: 'Astrologers', icon: UserRound },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'consultations', label: 'Consultations', icon: PhoneCall },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Compass className="logo-icon animate-spin-slow" size={28} />
        <div>
          <h1 className="logo-text">Humara Pandit</h1>
          <span className="logo-sub">Operations CRM</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <IconComponent size={20} className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={20} className="nav-icon" />
          <span>Logout</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: linear-gradient(180deg, #2D1B69 0%, #130D2A 100%);
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .sidebar-logo {
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logo-icon {
          color: var(--accent);
          filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.3));
        }

        .logo-text {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.025em;
          background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-top: -1px;
        }

        .sidebar-nav {
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.85rem 1rem;
          color: #94A3B8;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.925rem;
          font-weight: 500;
          text-align: left;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-icon {
          transition: transform 0.2s ease;
        }

        .nav-item:hover {
          color: var(--text-light);
          background-color: rgba(255, 255, 255, 0.03);
        }

        .nav-item:hover .nav-icon {
          transform: translateX(2px);
        }

        .nav-item.active {
          color: var(--text-light);
          background: linear-gradient(90deg, var(--primary) 0%, rgba(79, 70, 229, 0.8) 100%);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .nav-item.active .nav-icon {
          color: var(--accent);
        }

        .sidebar-footer {
          padding: 1.25rem 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.85rem 1rem;
          color: #FDA4AF;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.925rem;
          font-weight: 500;
          text-align: left;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background-color: rgba(244, 63, 94, 0.1);
          color: #FF859B;
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
