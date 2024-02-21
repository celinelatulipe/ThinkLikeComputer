"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_codelens_js_codelens_js"],{

/***/ 51949:
/*!********************************************!*\
  !*** ./runestone/codelens/css/pytutor.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 12882:
/*!*******************************************!*\
  !*** ./runestone/codelens/js/codelens.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase.js */ 2568);
/* harmony import */ var _pytutor_embed_bundle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pytutor-embed.bundle.js */ 71951);
/* harmony import */ var _pytutor_embed_bundle_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pytutor_embed_bundle_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_pytutor_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../css/pytutor.css */ 51949);
/**
 * Created by bmiller on 5/10/15.
 */

/*
 Since I don't want to modify the codelens code I'll attach the logging functionality this way.
 This actually seems like a better way to do it maybe across the board to separate logging
 from the real funcionality.  It would also allow a better way of turning off/on logging..
 As long as Philip doesn't go and change the id values for the buttons and slider this will
 continue to work.... In the best of all worlds we might add a function to the visualizer to
 return the buttons, but I'm having a hard time thinking of any other use for that besides mine.
 */





function attachLoggers(codelens, divid) {
    let rb = new _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    codelens.domRoot.find("#jmpFirstInstr").click(function () {
        rb.logBookEvent({ event: "codelens", act: "first", div_id: divid });
    });
    codelens.domRoot.find("#jmpLastInstr").click(function () {
        rb.logBookEvent({ event: "codelens", act: "last", div_id: divid });
    });
    codelens.domRoot.find("#jmpStepBack").click(function () {
        rb.logBookEvent({ event: "codelens", act: "back", div_id: divid });
    });
    codelens.domRoot.find("#jmpStepFwd").click(function () {
        rb.logBookEvent({ event: "codelens", act: "fwd", div_id: divid });
    });
    codelens.domRoot.find("#executionSlider").bind("slide", function (evt, ui) {
        rb.logBookEvent({ event: "codelens", act: "slide", div_id: divid });
    });
    // TODO: The component isn't quite fully initialized, but it also doesn't inherit from RunestoneBase. This is a convenient place to mark it ready for now, but it should be moved forward in time during a rewrite.
    rb.containerDiv = document.getElementById(divid);
    rb.indicate_component_ready();
}

function styleButtons(divid) {
    var myVis = $("#" + divid);
    $(myVis).find("#jmpFirstInstr").addClass("btn btn-default");
    $(myVis).find("#jmpStepBack").addClass("btn btn-danger");
    $(myVis).find("#jmpStepFwd").addClass("btn btn-success");
    $(myVis).find("#jmpLastInstr").addClass("btn btn-default");
}

if (typeof allVsualizers === "undefined") {
    window.allVisualizers = [];
}

$(function () {
    if (typeof allTraceData !== "undefined") {
        for (let divid in allTraceData) {
            let cl = document.getElementById(divid);
            let lang = $(cl).data("params").lang;
            try {
                let vis = addVisualizerToPage(allTraceData[divid], divid, {
                    startingInstruction: 0,
                    editCodeBaseURL: null,
                    hideCode: false,
                    lang: lang,
                });
                attachLoggers(vis, divid);
                styleButtons(divid);
                window.allVisualizers.push(vis);
            } catch (err) {
                console.log(`Error rendering CodeLens Problem ${divid}`);
                console.log(err);
            }
        }
        window.addEventListener("codelens:answer", function (evt) {
            let rb = new _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
            rb.logBookEvent({
                event: "codelens",
                div_id: evt.detail.divid,
                act: `answer:${evt.detail.answer}`,
                correct: evt.detail.correct,
            });
            console.log(evt);
        });
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2NvZGVsZW5zX2pzX2NvZGVsZW5zX2pzLjZkYmEzY2MyMDZkMWFjMGUuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2RDtBQUMxQjtBQUNMOztBQUU5QjtBQUNBLGlCQUFpQixtRUFBYTtBQUM5QjtBQUNBLDBCQUEwQixnREFBZ0Q7QUFDMUUsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLCtDQUErQztBQUN6RSxLQUFLO0FBQ0w7QUFDQSwwQkFBMEIsK0NBQStDO0FBQ3pFLEtBQUs7QUFDTDtBQUNBLDBCQUEwQiw4Q0FBOEM7QUFDeEUsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLGdEQUFnRDtBQUMxRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGdFQUFnRSxNQUFNO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1FQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9jb2RlbGVucy9jc3MvcHl0dXRvci5jc3M/OTc3NyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2NvZGVsZW5zL2pzL2NvZGVsZW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ3JlYXRlZCBieSBibWlsbGVyIG9uIDUvMTAvMTUuXG4gKi9cblxuLypcbiBTaW5jZSBJIGRvbid0IHdhbnQgdG8gbW9kaWZ5IHRoZSBjb2RlbGVucyBjb2RlIEknbGwgYXR0YWNoIHRoZSBsb2dnaW5nIGZ1bmN0aW9uYWxpdHkgdGhpcyB3YXkuXG4gVGhpcyBhY3R1YWxseSBzZWVtcyBsaWtlIGEgYmV0dGVyIHdheSB0byBkbyBpdCBtYXliZSBhY3Jvc3MgdGhlIGJvYXJkIHRvIHNlcGFyYXRlIGxvZ2dpbmdcbiBmcm9tIHRoZSByZWFsIGZ1bmNpb25hbGl0eS4gIEl0IHdvdWxkIGFsc28gYWxsb3cgYSBiZXR0ZXIgd2F5IG9mIHR1cm5pbmcgb2ZmL29uIGxvZ2dpbmcuLlxuIEFzIGxvbmcgYXMgUGhpbGlwIGRvZXNuJ3QgZ28gYW5kIGNoYW5nZSB0aGUgaWQgdmFsdWVzIGZvciB0aGUgYnV0dG9ucyBhbmQgc2xpZGVyIHRoaXMgd2lsbFxuIGNvbnRpbnVlIHRvIHdvcmsuLi4uIEluIHRoZSBiZXN0IG9mIGFsbCB3b3JsZHMgd2UgbWlnaHQgYWRkIGEgZnVuY3Rpb24gdG8gdGhlIHZpc3VhbGl6ZXIgdG9cbiByZXR1cm4gdGhlIGJ1dHRvbnMsIGJ1dCBJJ20gaGF2aW5nIGEgaGFyZCB0aW1lIHRoaW5raW5nIG9mIGFueSBvdGhlciB1c2UgZm9yIHRoYXQgYmVzaWRlcyBtaW5lLlxuICovXG5cbmltcG9ydCBSdW5lc3RvbmVCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vanMvcnVuZXN0b25lYmFzZS5qc1wiO1xuaW1wb3J0IFwiLi9weXR1dG9yLWVtYmVkLmJ1bmRsZS5qc1wiO1xuaW1wb3J0IFwiLi8uLi9jc3MvcHl0dXRvci5jc3NcIjtcblxuZnVuY3Rpb24gYXR0YWNoTG9nZ2Vycyhjb2RlbGVucywgZGl2aWQpIHtcbiAgICBsZXQgcmIgPSBuZXcgUnVuZXN0b25lQmFzZSgpO1xuICAgIGNvZGVsZW5zLmRvbVJvb3QuZmluZChcIiNqbXBGaXJzdEluc3RyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmIubG9nQm9va0V2ZW50KHsgZXZlbnQ6IFwiY29kZWxlbnNcIiwgYWN0OiBcImZpcnN0XCIsIGRpdl9pZDogZGl2aWQgfSk7XG4gICAgfSk7XG4gICAgY29kZWxlbnMuZG9tUm9vdC5maW5kKFwiI2ptcExhc3RJbnN0clwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJiLmxvZ0Jvb2tFdmVudCh7IGV2ZW50OiBcImNvZGVsZW5zXCIsIGFjdDogXCJsYXN0XCIsIGRpdl9pZDogZGl2aWQgfSk7XG4gICAgfSk7XG4gICAgY29kZWxlbnMuZG9tUm9vdC5maW5kKFwiI2ptcFN0ZXBCYWNrXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmIubG9nQm9va0V2ZW50KHsgZXZlbnQ6IFwiY29kZWxlbnNcIiwgYWN0OiBcImJhY2tcIiwgZGl2X2lkOiBkaXZpZCB9KTtcbiAgICB9KTtcbiAgICBjb2RlbGVucy5kb21Sb290LmZpbmQoXCIjam1wU3RlcEZ3ZFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJiLmxvZ0Jvb2tFdmVudCh7IGV2ZW50OiBcImNvZGVsZW5zXCIsIGFjdDogXCJmd2RcIiwgZGl2X2lkOiBkaXZpZCB9KTtcbiAgICB9KTtcbiAgICBjb2RlbGVucy5kb21Sb290LmZpbmQoXCIjZXhlY3V0aW9uU2xpZGVyXCIpLmJpbmQoXCJzbGlkZVwiLCBmdW5jdGlvbiAoZXZ0LCB1aSkge1xuICAgICAgICByYi5sb2dCb29rRXZlbnQoeyBldmVudDogXCJjb2RlbGVuc1wiLCBhY3Q6IFwic2xpZGVcIiwgZGl2X2lkOiBkaXZpZCB9KTtcbiAgICB9KTtcbiAgICAvLyBUT0RPOiBUaGUgY29tcG9uZW50IGlzbid0IHF1aXRlIGZ1bGx5IGluaXRpYWxpemVkLCBidXQgaXQgYWxzbyBkb2Vzbid0IGluaGVyaXQgZnJvbSBSdW5lc3RvbmVCYXNlLiBUaGlzIGlzIGEgY29udmVuaWVudCBwbGFjZSB0byBtYXJrIGl0IHJlYWR5IGZvciBub3csIGJ1dCBpdCBzaG91bGQgYmUgbW92ZWQgZm9yd2FyZCBpbiB0aW1lIGR1cmluZyBhIHJld3JpdGUuXG4gICAgcmIuY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGl2aWQpO1xuICAgIHJiLmluZGljYXRlX2NvbXBvbmVudF9yZWFkeSgpO1xufVxuXG5mdW5jdGlvbiBzdHlsZUJ1dHRvbnMoZGl2aWQpIHtcbiAgICB2YXIgbXlWaXMgPSAkKFwiI1wiICsgZGl2aWQpO1xuICAgICQobXlWaXMpLmZpbmQoXCIjam1wRmlyc3RJbnN0clwiKS5hZGRDbGFzcyhcImJ0biBidG4tZGVmYXVsdFwiKTtcbiAgICAkKG15VmlzKS5maW5kKFwiI2ptcFN0ZXBCYWNrXCIpLmFkZENsYXNzKFwiYnRuIGJ0bi1kYW5nZXJcIik7XG4gICAgJChteVZpcykuZmluZChcIiNqbXBTdGVwRndkXCIpLmFkZENsYXNzKFwiYnRuIGJ0bi1zdWNjZXNzXCIpO1xuICAgICQobXlWaXMpLmZpbmQoXCIjam1wTGFzdEluc3RyXCIpLmFkZENsYXNzKFwiYnRuIGJ0bi1kZWZhdWx0XCIpO1xufVxuXG5pZiAodHlwZW9mIGFsbFZzdWFsaXplcnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW5kb3cuYWxsVmlzdWFsaXplcnMgPSBbXTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBhbGxUcmFjZURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZm9yIChsZXQgZGl2aWQgaW4gYWxsVHJhY2VEYXRhKSB7XG4gICAgICAgICAgICBsZXQgY2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZpZCk7XG4gICAgICAgICAgICBsZXQgbGFuZyA9ICQoY2wpLmRhdGEoXCJwYXJhbXNcIikubGFuZztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpcyA9IGFkZFZpc3VhbGl6ZXJUb1BhZ2UoYWxsVHJhY2VEYXRhW2RpdmlkXSwgZGl2aWQsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRpbmdJbnN0cnVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICAgICAgZWRpdENvZGVCYXNlVVJMOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBoaWRlQ29kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxhbmc6IGxhbmcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXR0YWNoTG9nZ2Vycyh2aXMsIGRpdmlkKTtcbiAgICAgICAgICAgICAgICBzdHlsZUJ1dHRvbnMoZGl2aWQpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGxWaXN1YWxpemVycy5wdXNoKHZpcyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgcmVuZGVyaW5nIENvZGVMZW5zIFByb2JsZW0gJHtkaXZpZH1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY29kZWxlbnM6YW5zd2VyXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIGxldCByYiA9IG5ldyBSdW5lc3RvbmVCYXNlKCk7XG4gICAgICAgICAgICByYi5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiBcImNvZGVsZW5zXCIsXG4gICAgICAgICAgICAgICAgZGl2X2lkOiBldnQuZGV0YWlsLmRpdmlkLFxuICAgICAgICAgICAgICAgIGFjdDogYGFuc3dlcjoke2V2dC5kZXRhaWwuYW5zd2VyfWAsXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZXZ0LmRldGFpbC5jb3JyZWN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldnQpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==