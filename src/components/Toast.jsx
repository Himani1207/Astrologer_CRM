import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}

      <style dangerouslySetInnerHTML={{__html: `
        .toast-container {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          z-index: 9999;
          pointer-events: none;
          max-width: 380px;
          width: 100%;
        }

        .toast-item {
          pointer-events: auto;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-sm);
          background-color: #FFFFFF;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 16px -6px rgba(15, 23, 42, 0.05);
          border-left: 4px solid var(--primary);
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          position: relative;
          overflow: hidden;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-item.success { border-left-color: #10B981; }
        .toast-item.error { border-left-color: #EF4444; }
        .toast-item.warning { border-left-color: #F59E0B; }
        .toast-item.info { border-left-color: #3B82F6; }

        .toast-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .toast-item.success .toast-icon { color: #10B981; }
        .toast-item.error .toast-icon { color: #EF4444; }
        .toast-item.warning .toast-icon { color: #F59E0B; }
        .toast-item.info .toast-icon { color: #3B82F6; }

        .toast-content {
          flex: 1;
        }

        .toast-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .toast-message {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .toast-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          flex-shrink: 0;
          padding: 0.1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-main);
        }
      `}} />
    </div>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const { id, title, message, type = 'success', duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon" />;
      case 'error':
        return <XCircle size={18} className="toast-icon" />;
      case 'warning':
        return <AlertCircle size={18} className="toast-icon" />;
      case 'info':
      default:
        return <Info size={18} className="toast-icon" />;
    }
  };

  return (
    <div className={`toast-item ${type}`}>
      {getIcon()}
      <div className="toast-content">
        {title && <h4 className="toast-title">{title}</h4>}
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
