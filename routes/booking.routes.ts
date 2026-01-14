import {Router} from "express";
import Booking from "../models/Booking.model"
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", (req, res, next) => {
  const { apartmentId, checkIn, checkOut, guests, guestName } = req.body;
  
  const newBooking = new Booking({    
    apartmentId,
    checkIn,
    checkOut,
    guests,
    guestName
  });

  Booking.create(newBooking)
  .then(b => res.status(200).json(b))
  .catch(err => next(err));

});

router.get("/", (req, res, next) => {
  Booking.find()
  .then(bookings => res.status(200).json(bookings))
  .catch(err => next(err));
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Booking.findByIdAndDelete(id)
  .then(apartments => res.status(200).json(apartments))
  .catch(err => next(err));
});

export default router;
