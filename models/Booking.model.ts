import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    apartmentId: { type: Schema.Types.ObjectId, ref: 'Apartment', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    guestName: { type: String, required: true },
});

const Booking = model('Booking', bookingSchema);

export default Booking; 
