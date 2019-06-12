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
  const { uploads } = modules

  const { apiRouter } = initRoutes(context, { feature, uploads })

  return {
    apiRouter,
    feature,
  }
}
