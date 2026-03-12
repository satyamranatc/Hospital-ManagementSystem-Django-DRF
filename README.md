# Hospital Management System (CareFlow)

CareFlow is a premium, full-stack Hospital Management System designed for modern healthcare facilities. Built with Django REST Framework and React + Tailwind CSS, it offers a sleek interface and robust API for managing doctors, patients, and appointments.

## 🚀 Teck Stack

- **Backend**: Django, Django REST Framework, SQLite
- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Lucide React
- **Icons**: Lucide React
- **Animations**: Framer Motion

## ✨ Key Features

- **Dashboard**: High-level overview of hospital statistics with interactive charts and recent activity.
- **Doctor Management**: Complete CRUD functionality for hospital medical staff.
- **Patient Directory**: Comprehensive records management for patients, including medical history.
- **Appointment Scheduling**: Real-time tracking and scheduling of medical consultations.
- **Admin Control Center**: System settings and health monitoring for administrators.

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 1. Backend Setup
```bash
# Navigate to root directory
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd hospital_frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 📸 Project Structure
- `api/`: Django application logic, models, serializers, and views.
- `hospital_backend/`: Django project settings and root URLs.
- `hospital_frontend/`: React application, components, and pages.

## 🌐 API Documentation
- `GET /api/doctors/`: List all doctors.
- `POST /api/doctors/`: Add a new doctor.
- `GET /api/patients/`: List all patients.
- `GET /api/appointments/`: List all appointments.

## 📄 License
This project is open-source and available under the MIT License.
