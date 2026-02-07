import { Router } from "express";
import Apartment from "../models/Apartment.model.js";
import { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/", (req, res, next) => {
  const { name, images, size, pricePerDay, description, capacity } = req.body;

  const newApartment = new Apartment({
    name,
    images,
    size,
    pricePerDay,
    description,
    capacity,
  });

  Apartment.create(newApartment)
    .then((apt) => res.status(200).json(newApartment))
    .catch((err) => next(err));
});

router.get("/", (req, res, next) => {
  // console.log(req)
  Apartment.find()
    .populate("bookings")
    .then((apartments) => res.status(200).json(apartments))
    .catch((err) => next(err));
});

router.get(
  "/:id",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // console.log(req)
    Apartment.findById(id)
      .populate("bookings")
      .then((apartments) => res.status(200).json(apartments))
      .catch((err) => next(err));
  },
);

router.put(
  "/:id",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { _id, name, images, size, pricePerDay, description, capacity } =
      req.body;
    const updatedApt = {
      _id,
      name,
      images,
      size,
      pricePerDay,
      description,
      capacity,
    };
    Apartment.findByIdAndUpdate(id, updatedApt, { new: true })
      .populate("bookings")
      .then((apartments) => res.status(200).json(apartments))
      .catch((err) => next(err));
  },
);

router.delete(
  "/:id",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;


    Apartment.findByIdAndDelete(id)
      .then((apartments) => res.status(200).json(apartments))
      .catch((err) => next(err));
  },
);

export default router;
