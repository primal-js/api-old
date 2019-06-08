import initFeaturesModule from './modules/features'
import initUtilsModule from './modules/utils'
import { Context, AppModules } from './models'

export default (context: Context): AppModules => {
  /**
   * Initialize our module by passing the context & each module dependencies
   */
  const features = initFeaturesModule()

  const utils = initUtilsModule()

  return {
    features,
    utils,
  }
}
