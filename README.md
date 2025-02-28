# TO-DO-A task management system

A simple and intuitive task management system built with Vite.js, React, Firebase Authentication, Express.js, MongoDB, and TanStack Query. It supports real-time task updates and drag-and-drop functionality.

## 🚀 Live Demo
[[Live Link](https://imminent-paint.surge.sh)]

## 🛠 Technologies Used
- **Frontend:** Vite.js, React, Tailwind CSS
- **Backend:** Express.js, MongoDB
- **State Management & Data Fetching:** TanStack Query
- **Authentication:** Firebase Authentication
- **Drag and Drop:** @hello-pangea/dnd
- **Real-time Syncing:** TanStack Query with optimistic updates

## 📌 Features
### 1. Authentication
- Users must be authenticated to access the app.
- Firebase Authentication (Google Sign-In enabled).
- User details (User ID, email, display name) are stored in MongoDB upon first login.

### 2. Task Management
- Users can **add, edit, delete, and reorder** tasks.
- Drag and drop functionality allows moving tasks between categories:
  - **To-Do**
  - **In Progress**
  - **Done**
- Tasks retain their order when refreshed.
- Each task includes:
  - **Title** (required, max 50 characters)
  - **Description** (optional, max 200 characters)
  - **Timestamp** (auto-generated)
  - **Category** (To-Do, In Progress, Done)

### 3. Database & Persistence
- Used **MongoDB** (via Express.js server) to store tasks.
- Supports **real-time updates**:
  - **Optimistic UI Updates** for instant feedback.
- Tasks remain in their last known state after a refresh.

### 4. Responsive UI
- Built with **React & Tailwind CSS & Daisy Ui**.
- Mobile-friendly drag-and-drop experience.

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/mumuuh/To-do](https://github.com/mumuuh6/To-do)
cd task-management
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd To-Do
npm install

# Install backend dependencies
cd ../To-do-Backend
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in both of the directory
### 4. Run the Application
```bash
# Start the backend server
cd To-do-Backend
npm start

# Start the frontend
cd ../To-Do
npm run dev
```

## 📜 Dependencies
```json
{
  "@hello-pangea/dnd": "^18.0.1",
  "@tanstack/react-query": "^5.66.9",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.2.0",
  "react-hook-form": "^7.54.2"
}
```
