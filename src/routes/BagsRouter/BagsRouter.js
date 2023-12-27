import { Router } from 'express'
import { getBags } from '../../controllers/index.js'

export const BagRouter = Router()
BagRouter
    .get('/all-bags', getBags)