import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import { ConfigNotSetError } from '../errors/ConfigErrors'

export abstract class ConfigUtils {
  public static get(configName: string, required = true): any {
    if (config.has(configName)) {
      return config.util.toObject(config.get(configName))
    }
    if (required) throw new ConfigNotSetError(configName)
  }
}
