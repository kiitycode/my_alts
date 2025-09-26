# Spots App

A web app for saving, viewing, and managing your favorite “spots” (locations, posts, or points of interest).  
Built as part of the AltSchool class assignment.  

**Live Demo:** [https://spots-app-react.vercel.app/](https://spots-app-react.vercel.app/)  

---

## 🧰 Tech Stack

- **Framework:** React (Vite)  
- **Language:** JavaScript (ES6+)  
- **Styling:** Tailwind CSS + custom styles  
- **State Management:** React hooks (`useState`, `useEffect`)  
- **Persistence:** Local storage  
- **Tooling:** ESLint, Vite  

---

## ✨ Key Features

- **User Profile / Edit Profile** — Users can view and update their profile details.  
- **Create Post (Spot)** — Add new “spots” (posts or locations) with title/content.  
- **View All Spots** — Browse a feed/grid of saved spots.  
- **Persistent Data** — Spots and profile changes persist across page reloads (via local storage).  
- **Responsive UI** — Designed to look and function well on mobile, tablet, and desktop.  
- **Reusable Components** — Modals, cards, and layouts organized for scalability.  

---

## 📁 Project Structure

spotsapp-react/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, icons, etc.
│ ├── components/ # Reusable UI components (cards, forms, etc.)
│ ├── modals/ # Modal components for profile editing, adding spots
│ ├── styles/ # Custom/global styles
│ ├── App.jsx # Root component with routing/state
│ ├── main.jsx # Vite entry point
│ └── ...
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

---

## 🚀 Getting Started

1. Clone the repo:
```bash
   git clone https://github.com/kiitycode/spotsapp-react.git
   cd spotsapp-react
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
- Opens http://localhost:5173 in your browser.

### 🛠️ Roadmap
 - Add authentication and multi-user support
 - Connect to a backend (Node.js/Express, Supabase, or Firebase)
 - Add image upload for spots
 - Implement search and filtering
 - Deploy progressive web app (PWA) version

### ⚖️ License
MIT © Oluwatosin Bolumole
