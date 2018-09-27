"use strict";

let sequenceNumber = 0;
let store = {};

const getSequence = function () {
    return ++sequenceNumber;
};

const addToStore = function (object) {
    let newStore = {...store, ...object};
     // console.log("Added to Store: ",object);
    store = newStore;
};

const  getPosition = function () {
    const pos =  { ...store.pos_WGS84, heading:store.true_psi } || {};
    return  {...pos};
};

const getCircleData = function () {
    const circle = {
        ...store.circle || {},
    };
    // console.log("getCircleData returning:", {...circle});
    return {...circle};
};

const getDubinsPath = function () {
    const dubinsPath = {
        ...store.dubinsPath|| {},
    };
    return {...dubinsPath};
};

const getDubinsPathBlown = function () {
    const dubinsPath = {
        ...store.dubinsPathBlown|| {},
    };
    return {...dubinsPath};
};

const getElfPosition = function () {
    const elfPosition = {
        ...store.elfPosition|| {},
    };
    return {...elfPosition};
};

const getpathTrackingStats = function () {
    const pathTrackingStats = {
        ...store.pathTrackingStats|| {},
    };
    return {...pathTrackingStats};
};


module.exports = {
    getSequence: getSequence,
    addToStore: addToStore,
    getPosition: getPosition,
    getCircleData: getCircleData,
    getDubinsPath: getDubinsPath,
    getDubinsPathBlown: getDubinsPathBlown,
    getElfPosition: getElfPosition,
    getpathTrackingStats: getpathTrackingStats,
};
