import React, { useState } from 'react';
import { Compass, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import illustrationUrl from '../assets/astrology_consultation_illustration.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@humarapandit.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication API call
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@humarapandit.com' && password === 'password123') {
        onLogin(email, rememberMe);
      } else {
        setError('Invalid email or password. Use: admin@humarapandit.com / password123');
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Panel: Branding & Illustration */}
      <div className="login-left">
        <div className="mandala-bg animate-spin-slow"></div>
        <div className="left-content">
          <div className="brand-logo">
            <Compass className="brand-icon" size={36} />
            <h1 className="brand-name">Humara Pandit</h1>
          </div>
          
          <div className="illustration-wrapper">
            <img 
              src={illustrationUrl} 
              alt="Astrology Consultation" 
              className="illustration-img"
            />
          </div>

          <div className="tagline-container">
            <h2 className="tagline-title">
              Manage Consultations, Astrologers &amp; Customers Efficiently
            </h2>
            <p className="tagline-sub">
              Your comprehensive administration portal for spiritual guidance and operational excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="login-right">
        <div className="login-card-wrapper">
          <div className="login-card glass-panel animate-fade-in">
            <div className="card-header">
              <h2 className="card-title">Portal Sign In</h2>
              <p className="card-subtitle">Access the Humara Pandit management dashboard</p>
            </div>

            {error && (
              <div className="error-banner">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    id="email"
                    className="form-input login-input"
                    placeholder="admin@humarapandit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                    disabled={isLoading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-dots">
                    Signing In<span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .login-container {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          background-color: var(--bg-main);
          overflow: hidden;
        }

        .login-left {
          flex: 1.2;
          background: linear-gradient(135deg, #1E1B4B 0%, #31105F 50%, #0F172A 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: var(--text-light);
          overflow: hidden;
        }

        .mandala-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(245, 158, 11, 0.02) 60%, transparent 100%);
          border: 1px double rgba(245, 158, 11, 0.05);
          border-radius: 50%;
          pointer-events: none;
        }

        .mandala-bg::after {
          content: '';
          position: absolute;
          inset: 40px;
          border: 1px dashed rgba(255, 255, 255, 0.03);
          border-radius: 50%;
        }

        .left-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 580px;
          text-align: center;
          height: 100%;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          align-self: flex-start;
        }

        .brand-icon {
          color: var(--accent);
          filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.4));
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .illustration-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          width: 100%;
        }

        .illustration-img {
          max-width: 85%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35));
        }

        .tagline-container {
          margin-top: 1rem;
        }

        .tagline-title {
          font-size: 1.65rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #FFF 30%, #FED7AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tagline-sub {
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.5;
        }

        /* Right side */
        .login-right {
          flex: 0.9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background-color: var(--bg-main);
          position: relative;
        }

        .login-card-wrapper {
          width: 100%;
          max-width: 440px;
        }

        .login-card {
          padding: 2.75rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
          background-color: #FFFFFF;
        }

        .card-header {
          margin-bottom: 2rem;
          text-align: left;
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .error-banner {
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #B91C1C;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          margin-bottom: 1.5rem;
          text-align: left;
          font-weight: 500;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .login-input {
          padding-left: 2.75rem;
          padding-right: 2.75rem;
          background-color: #F8FAFC;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: var(--text-secondary);
        }

        .form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }

        .remember-me-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
        }

        .checkbox-input {
          accent-color: var(--primary);
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .forgot-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .forgot-link:hover {
          color: var(--primary-hover);
        }

        .login-btn {
          width: 100%;
          padding: 0.85rem 1.5rem;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: #FFF;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .spinner-dots span {
          animation: dotAnimation 1.4s infinite both;
        }
        
        .spinner-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .spinner-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dotAnimation {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }

        /* Responsive Layout */
        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
          }
          .login-left {
            flex: 0.6;
            padding: 2.5rem 2rem;
          }
          .left-content {
            align-items: center;
            max-width: 100%;
          }
          .brand-logo {
            align-self: center;
            margin-bottom: 1rem;
          }
          .illustration-wrapper {
            display: none; /* Hide on smaller heights/widths to save space */
          }
          .tagline-container {
            margin-top: 0;
          }
          .tagline-title {
            font-size: 1.4rem;
          }
          .login-right {
            flex: 1;
            padding: 2.5rem 1.5rem;
          }
          .login-card {
            padding: 2rem;
          }
        }
      `}} />
    </div>
  );
};

export default Login;
