import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}
}, {
  timestamps: true
})
	
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: [ 'American', 'Southwest', 'United']
    },
  airport: {
    type: String,
    enum: ['AUS','DFW','DEN', 'LAX','SAN'],
    default: 'DEN',
    },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      const currentDate = new Date();
      const oneYearLater = new Date(currentDate);
      oneYearLater.setFullYear(currentDate.getFullYear() + 1);
      return oneYearLater;
    },
    
  },
  //array for ticketSchema
  tickets: [ticketSchema],
  //referencing meals from Meal model using object id
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]

},{
  timestamps: true
})

// Compile the schema into a model and export it. Model is capitalized
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
