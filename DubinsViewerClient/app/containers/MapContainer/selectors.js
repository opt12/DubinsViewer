import { createSelector } from 'reselect';

/**
 * Direct selector to the mapContainer state domain
 */
const selectMapContainerDomain = () => (state) => state.get('mapContainer'); // the data in the store is the same as for parent component

/**
 * Other specific selectors
 */
const selectValue = () => (state) => state.get('mapContainer').value;
const selectSidebarVisible = () => (state) => state.get('mapContainer').sidebarVisible;
const selectTimerProps = () => (state) => state.get('mapContainer').timerProps;

const selectPositionData = () => createSelector(
  selectMapContainerDomain(),
  (state) => ({
    currentPosition: state.currentPosition,
    currentHeading: state.currentPosition.heading,
    lastPositions: state.lastPositions })
);

/**
 * Default selector used by MapContainer
 */

const makeSelectMapContainer = () => createSelector(
  selectMapContainerDomain(),
  (substate) => substate.toJS() // don't do this according to
  // https://redux.js.org/recipes/using-immutable.js-with-redux#never-use-tojs-in-mapstatetoprops
  // https://medium.com/@fastphrase/practical-guide-to-using-immutablejs-with-redux-and-react-c5fd9c99c6b2
);

export default makeSelectMapContainer;

export {
  selectMapContainerDomain,
  selectValue,
  selectSidebarVisible,
  selectPositionData,
  selectTimerProps,
};
