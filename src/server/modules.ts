import initFeaturesModule from './modules/features'
import initUtilsModule from './modules/utils'
import { Context, AppModules } from './models'

export default (context: Context): AppModules => {
  const utils = initUtilsModule()

  /**
   * Initialize our module by passing the context & each module dependencies
   */
  const features = initFeaturesModule(context, { utils })

  return {
    features,
    utils,
  }
}
