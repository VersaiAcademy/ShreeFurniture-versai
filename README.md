# Shri Furniture Village - Full Stack E-commerce Application

A modern furniture e-commerce platform built with React frontend and Node.js backend, featuring MongoDB database and Cloudinary image storage.

## 🚀 Features

- **User Authentication**: JWT-based signup, login, and logout
- **Product Management**: Browse, search, and filter furniture products
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders with COD and online payment options
- **Address Management**: Save and manage delivery addresses
- **Image Upload**: Cloudinary integration for product images
- **Payment Integration**: Razorpay payment gateway
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **FontAwesome** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Cloudinary** for image storage
- **Razorpay** for payments
- **Express Validator** for input validation
- **Multer** for file uploads

## 📁 Project Structure

```
Wooden-Street-Main-Project/
├── backend/                 # Node.js backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── slices/         # Redux slices
│   │   └── store/          # Redux store
│   └── package.json        # Frontend dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Razorpay account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wooden-Street-Main-Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   CLIENT_ORIGIN=http://localhost:5173
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with search, filter, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get user's cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `PUT /api/orders/:orderId` - Update order status
- `POST /api/orders/:orderId/cancel` - Cancel order

### Address
- `POST /api/address` - Create delivery address
- `GET /api/address` - Get user's address
- `PUT /api/address` - Update address
- `DELETE /api/address` - Delete address

### Upload
- `POST /api/upload` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

### Payment
- `POST /api/razorpay/create` - Create Razorpay order
- `POST /api/razorpay/complete` - Complete payment

### Contact
- `POST /api/contact/contactus` - Submit contact form
- `POST /api/contact/review` - Submit site review
- `GET /api/contact/reviews` - Get reviews

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### User
- username, first_name, last_name, email, password

### Product
- pname, pdesc, price, offer, stock_count, images, material, warranty, brand, rating, color

### Cart
- product, user, product_name, price, qty

### Order
- product, order_id, user, address, total, mode, status

### DeliveryAddress
- user, mob1, mob2, postalcode, address, area, landmark, city, state

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Product Search**: Search products by name, description, or brand
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Login/signup with form validation
- **Order Management**: Track orders and order history
- **Address Management**: Save and edit delivery addresses
- **Payment Integration**: Secure payment with Razorpay

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@shrifurniture.com or create an issue in the repository.

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Order tracking
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Product recommendations