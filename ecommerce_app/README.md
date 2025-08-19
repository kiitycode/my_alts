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

## Getting Started

- Clone the repository
git clone https://github.com/kiitycode/my_alts/tree/main/ecommerce_app
cd ecommerce-app

- Install dependencies
npm install

- Run the development server
npm run dev

- Build for production
npm run build

## Author

Name: Bolumole Oluwatosin
Institution: Altschool Africa
School: School of Engineering / Front-End Engineering
ID: ALT/SOE/024/2933
Group: Circle 17