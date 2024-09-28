// Import necessary modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // Import path

// Import Routes
import authRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import shopProductsRouter from "./routes/shop/products-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";
import commonFeatureRouter from "./routes/common/feature-routes.js";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000

// Serve static files from the client in production
if (process.env.NODE_ENV === "production") {
  // Get directory name
  const __filename = new URL(import.meta.url).pathname; 
  const __dirname = path.dirname(__filename); 

  // Serve static files from client/dist
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Serve the index.html for all other requests
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// Basic route for API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // Ensure this is set in your .env
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Define API routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Start server
app.listen(PORT, () => console.log(`SERVER is running on Port ${PORT}`));
