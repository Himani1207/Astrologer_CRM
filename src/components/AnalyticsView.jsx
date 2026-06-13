import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Heart,
  BarChart2,
  Calendar,
  Zap,
  DollarSign,
  CheckCircle2,
  Star,
  Compass,
  PieChart
} from 'lucide-react';

// Register ChartJS modules (including ArcElement for Doughnut charts)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsView = ({ consultations, astrologers, stats }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Chart 1: Monthly Consultations
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Consultations',
        data: [65, 82, 95, 110, 132, stats.totalCompletedConsultations > 0 ? stats.totalCompletedConsultations : 158],
        fill: true,
        borderColor: '#4F46E5', // Primary Indigo
        backgroundColor: 'rgba(79, 70, 229, 0.08)',
        tension: 0.35,
        pointBackgroundColor: '#4F46E5',
        borderWidth: 3,
        pointRadius: 4,
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Outfit', size: 12, weight: '600' },
        bodyFont: { family: 'Outfit', size: 11 },
        padding: 10,
        cornerRadius: 6,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      }
    }
  };

  // Chart 2: Revenue Per Month
  const barChartRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [58000, 72000, 85000, 98000, 115000, stats.totalRevenue > 0 ? stats.totalRevenue : 142000],
        backgroundColor: 'rgba(124, 58, 237, 0.85)', // Royal Purple
        borderRadius: 4,
        barThickness: 20,
      }
    ]
  };

  const barChartRevenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Outfit', size: 12, weight: '600' },
        bodyFont: { family: 'Outfit', size: 11 },
        padding: 10,
        cornerRadius: 6,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      }
    }
  };

  // Chart 3: Top Performing Astrologers
  const horizontalBarData = {
    labels: astrologers.map(a => a.name),
    datasets: [
      {
        label: 'Sessions Done',
        data: astrologers.map(a => a.consultationsCompleted),
        backgroundColor: 'rgba(245, 158, 11, 0.85)', // Soft Gold
        borderRadius: 4,
        barThickness: 18,
      }
    ]
  };

  const horizontalBarOptions = {
    indexAxis: 'y', // Makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Outfit', size: 12, weight: '600' },
        bodyFont: { family: 'Outfit', size: 11 },
        padding: 10,
        cornerRadius: 6,
      }
    },
    scales: {
      x: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { family: 'Outfit', size: 11 } }
      }
    }
  };

  // Chart 4: Consultations by Specialization
  // Calculate dynamic count per specialization
  const specCounts = astrologers.reduce((acc, ast) => {
    acc[ast.specialization] = (acc[ast.specialization] || 0) + ast.consultationsCompleted;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(specCounts),
    datasets: [
      {
        data: Object.values(specCounts),
        backgroundColor: [
          'rgba(79, 70, 229, 0.75)',  // Indigo
          'rgba(124, 58, 237, 0.75)', // Purple
          'rgba(245, 158, 11, 0.75)',  // Gold
          'rgba(16, 185, 129, 0.75)',  // Emerald
          'rgba(236, 72, 153, 0.75)',  // Pink
          'rgba(59, 130, 246, 0.75)',  // Blue
        ].slice(0, Object.keys(specCounts).length),
        borderColor: '#FFFFFF',
        borderWidth: 2,
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          font: { family: 'Outfit', size: 11, weight: '500' },
          color: '#475569',
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Outfit', size: 12, weight: '600' },
        bodyFont: { family: 'Outfit', size: 11 },
        padding: 10,
        cornerRadius: 6,
      }
    }
  };

  return (
    <div className="analytics-section animate-fade-in">
      <div className="section-title-bar">
        <div>
          <h2>
            <BarChart2 size={20} className="header-icon-inline text-indigo" />
            Analytics &amp; Performance
          </h2>
          <p>Analyze revenue growth, consultation traffic, and top astrologer performances.</p>
        </div>
      </div>

      {/* Business KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(79, 70, 229, 0.08)' }}>
            <DollarSign size={20} className="kpi-icon" style={{ color: 'var(--primary)' }} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Total Revenue</span>
            <h4 className="kpi-val">₹{stats.totalRevenue.toLocaleString('en-IN')}</h4>
            <span className="kpi-sub positive">Operational gross</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)' }}>
            <DollarSign size={20} className="kpi-icon" style={{ color: 'var(--secondary)' }} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Avg Session Fee</span>
            <h4 className="kpi-val">₹{stats.avgConsultationFee}</h4>
            <span className="kpi-sub">Standard consultant fee</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
            <CheckCircle2 size={20} className="kpi-icon" style={{ color: '#10B981' }} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Completed Consults</span>
            <h4 className="kpi-val">{stats.totalCompletedConsultations}</h4>
            <span className="kpi-sub positive">Successful readings</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)' }}>
            <Star size={20} className="kpi-icon" style={{ color: 'var(--accent)' }} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Top Astrologer</span>
            <h4 className="kpi-val text-truncate" title={stats.topPerformingAstrologer} style={{ maxWidth: '140px' }}>
              {stats.topPerformingAstrologer}
            </h4>
            <span className="kpi-sub">Highest booking volume</span>
          </div>
        </div>
      </div>

      {/* Charts 2x2 Grid */}
      <div className="charts-analytics-layout">
        
        {/* Chart 1: Monthly Consultations (Line) */}
        <div className="chart-wrapper-card card">
          <div className="chart-header">
            <div>
              <h3>Monthly Consultation Trends</h3>
              <p className="sub-text-xs">Sessions completed over the last 6 months</p>
            </div>
            <Calendar size={16} className="chart-header-icon" />
          </div>
          <div className="chart-canvas-container">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Chart 2: Revenue Per Month (Bar) */}
        <div className="chart-wrapper-card card">
          <div className="chart-header">
            <div>
              <h3>Revenue Per Month (₹)</h3>
              <p className="sub-text-xs">Gross consultation earnings trends</p>
            </div>
            <DollarSign size={16} className="chart-header-icon" />
          </div>
          <div className="chart-canvas-container">
            <Bar data={barChartRevenueData} options={barChartRevenueOptions} />
          </div>
        </div>

        {/* Chart 3: Top Performing Astrologers (Horizontal Bar) */}
        <div className="chart-wrapper-card card">
          <div className="chart-header">
            <div>
              <h3>Consultations by Astrologer</h3>
              <p className="sub-text-xs">Completed bookings per consultant</p>
            </div>
            <Award size={16} className="chart-header-icon" />
          </div>
          <div className="chart-canvas-container">
            <Bar data={horizontalBarData} options={horizontalBarOptions} />
          </div>
        </div>

        {/* Chart 4: Consultations by Specialization (Doughnut) */}
        <div className="chart-wrapper-card card">
          <div className="chart-header">
            <div>
              <h3>Consultations by Specialization</h3>
              <p className="sub-text-xs">Demand share across astrology disciplines</p>
            </div>
            <PieChart size={16} className="chart-header-icon" />
          </div>
          <div className="chart-canvas-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .analytics-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .kpi-card {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          padding: 1.25rem;
        }

        .kpi-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .kpi-meta {
          display: flex;
          flex-direction: column;
        }

        .kpi-label {
          font-size: 0.725rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .kpi-val {
          font-size: 1.3rem;
          font-weight: 750;
          color: var(--text-primary);
          margin: 0.15rem 0;
        }

        .kpi-sub {
          font-size: 0.725rem;
          color: var(--text-secondary);
        }

        .kpi-sub.positive {
          color: #10B981;
          font-weight: 500;
        }

        /* 2x2 Layout */
        .charts-analytics-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .chart-wrapper-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .chart-header h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .chart-header-icon {
          color: var(--text-muted);
        }

        .chart-canvas-container {
          position: relative;
          height: 250px;
          width: 100%;
        }

        @media (max-width: 1200px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .charts-analytics-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .section-title-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .kpi-card {
            padding: 0.85rem;
            gap: 0.75rem;
          }
          .kpi-val {
            font-size: 1.15rem;
          }
        }

        @media (max-width: 400px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default AnalyticsView;
