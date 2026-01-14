import {Router} from "express";
import Apartment from "../models/Apartment.model"

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
  .then(apt => res.status(200).json(newApartment))
  .catch(err => next(err));

})

export default router;

