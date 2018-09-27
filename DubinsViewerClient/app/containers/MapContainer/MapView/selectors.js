import { createSelector } from 'reselect';
import { map, isEmpty } from 'ramda';

/**
 * Direct selector to the mapView state domain
 */
const selectMapViewDomain = () => (state) => state.get('mapContainer');

/**
 * Other specific selectors
 */
const selectPositionData = () => createSelector(
  selectMapViewDomain(),
  (substate) => ({
    currentPosition: [substate.currentPosition.latitude, substate.currentPosition.longitude],
    currentHeading: substate.currentPosition.heading,
    lastPositions: (isEmpty(substate.lastPositions)) ? [] : map((pos) => [pos.latitude, pos.longitude])(substate.lastPositions.toArray()),
  })
);

const selectCircleData = () => createSelector(
  selectMapViewDomain(),
  (substate) => {
    console.log('selectCircleData.substate: ', substate.currentCircle);
    if (isEmpty(substate.currentCircle)) {
      return {};
    }
    return {
      center: [substate.currentCircle.center.latitude, substate.currentCircle.center.longitude],
      radius: substate.currentCircle.radius,
    };
  }
);

const selectDubinsPath = () => createSelector(
  selectMapViewDomain(),
  (substate) => {
    console.log('selectDubinsPath.substate: ', substate.currentDubinsPath);
    if (isEmpty(substate.currentDubinsPath)) {  // see here: https://stackoverflow.com/q/679915/2682209
      return {};
    }
    const startLatLong = [substate.currentDubinsPath.startingPoint];
    const endLatLong = [substate.currentDubinsPath.endPoint];
    return {
      path: startLatLong.concat(
        substate.currentDubinsPath.trochoidOne.trochoBorder.concat(
          substate.currentDubinsPath.trochoidTwo.trochoBorder).concat(
          endLatLong
        )),
    };
  }
);

const selectDubinsPathBlown = () => createSelector(
  selectMapViewDomain(),
  (substate) => {
    console.log('selectDubinsPathBlown.substate: ', substate.currentDubinsPathBlown);
    if (isEmpty(substate.currentDubinsPathBlown)) {  // see here: https://stackoverflow.com/q/679915/2682209
      return {};
    }
    const startLatLong = [substate.currentDubinsPathBlown.startingPoint];
    const endLatLong = [substate.currentDubinsPathBlown.endPoint];
    return {
      path: startLatLong.concat(
        substate.currentDubinsPathBlown.trochoidOne.trochoBorder.concat(
          substate.currentDubinsPathBlown.trochoidTwo.trochoBorder).concat(
          endLatLong
        )),
    };
  }
);

const selectTrochoMarkers = () => createSelector(
  selectMapViewDomain(),
  (substate) => {
    console.log('selectDubinsPath.substate: ', substate.currentDubinsPath);
    if (isEmpty(substate.currentDubinsPath)) {  // see here: https://stackoverflow.com/q/679915/2682209
      return {};
    }
    return {
      trochoCentersStart: [
        substate.currentDubinsPath.trochoidOne.trochoCenterStart,
        substate.currentDubinsPath.trochoidTwo.trochoCenterStart],
      trochoCentersEnd: [
        substate.currentDubinsPath.trochoidOne.trochoCenterEnd,
        substate.currentDubinsPath.trochoidTwo.trochoCenterEnd],
      trochoRadius: substate.currentDubinsPath.trochoRadius,
      trochoEndPoint: substate.currentDubinsPath.endPoint,
      trochoEndHeading: substate.currentDubinsPath.endHeading,
    };
  }
);

const selectElfPositionMarker = () => createSelector(
  selectMapViewDomain(),
  (substate) => {
    console.log('selectElfPosition.substate: ', substate.currentElfPosition);
    if (isEmpty(substate.currentElfPosition) || substate.currentElfPosition.isElfSet === false) {  // see here: https://stackoverflow.com/q/679915/2682209
      return {};
    }
    return {
      elfPosition: [substate.currentElfPosition.position.latitude, substate.currentElfPosition.position.longitude],
      elfElevation: substate.currentElfPosition.position.latitude,
      elfHeading: substate.currentElfPosition.heading,
    };
  }
);

/**
 * Default selector used by MapView
 */

const makeSelectMapView = () => createSelector(
  selectMapViewDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMapView;
export {
  selectMapViewDomain,
  selectPositionData,
  selectCircleData,
  selectDubinsPath,
  selectDubinsPathBlown,
  selectTrochoMarkers,
  selectElfPositionMarker,
};
