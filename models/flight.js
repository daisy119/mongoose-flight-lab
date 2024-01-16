import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema
	
const flightSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departs: Date,
},{
  timestamps: true
})

// Compile the schema into a model and export it. Model is capitalized
const Flight = mongoose.model('FLight', flightSchema)

export {
  Flight
}
