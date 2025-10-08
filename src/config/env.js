import {config} from 'dotenv'
import env from'env-var'

config()

export const envs = {
    port: env.get('PORT' || 5000).required().asPortNumber(),
    mongoUrl: env.get('MONGO_URL').required().asString(),
    publicPath: env.get('PUBLIC_PATH').default('public').asString()
}