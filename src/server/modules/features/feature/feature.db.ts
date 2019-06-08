import {
  Entity,
  QueryListOptions,
  QueryResult,
  DeleteResult
} from 'gstore-node'

import { Context, Modules } from '../models'
import { FeatureType } from './models'

export interface FeatureDB {
  getFeatures(options?: QueryListOptions): Promise<QueryResult<FeatureType>>
  getFeature(id: number, dataloader: any, format?: string): Promise<Entity<FeatureType> | FeatureType>
  createFeature(data: FeatureType, dataloader: any): Promise<Entity<FeatureType>>
  updateFeature(id: number, data: any, dataloader: any, replace: boolean ): Promise<Entity<FeatureType>>
  deleteFeature(id: number): Promise<DeleteResult>,
}

export default (context: Context, { utils }: Modules): FeatureDB => {
  const { gstore } = context
  const { Schema } = gstore

  /**
   * Schema for the Feature entity Kind
   */
  const schema = new Schema<FeatureType>({
    createdAt: { type: Date, default: gstore.defaultValues.NOW, read: false, write: false },
    updatedAt: { type: Date, default: gstore.defaultValues.NOW, read: false, write: false },
    deletedAt: { type: Date, read: false, write: false },
    name: { type: String },
    version: { type: String },
    path: { type: String },
    extension: { type: String },
    projectId: { type: String },
  })

  const ancestor = ['Features', 'default']

  /**
   * Configuration for our Model.list() query shortcut
   */
  schema.queries('list', {
    order: { property: 'modifiedOn', descending: true },
    ancestors: ancestor,
  })

  /**
   * Create a 'Feature' Entity Kind Model
   */
  const Feature = gstore.model('Feature', schema)

  /**
 * DB API
 */
  return {
    getFeatures: Feature.list.bind(Feature),
    getFeature(id, dataloader, format = 'JSON') {
      return Feature.get(id, ancestor, null, null, { dataloader }).then(entity => {
        console.log({ entity })
        if (format === 'JSON') {
          // Transform the gstore 'Entity' instance
          // to a plain object (adding an 'id' prop to it)
          return entity.plain()
        }
        return entity
      })
    },
    createFeature(data, dataloader) {
      const feature = new Feature(data, null, ancestor)
      
      // We add the DataLoader instance to our entity context
      // so it is available in our 'pre' Hooks
      feature.context.dataloader = dataloader
      return feature.save()
    },
    updateFeature(id, data, dataloader, replace) {
      return Feature.update(id, data, ancestor, null, null, {
        dataloader,
        replace
      })
    },
    deleteFeature(id) {
      return Feature.delete(id, ancestor)
    },
  }
}