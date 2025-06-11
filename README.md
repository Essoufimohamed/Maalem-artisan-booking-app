## 📘 README — Maalem+ | Smart Artisan Booking App

---

### 🧠 Project Goal

The goal of **Maalem+** is to **simplify and digitize how people find and book verified artisans** (plumbers, electricians, carpenters, etc.) in Morocco and North Africa. By providing a trusted, online-first experience, we aim to:

-   Save users time searching for reliable local help
-   Offer real-time artisan availability and online booking
-   Empower artisans with digital tools to grow their business
-   Ensure transparency through pricing, reviews, and digital receipts

---

### 🏗️ Project Structure & Tasks

The app is divided into **frontend** and **backend** folders using the **MERN stack** (MongoDB, Express, React, Node.js).

#### 🔧 Phase 1: Project Setup

-   Initialize Git repository
-   Create frontend (`client/`) with Vite + React + Tailwind CSS
-   Create backend (`server/`) with Node.js + Express
-   Setup MongoDB connection with Mongoose
-   Create `.env` files for frontend and backend
-   Enable CORS and define basic Express server config


### 🔐 Phase 2: Authentication & Roles

#### ✅ Backend

-   Create User model (with roles: client, artisan, admin)
-   Implement registration with hashed passwords
-   Implement login with JWT access + refresh tokens
-   Create middleware for authentication and role-based authorization

#### ✅ Frontend

-   Create auth context/provider (React Context)
-   Build Register/Login forms
-   Handle JWT token storage & automatic refresh
-   Redirect based on user role after login

### 🛠️ Phase 3: Artisan Features

#### ✅ Backend

-   Create Artisan profile model
-   Add routes for artisan profile CRUD
-   Add image upload support (Multer + Cloudinary)
-   Implement availability scheduling

#### ✅ Frontend

-   Build artisan profile edit form
-   Allow image upload 
-   View public artisan profiles
-   Display availability calendar

### 🗖️ Phase 4: Booking System

#### ✅ Backend

-   Create Booking model (status, price, date, etc.)
-   Create routes for booking (create, update, cancel)
-   Send notifications (optional)

#### ✅ Frontend

-   Create booking UI on artisan profile page
-   Add calendar date picker + form
-   Booking confirmation screen
-   Booking history view for client and artisan

### ⭐ Phase 5: Reviews & Receipts

#### ✅ Backend

-   Create Review model (linked to booking & artisan)
-   Create digital receipt generation logic
-   Protect review route to ensure client booked first

#### ✅ Frontend

-   Form for submitting reviews
-   Display reviews on artisan profile
-   Digital receipt download button

### 🧑‍💼 Phase 6: Admin Panel

#### ✅ Backend

-   Admin-only middleware
-   Route to approve/reject artisan profiles
-   Route to manage users and bookings

#### ✅ Frontend

-   Admin dashboard with tabbed interface
-   View pending artisan verifications
-   View & manage users
-   View bookings and platform activity

### 💄 Phase 7: UI Polishing

-   Add loading indicators
-   Add toast notifications
-   Create responsive layout (mobile-first)
-   Use Tailwind + ShadCN components
-   Add 404 and error pages

### 🚀 Phase 8: Deployment

-   Deploy backend to Render
-   Deploy frontend to Netlify or Vercel
-   Set up environment variables on both
-   Test full booking flow on production

### 🧪 Optional Add-ons (Phase 9+)

-   In-app messaging between client and artisan
-   Push notifications or email alerts
-   Wallet system or payments (Stripe)

---

### 📦 Tech Stack

-   **Frontend**: React, Vite, Tailwind, Axios, ShadCN
-   **Backend**: Node.js, Express, Mongoose
-   **Auth**: JWT
-   **Database**: MongoDB
-   **Deployment**: Vercel (frontend), Render/Railway (backend)
