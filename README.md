# Scatch-Bag-Shop Fullstack

![Bag Shop Screenshot](./screenshots/1.png)

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
   https://github.com/Shariar-Rafi/Scatch-Bag-Shop.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd Scatch-Bag-Shop
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Set up Environment Variables:**
   Create a `.env` file in the root directory and define the required environment variables given bellow):

   ```env
   NODE_ENV=development
   JWT_KEY=secret_key
   EXPRESS_SESSION_SECRET=keyboard123cat
   ```

5. **Run the project:**
   ```bash
    nodemon .\app.js
   ```
   Open `http://localhost:3000` in your browser to view the application!

---

## Dummy Data

After you have set up and run everything, you can use the **dummy bags data** that is already included in the project. If you want to create products quickly on the admin panel, simply open the `dummy_bags_data` folder in the project and use the contents there!

---

## Upcoming Features (Next Version)

**Current Version Status:**
At the moment, any user who logs in can access all features and can do everything.

**What's coming next:**
In the next version, I will introduce Role-Based Access Control and set up 2 different types of users:

1. **Normal Users:** Who can see and buy bags.
2. **Admin User / Owner:** Who can only create, edit, and delete products.
