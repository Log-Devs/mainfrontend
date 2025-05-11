# MainFrontend - Logistics App (Users/Admins)

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-blueviolet)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

**Primary Web Application** for [Startup Name]'s Ghana ↔ US logistics operations  
**MVP Target**: 5-10 pilot shipments by June 9, 2025

![Teal (#008080) and Red (#FF0000) UI Preview](https://via.placeholder.com/800x400/008080/FF0000?text=Modern+Logistics+UI)

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup](#%EF%B8%8F-setup)
- [Development Timeline](#-development-timeline)
- [Team Structure](#-team-structure)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [Contact](#-contact)

## 🌟 Project Overview
**Core Components**:
- User/Admin portals for shipment management
- Real-time tracking with Mapbox integration
- Bold visual design using <span style="color: #008080">teal (#008080)</span> and <span style="color: #FF0000">red (#FF0000)</span>
- JWT-secured authentication system
- Integrated with Warehouses App (MVP partner system)

## ✨ Features
### Authentication
- 🔒 JWT-secured signup/login
- Professional form with company verification
- Role-based access control

### Package Management
- 📦 Cargo type dropdown (Electronics, Textiles, etc.)
- Weight/destination inputs
- Automated pickup scheduling

### Tracking Dashboard
- 🗺️ Static Mapbox route visualization
- Real-time status updates
- Unauthenticated view: "Package exists" (red alert)

### Admin Panel
- 👮 Full shipment oversight
- User management interface
- Red action buttons for critical operations

## 🛠 Tech Stack
**Frontend**  
```yaml
Framework: React + Vite
Styling: styled-components (teal #008080 / red #FF0000)
Routing: React Router DOM
Maps: Mapbox GL
State Management: Firebase Realtime Database
```
## 🔗 Backend Integration
```yaml
API: Axios
Endpoints: 
  - /signup
  - /track/:id 
  - /submit-package
Authentication: JWT
```
## 🚀 DevOps
```yaml
Deployment: Vercel (Free Tier)
Testing: 
  - Jest 
  - ESLint
CI/CD: GitHub Actions
```
## ⚙️ Setup
```yaml
Prerequisites
  - Node.js ≥16.x
  - npm ≥8.x
  - Git
CI/CD: GitHub Actions
```
# Clone repository
git clone https://github.com/[Your-Org]/mainfrontend.git
cd mainfrontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your credentials
VITE_API_URL=your_backend_url
VITE_MAPBOX_TOKEN=your_mapbox_key

# Start development server
npm run dev
## 👥 Team Structure

| Role                  | Responsibilities                          |
|-----------------------|-------------------------------------------|
| **Project Manager**   | Contract drafting, daily standups         |
| **Full-Stack Engineer** | API integration, deployment             |
| **Frontend Developer** | UI implementation                       |
| **Backend Developer**  | API support                             |
| **QA/Design Developer** | Testing & design validation            |

## 🤝 Contributing

1. **Create feature branches**:
   ```bash
   git checkout -b feature/your-feature
   ```


2. **Commit Message Conventions**;
```bash
# Format: type(scope?): subject
git commit -m "feat(tracking): Add shipment status component"
git commit -m "fix(auth): Resolve JWT expiration issue"
```
### PR Approvals (Require 2)
- Frontend Developer
- Full-Stack Engineer
- Backend Developer (Optional for API-related PRs)

---

## 🚨 Troubleshooting

| Issue                  | Solution                                                                 |
|------------------------|--------------------------------------------------------------------------|
| API Connection Failed  | Verify `VITE_API_URL` in `.env` file                                     |
| Map Not Rendering      | Ensure valid Mapbox token in `VITE_MAPBOX_TOKEN`                         |
| Style Inconsistencies  | Confirm CSS variables are properly defined:<br><br>```css<br>/* colors.css */<br>:root {<br>  --primary-teal: #008080;<br>  --secondary-red: #FF0000;<br>}<br>``` |

---

## 📬 Contact
**Technical Lead**: [IsaacAbakah](mailto:austinbediako4@gmail.com)  
**Project Manager**: [AustinBediako](mailto:austinbediako4@gmail.com)  
**Backend Support**: [Romay](mailto:austinbediako4@gmail.com)

[![Figma Designs](https://img.shields.io/badge/Figma_Designs-FF0000?style=for-the-badge&logo=figma&logoColor=white)](https://figma.com/your-design-link)
