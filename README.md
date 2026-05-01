<h1 style="display: flex; align-items: center; gap: 8px;"><img src="./public/logo.png" alt="CodeBank Logo" width="32" /><span>CodeBank - Code Snippet Manager</span></h1>

CodeBank is a web app to create, organize, and manage code snippets.

- Live Site: https://codebank.meraj.pro
- Backend Repo: https://github.com/buildwithmeraj/codebank-backend

## Features

- User authentication
- Create, edit, and delete code snippets
- Syntax highlighting for multiple languages
- Search and filter snippets
- Tag-based organization
- Responsive UI
- Dark mode

## Tech Stack

- React
- Vite
- Tailwind CSS
- DaisyUI

## Prerequisites

- Node.js 16+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=CodeBank
```

3. Run the app:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run eslint
```
