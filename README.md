# 🔵 BlueGuardian - Protect Your Digital Identity

## 📖 Overview

BlueGuardian is a digital identity protection platform that helps users detect if their images have been leaked or misused across social media platforms. Using advanced perceptual hashing and AI face detection, BlueGuardian scans for unauthorized use of your personal images and provides tools to report and request removal of leaked content.

## ✨ Features

* 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
* 🖼️ **Image Leak Detection** - Perceptual hashing to find matching images across platforms
* 👤 **AI Face Detection** - Local face detection using face-api.js with Tiny Face Detector
* 📊 **Scan History** - Track all your past scans and their results
* 📝 **Report & Removal** - File reports and request removal of leaked content
* 🔄 **Dual-Site Simulation** - Integrated with SnapShare mock social media platform
* 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

| Category             | Technologies               |
| -------------------- | -------------------------- |
| **Frontend**         | Vanilla JS, HTML5, CSS3    |
| **Backend**          | Node.js, Express.js        |
| **Database**         | MySQL                      |
| **Authentication**   | bcryptjs + JWT             |
| **Image Processing** | Sharp, Multer              |
| **Face Detection**   | face-api.js                |
| **Testing**          | Playwright, Faker.js       |
| **Hash Algorithm**   | Perceptual Hashing (pHash) |

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* MySQL (v8 or higher)
* npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Z4R0U4L/BlueGuardian_Projet
cd blueguardian
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. **Set up the database**

```bash
mysql -u root -p
CREATE DATABASE blueguardian;
exit
npm run migrate
```

5. **Start the application**

```bash
# Start main app (port 3000)
npm start

# Start SnapShare mock platform (port 3001)
npm run snapshare
```

6. **Access the application**

* Main App: [http://localhost:3000](http://localhost:3000)
* SnapShare: [http://localhost:3001](http://localhost:3001)

## 🧪 Running Tests

### Test Structure

```text
tests/
├── Dashboard.spec.js    # Dashboard functionality tests
├── LandingPage.spec.js  # Landing page and navigation tests
├── Login.spec.js        # Authentication login tests
├── SignUp.spec.js       # User registration tests
└── SnapShare.spec.js    # Mock platform integration tests
```

### Execute Tests

```bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test Dashboard.spec.js

# Run tests with UI
npx playwright test --ui

# Run tests in debug mode
npx playwright test --debug

# Generate Playwright HTML report
npx playwright show-report

# Generate Allure report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Allure Reporting

BlueGuardian supports **Allure Reports** for advanced test reporting and visualization.

```bash
# Run tests with Allure results
npx playwright test

# Generate Allure report
npx allure generate allure-results --clean -o allure-report

# Open Allure report
npx allure open allure-report
```

The Allure dashboard provides:

* ✅ Detailed test execution history
* 📊 Visual charts and analytics
* 🧪 Step-by-step test breakdowns
* 📸 Screenshot and error tracking
* ⏱️ Execution time monitoring

### Test Coverage

| Suite              | Tests  | Status     |
| ------------------ | ------ | ---------- |
| Dashboard Tests    | 11     | ✅          |
| Landing Page Tests | 10     | ✅          |
| Login Tests        | 3      | ✅          |
| SignUp Tests       | 5      | ✅          |
| SnapShare Tests    | 6      | ✅          |
| **Total**          | **35** | **✅ 100%** |


## 📁 Project Structure

```text
blueguardian/
├── public/                 # Static assets
├── src/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth, upload handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── views/            # Frontend templates
├── tests/
│   ├── pages/            # Page object models
│   ├── fixtures/         # Test files and images
│   ├── Dashboard.spec.js
│   ├── LandingPage.spec.js
│   ├── Login.spec.js
│   ├── SignUp.spec.js
│   └── SnapShare.spec.js
├── database/
│   └── schema.sql        # Database schema
├── .env.example          # Environment variables template
├── playwright.config.js  # Playwright configuration
└── package.json
```

## 🔧 API Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | User registration     |
| POST   | `/api/auth/login`    | User login            |
| POST   | `/api/scan`          | Upload and scan image |
| GET    | `/api/history`       | Get scan history      |
| POST   | `/api/report`        | Report a leak         |
| POST   | `/api/removal`       | Request removal       |

## 🎯 How It Works

1. **Upload** - User uploads an image through the dashboard
2. **Process** - Image is processed using perceptual hashing and face detection
3. **Scan** - System searches for matching images across connected platforms
4. **Alert** - If a leak is detected, detailed information is displayed
5. **Action** - User can report the leak or request removal

## 📊 Test Results Summary

### Dashboard Tests (11 tests)

* ✅ Dashboard access after login
* ✅ Scanning with valid file
* ✅ Buttons in valid scan (Report, Removal, New Scan)
* ✅ Scanning with invalid file
* ✅ Logout button functionality
* ✅ Back to home button navigation
* ✅ Image preview and metadata display
* ✅ New scan button clears results
* ✅ Scan button disabled without file
* ✅ Scan button enabled after file selection
* ✅ History table shows correct scan data

### Landing Page Tests (10 tests)

* ✅ Correct title verification
* ✅ Get Started button navigation
* ✅ Login button functionality
* ✅ START SCANNING FREE button
* ✅ CREATE FREE ACCOUNT button
* ✅ Features anchor link
* ✅ How It Works anchor link
* ✅ Face AI anchor link
* ✅ Tech Stack anchor link
* ✅ Dashboard route protection

### Login Tests (3 tests)

* ✅ Login with valid credentials
* ✅ Login with incorrect credentials
* ✅ Login with empty fields

### SignUp Tests (5 tests)

* ✅ Sign up with valid data
* ✅ Sign up with existing email
* ✅ Sign up with short password
* ✅ Sign up with empty fields
* ✅ Back to home button navigation

### SnapShare Tests (6 tests)

* ✅ Create new post with image
* ✅ Like button toggle functionality
* ✅ Comment and share buttons exist
* ✅ Modal close and form reset
* ✅ Default username when empty
* ✅ Avatar shows first letter of username



## 👥 Author

* **Noureddine Zaroual** 



*Built with ❤️ to protect digital identities*
