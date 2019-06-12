import express, { Request, Response } from 'express'

import { Context, Modules } from './models'

export default (context: Context, { feature, uploads }: Modules) => {
  const apiRouter = express.Router()

  apiRouter.get('/', feature.routesHandlers.listFeatures)
  apiRouter.get('/:id', feature.routesHandlers.detailFeature)
  apiRouter.delete('/:id', feature.routesHandlers.deleteFeature)

  apiRouter.post('/upload', [uploads.middlewares.UploadsInMemory.single('file')], feature.routesHandlers.uploadFeature)
  
  return {
    apiRouter
  }
}