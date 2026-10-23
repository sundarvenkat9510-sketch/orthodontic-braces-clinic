/**
 * AuraSmile Orthodontic Clinic - Appointment Management Service
 */

const AppointmentService = {
  // Get all appointments
  getAll: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
  },

  // Save appointments array
  saveAll: function(appointments) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  // Get appointments for specific patient email
  getByPatientEmail: function(email) {
    if (!email) return [];
    const all = this.getAll();
    return all.filter(apt => apt.patientEmail && apt.patientEmail.toLowerCase() === email.toLowerCase());
  },

  // Add new appointment
  add: function(appointmentData) {
    const all = this.getAll();
    const newApt = {
      id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...appointmentData
    };
    all.unshift(newApt);
    this.saveAll(all);
    return newApt;
  },

  // Update status (e.g., 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled')
  updateStatus: function(appointmentId, newStatus) {
    const all = this.getAll();
    const index = all.findIndex(a => a.id === appointmentId);
    if (index !== -1) {
      all[index].status = newStatus;
      this.saveAll(all);
      return all[index];
    }
    return null;
  },

  // Reschedule appointment
  reschedule: function(appointmentId, newDate, newTime, newNotes = '') {
    const all = this.getAll();
    const index = all.findIndex(a => a.id === appointmentId);
    if (index !== -1) {
      all[index].date = newDate;
      all[index].time = newTime;
      all[index].status = 'Rescheduled';
      if (newNotes) {
        all[index].notes = (all[index].notes ? all[index].notes + ' | ' : '') + `Rescheduled: ${newNotes}`;
      }
      this.saveAll(all);
      return all[index];
    }
    return null;
  },

  // Cancel appointment
  cancel: function(appointmentId, reason = '') {
    const all = this.getAll();
    const index = all.findIndex(a => a.id === appointmentId);
    if (index !== -1) {
      all[index].status = 'Cancelled';
      if (reason) {
        all[index].notes = (all[index].notes ? all[index].notes + ' | ' : '') + `Cancelled: ${reason}`;
      }
      this.saveAll(all);
      return all[index];
    }
    return null;
  }
};
