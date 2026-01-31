import { Schema, model } from "mongoose";

const apartmentSchema = new Schema({
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  size: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

const Apartment = model("Apartment", apartmentSchema);

export default Apartment;
