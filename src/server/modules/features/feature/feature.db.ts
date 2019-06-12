import {
  Entity,
  QueryListOptions,
  QueryResult,
  DeleteResult,
  Validation
} from 'gstore-node'

import { Context, Modules } from '../models'
import { FeatureType } from './models'

export interface FeatureDB {
  getFeatures(options?: QueryListOptions): Promise<QueryResult<FeatureType>>
  getFeature(id: number, dataloader: any, format?: string): Promise<Entity<FeatureType> | FeatureType>
  storeFeature(data: FeatureType, dataloader: any): Promise<Entity<FeatureType>>
  deleteFeature(id: number): Promise<DeleteResult>,
}

export default (context: Context, { utils }: Modules): FeatureDB => {
  const { gstore } = context
  const { Schema } = gstore

  /**
   * Schema for the Feature entity Kind
   */
  const schema = new Schema<FeatureType>({
    id: { type: String },
    createdAt: { type: Date, default: gstore.defaultValues.NOW, read: false, write: false },
    updatedAt: { type: Date, default: gstore.defaultValues.NOW, read: false, write: false },
    deletedAt: { type: Date, read: false, write: false },
    name: { type: String },
    version: { type: String },
    path: { type: String },
    extension: { type: String },
    projectId: { type: Number },
    content: { type: String },
  })

  const ancestor = ['Features', 'default']

  /**
   * Configuration for our Model.list() query shortcut
   */
  schema.queries('list', {
    order: { property: 'createdAt', descending: true },
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
        if (!entity) {
          return
        }
        if (format === 'JSON') {
          return entity.plain()
        }
        return entity
      })
    },
    async storeFeature(data, dataloader) {
      return Feature.update(data.id, data, ancestor, null, null, {
        dataloader,
        replace: true,
      })
    },
    deleteFeature(id) {
      // Feature.deleteAll()
      return Feature.delete(id, ancestor)
    },
  }
}