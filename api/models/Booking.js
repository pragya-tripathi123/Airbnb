const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, require: true,ref:"Place" },
  user:{type:mongoose.Schema.Types.ObjectId,required:true},
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numberOfGuests: { type: String},
  name: { type: String, required: true },
  phone: { String },
  price:Number
});

const BookingModel = mongoose.model('booking',bookingSchema)
module.exports = BookingModel