/*
 *
 * MapContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_SIDEBAR_VISIBLE,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR,
  SET_UPDATE_TIMER,
  SET_TIMER_DIRTY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setTimer(updateTimer, dirty, timerRunning) {
  console.log('settimer() with: ', updateTimer, dirty, timerRunning);
  return {
    type: SET_UPDATE_TIMER,
    updateTimer,
    dirty,
    timerRunning,
  };
}

export function setTimerDirty(updateTimer) {
  return {
    type: SET_TIMER_DIRTY,
    updateTimer,
  };
}

export function toggleSidebarVisibility(sidebarVisible) {
  return {
    type: SET_SIDEBAR_VISIBLE,
    sidebarVisible,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function positionLoaded(position, circle, dubinsPath, elfPosition, dubinsPathBlown) {
  return {
    type: UPDATE_POSITION_SUCCESS,
    position,
    circle,
    dubinsPath,
    elfPosition,
    dubinsPathBlown,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function positionLoadingError(error) {
  return {
    type: UPDATE_POSITION_ERROR,
    error,
  };
}
