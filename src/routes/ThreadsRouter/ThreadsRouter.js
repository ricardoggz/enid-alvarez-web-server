import { Router } from 'express'
import { getThreads } from '../../controllers/index.js'

export const ThreadRouter = Router()
ThreadRouter
    .get('/all-threads', getThreads)