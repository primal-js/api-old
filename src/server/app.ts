import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import initRoutes from './routes'
import mung from 'express-mung'

import { Context, AppModules } from './models'
import boomMiddleware from './middlewares/boom'



export default (context: Context, modules: AppModules) => {
  const app = express()

  /**
   * Configure Middlewares
   */
  app.use(compression())
  app.use(bodyParser.json())

  app.use(mung.json(boomMiddleware))

  app.disable('x-powered-by')

  initRoutes(context, { app, modules })

  return app
}
