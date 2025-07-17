# 🛡️ Trust-Report

A MERN‑stack application with role-based access control, automated report management, and user permissions.

---

## 📽️ Demo

👉 [Watch Demo Video](https://www.loom.com/share/b1b00f209fcb486b9136d1c473792f4b?sid=1ee2a2cd-1840-4a6b-b68a-2f17d87e2deb)

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure login/logout with JWT
- Refresh token support
- Role-based access (admin, reviewer, viewer)

### 📊 Report Management
- Full CRUD operations
- Detail view for individual reports
- Filter by:
  - **Type** (`forecast`, `analysis`)
  - **Industry** (`Fintech`, `Healthcare`)
  - **Confidence Score**

### 👥 User Management
- Admin-only access to user list and creation
- Role-based logic for creating reviewers and viewers
- Secure admin creation via secret key

---

## 💻 Tech Stack

| Layer    | Technologies                                   
|----------|------------------------------------------------
| Frontend | React, Tailwindcss, ContextAPI, Axios, React-Router-dom, zustand, motion (framer-motion), lucide-react, Sadcn/ui
| Backend  | Node.js, Express, Mongoose, bcryptjs, JWT, cookie-parser, cors, uuid, compression         
| Database | MongoDB 

## 🧭 Getting Started

### 1. Clone the repository

```
git clone https://github.com/rajarshi0303/Trust-Report.git
cd Trust-Report
```

### 2. Create .env in the  server/ directory:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/perceive-now
ACCESS_TOKEN_SECRET=Raju123XYZabcd
REFRESH_TOKEN_SECRET=PatelWYXBqrst345
ADMIN_SECRET_KEY=12345678
```

### 3. Install dependencies
```
cd client
npm install            # installs backend dependencies
cd server
npm install            # installs frontend dependencies
```

### 4. Seed the Database 
This builds initial data with hashed passwords via insertMany() (bypassing middleware):
```
cd server
node seed.js
```

### 5. Start the Server & Client
```
cd client
npm run dev
cd server
npm run dev
```
🔐 Default Admin Login
To test the app quickly, use the pre-seeded admin credentials:
```
Email:    alice@admin.com  
Password: admin123
```
These credentials are added by the seed.js file.

🧾 Creating New Users (Viewer or Admin)
To register a new user:
Visit http://localhost:5173/register
- Fill in the user’s name, email, password, and desired role:
- Choose viewer or reviewer freely.
- To register an admin user, enter the secret admin key below.

🔑 Admin Secret Key
To protect admin user creation, the backend checks for a secret key.
The key is compared against an environment variable:
```
ADMIN_SECRET_KEY=12345678  # default (can be changed)
```
Only users who provide this correct key during registration can become admins.

🔒 Security Measures
- Passwords hashed with bcryptjs
- JWT-based access + refresh token logic
- Role guards in protected routes
- Admin creation gated via secret key

🌟 Future Enhancements
🧠 Frontend Optimizations
- Code splitting with React lazy & Suspense
- Lazy loading components/pages
- Bundle analyzer to reduce size
- Debounced search & pagination
- Charts for confidence trends
- Export reports (CSV/PDF)

⚙️ Backend Enhancements
- Zod for runtime request validation (req.body, params, query)
- Compression middleware to reduce response size
- Clustering to leverage all CPU cores using Node's cluster module
- Redis: 
Store refresh tokens (instead of DB)
Cache frequent report queries (industry/type)
- MongoDB Indexing:
Index on reportType, industry, confidenceScore for fast filtering

🛡️ Security Hardening
- Helmet middleware for securing HTTP headers
- XSS Protection using input sanitizers like xss-clean
- NoSQL Injection protection using express-mongo-sanitize
- CSRF Protection using csurf (on forms)
- Rate Limiting & HPP (HTTP Param Pollution) prevention
- DDoS protection via rate-limiting and clustering

🧪 Testing & CI/CD
- Unit & integration tests (Jest,vitest, React Testing Library)
- API Testing, Perfromance Testing
- Add GitHub Actions or GitLab CI for auto-deploy/test
- Add Postman collection for API sharing
- Use HTTPS in production

🧠 Why Trust-Report?
- This project was built to demonstrate:
- Scalable role-based access control (RBAC)
- Clean backend design with Express + MongoDB
- Practical React UI with Tailwindcss + Sadcn/ui
- Robust architecture suitable for dashboards, admin panels, analytics systems

