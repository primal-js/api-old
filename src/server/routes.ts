import path from 'path'
import { Request, Response, NextFunction, Express } from 'express'
import { Context, AppModules } from './models'

export type RoutesType = {
  app: Express,
  modules: AppModules
}

export default ({ logger, config }: Context, { app, modules: { features } }: RoutesType) => {

  /**
   * Web Routes
   */
  app.use('/features', (_, res) => {
    res.send('Features!')
  })

  /**
   * 404 Page Not found
   */
  app.get('/404', (_, res) => {
    res.render(path.join(__dirname, 'views', '404'))
  })

  /**
   * Default route '/features'
   */
  app.get('*', (_, res) => res.redirect('/features'))

  /**
   * Error handling
   */
  app.use((err: any, _: Request, res: Response, next: NextFunction) => {
      const payload = (err.output && err.output.payload) || err
      const statusCode = (err.output && err.output.statusCode) || 500

      logger.error(payload)

      return res.status(statusCode).json(payload)
    }
  )
}
