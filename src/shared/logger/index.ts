import { ConfigUtils } from '../utils/ConfigUtils'
import { Logger } from './Logger'

const loggerConfig = ConfigUtils.get('logger')

export const logger = new Logger(loggerConfig.enabled)
