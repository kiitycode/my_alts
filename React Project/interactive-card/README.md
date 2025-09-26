# 💳 Interactive Card Payment UI

A fully responsive, interactive credit card form built with **React**, **TypeScript**, and **Tailwind CSS**.  
Users can enter their card details, see a **real-time card preview**, and get a **confirmation screen** after successful submission.  

**Live Demo:** [https://my-alts-intcard.vercel.app/](https://my-alts-intcard.vercel.app/)  

---

## ✨ Features

### 🖼 Real-Time Card Preview
- Updates the **front & back** of the card instantly as the user types.  

### 🔢 Input Formatting
- Card number auto-formats as `1234 5678 9012 3456`  
- Expiration date restricted to `MM/YY`  
- CVC limited to **3 digits**  

### ✅ Form Validation
- Ensures all fields are filled  
- Enforces numeric-only input for **date** and **CVC**  
- Displays clear, accessible **error messages**  

### 📱 Responsive Layout
- Works seamlessly across **mobile, tablet, and desktop**.  

### 🎉 Success State
- Displays a **thank-you confirmation screen** after successful form submission.  

---

## 🧰 Tech Stack

- ⚛️ React
- 🎨 Tailwind CSS for styling  
- ⚡ Vite as the build tool  

---

## 📁 Project Structure

src/
├── assets/ # Images & SVGs (card background, logos, icons)
├── components/
│ ├── CardPreview.tsx # Displays the credit card preview
│ ├── PaymentForm.tsx # Handles input and validation
│ └── SuccessPage.tsx # Confirmation screen after successful submission
├── App.tsx # Main application logic
└── main.tsx # React entry point

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/kiitycode/interactive-card-payment.git

# Navigate into the folder
cd interactive-card-payment

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview