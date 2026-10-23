/**
 * AuraSmile Orthodontic Clinic - Authentication Module
 * Simulated authentication using LocalStorage for frontend demo.
 */

// Retrieve currently logged-in user
function getCurrentUser() {
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
}

// Set current user session
function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

// Require patient authentication on protected pages
function requirePatientAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html?redirect=patient-dashboard.html";
    return null;
  }
  return user;
}

// Require admin authentication on admin dashboard
function requireAdminAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html?redirect=admin-dashboard.html";
    return null;
  }
  if (user.role !== 'admin') {
    alert("Access Denied: This area requires Clinic Administrator privileges. Please sign in as an Administrator.");
    window.location.href = "login.html";
    return null;
  }
  return user;
}

// Login Handler
function handleLogin(email, password) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const cleanEmail = email.trim().toLowerCase();

  const matchedUser = users.find(u => 
    u.email.toLowerCase() === cleanEmail && 
    (u.password === password || (u.isDemoRegistration && password && password.length >= 6))
  );

  if (matchedUser) {
    // Clone user without password in session
    const sessionUser = { ...matchedUser };
    delete sessionUser.password;
    setCurrentUser(sessionUser);

    showToast(`Welcome back, ${matchedUser.name}!`, 'success', 'Login Successful');
    return { success: true, user: sessionUser };
  } else {
    return { success: false, message: 'Invalid email or password. Please try again or use the Quick Fill demo buttons.' };
  }
}

// Registration Handler (Simulated frontend demo)
function handleRegister(userData) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const emailExists = users.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());

  if (emailExists) {
    return { success: false, message: 'An account with this email address already exists. Please log in.' };
  }

  // Create patient profile - Frontend demo: do not store raw password in LocalStorage
  const newPatient = {
    id: 'user-patient-' + Date.now(),
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    role: 'patient',
    isDemoRegistration: true,
    phone: userData.phone.trim(),
    dob: userData.dob || '2000-01-01',
    address: userData.address || 'Demo Address, Metro City',
    emergencyContact: userData.emergencyContact || 'Emergency Contact Demo',
    allergies: userData.allergies || 'None reported',
    registeredAt: new Date().toISOString().split('T')[0],
    treatment: {
      type: userData.treatmentType || 'Custom Clear Aligners',
      doctorId: 'doc-2',
      doctorName: 'Dr. Marcus Vance',
      startDate: new Date().toISOString().split('T')[0],
      targetDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      currentStageNumber: 1,
      totalStages: 5,
      stageTitle: 'Phase 1: Initial Digital Diagnostic & Alignment',
      currentTray: 1,
      totalTrays: 20,
      wearHoursGoal: 22,
      complianceScore: '100%',
      progressPercent: 5,
      nextAdjustmentDate: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0],
      notes: [
        {
          id: 'note-welcome',
          date: new Date().toISOString().split('T')[0],
          doctor: 'Dr. Marcus Vance',
          text: 'Welcome to AuraSmile! Digital impression captured. Starting Tray #1 delivery scheduled.'
        }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80",
        current: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80",
        projected: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
      }
    },
    financials: {
      totalCost: 3800,
      amountPaid: 800,
      remainingBalance: 3000,
      installments: [
        { id: "INST-NEW-1", date: new Date().toISOString().split('T')[0], amount: 800, label: "Initial Down Payment", status: "Paid", method: "Credit Card", receiptId: "RCPT-" + Math.floor(1000 + Math.random()*9000) },
        { id: "INST-NEW-2", date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0], amount: 500, label: "Installment #1", status: "Pending", method: "Pending", receiptId: null },
        { id: "INST-NEW-3", date: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0], amount: 500, label: "Installment #2", status: "Upcoming", method: "Pending", receiptId: null },
        { id: "INST-NEW-4", date: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0], amount: 500, label: "Installment #3", status: "Upcoming", method: "Pending", receiptId: null }
      ]
    }
  };

  users.push(newPatient);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  // Log in immediately
  const sessionUser = { ...newPatient };
  delete sessionUser.password;
  setCurrentUser(sessionUser);

  return { success: true, user: sessionUser };
}

// Toggle password visibility helper
function setupPasswordToggle(inputSelector, toggleBtnSelector) {
  const input = document.querySelector(inputSelector);
  const btn = document.querySelector(toggleBtnSelector);
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    const isPassword = input.getAttribute('type') === 'password';
    input.setAttribute('type', isPassword ? 'text' : 'password');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
    }
  });
}
