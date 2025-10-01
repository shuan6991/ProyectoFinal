import { envs } from "./config/env.js";
import {iniciarServidor} from "./server/server.js"


const main =()=>{
    iniciarServidor({
        port: envs.port,
        publicPath: envs.publicPath
    })
}

(async ()=>{
    main()
})()