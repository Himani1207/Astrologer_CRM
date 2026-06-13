import React from 'react';

// 1. STATS CARDS SKELETON
export const StatsSkeleton = () => {
  return (
    <div className="skeleton-grid stats-skeleton-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton-item card stat-skeleton-card">
          <div className="skeleton-pulse skeleton-circle-lg"></div>
          <div className="skeleton-text-group">
            <div className="skeleton-pulse skeleton-line-sm"></div>
            <div className="skeleton-pulse skeleton-line-md"></div>
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: styles}} />
    </div>
  );
};

// 2. CARDS GRID SKELETON (for Astrologers)
export const CardsSkeleton = ({ count = 4 }) => {
  return (
    <div className="skeleton-grid cards-skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-item card card-skeleton">
          <div className="skeleton-header-row">
            <div className="skeleton-pulse skeleton-circle-xl"></div>
            <div className="skeleton-pulse skeleton-pill"></div>
          </div>
          <div className="skeleton-body-group">
            <div className="skeleton-pulse skeleton-line-lg"></div>
            <div className="skeleton-pulse skeleton-line-sm"></div>
            <div className="skeleton-pulse skeleton-line-md"></div>
          </div>
          <div className="skeleton-footer-row">
            <div className="skeleton-pulse skeleton-line-sm"></div>
            <div className="skeleton-pulse skeleton-circle-sm"></div>
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: styles}} />
    </div>
  );
};

// 3. TABLE LIST SKELETON (for Customers/Consultations)
export const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="skeleton-table-container">
      <div className="skeleton-table-header">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="skeleton-pulse skeleton-table-th"></div>
        ))}
      </div>
      <div className="skeleton-table-body">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="skeleton-table-tr">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="skeleton-pulse skeleton-table-td"></div>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: styles}} />
    </div>
  );
};

const styles = `
  @keyframes skeletonPulse {
    0% {
      background-color: #F1F5F9;
    }
    50% {
      background-color: #E2E8F0;
    }
    100% {
      background-color: #F1F5F9;
    }
  }

  .skeleton-pulse {
    animation: skeletonPulse 1.5s ease-in-out infinite;
    border-radius: var(--radius-sm);
  }

  .skeleton-grid {
    display: grid;
    gap: 1.5rem;
    width: 100%;
  }

  .stats-skeleton-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    .stats-skeleton-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .stats-skeleton-grid {
      grid-template-columns: 1fr;
    }
  }

  .cards-skeleton-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .stat-skeleton-card {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1.5rem;
    height: 100px;
  }

  .card-skeleton {
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
  }

  .skeleton-circle-sm { width: 24px; height: 24px; border-radius: 50%; }
  .skeleton-circle-lg { width: 48px; height: 48px; border-radius: 50%; }
  .skeleton-circle-xl { width: 56px; height: 56px; border-radius: 50%; }

  .skeleton-text-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .skeleton-body-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .skeleton-line-sm { width: 40%; height: 12px; }
  .skeleton-line-md { width: 70%; height: 14px; }
  .skeleton-line-lg { width: 90%; height: 18px; }

  .skeleton-pill {
    width: 80px;
    height: 24px;
    border-radius: var(--radius-full);
  }

  .skeleton-header-row,
  .skeleton-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Table Skeletons */
  .skeleton-table-container {
    width: 100%;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background-color: var(--bg-card);
    overflow: hidden;
  }

  .skeleton-table-header {
    display: flex;
    background-color: var(--bg-main);
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    gap: 1.5rem;
  }

  .skeleton-table-th {
    flex: 1;
    height: 16px;
  }

  .skeleton-table-tr {
    display: flex;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    gap: 1.5rem;
  }

  .skeleton-table-tr:last-child {
    border-bottom: none;
  }

  .skeleton-table-td {
    flex: 1;
    height: 16px;
  }
`;
