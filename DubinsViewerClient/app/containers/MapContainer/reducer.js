/*
 *
 * MapContainer reducer
 *
 */

import {fromJS, toJS} from 'immutable';
import {Record, List} from 'immutable';
import {isEmpty} from 'ramda';


import {
  DEFAULT_ACTION,
  INCREMENT_COUNTER,
  SET_SIDEBAR_VISIBLE,
  UPDATE_POSITION_SUCCESS,
  DELETE_POSITION_LIST,
  SET_TIMER_DIRTY,
  UPDATE_TIMER_STATE,
} from './constants';

// see https://medium.com/@fastphrase/practical-guide-to-using-immutablejs-with-redux-and-react-c5fd9c99c6b2
// create the initial record for the mapContainer State
const myPositionRecord = Record({latitude: 0.0, longitude: 0.0, altitude: 0.0, heading: 0, valid: false});
const myTimerRecord = Record({updateTimer: 1000, timerRunning: false, dirty: true});

const myMapContainerRecord = Record({
  value: 42,
  currentPosition: myPositionRecord({latitude: 0.0, longitude: 0.0, altitude: 0.0, heading: 0, valid: false}),
  currentCircle: {},
  currentDubinsPath: {},
  currentDubinsPathBlown: {},
  currentElfPosition: {},
  lastPositions: List(),
  // ELFs: List(),
  sidebarVisible: true,
  timerProps: myTimerRecord({
    updateTimer: 1000,
    timerRunning: false,
    dirty: true,
  }),
});

// Now create a record instance
const initialState = myMapContainerRecord({
  value: 42,
  currentPosition: myPositionRecord({}),
  currentCircle: {},
  currentDubinsPath: {},
  currentDubinsPathBlown: {},
  currentElfPosition: {},
  lastPositions: List(),
  // ELFs: {},
  sidebarVisible: false,
  timerProps: myTimerRecord({
    updateTimer: 500,
    timerRunning: false,
    dirty: true,
  }),
});

function mapContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case INCREMENT_COUNTER:
      return state
        .set('value', state.get('value') + 1);
    case SET_TIMER_DIRTY:
      return state
        .setIn(['timerProps', 'dirty'], true)
        .setIn(['timerProps', 'updateTimer'], action.updateTimer);
    case UPDATE_TIMER_STATE:
      return state
        .setIn(['timerProps', 'updateTimer'], action.updateTimer)
        .setIn(['timerProps', 'timerRunning'], action.timerRunning)
        .setIn(['timerProps', 'dirty'], action.dirty);
    case SET_SIDEBAR_VISIBLE:
      return state
        .set('sidebarVisible', action.sidebarVisible);
    case UPDATE_POSITION_SUCCESS:
      // console.log('action', action.position, action.circle, action.dubinsPath, action.elfPosition);
      return state
        .set('lastPositions', (isEmpty(action.position)) ?
          state.lastPositions :
          state.lastPositions.insert(0, action.position)) // insert the current position to the beginning of the list
        .set('currentPosition', action.position)
        .set('currentCircle', action.circle)
        .set('currentDubinsPath', action.dubinsPath)
        .set('currentElfPosition', action.elfPosition)
        .set('currentDubinsPathBlown', action.dubinsPathBlown);
    case DELETE_POSITION_LIST:
      return state
        .delete('lastPositions');
    default:
      return state;
  }
}

export default mapContainerReducer;
