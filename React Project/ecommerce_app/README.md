# E-Commerce Product Page (React + Tailwind CSS)

A fully responsive eCommerce product page built with React, Context API, and Tailwind CSS.
It features a clean UI, dynamic cart management, and an interactive product gallery with a lightbox preview.

## Features

### Navigation
- Responsive navbar:
- Desktop: horizontal links with orange underline hover effect.
- Mobile: collapsible sidebar menu with close button.
- Hover states and active link styles for better UX.

### Product Card
- Product details: title, brand, description, pricing with discount.
- Quantity selector: increment/decrement buttons with spacing.
- Add to Cart button:
- Disabled when quantity is 0.
- Adds product to global cart state.

### Cart
- Cart dropdown (desktop & mobile friendly):
- Shows "Your cart is empty" when no items are added.
- Displays product thumbnail, unit price × quantity, and total cost.
- Remove button with red hover effect and click animation.
- Checkout button included.

### Product Gallery
- Thumbnails that sync with main preview image.
- Lightbox preview:
- Opens on click.
- Includes previous/next navigation buttons.
- Supports Escape to close, and arrow keys for navigation.
- Responsive for both mobile and desktop.

### Styling & Interactions
- Built with Tailwind CSS utility classes.
- Smooth hover transitions on buttons and links.
- Fully responsive design (mobile-first).

## Tech Stack
- React (with hooks & context API)
- TypeScript
- Tailwind CSS
- Vite setup

## Project Structure
ecommerce_app/
├── public/ # Static assets (favicon, icons, images, etc.)
├── src/
│ ├── assets/ # Images & logos for products/UI
│ ├── components/ # Reusable UI components
│ ├── context/ # Global state (Cart Context, etc.)
│ ├── pages/ # Page-level components (Product page, etc.)
│ ├── App.tsx # Root React component
│ ├── index.css # Global styles (Tailwind entry)
│ ├── main.tsx # React entry point
│ └── vite-env.d.ts # TypeScript Vite types
├── .gitignore
├── eslint.config.js
├── index.html # Main HTML template
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

bash
Copy code

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/kiitycode/my_alts/tree/main/ecommerce_app
cd ecommerce_app
```

2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Author
- Name: Bolumole Oluwatosin
- Institution: AltSchool Africa
- School: School of Engineering / Front-End Engineering
- ID: ALT/SOE/024/2933
- Group: Circle 17