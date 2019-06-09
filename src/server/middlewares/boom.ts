import { Request, Response } from 'express'
import Boom from 'boom'

function boomMiddleware(body: any, req: Request, res: Response): any {
  if (Boom.isBoom(body)) {
    res.statusCode = body.output.statusCode
    return body.output
  }
  return body
}

export default boomMiddleware
