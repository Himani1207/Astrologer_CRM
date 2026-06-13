import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardHome from './components/DashboardHome';
import AstrologersList from './components/AstrologersList';
import CustomersList from './components/CustomersList';
import ConsultationsList from './components/ConsultationsList';
import AnalyticsView from './components/AnalyticsView';

// Reusable Modals, Toast, and Skeletons
import { AddEditAstrologerModal, AddEditCustomerModal, ConfirmationDialog, BookConsultationModal } from './components/ReusableModals';
import Toast from './components/Toast';
import { StatsSkeleton, CardsSkeleton, TableSkeleton } from './components/SkeletonLoader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // UX states: Skeletons & Toasts
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Consultation Completed', details: 'Rohan Malhotra with Neha Verma', time: '10m ago' },
    { id: 2, action: 'Customer Added', details: 'Kirti Sharma was registered', time: '1h ago' },
    { id: 3, action: 'Astrologer Availability Updated', details: 'Neha Verma changed to Busy', time: '2h ago' }
  ]);

  // Reusable Modals Visibility States
  const [isAstrologerModalOpen, setIsAstrologerModalOpen] = useState(false);
  const [editingAstrologer, setEditingAstrologer] = useState(null);

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Delete Dialog state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState('Confirm Deletion');
  const [deleteMessage, setDeleteMessage] = useState('Are you sure you want to delete this item?');

  // Trigger Toast helper
  const triggerToast = (message, type = 'success', title = 'Action Logged') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Action logs to dashboard activities list
  const logActivity = (action, details) => {
    const newAct = {
      id: Date.now(),
      action,
      details,
      time: 'Just now'
    };
    setRecentActivities((prev) => [newAct, ...prev.slice(0, 7)]);
  };

  // Persistent notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('hp_crm_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 1, text: "New consultation scheduled by Amit Verma", time: "5m ago", read: false },
      { id: 2, text: "Astrologer Neha Verma changed availability to Busy", time: "30m ago", read: false },
      { id: 3, text: "Consultation #1043 completed by Rahul Joshi", time: "2h ago", read: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('hp_crm_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (text) => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just now",
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Trigger skeleton loader on tab transition
  const handleTabChange = (tabId) => {
    setIsTabLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
  };

  // Session storage check
  useEffect(() => {
    const savedLogin = localStorage.getItem('hp_crm_is_logged_in');
    const savedAdmin = localStorage.getItem('hp_crm_admin_name');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
      if (savedAdmin) setAdminName(savedAdmin);
    }
  }, []);

  // Enriched Mock Astrologers Data
  const [astrologers, setAstrologers] = useState(() => {
    const saved = localStorage.getItem('hp_crm_astrologers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { 
        id: 1, 
        name: 'Priya Sharma', 
        specialization: 'Vedic Astrology', 
        experience: '8 Years', 
        fee: 999, 
        email: 'priya.sharma@humarapandit.com',
        phone: '+91 98989 00121',
        languages: 'Hindi, English', 
        availability: 'Available', 
        available: true, 
        rating: 4.8, 
        consultationsCompleted: 128 
      },
      { 
        id: 2, 
        name: 'Rahul Joshi', 
        specialization: 'Career Astrology', 
        experience: '6 Years', 
        fee: 1200, 
        email: 'rahul.joshi@humarapandit.com',
        phone: '+91 98989 00122',
        languages: 'Hindi, English', 
        availability: 'Available', 
        available: true, 
        rating: 4.7, 
        consultationsCompleted: 94 
      },
      { 
        id: 3, 
        name: 'Neha Verma', 
        specialization: 'Numerology', 
        experience: '5 Years', 
        fee: 800, 
        email: 'neha.verma@humarapandit.com',
        phone: '+91 98989 00123',
        languages: 'English, Punjabi', 
        availability: 'Busy', 
        available: false, 
        rating: 4.9, 
        consultationsCompleted: 110 
      },
      { 
        id: 4, 
        name: 'Amit Kaushik', 
        specialization: 'Tarot Reading', 
        experience: '7 Years', 
        fee: 1500, 
        email: 'amit.kaushik@humarapandit.com',
        phone: '+91 98989 00124',
        languages: 'Hindi, English, Spanish', 
        availability: 'Available', 
        available: true, 
        rating: 4.6, 
        consultationsCompleted: 75 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hp_crm_astrologers', JSON.stringify(astrologers));
  }, [astrologers]);

  // Enriched Mock Customers Data
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('hp_crm_customers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 1, name: 'Amit Verma', email: 'amit.verma@example.com', phone: '+91 98765 43210', joinedDate: 'Jan 15, 2026', consultationsCount: 6, assignedAstrologer: 'Priya Sharma', lastConsultationDate: '2026-06-11' },
      { id: 2, name: 'Shreya Gupta', email: 'shreya.g@example.com', phone: '+91 87654 32109', joinedDate: 'Feb 10, 2026', consultationsCount: 3, assignedAstrologer: 'Rahul Joshi', lastConsultationDate: '2026-06-12' },
      { id: 3, name: 'Rohan Malhotra', email: 'rohan.m@example.com', phone: '+91 76543 21098', joinedDate: 'Mar 01, 2026', consultationsCount: 7, assignedAstrologer: 'Neha Verma', lastConsultationDate: '2026-06-11' },
      { id: 4, name: 'Pooja Singh', email: 'pooja.s@example.com', phone: '+91 65432 10987', joinedDate: 'Mar 24, 2026', consultationsCount: 2, assignedAstrologer: 'Amit Kaushik', lastConsultationDate: '2026-06-08' },
      { id: 5, name: 'Vikram Rathore', email: 'vikram.r@example.com', phone: '+91 99887 76655', joinedDate: 'Apr 18, 2026', consultationsCount: 5, assignedAstrologer: 'Priya Sharma', lastConsultationDate: '2026-06-05' },
      { id: 6, name: 'Divya Iyer', email: 'divya.i@example.com', phone: '+91 88776 65544', joinedDate: 'May 02, 2026', consultationsCount: 1, assignedAstrologer: 'Rahul Joshi', lastConsultationDate: '2026-05-30' },
      { id: 7, name: 'Manish Pandey', email: 'manish.p@example.com', phone: '+91 77665 54433', joinedDate: 'May 19, 2026', consultationsCount: 4, assignedAstrologer: 'Amit Kaushik', lastConsultationDate: '2026-06-10' },
      { id: 8, name: 'Kirti Sharma', email: 'kirti.s@example.com', phone: '+91 66554 43322', joinedDate: 'Jun 05, 2026', consultationsCount: 9, assignedAstrologer: 'Neha Verma', lastConsultationDate: '2026-06-12' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hp_crm_customers', JSON.stringify(customers));
  }, [customers]);

  // Enriched Consultations Data
  const [consultations, setConsultations] = useState(() => {
    const saved = localStorage.getItem('hp_crm_consultations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 1, customerName: 'Amit Verma', astrologerName: 'Priya Sharma', date: '2026-06-12', time: '14:00', status: 'Pending', notes: 'Discussing career options and horoscope matchmaking.' },
      { id: 2, customerName: 'Shreya Gupta', astrologerName: 'Rahul Joshi', date: '2026-06-12', time: '16:30', status: 'Confirmed', notes: 'Job transition prediction and health horoscope.' },
      { id: 3, customerName: 'Rohan Malhotra', astrologerName: 'Neha Verma', date: '2026-06-11', time: '14:00', status: 'Completed', notes: 'Numerological name spelling checks.' },
      { id: 4, customerName: 'Pooja Singh', astrologerName: 'Amit Kaushik', date: '2026-06-11', time: '16:30', status: 'Cancelled', notes: 'Relationship reading using tarot decks.' },
      { id: 5, customerName: 'Vikram Rathore', astrologerName: 'Priya Sharma', date: '2026-06-13', time: '09:30', status: 'Pending', notes: 'Grah Dosh removal guidance.' },
      { id: 6, customerName: 'Divya Iyer', astrologerName: 'Rahul Joshi', date: '2026-06-13', time: '13:00', status: 'Confirmed', notes: 'Investment predictions.' },
      { id: 7, customerName: 'Manish Pandey', astrologerName: 'Amit Kaushik', date: '2026-06-10', time: '15:00', status: 'Completed', notes: 'Tarot reading on health query.' },
      { id: 8, customerName: 'Kirti Sharma', astrologerName: 'Neha Verma', date: '2026-06-14', time: '11:00', status: 'Pending', notes: 'Daily horoscope reading.' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hp_crm_consultations', JSON.stringify(consultations));
  }, [consultations]);

  // Auth Handlers
  const handleLogin = (email, remember) => {
    setIsLoggedIn(true);
    const calculatedName = email.split('@')[0].toUpperCase();
    setAdminName(calculatedName);
    if (remember) {
      localStorage.setItem('hp_crm_is_logged_in', 'true');
      localStorage.setItem('hp_crm_admin_name', calculatedName);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('hp_crm_is_logged_in');
    localStorage.removeItem('hp_crm_admin_name');
  };

  // --- ASTROLOGERS CRUD ACTIONS ---
  const handleSaveAstrologer = (astObject) => {
    if (astObject.id) {
      // Edit mode
      setAstrologers((prev) => prev.map((a) => (a.id === astObject.id ? astObject : a)));
      triggerToast(`Astrologer "${astObject.name}" details updated successfully`, 'success', 'Astrologer Updated');
      logActivity('Astrologer Updated', `${astObject.name} credentials modified`);
      addNotification(`Astrologer Pt. ${astObject.name} details updated`);
    } else {
      // Add mode
      const newAst = {
        ...astObject,
        id: Date.now() // unique id
      };
      setAstrologers((prev) => [...prev, newAst]);
      triggerToast(`Astrologer "${astObject.name}" added to directory`, 'success', 'Astrologer Added');
      logActivity('Astrologer Added', `Pt. ${astObject.name} registered`);
      addNotification(`Pt. ${astObject.name} registered under ${astObject.specialization}`);
    }
  };

  const handleToggleAvailability = (id) => {
    setAstrologers((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextVal = a.availability === 'Available' ? 'Busy' : 'Available';
          triggerToast(`${a.name} is now ${nextVal}`, 'info', 'Availability Changed');
          logActivity('Astrologer Availability Updated', `${a.name} changed to ${nextVal}`);
          addNotification(`${a.name} availability changed to ${nextVal}`);
          return { ...a, availability: nextVal, available: nextVal === 'Available' };
        }
        return a;
      })
    );
  };

  const handleDeleteAstrologerTrigger = (id, name) => {
    setDeleteTitle('Remove Astrologer');
    setDeleteMessage(`Are you sure you want to delete Pt. ${name} from the directory? This action cannot be undone.`);
    setDeleteAction(() => () => {
      setAstrologers((prev) => prev.filter((a) => a.id !== id));
      triggerToast(`Pt. ${name} has been removed`, 'warning', 'Astrologer Deleted');
      logActivity('Astrologer Deleted', `${name} removed from CRM`);
      addNotification(`Pt. ${name} was removed from the directory`);
      setIsDeleteOpen(false);
    });
    setIsDeleteOpen(true);
  };

  // --- CUSTOMERS CRUD ACTIONS ---
  const handleSaveCustomer = (custObject) => {
    if (custObject.id) {
      // Edit
      setCustomers((prev) => prev.map((c) => (c.id === custObject.id ? custObject : c)));
      triggerToast(`Client profile for "${custObject.name}" updated`, 'success', 'Customer Updated');
      logActivity('Customer Updated', `${custObject.name} profile modified`);
      addNotification(`Client ${custObject.name} profile modified`);
    } else {
      // Add
      const newCust = {
        ...custObject,
        id: Date.now()
      };
      setCustomers((prev) => [...prev, newCust]);
      triggerToast(`Customer "${custObject.name}" registered successfully`, 'success', 'Customer Added');
      logActivity('Customer Added', `${custObject.name} registered`);
      addNotification(`New client ${custObject.name} registered`);
    }
  };

  const handleDeleteCustomerTrigger = (id, name) => {
    setDeleteTitle('Delete Customer Profile');
    setDeleteMessage(`Are you sure you want to delete client profile for ${name}? This will remove their booking logs.`);
    setDeleteAction(() => () => {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      triggerToast(`Client ${name} has been deleted`, 'warning', 'Customer Deleted');
      logActivity('Customer Deleted', `${name} profile removed`);
      addNotification(`Client ${name} profile was deleted`);
      setIsDeleteOpen(false);
    });
    setIsDeleteOpen(true);
  };

  // --- CONSULTATIONS ACTIONS & WORKFLOW ---
  const handleAddConsultation = (bookingObject) => {
    const newBooking = {
      ...bookingObject,
      id: Date.now()
    };
    setConsultations((prev) => [newBooking, ...prev]);
    
    // Update customer records
    setCustomers((prevCusts) =>
      prevCusts.map((c) => {
        if (c.name === bookingObject.customerName) {
          return {
            ...c,
            consultationsCount: c.consultationsCount + 1,
            assignedAstrologer: bookingObject.astrologerName,
            lastConsultationDate: bookingObject.date
          };
        }
        return c;
      })
    );

    triggerToast(`Booking successfully created for ${bookingObject.customerName}`, 'success', 'Consultation Booked');
    logActivity('Consultation Booked', `${bookingObject.customerName} scheduled with ${bookingObject.astrologerName}`);
    addNotification(`New consultation booked for ${bookingObject.customerName} with Pt. ${bookingObject.astrologerName}`);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          // If status becomes completed, increment completed session count for astrologer
          if (newStatus === 'Completed') {
            setAstrologers((prevAst) =>
              prevAst.map((a) =>
                a.name === c.astrologerName
                  ? { ...a, consultationsCompleted: a.consultationsCompleted + 1 }
                  : a
              )
            );
          }

          triggerToast(`Consultation status changed to ${newStatus}`, 'info', 'Status Updated');
          logActivity('Consultation Completed', `${c.customerName} with ${c.astrologerName}`);
          addNotification(`Consultation for ${c.customerName} marked as ${newStatus}`);
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  const handleReschedule = (id, newDate, newTime) => {
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          triggerToast(`Rescheduled to ${newDate} at ${newTime}`, 'success', 'Rescheduled');
          logActivity('Consultation Rescheduled', `${c.customerName} slot updated`);
          addNotification(`Consultation for ${c.customerName} rescheduled to ${newDate} at ${newTime}`);
          return { ...c, date: newDate, time: newTime, status: 'Confirmed' };
        }
        return c;
      })
    );
  };

  // Calculated Analytics metrics (replaces generic SaaS ones)
  const businessStats = {
    totalRevenue: astrologers.reduce((sum, ast) => sum + ((ast.consultationsCompleted || 0) * (ast.fee || 0)), 0),
    avgConsultationFee: astrologers.length > 0 ? Math.round(astrologers.reduce((sum, ast) => sum + (ast.fee || 0), 0) / astrologers.length) : 0,
    totalCompletedConsultations: astrologers.reduce((sum, ast) => sum + (ast.consultationsCompleted || 0), 0),
    topPerformingAstrologer: astrologers.length > 0 ? (astrologers.reduce((top, ast) => ((ast.consultationsCompleted || 0) > (top.consultationsCompleted || 0) ? ast : top), astrologers[0])?.name || 'N/A') : 'N/A'
  };

  // Tab views rendering
  const renderActiveView = () => {
    if (isTabLoading) {
      if (activeTab === 'dashboard') return <StatsSkeleton />;
      if (activeTab === 'astrologers') return <CardsSkeleton count={4} />;
      return <TableSkeleton rows={5} cols={5} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHome
            astrologers={astrologers}
            consultations={consultations}
            setActiveTab={handleTabChange}
            stats={businessStats}
            recentActivities={recentActivities}
            onQuickAddAstrologer={() => {
              setEditingAstrologer(null);
              setIsAstrologerModalOpen(true);
            }}
            onQuickAddCustomer={() => {
              setEditingCustomer(null);
              setIsCustomerModalOpen(true);
            }}
            onQuickBook={() => {
              setIsConsultationModalOpen(true);
            }}
          />
        );
      case 'astrologers':
        return (
          <AstrologersList
            astrologers={astrologers}
            onToggleAvailability={handleToggleAvailability}
            onDeleteAstrologer={handleDeleteAstrologerTrigger}
            onEditAstrologer={(ast) => {
              setEditingAstrologer(ast);
              setIsAstrologerModalOpen(true);
            }}
            onAddAstrologer={() => {
              setEditingAstrologer(null);
              setIsAstrologerModalOpen(true);
            }}
          />
        );
      case 'customers':
        return (
          <CustomersList
            customers={customers}
            astrologers={astrologers}
            onAddCustomer={() => {
              setEditingCustomer(null);
              setIsCustomerModalOpen(true);
            }}
            onEditCustomer={(cust) => {
              setEditingCustomer(cust);
              setIsCustomerModalOpen(true);
            }}
            onDeleteCustomer={handleDeleteCustomerTrigger}
          />
        );
      case 'consultations':
        return (
          <ConsultationsList
            consultations={consultations}
            astrologers={astrologers}
            customers={customers}
            onAddConsultation={handleAddConsultation}
            onUpdateStatus={handleUpdateStatus}
            onReschedule={handleReschedule}
            isModalOpen={isConsultationModalOpen}
            setModalOpen={setIsConsultationModalOpen}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            consultations={consultations}
            astrologers={astrologers}
            stats={businessStats}
          />
        );
      default:
        return (
          <DashboardHome
            astrologers={astrologers}
            consultations={consultations}
            setActiveTab={handleTabChange}
            stats={businessStats}
            recentActivities={recentActivities}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen-wrapper">
        <Toast toasts={toasts} removeToast={removeToast} />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Toast notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Reusable Modals & dialogs */}
      <AddEditAstrologerModal
        isOpen={isAstrologerModalOpen}
        onClose={() => setIsAstrologerModalOpen(false)}
        onSave={handleSaveAstrologer}
        astrologer={editingAstrologer}
      />

      <AddEditCustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
        astrologers={astrologers}
      />

      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={deleteAction}
        title={deleteTitle}
        message={deleteMessage}
      />

      <BookConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onSave={handleAddConsultation}
        customers={customers}
        astrologers={astrologers}
      />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Navigation Sidebar */}
      <div className={`sidebar-wrapper ${mobileSidebarOpen ? 'open' : ''}`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            handleTabChange(tab);
            setMobileSidebarOpen(false);
          }}
          onLogout={handleLogout}
          open={mobileSidebarOpen}
        />
      </div>

      {/* Main Content Frame */}
      <div className="main-content">
        <Navbar
          adminName={adminName}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        <main className="content-body content-area">{renderActiveView()}</main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .sidebar-wrapper {
          width: 280px;
          flex-shrink: 0;
          height: 100vh;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(2px);
          z-index: 99;
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar-wrapper {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            width: 280px;
          }
          
          .sidebar-wrapper.open {
            transform: translateX(0);
          }

          .mobile-overlay {
            display: block;
          }
        }
      `}} />
    </div>
  );
}

export default App;
