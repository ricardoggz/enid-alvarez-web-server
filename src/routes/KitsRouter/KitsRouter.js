import { Router } from 'express'
import { getKits } from '../../controllers/index.js'

export const KitRouter = Router()
KitRouter
    .get('/all-kits', getKits)