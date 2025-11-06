# 🎨 Canva Clone — Built with Next.js, Fabric.js, and Modern Web Stack

Welcome to a **full-featured design editor** inspired by Canva, built from the ground up using cutting-edge web technologies like **Next.js**, **React**, **Tailwind CSS**, **Fabric.js**, **ShadCN UI**, and a host of other powerful tools.

> ✨ A perfect playground for devs interested in dynamic canvas manipulation, real-time syncing, UI/UX tooling, and scalable full-stack app architecture.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, ShadCN UI
- **Canvas Engine:** Fabric.js
- **State Management:** Zustand
- **Backend:** Convex (real-time database and serverless functions)
- **Auth:** Auth.js
- **File Uploads:** UploadThing
- **Payments:** Stripe
- **Other:** Classnames, Lucide Icons, and more

---

## 🎨 Features

### Canvas Capabilities

- Add objects: Text, Image, Rectangle, Triangle
- Upload images (via UploadThing)
- Set image as canvas background
- Resize canvas dynamically
- Choose background color or apply **linear gradients**
- Enable **free drawing** with custom brush settings

### Object Manipulation

- Move, scale, rotate, and delete objects
- Apply linear gradients to fills/strokes
- Lock/unlock objects
- Adjust object radius (even for images!)
- Rich text formatting: font size, weight, color, alignment

### File Operations

- Export canvas as `.png`, `.jpeg`, `.webp`, `.json`
- Load designs from saved `.json` files
- Access prebuilt templates to quickly get started

### UX / Logic

- Undo & Redo with persistent history
- Auto-save on canvas changes (powered by Convex)
- Disable features when offline
- Smart UI rendering based on connection status
- Stripe integration for monetizing premium features

---

## 🧠 Why This Project?

This project is a demonstration of what’s possible with **Fabric.js** inside a **Next.js full-stack environment**. It showcases real-time design tools, clean UI architecture with ShadCN components, and how to tie in powerful services like UploadThing, Stripe, and Convex for modern app needs.

---

## 📸 Demo

> Coming soon: Live demo link + preview GIFs

---

## 📂 Project Structure

```
├── app/                # App Router structure (Next.js)
├── components/         # UI and canvas components
├── hooks/              # Custom React hooks (e.g., useCanvas, useCanvasHistory)
├── lib/                # Utility functions, Convex helpers
├── store/              # Zustand store for global state
├── convex/             # Backend logic (Convex functions)
├── public/             # Static assets
├── styles/             # Global styles (Tailwind config)
```

---

## 🛠 Setup & Installation

```bash
git clone https://github.com/your-username/canva-clone.git
cd canva-clone
pnpm install
pnpm dev
```

> Make sure to configure your `.env` for Auth.js, Convex, UploadThing, and Stripe.

---

## 🙌 Contributions

Contributions, issues, and feature suggestions are welcome! Feel free to fork this repo and submit a PR.

---

## 📄 License

MIT License

---

Want me to include a sample `.env` setup, add demo GIFs sections, or set up deploy buttons (like Vercel)? Let me know!
