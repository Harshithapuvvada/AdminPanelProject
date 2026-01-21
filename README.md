# E-Commerce Application

A simple MERN stack e-commerce application with a storefront and admin panel.

## Prerequisites

- **Node.js**: You must have Node.js installed to run this project.
- **MongoDB**: Ensure you have a local MongoDB instance running at `mongodb://localhost:27017`.

## Setup Instructions

1. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

## Running the Application

1. **Start Backend Server**
   ```bash
   cd server
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173` (by default)

## Features

- **Storefront**: Browse products, add to cart, checkout.
- **Admin Panel**: Login (password: `admin123`), manage products, view orders.
