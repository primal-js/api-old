type VersionType = {
  major: Number,
  minor: Number,
  patch: Number,
}

export type FeatureType = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  name?: string
  version: string
  path?: string
  extension?: string
  projectId?: string
  content: string
}
