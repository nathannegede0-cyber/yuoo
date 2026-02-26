# Debre Selam Medhanialem Church Management System
An authentic, full-stack management portal designed for the Debre Selam Medhanialem Ethiopian Orthodox Tewahedo Church. This system streamlines member registration, financial stewardship, and church administration.

# Member Portal
5-Step Registration: A smooth, multi-step wizard for new members to join the parish.
Self-Service Profile: Members can update their contact info, family details (spouse/children), and professional skills.
Digital Membership ID: Generates a downloadable, high-resolution .png ID card for church events.
Stewardship Tracker: Real-time progress bar showing annual contributions against yearly goals.
 a feauter Tax Receipts: One-click generation of official 501(c)(3) compliant PDF tax receipts.
 
# Admin & Treasurer Dashboard
Member Management: Searchable database of all parishioners with detailed profile views.
Financial Logging: Secure interface for the treasurer to record tithes and pledges.
Announcement Manager: Post urgent alerts or general news that automatically syncs to the homepage.
Data Export: Export the entire member roster to a formatted Excel spreadsheet for offline office use.

# Frontend:

React.js (Vite)
Tailwind CSS (Modern, responsive styling)
Lucide React (Iconography)
jsPDF & html2canvas (Document generation)

# Backend:

Node.js & Express
MongoDB & Mongoose (NoSQL Database)
Nodemailer (Automated email notifications)
Dotenv (Security & Environment management)

#Project Structure

├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Footer)
│   │   ├── pages/         # Membership, AdminDashboard, MemberProfile
│   │   └── assets/        # Church Logos and Images
├── server/                # Node.js Backend
│   ├── models/            # Mongoose Schemas (Member, Donation, Service)
│   ├── routes/            # API Endpoints (memberRoutes, adminRoutes)
│   └── server.js          # Entry point
└── .gitignore             # Essential security rules


# Security Note
This project uses Environmental Variables to protect sensitive data. The .env file is excluded from Git tracking via .gitignore to prevent database credentials from being exposed.

# License
This project is developed specifically for Debre Selam Medhanialem E.O.T.C. All rights reserved.
