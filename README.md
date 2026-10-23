# AuraSmile Orthodontic & Braces Clinic Website

A modern, responsive, multi-page website and patient management portal for an **Orthodontic & Braces Clinic** built using **HTML5, CSS3, JavaScript, and Bootstrap 5.3**.

---

## 🌟 Live Demo Credentials

Use the convenient **1-Click Quick Demo** buttons on the [Login Page](file:///e:/Orthodontic%20Projrct/login.html), or sign in with:

| Role | Email | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **Patient** | `emily@aurasmile.demo` | `password123` | Patient Portal (Emily Carter, Tray 12/24, Installments, Adjustments) |
| **Clinic Admin** | `admin@aurasmile.demo` | `password123` | Admin Portal (Dr. Sarah Jenkins, Operations, Triage, Staff CRUD) |

*You can also create a new patient account anytime via [register.html](file:///e:/Orthodontic%20Projrct/register.html).*

---

## 🦷 Key Features & Pages

### 1. Public Clinic Experience
- **[Home Page (`index.html`)](file:///e:/Orthodontic%20Projrct/index.html)**
  - Hero section: *"Your Perfect Smile Starts Here"*, 3D scan trust badges, 0% interest financing callout.
  - Interactive **Smile Transformation / Before-and-After Gallery** (Crowding, Deep Bite, Diastema Gap, Open Bite).
  - Featured Treatments showcase, Why Choose AuraSmile (iTero 5D, low-friction brackets, gentle orthodontics).
  - Clinical statistics counter (12,500+ Smiles Transformed, 99.4% Satisfaction).
  - Verified patient testimonials & lead orthodontist introductions.
  - Comprehensive clinical FAQ accordion and clinic footer.
- **[Treatments Page (`treatments.html`)](file:///e:/Orthodontic%20Projrct/treatments.html)**
  - Detailed cards with duration, benefits, and modal triggers for:
    1. Traditional Metal Braces
    2. Ceramic / Clear Aesthetic Braces
    3. Custom Clear Aligners (Invisalign)
    4. Lingual (Hidden Behind Teeth) Braces
    5. Retainers & Post-Treatment Stabilization
    6. Smile Correction & Bite Alignment
  - Direct feature & lifestyle comparison matrix table.
  - Clinical suitability and diagnostic disclaimer.
- **[Our Doctors Page (`doctors.html`)](file:///e:/Orthodontic%20Projrct/doctors.html)**
  - Doctor profiles (Dr. Sarah Jenkins, Dr. Marcus Vance, Dr. Elena Rostova, Dr. David Chen).
  - Qualifications, board certifications, years of experience, clinic hours, and one-click direct appointment booking.
  - Clinic patient promise and clinical philosophy.
- **[About Us Page (`about.html`)](file:///e:/Orthodontic%20Projrct/about.html)**
  - Clinic heritage, mission, vision, and 4-step patient journey.
  - Technology spotlight: iTero 5D Scanner, Ultra-Low-Dose CBCT Imaging, ClinCheck AI Simulation, and Class-B Autoclave Sterilization Suite.
  - Hospital-grade CDC & OSHA hygiene standards.
- **[Contact Page (`contact.html`)](file:///e:/Orthodontic%20Projrct/contact.html)**
  - Working validated inquiry form with instant toast alerts.
  - Vector visual interactive clinic map (Evergreen Medical Plaza Suite 400).
  - Transit routes, parking garage validation, phone lines, and operating hours.

### 2. Patient Portal (`patient-dashboard.html`)
- **Dashboard Overview**: Personalized greeting, upcoming visit highlight, active aligner tray compliance (22 hrs/day, 96% score), and pending installment reminder.
- **Appointment & Adjustment Scheduling**:
  - Book orthodontic consultations, routine archwire changes, aligner tray deliveries, or emergency wire clips.
  - Integrated date validation (prevents past dates).
  - Reschedule upcoming appointments with custom reason prompts.
  - Cancel appointments with status tracking.
- **Treatment Progress & Smile Photo Gallery**:
  - 5-stage visual milestone pipeline with animated progress bar.
  - **Interactive Before-and-After photo viewer**: Compare diagnostic Day 1, current Month 6 progress, and projected 3D ClinCheck outcome.
  - Orthodontist clinical notes feed.
- **Payment & Installment Management**:
  - Total treatment cost, amount paid, and remaining balance tracking.
  - Installment schedule table with status indicators (*Paid*, *Pending*, *Upcoming*).
  - **Simulated Payment Modal**: Pay pending installments in real-time with instant LocalStorage balance updates and receipt generation.
  - **Printable Official Receipt**: Itemized charges, clinic seal, and browser print format.
- **Patient Profile Management**: Update phone, emergency contacts, home address, and medical/allergy notes.

### 3. Clinic Administration Portal (`admin-dashboard.html`)
- **Operations Overview**: Metrics on total appointments, pending reviews, active patient load, and revenue collected.
- **Appointment Triage Queue**: Search, filter by status (*Pending, Confirmed, Completed, Cancelled*), and approve or reschedule appointments with 1 click.
- **Orthodontist Staff Management**: Add new doctors, edit existing profile information (hours, days, specialty, bio), or remove staff.
- **Patient Registry**: Overview of all enrolled patients, active treatments, and progress indicators.
- **Financial Ledger & Export**: View completed transactions and simulate exporting reports.

---

## 💻 Tech Stack & Design System

- **HTML5 & Semantic Markup**: Accessible landmarks, forms, labels, and modal dialogs.
- **CSS3 & Custom Theme (`css/style.css`, `css/dashboard.css`)**:
  - *Primary Colors*: Medical Sky Blue (`#0284c7`), Clinical Teal (`#0d9488`).
  - *Accent Colors*: Soft Mint Green (`#10b981`, `#ecfdf5`), Midnight Navy (`#0f172a`).
  - Modern typography using Google Fonts **Plus Jakarta Sans**.
  - Smooth transitions, floating badges, and clean cards with subtle elevation.
- **JavaScript (`js/`)**:
  - `main.js`: Storage initialization, Bootstrap Toast notifications, active nav state, global booking modal.
  - `auth.js`: Authentication state, session handling, password toggle, quick fill helpers.
  - `appointments.js`: Appointment service, slot scheduling, status changes.
  - `patient-dashboard.js`: Patient portal controller (progress, installments, photos, receipts).
  - `admin-dashboard.js`: Clinic administration controller (triage, doctor CRUD, billing).
- **Libraries**:
  - Bootstrap 5.3.3 (CDN)
  - Bootstrap Icons 1.11.3 (CDN)
- **Data Persistence**:
  - HTML5 LocalStorage for demo accounts, appointments, installments, and doctor records.

---

## 🔒 Medical & Demo Disclaimer
*This website is a frontend demonstration created with HTML5, CSS3, JavaScript, and Bootstrap 5. All doctor credentials, patient records, clinical notes, and payment transactions are simulated in local browser storage for demonstration purposes only. Production healthcare platforms require secure server-side infrastructure, password hashing, and HIPAA/GDPR-compliant access controls.*
