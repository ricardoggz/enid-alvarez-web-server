import { ServerModel } from './models/index.js'

const server = new ServerModel()
//server listen
server.listen()
//server middlewares
server.middlewares()
//server routes
server.routes()