/* eslint-disable key-spacing */
/*
 *
 * MapView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map, TileLayer, Circle, Polyline, Marker, LayersControl, ScaleControl, Popup } from 'react-leaflet';
import { isEmpty } from 'ramda';
import RotatedMarker from 'react-leaflet-rotatedmarker';
import L from 'leaflet';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import { selectPositionData, selectCircleData, selectDubinsPath, selectDubinsPathBlown, selectTrochoMarkers, selectElfPositionMarker } from './selectors';
// import './index.css'; // postCSS import of CSS module

const { BaseLayer, Overlay } = LayersControl;


// don't export the class itself, but only the connect function
// pointer: https://stackoverflow.com/a/44474325/2682209
// make sure to import the default export, not the named component!!! Otherwise connect does not get called.
export class MapViewComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      mapCenter: props.positions.currentPosition,
      zoomLevel: 13,
    };
  }

  render() {
    const { currentPosition, currentHeading, lastPositions } = this.props.positions;
    const { currentCircle, currentDubinsPath, currentDubinsPathBlown, currentTrochoidMarkers, currentElf } = this.props;
    console.log('this.props:', this.props);
    // console.log('currentDubinsPath: ', currentDubinsPath);
    const planeIcon = L.icon({
      iconUrl: './resources/icons8-airport-64.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [64, 64],  // size of the icon
      // shadowSize:   [50, 64],  // size of the shadow
      iconAnchor: [31, 31],  // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],   // the same for the shadow
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
    const markerIconRed = L.icon({
      iconUrl: './resources/markerRed.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [30, 50],  // size of the icon
      // shadowSize:   [50, 64],  // size of the shadow
      iconAnchor: [14, 49],  // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],   // the same for the shadow
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
    const markerIconGreen = L.icon({
      iconUrl: './resources/markerGreen.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [30, 50],  // size of the icon
      // shadowSize:   [50, 64],  // size of the shadow
      iconAnchor: [14, 49],  // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],   // the same for the shadow
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
    const markerLandingField = L.icon({
      iconUrl: './resources/landingField.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [32, 64],  // size of the icon
      iconAnchor: [16, 32],  // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
    const markerLandingFieldRed = L.icon({
      iconUrl: './resources/landingFieldRed.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [32, 64],  // size of the icon
      iconAnchor: [16, 32],  // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
    const markerLandingFieldGreen = L.icon({
      iconUrl: './resources/landingFieldGreen.png',  // these go to 'static in boilerplate root
      // shadowUrl: './resources/leaf-shadow.png', // according to https://github.com/react-boilerplate/react-boilerplate/issues/984
      iconSize: [32, 64],  // size of the icon
      iconAnchor: [16, 32],  // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });

    const BACKGROUND = '#f1e3ba';

    return (
      <div>
        <div>
          {/* for the style, see example in https://github.com/azavea/react-leaflet-demo/blob/completed-react-leaflet-demo-app/App.jsx*/}
          <Map
            style={{ height: '70vh', background: BACKGROUND }}
            center={this.state.mapCenter}
            zoom={this.state.zoomLevel}
            id="map" bounds={this.boundingBox} draw="true" onMoveend={this.moveend} onLoad={this.moveend}
          >
            {/* for layers control see https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/layers-control.js*/}
            <ScaleControl position="bottomleft" updateWhenIdle maxWidth={200} metric imperial style={{ background: BACKGROUND }} />
            <LayersControl position="topright">
              <BaseLayer checked name="Open Street Maps">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="OpenStreetMap.BlackAndWhite">
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="Google Maps Hybrid">
                <TileLayer
                  attribution="&copy; Images courtesy of <a>Google.com</a>"
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Maps terrain">
                <TileLayer
                  attribution="&copy; Images courtesy of <a>Google.com</a>"
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Maps Satellite">
                <TileLayer
                  attribution="&copy; Images courtesy of <a>Google.com</a>"
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="no Tiles">
                <TileLayer
                  attribution="no tiles"
                  url=""
                />
              </BaseLayer>
            </LayersControl>
            {!isEmpty(currentCircle) &&
            <Circle center={currentCircle.center} radius={currentCircle.radius} color="green" fillOpacity="0.0" />}
            {!isEmpty(currentCircle) &&
            <Marker position={currentCircle.center} icon={markerIconRed} />}
            {!isEmpty(currentDubinsPath) &&
            <Polyline positions={currentDubinsPath.path} color="red" />}
            {!isEmpty(currentDubinsPathBlown) &&
            <Polyline positions={currentDubinsPathBlown.path} color="maroon" />}
            {!isEmpty(currentTrochoidMarkers) &&
            <Marker position={currentTrochoidMarkers.trochoCentersStart[0]} icon={markerIconGreen} />
            }
            {!isEmpty(currentTrochoidMarkers) &&
            <Marker position={currentTrochoidMarkers.trochoCentersStart[1]} icon={markerIconRed} />
            }
            {/* TODO hier sollte die Position des ELF separat übergeben werden, auch wenn es nicht erreichbar ist.!!!*/}
            {/* {!isEmpty(currentTrochoidMarkers) &&*/}
            {/* <RotatedMarker rotationAngle={currentTrochoidMarkers.trochoEndHeading} position={currentTrochoidMarkers.trochoEndPoint} icon={markerLandingField} />*/}
            {/* }*/}
            {!isEmpty(currentElf) &&
            (isEmpty(currentDubinsPath) ?
              <RotatedMarker rotationAngle={currentElf.elfHeading} position={currentElf.elfPosition} icon={markerLandingFieldRed}>
                {/* TODO Das Popup muss noch per Css formatierrt werrden oder sowas*/}
                {/* <Popup>ELF elevation: {currentElf.elfElevation}</Popup>*/}
              </RotatedMarker> :
              <RotatedMarker rotationAngle={currentElf.elfHeading} position={currentElf.elfPosition} icon={markerLandingFieldGreen}>
                {/* <Popup>ELF elevation: {currentElf.elfElevation}</Popup>*/}
              </RotatedMarker>
            )}
            {currentHeading &&
            <RotatedMarker rotationAngle={currentHeading - 90} position={currentPosition} icon={planeIcon} />}
            {
              <Polyline positions={lastPositions} color="blue" />
            }
          </Map>
        </div>
        This is Map View.
        {!isEmpty(currentCircle) &&
        <p>{JSON.stringify(currentCircle)} </p>
        }
        {!isEmpty(currentTrochoidMarkers) &&
        <p> {JSON.stringify(currentTrochoidMarkers)} </p>
        }

        <p>currentPosition = {JSON.stringify(currentPosition)}</p>
        <p>lastPositions = {JSON.stringify(lastPositions)}</p>
      </div>
    );
  }
}

MapViewComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  positions: PropTypes.shape({
    currentPosition: PropTypes.array,
    currentHeading: PropTypes.number,
    lastPositions: PropTypes.array,
  }),
  currentCircle: PropTypes.object,
  currentDubinsPath: PropTypes.object,
  currentDubinsPathBlown: PropTypes.object,
  currentTrochoidMarkers: PropTypes.object,
  currentElf: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // MapView: makeSelectMapView(),
  positions: selectPositionData(),
  currentCircle: selectCircleData(),
  currentDubinsPath: selectDubinsPath(),
  currentDubinsPathBlown: selectDubinsPathBlown(),
  currentTrochoidMarkers: selectTrochoMarkers(),
  currentElf: selectElfPositionMarker(),
  //TODO: Property secondLastPosition wird im Selector nicht korrekt gesetzt.
});


function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps from MapviewContainer: ', dispatch);
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewComponent);
