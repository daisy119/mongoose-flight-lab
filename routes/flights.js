import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()


// GET localhost:3000/flights
router.get('/',flightsCtrl.index)
// GET localhost:3000/flights/new
router.get('/new',flightsCtrl.new)
// GET localhost:3000/flights/:flightsId 
router.get('/:flightsId',flightsCtrl.show)
// GET localhost:3000/flights
router.post('/',flightsCtrl.create)


export { router }