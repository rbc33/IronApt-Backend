import express from "express"
import upload from "../middleware/multerSetup.js"
import { Router } from "express"
import { uploadFile } from "../controller/fileUpload.controller.js"
import { isAuthenticated } from "../middleware/jwt.middleware.js";

const router = Router();

//File upload route
router.post("/upload", isAuthenticated, upload.single("file"), uploadFile);

export default router;