# 🏦 CodeBank - Frontend

A modern, responsive web application for managing and organizing code snippets. Built with React, Vite, and Tailwind CSS for a fast and seamless user experience.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Features Overview](#-features-overview)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and intuitive interface with Tailwind CSS
- 🔐 **Authentication** - Secure user authentication and authorization
- 📝 **Code Editor** - Syntax highlighting for multiple programming languages
- 🔍 **Search & Filter** - Quick search and filter snippets by tags or language
- 📱 **Responsive Design** - Fully responsive across all devices
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📋 **Copy to Clipboard** - One-click code copying
- 🏷️ **Tag Management** - Organize snippets with custom tags
- ⚡ **Fast Performance** - Lightning-fast with Vite's HMR
- 💾 **Local Storage** - Persist user preferences

## 🛠️ Tech Stack

- **Framework:** React 18.x
- **Build Tool:** Vite 5.x
- **Styling:** Tailwind CSS + DaisyUI
- **State Management:** React Context API / Redux (if applicable)
- **HTTP Client:** Axios
- **Code Editor:** React Syntax Highlighter / Monaco Editor
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form
- **Icons:** Lucide React / React Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/buildwithmeraj/codebank-frontend.git
cd codebank-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=CodeBank
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The application should now be running on `http://localhost:5173`

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1

# App Configuration
VITE_APP_NAME=CodeBank
VITE_APP_VERSION=1.0.0

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

## 📜 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code with ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🎯 Features Overview

### User Authentication

- Secure login and registration
- JWT token-based authentication
- Password strength validation
- Remember me functionality

### Snippet Management

- Create, edit, and delete code snippets
- Syntax highlighting for 50+ languages
- Code formatting and beautification
- Export snippets as files

### Search & Organization

- Full-text search across all snippets
- Filter by programming language
- Filter by tags and categories
- Sort by date, name, or language

### User Experience

- Responsive design for mobile, tablet, and desktop
- Dark/light mode toggle
- Keyboard shortcuts for quick actions
- Toast notifications for user feedback
- Loading states and error handling

## 📸 Screenshots

> Add your application screenshots here

## 🔧 Configuration

### Vite Configuration

The project uses Vite with the following plugins:

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

### Tailwind Configuration

Customize your Tailwind setup in `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Drag and drop the 'dist' folder to Netlify
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- None at the moment

## 📝 Todo

- [ ] Add unit tests with Vitest
- [ ] Implement snippet sharing functionality
- [ ] Add code snippet versioning
- [ ] Integrate AI-powered code suggestions
- [ ] Add collaborative editing features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Merajul Islam**

- Portfolio: [meraj.pro](https://meraj.pro)
- GitHub: [@buildwithmeraj](https://github.com/buildwithmeraj)
- Twitter: [@buildwithmeraj](https://twitter.com/buildwithmeraj)
- Email: buildwithmeraj@gmail.com

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library

## 🔗 Related Projects

- [CodeBank Backend](https://github.com/buildwithmeraj/codebank-backend) - Backend API for CodeBank

---

<p align="center">Made with ❤️ by Merajul Islam</p>
<p align="center">⭐ Star this repo if you find it useful!</p>
