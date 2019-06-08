import express from 'express'
import compression from 'compression'
import initRoutes from './routes'
import path from 'path'
import { Context, AppModules } from './models'

export default (context: Context, modules: AppModules) => {
  const app = express()

  /**
   * Configure views template, static files, gzip
   */
  app.use(compression())

  app.set('views', './views')
  app.set('view engine', 'pug')

  app.use(
    '/public',
    express.static(path.join(__dirname, '..', 'public'), {
      maxAge: '1 year'
    })
  )

  app.disable('x-powered-by')

  initRoutes(context, { app, modules })

  return app
}
