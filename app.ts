import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import middlewareConfig from "./config/index.js";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Configure middleware first
middlewareConfig(app);
import { isAuthenticated } from "./middleware/jwt.middleware.js";

// Import database connection
import("./db/index.js");

// Import routes after middleware
import fileUploadRoutes from "./routes/fileUpload.routes.js";
app.use("/api/fileupload", fileUploadRoutes);

import apartmentRoutes from "./routes/apartment.routes.js";
app.use("/api/apartment", apartmentRoutes);

import bookingRoutes from "./routes/booking.routes.js";
app.use("/api/booking",isAuthenticated, bookingRoutes);

import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => { 
  res.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at: http://localhost:" + PORT ); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});