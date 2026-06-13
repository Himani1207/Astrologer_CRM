import React, { useState, useEffect } from 'react';
import { Sparkles, User, Briefcase, Mail, Phone, Calendar, Globe, AlertTriangle, PhoneCall } from 'lucide-react';

// 1. ADD / EDIT ASTROLOGER MODAL
export const AddEditAstrologerModal = ({ isOpen, onClose, onSave, astrologer = null }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('Vedic Astrology');
  const [experience, setExperience] = useState('');
  const [fee, setFee] = useState('');
  const [languages, setLanguages] = useState('Hindi, English');
  const [availability, setAvailability] = useState('Available');
  const [rating, setRating] = useState('4.5');

  const specializations = [
    'Vedic Astrology',
    'Career Astrology',
    'Numerology',
    'Tarot Reading',
    'Palmistry',
    'Vastu Shastra'
  ];

  useEffect(() => {
    if (astrologer) {
      setName(astrologer.name || '');
      setEmail(astrologer.email || '');
      setPhone(astrologer.phone || '');
      setSpecialization(astrologer.specialization || 'Vedic Astrology');
      setExperience(astrologer.experience ? astrologer.experience.replace(/[^0-9]/g, '') : '');
      setFee(astrologer.fee ? astrologer.fee.toString() : '');
      setLanguages(astrologer.languages || 'Hindi, English');
      setAvailability(astrologer.availability || 'Available');
      setRating(astrologer.rating ? astrologer.rating.toString() : '4.5');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setSpecialization('Vedic Astrology');
      setExperience('');
      setFee('');
      setLanguages('Hindi, English');
      setAvailability('Available');
      setRating('4.5');
    }
  }, [astrologer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !experience || !fee) return;

    onSave({
      id: astrologer ? astrologer.id : null,
      name,
      email,
      phone,
      specialization,
      experience: `${experience} Years`,
      fee: parseInt(fee, 10),
      languages,
      availability,
      available: availability === 'Available',
      rating: parseFloat(rating) || 4.5,
      consultationsCompleted: astrologer ? astrologer.consultationsCompleted : 0
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <h3>
            <Sparkles size={18} className="star-gold-icon inline-icon" />
            {astrologer ? 'Edit Astrologer Details' : 'Register New Astrologer'}
          </h3>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Pt. Devendra Dixit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="pt.devendra@humarapandit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                required
                placeholder="+91 99999 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="form-input"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                required
                min="1"
                max="50"
                placeholder="e.g. 8"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Consultation Fee (₹)</label>
              <input
                type="number"
                required
                min="100"
                max="10000"
                placeholder="e.g. 999"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Languages Spoken</label>
              <input
                type="text"
                placeholder="Hindi, English"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Availability Status</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="form-input"
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Starting Rating</label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                placeholder="e.g. 4.8"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// 2. ADD / EDIT CUSTOMER MODAL
export const AddEditCustomerModal = ({ isOpen, onClose, onSave, customer = null, astrologers = [] }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedAstrologer, setAssignedAstrologer] = useState('None');
  const [consultationsCount, setConsultationsCount] = useState('0');
  const [lastConsultationDate, setLastConsultationDate] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
      setPhone(customer.phone || '');
      setAssignedAstrologer(customer.assignedAstrologer || 'None');
      setConsultationsCount(customer.consultationsCount ? customer.consultationsCount.toString() : '0');
      setLastConsultationDate(customer.lastConsultationDate || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAssignedAstrologer('None');
      setConsultationsCount('0');
      setLastConsultationDate('');
    }
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    onSave({
      id: customer ? customer.id : null,
      name,
      email,
      phone,
      assignedAstrologer,
      consultationsCount: parseInt(consultationsCount, 10) || 0,
      lastConsultationDate: lastConsultationDate || 'N/A',
      joinedDate: customer ? customer.joinedDate : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <h3>
            <User size={18} className="inline-icon text-indigo" />
            {customer ? 'Edit Customer Profile' : 'Add New Customer'}
          </h3>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="ramesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                required
                placeholder="+91 99999 88888"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Assigned Astrologer</label>
              <select
                value={assignedAstrologer}
                onChange={(e) => setAssignedAstrologer(e.target.value)}
                className="form-input"
              >
                <option value="None">None</option>
                {astrologers.map(ast => (
                  <option key={ast.id} value={ast.name}>{ast.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Total Consultations</label>
              <input
                type="number"
                min="0"
                value={consultationsCount}
                onChange={(e) => setConsultationsCount(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Last Consultation Date</label>
            <input
              type="date"
              value={lastConsultationDate}
              onChange={(e) => setLastConsultationDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// 3. CONFIRMATION DIALOG (DELETE MODAL)
export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message = "Are you sure you want to delete this item?" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop dialog-backdrop">
      <div className="modal-content glass-panel dialog-content animate-fade-in">
        <div className="dialog-header">
          <AlertTriangle className="dialog-warning-icon" size={28} />
          <h3>{title}</h3>
        </div>
        
        <div className="dialog-body">
          <p>{message}</p>
        </div>

        <div className="dialog-actions">
          <button className="btn btn-outline dialog-btn" onClick={onClose}>Cancel</button>
          <button className="btn dialog-btn confirm-delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .dialog-backdrop {
          z-index: 300;
        }

        .dialog-content {
          max-width: 400px;
          text-align: center;
          padding: 1.75rem;
        }

        .dialog-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .dialog-warning-icon {
          color: #EF4444;
          filter: drop-shadow(0 4px 6px rgba(239, 68, 68, 0.15));
        }

        .dialog-header h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dialog-body p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .dialog-actions {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .dialog-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.85rem;
          border-radius: var(--radius-sm);
        }

        .confirm-delete-btn {
          background-color: #EF4444;
          color: #FFF;
        }

        .confirm-delete-btn:hover {
          background-color: #DC2626;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        }

        .inline-icon {
          margin-right: 0.5rem;
          vertical-align: middle;
        }
      `}} />
    </div>
  );
};

// 4. BOOK CONSULTATION MODAL
export const BookConsultationModal = ({ isOpen, onClose, onSave, customers = [], astrologers = [] }) => {
  const [customerName, setCustomerName] = useState('');
  const [astrologerName, setAstrologerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCustomerName('');
      setAstrologerName('');
      setDate('');
      setTime('');
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !astrologerName || !date || !time) return;

    onSave({
      customerName,
      astrologerName,
      date,
      time,
      notes,
      status: 'Pending'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in">
        <div className="modal-header">
          <h3>
            <PhoneCall size={18} className="inline-icon text-indigo" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Book Consultation Session
          </h3>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Select Customer</label>
            <select
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-input"
            >
              <option value="">-- Choose Client --</option>
              {customers.map(c => (
                <option key={c.id} value={c.name}>{c.name} (HP-C{c.id + 100})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Astrologer</label>
            <select
              required
              value={astrologerName}
              onChange={(e) => setAstrologerName(e.target.value)}
              className="form-input"
            >
              <option value="">-- Choose Astrologer --</option>
              {astrologers.map(ast => (
                <option key={ast.id} value={ast.name}>Pt. {ast.name} ({ast.specialization} - ₹{ast.fee})</option>
              ))}
            </select>
            <span className="sub-text-xs mt-1" style={{ color: 'var(--text-muted)', display: 'block' }}>Select from the list of registered astrologers.</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Appointment Time</label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Consultation Notes / Concerns</label>
            <textarea
              placeholder="Enter specific questions, Kundli matching queries, or job/health matters..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-input"
              rows="3"
              style={{ resize: 'none' }}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

