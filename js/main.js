/**
 * AuraSmile Orthodontic & Braces Clinic
 * Main Core & Shared UI Utilities
 */

// Storage Keys
const STORAGE_KEYS = {
  DOCTORS: 'aurasmile_doctors',
  TREATMENTS: 'aurasmile_treatments',
  USERS: 'aurasmile_users',
  CURRENT_USER: 'aurasmile_currentUser',
  APPOINTMENTS: 'aurasmile_appointments'
};

// Initial Sample Doctors Seed
const INITIAL_DOCTORS = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jenkins",
    title: "Chief Orthodontist & Clinic Director",
    qualifications: "DDS, MS (Orthodontics), ABO Board Certified",
    experience: "16+ Years Experience",
    specialty: "Comprehensive Braces & Surgical Orthodontics",
    bio: "Dr. Jenkins specializes in complex bite correction, adult orthodontics, and interdisciplinary smile design with over 5,000 successful transformations.",
    days: "Mon, Wed, Fri",
    hours: "8:30 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
    rating: 4.9,
    reviewsCount: 320,
    skills: ["Adult Orthodontics", "Complex Malocclusions", "Digital Cephalometrics"]
  },
  {
    id: "doc-2",
    name: "Dr. Marcus Vance",
    title: "Senior Clear Aligner Specialist",
    qualifications: "DMD, MS, Diamond Plus Invisalign Provider",
    experience: "12+ Years Experience",
    specialty: "Clear Aligners & Invisible Orthodontics",
    bio: "A pioneer in 3D digital smile simulation, Dr. Vance creates tailored aligner protocols for adolescents and professionals seeking discreet treatment.",
    days: "Tue, Thu, Sat",
    hours: "9:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80",
    rating: 4.95,
    reviewsCount: 412,
    skills: ["Invisalign Diamond+", "Teen Aligners", "3D iTero Scanning"]
  },
  {
    id: "doc-3",
    name: "Dr. Elena Rostova",
    title: "Pediatric Orthodontist & Dentofacial Orthopedics",
    qualifications: "DDS, Ph.D., Member AAO & WFO",
    experience: "10+ Years Experience",
    specialty: "Early Interceptive Orthodontics & Growth Modification",
    bio: "Specializing in children and pre-teens, Dr. Rostova focuses on airway-friendly orthodontics and gentle habit-breaking appliances.",
    days: "Mon, Tue, Thu",
    hours: "9:00 AM - 5:30 PM",
    image: "https://images.unsplash.com/photo-1594824813637-b2f76856a297?auto=format&fit=crop&w=700&q=80",
    rating: 4.88,
    reviewsCount: 265,
    skills: ["Phase 1 Orthodontics", "Palatal Expansion", "Gentle Pediatric Care"]
  },
  {
    id: "doc-4",
    name: "Dr. David Chen",
    title: "Orthodontist & Aesthetic Specialist",
    qualifications: "DMD, Certificate in Orthodontics",
    experience: "8+ Years Experience",
    specialty: "Ceramic Braces & Accelerated Orthodontics",
    bio: "Dr. Chen utilizes low-friction passive self-ligating brackets and high-tech nickel-titanium wires to shorten treatment time and optimize comfort.",
    days: "Wed, Fri, Sat",
    hours: "10:00 AM - 6:30 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80",
    rating: 4.92,
    reviewsCount: 198,
    skills: ["Ceramic Braces", "Accelerated Mechanics", "Lingual Retainers"]
  }
];

// Initial Sample Treatments Seed
const INITIAL_TREATMENTS = [
  {
    id: "metal-braces",
    name: "Traditional Metal Braces",
    category: "Fixed Appliances",
    subtitle: "High-grade stainless steel with dependable clinical precision",
    description: "The gold standard in orthodontic care. Modern metal braces feature smaller, lower-profile brackets, soft-rounded contours, and customizable colored bands for a fun and efficient transformation.",
    duration: "14 - 24 Months",
    benefits: [
      "Highest mechanical strength for severe crowding",
      "Cost-effective with proven precision results",
      "Customizable colored elastics for teens & kids",
      "Unmatched 3D root torque control"
    ],
    idealFor: "Severe crowding, rotated teeth, deep bites, and patients of all ages.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    badge: "Most Reliable"
  },
  {
    id: "ceramic-braces",
    name: "Ceramic / Clear Braces",
    category: "Aesthetic Braces",
    subtitle: "Tooth-colored polycrystalline brackets for discreet alignment",
    description: "Enjoy the full correction power of traditional braces without the metallic appearance. Our ceramic brackets are engineered to resist staining and blend seamlessly with your natural tooth shade.",
    duration: "14 - 22 Months",
    benefits: [
      "Virtually blends with natural tooth enamel",
      "Stain-resistant high-density ceramic matrix",
      "Smooth rounded edges for oral comfort",
      "Ideal for professionals, adults & older teens"
    ],
    idealFor: "Mild to complex malocclusions where aesthetic discretion is desired.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    badge: "Discreet Style"
  },
  {
    id: "clear-aligners",
    name: "Custom Clear Aligners",
    category: "Removable Aligners",
    subtitle: "Virtually invisible, removable 3D-scanned custom plastic trays",
    description: "Straighten your teeth seamlessly without wires or food restrictions. Using cutting-edge 3D intraoral scans and smart polymer plastic, your teeth gently shift step-by-step into perfect harmony.",
    duration: "6 - 18 Months",
    benefits: [
      "100% Removable for eating, brushing & flossing",
      "Discreet and nearly invisible in everyday photos",
      "No food restrictions or broken wire emergencies",
      "Predictable digital treatment roadmap preview"
    ],
    idealFor: "Mild-to-moderate spacing, crowding, relapsed teeth, and active lifestyles.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    badge: "Top Popularity"
  },
  {
    id: "lingual-braces",
    name: "Lingual (Hidden) Braces",
    category: "Concealed Fixed",
    subtitle: "Custom brackets attached to the backside (tongue side) of teeth",
    description: "The ultimate 100% invisible fixed orthodontic option. Each bracket is custom-molded to fit the unique anatomy behind your teeth so nobody can see that you are wearing braces.",
    duration: "16 - 26 Months",
    benefits: [
      "Completely invisible from the outside front",
      "100% customized CAD/CAM gold alloy brackets",
      "Continuous 24/7 fixed compliance",
      "Preferred by actors, models, and public figures"
    ],
    idealFor: "Adults seeking absolute cosmetic concealment with fixed appliance mechanics.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    badge: "100% Invisible"
  },
  {
    id: "retainers-care",
    name: "Retainers & Post-Treatment Care",
    category: "Retention & Stabilization",
    subtitle: "Protecting and preserving your smile alignment for life",
    description: "After active movement, bone and periodontal ligaments need time to stabilize. We offer clear Essix retainers, durable Hawley retainers, and invisible lingual bonded retention wires for permanent peace of mind.",
    duration: "Long-term (Nightly wear)",
    benefits: [
      "Prevents orthodontic relapse and unwanted shifting",
      "Custom thermoformed clear trays or fixed wire",
      "Replacement warranty and 3D digital file backup",
      "Easy maintenance and hygienic cleaning kits"
    ],
    idealFor: "All patients completing braces or aligner treatment.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    badge: "Lifetime Smile"
  },
  {
    id: "bite-alignment",
    name: "Smile Correction & Bite Alignment",
    category: "Dentofacial Correction",
    subtitle: "Comprehensive solutions for overbites, underbites & crossbites",
    description: "Orthodontics isn't just about straight front teeth—it's about how your jaws interact. We correct overjets, deep bites, crossbites, and open bites to improve chewing function, jaw comfort, and facial symmetry.",
    duration: "12 - 24 Months",
    benefits: [
      "Prevents premature tooth wear and enamel chipping",
      "Relieves strain on the TMJ (jaw joint)",
      "Improves chewing efficiency and digestive health",
      "Harmonizes facial profile and chin balance"
    ],
    idealFor: "Overbite, underbite, crossbite, open bite, and functional jaw discrepancies.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    badge: "Functional Health"
  }
];

// Initial Sample Demo Patient (Emily Carter)
const INITIAL_DEMO_PATIENT = {
  id: "user-patient-101",
  name: "Emily Carter",
  email: "emily@aurasmile.demo",
  password: "password123",
  role: "patient",
  phone: "+1 (555) 234-5678",
  dob: "1998-05-14",
  address: "452 Maple Avenue, Metro City, ST 90210",
  emergencyContact: "David Carter (Spouse) - +1 (555) 987-6543",
  allergies: "Latex (mild), Penicillin",
  registeredAt: "2026-04-12",
  treatment: {
    type: "Clear Aligners (Invisalign)",
    doctorId: "doc-2",
    doctorName: "Dr. Marcus Vance",
    startDate: "2026-05-10",
    targetDate: "2027-05-10",
    currentStageNumber: 3,
    totalStages: 5,
    stageTitle: "Arch Expansion & Premolar Derotation",
    currentTray: 12,
    totalTrays: 24,
    wearHoursGoal: 22,
    complianceScore: "96%",
    progressPercent: 50,
    nextAdjustmentDate: "2026-11-14",
    notes: [
      {
        id: "note-3",
        date: "2026-10-12",
        doctor: "Dr. Marcus Vance",
        text: "Excellent aligner compliance. Minor gap closure on upper anterior incisors progressing ahead of schedule. Delivered Trays 11 through 14. Continue wearing 22 hrs/day."
      },
      {
        id: "note-2",
        date: "2026-08-15",
        doctor: "Dr. Marcus Vance",
        text: "Attachments checked and intact on teeth 4 and 13. Tracking smoothly with zero lag. Chewie usage recommended for 5 mins morning and evening."
      },
      {
        id: "note-1",
        date: "2026-05-10",
        doctor: "Dr. Marcus Vance",
        text: "Initial 3D scan review & attachment placement. Tray #1 inserted. Patient educated on insertion/removal technique and sonic cleaning."
      }
    ],
    photos: {
      before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80",
      current: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80",
      projected: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
    }
  },
  financials: {
    totalCost: 4200,
    amountPaid: 2700,
    remainingBalance: 1500,
    installments: [
      { id: "INST-101", date: "2026-05-10", amount: 1200, label: "Initial Down Payment & 3D Intraoral Scan", status: "Paid", method: "Visa •••• 4242", receiptId: "RCPT-9821" },
      { id: "INST-102", date: "2026-07-10", amount: 500, label: "Installment #1 (Trays 1 - 6)", status: "Paid", method: "Mastercard •••• 8821", receiptId: "RCPT-9904" },
      { id: "INST-103", date: "2026-09-10", amount: 500, label: "Installment #2 (Trays 7 - 12)", status: "Paid", method: "Mastercard •••• 8821", receiptId: "RCPT-1004" },
      { id: "INST-104", date: "2026-10-10", amount: 500, label: "Installment #3 (Trays 13 - 16 & Tracking)", status: "Paid", method: "Apple Pay", receiptId: "RCPT-1025" },
      { id: "INST-105", date: "2026-11-30", amount: 500, label: "Installment #4 (Mid-Course Refinement Scan)", status: "Pending", method: "Pending", receiptId: null },
      { id: "INST-106", date: "2027-01-30", amount: 500, label: "Installment #5 (Trays 17 - 24)", status: "Upcoming", method: "Pending", receiptId: null },
      { id: "INST-107", date: "2027-04-15", amount: 500, label: "Final Installment #6 & Retainer Set", status: "Upcoming", method: "Pending", receiptId: null }
    ]
  }
};

// Initial Sample Demo Admin (Dr. Sarah Jenkins)
const INITIAL_DEMO_ADMIN = {
  id: "user-admin-901",
  name: "Dr. Sarah Jenkins",
  email: "admin@aurasmile.demo",
  password: "password123",
  role: "admin",
  phone: "+1 (555) 382-7645",
  title: "Clinical Director",
  registeredAt: "2025-01-01"
};

// Initial Sample Appointments Seed
const INITIAL_APPOINTMENTS = [
  {
    id: "APT-8801",
    patientName: "Emily Carter",
    patientEmail: "emily@aurasmile.demo",
    patientPhone: "+1 (555) 234-5678",
    doctorId: "doc-2",
    doctorName: "Dr. Marcus Vance",
    treatmentType: "Clear Aligners",
    appointmentType: "Routine Aligner Progress & New Trays",
    date: "2026-11-14",
    time: "10:30 AM",
    status: "Confirmed",
    notes: "Checking compliance on Tray 12; delivering Trays 13 to 16.",
    createdAt: "2026-10-15T09:30:00Z"
  },
  {
    id: "APT-8722",
    patientName: "Emily Carter",
    patientEmail: "emily@aurasmile.demo",
    patientPhone: "+1 (555) 234-5678",
    doctorId: "doc-2",
    doctorName: "Dr. Marcus Vance",
    treatmentType: "Clear Aligners",
    appointmentType: "Tray Fit & Attachment Review",
    date: "2026-10-12",
    time: "02:00 PM",
    status: "Completed",
    notes: "Everything seated properly. No interproximal stripping needed this visit.",
    createdAt: "2026-09-20T14:15:00Z"
  },
  {
    id: "APT-8650",
    patientName: "Emily Carter",
    patientEmail: "emily@aurasmile.demo",
    patientPhone: "+1 (555) 234-5678",
    doctorId: "doc-2",
    doctorName: "Dr. Marcus Vance",
    treatmentType: "Clear Aligners",
    appointmentType: "First Tray Placement",
    date: "2026-05-10",
    time: "09:00 AM",
    status: "Completed",
    notes: "Initial tray insertion, instructions delivered.",
    createdAt: "2026-05-01T11:00:00Z"
  },
  {
    id: "APT-8890",
    patientName: "Lucas Ramirez",
    patientEmail: "lucas.ramirez@example.demo",
    patientPhone: "+1 (555) 762-1149",
    doctorId: "doc-1",
    doctorName: "Dr. Sarah Jenkins",
    treatmentType: "Traditional Metal Braces",
    appointmentType: "Monthly Wire Tightening / Archwire Exchange",
    date: "2026-11-02",
    time: "11:15 AM",
    status: "Confirmed",
    notes: "Replace upper archwire with 0.016x0.022 NiTi. Blue elastics requested.",
    createdAt: "2026-10-18T10:00:00Z"
  },
  {
    id: "APT-8895",
    patientName: "Sophia Lin",
    patientEmail: "sophia.lin@example.demo",
    patientPhone: "+1 (555) 438-9921",
    doctorId: "doc-4",
    doctorName: "Dr. David Chen",
    treatmentType: "Ceramic Braces",
    appointmentType: "New Patient Consultation & 3D Scan",
    date: "2026-11-05",
    time: "03:30 PM",
    status: "Pending",
    notes: "Interested in clear aesthetic braces for adult spacing correction.",
    createdAt: "2026-10-22T16:20:00Z"
  },
  {
    id: "APT-8899",
    patientName: "Aiden Miller",
    patientEmail: "aiden.m@example.demo",
    patientPhone: "+1 (555) 891-2300",
    doctorId: "doc-3",
    doctorName: "Dr. Elena Rostova",
    treatmentType: "Smile Correction & Bite Alignment",
    appointmentType: "Palatal Expander Check",
    date: "2026-11-06",
    time: "04:00 PM",
    status: "Pending",
    notes: "Phase 1 interceptive check for 9-year-old child.",
    createdAt: "2026-10-23T08:10:00Z"
  }
];

// Initialize Storage Seeds
function initLocalStorageSeeds() {
  if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TREATMENTS)) {
    localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(INITIAL_TREATMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([INITIAL_DEMO_PATIENT, INITIAL_DEMO_ADMIN]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  }
}

// Call seed immediately
initLocalStorageSeeds();

/**
 * Toast Notification System
 * type: 'success' | 'danger' | 'warning' | 'info'
 */
function showToast(message, type = 'success', title = 'AuraSmile Clinic') {
  let toastContainer = document.getElementById('auraToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'auraToastContainer';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1095';
    document.body.appendChild(toastContainer);
  }

  const iconMap = {
    success: 'bi-check-circle-fill text-success',
    danger: 'bi-exclamation-octagon-fill text-danger',
    warning: 'bi-exclamation-triangle-fill text-warning',
    info: 'bi-info-circle-fill text-primary'
  };

  const toastId = 'toast-' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center bg-white border shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header border-bottom">
        <i class="bi ${iconMap[type] || iconMap.info} me-2 fs-5"></i>
        <strong class="me-auto text-dark">${title}</strong>
        <small class="text-muted">Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body text-secondary">
        ${message}
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  const toastElement = document.getElementById(toastId);
  if (window.bootstrap && bootstrap.Toast) {
    const bsToast = new bootstrap.Toast(toastElement, { delay: 4500 });
    bsToast.show();
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }
}

/**
 * Update UI for authenticated user state in navigation
 */
function updateNavAuthState() {
  const currentUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  const authNavContainer = document.getElementById('navAuthContainer');
  if (!authNavContainer) return;

  if (currentUserStr) {
    try {
      const user = JSON.parse(currentUserStr);
      const isPatient = user.role === 'patient';
      const dashboardLink = isPatient ? 'patient-dashboard.html' : 'admin-dashboard.html';
      const dashboardLabel = isPatient ? 'Patient Portal' : 'Admin Portal';

      authNavContainer.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-primary dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle"></i>
            <span>${user.name.split(' ')[0]}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            <li><h6 class="dropdown-header">${user.name} (${user.role.toUpperCase()})</h6></li>
            <li><a class="dropdown-item" href="${dashboardLink}"><i class="bi bi-speedometer2 me-2 text-primary"></i>${dashboardLabel}</a></li>
            ${isPatient ? `<li><a class="dropdown-item" href="patient-dashboard.html#appointments"><i class="bi bi-calendar2-check me-2 text-primary"></i>My Appointments</a></li>` : ''}
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item text-danger" onclick="handleLogout()"><i class="bi bi-box-arrow-right me-2"></i>Log Out</button></li>
          </ul>
        </div>
      `;
    } catch (e) {
      console.error("Error reading currentUser", e);
    }
  } else {
    authNavContainer.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-white">
        <i class="bi bi-box-arrow-in-right me-1"></i> Patient Login
      </a>
      <a href="register.html" class="btn btn-sm btn-outline-primary">
        <i class="bi bi-person-plus me-1"></i> Sign Up
      </a>
      <button class="btn btn-sm btn-primary" onclick="openGlobalBookingModal()">
        <i class="bi bi-calendar-plus me-1"></i> Book Consultation
      </button>
    `;
  }
}

// Global booking modal trigger
function openGlobalBookingModal(preselectedDoctorId = '', preselectedTreatment = '') {
  let modalEl = document.getElementById('globalBookingModal');
  if (!modalEl) {
    createGlobalBookingModal();
    modalEl = document.getElementById('globalBookingModal');
  }

  // Populate doctor select
  const doctorSelect = document.getElementById('globalBookingDoctor');
  if (doctorSelect) {
    const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
    doctorSelect.innerHTML = '<option value="">Select an Orthodontist</option>' +
      doctors.map(d => `<option value="${d.id}" ${d.id === preselectedDoctorId ? 'selected' : ''}>${d.name} (${d.specialty})</option>`).join('');
  }

  // Preselect treatment if provided
  if (preselectedTreatment) {
    const treatSelect = document.getElementById('globalBookingTreatment');
    if (treatSelect) {
      treatSelect.value = preselectedTreatment;
    }
  }

  // Set min date to tomorrow
  const dateInput = document.getElementById('globalBookingDate');
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Pre-fill user data if logged in
  const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
  if (currentUser) {
    const nameInput = document.getElementById('globalBookingName');
    const emailInput = document.getElementById('globalBookingEmail');
    const phoneInput = document.getElementById('globalBookingPhone');
    if (nameInput) nameInput.value = currentUser.name || '';
    if (emailInput) emailInput.value = currentUser.email || '';
    if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
  }

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// Dynamically generate the universal booking modal
function createGlobalBookingModal() {
  const modalHtml = `
    <div class="modal fade" id="globalBookingModal" tabindex="-1" aria-labelledby="globalBookingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-clinic-primary">
            <div>
              <h5 class="modal-title fw-bold" id="globalBookingModalLabel">
                <i class="bi bi-calendar-heart me-2"></i>Schedule Your Orthodontic Visit
              </h5>
              <p class="mb-0 text-white-50 small">Expert orthodontic consultation & smile assessment</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form id="globalBookingForm" onsubmit="handleGlobalBookingSubmit(event)">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Full Name *</label>
                  <input type="text" id="globalBookingName" class="form-control" placeholder="e.g. Emily Carter" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="globalBookingEmail" class="form-control" placeholder="name@example.com" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" id="globalBookingPhone" class="form-control" placeholder="+1 (555) 000-0000" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Appointment Category *</label>
                  <select id="globalBookingCategory" class="form-select" required>
                    <option value="Orthodontic Consultation & 3D Scan">Orthodontic Consultation & 3D Scan (New Patient)</option>
                    <option value="Routine Braces Adjustment">Routine Braces Adjustment / Wire Change</option>
                    <option value="Clear Aligner Progress Review">Clear Aligner Progress Review & Tray Delivery</option>
                    <option value="Retainer Check & Replacement">Retainer Check & Replacement</option>
                    <option value="Emergency Wire / Bracket Clip">Emergency Wire / Bracket Clip</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Preferred Orthodontist</label>
                  <select id="globalBookingDoctor" class="form-select" required>
                    <!-- Populated dynamically -->
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Interested Treatment</label>
                  <select id="globalBookingTreatment" class="form-select">
                    <option value="Clear Aligners">Clear Aligners (Invisalign)</option>
                    <option value="Traditional Metal Braces">Traditional Metal Braces</option>
                    <option value="Ceramic Braces">Ceramic / Clear Braces</option>
                    <option value="Lingual Braces">Lingual (Hidden) Braces</option>
                    <option value="Retainers & Retention">Retainers & Retention</option>
                    <option value="Not Sure - Orthodontist Recommendation">Not Sure - Need Recommendation</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Preferred Date *</label>
                  <input type="date" id="globalBookingDate" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Preferred Time Slot *</label>
                  <select id="globalBookingTime" class="form-select" required>
                    <option value="09:00 AM">09:00 AM - Morning</option>
                    <option value="10:30 AM" selected>10:30 AM - Morning</option>
                    <option value="11:45 AM">11:45 AM - Morning</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="03:30 PM">03:30 PM - Afternoon</option>
                    <option value="05:00 PM">05:00 PM - Evening</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Notes or Concerns (Optional)</label>
                  <textarea id="globalBookingNotes" class="form-control" rows="2" placeholder="Tell us about crowding, spacing, previous braces, or specific questions..."></textarea>
                </div>
              </div>
              <div class="mt-4 p-3 bg-light rounded text-muted small border">
                <i class="bi bi-info-circle me-1 text-primary"></i>
                <strong>Notice:</strong> This demo appointment is simulated and saved to your local browser storage. You can view, reschedule, or cancel it via the Patient Portal.
              </div>
              <div class="mt-4 d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary px-4">
                  <i class="bi bi-check-lg me-1"></i> Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Global booking submit handler
function handleGlobalBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('globalBookingName').value.trim();
  const email = document.getElementById('globalBookingEmail').value.trim();
  const phone = document.getElementById('globalBookingPhone').value.trim();
  const category = document.getElementById('globalBookingCategory').value;
  const doctorId = document.getElementById('globalBookingDoctor').value;
  const treatment = document.getElementById('globalBookingTreatment').value;
  const date = document.getElementById('globalBookingDate').value;
  const time = document.getElementById('globalBookingTime').value;
  const notes = document.getElementById('globalBookingNotes').value.trim();

  // Find doctor name
  const doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
  const docObj = doctors.find(d => d.id === doctorId) || { name: 'Assigned Orthodontist' };

  const newApt = {
    id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
    patientName: name,
    patientEmail: email,
    patientPhone: phone,
    doctorId: doctorId,
    doctorName: docObj.name,
    treatmentType: treatment,
    appointmentType: category,
    date: date,
    time: time,
    status: 'Confirmed',
    notes: notes || 'Booked via clinic website booking form',
    createdAt: new Date().toISOString()
  };

  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
  appointments.unshift(newApt);
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

  // Close modal
  const modalEl = document.getElementById('globalBookingModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  showToast(`Appointment confirmed for ${name} on ${date} at ${time} with ${docObj.name}!`, 'success', 'Booking Confirmed');

  // Trigger custom event so dashboards can reload if active
  window.dispatchEvent(new CustomEvent('appointmentCreated', { detail: newApt }));
}

// Global logout handler
function handleLogout() {
  if (confirm("Are you sure you want to log out of your session?")) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showToast("You have been successfully logged out.", "info", "Logged Out");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 600);
  }
}

// Helper: Active link highlighter
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateNavAuthState();
  highlightActiveNavLink();

  // Scroll effect on navbar
  const navbar = document.querySelector('.navbar-clinic');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Auto-close mobile navbar when a link is clicked
  const navCollapse = document.getElementById('clinicNavbar');
  if (navCollapse) {
    const navLinks = navCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show') && window.bootstrap && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
          bsCollapse.hide();
        }
      });
    });
  }
});
