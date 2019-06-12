import Storage from '@google-cloud/storage'
import { Gstore } from 'gstore-node'
import { Logger } from 'winston'
import { Config } from './config/index'
import { FeaturesModule } from './modules/features'
import { UploadsModule } from './modules/uploads'
import { UtilsModule } from './modules/utils'

export type Context = {
  gstore: Gstore;
  storage: Storage;
  logger: Logger;
  config: Config;
}

export type AppModules = {
  features: FeaturesModule
  uploads: UploadsModule
  utils: UtilsModule
}
