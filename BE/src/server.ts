import {Server} from 'http';
import {app,server} from "./app";
import config from './config';

async function bootstrap(){
    const ser:Server = server.listen(config.port, () =>{
        console.log(`Server running on port ${config.port}`);
    });

    const exitHandler = () =>{
        if(ser){
            ser.close(() =>{
                console.log('Server Close')
            })
        }
    };

    const unexpectedHandler = () =>{
        console.log('Handler Error');
        exitHandler();
    }
    process.on('uncaughtException', unexpectedHandler);
    process.on('unhandledRejection', unexpectedHandler);

    process.on('SIGTERM', () =>{
        console.log('Sigterm Recieved');
        if(ser){
            ser.close();
        }
    })
}

bootstrap();