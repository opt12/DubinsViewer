let connectedIPC = require('../ipc/ipc').getConnectedIPC();
// let cmdDataBase = require('../commands/cmdDataBase');
let store = require('../store/store');

function register () {
    for(let route in ipcRoutes){
        ipcRoutes[route]();
    }
};

// const taskReceiptListener = function() {
//     connectedIPC.on('taskReceipt',
//         function (data) {
//             console.log("Got a taskReceipt!");
//             console.log('data content is : ');
//             console.log(JSON.stringify(data, null, 2));
//         }
//     );
//     console.log("connected listener for 'taskReceipt'");
// };

const messageListener = function() {
    connectedIPC.on('message',
        function (data) {
            console.log("Got a message!");
            console.log('data content is : ');
            console.log(JSON.stringify(data, null, 2));
            // connectedIPC.emit('GET_POSITION');
        }
    );
    console.log("connected listener for 'message'");
};

const PLANE_STATE_data_Listener = function() {
    connectedIPC.on('PLANE_STATE',
        function (data) {
            store.addToStore(data);

            // console.log("Got a PLANE_STATE!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'PLANE_STATE'");
};

const CIRCLE_DATA_Listener = function() {
    connectedIPC.on('CIRCLE_DATA',
        function (data) {
            store.addToStore({circle:data});

            // console.log("Got a CIRCLE_DATA!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'CIRCLE_DATA'");
};

const DUBINS_PATH_Listener = function() {
    connectedIPC.on('DUBINS_PATH',
        function (data) {
            store.addToStore({dubinsPath:data});

            // console.log("Got a DUBINS_PATH!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'DUBINS_PATH'");
};

const ELF_POSITION_Listener = function() {
    connectedIPC.on('ELF_POSITION',
        function (data) {
            store.addToStore({elfPosition:data});

            // console.log("Got a ELF_POSITION!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'ELF_POSITION'");
};

const PATH_TRACKING_STATS_Listener = function() {
    connectedIPC.on('PATH_TRACKING_STATS',
        function (data) {
            store.addToStore({pathTrackingStats:data});

            // console.log("Got a PATH_TRACKING_STATS!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'PATH_TRACKING_STATS'");
};

const DUBINS_PATH_BLOWN_Listener = function() {
    connectedIPC.on('DUBINS_PATH_BLOWN',
        function (data) {
            store.addToStore({dubinsPathBlown:data});

            // console.log("Got a DUBINS_PATH_BLOWN!");
            // console.log('data content is : ');
            // console.log(JSON.stringify(data, null, 2));
        }
    );
    console.log("connected listener for 'DUBINS_PATH_BLOWN'");
};


// const landingPlaneListener = function() {
//     connectedIPC.on('landingPlane',
//         function (data) {
//             // console.log("Got a landingPlane!");
//             // console.log('data content is : ')
//             // console.log(JSON.stringify(data, null, 2));
//
//             cmdDataBase.handleCreateLandingPlane(data)
//                 .then(function ({result, newPlane = true}) {
//                     if(newPlane) {
//                         // console.log("added landingPlane to database: ");
//                         // console.log(JSON.stringify(result, null, 2))
//                     } else {
//                         console.log("plane already exists in database");
//                         console.log(JSON.stringify(result, null, 2))
//                     }
//                 })
//                 .catch(function (err) {
//                     console.log("adding landingPlane to database FAILED: ");
//                     console.log(err);
//                 })
//             return;
//         }
//     );
//     console.log("connected listener for 'landingPlane'");
// };

const ipcRoutes={
    message: messageListener,
    PLANE_STATE: PLANE_STATE_data_Listener,
    CIRCLE_DATA: CIRCLE_DATA_Listener,
    DUBINS_PATH: DUBINS_PATH_Listener,
    ELF_POSITION: ELF_POSITION_Listener,
    PATH_TRACKING_STATS: PATH_TRACKING_STATS_Listener,
    DUBINS_PATH_BLOWN: DUBINS_PATH_BLOWN_Listener,
};


module.exports = register;




