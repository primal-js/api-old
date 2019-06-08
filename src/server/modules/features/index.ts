import { Router } from 'express'
import initRoutes from './features.routes'
import initFeature, { FeatureModule } from './feature'
import { Context, Modules } from './models'

export interface FeaturesModule {
  apiRouter: Router
  feature: FeatureModule
}

export default (context: Context, modules: Modules): FeaturesModule => {
  const feature = initFeature(context, {})
  const { apiRouter } = initRoutes(context, { feature })

  return {
    apiRouter,
    feature,
  }
}
