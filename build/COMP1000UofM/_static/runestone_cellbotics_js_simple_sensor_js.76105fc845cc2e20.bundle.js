"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_cellbotics_js_simple_sensor_js"],{

/***/ 34630:
/*!**********************************************!*\
  !*** ./runestone/cellbotics/js/auto-bind.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auto_bind": () => (/* binding */ auto_bind)
/* harmony export */ });
// .. Copyright (C) 2012-2020 Bryan A. Jones.
//
//  This file is part of the CellBotics system.
//
//  The CellBotics system is free software: you can redistribute it and/or
//  modify it under the terms of the GNU General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  The CellBotics system is distributed in the hope that it will be
//  useful, but WITHOUT ANY WARRANTY; without even the implied warranty
//  of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with the CellBotics system.  If not, see
//  <http://www.gnu.org/licenses/>.
//
// *********************************************************
// |docname| - Automatically bind methods to their instances
// *********************************************************




// The following two functions were taken from https://github.com/sindresorhus/auto-bind/blob/master/index.js and lightly modified. They provide an easy way to bind all callable methods to their instance. See `Binding Methods to Class Instance Objects <https://ponyfoo.com/articles/binding-methods-to-class-instance-objects>`_ for more discussion on this crazy JavaScript necessity.
//
// Gets all non-builtin properties up the prototype chain
const getAllProperties = object => {
	const properties = new Set();

	do {
		for (const key of Reflect.ownKeys(object)) {
			properties.add([object, key]);
		}
	} while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

	return properties;
};


// Invoke this in the constructor of an object.
function auto_bind(self) {
    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
        if (key === 'constructor') {
            continue;
        }

        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }
}


/***/ }),

/***/ 64617:
/*!*********************************************************!*\
  !*** ./runestone/cellbotics/js/permissions_polyfill.js ***!
  \*********************************************************/
/***/ (() => {

// .. Copyright (C) 2012-2020 Bryan A. Jones.
//
//  This file is part of the CellBotics system.
//
//  The CellBotics system is free software: you can redistribute it and/or
//  modify it under the terms of the GNU General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  The CellBotics system is distributed in the hope that it will be
//  useful, but WITHOUT ANY WARRANTY; without even the implied warranty
//  of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with the CellBotics system.  If not, see
//  <http://www.gnu.org/licenses/>.
//
// ********************************************
// |docname| - Polyfill for the Permissions API
// ********************************************
// This is primarily for iOS devices that don't provide Permissions, but use another method to allow access to various sensors.



// Only supply this if there's not Permissions and we have tne iOS flavor available. See sample code in https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2 or the `W3C working draft <https://www.w3.org/TR/orientation-event/#deviceorientation>`_.
if (
    !navigator.permissions &&
    (typeof DeviceMotionEvent.requestPermission === "function") &&
    (typeof DeviceOrientationEvent.requestPermission === "function")
) {
    navigator.permissions = {
        query: options => {
            // Ignore everything but the name, since our use case is only for SimpleSensor.
            switch (options.name) {
                case "accelerometer":
                case "gyroscope":
                // The requested permissions doesn't allow us to determine which of the following two permissions we need, so ask for both.
                return new Promise((resolve, reject) => {
                    Promise.all([
                        // The polyfill for the accelerometer, gyro, and related classes needs just this.
                        DeviceMotionEvent.requestPermission(),
                        // The polyfill for the orientation sensors needs just this.
                        DeviceOrientationEvent.requestPermission()
                    ]).then(
                        // We now have an array of strings, the result of the requestPermission calls. If all are "granted", then return {state: "granted"}, else return {state: "denied"}.
                        vals => resolve({state:
                            (vals.every(x => x === "granted") ? "granted" : "denied")
                        })
                    )
                });

                // There's nothing else that needs permission to work.
                default:
                return Promise.resolve({state: "granted"});
            }
        }
    };
}


/***/ }),

/***/ 6713:
/*!***********************************************************************!*\
  !*** ./runestone/cellbotics/js/sensor_polyfill/geolocation-sensor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sensor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sensor.js */ 28660);
/* harmony import */ var _sensor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sensor_js__WEBPACK_IMPORTED_MODULE_0__);
// ***************************************
// |docname| - Geolocation sensor polyfill
// ***************************************
// @ts-check




//const slot = __sensor__;

class GeolocationSensorSingleton {
  constructor() {
    if (!this.constructor.instance) {
      this.constructor.instance = this;
    }

    this.sensors = new Set();
    this.watchId = null;
    this.accuracy = null;
    this.lastPosition = null;

    return this.constructor.instance;
  }

  async obtainPermission() {
    let state = "prompt"; // Default for geolocation.
    // @ts-ignore
    if (navigator.permissions) {
      // @ts-ignore
      const permission = await navigator.permissions.query({ name:"geolocation"});
      state = permission.state;
    }

    return new Promise(resolve => {
      const successFn = position => {
        this.lastPosition = position;
        resolve("granted");
      }

      const errorFn = err => {
        if (err.code === err.PERMISSION_DENIED) {
          resolve("denied");
        } else {
          resolve(state);
        }
      }

      const options = { maximumAge: Infinity, timeout: 10 };
      navigator.geolocation.getCurrentPosition(successFn, errorFn, options);
    });
  }

  calculateAccuracy() {
    let enableHighAccuracy = false;

    for (const sensor of this.sensors) {
      if (sensor[slot].options.accuracy === "high") {
        enableHighAccuracy = true;
        break;
      }
    }
    return enableHighAccuracy;
  }

  async register(sensor) {
    const permission = await this.obtainPermission();
    if (permission !== "granted") {
      sensor[slot].notifyError("Permission denied.", "NowAllowedError");
      return;
    }

    if (this.lastPosition) {
      const age = performance.now() - this.lastPosition.timeStamp;
      const maxAge = sensor[slot].options.maxAge;
      if (maxAge == null || age <= maxAge) {
        sensor[slot].handleEvent(age, this.lastPosition.coords);
      }
    }

    this.sensors.add(sensor);

    // Check whether we need to reconfigure our navigation.geolocation
    // watch, ie. tear it down and recreate.
    const accuracy = this.calculateAccuracy();
    if (this.watchId && this.accuracy === accuracy) {
      // We don't need to reset, return.
      return;
    }

    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    const handleEvent = position => {
      this.lastPosition = position;

      const timestamp = position.timestamp - performance.timing.navigationStart;
      const coords = position.coords;

      for (const sensor of this.sensors) {
        sensor[slot].handleEvent(timestamp, coords);
      }
    }

    const handleError = error => {
      let type;
      switch(error.code) {
        case error.TIMEOUT:
          type = "TimeoutError";
          break;
        case error.PERMISSION_DENIED:
          type = "NotAllowedError";
          break;
        case error.POSITION_UNAVAILABLE:
          type = "NotReadableError";
          break;
        default:
          type = "UnknownError";
      }
      for (const sensor of this.sensors) {
        sensor[slot].handleError(error.message, type);
      }
    }

    const options = {
      enableHighAccuracy: accuracy,
      maximumAge: 0,
      timeout: Infinity
    }

    this.watchId = navigator.geolocation.watchPosition(
      handleEvent, handleError, options
    );
  }

  deregister(sensor) {
    this.sensors.delete(sensor);
    if (!this.sensors.size && this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}

// @ts-ignore
const GeolocationSensor = window.GeolocationSensor ||
class GeolocationSensor extends Sensor {
  constructor(options = {}) {
    super(options);

    this[slot].options = options;

    const props = {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    }

    const propertyBag = this[slot];
    for (const propName in props) {
      propertyBag[propName] = props[propName];
      Object.defineProperty(this, propName, {
        get: () => propertyBag[propName]
      });
    }

    this[slot].handleEvent = (timestamp, coords) => {
      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = timestamp;

      this[slot].accuracy = coords.accuracy;
      this[slot].altitude = coords.altitude;
      this[slot].altitudeAccuracy = coords.altitudeAccuracy;
      this[slot].heading = coords.heading;
      this[slot].latitude = coords.latitude;
      this[slot].longitude = coords.longitude;
      this[slot].speed = coords.speed;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    this[slot].handleError = (message, type) => {
      this[slot].notifyError(message, type);
    }

    this[slot].activateCallback = () => {
      (new GeolocationSensorSingleton()).register(this);
    }

    this[slot].deactivateCallback = () => {
      (new GeolocationSensorSingleton()).deregister(this);
    }
  }
}

/***/ }),

/***/ 1981:
/*!*******************************************************************!*\
  !*** ./runestone/cellbotics/js/sensor_polyfill/motion-sensors.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sensor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sensor.js */ 28660);
/* harmony import */ var _sensor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sensor_js__WEBPACK_IMPORTED_MODULE_0__);
// ***********************************
// |docname| - Motion sensors polyfill
// ***********************************
// @ts-check




//const slot = __sensor__;

let orientation;

// @ts-ignore
if (screen.orientation) {
  // @ts-ignore
  orientation = screen.orientation;
} else if (screen.msOrientation) {
  orientation = screen.msOrientation;
} else {
  orientation = {};
  Object.defineProperty(orientation, "angle", {
    get: () => { return (window.orientation || 0) }
  });
}

const DeviceOrientationMixin = (superclass, ...eventNames) => class extends superclass {
  constructor(...args) {
    // @ts-ignore
    super(args);

    for (const eventName of eventNames) {
      if (`on${eventName}` in window) {
        this[slot].eventName = eventName;
        break;
      }
    }

    this[slot].activateCallback = () => {
      window.addEventListener(this[slot].eventName, this[slot].handleEvent, { capture: true });
    }

    this[slot].deactivateCallback = () => {
      window.removeEventListener(this[slot].eventName, this[slot].handleEvent, { capture: true });
    }
  }
};

function toQuaternionFromEuler(alpha, beta, gamma) {
  const degToRad = Math.PI / 180

  const x = (beta || 0) * degToRad;
  const y = (gamma || 0) * degToRad;
  const z = (alpha || 0) * degToRad;

  const cZ = Math.cos(z * 0.5);
  const sZ = Math.sin(z * 0.5);
  const cY = Math.cos(y * 0.5);
  const sY = Math.sin(y * 0.5);
  const cX = Math.cos(x * 0.5);
  const sX = Math.sin(x * 0.5);

  const qx = sX * cY * cZ - cX * sY * sZ;
  const qy = cX * sY * cZ + sX * cY * sZ;
  const qz = cX * cY * sZ + sX * sY * cZ;
  const qw = cX * cY * cZ - sX * sY * sZ;

  return [qx, qy, qz, qw];
}

function rotateQuaternionByAxisAngle(quat, axis, angle) {
  const sHalfAngle = Math.sin(angle / 2);
  const cHalfAngle = Math.cos(angle / 2);

  const transformQuat = [
    axis[0] * sHalfAngle,
    axis[1] * sHalfAngle,
    axis[2] * sHalfAngle,
    cHalfAngle
  ];

  function multiplyQuaternion(a, b) {
    const qx = a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1];
    const qy = a[1] * b[3] + a[3] * b[1] + a[2] * b[0] - a[0] * b[2];
    const qz = a[2] * b[3] + a[3] * b[2] + a[0] * b[1] - a[1] * b[0];
    const qw = a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2];

    return [qx, qy, qz, qw];
  }

  function normalizeQuaternion(quat) {
    const length = Math.sqrt(quat[0] ** 2 + quat[1] ** 2 + quat[2] ** 2 + quat[3] ** 2);
    if (length === 0) {
      return [0, 0, 0, 1];
    }

    return quat.map(v => v / length);
  }

  return normalizeQuaternion(multiplyQuaternion(quat, transformQuat));
}

function toMat4FromQuat(mat, q) {
  const typed = mat instanceof Float32Array || mat instanceof Float64Array;

  if (typed && mat.length >= 16) {
    mat[0] = 1 - 2 * (q[1] ** 2 + q[2] ** 2);
    mat[1] = 2 * (q[0] * q[1] - q[2] * q[3]);
    mat[2] = 2 * (q[0] * q[2] + q[1] * q[3]);
    mat[3] = 0;

    mat[4] = 2 * (q[0] * q[1] + q[2] * q[3]);
    mat[5] = 1 - 2 * (q[0] ** 2 + q[2] ** 2);
    mat[6] = 2 * (q[1] * q[2] - q[0] * q[3]);
    mat[7] = 0;

    mat[8] = 2 * (q[0] * q[2] - q[1] * q[3]);
    mat[9] = 2 * (q[1] * q[2] + q[0] * q[3]);
    mat[10] = 1 - 2 * (q[0] ** 2 + q[1] ** 2);
    mat[11] = 0;

    mat[12] = 0;
    mat[13] = 0;
    mat[14] = 0;
    mat[15] = 1;
  }

  return mat;
}

function worldToScreen(quaternion) {
  return !quaternion ? null :
    rotateQuaternionByAxisAngle(
      quaternion,
      [0, 0, 1],
      - orientation.angle * Math.PI / 180
    );
}

// @ts-ignore
const RelativeOrientationSensor = window.RelativeOrientationSensor ||
class RelativeOrientationSensor extends DeviceOrientationMixin(Sensor, "deviceorientation") {
  constructor(options = {}) {
    super(options);

    switch (options.coordinateSystem || 'world') {
      case 'screen':
        Object.defineProperty(this, "quaternion", {
          get: () => worldToScreen(this[slot].quaternion)
        });
        break;
      case 'world':
      default:
        Object.defineProperty(this, "quaternion", {
          get: () => this[slot].quaternion
        });
    }

    this[slot].handleEvent = event => {
      // If there is no sensor we will get values equal to null.
      if (event.absolute || event.alpha === null) {
        // Spec: The implementation can still decide to provide
        // absolute orientation if relative is not available or
        // the resulting data is more accurate. In either case,
        // the absolute property must be set accordingly to reflect
        // the choice.
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = performance.now();

      this[slot].quaternion = toQuaternionFromEuler(
        event.alpha,
        event.beta,
        event.gamma
      );

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    this[slot].deactivateCallback = () => {
      this[slot].quaternion = null;
    }
  }

  populateMatrix(mat) {
    toMat4FromQuat(mat, this.quaternion);
  }
}

// @ts-ignore
const AbsoluteOrientationSensor = window.AbsoluteOrientationSensor ||
class AbsoluteOrientationSensor extends DeviceOrientationMixin(
  Sensor, "deviceorientationabsolute", "deviceorientation") {
  constructor(options = {}) {
    super(options);

    switch (options.coordinateSystem || 'world') {
      case 'screen':
        Object.defineProperty(this, "quaternion", {
          get: () => worldToScreen(this[slot].quaternion)
        });
        break;
      case 'world':
      default:
        Object.defineProperty(this, "quaternion", {
          get: () => this[slot].quaternion
        });
    }

    this[slot].handleEvent = event => {
      // If absolute is set, or webkitCompassHeading exists,
      // absolute values should be available.
      const isAbsolute = event.absolute === true || "webkitCompassHeading" in event;
      const hasValue = event.alpha !== null || event.webkitCompassHeading !== undefined;

      if (!isAbsolute || !hasValue) {
        // Spec: If an implementation can never provide absolute
        // orientation information, the event should be fired with
        // the alpha, beta and gamma attributes set to null.
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].hasReading = true;
      this[slot].timestamp = performance.now();

      const heading = event.webkitCompassHeading != null ? 360 - event.webkitCompassHeading : event.alpha;

      this[slot].quaternion = toQuaternionFromEuler(
        heading,
        event.beta,
        event.gamma
      );

      this.dispatchEvent(new Event("reading"));
    }

    this[slot].deactivateCallback = () => {
      this[slot].quaternion = null;
    }
  }

  populateMatrix(mat) {
    toMat4FromQuat(mat, this.quaternion);
  }
}

// @ts-ignore
const Gyroscope = window.Gyroscope ||
class Gyroscope extends DeviceOrientationMixin(Sensor, "devicemotion") {
  constructor(options) {
    super(options);
    this[slot].handleEvent = event => {
      // If there is no sensor we will get values equal to null.
      if (event.rotationRate.alpha === null) {
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = performance.now();

      this[slot].x = event.rotationRate.alpha;
      this[slot].y = event.rotationRate.beta;
      this[slot].z = event.rotationRate.gamma;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    defineReadonlyProperties(this, slot, {
      x: null,
      y: null,
      z: null
    });

    this[slot].deactivateCallback = () => {
      this[slot].x = null;
      this[slot].y = null;
      this[slot].z = null;
    }
  }
}

// @ts-ignore
const Accelerometer = window.Accelerometer ||
class Accelerometer extends DeviceOrientationMixin(Sensor, "devicemotion") {
  constructor(options) {
    super(options);
    this[slot].handleEvent = event => {
      // If there is no sensor we will get values equal to null.
      if (event.accelerationIncludingGravity.x === null) {
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = performance.now();

      this[slot].x = event.accelerationIncludingGravity.x;
      this[slot].y = event.accelerationIncludingGravity.y;
      this[slot].z = event.accelerationIncludingGravity.z;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    defineReadonlyProperties(this, slot, {
      x: null,
      y: null,
      z: null
    });

    this[slot].deactivateCallback = () => {
      this[slot].x = null;
      this[slot].y = null;
      this[slot].z = null;
    }
  }
}

// @ts-ignore
const LinearAccelerationSensor = window.LinearAccelerationSensor ||
class LinearAccelerationSensor extends DeviceOrientationMixin(Sensor, "devicemotion") {
  constructor(options) {
    super(options);
    this[slot].handleEvent = event => {
      // If there is no sensor we will get values equal to null.
      if (event.acceleration.x === null) {
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = performance.now();

      this[slot].x = event.acceleration.x;
      this[slot].y = event.acceleration.y;
      this[slot].z = event.acceleration.z;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    defineReadonlyProperties(this, slot, {
      x: null,
      y: null,
      z: null
    });

    this[slot].deactivateCallback = () => {
      this[slot].x = null;
      this[slot].y = null;
      this[slot].z = null;
    }
  }
}

// @ts-ignore
const GravitySensor = window.GravitySensor ||
 class GravitySensor extends DeviceOrientationMixin(Sensor, "devicemotion") {
  constructor(options) {
    super(options);
    this[slot].handleEvent = event => {
      // If there is no sensor we will get values equal to null.
      if (event.acceleration.x === null || event.accelerationIncludingGravity.x === null) {
        this[slot].notifyError("Could not connect to a sensor", "NotReadableError");
        return;
      }

      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = performance.now();

      this[slot].x = event.accelerationIncludingGravity.x - event.acceleration.x;
      this[slot].y = event.accelerationIncludingGravity.y - event.acceleration.y;
      this[slot].z = event.accelerationIncludingGravity.z - event.acceleration.z;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    defineReadonlyProperties(this, slot, {
      x: null,
      y: null,
      z: null
    });

    this[slot].deactivateCallback = () => {
      this[slot].x = null;
      this[slot].y = null;
      this[slot].z = null;
    }
  }
}

/***/ }),

/***/ 28660:
/*!***********************************************************!*\
  !*** ./runestone/cellbotics/js/sensor_polyfill/sensor.js ***!
  \***********************************************************/
/***/ (() => {

// ********************************
// |docname| - Base Sensor polyfill
// ********************************
// The `geolocation-sensor.js` and `motion-sensors.js` files depend on this.



// @ts-check
const __sensor__ = Symbol("__sensor__");

const slot = __sensor__;

function defineProperties(target, descriptions) {
  for (const property in descriptions) {
    Object.defineProperty(target, property, {
      configurable: true,
      value: descriptions[property]
    });
  }
}

const EventTargetMixin = (superclass, ...eventNames) => class extends superclass {
  constructor(...args) {
    // @ts-ignore
    super(args);
    const eventTarget = document.createDocumentFragment();

    this.addEventListener = (type, ...args) => {
      return eventTarget.addEventListener(type, ...args);
    }

    this.removeEventListener = (...args) => {
      // @ts-ignore
      return eventTarget.removeEventListener(...args);
    }

    this.dispatchEvent = (event) => {
      defineProperties(event, { currentTarget: this });
      if (!event.target) {
        defineProperties(event, { target: this });
      }

      const methodName = `on${event.type}`;
      if (typeof this[methodName] == "function") {
          this[methodName](event);
      }

      const retValue = eventTarget.dispatchEvent(event);

      if (retValue && this.parentNode) {
        this.parentNode.dispatchEvent(event);
      }

      defineProperties(event, { currentTarget: null, target: null });

      return retValue;
    }
  }
};

class EventTarget extends EventTargetMixin(Object) {};

function defineReadonlyProperties(target, slot, descriptions) {
  const propertyBag = target[slot];
  for (const property in descriptions) {
    propertyBag[property] = descriptions[property];
    Object.defineProperty(target, property, {
      get: () => propertyBag[property]
    });
  }
}

class SensorErrorEvent extends Event {
  constructor(type, errorEventInitDict) {
    super(type, errorEventInitDict);

    if (!errorEventInitDict || !(errorEventInitDict.error instanceof DOMException)) {
      throw TypeError(
        "Failed to construct 'SensorErrorEvent':" +
        "2nd argument much contain 'error' property"
      );
    }

    Object.defineProperty(this, "error", {
      configurable: false,
      writable: false,
      value: errorEventInitDict.error
    });
  }
};

function defineOnEventListener(target, name) {
  Object.defineProperty(target, `on${name}`, {
    enumerable: true,
    configurable: false,
    writable: true,
    value: null
  });
}

const SensorState = {
  IDLE: 1,
  ACTIVATING: 2,
  ACTIVE: 3,
}

class Sensor extends EventTarget {
  constructor(options) {
    super();
    this[slot] = new WeakMap;

    defineOnEventListener(this, "reading");
    defineOnEventListener(this, "activate");
    defineOnEventListener(this, "error");

    defineReadonlyProperties(this, slot, {
      activated: false,
      hasReading: false,
      timestamp: null
    })

    this[slot].state = SensorState.IDLE;

    this[slot].notifyError = (message, name) => {
      let error = new SensorErrorEvent("error", {
        error: new DOMException(message, name)
      });
      this.dispatchEvent(error);
      this.stop();
    }

    this[slot].notifyActivatedState = () => {
      let activate = new Event("activate");
      this[slot].activated = true;
      this.dispatchEvent(activate);
      this[slot].state = SensorState.ACTIVE;
    }

    this[slot].activateCallback = () => {};
    this[slot].deactivateCallback = () => {};

    this[slot].frequency = null;

    if (window && window.parent != window.top) {
      throw new DOMException("Only instantiable in a top-level browsing context", "SecurityError");
    }

    if (options && typeof(options.frequency) == "number") {
      if (options.frequency > 60) {
        this.frequency = options.frequency;
      }
    }
  }

  start() {
    if (this[slot].state === SensorState.ACTIVATING || this[slot].state === SensorState.ACTIVE) {
      return;
    }
    this[slot].state = SensorState.ACTIVATING;
    this[slot].activateCallback();
  }

  stop() {
    if (this[slot].state === SensorState.IDLE) {
      return;
    }
    this[slot].activated = false;
    this[slot].hasReading = false;
    this[slot].timestamp = null;
    this[slot].deactivateCallback();

    this[slot].state = SensorState.IDLE;
  }
}

/***/ }),

/***/ 72389:
/*!**************************************************!*\
  !*** ./runestone/cellbotics/js/simple_sensor.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleAmbientLightSensor": () => (/* binding */ SimpleAmbientLightSensor),
/* harmony export */   "SimpleGeolocationSensor": () => (/* binding */ SimpleGeolocationSensor),
/* harmony export */   "SimpleAccelerometer": () => (/* binding */ SimpleAccelerometer),
/* harmony export */   "SimpleGyroscope": () => (/* binding */ SimpleGyroscope),
/* harmony export */   "SimpleLinearAccelerationSensor": () => (/* binding */ SimpleLinearAccelerationSensor),
/* harmony export */   "SimpleGravitySensor": () => (/* binding */ SimpleGravitySensor),
/* harmony export */   "SimpleMagnetometer": () => (/* binding */ SimpleMagnetometer),
/* harmony export */   "SimpleAbsoluteOrientationSensor": () => (/* binding */ SimpleAbsoluteOrientationSensor),
/* harmony export */   "SimpleRelativeOrientationSensor": () => (/* binding */ SimpleRelativeOrientationSensor)
/* harmony export */ });
/* harmony import */ var _permissions_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permissions_polyfill.js */ 64617);
/* harmony import */ var _permissions_polyfill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_permissions_polyfill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sensor_polyfill_geolocation_sensor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sensor_polyfill/geolocation-sensor.js */ 6713);
/* harmony import */ var _sensor_polyfill_motion_sensors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sensor_polyfill/motion-sensors.js */ 1981);
/* harmony import */ var _auto_bind_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auto-bind.js */ 34630);
// .. Copyright (C) 2012-2020 Bryan A. Jones.
//
//  This file is part of the CellBotics system.
//
//  The CellBotics system is free software: you can redistribute it and/or
//  modify it under the terms of the GNU General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  The CellBotics system is distributed in the hope that it will be
//  useful, but WITHOUT ANY WARRANTY; without even the implied warranty
//  of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with the CellBotics system.  If not, see
//  <http://www.gnu.org/licenses/>.
//
// **********************************
// |docname| - Interface with sensors
// **********************************
// This provides code to access `sensor APIs <https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs>`_.







// SimpleSensor
// ============
// This class wraps a `Sensor <https://developer.mozilla.org/en-US/docs/Web/API/Sensor>`_ with simple ``start``, ``ready``, and ``stop`` functions.
class SimpleSensor {
    constructor() {
        (0,_auto_bind_js__WEBPACK_IMPORTED_MODULE_3__.auto_bind)(this);

        this.sensor = null;
    }

    // This was initially based on the MDN Sensor API docs.
    async start(
        // The class to use for the sensor to start. It must be based on the Sensor interface.
        sensor_class,
        // An array of strings, giving the name of the API to ask permissions of for this sensor. See https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query.
        sensor_permission,
        // Options to pass to this sensor's constructor.
        sensor_options
    ) {
        if (this.sensor) {
            throw "In use. Stop the sensor before starting another.";
        }
        if (typeof sensor_class !== "function") {
            throw "Not available.";
        }

        // Get permission to use these sensors, if the API is supported.
        if (navigator.permissions) {
            let result = await Promise.all(sensor_permission.map(x => navigator.permissions.query({ name: x })));
            if (!result.every(val => val.state === "granted")) {
                throw `Permission to use the ${sensor_permission} sensor was denied.`;
            }
        }

        // To access a sensor:
        //
        // #.   Create it, then start it, synchronously checking for errors in this process.
        // #.   Await for a response from the sensor: an acceptance indicating the sensor works, or a rejection indicating a failure.
        //
        // Since the event handlers to accept or reject the promise must be set up in the synchronous phase, wrap everything in a promise. All the operations above therefore start when the promise is awaited.
        this.sensor = null;
        let on_error;
        let on_reading;
        let p = new Promise((resolve, reject) => {
            try {
                this.sensor = new sensor_class(sensor_options);

                // Handle callback errors by rejecting the promise.
                let that = this;
                on_error = event => {
                    that.sensor.removeEventListener("error", on_error);
                    // Handle runtime errors.
                    if (event.error.name === 'NotAllowedError') {
                        reject("Access to this sensor is not allowed.");
                    } else if (event.error.name === 'NotReadableError' ) {
                        reject('Cannot connect to the sensor.');
                    }
                    reject(`Unknown error: ${event.error.name}`);

                }
                this.sensor.addEventListener('error', on_error);

                // Wait for the first sensor reading to accept the promise.
                on_reading = event => {

                    that.sensor.removeEventListener("reading", on_reading);
                    resolve();
                }
                this.sensor.addEventListener("reading", on_reading);

                this.sensor.start();
            } catch (error) {
                // Handle construction errors.
                if (error.name === 'SecurityError') {
                    // See the note above about feature policy.
                    reject("Sensor construction was blocked by a feature policy.");
                } else if (error.name === 'ReferenceError') {
                    reject("Sensor is not supported by the User Agent.");
                } else {
                    reject(error);
                }
            }
        });

        // Start the sensor, waiting until it produces a reading or an error.
        try {
            console.log(`Await ${new Date()}`);
            await p;
        } catch (err) {
            this.stop();
            throw err;
        } finally {
            console.log(`Done ${new Date()}`);
            this.sensor.removeEventListener("error", on_error);
            this.sensor.removeEventListener("reading", on_reading);
        }
    }

    // True if the sensor is activated and has a reading.
    get ready() {
        return this.sensor && this.sensor.activated && this.sensor.hasReading;
    }

    // To save device power, be sure to stop the sensor as soon as the readings are no longer needed.
    stop() {
        this.sensor && this.sensor.stop();
        this.sensor = null;
    }
}


// Abstract helper classes
// =======================
// Several sensors return x, y, and z values. Collect the common code here.
class SimpleXYZSensor extends SimpleSensor {
    get x() {
        return this.sensor.x;
    }

    get y() {
        return this.sensor.y;
    }

    get z() {
        return this.sensor.z;
    }
}


// Two sensors return a quaternion or rotation matrix.
class SimpleOrientationSensor extends SimpleSensor {
    get quaternion() {
        return this.sensor.quaternion;
    }

    populateMatrix(targetMatrix) {
        return this.sensor.populateMatrix(targetMatrix);
    }
}


// Concrete classes
// ================
// Note the use of ``window.SensorName`` instead of ``SensorName`` for non-polyfills. This avoids exceptions if the particular sensor isn't defined, producing an ``undefined`` instead. For polyfills, we must use ``SensorName`` instead of ``window.SensorName``.
class SimpleAmbientLightSensor extends SimpleSensor {
    async start(als_options) {
        return super.start(window.AmbientLightSensor, ["ambient-light-sensor"], als_options);
    }

    get illuminance() {
        return this.sensor.illuminance;
    }
}


// See the `W3C draft spec <https://w3c.github.io/geolocation-sensor/#geolocationsensor-interface>`_.
class SimpleGeolocationSensor extends SimpleSensor {
    async start(geo_options) {
        return super.start(GeolocationSensor, ["geolocation"], geo_options);
    }

    get latitude() {
        return this.sensor.latitude;
    }

    get longitude() {
        return this.sensor.longitude;
    }

    get altitude() {
        return this.sensor.altitude;
    }

    get accuracy() {
        return this.sensor.accuracy;
    }

    get altitudeAccuracy() {
        return this.sensor.altitudeAccuracy;
    }

    get heading() {
        return this.sensor.heading;
    }

    get speed() {
        return this.sensor.speed;
    }
}


class SimpleAccelerometer extends SimpleXYZSensor {
    async start(accelerometer_options) {
        return super.start(Accelerometer, ["accelerometer"], accelerometer_options);
    }
}


class SimpleGyroscope extends SimpleXYZSensor {
    async start(gyro_options) {
        return super.start(Gyroscope, ["gyroscope"], gyro_options);
    }
}


class SimpleLinearAccelerationSensor extends SimpleXYZSensor {
    async start(accel_options) {
        return super.start(LinearAccelerationSensor, ["accelerometer"], accel_options);
    }
}


class SimpleGravitySensor extends SimpleXYZSensor {
    async start(grav_options) {
        return super.start(GravitySensor, ["accelerometer"], grav_options);
    }
}


class SimpleMagnetometer extends SimpleXYZSensor {
    async start(mag_options) {
        return super.start(window.Magnetometer, ["magnetometer"], mag_options);
    }
}


class SimpleAbsoluteOrientationSensor extends SimpleOrientationSensor {
    async start(orient_options) {
        return super.start(AbsoluteOrientationSensor, ["accelerometer", "gyroscope", "magnetometer"], orient_options);
    }
}


class SimpleRelativeOrientationSensor extends SimpleOrientationSensor {
    async start(orient_options) {
        return super.start(RelativeOrientationSensor, ["accelerometer", "gyroscope"], orient_options);
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2NlbGxib3RpY3NfanNfc2ltcGxlX3NlbnNvcl9qcy43NjEwNWZjODQ1Y2MyZTIwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7OztBQUdiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBJQUEwSSxpQkFBaUIsZUFBZSxnQkFBZ0I7QUFDMUwseUNBQXlDO0FBQ3pDO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0Esd0NBQXdDLGlCQUFpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFUTs7QUFFckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxtQkFBbUI7QUFDaEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFUTs7QUFFckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4RUFBOEUsZUFBZTtBQUM3Rjs7QUFFQTtBQUNBLGlGQUFpRixlQUFlO0FBQ2hHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQy9aQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxxQkFBcUI7QUFDckQ7QUFDQSxrQ0FBa0MsY0FBYztBQUNoRDs7QUFFQSw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxtQ0FBbUM7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxLQUFLO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7O0FBRXNCO0FBQ2M7QUFDSjtBQUNGOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBUzs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9HQUFvRyxTQUFTO0FBQzdHO0FBQ0EsK0NBQStDLG1CQUFtQjtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLGlDQUFpQyxXQUFXO0FBQzVDO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsZ0NBQWdDLFdBQVc7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9jZWxsYm90aWNzL2pzL2F1dG8tYmluZC5qcyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2NlbGxib3RpY3MvanMvcGVybWlzc2lvbnNfcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9jZWxsYm90aWNzL2pzL3NlbnNvcl9wb2x5ZmlsbC9nZW9sb2NhdGlvbi1zZW5zb3IuanMiLCJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9jZWxsYm90aWNzL2pzL3NlbnNvcl9wb2x5ZmlsbC9tb3Rpb24tc2Vuc29ycy5qcyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2NlbGxib3RpY3MvanMvc2Vuc29yX3BvbHlmaWxsL3NlbnNvci5qcyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2NlbGxib3RpY3MvanMvc2ltcGxlX3NlbnNvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuLiBDb3B5cmlnaHQgKEMpIDIwMTItMjAyMCBCcnlhbiBBLiBKb25lcy5cbi8vXG4vLyAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIENlbGxCb3RpY3Mgc3lzdGVtLlxuLy9cbi8vICBUaGUgQ2VsbEJvdGljcyBzeXN0ZW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4vLyAgbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vICBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vICBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vICBUaGUgQ2VsbEJvdGljcyBzeXN0ZW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlXG4vLyAgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eVxuLy8gIG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGUgR05VXG4vLyAgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gIGFsb25nIHdpdGggdGhlIENlbGxCb3RpY3Mgc3lzdGVtLiAgSWYgbm90LCBzZWVcbi8vICA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4vL1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyB8ZG9jbmFtZXwgLSBBdXRvbWF0aWNhbGx5IGJpbmQgbWV0aG9kcyB0byB0aGVpciBpbnN0YW5jZXNcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cInVzZSBzdHJpY3RcIjtcblxuXG4vLyBUaGUgZm9sbG93aW5nIHR3byBmdW5jdGlvbnMgd2VyZSB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYXV0by1iaW5kL2Jsb2IvbWFzdGVyL2luZGV4LmpzIGFuZCBsaWdodGx5IG1vZGlmaWVkLiBUaGV5IHByb3ZpZGUgYW4gZWFzeSB3YXkgdG8gYmluZCBhbGwgY2FsbGFibGUgbWV0aG9kcyB0byB0aGVpciBpbnN0YW5jZS4gU2VlIGBCaW5kaW5nIE1ldGhvZHMgdG8gQ2xhc3MgSW5zdGFuY2UgT2JqZWN0cyA8aHR0cHM6Ly9wb255Zm9vLmNvbS9hcnRpY2xlcy9iaW5kaW5nLW1ldGhvZHMtdG8tY2xhc3MtaW5zdGFuY2Utb2JqZWN0cz5gXyBmb3IgbW9yZSBkaXNjdXNzaW9uIG9uIHRoaXMgY3JhenkgSmF2YVNjcmlwdCBuZWNlc3NpdHkuXG4vL1xuLy8gR2V0cyBhbGwgbm9uLWJ1aWx0aW4gcHJvcGVydGllcyB1cCB0aGUgcHJvdG90eXBlIGNoYWluXG5jb25zdCBnZXRBbGxQcm9wZXJ0aWVzID0gb2JqZWN0ID0+IHtcblx0Y29uc3QgcHJvcGVydGllcyA9IG5ldyBTZXQoKTtcblxuXHRkbyB7XG5cdFx0Zm9yIChjb25zdCBrZXkgb2YgUmVmbGVjdC5vd25LZXlzKG9iamVjdCkpIHtcblx0XHRcdHByb3BlcnRpZXMuYWRkKFtvYmplY3QsIGtleV0pO1xuXHRcdH1cblx0fSB3aGlsZSAoKG9iamVjdCA9IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KSkgJiYgb2JqZWN0ICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuXHRyZXR1cm4gcHJvcGVydGllcztcbn07XG5cblxuLy8gSW52b2tlIHRoaXMgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIGFuIG9iamVjdC5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvX2JpbmQoc2VsZikge1xuICAgIGZvciAoY29uc3QgW29iamVjdCwga2V5XSBvZiBnZXRBbGxQcm9wZXJ0aWVzKHNlbGYuY29uc3RydWN0b3IucHJvdG90eXBlKSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzZWxmW2tleV0gPSBzZWxmW2tleV0uYmluZChzZWxmKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIC4uIENvcHlyaWdodCAoQykgMjAxMi0yMDIwIEJyeWFuIEEuIEpvbmVzLlxuLy9cbi8vICBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQ2VsbEJvdGljcyBzeXN0ZW0uXG4vL1xuLy8gIFRoZSBDZWxsQm90aWNzIHN5c3RlbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3Jcbi8vICBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gIFRoZSBDZWxsQm90aWNzIHN5c3RlbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmVcbi8vICB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5XG4vLyAgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZSBHTlVcbi8vICBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyAgYWxvbmcgd2l0aCB0aGUgQ2VsbEJvdGljcyBzeXN0ZW0uICBJZiBub3QsIHNlZVxuLy8gIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gfGRvY25hbWV8IC0gUG9seWZpbGwgZm9yIHRoZSBQZXJtaXNzaW9ucyBBUElcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBUaGlzIGlzIHByaW1hcmlseSBmb3IgaU9TIGRldmljZXMgdGhhdCBkb24ndCBwcm92aWRlIFBlcm1pc3Npb25zLCBidXQgdXNlIGFub3RoZXIgbWV0aG9kIHRvIGFsbG93IGFjY2VzcyB0byB2YXJpb3VzIHNlbnNvcnMuXG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBPbmx5IHN1cHBseSB0aGlzIGlmIHRoZXJlJ3Mgbm90IFBlcm1pc3Npb25zIGFuZCB3ZSBoYXZlIHRuZSBpT1MgZmxhdm9yIGF2YWlsYWJsZS4gU2VlIHNhbXBsZSBjb2RlIGluIGh0dHBzOi8vZGV2LnRvL2xpL2hvdy10by1yZXF1ZXN0cGVybWlzc2lvbi1mb3ItZGV2aWNlbW90aW9uLWFuZC1kZXZpY2VvcmllbnRhdGlvbi1ldmVudHMtaW4taW9zLTEzLTQ2ZzIgb3IgdGhlIGBXM0Mgd29ya2luZyBkcmFmdCA8aHR0cHM6Ly93d3cudzMub3JnL1RSL29yaWVudGF0aW9uLWV2ZW50LyNkZXZpY2VvcmllbnRhdGlvbj5gXy5cbmlmIChcbiAgICAhbmF2aWdhdG9yLnBlcm1pc3Npb25zICYmXG4gICAgKHR5cGVvZiBEZXZpY2VNb3Rpb25FdmVudC5yZXF1ZXN0UGVybWlzc2lvbiA9PT0gXCJmdW5jdGlvblwiKSAmJlxuICAgICh0eXBlb2YgRGV2aWNlT3JpZW50YXRpb25FdmVudC5yZXF1ZXN0UGVybWlzc2lvbiA9PT0gXCJmdW5jdGlvblwiKVxuKSB7XG4gICAgbmF2aWdhdG9yLnBlcm1pc3Npb25zID0ge1xuICAgICAgICBxdWVyeTogb3B0aW9ucyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgdGhlIG5hbWUsIHNpbmNlIG91ciB1c2UgY2FzZSBpcyBvbmx5IGZvciBTaW1wbGVTZW5zb3IuXG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMubmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhY2NlbGVyb21ldGVyXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImd5cm9zY29wZVwiOlxuICAgICAgICAgICAgICAgIC8vIFRoZSByZXF1ZXN0ZWQgcGVybWlzc2lvbnMgZG9lc24ndCBhbGxvdyB1cyB0byBkZXRlcm1pbmUgd2hpY2ggb2YgdGhlIGZvbGxvd2luZyB0d28gcGVybWlzc2lvbnMgd2UgbmVlZCwgc28gYXNrIGZvciBib3RoLlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwb2x5ZmlsbCBmb3IgdGhlIGFjY2VsZXJvbWV0ZXIsIGd5cm8sIGFuZCByZWxhdGVkIGNsYXNzZXMgbmVlZHMganVzdCB0aGlzLlxuICAgICAgICAgICAgICAgICAgICAgICAgRGV2aWNlTW90aW9uRXZlbnQucmVxdWVzdFBlcm1pc3Npb24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwb2x5ZmlsbCBmb3IgdGhlIG9yaWVudGF0aW9uIHNlbnNvcnMgbmVlZHMganVzdCB0aGlzLlxuICAgICAgICAgICAgICAgICAgICAgICAgRGV2aWNlT3JpZW50YXRpb25FdmVudC5yZXF1ZXN0UGVybWlzc2lvbigpXG4gICAgICAgICAgICAgICAgICAgIF0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBub3cgaGF2ZSBhbiBhcnJheSBvZiBzdHJpbmdzLCB0aGUgcmVzdWx0IG9mIHRoZSByZXF1ZXN0UGVybWlzc2lvbiBjYWxscy4gSWYgYWxsIGFyZSBcImdyYW50ZWRcIiwgdGhlbiByZXR1cm4ge3N0YXRlOiBcImdyYW50ZWRcIn0sIGVsc2UgcmV0dXJuIHtzdGF0ZTogXCJkZW5pZWRcIn0uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxzID0+IHJlc29sdmUoe3N0YXRlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWxzLmV2ZXJ5KHggPT4geCA9PT0gXCJncmFudGVkXCIpID8gXCJncmFudGVkXCIgOiBcImRlbmllZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gVGhlcmUncyBub3RoaW5nIGVsc2UgdGhhdCBuZWVkcyBwZXJtaXNzaW9uIHRvIHdvcmsuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtzdGF0ZTogXCJncmFudGVkXCJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4iLCIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIHxkb2NuYW1lfCAtIEdlb2xvY2F0aW9uIHNlbnNvciBwb2x5ZmlsbFxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBAdHMtY2hlY2tcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgXCIuL3NlbnNvci5qc1wiO1xuXG4vL2NvbnN0IHNsb3QgPSBfX3NlbnNvcl9fO1xuXG5jbGFzcyBHZW9sb2NhdGlvblNlbnNvclNpbmdsZXRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5zZW5zb3JzID0gbmV3IFNldCgpO1xuICAgIHRoaXMud2F0Y2hJZCA9IG51bGw7XG4gICAgdGhpcy5hY2N1cmFjeSA9IG51bGw7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2U7XG4gIH1cblxuICBhc3luYyBvYnRhaW5QZXJtaXNzaW9uKCkge1xuICAgIGxldCBzdGF0ZSA9IFwicHJvbXB0XCI7IC8vIERlZmF1bHQgZm9yIGdlb2xvY2F0aW9uLlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAobmF2aWdhdG9yLnBlcm1pc3Npb25zKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBwZXJtaXNzaW9uID0gYXdhaXQgbmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5KHsgbmFtZTpcImdlb2xvY2F0aW9uXCJ9KTtcbiAgICAgIHN0YXRlID0gcGVybWlzc2lvbi5zdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBzdWNjZXNzRm4gPSBwb3NpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHJlc29sdmUoXCJncmFudGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvckZuID0gZXJyID0+IHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSBlcnIuUEVSTUlTU0lPTl9ERU5JRUQpIHtcbiAgICAgICAgICByZXNvbHZlKFwiZGVuaWVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IG1heGltdW1BZ2U6IEluZmluaXR5LCB0aW1lb3V0OiAxMCB9O1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihzdWNjZXNzRm4sIGVycm9yRm4sIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlQWNjdXJhY3koKSB7XG4gICAgbGV0IGVuYWJsZUhpZ2hBY2N1cmFjeSA9IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBzZW5zb3Igb2YgdGhpcy5zZW5zb3JzKSB7XG4gICAgICBpZiAoc2Vuc29yW3Nsb3RdLm9wdGlvbnMuYWNjdXJhY3kgPT09IFwiaGlnaFwiKSB7XG4gICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW5hYmxlSGlnaEFjY3VyYWN5O1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXIoc2Vuc29yKSB7XG4gICAgY29uc3QgcGVybWlzc2lvbiA9IGF3YWl0IHRoaXMub2J0YWluUGVybWlzc2lvbigpO1xuICAgIGlmIChwZXJtaXNzaW9uICE9PSBcImdyYW50ZWRcIikge1xuICAgICAgc2Vuc29yW3Nsb3RdLm5vdGlmeUVycm9yKFwiUGVybWlzc2lvbiBkZW5pZWQuXCIsIFwiTm93QWxsb3dlZEVycm9yXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhc3RQb3NpdGlvbikge1xuICAgICAgY29uc3QgYWdlID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RQb3NpdGlvbi50aW1lU3RhbXA7XG4gICAgICBjb25zdCBtYXhBZ2UgPSBzZW5zb3Jbc2xvdF0ub3B0aW9ucy5tYXhBZ2U7XG4gICAgICBpZiAobWF4QWdlID09IG51bGwgfHwgYWdlIDw9IG1heEFnZSkge1xuICAgICAgICBzZW5zb3Jbc2xvdF0uaGFuZGxlRXZlbnQoYWdlLCB0aGlzLmxhc3RQb3NpdGlvbi5jb29yZHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2Vuc29ycy5hZGQoc2Vuc29yKTtcblxuICAgIC8vIENoZWNrIHdoZXRoZXIgd2UgbmVlZCB0byByZWNvbmZpZ3VyZSBvdXIgbmF2aWdhdGlvbi5nZW9sb2NhdGlvblxuICAgIC8vIHdhdGNoLCBpZS4gdGVhciBpdCBkb3duIGFuZCByZWNyZWF0ZS5cbiAgICBjb25zdCBhY2N1cmFjeSA9IHRoaXMuY2FsY3VsYXRlQWNjdXJhY3koKTtcbiAgICBpZiAodGhpcy53YXRjaElkICYmIHRoaXMuYWNjdXJhY3kgPT09IGFjY3VyYWN5KSB7XG4gICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIHJlc2V0LCByZXR1cm4uXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2F0Y2hJZCkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godGhpcy53YXRjaElkKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVFdmVudCA9IHBvc2l0aW9uID0+IHtcbiAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBvc2l0aW9uLnRpbWVzdGFtcCAtIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICBjb25zdCBjb29yZHMgPSBwb3NpdGlvbi5jb29yZHM7XG5cbiAgICAgIGZvciAoY29uc3Qgc2Vuc29yIG9mIHRoaXMuc2Vuc29ycykge1xuICAgICAgICBzZW5zb3Jbc2xvdF0uaGFuZGxlRXZlbnQodGltZXN0YW1wLCBjb29yZHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgbGV0IHR5cGU7XG4gICAgICBzd2l0Y2goZXJyb3IuY29kZSkge1xuICAgICAgICBjYXNlIGVycm9yLlRJTUVPVVQ6XG4gICAgICAgICAgdHlwZSA9IFwiVGltZW91dEVycm9yXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZXJyb3IuUEVSTUlTU0lPTl9ERU5JRUQ6XG4gICAgICAgICAgdHlwZSA9IFwiTm90QWxsb3dlZEVycm9yXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZXJyb3IuUE9TSVRJT05fVU5BVkFJTEFCTEU6XG4gICAgICAgICAgdHlwZSA9IFwiTm90UmVhZGFibGVFcnJvclwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHR5cGUgPSBcIlVua25vd25FcnJvclwiO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzZW5zb3Igb2YgdGhpcy5zZW5zb3JzKSB7XG4gICAgICAgIHNlbnNvcltzbG90XS5oYW5kbGVFcnJvcihlcnJvci5tZXNzYWdlLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiBhY2N1cmFjeSxcbiAgICAgIG1heGltdW1BZ2U6IDAsXG4gICAgICB0aW1lb3V0OiBJbmZpbml0eVxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hJZCA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKFxuICAgICAgaGFuZGxlRXZlbnQsIGhhbmRsZUVycm9yLCBvcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGRlcmVnaXN0ZXIoc2Vuc29yKSB7XG4gICAgdGhpcy5zZW5zb3JzLmRlbGV0ZShzZW5zb3IpO1xuICAgIGlmICghdGhpcy5zZW5zb3JzLnNpemUgJiYgdGhpcy53YXRjaElkKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaCh0aGlzLndhdGNoSWQpO1xuICAgICAgdGhpcy53YXRjaElkID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuLy8gQHRzLWlnbm9yZVxuY29uc3QgR2VvbG9jYXRpb25TZW5zb3IgPSB3aW5kb3cuR2VvbG9jYXRpb25TZW5zb3IgfHxcbmNsYXNzIEdlb2xvY2F0aW9uU2Vuc29yIGV4dGVuZHMgU2Vuc29yIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzW3Nsb3RdLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBsYXRpdHVkZTogbnVsbCxcbiAgICAgIGxvbmdpdHVkZTogbnVsbCxcbiAgICAgIGFsdGl0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsXG4gICAgICBhbHRpdHVkZUFjY3VyYWN5OiBudWxsLFxuICAgICAgaGVhZGluZzogbnVsbCxcbiAgICAgIHNwZWVkOiBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgcHJvcGVydHlCYWcgPSB0aGlzW3Nsb3RdO1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gcHJvcHMpIHtcbiAgICAgIHByb3BlcnR5QmFnW3Byb3BOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wTmFtZSwge1xuICAgICAgICBnZXQ6ICgpID0+IHByb3BlcnR5QmFnW3Byb3BOYW1lXVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpc1tzbG90XS5oYW5kbGVFdmVudCA9ICh0aW1lc3RhbXAsIGNvb3JkcykgPT4ge1xuICAgICAgaWYgKCF0aGlzW3Nsb3RdLmFjdGl2YXRlZCkge1xuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUFjdGl2YXRlZFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXNbc2xvdF0udGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG4gICAgICB0aGlzW3Nsb3RdLmFjY3VyYWN5ID0gY29vcmRzLmFjY3VyYWN5O1xuICAgICAgdGhpc1tzbG90XS5hbHRpdHVkZSA9IGNvb3Jkcy5hbHRpdHVkZTtcbiAgICAgIHRoaXNbc2xvdF0uYWx0aXR1ZGVBY2N1cmFjeSA9IGNvb3Jkcy5hbHRpdHVkZUFjY3VyYWN5O1xuICAgICAgdGhpc1tzbG90XS5oZWFkaW5nID0gY29vcmRzLmhlYWRpbmc7XG4gICAgICB0aGlzW3Nsb3RdLmxhdGl0dWRlID0gY29vcmRzLmxhdGl0dWRlO1xuICAgICAgdGhpc1tzbG90XS5sb25naXR1ZGUgPSBjb29yZHMubG9uZ2l0dWRlO1xuICAgICAgdGhpc1tzbG90XS5zcGVlZCA9IGNvb3Jkcy5zcGVlZDtcblxuICAgICAgdGhpc1tzbG90XS5oYXNSZWFkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJyZWFkaW5nXCIpKTtcbiAgICB9XG5cbiAgICB0aGlzW3Nsb3RdLmhhbmRsZUVycm9yID0gKG1lc3NhZ2UsIHR5cGUpID0+IHtcbiAgICAgIHRoaXNbc2xvdF0ubm90aWZ5RXJyb3IobWVzc2FnZSwgdHlwZSk7XG4gICAgfVxuXG4gICAgdGhpc1tzbG90XS5hY3RpdmF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgKG5ldyBHZW9sb2NhdGlvblNlbnNvclNpbmdsZXRvbigpKS5yZWdpc3Rlcih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzW3Nsb3RdLmRlYWN0aXZhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIChuZXcgR2VvbG9jYXRpb25TZW5zb3JTaW5nbGV0b24oKSkuZGVyZWdpc3Rlcih0aGlzKTtcbiAgICB9XG4gIH1cbn0iLCIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gfGRvY25hbWV8IC0gTW90aW9uIHNlbnNvcnMgcG9seWZpbGxcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBAdHMtY2hlY2tcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgXCIuL3NlbnNvci5qc1wiO1xuXG4vL2NvbnN0IHNsb3QgPSBfX3NlbnNvcl9fO1xuXG5sZXQgb3JpZW50YXRpb247XG5cbi8vIEB0cy1pZ25vcmVcbmlmIChzY3JlZW4ub3JpZW50YXRpb24pIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBvcmllbnRhdGlvbiA9IHNjcmVlbi5vcmllbnRhdGlvbjtcbn0gZWxzZSBpZiAoc2NyZWVuLm1zT3JpZW50YXRpb24pIHtcbiAgb3JpZW50YXRpb24gPSBzY3JlZW4ubXNPcmllbnRhdGlvbjtcbn0gZWxzZSB7XG4gIG9yaWVudGF0aW9uID0ge307XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvcmllbnRhdGlvbiwgXCJhbmdsZVwiLCB7XG4gICAgZ2V0OiAoKSA9PiB7IHJldHVybiAod2luZG93Lm9yaWVudGF0aW9uIHx8IDApIH1cbiAgfSk7XG59XG5cbmNvbnN0IERldmljZU9yaWVudGF0aW9uTWl4aW4gPSAoc3VwZXJjbGFzcywgLi4uZXZlbnROYW1lcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBzdXBlcihhcmdzKTtcblxuICAgIGZvciAoY29uc3QgZXZlbnROYW1lIG9mIGV2ZW50TmFtZXMpIHtcbiAgICAgIGlmIChgb24ke2V2ZW50TmFtZX1gIGluIHdpbmRvdykge1xuICAgICAgICB0aGlzW3Nsb3RdLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpc1tzbG90XS5hY3RpdmF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIodGhpc1tzbG90XS5ldmVudE5hbWUsIHRoaXNbc2xvdF0uaGFuZGxlRXZlbnQsIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICB0aGlzW3Nsb3RdLmRlYWN0aXZhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXNbc2xvdF0uZXZlbnROYW1lLCB0aGlzW3Nsb3RdLmhhbmRsZUV2ZW50LCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiB0b1F1YXRlcm5pb25Gcm9tRXVsZXIoYWxwaGEsIGJldGEsIGdhbW1hKSB7XG4gIGNvbnN0IGRlZ1RvUmFkID0gTWF0aC5QSSAvIDE4MFxuXG4gIGNvbnN0IHggPSAoYmV0YSB8fCAwKSAqIGRlZ1RvUmFkO1xuICBjb25zdCB5ID0gKGdhbW1hIHx8IDApICogZGVnVG9SYWQ7XG4gIGNvbnN0IHogPSAoYWxwaGEgfHwgMCkgKiBkZWdUb1JhZDtcblxuICBjb25zdCBjWiA9IE1hdGguY29zKHogKiAwLjUpO1xuICBjb25zdCBzWiA9IE1hdGguc2luKHogKiAwLjUpO1xuICBjb25zdCBjWSA9IE1hdGguY29zKHkgKiAwLjUpO1xuICBjb25zdCBzWSA9IE1hdGguc2luKHkgKiAwLjUpO1xuICBjb25zdCBjWCA9IE1hdGguY29zKHggKiAwLjUpO1xuICBjb25zdCBzWCA9IE1hdGguc2luKHggKiAwLjUpO1xuXG4gIGNvbnN0IHF4ID0gc1ggKiBjWSAqIGNaIC0gY1ggKiBzWSAqIHNaO1xuICBjb25zdCBxeSA9IGNYICogc1kgKiBjWiArIHNYICogY1kgKiBzWjtcbiAgY29uc3QgcXogPSBjWCAqIGNZICogc1ogKyBzWCAqIHNZICogY1o7XG4gIGNvbnN0IHF3ID0gY1ggKiBjWSAqIGNaIC0gc1ggKiBzWSAqIHNaO1xuXG4gIHJldHVybiBbcXgsIHF5LCBxeiwgcXddO1xufVxuXG5mdW5jdGlvbiByb3RhdGVRdWF0ZXJuaW9uQnlBeGlzQW5nbGUocXVhdCwgYXhpcywgYW5nbGUpIHtcbiAgY29uc3Qgc0hhbGZBbmdsZSA9IE1hdGguc2luKGFuZ2xlIC8gMik7XG4gIGNvbnN0IGNIYWxmQW5nbGUgPSBNYXRoLmNvcyhhbmdsZSAvIDIpO1xuXG4gIGNvbnN0IHRyYW5zZm9ybVF1YXQgPSBbXG4gICAgYXhpc1swXSAqIHNIYWxmQW5nbGUsXG4gICAgYXhpc1sxXSAqIHNIYWxmQW5nbGUsXG4gICAgYXhpc1syXSAqIHNIYWxmQW5nbGUsXG4gICAgY0hhbGZBbmdsZVxuICBdO1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5UXVhdGVybmlvbihhLCBiKSB7XG4gICAgY29uc3QgcXggPSBhWzBdICogYlszXSArIGFbM10gKiBiWzBdICsgYVsxXSAqIGJbMl0gLSBhWzJdICogYlsxXTtcbiAgICBjb25zdCBxeSA9IGFbMV0gKiBiWzNdICsgYVszXSAqIGJbMV0gKyBhWzJdICogYlswXSAtIGFbMF0gKiBiWzJdO1xuICAgIGNvbnN0IHF6ID0gYVsyXSAqIGJbM10gKyBhWzNdICogYlsyXSArIGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgY29uc3QgcXcgPSBhWzNdICogYlszXSAtIGFbMF0gKiBiWzBdIC0gYVsxXSAqIGJbMV0gLSBhWzJdICogYlsyXTtcblxuICAgIHJldHVybiBbcXgsIHF5LCBxeiwgcXddO1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplUXVhdGVybmlvbihxdWF0KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5zcXJ0KHF1YXRbMF0gKiogMiArIHF1YXRbMV0gKiogMiArIHF1YXRbMl0gKiogMiArIHF1YXRbM10gKiogMik7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFswLCAwLCAwLCAxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVhdC5tYXAodiA9PiB2IC8gbGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVRdWF0ZXJuaW9uKG11bHRpcGx5UXVhdGVybmlvbihxdWF0LCB0cmFuc2Zvcm1RdWF0KSk7XG59XG5cbmZ1bmN0aW9uIHRvTWF0NEZyb21RdWF0KG1hdCwgcSkge1xuICBjb25zdCB0eXBlZCA9IG1hdCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fCBtYXQgaW5zdGFuY2VvZiBGbG9hdDY0QXJyYXk7XG5cbiAgaWYgKHR5cGVkICYmIG1hdC5sZW5ndGggPj0gMTYpIHtcbiAgICBtYXRbMF0gPSAxIC0gMiAqIChxWzFdICoqIDIgKyBxWzJdICoqIDIpO1xuICAgIG1hdFsxXSA9IDIgKiAocVswXSAqIHFbMV0gLSBxWzJdICogcVszXSk7XG4gICAgbWF0WzJdID0gMiAqIChxWzBdICogcVsyXSArIHFbMV0gKiBxWzNdKTtcbiAgICBtYXRbM10gPSAwO1xuXG4gICAgbWF0WzRdID0gMiAqIChxWzBdICogcVsxXSArIHFbMl0gKiBxWzNdKTtcbiAgICBtYXRbNV0gPSAxIC0gMiAqIChxWzBdICoqIDIgKyBxWzJdICoqIDIpO1xuICAgIG1hdFs2XSA9IDIgKiAocVsxXSAqIHFbMl0gLSBxWzBdICogcVszXSk7XG4gICAgbWF0WzddID0gMDtcblxuICAgIG1hdFs4XSA9IDIgKiAocVswXSAqIHFbMl0gLSBxWzFdICogcVszXSk7XG4gICAgbWF0WzldID0gMiAqIChxWzFdICogcVsyXSArIHFbMF0gKiBxWzNdKTtcbiAgICBtYXRbMTBdID0gMSAtIDIgKiAocVswXSAqKiAyICsgcVsxXSAqKiAyKTtcbiAgICBtYXRbMTFdID0gMDtcblxuICAgIG1hdFsxMl0gPSAwO1xuICAgIG1hdFsxM10gPSAwO1xuICAgIG1hdFsxNF0gPSAwO1xuICAgIG1hdFsxNV0gPSAxO1xuICB9XG5cbiAgcmV0dXJuIG1hdDtcbn1cblxuZnVuY3Rpb24gd29ybGRUb1NjcmVlbihxdWF0ZXJuaW9uKSB7XG4gIHJldHVybiAhcXVhdGVybmlvbiA/IG51bGwgOlxuICAgIHJvdGF0ZVF1YXRlcm5pb25CeUF4aXNBbmdsZShcbiAgICAgIHF1YXRlcm5pb24sXG4gICAgICBbMCwgMCwgMV0sXG4gICAgICAtIG9yaWVudGF0aW9uLmFuZ2xlICogTWF0aC5QSSAvIDE4MFxuICAgICk7XG59XG5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IFJlbGF0aXZlT3JpZW50YXRpb25TZW5zb3IgPSB3aW5kb3cuUmVsYXRpdmVPcmllbnRhdGlvblNlbnNvciB8fFxuY2xhc3MgUmVsYXRpdmVPcmllbnRhdGlvblNlbnNvciBleHRlbmRzIERldmljZU9yaWVudGF0aW9uTWl4aW4oU2Vuc29yLCBcImRldmljZW9yaWVudGF0aW9uXCIpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICBzd2l0Y2ggKG9wdGlvbnMuY29vcmRpbmF0ZVN5c3RlbSB8fCAnd29ybGQnKSB7XG4gICAgICBjYXNlICdzY3JlZW4nOlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJxdWF0ZXJuaW9uXCIsIHtcbiAgICAgICAgICBnZXQ6ICgpID0+IHdvcmxkVG9TY3JlZW4odGhpc1tzbG90XS5xdWF0ZXJuaW9uKVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3b3JsZCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJxdWF0ZXJuaW9uXCIsIHtcbiAgICAgICAgICBnZXQ6ICgpID0+IHRoaXNbc2xvdF0ucXVhdGVybmlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzW3Nsb3RdLmhhbmRsZUV2ZW50ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2Vuc29yIHdlIHdpbGwgZ2V0IHZhbHVlcyBlcXVhbCB0byBudWxsLlxuICAgICAgaWYgKGV2ZW50LmFic29sdXRlIHx8IGV2ZW50LmFscGhhID09PSBudWxsKSB7XG4gICAgICAgIC8vIFNwZWM6IFRoZSBpbXBsZW1lbnRhdGlvbiBjYW4gc3RpbGwgZGVjaWRlIHRvIHByb3ZpZGVcbiAgICAgICAgLy8gYWJzb2x1dGUgb3JpZW50YXRpb24gaWYgcmVsYXRpdmUgaXMgbm90IGF2YWlsYWJsZSBvclxuICAgICAgICAvLyB0aGUgcmVzdWx0aW5nIGRhdGEgaXMgbW9yZSBhY2N1cmF0ZS4gSW4gZWl0aGVyIGNhc2UsXG4gICAgICAgIC8vIHRoZSBhYnNvbHV0ZSBwcm9wZXJ0eSBtdXN0IGJlIHNldCBhY2NvcmRpbmdseSB0byByZWZsZWN0XG4gICAgICAgIC8vIHRoZSBjaG9pY2UuXG4gICAgICAgIHRoaXNbc2xvdF0ubm90aWZ5RXJyb3IoXCJDb3VsZCBub3QgY29ubmVjdCB0byBhIHNlbnNvclwiLCBcIk5vdFJlYWRhYmxlRXJyb3JcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzW3Nsb3RdLmFjdGl2YXRlZCkge1xuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUFjdGl2YXRlZFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXNbc2xvdF0udGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAgIHRoaXNbc2xvdF0ucXVhdGVybmlvbiA9IHRvUXVhdGVybmlvbkZyb21FdWxlcihcbiAgICAgICAgZXZlbnQuYWxwaGEsXG4gICAgICAgIGV2ZW50LmJldGEsXG4gICAgICAgIGV2ZW50LmdhbW1hXG4gICAgICApO1xuXG4gICAgICB0aGlzW3Nsb3RdLmhhc1JlYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlYWRpbmdcIikpO1xuICAgIH1cblxuICAgIHRoaXNbc2xvdF0uZGVhY3RpdmF0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgdGhpc1tzbG90XS5xdWF0ZXJuaW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwb3B1bGF0ZU1hdHJpeChtYXQpIHtcbiAgICB0b01hdDRGcm9tUXVhdChtYXQsIHRoaXMucXVhdGVybmlvbik7XG4gIH1cbn1cblxuLy8gQHRzLWlnbm9yZVxuY29uc3QgQWJzb2x1dGVPcmllbnRhdGlvblNlbnNvciA9IHdpbmRvdy5BYnNvbHV0ZU9yaWVudGF0aW9uU2Vuc29yIHx8XG5jbGFzcyBBYnNvbHV0ZU9yaWVudGF0aW9uU2Vuc29yIGV4dGVuZHMgRGV2aWNlT3JpZW50YXRpb25NaXhpbihcbiAgU2Vuc29yLCBcImRldmljZW9yaWVudGF0aW9uYWJzb2x1dGVcIiwgXCJkZXZpY2VvcmllbnRhdGlvblwiKSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgc3dpdGNoIChvcHRpb25zLmNvb3JkaW5hdGVTeXN0ZW0gfHwgJ3dvcmxkJykge1xuICAgICAgY2FzZSAnc2NyZWVuJzpcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicXVhdGVybmlvblwiLCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiB3b3JsZFRvU2NyZWVuKHRoaXNbc2xvdF0ucXVhdGVybmlvbilcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd29ybGQnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicXVhdGVybmlvblwiLCB7XG4gICAgICAgICAgZ2V0OiAoKSA9PiB0aGlzW3Nsb3RdLnF1YXRlcm5pb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpc1tzbG90XS5oYW5kbGVFdmVudCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIElmIGFic29sdXRlIGlzIHNldCwgb3Igd2Via2l0Q29tcGFzc0hlYWRpbmcgZXhpc3RzLFxuICAgICAgLy8gYWJzb2x1dGUgdmFsdWVzIHNob3VsZCBiZSBhdmFpbGFibGUuXG4gICAgICBjb25zdCBpc0Fic29sdXRlID0gZXZlbnQuYWJzb2x1dGUgPT09IHRydWUgfHwgXCJ3ZWJraXRDb21wYXNzSGVhZGluZ1wiIGluIGV2ZW50O1xuICAgICAgY29uc3QgaGFzVmFsdWUgPSBldmVudC5hbHBoYSAhPT0gbnVsbCB8fCBldmVudC53ZWJraXRDb21wYXNzSGVhZGluZyAhPT0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoIWlzQWJzb2x1dGUgfHwgIWhhc1ZhbHVlKSB7XG4gICAgICAgIC8vIFNwZWM6IElmIGFuIGltcGxlbWVudGF0aW9uIGNhbiBuZXZlciBwcm92aWRlIGFic29sdXRlXG4gICAgICAgIC8vIG9yaWVudGF0aW9uIGluZm9ybWF0aW9uLCB0aGUgZXZlbnQgc2hvdWxkIGJlIGZpcmVkIHdpdGhcbiAgICAgICAgLy8gdGhlIGFscGhhLCBiZXRhIGFuZCBnYW1tYSBhdHRyaWJ1dGVzIHNldCB0byBudWxsLlxuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUVycm9yKFwiQ291bGQgbm90IGNvbm5lY3QgdG8gYSBzZW5zb3JcIiwgXCJOb3RSZWFkYWJsZUVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpc1tzbG90XS5hY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpc1tzbG90XS5ub3RpZnlBY3RpdmF0ZWRTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzW3Nsb3RdLmhhc1JlYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpc1tzbG90XS50aW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgY29uc3QgaGVhZGluZyA9IGV2ZW50LndlYmtpdENvbXBhc3NIZWFkaW5nICE9IG51bGwgPyAzNjAgLSBldmVudC53ZWJraXRDb21wYXNzSGVhZGluZyA6IGV2ZW50LmFscGhhO1xuXG4gICAgICB0aGlzW3Nsb3RdLnF1YXRlcm5pb24gPSB0b1F1YXRlcm5pb25Gcm9tRXVsZXIoXG4gICAgICAgIGhlYWRpbmcsXG4gICAgICAgIGV2ZW50LmJldGEsXG4gICAgICAgIGV2ZW50LmdhbW1hXG4gICAgICApO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVhZGluZ1wiKSk7XG4gICAgfVxuXG4gICAgdGhpc1tzbG90XS5kZWFjdGl2YXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzW3Nsb3RdLnF1YXRlcm5pb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHBvcHVsYXRlTWF0cml4KG1hdCkge1xuICAgIHRvTWF0NEZyb21RdWF0KG1hdCwgdGhpcy5xdWF0ZXJuaW9uKTtcbiAgfVxufVxuXG4vLyBAdHMtaWdub3JlXG5jb25zdCBHeXJvc2NvcGUgPSB3aW5kb3cuR3lyb3Njb3BlIHx8XG5jbGFzcyBHeXJvc2NvcGUgZXh0ZW5kcyBEZXZpY2VPcmllbnRhdGlvbk1peGluKFNlbnNvciwgXCJkZXZpY2Vtb3Rpb25cIikge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpc1tzbG90XS5oYW5kbGVFdmVudCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHNlbnNvciB3ZSB3aWxsIGdldCB2YWx1ZXMgZXF1YWwgdG8gbnVsbC5cbiAgICAgIGlmIChldmVudC5yb3RhdGlvblJhdGUuYWxwaGEgPT09IG51bGwpIHtcbiAgICAgICAgdGhpc1tzbG90XS5ub3RpZnlFcnJvcihcIkNvdWxkIG5vdCBjb25uZWN0IHRvIGEgc2Vuc29yXCIsIFwiTm90UmVhZGFibGVFcnJvclwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXNbc2xvdF0uYWN0aXZhdGVkKSB7XG4gICAgICAgIHRoaXNbc2xvdF0ubm90aWZ5QWN0aXZhdGVkU3RhdGUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tzbG90XS50aW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgdGhpc1tzbG90XS54ID0gZXZlbnQucm90YXRpb25SYXRlLmFscGhhO1xuICAgICAgdGhpc1tzbG90XS55ID0gZXZlbnQucm90YXRpb25SYXRlLmJldGE7XG4gICAgICB0aGlzW3Nsb3RdLnogPSBldmVudC5yb3RhdGlvblJhdGUuZ2FtbWE7XG5cbiAgICAgIHRoaXNbc2xvdF0uaGFzUmVhZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVhZGluZ1wiKSk7XG4gICAgfVxuXG4gICAgZGVmaW5lUmVhZG9ubHlQcm9wZXJ0aWVzKHRoaXMsIHNsb3QsIHtcbiAgICAgIHg6IG51bGwsXG4gICAgICB5OiBudWxsLFxuICAgICAgejogbnVsbFxuICAgIH0pO1xuXG4gICAgdGhpc1tzbG90XS5kZWFjdGl2YXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzW3Nsb3RdLnggPSBudWxsO1xuICAgICAgdGhpc1tzbG90XS55ID0gbnVsbDtcbiAgICAgIHRoaXNbc2xvdF0ueiA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IEFjY2VsZXJvbWV0ZXIgPSB3aW5kb3cuQWNjZWxlcm9tZXRlciB8fFxuY2xhc3MgQWNjZWxlcm9tZXRlciBleHRlbmRzIERldmljZU9yaWVudGF0aW9uTWl4aW4oU2Vuc29yLCBcImRldmljZW1vdGlvblwiKSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzW3Nsb3RdLmhhbmRsZUV2ZW50ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2Vuc29yIHdlIHdpbGwgZ2V0IHZhbHVlcyBlcXVhbCB0byBudWxsLlxuICAgICAgaWYgKGV2ZW50LmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUVycm9yKFwiQ291bGQgbm90IGNvbm5lY3QgdG8gYSBzZW5zb3JcIiwgXCJOb3RSZWFkYWJsZUVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpc1tzbG90XS5hY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpc1tzbG90XS5ub3RpZnlBY3RpdmF0ZWRTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzW3Nsb3RdLnRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgICB0aGlzW3Nsb3RdLnggPSBldmVudC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XG4gICAgICB0aGlzW3Nsb3RdLnkgPSBldmVudC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XG4gICAgICB0aGlzW3Nsb3RdLnogPSBldmVudC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XG5cbiAgICAgIHRoaXNbc2xvdF0uaGFzUmVhZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVhZGluZ1wiKSk7XG4gICAgfVxuXG4gICAgZGVmaW5lUmVhZG9ubHlQcm9wZXJ0aWVzKHRoaXMsIHNsb3QsIHtcbiAgICAgIHg6IG51bGwsXG4gICAgICB5OiBudWxsLFxuICAgICAgejogbnVsbFxuICAgIH0pO1xuXG4gICAgdGhpc1tzbG90XS5kZWFjdGl2YXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzW3Nsb3RdLnggPSBudWxsO1xuICAgICAgdGhpc1tzbG90XS55ID0gbnVsbDtcbiAgICAgIHRoaXNbc2xvdF0ueiA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IExpbmVhckFjY2VsZXJhdGlvblNlbnNvciA9IHdpbmRvdy5MaW5lYXJBY2NlbGVyYXRpb25TZW5zb3IgfHxcbmNsYXNzIExpbmVhckFjY2VsZXJhdGlvblNlbnNvciBleHRlbmRzIERldmljZU9yaWVudGF0aW9uTWl4aW4oU2Vuc29yLCBcImRldmljZW1vdGlvblwiKSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzW3Nsb3RdLmhhbmRsZUV2ZW50ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2Vuc29yIHdlIHdpbGwgZ2V0IHZhbHVlcyBlcXVhbCB0byBudWxsLlxuICAgICAgaWYgKGV2ZW50LmFjY2VsZXJhdGlvbi54ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXNbc2xvdF0ubm90aWZ5RXJyb3IoXCJDb3VsZCBub3QgY29ubmVjdCB0byBhIHNlbnNvclwiLCBcIk5vdFJlYWRhYmxlRXJyb3JcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzW3Nsb3RdLmFjdGl2YXRlZCkge1xuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUFjdGl2YXRlZFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXNbc2xvdF0udGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAgIHRoaXNbc2xvdF0ueCA9IGV2ZW50LmFjY2VsZXJhdGlvbi54O1xuICAgICAgdGhpc1tzbG90XS55ID0gZXZlbnQuYWNjZWxlcmF0aW9uLnk7XG4gICAgICB0aGlzW3Nsb3RdLnogPSBldmVudC5hY2NlbGVyYXRpb24uejtcblxuICAgICAgdGhpc1tzbG90XS5oYXNSZWFkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJyZWFkaW5nXCIpKTtcbiAgICB9XG5cbiAgICBkZWZpbmVSZWFkb25seVByb3BlcnRpZXModGhpcywgc2xvdCwge1xuICAgICAgeDogbnVsbCxcbiAgICAgIHk6IG51bGwsXG4gICAgICB6OiBudWxsXG4gICAgfSk7XG5cbiAgICB0aGlzW3Nsb3RdLmRlYWN0aXZhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHRoaXNbc2xvdF0ueCA9IG51bGw7XG4gICAgICB0aGlzW3Nsb3RdLnkgPSBudWxsO1xuICAgICAgdGhpc1tzbG90XS56ID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuLy8gQHRzLWlnbm9yZVxuY29uc3QgR3Jhdml0eVNlbnNvciA9IHdpbmRvdy5HcmF2aXR5U2Vuc29yIHx8XG4gY2xhc3MgR3Jhdml0eVNlbnNvciBleHRlbmRzIERldmljZU9yaWVudGF0aW9uTWl4aW4oU2Vuc29yLCBcImRldmljZW1vdGlvblwiKSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzW3Nsb3RdLmhhbmRsZUV2ZW50ID0gZXZlbnQgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2Vuc29yIHdlIHdpbGwgZ2V0IHZhbHVlcyBlcXVhbCB0byBudWxsLlxuICAgICAgaWYgKGV2ZW50LmFjY2VsZXJhdGlvbi54ID09PSBudWxsIHx8IGV2ZW50LmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzW3Nsb3RdLm5vdGlmeUVycm9yKFwiQ291bGQgbm90IGNvbm5lY3QgdG8gYSBzZW5zb3JcIiwgXCJOb3RSZWFkYWJsZUVycm9yXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpc1tzbG90XS5hY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpc1tzbG90XS5ub3RpZnlBY3RpdmF0ZWRTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzW3Nsb3RdLnRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgICB0aGlzW3Nsb3RdLnggPSBldmVudC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnggLSBldmVudC5hY2NlbGVyYXRpb24ueDtcbiAgICAgIHRoaXNbc2xvdF0ueSA9IGV2ZW50LmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueSAtIGV2ZW50LmFjY2VsZXJhdGlvbi55O1xuICAgICAgdGhpc1tzbG90XS56ID0gZXZlbnQuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56IC0gZXZlbnQuYWNjZWxlcmF0aW9uLno7XG5cbiAgICAgIHRoaXNbc2xvdF0uaGFzUmVhZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVhZGluZ1wiKSk7XG4gICAgfVxuXG4gICAgZGVmaW5lUmVhZG9ubHlQcm9wZXJ0aWVzKHRoaXMsIHNsb3QsIHtcbiAgICAgIHg6IG51bGwsXG4gICAgICB5OiBudWxsLFxuICAgICAgejogbnVsbFxuICAgIH0pO1xuXG4gICAgdGhpc1tzbG90XS5kZWFjdGl2YXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzW3Nsb3RdLnggPSBudWxsO1xuICAgICAgdGhpc1tzbG90XS55ID0gbnVsbDtcbiAgICAgIHRoaXNbc2xvdF0ueiA9IG51bGw7XG4gICAgfVxuICB9XG59IiwiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIHxkb2NuYW1lfCAtIEJhc2UgU2Vuc29yIHBvbHlmaWxsXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gVGhlIGBnZW9sb2NhdGlvbi1zZW5zb3IuanNgIGFuZCBgbW90aW9uLXNlbnNvcnMuanNgIGZpbGVzIGRlcGVuZCBvbiB0aGlzLlxuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gQHRzLWNoZWNrXG5jb25zdCBfX3NlbnNvcl9fID0gU3ltYm9sKFwiX19zZW5zb3JfX1wiKTtcblxuY29uc3Qgc2xvdCA9IF9fc2Vuc29yX187XG5cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdGlvbnMpIHtcbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkZXNjcmlwdGlvbnMpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGRlc2NyaXB0aW9uc1twcm9wZXJ0eV1cbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBFdmVudFRhcmdldE1peGluID0gKHN1cGVyY2xhc3MsIC4uLmV2ZW50TmFtZXMpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgc3VwZXIoYXJncyk7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIgPSAodHlwZSwgLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCA9IChldmVudCkgPT4ge1xuICAgICAgZGVmaW5lUHJvcGVydGllcyhldmVudCwgeyBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgaWYgKCFldmVudC50YXJnZXQpIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydGllcyhldmVudCwgeyB0YXJnZXQ6IHRoaXMgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBgb24ke2V2ZW50LnR5cGV9YDtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttZXRob2ROYW1lXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmV0VmFsdWUgPSBldmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgICAgaWYgKHJldFZhbHVlICYmIHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGRlZmluZVByb3BlcnRpZXMoZXZlbnQsIHsgY3VycmVudFRhcmdldDogbnVsbCwgdGFyZ2V0OiBudWxsIH0pO1xuXG4gICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBFdmVudFRhcmdldCBleHRlbmRzIEV2ZW50VGFyZ2V0TWl4aW4oT2JqZWN0KSB7fTtcblxuZnVuY3Rpb24gZGVmaW5lUmVhZG9ubHlQcm9wZXJ0aWVzKHRhcmdldCwgc2xvdCwgZGVzY3JpcHRpb25zKSB7XG4gIGNvbnN0IHByb3BlcnR5QmFnID0gdGFyZ2V0W3Nsb3RdO1xuICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRlc2NyaXB0aW9ucykge1xuICAgIHByb3BlcnR5QmFnW3Byb3BlcnR5XSA9IGRlc2NyaXB0aW9uc1twcm9wZXJ0eV07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgIGdldDogKCkgPT4gcHJvcGVydHlCYWdbcHJvcGVydHldXG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgU2Vuc29yRXJyb3JFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IodHlwZSwgZXJyb3JFdmVudEluaXREaWN0KSB7XG4gICAgc3VwZXIodHlwZSwgZXJyb3JFdmVudEluaXREaWN0KTtcblxuICAgIGlmICghZXJyb3JFdmVudEluaXREaWN0IHx8ICEoZXJyb3JFdmVudEluaXREaWN0LmVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1NlbnNvckVycm9yRXZlbnQnOlwiICtcbiAgICAgICAgXCIybmQgYXJndW1lbnQgbXVjaCBjb250YWluICdlcnJvcicgcHJvcGVydHlcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJlcnJvclwiLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGVycm9yRXZlbnRJbml0RGljdC5lcnJvclxuICAgIH0pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZWZpbmVPbkV2ZW50TGlzdGVuZXIodGFyZ2V0LCBuYW1lKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGBvbiR7bmFtZX1gLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBudWxsXG4gIH0pO1xufVxuXG5jb25zdCBTZW5zb3JTdGF0ZSA9IHtcbiAgSURMRTogMSxcbiAgQUNUSVZBVElORzogMixcbiAgQUNUSVZFOiAzLFxufVxuXG5jbGFzcyBTZW5zb3IgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXNbc2xvdF0gPSBuZXcgV2Vha01hcDtcblxuICAgIGRlZmluZU9uRXZlbnRMaXN0ZW5lcih0aGlzLCBcInJlYWRpbmdcIik7XG4gICAgZGVmaW5lT25FdmVudExpc3RlbmVyKHRoaXMsIFwiYWN0aXZhdGVcIik7XG4gICAgZGVmaW5lT25FdmVudExpc3RlbmVyKHRoaXMsIFwiZXJyb3JcIik7XG5cbiAgICBkZWZpbmVSZWFkb25seVByb3BlcnRpZXModGhpcywgc2xvdCwge1xuICAgICAgYWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc1JlYWRpbmc6IGZhbHNlLFxuICAgICAgdGltZXN0YW1wOiBudWxsXG4gICAgfSlcblxuICAgIHRoaXNbc2xvdF0uc3RhdGUgPSBTZW5zb3JTdGF0ZS5JRExFO1xuXG4gICAgdGhpc1tzbG90XS5ub3RpZnlFcnJvciA9IChtZXNzYWdlLCBuYW1lKSA9PiB7XG4gICAgICBsZXQgZXJyb3IgPSBuZXcgU2Vuc29yRXJyb3JFdmVudChcImVycm9yXCIsIHtcbiAgICAgICAgZXJyb3I6IG5ldyBET01FeGNlcHRpb24obWVzc2FnZSwgbmFtZSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGVycm9yKTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cblxuICAgIHRoaXNbc2xvdF0ubm90aWZ5QWN0aXZhdGVkU3RhdGUgPSAoKSA9PiB7XG4gICAgICBsZXQgYWN0aXZhdGUgPSBuZXcgRXZlbnQoXCJhY3RpdmF0ZVwiKTtcbiAgICAgIHRoaXNbc2xvdF0uYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChhY3RpdmF0ZSk7XG4gICAgICB0aGlzW3Nsb3RdLnN0YXRlID0gU2Vuc29yU3RhdGUuQUNUSVZFO1xuICAgIH1cblxuICAgIHRoaXNbc2xvdF0uYWN0aXZhdGVDYWxsYmFjayA9ICgpID0+IHt9O1xuICAgIHRoaXNbc2xvdF0uZGVhY3RpdmF0ZUNhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgICB0aGlzW3Nsb3RdLmZyZXF1ZW5jeSA9IG51bGw7XG5cbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5wYXJlbnQgIT0gd2luZG93LnRvcCkge1xuICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIk9ubHkgaW5zdGFudGlhYmxlIGluIGEgdG9wLWxldmVsIGJyb3dzaW5nIGNvbnRleHRcIiwgXCJTZWN1cml0eUVycm9yXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zICYmIHR5cGVvZihvcHRpb25zLmZyZXF1ZW5jeSkgPT0gXCJudW1iZXJcIikge1xuICAgICAgaWYgKG9wdGlvbnMuZnJlcXVlbmN5ID4gNjApIHtcbiAgICAgICAgdGhpcy5mcmVxdWVuY3kgPSBvcHRpb25zLmZyZXF1ZW5jeTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAodGhpc1tzbG90XS5zdGF0ZSA9PT0gU2Vuc29yU3RhdGUuQUNUSVZBVElORyB8fCB0aGlzW3Nsb3RdLnN0YXRlID09PSBTZW5zb3JTdGF0ZS5BQ1RJVkUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpc1tzbG90XS5zdGF0ZSA9IFNlbnNvclN0YXRlLkFDVElWQVRJTkc7XG4gICAgdGhpc1tzbG90XS5hY3RpdmF0ZUNhbGxiYWNrKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzW3Nsb3RdLnN0YXRlID09PSBTZW5zb3JTdGF0ZS5JRExFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXNbc2xvdF0uYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgdGhpc1tzbG90XS5oYXNSZWFkaW5nID0gZmFsc2U7XG4gICAgdGhpc1tzbG90XS50aW1lc3RhbXAgPSBudWxsO1xuICAgIHRoaXNbc2xvdF0uZGVhY3RpdmF0ZUNhbGxiYWNrKCk7XG5cbiAgICB0aGlzW3Nsb3RdLnN0YXRlID0gU2Vuc29yU3RhdGUuSURMRTtcbiAgfVxufSIsIi8vIC4uIENvcHlyaWdodCAoQykgMjAxMi0yMDIwIEJyeWFuIEEuIEpvbmVzLlxuLy9cbi8vICBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQ2VsbEJvdGljcyBzeXN0ZW0uXG4vL1xuLy8gIFRoZSBDZWxsQm90aWNzIHN5c3RlbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3Jcbi8vICBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxuLy8gIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gIFRoZSBDZWxsQm90aWNzIHN5c3RlbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmVcbi8vICB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5XG4vLyAgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZSBHTlVcbi8vICBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyAgYWxvbmcgd2l0aCB0aGUgQ2VsbEJvdGljcyBzeXN0ZW0uICBJZiBub3QsIHNlZVxuLy8gIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyB8ZG9jbmFtZXwgLSBJbnRlcmZhY2Ugd2l0aCBzZW5zb3JzXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBUaGlzIHByb3ZpZGVzIGNvZGUgdG8gYWNjZXNzIGBzZW5zb3IgQVBJcyA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NlbnNvcl9BUElzPmBfLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBcIi4vcGVybWlzc2lvbnNfcG9seWZpbGwuanNcIjtcbmltcG9ydCBcIi4vc2Vuc29yX3BvbHlmaWxsL2dlb2xvY2F0aW9uLXNlbnNvci5qc1wiO1xuaW1wb3J0IFwiLi9zZW5zb3JfcG9seWZpbGwvbW90aW9uLXNlbnNvcnMuanNcIjtcbmltcG9ydCB7IGF1dG9fYmluZCB9IGZyb20gXCIuL2F1dG8tYmluZC5qc1wiO1xuXG4vLyBTaW1wbGVTZW5zb3Jcbi8vID09PT09PT09PT09PVxuLy8gVGhpcyBjbGFzcyB3cmFwcyBhIGBTZW5zb3IgPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TZW5zb3I+YF8gd2l0aCBzaW1wbGUgYGBzdGFydGBgLCBgYHJlYWR5YGAsIGFuZCBgYHN0b3BgYCBmdW5jdGlvbnMuXG5jbGFzcyBTaW1wbGVTZW5zb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvX2JpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZW5zb3IgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFRoaXMgd2FzIGluaXRpYWxseSBiYXNlZCBvbiB0aGUgTUROIFNlbnNvciBBUEkgZG9jcy5cbiAgICBhc3luYyBzdGFydChcbiAgICAgICAgLy8gVGhlIGNsYXNzIHRvIHVzZSBmb3IgdGhlIHNlbnNvciB0byBzdGFydC4gSXQgbXVzdCBiZSBiYXNlZCBvbiB0aGUgU2Vuc29yIGludGVyZmFjZS5cbiAgICAgICAgc2Vuc29yX2NsYXNzLFxuICAgICAgICAvLyBBbiBhcnJheSBvZiBzdHJpbmdzLCBnaXZpbmcgdGhlIG5hbWUgb2YgdGhlIEFQSSB0byBhc2sgcGVybWlzc2lvbnMgb2YgZm9yIHRoaXMgc2Vuc29yLiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1Blcm1pc3Npb25zL3F1ZXJ5LlxuICAgICAgICBzZW5zb3JfcGVybWlzc2lvbixcbiAgICAgICAgLy8gT3B0aW9ucyB0byBwYXNzIHRvIHRoaXMgc2Vuc29yJ3MgY29uc3RydWN0b3IuXG4gICAgICAgIHNlbnNvcl9vcHRpb25zXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbnNvcikge1xuICAgICAgICAgICAgdGhyb3cgXCJJbiB1c2UuIFN0b3AgdGhlIHNlbnNvciBiZWZvcmUgc3RhcnRpbmcgYW5vdGhlci5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNlbnNvcl9jbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBcIk5vdCBhdmFpbGFibGUuXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgcGVybWlzc2lvbiB0byB1c2UgdGhlc2Ugc2Vuc29ycywgaWYgdGhlIEFQSSBpcyBzdXBwb3J0ZWQuXG4gICAgICAgIGlmIChuYXZpZ2F0b3IucGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChzZW5zb3JfcGVybWlzc2lvbi5tYXAoeCA9PiBuYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkoeyBuYW1lOiB4IH0pKSk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5ldmVyeSh2YWwgPT4gdmFsLnN0YXRlID09PSBcImdyYW50ZWRcIikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBgUGVybWlzc2lvbiB0byB1c2UgdGhlICR7c2Vuc29yX3Blcm1pc3Npb259IHNlbnNvciB3YXMgZGVuaWVkLmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUbyBhY2Nlc3MgYSBzZW5zb3I6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICMuICAgQ3JlYXRlIGl0LCB0aGVuIHN0YXJ0IGl0LCBzeW5jaHJvbm91c2x5IGNoZWNraW5nIGZvciBlcnJvcnMgaW4gdGhpcyBwcm9jZXNzLlxuICAgICAgICAvLyAjLiAgIEF3YWl0IGZvciBhIHJlc3BvbnNlIGZyb20gdGhlIHNlbnNvcjogYW4gYWNjZXB0YW5jZSBpbmRpY2F0aW5nIHRoZSBzZW5zb3Igd29ya3MsIG9yIGEgcmVqZWN0aW9uIGluZGljYXRpbmcgYSBmYWlsdXJlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSB0aGUgZXZlbnQgaGFuZGxlcnMgdG8gYWNjZXB0IG9yIHJlamVjdCB0aGUgcHJvbWlzZSBtdXN0IGJlIHNldCB1cCBpbiB0aGUgc3luY2hyb25vdXMgcGhhc2UsIHdyYXAgZXZlcnl0aGluZyBpbiBhIHByb21pc2UuIEFsbCB0aGUgb3BlcmF0aW9ucyBhYm92ZSB0aGVyZWZvcmUgc3RhcnQgd2hlbiB0aGUgcHJvbWlzZSBpcyBhd2FpdGVkLlxuICAgICAgICB0aGlzLnNlbnNvciA9IG51bGw7XG4gICAgICAgIGxldCBvbl9lcnJvcjtcbiAgICAgICAgbGV0IG9uX3JlYWRpbmc7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnNvciA9IG5ldyBzZW5zb3JfY2xhc3Moc2Vuc29yX29wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGNhbGxiYWNrIGVycm9ycyBieSByZWplY3RpbmcgdGhlIHByb21pc2UuXG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIG9uX2Vycm9yID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbnNvci5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgb25fZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgcnVudGltZSBlcnJvcnMuXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5lcnJvci5uYW1lID09PSAnTm90QWxsb3dlZEVycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiQWNjZXNzIHRvIHRoaXMgc2Vuc29yIGlzIG5vdCBhbGxvd2VkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5lcnJvci5uYW1lID09PSAnTm90UmVhZGFibGVFcnJvcicgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0Nhbm5vdCBjb25uZWN0IHRvIHRoZSBzZW5zb3IuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGBVbmtub3duIGVycm9yOiAke2V2ZW50LmVycm9yLm5hbWV9YCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5zb3IuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbl9lcnJvcik7XG5cbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciB0aGUgZmlyc3Qgc2Vuc29yIHJlYWRpbmcgdG8gYWNjZXB0IHRoZSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIG9uX3JlYWRpbmcgPSBldmVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZW5zb3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlYWRpbmdcIiwgb25fcmVhZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5zb3IuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWRpbmdcIiwgb25fcmVhZGluZyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbnNvci5zdGFydCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY29uc3RydWN0aW9uIGVycm9ycy5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZSB0aGUgbm90ZSBhYm92ZSBhYm91dCBmZWF0dXJlIHBvbGljeS5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiU2Vuc29yIGNvbnN0cnVjdGlvbiB3YXMgYmxvY2tlZCBieSBhIGZlYXR1cmUgcG9saWN5LlwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLm5hbWUgPT09ICdSZWZlcmVuY2VFcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiU2Vuc29yIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIFVzZXIgQWdlbnQuXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdGFydCB0aGUgc2Vuc29yLCB3YWl0aW5nIHVudGlsIGl0IHByb2R1Y2VzIGEgcmVhZGluZyBvciBhbiBlcnJvci5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBd2FpdCAke25ldyBEYXRlKCl9YCk7XG4gICAgICAgICAgICBhd2FpdCBwO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERvbmUgJHtuZXcgRGF0ZSgpfWApO1xuICAgICAgICAgICAgdGhpcy5zZW5zb3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIG9uX2Vycm9yKTtcbiAgICAgICAgICAgIHRoaXMuc2Vuc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZWFkaW5nXCIsIG9uX3JlYWRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJ1ZSBpZiB0aGUgc2Vuc29yIGlzIGFjdGl2YXRlZCBhbmQgaGFzIGEgcmVhZGluZy5cbiAgICBnZXQgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvciAmJiB0aGlzLnNlbnNvci5hY3RpdmF0ZWQgJiYgdGhpcy5zZW5zb3IuaGFzUmVhZGluZztcbiAgICB9XG5cbiAgICAvLyBUbyBzYXZlIGRldmljZSBwb3dlciwgYmUgc3VyZSB0byBzdG9wIHRoZSBzZW5zb3IgYXMgc29vbiBhcyB0aGUgcmVhZGluZ3MgYXJlIG5vIGxvbmdlciBuZWVkZWQuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5zZW5zb3IgJiYgdGhpcy5zZW5zb3Iuc3RvcCgpO1xuICAgICAgICB0aGlzLnNlbnNvciA9IG51bGw7XG4gICAgfVxufVxuXG5cbi8vIEFic3RyYWN0IGhlbHBlciBjbGFzc2VzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2V2ZXJhbCBzZW5zb3JzIHJldHVybiB4LCB5LCBhbmQgeiB2YWx1ZXMuIENvbGxlY3QgdGhlIGNvbW1vbiBjb2RlIGhlcmUuXG5jbGFzcyBTaW1wbGVYWVpTZW5zb3IgZXh0ZW5kcyBTaW1wbGVTZW5zb3Ige1xuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3IueDtcbiAgICB9XG5cbiAgICBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yLnk7XG4gICAgfVxuXG4gICAgZ2V0IHooKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvci56O1xuICAgIH1cbn1cblxuXG4vLyBUd28gc2Vuc29ycyByZXR1cm4gYSBxdWF0ZXJuaW9uIG9yIHJvdGF0aW9uIG1hdHJpeC5cbmNsYXNzIFNpbXBsZU9yaWVudGF0aW9uU2Vuc29yIGV4dGVuZHMgU2ltcGxlU2Vuc29yIHtcbiAgICBnZXQgcXVhdGVybmlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yLnF1YXRlcm5pb247XG4gICAgfVxuXG4gICAgcG9wdWxhdGVNYXRyaXgodGFyZ2V0TWF0cml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvci5wb3B1bGF0ZU1hdHJpeCh0YXJnZXRNYXRyaXgpO1xuICAgIH1cbn1cblxuXG4vLyBDb25jcmV0ZSBjbGFzc2VzXG4vLyA9PT09PT09PT09PT09PT09XG4vLyBOb3RlIHRoZSB1c2Ugb2YgYGB3aW5kb3cuU2Vuc29yTmFtZWBgIGluc3RlYWQgb2YgYGBTZW5zb3JOYW1lYGAgZm9yIG5vbi1wb2x5ZmlsbHMuIFRoaXMgYXZvaWRzIGV4Y2VwdGlvbnMgaWYgdGhlIHBhcnRpY3VsYXIgc2Vuc29yIGlzbid0IGRlZmluZWQsIHByb2R1Y2luZyBhbiBgYHVuZGVmaW5lZGBgIGluc3RlYWQuIEZvciBwb2x5ZmlsbHMsIHdlIG11c3QgdXNlIGBgU2Vuc29yTmFtZWBgIGluc3RlYWQgb2YgYGB3aW5kb3cuU2Vuc29yTmFtZWBgLlxuZXhwb3J0IGNsYXNzIFNpbXBsZUFtYmllbnRMaWdodFNlbnNvciBleHRlbmRzIFNpbXBsZVNlbnNvciB7XG4gICAgYXN5bmMgc3RhcnQoYWxzX29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KHdpbmRvdy5BbWJpZW50TGlnaHRTZW5zb3IsIFtcImFtYmllbnQtbGlnaHQtc2Vuc29yXCJdLCBhbHNfb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2V0IGlsbHVtaW5hbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3IuaWxsdW1pbmFuY2U7XG4gICAgfVxufVxuXG5cbi8vIFNlZSB0aGUgYFczQyBkcmFmdCBzcGVjIDxodHRwczovL3czYy5naXRodWIuaW8vZ2VvbG9jYXRpb24tc2Vuc29yLyNnZW9sb2NhdGlvbnNlbnNvci1pbnRlcmZhY2U+YF8uXG5leHBvcnQgY2xhc3MgU2ltcGxlR2VvbG9jYXRpb25TZW5zb3IgZXh0ZW5kcyBTaW1wbGVTZW5zb3Ige1xuICAgIGFzeW5jIHN0YXJ0KGdlb19vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydChHZW9sb2NhdGlvblNlbnNvciwgW1wiZ2VvbG9jYXRpb25cIl0sIGdlb19vcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXQgbGF0aXR1ZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvci5sYXRpdHVkZTtcbiAgICB9XG5cbiAgICBnZXQgbG9uZ2l0dWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3IubG9uZ2l0dWRlO1xuICAgIH1cblxuICAgIGdldCBhbHRpdHVkZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yLmFsdGl0dWRlO1xuICAgIH1cblxuICAgIGdldCBhY2N1cmFjeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yLmFjY3VyYWN5O1xuICAgIH1cblxuICAgIGdldCBhbHRpdHVkZUFjY3VyYWN5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3IuYWx0aXR1ZGVBY2N1cmFjeTtcbiAgICB9XG5cbiAgICBnZXQgaGVhZGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yLmhlYWRpbmc7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3Iuc3BlZWQ7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVBY2NlbGVyb21ldGVyIGV4dGVuZHMgU2ltcGxlWFlaU2Vuc29yIHtcbiAgICBhc3luYyBzdGFydChhY2NlbGVyb21ldGVyX29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KEFjY2VsZXJvbWV0ZXIsIFtcImFjY2VsZXJvbWV0ZXJcIl0sIGFjY2VsZXJvbWV0ZXJfb3B0aW9ucyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVHeXJvc2NvcGUgZXh0ZW5kcyBTaW1wbGVYWVpTZW5zb3Ige1xuICAgIGFzeW5jIHN0YXJ0KGd5cm9fb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhcnQoR3lyb3Njb3BlLCBbXCJneXJvc2NvcGVcIl0sIGd5cm9fb3B0aW9ucyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVMaW5lYXJBY2NlbGVyYXRpb25TZW5zb3IgZXh0ZW5kcyBTaW1wbGVYWVpTZW5zb3Ige1xuICAgIGFzeW5jIHN0YXJ0KGFjY2VsX29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KExpbmVhckFjY2VsZXJhdGlvblNlbnNvciwgW1wiYWNjZWxlcm9tZXRlclwiXSwgYWNjZWxfb3B0aW9ucyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVHcmF2aXR5U2Vuc29yIGV4dGVuZHMgU2ltcGxlWFlaU2Vuc29yIHtcbiAgICBhc3luYyBzdGFydChncmF2X29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KEdyYXZpdHlTZW5zb3IsIFtcImFjY2VsZXJvbWV0ZXJcIl0sIGdyYXZfb3B0aW9ucyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVNYWduZXRvbWV0ZXIgZXh0ZW5kcyBTaW1wbGVYWVpTZW5zb3Ige1xuICAgIGFzeW5jIHN0YXJ0KG1hZ19vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydCh3aW5kb3cuTWFnbmV0b21ldGVyLCBbXCJtYWduZXRvbWV0ZXJcIl0sIG1hZ19vcHRpb25zKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFNpbXBsZUFic29sdXRlT3JpZW50YXRpb25TZW5zb3IgZXh0ZW5kcyBTaW1wbGVPcmllbnRhdGlvblNlbnNvciB7XG4gICAgYXN5bmMgc3RhcnQob3JpZW50X29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KEFic29sdXRlT3JpZW50YXRpb25TZW5zb3IsIFtcImFjY2VsZXJvbWV0ZXJcIiwgXCJneXJvc2NvcGVcIiwgXCJtYWduZXRvbWV0ZXJcIl0sIG9yaWVudF9vcHRpb25zKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFNpbXBsZVJlbGF0aXZlT3JpZW50YXRpb25TZW5zb3IgZXh0ZW5kcyBTaW1wbGVPcmllbnRhdGlvblNlbnNvciB7XG4gICAgYXN5bmMgc3RhcnQob3JpZW50X29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KFJlbGF0aXZlT3JpZW50YXRpb25TZW5zb3IsIFtcImFjY2VsZXJvbWV0ZXJcIiwgXCJneXJvc2NvcGVcIl0sIG9yaWVudF9vcHRpb25zKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=