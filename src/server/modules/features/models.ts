import { Gstore } from 'gstore-node'
import { Logger } from 'winston'

import { UtilsModule } from '../utils/index'
import { UploadsModule } from '../uploads/index';

import { FeatureModule } from './feature'
import { FeatureDB } from './feature/feature.db'
import { FeatureDomain } from './feature/feature.domain'

export type Context = {
  gstore: Gstore,
  logger: Logger
}

export type Modules = {
  feature?: FeatureModule
  uploads?: UploadsModule
  featureDB?: FeatureDB
  featureDomain?: FeatureDomain
  utils?: UtilsModule
}
