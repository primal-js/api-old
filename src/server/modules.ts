import initFeaturesModule from './modules/features'
import initUploadsModule from './modules/uploads'
import initUtilsModule from './modules/utils'
import { Context, AppModules } from './models'

export default (context: Context): AppModules => {
  const utils = initUtilsModule()

  /**
   * Initialize our module by passing the context & each module dependencies
   */
  const uploads = initUploadsModule(context)
  const features = initFeaturesModule(context, { utils, uploads })

  return {
    features,
    uploads,
    utils,
  }
}
