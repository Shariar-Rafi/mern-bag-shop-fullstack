# MERN Bag Shop Fullstack

![Bag Shop Screenshot](1.png)

A full-stack "Bag Shop" web application. This project provides an intuitive platform where users can browse and manage bags available in the shop.

## Getting Started

To get a local copy up and running on your PC, follow these simple steps.

### Prerequisites

You need to have the following installed on your machine:
- Node.js
- MongoDB (running locally or a MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate into the project directory:**
   ```bash
   cd mern-bag-shop-fullstack
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Set up Environment Variables:**
   Create a `.env` file in the root directory and define the required environment variables (such as your `MONGODB_URI`, `PORT`, `JWT_KEY`, etc.):
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret
   # Add other relevant environment variables
   ```

5. **Run the project:**
   ```bash
   npm start
   # Or using nodemon:
   # npm run dev
   ```
   Open `http://localhost:3000` (or the port you defined) in your browser to view the application!

---

## Dummy Data

After you have set up and run everything, you can use the **dummy bags data** that is already included in the project. If you want to create products quickly on the admin panel, simply open the `dummy_bags_data` folder in the project and use the contents there to populate the application!

---

## Upcoming Features (Next Version)

**Current Version Status:**
At the moment, any user who logs in can access all features and can do everything.

**What's coming next:**
In the next version, I will introduce Role-Based Access Control and set up 2 different types of users:
1. **Normal Users:** Who can see and buy bags.
2. **Admin User / Owner:** Who can only create, edit, and delete products.
