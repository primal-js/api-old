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
}

export default ({ gstore, logger }: Context, { featureDomain }: Modules): FeatureRoutesHandlers => {
  return {
    async listFeatures(_, res) {
      const template = 'features/index'
      let features: QueryResult<FeatureType>

      try {
        features = await featureDomain.getFeatures()
      } catch (error) {
        return res.render(template, { features: [], error })
      }

      res.render(template, {
        features: features.entities,
        pageId: 'home'
      })
    },
    async detailFeature(req, res) {
      /**
       * Create Dataloader instance, unique to this Http Request
       */
      const dataloader = gstore.createDataLoader()
      const template = 'features/detail'
      
      let feature: Entity<FeatureType>
      try {
        feature = await featureDomain.getFeature(req.params.id, dataloader)
      } catch (error) {
        if (error.code === 'ERR_ENTITY_NOT_FOUND') {
          return res.redirect('/404')
        }
        return res.render(template, { post: null, error })
      }

      return res.render(template, {
        pageId: 'feature-view',
        feature
      })
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
        return Boom.badRequest(err)
      }
    },
    async updateFeature(req, res) {
      const dataloader = gstore.createDataLoader();
      const { id } = req.params
      const entityData = req.body

      try {
        const feature = await featureDomain.updateFeature(id, entityData, dataloader, true)
        res.json(feature.plain())
      } catch (err) {
        return Boom.badRequest(err)
      }
    }
  }
}