import express from 'express'
import { Context, Modules } from './models'

export default (context: Context, { feature }: Modules) => {
  const apiRouter = express.Router()

  apiRouter.get('/', feature.routesHandlers.listFeatures)
  apiRouter.get('/:id', feature.routesHandlers.detailFeature)
  
  return {
    apiRouter
  }
}