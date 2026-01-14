import { Router } from "express";
import Apartment from "../models/Apartment.model";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", (req, res, next) => {
  const { name, image, size, pricePerDay, description, capacity } = req.body;

  const newApartment = new Apartment({
    name,
    image,
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
  Apartment.find()
    .populate("bookings")
    .then((apartments) => res.status(200).json(apartments))
    .catch((err) => next(err));
});


router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Apartment.findById(id)
    .populate("bookings")
    .then((apartments) => res.status(200).json(apartments))
    .catch((err) => next(err));
});

export default router;
