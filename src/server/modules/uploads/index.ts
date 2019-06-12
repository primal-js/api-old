import { Request, Response } from 'express'
import { Context } from './models'

import initUploadsMiddleware, { UploadsMiddleware } from './middlewares'

export interface UploadsModule {
  middlewares: UploadsMiddleware
}

export default (context: Context): UploadsModule => {
  const middlewares = initUploadsMiddleware()

  return {
    middlewares,
  }
}