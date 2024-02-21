"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_tabbedStuff_js_tabbedstuff_js"],{

/***/ 95766:
/*!***************************************************!*\
  !*** ./runestone/tabbedStuff/css/tabbedstuff.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 97887:
/*!*************************************************!*\
  !*** ./runestone/tabbedStuff/js/tabbedstuff.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase */ 2568);
/* harmony import */ var _css_tabbedstuff_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/tabbedstuff.css */ 95766);
/*==========================================
=======    Master tabbedstuff.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone tabbedStuff component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/15/15               ===
===             Brad Miller              ===
===               06/15/15               ===
==========================================*/


var TSList = {}; // Dictionary that contains all instances of TabbedStuff objects




// Define TabbedStuff object
class TabbedStuff extends _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig;
        this.origElem = orig; // entire original <div> element that will be replaced by new HTML
        this.divid = orig.id;
        this.inactive = false;
        if ($(this.origElem).is("[data-inactive]")) {
            this.inactive = true;
        }
        this.togglesList = []; // For use in Codemirror/Disqus
        this.childTabs = [];
        this.populateChildTabs();
        this.activeTab = 0; // default value--activeTab is the index of the tab that starts open
        this.findActiveTab();
        this.createTabContainer();
        this.indicate_component_ready();
    }
    /*===========================================
    == Update attributes of instance variables ==
    ==    variables according to specifications    ==
    ===========================================*/
    populateChildTabs() {
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            if ($(this.origElem.childNodes[i]).data("component") === "tab") {
                this.childTabs.push(this.origElem.childNodes[i]);
            }
        }
    }
    findActiveTab() {
        for (var i = 0; i < this.childTabs.length; i++) {
            if ($(this.childTabs[i]).is("[data-active]")) {
                this.activeTab = i;
            }
        }
    }
    /*==========================================
    == Creating/appending final HTML elements ==
    ==========================================*/
    createTabContainer() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
        $(this.containerDiv).attr({ role: "tabpanel" });
        this.tabsUL = document.createElement("ul");
        this.tabsUL.id = this.divid + "_tab";
        $(this.tabsUL).addClass("nav nav-tabs");
        $(this.tabsUL).attr({ role: "tablist" });
        this.tabContentDiv = document.createElement("div"); // Create tab content container that holds tab panes w/content
        $(this.tabContentDiv).addClass("tab-content");
        this.createTabs(); // create and append tabs to the <ul>
        this.containerDiv.appendChild(this.tabsUL);
        this.containerDiv.appendChild(this.tabContentDiv);
        this.addCMD(); // Adds fuctionality for Codemirror/Disqus
        $(this.origElem).replaceWith(this.containerDiv);
    }
    createTabs() {
        // Create tabs in format <li><a><span></span></a></li> to be appended to the <ul>
        for (var i = 0; i < this.childTabs.length; i++) {
            // First create tabname and tabfriendly name that has no spaces to be used for the id
            var tabListElement = document.createElement("li");
            $(tabListElement).attr({
                role: "presentation",
                "aria-controls": this.divid + "-" + i
            });
            // Using bootstrap tabs functionality
            var tabElement = document.createElement("a");
            $(tabElement).attr({
                "data-toggle": "tab",
                href: "#" + this.divid + "-" + i,
                role: "tab"
            });
            var tabTitle = document.createElement("span"); // Title of tab--what the user will see
            tabTitle.textContent = $(this.childTabs[i]).data("tabname");
            tabElement.appendChild(tabTitle);
            tabListElement.appendChild(tabElement);
            this.tabsUL.appendChild(tabListElement);
            // tabPane is what holds the contents of the tab
            var tabPaneDiv = document.createElement("div");
            tabPaneDiv.id = this.divid + "-" + i;
            $(tabPaneDiv).addClass("tab-pane");
            $(tabPaneDiv).attr({
                role: "tabpanel"
            });
            //var tabHTML = $(this.childTabs[i]).html();
            //$(tabPaneDiv).html(tabHTML);
            tabPaneDiv.appendChild(this.childTabs[i]);
            if (!this.inactive) {
                if (this.activeTab === i) {
                    $(tabListElement).addClass("active");
                    $(tabPaneDiv).addClass("active");
                }
            }
            this.togglesList.push(tabElement);
            this.tabContentDiv.appendChild(tabPaneDiv);
        }
    }
    /*===================================
    == Codemirror/Disqus functionality ==
    ===================================*/
    addCMD() {
        $(this.togglesList).on("shown.bs.tab", function(e) {
            var content_div = $(e.target.attributes.href.value);
            content_div.find(".disqus_thread_link").each(function() {
                $(this).click();
            });
            content_div.find(".CodeMirror").each(function(i, el) {
                el.CodeMirror.refresh();
            });
        });
    }
}

/*=================================
== Find the custom HTML tags and ==
==     execute our code on them        ==
=================================*/
$("load", function() {
    $("[data-component=tabbedStuff]").each(function(index) {
        TSList[this.id] = new TabbedStuff({ orig: this });
    });
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3RhYmJlZFN0dWZmX2pzX3RhYmJlZHN0dWZmX2pzLjUwZGZiMDFmYTY5NWQwZjQuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYixpQkFBaUI7O0FBRXlDO0FBQzFCOztBQUVoQztBQUNBLDBCQUEwQixnRUFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQ0FBcUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJCQUEyQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixpQkFBaUI7QUFDL0MsNERBQTREO0FBQzVEO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsWUFBWTtBQUN4RCxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvdGFiYmVkU3R1ZmYvY3NzL3RhYmJlZHN0dWZmLmNzcz8yZmQ1Iiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvdGFiYmVkU3R1ZmYvanMvdGFiYmVkc3R1ZmYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PT09PT0gICAgTWFzdGVyIHRhYmJlZHN0dWZmLmpzICAgID09PT09PT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT09ICAgICBUaGlzIGZpbGUgY29udGFpbnMgdGhlIEpTIGZvciAgICA9PT1cbj09PSB0aGUgUnVuZXN0b25lIHRhYmJlZFN0dWZmIGNvbXBvbmVudC4gPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT09ICAgICAgICAgICAgICBDcmVhdGVkIGJ5ICAgICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgSXNhaWFoIE1heWVyY2hhayAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgICAgICAwNi8xNS8xNSAgICAgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICAgIEJyYWQgTWlsbGVyICAgICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgICAgIDA2LzE1LzE1ICAgICAgICAgICAgICAgPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBUU0xpc3QgPSB7fTsgLy8gRGljdGlvbmFyeSB0aGF0IGNvbnRhaW5zIGFsbCBpbnN0YW5jZXMgb2YgVGFiYmVkU3R1ZmYgb2JqZWN0c1xuXG5pbXBvcnQgUnVuZXN0b25lQmFzZSBmcm9tIFwiLi4vLi4vY29tbW9uL2pzL3J1bmVzdG9uZWJhc2VcIjtcbmltcG9ydCBcIi4uL2Nzcy90YWJiZWRzdHVmZi5jc3NcIjtcblxuLy8gRGVmaW5lIFRhYmJlZFN0dWZmIG9iamVjdFxuY2xhc3MgVGFiYmVkU3R1ZmYgZXh0ZW5kcyBSdW5lc3RvbmVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB2YXIgb3JpZyA9IG9wdHMub3JpZztcbiAgICAgICAgdGhpcy5vcmlnRWxlbSA9IG9yaWc7IC8vIGVudGlyZSBvcmlnaW5hbCA8ZGl2PiBlbGVtZW50IHRoYXQgd2lsbCBiZSByZXBsYWNlZCBieSBuZXcgSFRNTFxuICAgICAgICB0aGlzLmRpdmlkID0gb3JpZy5pZDtcbiAgICAgICAgdGhpcy5pbmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtKS5pcyhcIltkYXRhLWluYWN0aXZlXVwiKSkge1xuICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVzTGlzdCA9IFtdOyAvLyBGb3IgdXNlIGluIENvZGVtaXJyb3IvRGlzcXVzXG4gICAgICAgIHRoaXMuY2hpbGRUYWJzID0gW107XG4gICAgICAgIHRoaXMucG9wdWxhdGVDaGlsZFRhYnMoKTtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSAwOyAvLyBkZWZhdWx0IHZhbHVlLS1hY3RpdmVUYWIgaXMgdGhlIGluZGV4IG9mIHRoZSB0YWIgdGhhdCBzdGFydHMgb3BlblxuICAgICAgICB0aGlzLmZpbmRBY3RpdmVUYWIoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVUYWJDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5pbmRpY2F0ZV9jb21wb25lbnRfcmVhZHkoKTtcbiAgICB9XG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgPT0gVXBkYXRlIGF0dHJpYnV0ZXMgb2YgaW5zdGFuY2UgdmFyaWFibGVzID09XG4gICAgPT0gICAgdmFyaWFibGVzIGFjY29yZGluZyB0byBzcGVjaWZpY2F0aW9ucyAgICA9PVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHBvcHVsYXRlQ2hpbGRUYWJzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3JpZ0VsZW0uY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzW2ldKS5kYXRhKFwiY29tcG9uZW50XCIpID09PSBcInRhYlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZFRhYnMucHVzaCh0aGlzLm9yaWdFbGVtLmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmRBY3RpdmVUYWIoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZFRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMuY2hpbGRUYWJzW2ldKS5pcyhcIltkYXRhLWFjdGl2ZV1cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBDcmVhdGluZy9hcHBlbmRpbmcgZmluYWwgSFRNTCBlbGVtZW50cyA9PVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgY3JlYXRlVGFiQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmlkID0gdGhpcy5kaXZpZDtcbiAgICAgICAgJCh0aGlzLmNvbnRhaW5lckRpdikuYWRkQ2xhc3ModGhpcy5vcmlnRWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSk7XG4gICAgICAgICQodGhpcy5jb250YWluZXJEaXYpLmF0dHIoeyByb2xlOiBcInRhYnBhbmVsXCIgfSk7XG4gICAgICAgIHRoaXMudGFic1VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICB0aGlzLnRhYnNVTC5pZCA9IHRoaXMuZGl2aWQgKyBcIl90YWJcIjtcbiAgICAgICAgJCh0aGlzLnRhYnNVTCkuYWRkQ2xhc3MoXCJuYXYgbmF2LXRhYnNcIik7XG4gICAgICAgICQodGhpcy50YWJzVUwpLmF0dHIoeyByb2xlOiBcInRhYmxpc3RcIiB9KTtcbiAgICAgICAgdGhpcy50YWJDb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8gQ3JlYXRlIHRhYiBjb250ZW50IGNvbnRhaW5lciB0aGF0IGhvbGRzIHRhYiBwYW5lcyB3L2NvbnRlbnRcbiAgICAgICAgJCh0aGlzLnRhYkNvbnRlbnREaXYpLmFkZENsYXNzKFwidGFiLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlVGFicygpOyAvLyBjcmVhdGUgYW5kIGFwcGVuZCB0YWJzIHRvIHRoZSA8dWw+XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMudGFic1VMKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250ZW50RGl2KTtcbiAgICAgICAgdGhpcy5hZGRDTUQoKTsgLy8gQWRkcyBmdWN0aW9uYWxpdHkgZm9yIENvZGVtaXJyb3IvRGlzcXVzXG4gICAgICAgICQodGhpcy5vcmlnRWxlbSkucmVwbGFjZVdpdGgodGhpcy5jb250YWluZXJEaXYpO1xuICAgIH1cbiAgICBjcmVhdGVUYWJzKCkge1xuICAgICAgICAvLyBDcmVhdGUgdGFicyBpbiBmb3JtYXQgPGxpPjxhPjxzcGFuPjwvc3Bhbj48L2E+PC9saT4gdG8gYmUgYXBwZW5kZWQgdG8gdGhlIDx1bD5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gRmlyc3QgY3JlYXRlIHRhYm5hbWUgYW5kIHRhYmZyaWVuZGx5IG5hbWUgdGhhdCBoYXMgbm8gc3BhY2VzIHRvIGJlIHVzZWQgZm9yIHRoZSBpZFxuICAgICAgICAgICAgdmFyIHRhYkxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgJCh0YWJMaXN0RWxlbWVudCkuYXR0cih7XG4gICAgICAgICAgICAgICAgcm9sZTogXCJwcmVzZW50YXRpb25cIixcbiAgICAgICAgICAgICAgICBcImFyaWEtY29udHJvbHNcIjogdGhpcy5kaXZpZCArIFwiLVwiICsgaVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBVc2luZyBib290c3RyYXAgdGFicyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICB2YXIgdGFiRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgJCh0YWJFbGVtZW50KS5hdHRyKHtcbiAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwidGFiXCIsXG4gICAgICAgICAgICAgICAgaHJlZjogXCIjXCIgKyB0aGlzLmRpdmlkICsgXCItXCIgKyBpLFxuICAgICAgICAgICAgICAgIHJvbGU6IFwidGFiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7IC8vIFRpdGxlIG9mIHRhYi0td2hhdCB0aGUgdXNlciB3aWxsIHNlZVxuICAgICAgICAgICAgdGFiVGl0bGUudGV4dENvbnRlbnQgPSAkKHRoaXMuY2hpbGRUYWJzW2ldKS5kYXRhKFwidGFibmFtZVwiKTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiVGl0bGUpO1xuICAgICAgICAgICAgdGFiTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnRhYnNVTC5hcHBlbmRDaGlsZCh0YWJMaXN0RWxlbWVudCk7XG4gICAgICAgICAgICAvLyB0YWJQYW5lIGlzIHdoYXQgaG9sZHMgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YWJcbiAgICAgICAgICAgIHZhciB0YWJQYW5lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRhYlBhbmVEaXYuaWQgPSB0aGlzLmRpdmlkICsgXCItXCIgKyBpO1xuICAgICAgICAgICAgJCh0YWJQYW5lRGl2KS5hZGRDbGFzcyhcInRhYi1wYW5lXCIpO1xuICAgICAgICAgICAgJCh0YWJQYW5lRGl2KS5hdHRyKHtcbiAgICAgICAgICAgICAgICByb2xlOiBcInRhYnBhbmVsXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy92YXIgdGFiSFRNTCA9ICQodGhpcy5jaGlsZFRhYnNbaV0pLmh0bWwoKTtcbiAgICAgICAgICAgIC8vJCh0YWJQYW5lRGl2KS5odG1sKHRhYkhUTUwpO1xuICAgICAgICAgICAgdGFiUGFuZURpdi5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkVGFic1tpXSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVUYWIgPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0YWJMaXN0RWxlbWVudCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICQodGFiUGFuZURpdikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50b2dnbGVzTGlzdC5wdXNoKHRhYkVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy50YWJDb250ZW50RGl2LmFwcGVuZENoaWxkKHRhYlBhbmVEaXYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBDb2RlbWlycm9yL0Rpc3F1cyBmdW5jdGlvbmFsaXR5ID09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIGFkZENNRCgpIHtcbiAgICAgICAgJCh0aGlzLnRvZ2dsZXNMaXN0KS5vbihcInNob3duLmJzLnRhYlwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudF9kaXYgPSAkKGUudGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSk7XG4gICAgICAgICAgICBjb250ZW50X2Rpdi5maW5kKFwiLmRpc3F1c190aHJlYWRfbGlua1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGVudF9kaXYuZmluZChcIi5Db2RlTWlycm9yXCIpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5Db2RlTWlycm9yLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PSBGaW5kIHRoZSBjdXN0b20gSFRNTCB0YWdzIGFuZCA9PVxuPT0gICAgIGV4ZWN1dGUgb3VyIGNvZGUgb24gdGhlbSAgICAgICAgPT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4kKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAkKFwiW2RhdGEtY29tcG9uZW50PXRhYmJlZFN0dWZmXVwiKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIFRTTGlzdFt0aGlzLmlkXSA9IG5ldyBUYWJiZWRTdHVmZih7IG9yaWc6IHRoaXMgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==