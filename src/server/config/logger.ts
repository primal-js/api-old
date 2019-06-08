import joi from 'joi'

const envVarsSchema = joi
  .object({
    LOGGER_LEVEL: joi
      .string()
      .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default('info'),
    LOGGER_ENABLED: joi
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(true)
  })
  .unknown()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export type LoggerConfig = {
  level: string,
  enabled: boolean
}

export const config: LoggerConfig = {
  level: envVars.LOGGER_LEVEL,
  enabled: !!envVars.LOGGER_ENABLED
}
