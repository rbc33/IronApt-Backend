import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import middlewareConfig from "./config/index";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Configure middleware first
middlewareConfig(app);

// Import database connection
import("./db");

// Import routes after middleware
import fileUploadRoutes from "./routes/fileUpload.routes";
app.use("/api/fileupload", fileUploadRoutes);

import apartmentRoutes from "./routes/apartment.routes";
app.use("/api/apartment", apartmentRoutes);

import bookingRoutes from "./routes/booking.routes";
app.use("/api/booking", bookingRoutes);

app.get("/", (req: Request, res: Response) => { 
  res.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at: http://localhost:" + PORT ); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});