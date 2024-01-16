import {Flight} from '../models/flight.js'

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flights",
  })
}

function create(req,res) {
  Flight.create(req.body)
  .then(movie => {
    res.redirect('flights/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('flights/new')
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

export {
  newFlight as new,
  create,
}
