🧑‍💻 Roxiler Systems – MERN Stack Coding Challenge

Submitted by: Viraj Dagade
Date: 31st October 2025

📘 Overview

This project was developed as part of the Full Stack (MERN) Coding Challenge assigned by Roxiler Systems.
It is a complete web application built using the MERN stack (MongoDB, Express, React, Node.js) implementing role-based functionalities for Admin, User, and Store Owner.

⚙️ Tech Stack

Frontend: React (Vite), Tailwind CSS, Axios, React Router
Backend: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
Database: MongoDB Atlas

🚀 Features
👩‍💼 Admin

Add new users (Admin / Owner / User)

Add and view stores

View all users and stores with filters

Dashboard showing total users, stores, and ratings

👤 User

View available stores

Submit or update store ratings (1–5)

Update personal password

🏪 Store Owner

View ratings and comments for their store(s)

See average rating

🔐 Authentication

Secure JWT-based authentication

Password hashing with bcrypt

Role-based route protection for Admin, User, and Owner

🧩 Project Setup
Backend
cd mern-rating-backend
npm install
npm run dev

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

Frontend
cd mern-task-frontend
npm install
npm run dev

Frontend runs at: http://localhost:5173

Backend runs at: http://localhost:5000

📦 Folder Structure
mern-task/
├─ mern-rating-backend/ # Express + MongoDB APIs
└─ mern-task-frontend/ # React + Tailwind frontend

🙏 Acknowledgment

I sincerely thank Roxiler Systems for providing this opportunity.
It was a valuable and enriching experience working on this challenge, helping me strengthen my full-stack development skills.
