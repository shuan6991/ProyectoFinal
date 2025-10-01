import {config} from 'dotenv'
import env from 'env-var'

config()

export const envs = {
    port: env.get("PORT").required().asPortNumber(),
    publicPath: env.get("PUBLIC_PATH").default("public").asString()

}