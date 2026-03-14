# Scatch-Bag-Shop Fullstack

![Scatch Bag Shop Screenshot](./screenshots/1.png)

The **Scatch Bag Shop** is a full-stack simple e-commerce web application specifically designed for browsing and managing variety of bags. This project provides an intuitive and responsive platform, ensuring a seamless shopping experience for users and offering product management features.

It is built with a powerful modern tech stack, incorporating scalable back-end architecture and clean front-end templating.

### Key Technologies Used:

- **Node.js & Express.js**: Handles the server-side logic and routing.
- **MongoDB & Mongoose**: Used as the primary database to store user and product data securely.
- **EJS (Embedded JavaScript)**: Powers the dynamic front-end rendered views.
- **Tailwind CSS**: Ensures the UI is beautiful, modern, and fully responsive across all devices.
- **Multer**: Handles file uploads (images) securely and efficiently.
- **Cookie-Parser**: Parses cookies from incoming requests.
- **JSON Web Tokens (JWT) & bcrypt**: Secures user authentication and encrypts sensitive information.
- **Express-Session & Connect-Flash**: Manages secure user sessions and provides seamless feedback messages.

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
