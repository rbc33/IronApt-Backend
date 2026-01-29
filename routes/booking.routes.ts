import { Router } from "express";
import Booking from "../models/Booking.model.js";
import Apartment from "../models/Apartment.model.js";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", (req, res, next) => {
  const { apartmentId, checkIn, checkOut, guests, guestName } = req.body;

  const newBooking = new Booking({
    apartmentId,
    checkIn,
    checkOut,
    guests,
    guestName,
  });

  Booking.create(newBooking)
    .then((b) => {
      Apartment.findByIdAndUpdate(apartmentId, { $push: { bookings: b._id } })
        .then(() => res.status(200).json(b))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get("/", (req, res, next) => {
  Booking.find()
    .then((bookings) => res.status(200).json(bookings))
    .catch((err) => next(err));
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Booking.findByIdAndDelete(id)
    .then((deletedBooking) => {
      if (!deletedBooking) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      Apartment.findByIdAndUpdate(deletedBooking.apartmentId, {
        $pull: { bookings: id },
      })
        .then(() => res.status(200).json(deletedBooking))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

export default router;
