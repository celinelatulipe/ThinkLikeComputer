"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_wavedrom_js_wavedrom_js"],{

/***/ 32405:
/*!*******************************************!*\
  !*** ./runestone/wavedrom/js/wavedrom.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var wavedrom_wavedrom_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wavedrom/wavedrom.min.js */ 47779);
/* harmony import */ var wavedrom_wavedrom_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wavedrom_wavedrom_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wavedrom_skins_default_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wavedrom/skins/default.js */ 72000);
/* harmony import */ var wavedrom_skins_default_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wavedrom_skins_default_js__WEBPACK_IMPORTED_MODULE_1__);
// ***********************************************
// |docname| - JavaScript for the WaveDrom library
// ***********************************************


// This took a fair amount of experimenting to figure out how to make this work with NPM and Webpack. Sigh. Here's the working result.
//
// This has already been packaged for the web with browserify, so we can just import it for the side effects (it defines ``window.WaveDrom``. Importing from the ``lib/`` folder produces a lot of unsatisfied imports when using webpack.


// WaveSkin isn't defined globally, so import the default export to get access to it. It defines a single variable, assuming that the variable will be assigned to the ``window``. Here, it's not. So...

// ...make the required WaveSkin (needed by WaveDrom) available globally.
window.WaveSkin = (wavedrom_skins_default_js__WEBPACK_IMPORTED_MODULE_1___default());

// Run the render after the dynamic load is done.
$(document).on("runestone:login-complete", window.WaveDrom.ProcessAll);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3dhdmVkcm9tX2pzX3dhdmVkcm9tX2pzLmNlMzY3ZTRhYWMzMzViZDIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ2tDOztBQUVsQztBQUNpRDtBQUNqRDtBQUNBLGtCQUFrQixrRUFBUTs7QUFFMUI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvd2F2ZWRyb20vanMvd2F2ZWRyb20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIHxkb2NuYW1lfCAtIEphdmFTY3JpcHQgZm9yIHRoZSBXYXZlRHJvbSBsaWJyYXJ5XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFRoaXMgdG9vayBhIGZhaXIgYW1vdW50IG9mIGV4cGVyaW1lbnRpbmcgdG8gZmlndXJlIG91dCBob3cgdG8gbWFrZSB0aGlzIHdvcmsgd2l0aCBOUE0gYW5kIFdlYnBhY2suIFNpZ2guIEhlcmUncyB0aGUgd29ya2luZyByZXN1bHQuXG4vL1xuLy8gVGhpcyBoYXMgYWxyZWFkeSBiZWVuIHBhY2thZ2VkIGZvciB0aGUgd2ViIHdpdGggYnJvd3NlcmlmeSwgc28gd2UgY2FuIGp1c3QgaW1wb3J0IGl0IGZvciB0aGUgc2lkZSBlZmZlY3RzIChpdCBkZWZpbmVzIGBgd2luZG93LldhdmVEcm9tYGAuIEltcG9ydGluZyBmcm9tIHRoZSBgYGxpYi9gYCBmb2xkZXIgcHJvZHVjZXMgYSBsb3Qgb2YgdW5zYXRpc2ZpZWQgaW1wb3J0cyB3aGVuIHVzaW5nIHdlYnBhY2suXG5pbXBvcnQgXCJ3YXZlZHJvbS93YXZlZHJvbS5taW4uanNcIjtcblxuLy8gV2F2ZVNraW4gaXNuJ3QgZGVmaW5lZCBnbG9iYWxseSwgc28gaW1wb3J0IHRoZSBkZWZhdWx0IGV4cG9ydCB0byBnZXQgYWNjZXNzIHRvIGl0LiBJdCBkZWZpbmVzIGEgc2luZ2xlIHZhcmlhYmxlLCBhc3N1bWluZyB0aGF0IHRoZSB2YXJpYWJsZSB3aWxsIGJlIGFzc2lnbmVkIHRvIHRoZSBgYHdpbmRvd2BgLiBIZXJlLCBpdCdzIG5vdC4gU28uLi5cbmltcG9ydCBXYXZlU2tpbiBmcm9tIFwid2F2ZWRyb20vc2tpbnMvZGVmYXVsdC5qc1wiO1xuLy8gLi4ubWFrZSB0aGUgcmVxdWlyZWQgV2F2ZVNraW4gKG5lZWRlZCBieSBXYXZlRHJvbSkgYXZhaWxhYmxlIGdsb2JhbGx5Llxud2luZG93LldhdmVTa2luID0gV2F2ZVNraW47XG5cbi8vIFJ1biB0aGUgcmVuZGVyIGFmdGVyIHRoZSBkeW5hbWljIGxvYWQgaXMgZG9uZS5cbiQoZG9jdW1lbnQpLm9uKFwicnVuZXN0b25lOmxvZ2luLWNvbXBsZXRlXCIsIHdpbmRvdy5XYXZlRHJvbS5Qcm9jZXNzQWxsKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==