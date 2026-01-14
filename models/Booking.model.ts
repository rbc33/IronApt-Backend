import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    apartmentId: { type: Schema.Types.ObjectId, ref: 'Apartment', required: true },
    in: { type: Date, required: true, alias: 'checkIn' },
    out: { type: Date, required: true, alias: 'checkOut' },
    guests: { type: Number, required: true },
    guestName: { type: String, required: true },
});

bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

const Booking = model('Booking', bookingSchema);

export default Booking; 
