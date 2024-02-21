"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_datafile_js_datafile_js"],{

/***/ 83513:
/*!*********************************************!*\
  !*** ./runestone/datafile/css/datafile.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 55789:
/*!*******************************************!*\
  !*** ./runestone/datafile/js/datafile.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase */ 2568);
/* harmony import */ var _css_datafile_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/datafile.css */ 83513);
/*==========================================
=======     Master datafile.js      ========
============================================
===     This file contains the JS for    ===
===   the Runestone Datafile component.  ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                6/8/15                ===
==========================================*/





var dfList = {}; // Dictionary that contains all instances of Datafile objects

class DataFile extends _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <pre> element that will be replaced by new HTML
        this.origElem = orig;
        this.divid = orig.id;
        this.dataEdit = false;
        this.isImage = $(orig).data("isimage");
        if ($(this.origElem).data("edit") === true) {
            this.dataEdit = true;
        }
        this.displayClass = "block"; // Users can specify the non-edit component to be hidden--default is not hidden
        if ($(this.origElem).is("[data-hidden]")) {
            this.displayClass = "none";
        }
        // Users can specify numbers of rows/columns when editing is true
        this.numberOfRows = $(this.origElem).data("rows");
        this.numberOfCols = $(this.origElem).data("cols");
        if (!this.isImage) {
            if (this.dataEdit) {
                this.createTextArea();
            } else {
                this.createPre();
            }
        }
        this.indicate_component_ready();
    }
    /*=====================================
    == Create either <pre> or <textarea> ==
    ==  depending on if editing is true  ==
    ==================================*/
    createPre() {
        this.containerDiv = document.createElement("pre");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).attr({ style: "display: " + this.displayClass });
        this.containerDiv.innerHTML = this.origElem.innerHTML;
        $(this.origElem).replaceWith(this.containerDiv);
    }
    createTextArea() {
        this.containerDiv = document.createElement("textarea");
        this.containerDiv.id = this.divid;
        this.containerDiv.rows = this.numberOfRows;
        this.containerDiv.cols = this.numberOfCols;
        this.containerDiv.innerHTML = this.origElem.innerHTML;
        $(this.containerDiv).addClass("datafiletextfield");
        $(this.origElem).replaceWith(this.containerDiv);
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(function () {
    $("[data-component=datafile]").each(function (index) {
        try {
            dfList[this.id] = new DataFile({ orig: this });
        } catch (err) {
            console.log(`Error rendering DataFile ${this.id}`);
        }
    });
});

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.datafile = function (opts) {
    return new DataFile(opts);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2RhdGFmaWxlX2pzX2RhdGFmaWxlX2pzLmYxOTUzZWIzN2Y1ZTUyOTMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUU2QztBQUM3Qjs7QUFFN0IsaUJBQWlCOztBQUVqQix1QkFBdUIsZ0VBQWE7QUFDcEM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdDQUF3QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxZQUFZO0FBQ3pELFVBQVU7QUFDVixvREFBb0QsUUFBUTtBQUM1RDtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2RhdGFmaWxlL2Nzcy9kYXRhZmlsZS5jc3M/NDBlYSIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL2RhdGFmaWxlL2pzL2RhdGFmaWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT09PT09ICAgICBNYXN0ZXIgZGF0YWZpbGUuanMgICAgICA9PT09PT09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgICAgVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBKUyBmb3IgICAgPT09XG49PT0gICB0aGUgUnVuZXN0b25lIERhdGFmaWxlIGNvbXBvbmVudC4gID09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgICAgICAgICAgICAgQ3JlYXRlZCBieSAgICAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgIElzYWlhaCBNYXllcmNoYWsgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICAgICAgIDYvOC8xNSAgICAgICAgICAgICAgICA9PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFJ1bmVzdG9uZUJhc2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9qcy9ydW5lc3RvbmViYXNlXCI7XG5pbXBvcnQgXCIuLi9jc3MvZGF0YWZpbGUuY3NzXCI7XG5cbnZhciBkZkxpc3QgPSB7fTsgLy8gRGljdGlvbmFyeSB0aGF0IGNvbnRhaW5zIGFsbCBpbnN0YW5jZXMgb2YgRGF0YWZpbGUgb2JqZWN0c1xuXG5jbGFzcyBEYXRhRmlsZSBleHRlbmRzIFJ1bmVzdG9uZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHZhciBvcmlnID0gb3B0cy5vcmlnOyAvLyBlbnRpcmUgPHByZT4gZWxlbWVudCB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgYnkgbmV3IEhUTUxcbiAgICAgICAgdGhpcy5vcmlnRWxlbSA9IG9yaWc7XG4gICAgICAgIHRoaXMuZGl2aWQgPSBvcmlnLmlkO1xuICAgICAgICB0aGlzLmRhdGFFZGl0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNJbWFnZSA9ICQob3JpZykuZGF0YShcImlzaW1hZ2VcIik7XG4gICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmRhdGEoXCJlZGl0XCIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFFZGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BsYXlDbGFzcyA9IFwiYmxvY2tcIjsgLy8gVXNlcnMgY2FuIHNwZWNpZnkgdGhlIG5vbi1lZGl0IGNvbXBvbmVudCB0byBiZSBoaWRkZW4tLWRlZmF1bHQgaXMgbm90IGhpZGRlblxuICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtKS5pcyhcIltkYXRhLWhpZGRlbl1cIikpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNsYXNzID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlcnMgY2FuIHNwZWNpZnkgbnVtYmVycyBvZiByb3dzL2NvbHVtbnMgd2hlbiBlZGl0aW5nIGlzIHRydWVcbiAgICAgICAgdGhpcy5udW1iZXJPZlJvd3MgPSAkKHRoaXMub3JpZ0VsZW0pLmRhdGEoXCJyb3dzXCIpO1xuICAgICAgICB0aGlzLm51bWJlck9mQ29scyA9ICQodGhpcy5vcmlnRWxlbSkuZGF0YShcImNvbHNcIik7XG4gICAgICAgIGlmICghdGhpcy5pc0ltYWdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhRWRpdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGV4dEFyZWEoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGljYXRlX2NvbXBvbmVudF9yZWFkeSgpO1xuICAgIH1cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBDcmVhdGUgZWl0aGVyIDxwcmU+IG9yIDx0ZXh0YXJlYT4gPT1cbiAgICA9PSAgZGVwZW5kaW5nIG9uIGlmIGVkaXRpbmcgaXMgdHJ1ZSAgPT1cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBjcmVhdGVQcmUoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuaWQgPSB0aGlzLmRpdmlkO1xuICAgICAgICAkKHRoaXMuY29udGFpbmVyRGl2KS5hdHRyKHsgc3R5bGU6IFwiZGlzcGxheTogXCIgKyB0aGlzLmRpc3BsYXlDbGFzcyB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuaW5uZXJIVE1MID0gdGhpcy5vcmlnRWxlbS5pbm5lckhUTUw7XG4gICAgICAgICQodGhpcy5vcmlnRWxlbSkucmVwbGFjZVdpdGgodGhpcy5jb250YWluZXJEaXYpO1xuICAgIH1cbiAgICBjcmVhdGVUZXh0QXJlYSgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmlkID0gdGhpcy5kaXZpZDtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYucm93cyA9IHRoaXMubnVtYmVyT2ZSb3dzO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5jb2xzID0gdGhpcy5udW1iZXJPZkNvbHM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmlubmVySFRNTCA9IHRoaXMub3JpZ0VsZW0uaW5uZXJIVE1MO1xuICAgICAgICAkKHRoaXMuY29udGFpbmVyRGl2KS5hZGRDbGFzcyhcImRhdGFmaWxldGV4dGZpZWxkXCIpO1xuICAgICAgICAkKHRoaXMub3JpZ0VsZW0pLnJlcGxhY2VXaXRoKHRoaXMuY29udGFpbmVyRGl2KTtcbiAgICB9XG59XG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PSBGaW5kIHRoZSBjdXN0b20gSFRNTCB0YWdzIGFuZCA9PVxuPT0gICBleGVjdXRlIG91ciBjb2RlIG9uIHRoZW0gICAgPT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiW2RhdGEtY29tcG9uZW50PWRhdGFmaWxlXVwiKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGZMaXN0W3RoaXMuaWRdID0gbmV3IERhdGFGaWxlKHsgb3JpZzogdGhpcyB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgcmVuZGVyaW5nIERhdGFGaWxlICR7dGhpcy5pZH1gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmlmICh0eXBlb2Ygd2luZG93LmNvbXBvbmVudF9mYWN0b3J5ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luZG93LmNvbXBvbmVudF9mYWN0b3J5ID0ge307XG59XG5cbndpbmRvdy5jb21wb25lbnRfZmFjdG9yeS5kYXRhZmlsZSA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRhRmlsZShvcHRzKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=