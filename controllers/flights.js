import {Flight} from '../models/flight.js'
import {Meal} from '../models/meal.js'

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flights",
  })
}

function create(req,res) {
  for (let key in req.body) {
	if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

// async function otherCreate(req,res) {
//   try{
//     const flight = await Flight.create(req.body)
//     res.redirect('/flights/new')

//   } catch (error) {
//     console.log(err)
//     res.redirect('flights/new')
//   }
// }

function index(req,res) {
  Flight.find({})
  .then(flights =>{
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  }) 
}

function show(req,res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    // console.log('this is flight--->',flight)

    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      console.log(meals)
      res.render('flights/show', {
        flight: flight,
        title: 'Flight Detail',
        meals: meals,
      })
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}

function deleteFlight(req,res) {
  // console.log("Deleting movies!")
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight =>{
    res.redirect('/flights')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req,res) {
  // console.log("Gonna update movies!")
  Flight.findById(req.params.flightId)
  .then(flight => {
    // console.log('this is flight--->',flight)
    res.render('flights/edit',{
      flight: flight,
      title: 'Edit A  Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req,res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
    }
  Flight.findByIdAndUpdate(req.params.flightId,req.body,{new:true})
  .then(flight =>{
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}

function createTicket(req,res) {
  // console.log(req.body)
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${req.params.flightId}`)
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/')
  })
}

function addMeals(req,res) {
  //find the flight
  Flight.findById(req.params.flightId)
  .then(flight =>{
      //add the meal id to the meals array
    flight.meals.push(req.body.mealId)
      //save the flight
    flight.save()
    .then(() => {
        //rediect to the flight show view
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addMeals,
}
