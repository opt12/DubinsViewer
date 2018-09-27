import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from 'utils/request';

import { UPDATE_POSITION, SET_UPDATE_TIMER, UPDATE_TIMER_STATE } from './constants';
import { positionLoaded, positionLoadingError } from './actions';


function* handleTimerUpdate(action) {
  console.log('handleTimerUpdate with arguments:', action);
  yield put({ ...action, type: UPDATE_TIMER_STATE });

  if (action.timerRunning) {
    while (true) {
      yield delay(action.updateTimer);
      yield put({ type: UPDATE_POSITION });
      console.log(`start timer with ${action.updateTimer} ms.`);
    }
  }
}

function* timerUpdateSaga() {
  yield takeLatest(SET_UPDATE_TIMER, handleTimerUpdate);
  console.log('Saga detected SET_UPDATE_TIMER event');
}

//TODO look for https://itnext.io/implement-nodejs-environment-variables-in-a-modern-webpack-app-df20c27fe5f0
const baseURL = 'http://localhost:3001/api/queries';
// const baseURL = 'http://192.168.178.62:3001/api/queries';

function* updatePositionSaga() {
  const requestURL = yield `${baseURL}/`;
  const requestOptionsPosition = {
    method: 'POST',
    body: { type: 'GET_LAST_POSITION' },
  };
  // TODO Das ist nicht sehr schön, aber ich will einfach immer beides abfragen
  const requestOptionsCircle = {
    method: 'POST',
    body: { type: 'GET_CIRCLE_STATE' },
  };
  const requestOptionsDubinsPath = {
    method: 'POST',
    body: { type: 'GET_DUBINS_PATH' },
  };
  const requestOptionsDubinsPathBlown = {
    method: 'POST',
    body: { type: 'GET_DUBINS_PATH_BLOWN' },
  };
  const requestOptionsElfPosition = {
    method: 'POST',
    body: { type: 'GET_ELF_POSITION' },
  };

  try {
    // Call our request helper (see 'utils/request')
    //TODO diese Abfragen können wir natürlich parallel abfeuern
    console.log('request position');
    const position = yield call(request, requestURL, requestOptionsPosition);
    console.log('request circle');
    const circle = yield call(request, requestURL, requestOptionsCircle);
    console.log('request dubinsPath');
    const dubinsPath = yield call(request, requestURL, requestOptionsDubinsPath);
    console.log('request dubinsPath');
    const dubinsPathBlown = yield call(request, requestURL, requestOptionsDubinsPathBlown);
    console.log('request elfPosition');
    const elfPosition = yield call(request, requestURL, requestOptionsElfPosition);
    yield put(positionLoaded(position, circle, dubinsPath, elfPosition, dubinsPathBlown));
  } catch (err) {
    yield put(positionLoadingError(err));
  }
}

export function* getPositions() {
  yield takeEvery(UPDATE_POSITION, updatePositionSaga);
  console.log('Saga detected UPDATE_POSITION event');
}

// Bootstrap sagas
export default [
  getPositions,
  timerUpdateSaga,
];
