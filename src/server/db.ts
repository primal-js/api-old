import Datastore from '@google-cloud/datastore'
import GstoreNode, { Gstore } from 'gstore-node'
import { Logger } from 'winston'
import { GcloudConfig } from './config/gcloud'

export type DbType = {
  config: GcloudConfig
  logger: Logger
}

export default ({ config, logger }: DbType): Gstore => {
  
  logger.info(`Instantiating Datastore instance for project '${config.projectId}'`)

  /**
   * Create a Datastore client instance
   */
  const datastore = new Datastore({
    projectId: config.projectId,
    namespace: config.datastore.namespace
  })

  /**
   * Create gstore instance
   */
  const gstore = GstoreNode({ cache: true })

  /**
   * Connect gstore to the Google Datastore instance
   */
  logger.info('Connecting gstore-node to Datastore')
  gstore.connect(datastore)

  return gstore
}
