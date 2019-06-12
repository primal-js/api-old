import multer from 'multer'
import Boom from 'boom'

export interface UploadsMiddleware {
  UploadsInMemory: multer.Instance
}

export default (): UploadsMiddleware => ({
  /**
   * Multer handles parsing multipart/form-data requests.
   * This instance is configured to store file in memory
   */
  UploadsInMemory: multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb
    },
  })
})