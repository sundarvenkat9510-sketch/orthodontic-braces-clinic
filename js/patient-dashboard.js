/**
 * AuraSmile Orthodontic Clinic - Patient Dashboard Controller
 */

let currentPatient = null;

document.addEventListener('DOMContentLoaded', () => {
  // Check auth
  currentPatient = requirePatientAuth();
  if (!currentPatient) return;

  // Refresh user data from users collection to catch any updates
  refreshCurrentPatientData();

  // Initialize UI components
  setupSidebarNavigation();
  renderOverviewHeader();
  renderMetricStats();
  renderTreatmentProgress();
  renderAppointmentsList();
  renderInstallments();
  populateProfileForm();
  setupAppointmentBookingModal();
});

// Refresh patient object from LocalStorage
function refreshCurrentPatientData() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const fresh = users.find(u => u.id === currentPatient.id || u.email.toLowerCase() === currentPatient.email.toLowerCase());
  if (fresh) {
    currentPatient = fresh;
    setCurrentUser(fresh);
  }
}

// Sidebar tab navigation
function setupSidebarNavigation() {
  const navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('data-section');
      switchSection(targetSectionId);

      // Mobile close
      const sidebar = document.querySelector('.dashboard-sidebar');
      const backdrop = document.querySelector('.dashboard-backdrop');
      if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        if (backdrop) backdrop.classList.remove('show');
      }
    });
  });

  // Check URL hash
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    switchSection(hash);
  }
}

function switchSection(sectionId) {
  // Update nav active
  const navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-section]');
  navLinks.forEach(l => {
    if (l.getAttribute('data-section') === sectionId) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  // Hide all sections, show target
  const sections = document.querySelectorAll('.dashboard-section');
  sections.forEach(sec => {
    if (sec.id === `section-${sectionId}`) {
      sec.classList.remove('d-none');
    } else {
      sec.classList.add('d-none');
    }
  });

  // Update header title
  const pageTitle = document.getElementById('dashCurrentPageTitle');
  const titleMap = {
    overview: 'Patient Dashboard Overview',
    appointments: 'Appointment & Adjustment Scheduling',
    treatment: 'Treatment Progress & Smile Gallery',
    billing: 'Payment & Installment Management',
    profile: 'My Patient Profile'
  };
  if (pageTitle && titleMap[sectionId]) {
    pageTitle.textContent = titleMap[sectionId];
  }
}

// Mobile sidebar toggle
function toggleMobileSidebar() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  let backdrop = document.querySelector('.dashboard-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'dashboard-backdrop';
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.remove('show');
    });
  }

  sidebar.classList.toggle('show');
  backdrop.classList.toggle('show');
}

// Render Header & Welcome Banner
function renderOverviewHeader() {
  const nameEl = document.getElementById('dashWelcomeName');
  const userMiniName = document.getElementById('dashUserMiniName');
  const userMiniEmail = document.getElementById('dashUserMiniEmail');

  if (nameEl) nameEl.textContent = currentPatient.name;
  if (userMiniName) userMiniName.textContent = currentPatient.name;
  if (userMiniEmail) userMiniEmail.textContent = currentPatient.email;

  const treatment = currentPatient.treatment || {};
  const treatmentDescEl = document.getElementById('dashWelcomeTreatmentDesc');
  if (treatmentDescEl) {
    treatmentDescEl.textContent = `${treatment.type || 'Custom Orthodontic Plan'} • Supervised by ${treatment.doctorName || 'Dr. Marcus Vance'}`;
  }
}

// Render Overview Metric Stat Cards
function renderMetricStats() {
  const treatment = currentPatient.treatment || {};
  const financials = currentPatient.financials || {};

  // Find next upcoming appointment
  const appointments = AppointmentService.getByPatientEmail(currentPatient.email);
  const now = new Date().toISOString().split('T')[0];
  const upcomingApts = appointments.filter(a => a.date >= now && a.status !== 'Cancelled').sort((a,b) => a.date.localeCompare(b.date));
  const nextApt = upcomingApts[0];

  const nextAptValEl = document.getElementById('statNextAptVal');
  const nextAptSubEl = document.getElementById('statNextAptSub');
  if (nextAptValEl && nextAptSubEl) {
    if (nextApt) {
      nextAptValEl.textContent = `${nextApt.date.split('-').slice(1).join('/')}`;
      nextAptSubEl.textContent = `${nextApt.time} (${nextApt.appointmentType.substring(0, 24)}...)`;
    } else {
      nextAptValEl.textContent = "No Visit";
      nextAptSubEl.textContent = "Click 'Book Appointment' to schedule";
    }
  }

  // Treatment Progress
  const progressValEl = document.getElementById('statProgressVal');
  const progressSubEl = document.getElementById('statProgressSub');
  if (progressValEl && progressSubEl) {
    progressValEl.textContent = `${treatment.progressPercent || 50}%`;
    progressSubEl.textContent = treatment.stageTitle || 'Active Alignment';
  }

  // Trays / Archwire status
  const trayValEl = document.getElementById('statTrayVal');
  const traySubEl = document.getElementById('statTraySub');
  if (trayValEl && traySubEl) {
    if (treatment.currentTray) {
      trayValEl.textContent = `Tray ${treatment.currentTray} / ${treatment.totalTrays}`;
      traySubEl.textContent = `Wear goal: ${treatment.wearHoursGoal || 22} hrs/day (${treatment.complianceScore || '96%'})`;
    } else {
      trayValEl.textContent = `Stage ${treatment.currentStageNumber || 1} of 5`;
      traySubEl.textContent = `Active biomechanical movement`;
    }
  }

  // Pending Installment
  const pendingInst = (financials.installments || []).find(i => i.status === 'Pending');
  const pendingAmountEl = document.getElementById('statPendingAmount');
  const pendingDueEl = document.getElementById('statPendingDue');
  if (pendingAmountEl && pendingDueEl) {
    if (pendingInst) {
      pendingAmountEl.textContent = `$${pendingInst.amount}`;
      pendingDueEl.textContent = `Due by ${pendingInst.date}`;
    } else {
      pendingAmountEl.textContent = `$0`;
      pendingDueEl.textContent = `All current installments paid`;
    }
  }
}

// Render Treatment Progress View
function renderTreatmentProgress() {
  const treatment = currentPatient.treatment || {};
  const progressPercent = treatment.progressPercent || 50;

  const bar = document.getElementById('treatmentProgressBar');
  if (bar) {
    bar.style.width = `${progressPercent}%`;
  }

  const badgeEl = document.getElementById('treatmentProgressPercentBadge');
  if (badgeEl) badgeEl.textContent = `${progressPercent}% Complete`;

  const startDateEl = document.getElementById('treatmentStartDate');
  const targetDateEl = document.getElementById('treatmentTargetDate');
  const stageNameEl = document.getElementById('treatmentCurrentStageName');
  if (startDateEl) startDateEl.textContent = treatment.startDate || 'May 10, 2026';
  if (targetDateEl) targetDateEl.textContent = treatment.targetDate || 'May 10, 2027';
  if (stageNameEl) stageNameEl.textContent = treatment.stageTitle || 'Stage 3: Arch Expansion & Alignment';

  // Render Doctor Clinical Notes
  const notesContainer = document.getElementById('treatmentDoctorNotesList');
  if (notesContainer) {
    const notes = treatment.notes || [];
    if (notes.length === 0) {
      notesContainer.innerHTML = '<p class="text-muted small">No clinical notes recorded yet.</p>';
    } else {
      notesContainer.innerHTML = notes.map(n => `
        <div class="border-start border-3 border-primary ps-3 mb-3 pb-2">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="fw-bold mb-0 text-dark font-monospace">${n.date}</h6>
            <span class="badge bg-light text-primary border">${n.doctor}</span>
          </div>
          <p class="small text-secondary mb-0">${n.text}</p>
        </div>
      `).join('');
    }
  }

  // Render Before / Current / Projected Photos
  const photoBefore = document.getElementById('photoSmileBefore');
  const photoCurrent = document.getElementById('photoSmileCurrent');
  const photoProjected = document.getElementById('photoSmileProjected');

  if (photoBefore && treatment.photos?.before) photoBefore.src = treatment.photos.before;
  if (photoCurrent && treatment.photos?.current) photoCurrent.src = treatment.photos.current;
  if (photoProjected && treatment.photos?.projected) photoProjected.src = treatment.photos.projected;
}

// Switch Smile Photo View
function switchSmilePhotoTab(viewType) {
  const buttons = document.querySelectorAll('.btn-smile-photo-tab');
  buttons.forEach(b => {
    if (b.getAttribute('data-view') === viewType) {
      b.classList.remove('btn-outline-primary');
      b.classList.add('btn-primary');
    } else {
      b.classList.add('btn-outline-primary');
      b.classList.remove('btn-primary');
    }
  });

  const cards = document.querySelectorAll('.smile-photo-view-card');
  cards.forEach(c => {
    if (c.id === `viewCard-${viewType}`) {
      c.classList.remove('d-none');
    } else {
      c.classList.add('d-none');
    }
  });
}

// Render Appointments List
function renderAppointmentsList() {
  const container = document.getElementById('patientAppointmentsContainer');
  const overviewList = document.getElementById('overviewAppointmentsList');
  if (!container) return;

  const appointments = AppointmentService.getByPatientEmail(currentPatient.email);

  if (appointments.length === 0) {
    const emptyHtml = `
      <div class="text-center py-5">
        <i class="bi bi-calendar2-x text-muted fs-1 mb-2"></i>
        <h5 class="fw-bold text-dark">No Appointments Found</h5>
        <p class="text-muted small">You haven't booked any orthodontic adjustment or consultation yet.</p>
        <button class="btn btn-primary btn-sm" onclick="openPatientBookModal()">
          <i class="bi bi-calendar-plus me-1"></i> Book Your First Visit
        </button>
      </div>
    `;
    container.innerHTML = emptyHtml;
    if (overviewList) overviewList.innerHTML = emptyHtml;
    return;
  }

  // Split into upcoming and past
  const now = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter(a => a.date >= now && a.status !== 'Cancelled').sort((a,b) => a.date.localeCompare(b.date));
  const past = appointments.filter(a => a.date < now || a.status === 'Cancelled' || a.status === 'Completed').sort((a,b) => b.date.localeCompare(a.date));

  const renderAptItem = (apt, isUpcoming) => {
    const [year, month, day] = apt.date.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthStr = monthNames[parseInt(month, 10) - 1] || month;

    const statusBadgeClass = {
      Confirmed: 'status-confirmed',
      Pending: 'status-pending',
      Rescheduled: 'status-rescheduled',
      Completed: 'status-completed',
      Cancelled: 'status-cancelled'
    }[apt.status] || 'status-pending';

    return `
      <div class="appointment-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <div class="apt-date-badge">
            <div class="apt-day">${day}</div>
            <div class="apt-month">${monthStr}</div>
          </div>
          <div class="apt-info">
            <div class="d-flex align-items-center gap-2 mb-1">
              <h5 class="mb-0">${apt.appointmentType}</h5>
              <span class="badge-status ${statusBadgeClass}">${apt.status}</span>
            </div>
            <p><i class="bi bi-clock me-1 text-primary"></i><strong>${apt.time}</strong> with <strong>${apt.doctorName}</strong></p>
            ${apt.notes ? `<p class="text-muted fst-italic mt-1 small"><i class="bi bi-info-circle me-1"></i>${apt.notes}</p>` : ''}
          </div>
        </div>
        <div class="d-flex gap-2 align-self-end align-self-sm-center">
          ${isUpcoming && apt.status !== 'Cancelled' ? `
            <button class="btn btn-sm btn-outline-primary" onclick="openRescheduleModal('${apt.id}')">
              <i class="bi bi-calendar-event me-1"></i> Reschedule
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="cancelAppointmentPrompt('${apt.id}')">
              <i class="bi bi-x-circle me-1"></i> Cancel
            </button>
          ` : `
            <span class="text-muted small">${apt.status === 'Completed' ? '<i class="bi bi-check2-all text-success me-1"></i>Completed' : apt.status}</span>
          `}
        </div>
      </div>
    `;
  };

  let html = '';
  if (upcoming.length > 0) {
    html += `<h6 class="fw-bold text-dark mb-3"><i class="bi bi-calendar-check me-2 text-primary"></i>Upcoming Appointments (${upcoming.length})</h6>`;
    html += upcoming.map(a => renderAptItem(a, true)).join('');
  }

  if (past.length > 0) {
    html += `<h6 class="fw-bold text-dark mt-4 mb-3"><i class="bi bi-clock-history me-2 text-secondary"></i>Past & Completed Visits (${past.length})</h6>`;
    html += past.map(a => renderAptItem(a, false)).join('');
  }

  container.innerHTML = html;

  // Overview compact list
  if (overviewList) {
    if (upcoming.length > 0) {
      overviewList.innerHTML = upcoming.slice(0, 3).map(a => renderAptItem(a, true)).join('');
    } else {
      overviewList.innerHTML = '<p class="text-muted small mb-0">No upcoming appointments scheduled.</p>';
    }
  }
}

// Cancel appointment with confirmation
function cancelAppointmentPrompt(aptId) {
  if (confirm("Are you sure you want to cancel this appointment? You can re-schedule at any time.")) {
    const updated = AppointmentService.cancel(aptId, "Cancelled by patient via portal");
    if (updated) {
      showToast("Your appointment has been cancelled.", "warning", "Appointment Cancelled");
      renderAppointmentsList();
      renderMetricStats();
    }
  }
}

// Reschedule Modal Logic
let reschedulingAppointmentId = null;
function openRescheduleModal(aptId) {
  reschedulingAppointmentId = aptId;
  const appointments = AppointmentService.getAll();
  const apt = appointments.find(a => a.id === aptId);
  if (!apt) return;

  const modalEl = document.getElementById('rescheduleModal');
  if (!modalEl) return;

  document.getElementById('rescheduleAptInfo').textContent = `${apt.appointmentType} with ${apt.doctorName}`;
  const dateInput = document.getElementById('rescheduleNewDate');
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.value = apt.date;

  const timeSelect = document.getElementById('rescheduleNewTime');
  timeSelect.value = apt.time;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function handleRescheduleSubmit(e) {
  e.preventDefault();
  if (!reschedulingAppointmentId) return;

  const newDate = document.getElementById('rescheduleNewDate').value;
  const newTime = document.getElementById('rescheduleNewTime').value;
  const reason = document.getElementById('rescheduleReason').value.trim();

  AppointmentService.reschedule(reschedulingAppointmentId, newDate, newTime, reason || 'Patient requested date change');

  const modalEl = document.getElementById('rescheduleModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  showToast(`Appointment successfully moved to ${newDate} at ${newTime}!`, 'success', 'Rescheduled');
  renderAppointmentsList();
  renderMetricStats();
}

// Patient Dashboard Booking Modal trigger
function openPatientBookModal() {
  const modalEl = document.getElementById('patientBookAdjustmentModal');
  if (!modalEl) return;

  const dateInput = document.getElementById('patientBookDate');
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.value = today.toISOString().split('T')[0];

  // Set default doctor to current patient's assigned doctor if available
  const docSelect = document.getElementById('patientBookDoctor');
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  docSelect.innerHTML = doctors.map(d => `
    <option value="${d.id}" ${currentPatient.treatment?.doctorId === d.id ? 'selected' : ''}>${d.name} (${d.specialty})</option>
  `).join('');

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function handlePatientBookSubmit(e) {
  e.preventDefault();
  const category = document.getElementById('patientBookCategory').value;
  const doctorId = document.getElementById('patientBookDoctor').value;
  const date = document.getElementById('patientBookDate').value;
  const time = document.getElementById('patientBookTime').value;
  const notes = document.getElementById('patientBookNotes').value.trim();

  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const doc = doctors.find(d => d.id === doctorId) || { name: 'Assigned Orthodontist' };

  AppointmentService.add({
    patientName: currentPatient.name,
    patientEmail: currentPatient.email,
    patientPhone: currentPatient.phone || '',
    doctorId: doctorId,
    doctorName: doc.name,
    treatmentType: currentPatient.treatment?.type || 'Orthodontics',
    appointmentType: category,
    date: date,
    time: time,
    status: 'Confirmed',
    notes: notes || 'Booked via patient portal'
  });

  const modalEl = document.getElementById('patientBookAdjustmentModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  showToast(`Adjustment booked for ${date} at ${time} with ${doc.name}!`, 'success', 'Appointment Booked');
  renderAppointmentsList();
  renderMetricStats();
}

// Render Installments & Financial Summary
function renderInstallments() {
  const financials = currentPatient.financials || { totalCost: 4000, amountPaid: 2000, remainingBalance: 2000, installments: [] };
  const total = financials.totalCost;
  const paid = financials.amountPaid;
  const balance = financials.remainingBalance;
  const paidPercent = Math.round((paid / total) * 100);

  const totalEl = document.getElementById('finTotalCost');
  const paidEl = document.getElementById('finAmountPaid');
  const balanceEl = document.getElementById('finRemainingBalance');
  const barEl = document.getElementById('finProgressBar');

  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
  if (paidEl) paidEl.textContent = `$${paid.toLocaleString()}`;
  if (balanceEl) balanceEl.textContent = `$${balance.toLocaleString()}`;
  if (barEl) barEl.style.width = `${paidPercent}%`;

  const tbody = document.getElementById('installmentsTableBody');
  if (!tbody) return;

  const installments = financials.installments || [];
  if (installments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No installment schedule registered.</td></tr>';
    return;
  }

  tbody.innerHTML = installments.map(inst => {
    const statusBadge = {
      Paid: 'status-paid',
      Pending: 'status-pending',
      Upcoming: 'status-upcoming',
      Overdue: 'status-overdue'
    }[inst.status] || 'status-pending';

    return `
      <tr>
        <td class="font-monospace fw-bold text-dark">${inst.id}</td>
        <td>
          <div class="fw-semibold text-dark">${inst.label}</div>
          <small class="text-muted">Payment due: ${inst.date}</small>
        </td>
        <td class="fw-bold text-dark">$${inst.amount}</td>
        <td><span class="badge-status ${statusBadge}">${inst.status}</span></td>
        <td class="small text-secondary">${inst.method || '—'}</td>
        <td class="text-end">
          ${inst.status === 'Pending' ? `
            <button class="btn btn-sm btn-primary" onclick="openSimulatedPaymentModal('${inst.id}')">
              <i class="bi bi-credit-card me-1"></i> Pay Now
            </button>
          ` : inst.status === 'Paid' ? `
            <button class="btn btn-sm btn-outline-secondary" onclick="openReceiptModal('${inst.id}')">
              <i class="bi bi-receipt me-1"></i> Receipt
            </button>
          ` : `
            <span class="text-muted small">Available ${inst.date}</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

// Simulated Payment Modal Logic
let payingInstallmentId = null;
function openSimulatedPaymentModal(instId) {
  payingInstallmentId = instId;
  const financials = currentPatient.financials || {};
  const inst = (financials.installments || []).find(i => i.id === instId);
  if (!inst) return;

  document.getElementById('payModalInstallmentId').textContent = inst.id;
  document.getElementById('payModalDesc').textContent = inst.label;
  document.getElementById('payModalAmount').textContent = `$${inst.amount}`;

  const modalEl = document.getElementById('simulatedPaymentModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function handleSimulatedPaymentSubmit(e) {
  e.preventDefault();
  if (!payingInstallmentId) return;

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const userIndex = users.findIndex(u => u.id === currentPatient.id || u.email.toLowerCase() === currentPatient.email.toLowerCase());

  if (userIndex !== -1) {
    const patientObj = users[userIndex];
    const inst = patientObj.financials.installments.find(i => i.id === payingInstallmentId);
    if (inst) {
      inst.status = 'Paid';
      inst.method = 'Visa •••• 9104 (Simulated)';
      inst.receiptId = 'RCPT-' + Math.floor(1000 + Math.random() * 9000);

      patientObj.financials.amountPaid += inst.amount;
      patientObj.financials.remainingBalance -= inst.amount;

      // Check next installment to set to Pending if exists
      const nextPending = patientObj.financials.installments.find(i => i.status === 'Upcoming');
      if (nextPending) {
        nextPending.status = 'Pending';
      }

      users[userIndex] = patientObj;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      currentPatient = patientObj;
      setCurrentUser(patientObj);

      const modalEl = document.getElementById('simulatedPaymentModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();

      showToast(`Payment of $${inst.amount} successful! Receipt ${inst.receiptId} generated.`, 'success', 'Payment Received');
      renderInstallments();
      renderMetricStats();
    }
  }
}

// Receipt Modal View
function openReceiptModal(instId) {
  const financials = currentPatient.treatment ? currentPatient.financials : {};
  const inst = (financials.installments || []).find(i => i.id === instId);
  if (!inst) return;

  const receiptId = inst.receiptId || ('RCPT-' + Math.floor(1000 + Math.random() * 9000));
  const html = `
    <div class="receipt-wrapper">
      <div class="receipt-stamp">PAID & VERIFIED</div>
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 class="fw-bold text-dark mb-1">AuraSmile Orthodontic Clinic</h4>
          <p class="text-muted small mb-0">742 Evergreen Medical Plaza, Suite 400, Metro City</p>
          <p class="text-muted small mb-0">Phone: +1 (555) 382-SMILE | Tax ID: 94-8821034</p>
        </div>
        <div class="text-end">
          <h5 class="fw-bold text-primary mb-1">${receiptId}</h5>
          <span class="text-muted small">Date: ${inst.date}</span>
        </div>
      </div>
      <hr>
      <div class="row g-3 mb-4">
        <div class="col-6">
          <small class="text-muted text-uppercase fw-bold">Patient Details</small>
          <div class="fw-bold text-dark">${currentPatient.name}</div>
          <div class="small text-secondary">${currentPatient.email}</div>
          <div class="small text-secondary">${currentPatient.phone || ''}</div>
        </div>
        <div class="col-6 text-end">
          <small class="text-muted text-uppercase fw-bold">Treatment Plan</small>
          <div class="fw-bold text-dark">${currentPatient.treatment?.type || 'Orthodontic Care'}</div>
          <div class="small text-secondary">Attending: ${currentPatient.treatment?.doctorName || 'Dr. Marcus Vance'}</div>
        </div>
      </div>
      <div class="bg-light p-3 rounded mb-3">
        <div class="receipt-line-item">
          <span class="text-dark fw-semibold">${inst.label}</span>
          <span class="fw-bold text-dark">$${inst.amount}.00</span>
        </div>
        <div class="receipt-line-item">
          <span class="text-muted">Payment Method</span>
          <span class="text-dark">${inst.method || 'Credit Card'}</span>
        </div>
        <div class="receipt-line-item border-0 pt-2">
          <span class="fw-bold text-dark fs-6">Total Amount Paid</span>
          <span class="fw-bold text-success fs-5">$${inst.amount}.00</span>
        </div>
      </div>
      <div class="d-flex justify-content-between text-muted small mt-4">
        <span>Authorization: AUTH-${Math.floor(100000 + Math.random()*900000)}</span>
        <span>Simulated Demo Receipt</span>
      </div>
    </div>
  `;

  document.getElementById('receiptModalContentContainer').innerHTML = html;
  const modalEl = document.getElementById('receiptModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function printReceipt() {
  window.print();
}

// Populate and Handle Profile Updates
function populateProfileForm() {
  const nameInput = document.getElementById('profileFullName');
  const emailInput = document.getElementById('profileEmail');
  const phoneInput = document.getElementById('profilePhone');
  const dobInput = document.getElementById('profileDob');
  const addressInput = document.getElementById('profileAddress');
  const emergencyInput = document.getElementById('profileEmergency');
  const allergiesInput = document.getElementById('profileAllergies');

  if (nameInput) nameInput.value = currentPatient.name || '';
  if (emailInput) emailInput.value = currentPatient.email || '';
  if (phoneInput) phoneInput.value = currentPatient.phone || '';
  if (dobInput) dobInput.value = currentPatient.dob || '';
  if (addressInput) addressInput.value = currentPatient.address || '';
  if (emergencyInput) emergencyInput.value = currentPatient.emergencyContact || '';
  if (allergiesInput) allergiesInput.value = currentPatient.allergies || '';
}

function handleProfileUpdate(e) {
  e.preventDefault();
  const name = document.getElementById('profileFullName').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();
  const dob = document.getElementById('profileDob').value;
  const address = document.getElementById('profileAddress').value.trim();
  const emergency = document.getElementById('profileEmergency').value.trim();
  const allergies = document.getElementById('profileAllergies').value.trim();

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const index = users.findIndex(u => u.id === currentPatient.id || u.email.toLowerCase() === currentPatient.email.toLowerCase());

  if (index !== -1) {
    users[index].name = name;
    users[index].phone = phone;
    users[index].dob = dob;
    users[index].address = address;
    users[index].emergencyContact = emergency;
    users[index].allergies = allergies;

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    currentPatient = users[index];
    setCurrentUser(users[index]);

    showToast("Profile details updated successfully!", "success", "Profile Updated");
    renderOverviewHeader();
  }
}

// Listen to appointment changes
window.addEventListener('appointmentCreated', () => {
  renderAppointmentsList();
  renderMetricStats();
});
