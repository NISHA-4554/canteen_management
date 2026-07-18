# 🍔 Canteen Ordering System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that simplifies food ordering in a college canteen. Students can browse food items, add them to their cart, place orders, and track their order history, while administrators can efficiently manage foods, users, and orders.

---

## 📌 Features

### 👨‍🎓 Student
- User Registration & Login
- JWT Authentication
- Browse Food Menu
- Search Food Items
- Filter Foods by Category
- Add Items to Cart
- Checkout Orders
- View Order History
- View & Edit Profile

### 👨‍💼 Admin
- Secure Admin Login
- Dashboard with Statistics
- Food Management (Add, Edit, Delete)
- Cloudinary Image Upload
- User Management
- Order Management
- Revenue Statistics
- Recent Orders
- Order Status Analytics

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt.js
- Multer
- Cloudinary

---

## 📂 Project Structure

```
canteen_ordering_system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/canteen_ordering_system.git
```

Move into project

```bash
cd canteen_ordering_system
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📷 Screens

- Login Page
- Registration Page
- Student Dashboard
- Food Menu
- Shopping Cart
- Checkout Page
- My Orders
- Profile Page
- Admin Dashboard
- Manage Foods
- Manage Orders
- Users Management

---

## 🔑 Authentication

- JWT Token Authentication
- Protected Routes
- Student Authorization
- Admin Authorization
- Password Encryption using Bcrypt

---

## 📊 Admin Dashboard

Displays

- Total Foods
- Total Orders
- Total Users
- Total Revenue
- Recent Orders
- Order Status Analytics

---

## ☁ Cloudinary Integration

Food images are uploaded securely using Cloudinary.

Technologies used:

- Multer
- Cloudinary
- Multer Storage Cloudinary

---

## Future Enhancements

- Payment Gateway Integration
- Email Notifications
- QR Code Ordering
- Live Order Tracking
- Customer Reviews
- Favorites/Wishlist
- Dark Mode
- Mobile Responsive Design

---

## 👩‍💻 Author

**Nisha Palanisamy**

- GitHub: https://github.com/NISHA-4554
- LinkedIn: https://linkedin.com/in/nisha-palanisamy/

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.