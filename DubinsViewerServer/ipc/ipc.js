"use strict";

let ipc = require('node-ipc');
let exec = require('child_process').exec;
let child;


let connectedIPC = null;
const IpcId = 'eee_AutoViewer';

let maxRetries = 1;

const getConnectedIPC = () => {
        if (connectedIPC != null) {
            console.log("already connected to: ", connectedIPC);
            return connectedIPC;    //if the connection is already established, it shall be a singleton
        }

        //to limit the amount of retries externally
        // if (maxRetries <= 0) {
        //     return undefined;
        // }
        //OK, we need a new socket connection;
        // maxRetries--;


        let socketId = process.env.SOCKET_ID || IpcId;
        ipc.config.id = IpcId;
        ipc.config.socketRoot = '/tmp/';
        ipc.config.appspace = '';
        //TODO hier muss Retry wieder eingestellt werden, also ipc.config.maxRetries nicht definieren
        // ipc.config.maxRetries = false,
        ipc.config.retry = 1500;
        ipc.config.silent = true;   //for exhaustive debugging of ipc events comment this out

        //try to connect to ipc socket
        ipc.connectTo(
            socketId,
            function () {
                ipc.of[socketId].on(
                    'connect',
                    function () {
                        console.log("Connected!!");
                        ipc.log('## connected to world ##'.rainbow, ipc.config.delay);
                    });
                ipc.of[socketId].on(
                    'disconnect',
                    function () {
                        console.log("Disconnected!!");
                        ipc.log('disconnected from world'.notice);
                        connectedIPC = null;
                    });
                ipc.of[socketId].on(
                    'message', //any event or message type your server listens for
                    function (data) {
                        console.log("Got a message!!");
                        ipc.log('got a message from world : '.debug, data);
                    }
                );
                // ipc.of[socketId].on(
                //     'error',
                //     (err) => {
                //         //check if we should start the server before...
                //         if (err) console.log("error obj: ", err);
                //         console.log("Error connecting to the IPC-socket " + ipc.config.socketRoot + socketId);
                //         console.log("Start the Autopilot Application now...");
                //         console.log("Path: " + process.env.TERMINAL + process.env.WRAPPER);
                //
                //         //TODO Hier kann ich meinen autopiloten sonst auch selber starten.
                //
                //         try {
                //             child = exec(process.env.TERMINAL+ process.env.AUTOPILOT+ " -e",
                //                 function (error, stdout, stderr) {
                //                     console.log('stdout: ' + stdout);
                //                     console.log('stderr: ' + stderr);
                //                     if (error !== null) {
                //                         console.log('exec error: ' + error);
                //                     }
                //                 });
                //
                //         } catch (e){
                //             child.kill();
                //             //see http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn
                //             console.log("could not start Autopilot-applikation")
                //             console.log("Eroor: ", e);
                //             console.log("I'll keep trying.")
                //             console.log("consider using the AUTOPILOT command line argument to fix this path:")
                //             console.log(process.env.TERMINAL + process.env.AUTOPILOT)
                //         }
                //     }
                // )
                ipc.of[socketId].on(
                    'error',
                    (err) => {
                        //check if we should start the server before...
                        if (err) console.log("error obj: ", err);
                        console.log("Error connecting to the IPC-socket " + ipc.config.socketRoot + socketId);
                    });

            }
        );

        connectedIPC = ipc.of[socketId];

        return connectedIPC;
    }
;

const disconnectIPC = () => {

        if (!connectedIPC) {
            console.log("IPC is already disconnected. So nothing to do.")
            return;
        }

        connectedIPC.disconnect(IpcId);
        console.log("IPC disconnecting. Don't use it any more.");
        return;
    }
;


module.exports = {
    getConnectedIPC: getConnectedIPC,
    disconnectIPC: disconnectIPC,
};