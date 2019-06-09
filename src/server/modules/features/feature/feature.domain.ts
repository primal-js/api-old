import Boom from 'boom'
import { Entity, QueryListOptions, QueryResult, DeleteResult } from 'gstore-node'

import { Context, Modules } from '../models'
import { FeatureType } from './models'

export interface FeatureDomain {
  getFeatures(options?: QueryListOptions): Promise<QueryResult<FeatureType>>
  getFeature(id: number | string, dataLoader: any): Promise<Entity<FeatureType>>
  createFeature(data: FeatureType, dataLoader: any): Promise<Entity<FeatureType>>
  updateFeature(id: string | number, data: FeatureType, dataloader: any, overwrite?: boolean): Promise<Entity<FeatureType>>
  deleteFeature(id: string | number): Promise<DeleteResult>,
}

export default (context: Context, { featureDB }: Modules): FeatureDomain => {
  return {
    /**
     * Get a list of Features
     */
    getFeatures(options = {}) {
      return featureDB.getFeatures(options)
    },
    /**
     * Get a Feature
     * @param {*} id Id of the Feature to fetch
     * @param {*} dataloader optional. A Dataloader instance
     */
    async getFeature(id, dataloader) {
      id = +id
      if (isNaN(id)) {
        throw new Error("Feature id must be an integer")
      }
      const feature = <Entity<FeatureType>>(await featureDB.getFeature(id, dataloader))
      return feature
    },
    /**
     * Create a Feature
     * @param {*} data Feature entity data
     * @param {*} dataloader optional Dataloader instance
     */
    createFeature(data: FeatureType, dataloader: any) {
      return featureDB.createFeature(data, dataloader)
    },
    /**
     * Update a Feature entity in the Datastore
     * @param {number} id Id of the Feature to update
     * @param {*} data Feature entity data
     * @param {Dataloader} dataloader optional Dataloader instance
     * @param {boolean} overwrite overwrite the entity in Datastore
     */
    updateFeature(id, data, dataloader, overwrite = false) {
      id = +id
      if (isNaN(id)) {
        throw new Boom("Feature id must be an integer", { statusCode: 400 })
      }
      return featureDB.updateFeature(id, data, dataloader, overwrite)
    },
    /**
     * Delete a Feature entity in the Datastore
     * @param {number} id Id of the Feature to delete
     */
    deleteFeature(id) {
      return featureDB.deleteFeature(+id)
    }
  }
}