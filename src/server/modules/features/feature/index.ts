import initDB from './feature.db'
import initRoutes, { FeatureRoutesHandlers } from './feature.routes-handlers'
import initDomain, { FeatureDomain } from "./feature.domain"
import { Context, Modules } from '../models'

export * from '../models'

export interface FeatureModule {
  featureDomain: FeatureDomain
  routesHandlers: FeatureRoutesHandlers
}

export default (
  context: Context,
  modules: Modules
): FeatureModule => {
  const featureDB = initDB(context, modules)
  const featureDomain = initDomain(context, { featureDB })

  return {
    featureDomain,
    routesHandlers: initRoutes(context, { featureDomain }),
  }
}
