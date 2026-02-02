# FoodHub Client 🍔🍕

> A robust, multi-vendor food delivery platform built with Next.js 14, TypeScript, and Shadcn UI.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🔗 Live Demo
**Access the deployed application here:** [https://foodhub-client-mu.vercel.app](https://foodhub-client-mu.vercel.app)

## 📖 Overview

**FoodHub** is a sophisticated multi-vendor marketplace where customers can order meals from various providers in a single transaction. The system features a complex **Split-Order Architecture**, ensuring that while customers pay once, orders are granularly distributed to specific providers (e.g., the "Burger Chef" only receives the burger tickets, while the "Pasta Chef" receives the pasta tickets).

This repository contains the **Frontend Client**, designed for three distinct user roles:
1.  **Customers:** Browse menus, manage cart, place orders, and track granular item status.
2.  **Providers (Kitchens):** Real-time dashboard to accept orders, cook items, and dispatch deliveries.
3.  **Admins:** Platform oversight and user management.

## ✨ Key Features

### 🛍️ Customer Experience
* **Unified Cart System:** Add items from multiple different vendors into a single cart.
* **Real-Time Status Tracking:** Watch individual item progress. See if your *Burger* is "Ready" while your *Pasta* is still "Cooking".
* **Modern UI/UX:** Slide-out cart drawer, skeleton loading states, and responsive design.
* **Toast Notifications:** Replaced intrusive browser alerts with sleek, non-blocking notifications (via Sonner).

### 👨‍🍳 Provider Dashboard (The Engine)
* **Isolated Order Views:** Providers only see the specific items they need to cook from a larger customer order.
* **Granular Status Control:** Mark specific items as `IN_PROGRESS` or `DELIVERED`.
* **Revenue Tracking:** Real-time calculation of earnings based solely on the provider's fulfilled items.
* **Smart Sync:** Updating item statuses automatically synchronizes with the customer's main order view.

### 🔐 Authentication & Security
* **Role-Based Access Control (RBAC):** Protected routes ensuring Providers cannot access Admin pages, and vice versa.
* **JWT Authentication:** Secure, stateless session management stored via LocalStorage/Cookies.
* **Context API:** Global state management for User Sessions and Cart visibility.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
* **State Management:** React Context API
* **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* A running instance of the **FoodHub Backend**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/foodhub-frontend.git](https://github.com/shamsssarar/foodhub-frontend.git)
    cd foodhub-frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your backend URL.
    *For local development:*
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
    ```
    *For production (Vercel):*
    ```env
    NEXT_PUBLIC_URL=[https://your-production-backend.vercel.app](https://your-production-backend.vercel.app)
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
src/
├── app/
│   ├── dashboard/       # Protected Dashboard layouts
│   │   ├── (admin)/     # Admin specific routes
│   │   ├── (provider)/  # Provider dashboard logic
│   │   └── (user)/      # User history views
│   ├── login/           # Authentication routes
│   ├── register/
│   ├── meals/           # Public meal listing
│   ├── orders/          # Order history & tracking
│   ├── layout.tsx       # Root layout with Toaster & Context providers
│   ├── loading.tsx      # Global loading skeletons
│   └── page.tsx         # Landing page
├── components/
│   ├── home/            # Landing page specific components
│   ├── shared/          # Global components (Navbar, CartDrawer, Footer)
│   └── ui/              # Shadcn UI primitives (Buttons, Cards, Badges)
├── context/
│   ├── AuthContext.tsx  # User session management
│   └── CartContext.tsx  # Cart state management
└── lib/
    └── utils.ts         # Helper functions (CN, formatters)
```

## 👥 Contributors

This project was built with passion and code by:

* **[Shams Sarar]** - *Full Stack Developer* - [GitHub Profile](https://github.com/shamsssarar)

