# DubinsViewer
The JS Server and Client for visualizing the Data of [DubinsPilot](https://github.com/opt12/DubinsPilot)


This Software consists of two parts belonging together:
  * the DubinsViewerServer
  * the DubinsViewerClient
  
## DubinsViewerServer
The DubinsViewerServer component tries to connect to the POSIX-socket opened by the [DubinsPilot](https://github.com/opt12/DubinsPilot)-Software on the same machine, the DubinsViewerServer is running on. It receives the relevant flight data from there and provides it by means of a REST-API to the DubinsViewerClient component.

To build this software, switch into the DubinsViewerServer directory:

`cd DubinsViewerServer`

There use the command `npm install` to install all dependencies.

To start the server, use `npm start`. The server component listens on `localhost:3001`for connections. It relies on the client package to be found in `../DubinsViewerClient/build`. If it ever happens that this bundle is to be served from another location, you can specify the path to the bundle using a command line argument like `npm start --clientpath="..."`.

## DubinsViewerClient
The DubinsViewerClient is the REACT-App running in the browser to display the flight data overlayed over some map. It is served on [http://localhost:3001/](http://localhost:3001/) by means of the DubinsViewerServer application.

To build this REACT-App, switch into the DubinsViewerClient directory:

`cd DubinsViewerClient`

There use the command `npm install` to install all dependencies. Afterwards use `npm run build` to build the bundle into the `./build` directory from where it is served to any modern browser.

## Further Usage
After all is setup and built, you only need to run 

`npm start`from within the `./DubinsViewerServer`directory.

Of course, this DubinsViewer App is only useful if the [DubinsPilot](https://github.com/opt12/DubinsPilot)-Software itself is also running and used to control a plane in X-Plane.

**Have Fun!**




