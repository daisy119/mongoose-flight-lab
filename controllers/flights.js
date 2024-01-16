import {Flight} from '../models/flight.js'

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
    res.redirect('/flights')
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
  .then(flight => {
    // console.log('this is flight--->',flight)
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Detail',
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
    console.log('this is flight--->',flight)
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


export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
}
