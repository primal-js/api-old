import { Request, Response } from 'express'
import { Entity, QueryResult, DeleteResult } from 'gstore-node'
import Boom from 'boom'
import { FeatureType } from './models'
import { Context, Modules } from '../models'

export interface FeatureRoutesHandlers {
  listFeatures(req: Request, res: Response): any
  detailFeature(req: Request, res: Response): any
  deleteFeature(req: Request, res: Response): any
  uploadFeature(req: Request, res: Response): any
}

export default ({ gstore, logger }: Context, { featureDomain }: Modules): FeatureRoutesHandlers => {
  return {
    async listFeatures(_, res) {

      try {
        const features = await featureDomain.getFeatures()
        res.json(features.entities)
      } catch (error) {
        res.json(Boom.boomify(error))
      }
    },
    async detailFeature(req, res) {
      const dataloader = gstore.createDataLoader()
      const { id } = req.params
      
      try {
        const feature = await featureDomain.getFeature(id, dataloader)

        if (!feature) {
          return res.json(Boom.notFound())
        }
        res.json(feature)
      } catch (error) {
        res.json(Boom.boomify(error))
      }
    },
    async deleteFeature(req, res) {
      const { id } = req.params

      try {
        const deleteResponse = await featureDomain.deleteFeature(id)
        res.json({
          id: deleteResponse.key.id,
          success: deleteResponse.success,
        })
      } catch (err) {
        res.json(Boom.badRequest(err))
      }
    },
    async uploadFeature(req, res) {
      const dataloader = gstore.createDataLoader()
      const fileContent = req.file.buffer.toString('utf8')
      const { file, version, dependencies } = req.body
      const nameExtensionMatches = file.match(/(^.+)\.(.+)$/) || []
      const [, name, extension] = nameExtensionMatches
      const id = `${name}@${version}`

      const entity = {
        id,
        name,
        version,
        extension,
        content: fileContent,
      }

      try {
        const feature = await featureDomain.storeFeature(entity, dataloader)
        console.log({feature: feature.plain()})
        res.json(feature.plain())
      } catch (error) {
        console.error({ error })
        res.json(Boom.badRequest(error))
      }
    }
  }
}