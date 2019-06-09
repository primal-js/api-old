import { Request, Response } from 'express'
import { Entity, QueryResult, DeleteResult } from 'gstore-node'
import Boom from 'boom'
import { FeatureType } from './models'
import { Context, Modules } from '../models'

export interface FeatureRoutesHandlers {
  listFeatures(req: Request, res: Response): any
  detailFeature(req: Request, res: Response): any
  createFeature(req: Request, res: Response): any
  updateFeature(req: Request, res: Response): any
  deleteFeature(req: Request, res: Response): any
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
    async createFeature(req, res) {
      // const entityData = Object.assign({}, req.body, {
      //   file: req.file
      // })
      const entityData = req.body

      // We use the gstore helper to create a Dataloader instance
      const dataloader = gstore.createDataLoader()

      try {
        const feature = await featureDomain.createFeature(entityData, dataloader)
        res.json(feature.plain())
      } catch (err) {
        res.json(Boom.badRequest(err))
      }
    },
    async updateFeature(req, res) {
      const dataloader = gstore.createDataLoader();
      const { id } = req.params
      const entityData = req.body

      try {
        const feature = await featureDomain.updateFeature(id, entityData, dataloader, true)
        if (!feature) {
          return res.json(Boom.notFound())  
        }
        res.json(feature.plain())
      } catch (err) {
        res.json(Boom.badRequest(err))
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
    }
  }
}