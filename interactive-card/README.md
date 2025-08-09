# Interactive Card Payment UI

A fully responsive, interactive credit card form built with React + TypeScript + Tailwind CSS.
Users can enter their card details, see a real-time preview of their card, and get a confirmation screen after successful submission.


## Features
### Real-Time Card Preview
    Updates the front & back of the card instantly as the user types.

### Input Formatting
    Card number auto-formats into 1234 5678 9012 3456
    Expiration date limited to 2 digits (MM / YY)
    CVC limited to 3 digits

### Form Validation
    Ensures all fields are filled
    Enforces numeric-only inputs for date and CVC
    Shows clear, accessible error messages

### Responsive Layout
    Works seamlessly on mobile and desktop.

### Success State
    Displays a thank-you confirmation after successful submission.  

## Tech Stack
    React (with TypeScript)
    Tailwind CSS for styling
    Vite as the build tool

## Project Structure

src/
├── assets/            # Images & SVGs for card background/logo
├── components/
│   ├── CardPreview.tsx  # Displays the credit card preview
│   ├── PaymentForm.tsx  # Handles input and validation
│   └── SuccessPage.tsx  # Shown after successful submission
├── App.tsx            # Main application logic
└── main.tsx           # React entry point

## Installation & Setup
bash
git clone https://github.com/yourusername/interactive-card-payment.git  # Clone the repository
cd interactive-card-payment                                             # Navigate into the folder
npm install                                                             # Install dependencies
npm run dev                                                             # Run the development server
npm run build                                                           # Build for production:
npm run preview                                                         # Preview the production build:

## How It Works

- User enters card details in the form.
- CardPreview component updates instantly with entered values.
- Form validation checks for missing or incorrect inputs.
- On success, the SuccessPage is displayed.

## AltSchool Project Notes
This project was built as part of AltSchool's Frontend Engineering track assignment to demonstrate:

- Mastery of React state management
- Ability to create responsive UIs with Tailwind CSS
- Writing clean, reusable components
- Implementing form validation and user feedback

## Author
Name: Bolumole Oluwatosin
School: School of Engineering/Front-End Engineering (SOE)
Student ID: ALT/SOE/024/2933
Group: Circle 17