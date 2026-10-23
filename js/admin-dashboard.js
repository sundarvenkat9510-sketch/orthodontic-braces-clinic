/**
 * AuraSmile Orthodontic Clinic - Admin Dashboard Controller
 */

let currentAdmin = null;

document.addEventListener('DOMContentLoaded', () => {
  currentAdmin = requireAdminAuth();
  if (!currentAdmin) return;

  setupAdminSidebarNavigation();
  renderAdminOverviewMetrics();
  renderAdminAppointmentsTable();
  renderAdminDoctorsGrid();
  renderAdminPatientsTable();
  renderAdminFinancialLedger();
});

// Admin Sidebar Navigation
function setupAdminSidebarNavigation() {
  const navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-admin-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-admin-section');
      switchAdminSection(target);

      // Mobile close
      const sidebar = document.querySelector('.dashboard-sidebar');
      const backdrop = document.querySelector('.dashboard-backdrop');
      if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        if (backdrop) backdrop.classList.remove('show');
      }
    });
  });
}

function switchAdminSection(sectionId) {
  const navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-admin-section]');
  navLinks.forEach(l => {
    if (l.getAttribute('data-admin-section') === sectionId) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  const sections = document.querySelectorAll('.admin-section');
  sections.forEach(sec => {
    if (sec.id === `adminSection-${sectionId}`) {
      sec.classList.remove('d-none');
    } else {
      sec.classList.add('d-none');
    }
  });

  const pageTitle = document.getElementById('adminPageTitle');
  const titleMap = {
    overview: 'Clinical Operations Overview',
    appointments: 'Appointment Triage & Schedule',
    doctors: 'Orthodontist Staff Management',
    patients: 'Patient Clinical Registry',
    finance: 'Financial Ledger & Billing Analytics'
  };
  if (pageTitle && titleMap[sectionId]) {
    pageTitle.textContent = titleMap[sectionId];
  }
}

// Render Metric Stat Cards
function renderAdminOverviewMetrics() {
  const appointments = AppointmentService.getAll();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const patients = users.filter(u => u.role === 'patient');

  // Stats calculation
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  
  // Total simulated revenue across all patients
  let totalRevenue = 0;
  let totalOutstanding = 0;
  patients.forEach(p => {
    if (p.financials) {
      totalRevenue += (p.financials.amountPaid || 0);
      totalOutstanding += (p.financials.remainingBalance || 0);
    }
  });

  const aptCountEl = document.getElementById('adminStatTotalApts');
  const pendingCountEl = document.getElementById('adminStatPendingApts');
  const patientsCountEl = document.getElementById('adminStatPatients');
  const revCountEl = document.getElementById('adminStatRevenue');

  if (aptCountEl) aptCountEl.textContent = appointments.length;
  if (pendingCountEl) pendingCountEl.textContent = pendingCount;
  if (patientsCountEl) patientsCountEl.textContent = patients.length;
  if (revCountEl) revCountEl.textContent = `$${totalRevenue.toLocaleString()}`;
}

// Render Appointments Table with Filter & Search
function renderAdminAppointmentsTable() {
  const appointments = AppointmentService.getAll();
  const statusFilter = document.getElementById('adminAptFilterStatus')?.value || 'ALL';
  const searchTerm = (document.getElementById('adminAptSearchInput')?.value || '').toLowerCase().trim();

  let filtered = appointments.filter(a => {
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesSearch = !searchTerm || 
      a.patientName.toLowerCase().includes(searchTerm) || 
      a.doctorName.toLowerCase().includes(searchTerm) || 
      a.id.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const tbody = document.getElementById('adminAppointmentsTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No matching appointments found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(apt => {
    const badgeClass = {
      Confirmed: 'status-confirmed',
      Pending: 'status-pending',
      Rescheduled: 'status-rescheduled',
      Completed: 'status-completed',
      Cancelled: 'status-cancelled'
    }[apt.status] || 'status-pending';

    return `
      <tr>
        <td class="font-monospace fw-bold text-dark">${apt.id}</td>
        <td>
          <div class="fw-bold text-dark">${apt.patientName}</div>
          <small class="text-muted">${apt.patientEmail} • ${apt.patientPhone || 'No phone'}</small>
        </td>
        <td>
          <div class="fw-semibold text-primary">${apt.doctorName}</div>
          <small class="text-muted">${apt.appointmentType}</small>
        </td>
        <td>
          <div class="fw-bold text-dark">${apt.date}</div>
          <small class="text-secondary"><i class="bi bi-clock me-1"></i>${apt.time}</small>
        </td>
        <td><span class="badge-status ${badgeClass}">${apt.status}</span></td>
        <td class="small text-muted" style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${apt.notes || '—'}
        </td>
        <td class="text-end">
          <div class="btn-group btn-group-sm">
            ${apt.status === 'Pending' ? `
              <button class="btn btn-outline-success" title="Confirm/Approve" onclick="adminSetAptStatus('${apt.id}', 'Confirmed')">
                <i class="bi bi-check-lg"></i>
              </button>
            ` : ''}
            ${apt.status !== 'Completed' && apt.status !== 'Cancelled' ? `
              <button class="btn btn-outline-primary" title="Mark Completed" onclick="adminSetAptStatus('${apt.id}', 'Completed')">
                <i class="bi bi-check2-all"></i>
              </button>
              <button class="btn btn-outline-danger" title="Cancel Appointment" onclick="adminCancelAptPrompt('${apt.id}')">
                <i class="bi bi-x-circle"></i>
              </button>
            ` : `
              <button class="btn btn-outline-secondary" title="Reactivate" onclick="adminSetAptStatus('${apt.id}', 'Confirmed')">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function adminSetAptStatus(aptId, status) {
  AppointmentService.updateStatus(aptId, status);
  showToast(`Appointment ${aptId} status changed to ${status}.`, 'info', 'Status Updated');
  renderAdminAppointmentsTable();
  renderAdminOverviewMetrics();
}

function adminCancelAptPrompt(aptId) {
  if (confirm(`Are you sure you want to cancel appointment ${aptId}?`)) {
    AppointmentService.cancel(aptId, 'Cancelled by Clinic Admin');
    showToast(`Appointment ${aptId} cancelled.`, 'warning', 'Appointment Cancelled');
    renderAdminAppointmentsTable();
    renderAdminOverviewMetrics();
  }
}

// Render Doctors Grid & Management
function renderAdminDoctorsGrid() {
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const container = document.getElementById('adminDoctorsContainer');
  if (!container) return;

  container.innerHTML = doctors.map(doc => `
    <div class="col-md-6 col-lg-3">
      <div class="card h-100 border shadow-sm rounded-4 overflow-hidden">
        <img src="${doc.image}" class="card-img-top" style="height: 190px; object-fit: cover;" alt="${doc.name}">
        <div class="card-body p-3 d-flex flex-column">
          <h5 class="fw-bold mb-1 fs-6 text-dark">${doc.name}</h5>
          <span class="badge bg-light text-primary border mb-2 align-self-start">${doc.specialty}</span>
          <p class="small text-muted mb-2">${doc.qualifications}</p>
          <div class="small text-secondary mb-3 mt-auto">
            <i class="bi bi-clock me-1 text-primary"></i> ${doc.days} (${doc.hours})
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary flex-grow-1" onclick="openEditDoctorModal('${doc.id}')">
              <i class="bi bi-pencil me-1"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteDoctorPrompt('${doc.id}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Doctor Add/Edit Modal Logic
let editingDoctorId = null;

function openAddDoctorModal() {
  editingDoctorId = null;
  document.getElementById('doctorModalTitle').textContent = "Add New Orthodontist";
  document.getElementById('doctorForm').reset();
  const modalEl = document.getElementById('doctorModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function openEditDoctorModal(docId) {
  editingDoctorId = docId;
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;

  document.getElementById('doctorModalTitle').textContent = `Edit Profile: ${doc.name}`;
  document.getElementById('doctorFormName').value = doc.name;
  document.getElementById('doctorFormTitle').value = doc.title;
  document.getElementById('doctorFormQual').value = doc.qualifications;
  document.getElementById('doctorFormSpec').value = doc.specialty;
  document.getElementById('doctorFormExp').value = doc.experience;
  document.getElementById('doctorFormDays').value = doc.days;
  document.getElementById('doctorFormHours').value = doc.hours;
  document.getElementById('doctorFormImage').value = doc.image;
  document.getElementById('doctorFormBio').value = doc.bio;

  const modalEl = document.getElementById('doctorModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function handleDoctorFormSubmit(e) {
  e.preventDefault();
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const docData = {
    name: document.getElementById('doctorFormName').value.trim(),
    title: document.getElementById('doctorFormTitle').value.trim(),
    qualifications: document.getElementById('doctorFormQual').value.trim(),
    specialty: document.getElementById('doctorFormSpec').value.trim(),
    experience: document.getElementById('doctorFormExp').value.trim(),
    days: document.getElementById('doctorFormDays').value.trim(),
    hours: document.getElementById('doctorFormHours').value.trim(),
    image: document.getElementById('doctorFormImage').value.trim() || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
    bio: document.getElementById('doctorFormBio').value.trim(),
    rating: 4.9,
    reviewsCount: 150,
    skills: ["Orthodontics", "Smile Alignment"]
  };

  if (editingDoctorId) {
    const idx = doctors.findIndex(d => d.id === editingDoctorId);
    if (idx !== -1) {
      doctors[idx] = { ...doctors[idx], ...docData };
      showToast(`Doctor profile ${docData.name} updated.`, 'success', 'Doctor Updated');
    }
  } else {
    const newDoc = {
      id: 'doc-' + Date.now(),
      ...docData
    };
    doctors.push(newDoc);
    showToast(`Doctor ${docData.name} added to staff.`, 'success', 'Doctor Added');
  }

  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
  const modalEl = document.getElementById('doctorModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  renderAdminDoctorsGrid();
}

function adminDeleteDoctorPrompt(docId) {
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;

  if (confirm(`Are you sure you want to remove ${doc.name} from the active staff list?`)) {
    const updated = doctors.filter(d => d.id !== docId);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(updated));
    showToast(`${doc.name} removed from clinic staff.`, 'info', 'Doctor Removed');
    renderAdminDoctorsGrid();
  }
}

// Render Patients Clinical Registry
function renderAdminPatientsTable() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const patients = users.filter(u => u.role === 'patient');

  const tbody = document.getElementById('adminPatientsTableBody');
  if (!tbody) return;

  tbody.innerHTML = patients.map(p => {
    const treat = p.treatment || {};
    const fin = p.financials || {};
    return `
      <tr>
        <td>
          <div class="fw-bold text-dark">${p.name}</div>
          <small class="text-muted">${p.email} • ${p.phone || 'No phone'}</small>
        </td>
        <td>
          <div class="fw-semibold text-primary">${treat.type || 'Custom Plan'}</div>
          <small class="text-muted">Doctor: ${treat.doctorName || 'Assigned'}</small>
        </td>
        <td>
          <div class="progress" style="height: 6px; width: 100px;">
            <div class="progress-bar bg-success" style="width: ${treat.progressPercent || 0}%"></div>
          </div>
          <small class="text-muted">${treat.progressPercent || 0}% (${treat.stageTitle ? treat.stageTitle.substring(0, 20) + '...' : 'Active'})</small>
        </td>
        <td>
          <span class="badge bg-light text-danger border">Allergies: ${p.allergies || 'None'}</span>
        </td>
        <td>
          <div class="fw-bold text-dark">$${(fin.amountPaid || 0).toLocaleString()} <span class="text-muted fw-normal">/ $${(fin.totalCost || 0).toLocaleString()}</span></div>
          <small class="${(fin.remainingBalance || 0) > 0 ? 'text-warning' : 'text-success'}">Balance: $${(fin.remainingBalance || 0).toLocaleString()}</small>
        </td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-primary" onclick="alert('Viewing comprehensive clinical chart for: ${p.name}. Features 3D models, cephalometric tracings, and aligner staging history.')">
            <i class="bi bi-file-earmark-medical me-1"></i> Chart
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Financial Analytics & Ledger
function renderAdminFinancialLedger() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const patients = users.filter(u => u.role === 'patient');

  let paidReceipts = [];
  patients.forEach(p => {
    const insts = p.financials?.installments || [];
    insts.forEach(i => {
      if (i.status === 'Paid') {
        paidReceipts.push({
          receiptId: i.receiptId || 'RCPT-AUTO',
          patientName: p.name,
          date: i.date,
          label: i.label,
          amount: i.amount,
          method: i.method || 'Credit Card'
        });
      }
    });
  });

  const tbody = document.getElementById('adminFinancialTableBody');
  if (!tbody) return;

  if (paidReceipts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No completed transactions recorded.</td></tr>';
    return;
  }

  tbody.innerHTML = paidReceipts.map(r => `
    <tr>
      <td class="font-monospace fw-bold text-primary">${r.receiptId}</td>
      <td class="fw-semibold text-dark">${r.patientName}</td>
      <td class="small text-muted">${r.date}</td>
      <td>${r.label}</td>
      <td class="fw-bold text-success">+$${r.amount}.00</td>
      <td class="small text-secondary">${r.method}</td>
    </tr>
  `).join('');
}

function exportAdminFinancials() {
  showToast("Simulated export: Transaction report generated as AuraSmile_Financial_Summary.csv", "success", "Report Exported");
}
