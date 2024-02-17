import { AppDataSource } from "./data-source"
import { config } from './config';
import { initialize } from "./app";

const server = {
    init: async () => {
        await AppDataSource.initialize()
        process.env.dirname = __dirname
        const app = initialize(config)
        // start express server
        app.listen(config.server.port, () => {
            console.log('Server is listening on port ' + config.server.port);
        });
    }
}


server.init();

