import express, { Request, Response } from 'express'
import multer from 'multer'

import { Context, Modules } from './models'

const storage = multer.memoryStorage()
const upload = multer({ storage })

function middleware(req:Request, res:Response, next: Function){
  console.log(req.headers)
}

export default (context: Context, { feature }: Modules) => {
  const apiRouter = express.Router()

  apiRouter.get('/', feature.routesHandlers.listFeatures)
  apiRouter.get('/:id', feature.routesHandlers.detailFeature)
  apiRouter.post('/', feature.routesHandlers.createFeature)
  apiRouter.put('/:id', feature.routesHandlers.updateFeature)
  apiRouter.delete('/:id', feature.routesHandlers.deleteFeature)

  apiRouter.post('/upload', upload.single('file'), feature.routesHandlers.uploadFeature)
  
  return {
    apiRouter
  }
}