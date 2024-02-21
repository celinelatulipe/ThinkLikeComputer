"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_cellbotics_js_ble_js"],{

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

/***/ 14818:
/*!****************************************!*\
  !*** ./runestone/cellbotics/js/ble.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cell_bot_ble_gui": () => (/* binding */ cell_bot_ble_gui)
/* harmony export */ });
/* harmony import */ var _auto_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auto-bind.js */ 34630);
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
// *************************************************************
// |docname| - JavaScript code to connect with a CellBot via BLE
// *************************************************************





// CellBotBle
// ==========
// This sends and receives data to the CellBot via Bluetooth.
class CellBotBle {
    constructor() {
        (0,_auto_bind_js__WEBPACK_IMPORTED_MODULE_0__.auto_bind)(this);

        this.clear_connection();
        // If true, the server (BLE device / CellBot) is little-endian; if false, big-endian.
        this.is_little_endian = true;
        // If true, expect verbose returns (the CellBot was compiled with ``VERBOSE_RETURN`` defined).
        this.verbose_return = true;
        // If true, return dummy values instead of talking to the hardware.
        this.is_sim = false;

        // #defines from Arduino headers.
        this.INPUT = 1;
        this.OUTPUT = 2;

        // UUIDs for each characteristic.
        this.uuid = {
            resetHardware: "60cb180e-838d-4f65-aff4-20b609b453f3",
            pinMode: "6ea6d9b6-7b7e-451c-ab45-221298e43562",
            digitalWrite: "d3423cf6-6da7-4dd8-a5ba-3c980c74bd6d",
            digitalRead: "c370bc79-11c1-4530-9f69-ab9d961aa497",
            ledcSetup: "6be57cea-3c46-4687-972b-03429d2acf9b",
            ledcAttachPin: "2cd63861-078f-436f-9ed9-79e57ec8b638",
            ledcDetachPin: "b9b0cabe-25d8-4965-9259-7d3b6330e940",
            ledcWrite: "40698030-a343-448f-a9ea-54b39b03bf81"
        };
    }

    // Clear Bluetooth connection-related objects.
    clear_connection() {
        this.server && this.server.disconnect();
        this.server = undefined;
        this.service = undefined;
        // A dict of name: ``BluetoothRemoteGATTCharacteristic``.
        this.characteristic = {};
    }

    // Return true if BLE is supported by this browser. Even if it is supported, it may not be available.
    is_ble_supported() {
        return Boolean(navigator.bluetooth);
    }

    // Return true is BLE is supported. If so, register the provided event handler.
    async has_ble(on_availability_changed) {
        if (this.is_sim) {
            return true;
        }

        if (this.is_ble_supported() && await navigator.bluetooth.getAvailability()) {
            navigator.bluetooth.addEventListener("availabilitychanged", on_availability_changed);
            return true;
        } else {
            return false;
        }
    }

    // Returns true if the Bluetooth device (server) is connected.
    paired() {
        return this.is_sim || (this.server && this.server.connected);
    }

    // Pair with a CellBot and return the characteristic used to control the device.
    async pair(disconnect_callback)
    {
        if (this.is_sim) {
            return;
        }

        // Skip connecting if we're already connected.
        if (this.paired()) {
            return;
        }

        // Shut down any remnants of a previous connection.
        this.clear_connection();

        // Request a device with service `UUIDs`. See the `Bluetooth API <https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth>`_.
        let cellBot_service = "6c533793-9bd6-47d6-8d3b-c10a704b6b97";
        this.device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [cellBot_service]
            }]
        });

        // Notify on a disconnect. I can't find any docs on this, but it does work.
        this.device.addEventListener('gattserverdisconnected', disconnect_callback);
        this.device.addEventListener('gattserverdisconnected', this.clear_connection);

        // Connect to its server.
        this.server = await this.device.gatt.connect();

        // Get the service for our server.
        this.service = await this.server.getPrimaryService(cellBot_service);
    }

    // Generic access function for calling a function on the Arduino. It returns (value returned after invoking the function, message).
    async invoke_Arduino(
        // The Bluetooth characteristic to use for this call.
        characteristic,
        // The number of bytes in the return value:
        //
        // -    0: void
        // -    +1/-1: unsigned/signed 8-bit value
        // -    +2/-2: unsigned/signed 16-bit value
        // -    +4/-4: unsigned/signed 32-bit value
        // -    0.4/0.8: 32-bit/64-bit float
        return_bytes,
        // An ArrayBuffer or compatible type of data containing encoded parameters to send.
        param_array
    ) {
        if (this.is_sim) {
            return [0, ""];
        }

        await characteristic.writeValue(param_array);
        // Read the returned data.
        let return_data = await characteristic.readValue();
        // Interpret the return value.
        let return_value;
        switch (return_bytes) {
            case 0:
            return_value = undefined;
            break;

            case 1:
            return_value = return_data.getUint8(0);
            break;

            case -1:
            return_value = return_data.getInt8(0);
            break;

            case 2:
            return_value = return_data.getUint16(0);
            break;

            case -2:
            return_value = return_data.getInt16(0, this.is_little_endian);
            break;

            case 4:
            return_value = return_data.getUint32(0, this.is_little_endian);
            break;

            case -4:
            return_value = return_data.getInt32(0, this.is_little_endian);
            break;

            case 0.4:
            return_value = return_data.getFloat32(0, this.is_little_endian);
            return_bytes = 4;
            break;

            case 0.8:
            return_value = return_data.getFloat64(0, this.is_little_endian);
            return_bytes = 8;
            break;

        }

        let message = return_data.buffer.slice(return_bytes);
        message = String.fromCharCode.apply(null, new Uint8Array(message));
        if (!this.verbose_return) {
            throw `BLE protocol error: ${message}`
        }
        return [return_value, message];
    }

    // Return an existing instance of a ``BluetoothRemoteGATTCharacteristic`` or create a new one.
    async get_characteristic(name) {
        if (this.is_sim) {
            return name;
        }

        if (name in this.characteristic) {
            return this.characteristic[name];
        }
        return this.characteristic[name] = await this.service.getCharacteristic(this.uuid[name]);
    }

    // Reset the hardware on the connected device.
    async resetHardware() {
        // Any write is fine -- just send 1 byte.
        return this.invoke_Arduino(await this.get_characteristic("resetHardware"), 0, new Uint8Array([1]));
    }

    // Invoke `pinMode <https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/>`_ on the Arduino.
    async pinMode(u8_pin, u8_mode) {
        return this.invoke_Arduino(await this.get_characteristic("pinMode"), 0, new Uint8Array([u8_pin, u8_mode]));
    }

    // Invoke `digitalWrite <https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/>`_ on the Arduino.
    async digitalWrite(u8_pin, u8_value) {
        return this.invoke_Arduino(await this.get_characteristic("digitalWrite"), 0, new Uint8Array([u8_pin, u8_value]));
    }

    // Invoke `digitalRead <https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/>`_ on the Arduino.
    async digitalRead(u8_pin) {
        return this.invoke_Arduino(await this.get_characteristic("digitalRead"), 1, new Uint8Array([u8_pin]));
    }

    // Invoke ``ledcSetup`` on the Arduino.
    //
    // Note that the LEDC control on the ESP32 Arduino port isn't documented. Here's my attempts. The best reference is the `LED_PWM chapter of the ESP32 Technical Reference Manual <https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf#page=384>`_. To set up PWM, you need to select:
    //
    // -    A channel (channels 0-7 auto-update new PWM periods, channels 8-15 don't).
    // -    The frequency to do the PWM, in Hz.
    // -    A number of bits used to do the PWM. The maximum possible value is floor(log2(processor clock frequency/PWM frequency)); this cannot exceed 20. The processor clock frequency is either 80 MHz or 1 MHz.
    //
    // The function returns the actual PWM frequency, due to the limitations of the available clock divisor.
    async ledcSetup(u8_channel, d_freq, u8_resolution_bits) {
        let param_array = new ArrayBuffer(11);
        let dv = new DataView(param_array);
        dv.setUint8(0, u8_channel);
        dv.setFloat64(1, d_freq, this.is_little_endian);
        dv.setUint8(10, u8_resolution_bits);
        return this.invoke_Arduino(await this.get_characteristic("ledcSetup"), 0.8, param_array);
    }

    // Invoke ``ledcAttachPin`` on the Arduino.
    //
    // Next, attach this channel to a specific pin on the Arduino.
    async ledcAttachPin(u8_pin, u8_channel) {
        return this.invoke_Arduino(await this.get_characteristic("ledcAttachPin"), 0, new Uint8Array([u8_pin, u8_channel]));
    }

    // Invoke ``ledcWrite`` on the Arduino.
    //
    // Finally, select a duty cycle for that channel, from 2^num_bits to 1.
    async ledcWrite(u8_channel, u32_duty) {
        let param_array = new ArrayBuffer(5);
        let dv = new DataView(param_array);
        dv.setUint8(0, u8_channel);
        dv.setUint32(1, u32_duty, this.is_little_endian);
        return this.invoke_Arduino(await this.get_characteristic("ledcWrite"), 0, param_array);
    }

    // Invoke ``ledcDetachPin`` on the Arduino.
    //
    // Next, attach this channel to a specific pin on the Arduino.
    async ledcDetachPin(u8_pin) {
        return this.invoke_Arduino(await this.get_characteristic("ledcDetachPin"), 0, new Uint8Array([u8_pin]));
    }
}


// CellBotBleGui
// =============
// Provide a simple pair/disconnect GUI for the CellBot Bluetooth connection.
class CellBotBleGui {
    constructor(pair_button_id, pair_status_id) {
        (0,_auto_bind_js__WEBPACK_IMPORTED_MODULE_0__.auto_bind)(this);

        this.ble_pair_button = document.getElementById(pair_button_id);
        this.ble_pair_status = document.getElementById(pair_status_id);

        // If the GUI isn't available, give up.
        if (!this.ble_pair_button || !this.ble_pair_status) {
            return;
        }

        this.cell_bot_ble = new CellBotBle();
        // Update the pair button based on BLE availability.
        this.cell_bot_ble.has_ble(this.on_availability_changed).then(this.on_ble_available);
        // Respond to button clicks.
        this.ble_pair_button.addEventListener("click", event => {
            this.async_on_pair_clicked();
        })
    }

    async async_on_pair_clicked() {
        if (!this.cell_bot_ble.paired()) {
            this.ble_pair_button.disabled = true;
            this.ble_pair_status.innerHTML = "Pairing...";
            try {
                await this.cell_bot_ble.pair(this.on_disconnect);
                this.ble_pair_status.innerHTML = `Paired to ${this.cell_bot_ble.device.name}.`;
                this.ble_pair_button.innerHTML = "Disconnect";

            } catch (err) {
                this.ble_pair_status.innerHTML = "Unable to pair.";
                throw err;
            } finally {
                this.ble_pair_button.disabled = false;
            }

        } else {
            this.cell_bot_ble.server.disconnect();
        }
    }

    on_availability_changed(event) {
        // TODO: I don't know what the structure of this event is.
        console.log(event);
    }

    on_ble_available(has_ble) {
        this.ble_pair_button.disabled = !has_ble;
        if (has_ble) {
            this.ble_pair_status.innerHTML = "Not connected.";
        } else {
            this.ble_pair_status.innerHTML = "Not available.";
        }
    }

    on_disconnect() {
        this.ble_pair_status.innerHTML = "Disconnected.";
        this.ble_pair_button.innerHTML = "Pair";
    }
}


// An instance of this class.
let cell_bot_ble_gui;

// Handler
// =======
// This must be invoked when the DOM is ready, before calling any other function in this file.
$(document).ready(function () {
    cell_bot_ble_gui = new CellBotBleGui("ble_pair_button", "ble_pair_status");
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2NlbGxib3RpY3NfanNfYmxlX2pzLmI3NmRkZjgzZmU0YTBhMGMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7O0FBR2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7O0FBR0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFOEI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFTOztBQUVqQjtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxSUFBcUk7QUFDckk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBUzs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELDhCQUE4QjtBQUM1Rjs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2NlbGxib3RpY3MvanMvYXV0by1iaW5kLmpzIiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvY2VsbGJvdGljcy9qcy9ibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLi4gQ29weXJpZ2h0IChDKSAyMDEyLTIwMjAgQnJ5YW4gQS4gSm9uZXMuXG4vL1xuLy8gIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBDZWxsQm90aWNzIHN5c3RlbS5cbi8vXG4vLyAgVGhlIENlbGxCb3RpY3Mgc3lzdGVtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuLy8gIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyAgcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXG4vLyAgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vXG4vLyAgVGhlIENlbGxCb3RpY3Mgc3lzdGVtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZVxuLy8gIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHlcbi8vICBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlIEdOVVxuLy8gIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbi8vXG4vLyAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2Vcbi8vICBhbG9uZyB3aXRoIHRoZSBDZWxsQm90aWNzIHN5c3RlbS4gIElmIG5vdCwgc2VlXG4vLyAgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gfGRvY25hbWV8IC0gQXV0b21hdGljYWxseSBiaW5kIG1ldGhvZHMgdG8gdGhlaXIgaW5zdGFuY2VzXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8gVGhlIGZvbGxvd2luZyB0d28gZnVuY3Rpb25zIHdlcmUgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2F1dG8tYmluZC9ibG9iL21hc3Rlci9pbmRleC5qcyBhbmQgbGlnaHRseSBtb2RpZmllZC4gVGhleSBwcm92aWRlIGFuIGVhc3kgd2F5IHRvIGJpbmQgYWxsIGNhbGxhYmxlIG1ldGhvZHMgdG8gdGhlaXIgaW5zdGFuY2UuIFNlZSBgQmluZGluZyBNZXRob2RzIHRvIENsYXNzIEluc3RhbmNlIE9iamVjdHMgPGh0dHBzOi8vcG9ueWZvby5jb20vYXJ0aWNsZXMvYmluZGluZy1tZXRob2RzLXRvLWNsYXNzLWluc3RhbmNlLW9iamVjdHM+YF8gZm9yIG1vcmUgZGlzY3Vzc2lvbiBvbiB0aGlzIGNyYXp5IEphdmFTY3JpcHQgbmVjZXNzaXR5LlxuLy9cbi8vIEdldHMgYWxsIG5vbi1idWlsdGluIHByb3BlcnRpZXMgdXAgdGhlIHByb3RvdHlwZSBjaGFpblxuY29uc3QgZ2V0QWxsUHJvcGVydGllcyA9IG9iamVjdCA9PiB7XG5cdGNvbnN0IHByb3BlcnRpZXMgPSBuZXcgU2V0KCk7XG5cblx0ZG8ge1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIFJlZmxlY3Qub3duS2V5cyhvYmplY3QpKSB7XG5cdFx0XHRwcm9wZXJ0aWVzLmFkZChbb2JqZWN0LCBrZXldKTtcblx0XHR9XG5cdH0gd2hpbGUgKChvYmplY3QgPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCkpICYmIG9iamVjdCAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cblx0cmV0dXJuIHByb3BlcnRpZXM7XG59O1xuXG5cbi8vIEludm9rZSB0aGlzIGluIHRoZSBjb25zdHJ1Y3RvciBvZiBhbiBvYmplY3QuXG5leHBvcnQgZnVuY3Rpb24gYXV0b19iaW5kKHNlbGYpIHtcbiAgICBmb3IgKGNvbnN0IFtvYmplY3QsIGtleV0gb2YgZ2V0QWxsUHJvcGVydGllcyhzZWxmLmNvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc2VsZltrZXldID0gc2VsZltrZXldLmJpbmQoc2VsZik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyAuLiBDb3B5cmlnaHQgKEMpIDIwMTItMjAyMCBCcnlhbiBBLiBKb25lcy5cbi8vXG4vLyAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIENlbGxCb3RpY3Mgc3lzdGVtLlxuLy9cbi8vICBUaGUgQ2VsbEJvdGljcyBzeXN0ZW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4vLyAgbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbi8vICBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vICBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuLy9cbi8vICBUaGUgQ2VsbEJvdGljcyBzeXN0ZW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlXG4vLyAgdXNlZnVsLCBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eVxuLy8gIG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGUgR05VXG4vLyAgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy9cbi8vICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuLy8gIGFsb25nIHdpdGggdGhlIENlbGxCb3RpY3Mgc3lzdGVtLiAgSWYgbm90LCBzZWVcbi8vICA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4vL1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gfGRvY25hbWV8IC0gSmF2YVNjcmlwdCBjb2RlIHRvIGNvbm5lY3Qgd2l0aCBhIENlbGxCb3QgdmlhIEJMRVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXV0b19iaW5kIH0gZnJvbSBcIi4vYXV0by1iaW5kLmpzXCI7XG5cbi8vIENlbGxCb3RCbGVcbi8vID09PT09PT09PT1cbi8vIFRoaXMgc2VuZHMgYW5kIHJlY2VpdmVzIGRhdGEgdG8gdGhlIENlbGxCb3QgdmlhIEJsdWV0b290aC5cbmNsYXNzIENlbGxCb3RCbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvX2JpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5jbGVhcl9jb25uZWN0aW9uKCk7XG4gICAgICAgIC8vIElmIHRydWUsIHRoZSBzZXJ2ZXIgKEJMRSBkZXZpY2UgLyBDZWxsQm90KSBpcyBsaXR0bGUtZW5kaWFuOyBpZiBmYWxzZSwgYmlnLWVuZGlhbi5cbiAgICAgICAgdGhpcy5pc19saXR0bGVfZW5kaWFuID0gdHJ1ZTtcbiAgICAgICAgLy8gSWYgdHJ1ZSwgZXhwZWN0IHZlcmJvc2UgcmV0dXJucyAodGhlIENlbGxCb3Qgd2FzIGNvbXBpbGVkIHdpdGggYGBWRVJCT1NFX1JFVFVSTmBgIGRlZmluZWQpLlxuICAgICAgICB0aGlzLnZlcmJvc2VfcmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgLy8gSWYgdHJ1ZSwgcmV0dXJuIGR1bW15IHZhbHVlcyBpbnN0ZWFkIG9mIHRhbGtpbmcgdG8gdGhlIGhhcmR3YXJlLlxuICAgICAgICB0aGlzLmlzX3NpbSA9IGZhbHNlO1xuXG4gICAgICAgIC8vICNkZWZpbmVzIGZyb20gQXJkdWlubyBoZWFkZXJzLlxuICAgICAgICB0aGlzLklOUFVUID0gMTtcbiAgICAgICAgdGhpcy5PVVRQVVQgPSAyO1xuXG4gICAgICAgIC8vIFVVSURzIGZvciBlYWNoIGNoYXJhY3RlcmlzdGljLlxuICAgICAgICB0aGlzLnV1aWQgPSB7XG4gICAgICAgICAgICByZXNldEhhcmR3YXJlOiBcIjYwY2IxODBlLTgzOGQtNGY2NS1hZmY0LTIwYjYwOWI0NTNmM1wiLFxuICAgICAgICAgICAgcGluTW9kZTogXCI2ZWE2ZDliNi03YjdlLTQ1MWMtYWI0NS0yMjEyOThlNDM1NjJcIixcbiAgICAgICAgICAgIGRpZ2l0YWxXcml0ZTogXCJkMzQyM2NmNi02ZGE3LTRkZDgtYTViYS0zYzk4MGM3NGJkNmRcIixcbiAgICAgICAgICAgIGRpZ2l0YWxSZWFkOiBcImMzNzBiYzc5LTExYzEtNDUzMC05ZjY5LWFiOWQ5NjFhYTQ5N1wiLFxuICAgICAgICAgICAgbGVkY1NldHVwOiBcIjZiZTU3Y2VhLTNjNDYtNDY4Ny05NzJiLTAzNDI5ZDJhY2Y5YlwiLFxuICAgICAgICAgICAgbGVkY0F0dGFjaFBpbjogXCIyY2Q2Mzg2MS0wNzhmLTQzNmYtOWVkOS03OWU1N2VjOGI2MzhcIixcbiAgICAgICAgICAgIGxlZGNEZXRhY2hQaW46IFwiYjliMGNhYmUtMjVkOC00OTY1LTkyNTktN2QzYjYzMzBlOTQwXCIsXG4gICAgICAgICAgICBsZWRjV3JpdGU6IFwiNDA2OTgwMzAtYTM0My00NDhmLWE5ZWEtNTRiMzliMDNiZjgxXCJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBDbGVhciBCbHVldG9vdGggY29ubmVjdGlvbi1yZWxhdGVkIG9iamVjdHMuXG4gICAgY2xlYXJfY29ubmVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgJiYgdGhpcy5zZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnNlcnZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBBIGRpY3Qgb2YgbmFtZTogYGBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWNgYC5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJpc3RpYyA9IHt9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0cnVlIGlmIEJMRSBpcyBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLiBFdmVuIGlmIGl0IGlzIHN1cHBvcnRlZCwgaXQgbWF5IG5vdCBiZSBhdmFpbGFibGUuXG4gICAgaXNfYmxlX3N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4obmF2aWdhdG9yLmJsdWV0b290aCk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaXMgQkxFIGlzIHN1cHBvcnRlZC4gSWYgc28sIHJlZ2lzdGVyIHRoZSBwcm92aWRlZCBldmVudCBoYW5kbGVyLlxuICAgIGFzeW5jIGhhc19ibGUob25fYXZhaWxhYmlsaXR5X2NoYW5nZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNfc2ltKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzX2JsZV9zdXBwb3J0ZWQoKSAmJiBhd2FpdCBuYXZpZ2F0b3IuYmx1ZXRvb3RoLmdldEF2YWlsYWJpbGl0eSgpKSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuYmx1ZXRvb3RoLmFkZEV2ZW50TGlzdGVuZXIoXCJhdmFpbGFiaWxpdHljaGFuZ2VkXCIsIG9uX2F2YWlsYWJpbGl0eV9jaGFuZ2VkKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBCbHVldG9vdGggZGV2aWNlIChzZXJ2ZXIpIGlzIGNvbm5lY3RlZC5cbiAgICBwYWlyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX3NpbSB8fCAodGhpcy5zZXJ2ZXIgJiYgdGhpcy5zZXJ2ZXIuY29ubmVjdGVkKTtcbiAgICB9XG5cbiAgICAvLyBQYWlyIHdpdGggYSBDZWxsQm90IGFuZCByZXR1cm4gdGhlIGNoYXJhY3RlcmlzdGljIHVzZWQgdG8gY29udHJvbCB0aGUgZGV2aWNlLlxuICAgIGFzeW5jIHBhaXIoZGlzY29ubmVjdF9jYWxsYmFjaylcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzX3NpbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2tpcCBjb25uZWN0aW5nIGlmIHdlJ3JlIGFscmVhZHkgY29ubmVjdGVkLlxuICAgICAgICBpZiAodGhpcy5wYWlyZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2h1dCBkb3duIGFueSByZW1uYW50cyBvZiBhIHByZXZpb3VzIGNvbm5lY3Rpb24uXG4gICAgICAgIHRoaXMuY2xlYXJfY29ubmVjdGlvbigpO1xuXG4gICAgICAgIC8vIFJlcXVlc3QgYSBkZXZpY2Ugd2l0aCBzZXJ2aWNlIGBVVUlEc2AuIFNlZSB0aGUgYEJsdWV0b290aCBBUEkgPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9CbHVldG9vdGg+YF8uXG4gICAgICAgIGxldCBjZWxsQm90X3NlcnZpY2UgPSBcIjZjNTMzNzkzLTliZDYtNDdkNi04ZDNiLWMxMGE3MDRiNmI5N1wiO1xuICAgICAgICB0aGlzLmRldmljZSA9IGF3YWl0IG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZSh7XG4gICAgICAgICAgICBmaWx0ZXJzOiBbe1xuICAgICAgICAgICAgICAgIHNlcnZpY2VzOiBbY2VsbEJvdF9zZXJ2aWNlXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTm90aWZ5IG9uIGEgZGlzY29ubmVjdC4gSSBjYW4ndCBmaW5kIGFueSBkb2NzIG9uIHRoaXMsIGJ1dCBpdCBkb2VzIHdvcmsuXG4gICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCBkaXNjb25uZWN0X2NhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMuY2xlYXJfY29ubmVjdGlvbik7XG5cbiAgICAgICAgLy8gQ29ubmVjdCB0byBpdHMgc2VydmVyLlxuICAgICAgICB0aGlzLnNlcnZlciA9IGF3YWl0IHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgc2VydmljZSBmb3Igb3VyIHNlcnZlci5cbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gYXdhaXQgdGhpcy5zZXJ2ZXIuZ2V0UHJpbWFyeVNlcnZpY2UoY2VsbEJvdF9zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmljIGFjY2VzcyBmdW5jdGlvbiBmb3IgY2FsbGluZyBhIGZ1bmN0aW9uIG9uIHRoZSBBcmR1aW5vLiBJdCByZXR1cm5zICh2YWx1ZSByZXR1cm5lZCBhZnRlciBpbnZva2luZyB0aGUgZnVuY3Rpb24sIG1lc3NhZ2UpLlxuICAgIGFzeW5jIGludm9rZV9BcmR1aW5vKFxuICAgICAgICAvLyBUaGUgQmx1ZXRvb3RoIGNoYXJhY3RlcmlzdGljIHRvIHVzZSBmb3IgdGhpcyBjYWxsLlxuICAgICAgICBjaGFyYWN0ZXJpc3RpYyxcbiAgICAgICAgLy8gVGhlIG51bWJlciBvZiBieXRlcyBpbiB0aGUgcmV0dXJuIHZhbHVlOlxuICAgICAgICAvL1xuICAgICAgICAvLyAtICAgIDA6IHZvaWRcbiAgICAgICAgLy8gLSAgICArMS8tMTogdW5zaWduZWQvc2lnbmVkIDgtYml0IHZhbHVlXG4gICAgICAgIC8vIC0gICAgKzIvLTI6IHVuc2lnbmVkL3NpZ25lZCAxNi1iaXQgdmFsdWVcbiAgICAgICAgLy8gLSAgICArNC8tNDogdW5zaWduZWQvc2lnbmVkIDMyLWJpdCB2YWx1ZVxuICAgICAgICAvLyAtICAgIDAuNC8wLjg6IDMyLWJpdC82NC1iaXQgZmxvYXRcbiAgICAgICAgcmV0dXJuX2J5dGVzLFxuICAgICAgICAvLyBBbiBBcnJheUJ1ZmZlciBvciBjb21wYXRpYmxlIHR5cGUgb2YgZGF0YSBjb250YWluaW5nIGVuY29kZWQgcGFyYW1ldGVycyB0byBzZW5kLlxuICAgICAgICBwYXJhbV9hcnJheVxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5pc19zaW0pIHtcbiAgICAgICAgICAgIHJldHVybiBbMCwgXCJcIl07XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHBhcmFtX2FycmF5KTtcbiAgICAgICAgLy8gUmVhZCB0aGUgcmV0dXJuZWQgZGF0YS5cbiAgICAgICAgbGV0IHJldHVybl9kYXRhID0gYXdhaXQgY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKCk7XG4gICAgICAgIC8vIEludGVycHJldCB0aGUgcmV0dXJuIHZhbHVlLlxuICAgICAgICBsZXQgcmV0dXJuX3ZhbHVlO1xuICAgICAgICBzd2l0Y2ggKHJldHVybl9ieXRlcykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IHJldHVybl9kYXRhLmdldFVpbnQ4KDApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICByZXR1cm5fdmFsdWUgPSByZXR1cm5fZGF0YS5nZXRJbnQ4KDApO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IHJldHVybl9kYXRhLmdldFVpbnQxNigwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIC0yOlxuICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gcmV0dXJuX2RhdGEuZ2V0SW50MTYoMCwgdGhpcy5pc19saXR0bGVfZW5kaWFuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm5fdmFsdWUgPSByZXR1cm5fZGF0YS5nZXRVaW50MzIoMCwgdGhpcy5pc19saXR0bGVfZW5kaWFuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIC00OlxuICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gcmV0dXJuX2RhdGEuZ2V0SW50MzIoMCwgdGhpcy5pc19saXR0bGVfZW5kaWFuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDAuNDpcbiAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IHJldHVybl9kYXRhLmdldEZsb2F0MzIoMCwgdGhpcy5pc19saXR0bGVfZW5kaWFuKTtcbiAgICAgICAgICAgIHJldHVybl9ieXRlcyA9IDQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAwLjg6XG4gICAgICAgICAgICByZXR1cm5fdmFsdWUgPSByZXR1cm5fZGF0YS5nZXRGbG9hdDY0KDAsIHRoaXMuaXNfbGl0dGxlX2VuZGlhbik7XG4gICAgICAgICAgICByZXR1cm5fYnl0ZXMgPSA4O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZXNzYWdlID0gcmV0dXJuX2RhdGEuYnVmZmVyLnNsaWNlKHJldHVybl9ieXRlcyk7XG4gICAgICAgIG1lc3NhZ2UgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpKTtcbiAgICAgICAgaWYgKCF0aGlzLnZlcmJvc2VfcmV0dXJuKSB7XG4gICAgICAgICAgICB0aHJvdyBgQkxFIHByb3RvY29sIGVycm9yOiAke21lc3NhZ2V9YFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmV0dXJuX3ZhbHVlLCBtZXNzYWdlXTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gZXhpc3RpbmcgaW5zdGFuY2Ugb2YgYSBgYEJsdWV0b290aFJlbW90ZUdBVFRDaGFyYWN0ZXJpc3RpY2BgIG9yIGNyZWF0ZSBhIG5ldyBvbmUuXG4gICAgYXN5bmMgZ2V0X2NoYXJhY3RlcmlzdGljKG5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNfc2ltKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lIGluIHRoaXMuY2hhcmFjdGVyaXN0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcmlzdGljW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcmlzdGljW25hbWVdID0gYXdhaXQgdGhpcy5zZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMudXVpZFtuYW1lXSk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgdGhlIGhhcmR3YXJlIG9uIHRoZSBjb25uZWN0ZWQgZGV2aWNlLlxuICAgIGFzeW5jIHJlc2V0SGFyZHdhcmUoKSB7XG4gICAgICAgIC8vIEFueSB3cml0ZSBpcyBmaW5lIC0tIGp1c3Qgc2VuZCAxIGJ5dGUuXG4gICAgICAgIHJldHVybiB0aGlzLmludm9rZV9BcmR1aW5vKGF3YWl0IHRoaXMuZ2V0X2NoYXJhY3RlcmlzdGljKFwicmVzZXRIYXJkd2FyZVwiKSwgMCwgbmV3IFVpbnQ4QXJyYXkoWzFdKSk7XG4gICAgfVxuXG4gICAgLy8gSW52b2tlIGBwaW5Nb2RlIDxodHRwczovL3d3dy5hcmR1aW5vLmNjL3JlZmVyZW5jZS9lbi9sYW5ndWFnZS9mdW5jdGlvbnMvZGlnaXRhbC1pby9waW5tb2RlLz5gXyBvbiB0aGUgQXJkdWluby5cbiAgICBhc3luYyBwaW5Nb2RlKHU4X3BpbiwgdThfbW9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZva2VfQXJkdWlubyhhd2FpdCB0aGlzLmdldF9jaGFyYWN0ZXJpc3RpYyhcInBpbk1vZGVcIiksIDAsIG5ldyBVaW50OEFycmF5KFt1OF9waW4sIHU4X21vZGVdKSk7XG4gICAgfVxuXG4gICAgLy8gSW52b2tlIGBkaWdpdGFsV3JpdGUgPGh0dHBzOi8vd3d3LmFyZHVpbm8uY2MvcmVmZXJlbmNlL2VuL2xhbmd1YWdlL2Z1bmN0aW9ucy9kaWdpdGFsLWlvL2RpZ2l0YWx3cml0ZS8+YF8gb24gdGhlIEFyZHVpbm8uXG4gICAgYXN5bmMgZGlnaXRhbFdyaXRlKHU4X3BpbiwgdThfdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlX0FyZHVpbm8oYXdhaXQgdGhpcy5nZXRfY2hhcmFjdGVyaXN0aWMoXCJkaWdpdGFsV3JpdGVcIiksIDAsIG5ldyBVaW50OEFycmF5KFt1OF9waW4sIHU4X3ZhbHVlXSkpO1xuICAgIH1cblxuICAgIC8vIEludm9rZSBgZGlnaXRhbFJlYWQgPGh0dHBzOi8vd3d3LmFyZHVpbm8uY2MvcmVmZXJlbmNlL2VuL2xhbmd1YWdlL2Z1bmN0aW9ucy9kaWdpdGFsLWlvL2RpZ2l0YWxyZWFkLz5gXyBvbiB0aGUgQXJkdWluby5cbiAgICBhc3luYyBkaWdpdGFsUmVhZCh1OF9waW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlX0FyZHVpbm8oYXdhaXQgdGhpcy5nZXRfY2hhcmFjdGVyaXN0aWMoXCJkaWdpdGFsUmVhZFwiKSwgMSwgbmV3IFVpbnQ4QXJyYXkoW3U4X3Bpbl0pKTtcbiAgICB9XG5cbiAgICAvLyBJbnZva2UgYGBsZWRjU2V0dXBgYCBvbiB0aGUgQXJkdWluby5cbiAgICAvL1xuICAgIC8vIE5vdGUgdGhhdCB0aGUgTEVEQyBjb250cm9sIG9uIHRoZSBFU1AzMiBBcmR1aW5vIHBvcnQgaXNuJ3QgZG9jdW1lbnRlZC4gSGVyZSdzIG15IGF0dGVtcHRzLiBUaGUgYmVzdCByZWZlcmVuY2UgaXMgdGhlIGBMRURfUFdNIGNoYXB0ZXIgb2YgdGhlIEVTUDMyIFRlY2huaWNhbCBSZWZlcmVuY2UgTWFudWFsIDxodHRwczovL3d3dy5lc3ByZXNzaWYuY29tL3NpdGVzL2RlZmF1bHQvZmlsZXMvZG9jdW1lbnRhdGlvbi9lc3AzMl90ZWNobmljYWxfcmVmZXJlbmNlX21hbnVhbF9lbi5wZGYjcGFnZT0zODQ+YF8uIFRvIHNldCB1cCBQV00sIHlvdSBuZWVkIHRvIHNlbGVjdDpcbiAgICAvL1xuICAgIC8vIC0gICAgQSBjaGFubmVsIChjaGFubmVscyAwLTcgYXV0by11cGRhdGUgbmV3IFBXTSBwZXJpb2RzLCBjaGFubmVscyA4LTE1IGRvbid0KS5cbiAgICAvLyAtICAgIFRoZSBmcmVxdWVuY3kgdG8gZG8gdGhlIFBXTSwgaW4gSHouXG4gICAgLy8gLSAgICBBIG51bWJlciBvZiBiaXRzIHVzZWQgdG8gZG8gdGhlIFBXTS4gVGhlIG1heGltdW0gcG9zc2libGUgdmFsdWUgaXMgZmxvb3IobG9nMihwcm9jZXNzb3IgY2xvY2sgZnJlcXVlbmN5L1BXTSBmcmVxdWVuY3kpKTsgdGhpcyBjYW5ub3QgZXhjZWVkIDIwLiBUaGUgcHJvY2Vzc29yIGNsb2NrIGZyZXF1ZW5jeSBpcyBlaXRoZXIgODAgTUh6IG9yIDEgTUh6LlxuICAgIC8vXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHJldHVybnMgdGhlIGFjdHVhbCBQV00gZnJlcXVlbmN5LCBkdWUgdG8gdGhlIGxpbWl0YXRpb25zIG9mIHRoZSBhdmFpbGFibGUgY2xvY2sgZGl2aXNvci5cbiAgICBhc3luYyBsZWRjU2V0dXAodThfY2hhbm5lbCwgZF9mcmVxLCB1OF9yZXNvbHV0aW9uX2JpdHMpIHtcbiAgICAgICAgbGV0IHBhcmFtX2FycmF5ID0gbmV3IEFycmF5QnVmZmVyKDExKTtcbiAgICAgICAgbGV0IGR2ID0gbmV3IERhdGFWaWV3KHBhcmFtX2FycmF5KTtcbiAgICAgICAgZHYuc2V0VWludDgoMCwgdThfY2hhbm5lbCk7XG4gICAgICAgIGR2LnNldEZsb2F0NjQoMSwgZF9mcmVxLCB0aGlzLmlzX2xpdHRsZV9lbmRpYW4pO1xuICAgICAgICBkdi5zZXRVaW50OCgxMCwgdThfcmVzb2x1dGlvbl9iaXRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlX0FyZHVpbm8oYXdhaXQgdGhpcy5nZXRfY2hhcmFjdGVyaXN0aWMoXCJsZWRjU2V0dXBcIiksIDAuOCwgcGFyYW1fYXJyYXkpO1xuICAgIH1cblxuICAgIC8vIEludm9rZSBgYGxlZGNBdHRhY2hQaW5gYCBvbiB0aGUgQXJkdWluby5cbiAgICAvL1xuICAgIC8vIE5leHQsIGF0dGFjaCB0aGlzIGNoYW5uZWwgdG8gYSBzcGVjaWZpYyBwaW4gb24gdGhlIEFyZHVpbm8uXG4gICAgYXN5bmMgbGVkY0F0dGFjaFBpbih1OF9waW4sIHU4X2NoYW5uZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlX0FyZHVpbm8oYXdhaXQgdGhpcy5nZXRfY2hhcmFjdGVyaXN0aWMoXCJsZWRjQXR0YWNoUGluXCIpLCAwLCBuZXcgVWludDhBcnJheShbdThfcGluLCB1OF9jaGFubmVsXSkpO1xuICAgIH1cblxuICAgIC8vIEludm9rZSBgYGxlZGNXcml0ZWBgIG9uIHRoZSBBcmR1aW5vLlxuICAgIC8vXG4gICAgLy8gRmluYWxseSwgc2VsZWN0IGEgZHV0eSBjeWNsZSBmb3IgdGhhdCBjaGFubmVsLCBmcm9tIDJebnVtX2JpdHMgdG8gMS5cbiAgICBhc3luYyBsZWRjV3JpdGUodThfY2hhbm5lbCwgdTMyX2R1dHkpIHtcbiAgICAgICAgbGV0IHBhcmFtX2FycmF5ID0gbmV3IEFycmF5QnVmZmVyKDUpO1xuICAgICAgICBsZXQgZHYgPSBuZXcgRGF0YVZpZXcocGFyYW1fYXJyYXkpO1xuICAgICAgICBkdi5zZXRVaW50OCgwLCB1OF9jaGFubmVsKTtcbiAgICAgICAgZHYuc2V0VWludDMyKDEsIHUzMl9kdXR5LCB0aGlzLmlzX2xpdHRsZV9lbmRpYW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnZva2VfQXJkdWlubyhhd2FpdCB0aGlzLmdldF9jaGFyYWN0ZXJpc3RpYyhcImxlZGNXcml0ZVwiKSwgMCwgcGFyYW1fYXJyYXkpO1xuICAgIH1cblxuICAgIC8vIEludm9rZSBgYGxlZGNEZXRhY2hQaW5gYCBvbiB0aGUgQXJkdWluby5cbiAgICAvL1xuICAgIC8vIE5leHQsIGF0dGFjaCB0aGlzIGNoYW5uZWwgdG8gYSBzcGVjaWZpYyBwaW4gb24gdGhlIEFyZHVpbm8uXG4gICAgYXN5bmMgbGVkY0RldGFjaFBpbih1OF9waW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlX0FyZHVpbm8oYXdhaXQgdGhpcy5nZXRfY2hhcmFjdGVyaXN0aWMoXCJsZWRjRGV0YWNoUGluXCIpLCAwLCBuZXcgVWludDhBcnJheShbdThfcGluXSkpO1xuICAgIH1cbn1cblxuXG4vLyBDZWxsQm90QmxlR3VpXG4vLyA9PT09PT09PT09PT09XG4vLyBQcm92aWRlIGEgc2ltcGxlIHBhaXIvZGlzY29ubmVjdCBHVUkgZm9yIHRoZSBDZWxsQm90IEJsdWV0b290aCBjb25uZWN0aW9uLlxuY2xhc3MgQ2VsbEJvdEJsZUd1aSB7XG4gICAgY29uc3RydWN0b3IocGFpcl9idXR0b25faWQsIHBhaXJfc3RhdHVzX2lkKSB7XG4gICAgICAgIGF1dG9fYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmJsZV9wYWlyX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhaXJfYnV0dG9uX2lkKTtcbiAgICAgICAgdGhpcy5ibGVfcGFpcl9zdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYWlyX3N0YXR1c19pZCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIEdVSSBpc24ndCBhdmFpbGFibGUsIGdpdmUgdXAuXG4gICAgICAgIGlmICghdGhpcy5ibGVfcGFpcl9idXR0b24gfHwgIXRoaXMuYmxlX3BhaXJfc3RhdHVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNlbGxfYm90X2JsZSA9IG5ldyBDZWxsQm90QmxlKCk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcGFpciBidXR0b24gYmFzZWQgb24gQkxFIGF2YWlsYWJpbGl0eS5cbiAgICAgICAgdGhpcy5jZWxsX2JvdF9ibGUuaGFzX2JsZSh0aGlzLm9uX2F2YWlsYWJpbGl0eV9jaGFuZ2VkKS50aGVuKHRoaXMub25fYmxlX2F2YWlsYWJsZSk7XG4gICAgICAgIC8vIFJlc3BvbmQgdG8gYnV0dG9uIGNsaWNrcy5cbiAgICAgICAgdGhpcy5ibGVfcGFpcl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXN5bmNfb25fcGFpcl9jbGlja2VkKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgYXN5bmNfb25fcGFpcl9jbGlja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2VsbF9ib3RfYmxlLnBhaXJlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmJsZV9wYWlyX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJsZV9wYWlyX3N0YXR1cy5pbm5lckhUTUwgPSBcIlBhaXJpbmcuLi5cIjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jZWxsX2JvdF9ibGUucGFpcih0aGlzLm9uX2Rpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxlX3BhaXJfc3RhdHVzLmlubmVySFRNTCA9IGBQYWlyZWQgdG8gJHt0aGlzLmNlbGxfYm90X2JsZS5kZXZpY2UubmFtZX0uYDtcbiAgICAgICAgICAgICAgICB0aGlzLmJsZV9wYWlyX2J1dHRvbi5pbm5lckhUTUwgPSBcIkRpc2Nvbm5lY3RcIjtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibGVfcGFpcl9zdGF0dXMuaW5uZXJIVE1MID0gXCJVbmFibGUgdG8gcGFpci5cIjtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxlX3BhaXJfYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbF9ib3RfYmxlLnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbl9hdmFpbGFiaWxpdHlfY2hhbmdlZChldmVudCkge1xuICAgICAgICAvLyBUT0RPOiBJIGRvbid0IGtub3cgd2hhdCB0aGUgc3RydWN0dXJlIG9mIHRoaXMgZXZlbnQgaXMuXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbl9ibGVfYXZhaWxhYmxlKGhhc19ibGUpIHtcbiAgICAgICAgdGhpcy5ibGVfcGFpcl9idXR0b24uZGlzYWJsZWQgPSAhaGFzX2JsZTtcbiAgICAgICAgaWYgKGhhc19ibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmxlX3BhaXJfc3RhdHVzLmlubmVySFRNTCA9IFwiTm90IGNvbm5lY3RlZC5cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmxlX3BhaXJfc3RhdHVzLmlubmVySFRNTCA9IFwiTm90IGF2YWlsYWJsZS5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uX2Rpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuYmxlX3BhaXJfc3RhdHVzLmlubmVySFRNTCA9IFwiRGlzY29ubmVjdGVkLlwiO1xuICAgICAgICB0aGlzLmJsZV9wYWlyX2J1dHRvbi5pbm5lckhUTUwgPSBcIlBhaXJcIjtcbiAgICB9XG59XG5cblxuLy8gQW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcy5cbmV4cG9ydCBsZXQgY2VsbF9ib3RfYmxlX2d1aTtcblxuLy8gSGFuZGxlclxuLy8gPT09PT09PVxuLy8gVGhpcyBtdXN0IGJlIGludm9rZWQgd2hlbiB0aGUgRE9NIGlzIHJlYWR5LCBiZWZvcmUgY2FsbGluZyBhbnkgb3RoZXIgZnVuY3Rpb24gaW4gdGhpcyBmaWxlLlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNlbGxfYm90X2JsZV9ndWkgPSBuZXcgQ2VsbEJvdEJsZUd1aShcImJsZV9wYWlyX2J1dHRvblwiLCBcImJsZV9wYWlyX3N0YXR1c1wiKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9