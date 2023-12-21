import { Router } from 'express'
import { getProducts } from '../../controllers/index.js'

export const ProductRouter = Router()
ProductRouter
    .get('/all-products', getProducts)