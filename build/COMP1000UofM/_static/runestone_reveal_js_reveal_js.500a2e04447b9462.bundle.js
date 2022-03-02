"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_reveal_js_reveal_js"],{

/***/ 42573:
/*!*****************************************!*\
  !*** ./runestone/reveal/css/reveal.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 12632:
/*!***************************************!*\
  !*** ./runestone/reveal/js/reveal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase */ 2568);
/* harmony import */ var _css_reveal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/reveal.css */ 42573);
/*==========================================
=======      Master reveal.js       ========
============================================
===     This file contains the JS for    ===
===     the Runestone reval component.   ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/12/15               ===
==========================================*/


var RevealList = {}; // Dictionary that contains all instances of Reveal objects




// Define Reveal object
class Reveal extends _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <div> element that will be replaced by new HTML
        this.origElem = orig;
        this.divid = orig.id;
        this.dataModal = false; // is a model dialog vs. inline
        if ($(this.origElem).is("[data-modal]")) {
            this.dataModal = true;
        }
        if ($(this.origElem).is("[data-instructoronly]")) {
            this.instructorOnly = true;
        } else {
            this.instructorOnly = false;
        }
        this.modalTitle = null;
        this.showtitle = null; // Title of button that shows the concealed data
        this.hidetitle = null;
        this.origContent = $(this.origElem).html();
        this.children = [];
        this.adoptChildren();
        this.checkForTitle();
        this.getButtonTitles();
        // Delay creating instructoronly buttons until login
        if (!this.instructorOnly) {
            this.createShowButton();
            if (!this.dataModal) {
                this.createHideButton(); // Hide button is already implemented in modal dialog
            }
        }
        this.indicate_component_ready();
    }
    /*====================================
    == Get text for buttons/modal title ==
    ====================================*/
    adoptChildren() {
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            this.children.push(this.origElem.childNodes[i]);
        }
    }
    getButtonTitles() {
        this.showtitle = $(this.origElem).data("showtitle");
        if (this.showtitle === undefined) {
            this.showtitle = "Show"; // default
        }
        if (this.instructorOnly) {
            this.showtitle += " IG";
        }
        this.hidetitle = $(this.origElem).data("hidetitle");
        if (this.hidetitle === undefined) {
            this.hidetitle = "Hide"; // default
        }
    }
    checkForTitle() {
        this.modalTitle = $(this.origElem).data("title");
        if (this.modalTitle === undefined) {
            this.modalTitle = "Message from the author"; // default
        }
    }
    /*============================
    == Create show/hide buttons ==
    ============================*/
    createShowButton() {
        var _this = this;
        this.containerDiv = document.createElement("div"); // wrapper div
        this.containerDiv.id = this.divid;
        if (!this.dataModal) {
            this.revealDiv = document.createElement("div"); // Div that is hidden that contains content
            // Get original content, put it inside revealDiv and replace original div with revealDiv
            //$(this.revealDiv).html(this.origContent);
            for (var i = 0; i < this.children.length; i++) {
                this.revealDiv.appendChild(this.children[i]);
            }
            $(this.revealDiv).hide();
            this.containerDiv.appendChild(this.revealDiv);
        }
        if (this.instructorOnly) {
            $(this.revealDiv).addClass("iguide");
        }
        this.sbutt = document.createElement("button");
        $(this.sbutt).addClass("btn reveal_button");
        if (this.instructorOnly) {
            $(this.sbutt).addClass("btn-info");
        } else {
            $(this.sbutt).addClass("btn-default");
        }
        $(this.sbutt).css("margin-bottom", "10px");
        this.sbutt.textContent = this.showtitle;
        this.sbutt.id = this.divid + "_show";
        if (!this.dataModal) {
            this.sbutt.onclick = function () {
                _this.showInline();
                $(this).hide();
            };
        } else {
            this.createModal();
            $(this.sbutt).attr({
                "data-toggle": "modal",
                "data-target": "#" + this.divid + "_modal",
            });
        }
        this.containerDiv.appendChild(this.sbutt);
        $(this.origElem).replaceWith(this.containerDiv);
    }
    createHideButton() {
        var _this = this;
        this.hbutt = document.createElement("button");
        $(this.hbutt).hide();
        this.hbutt.textContent = this.hidetitle;
        this.hbutt.className = "btn btn-default reveal_button";
        $(this.hbutt).css("margin-bottom", "10px");
        this.hbutt.id = this.divid + "_hide";
        this.hbutt.onclick = function () {
            _this.hideInline();
            $(this).hide();
        };
        this.containerDiv.appendChild(this.hbutt);
    }
    createInstructorButtons() {
        this.createShowButton();
        if (!this.dataModal) {
            this.createHideButton();
        }
    }
    /*=================
    === Modal logic ===
    =================*/
    createModal() {
        this.modalContainerDiv = document.createElement("div");
        $(this.modalContainerDiv).addClass("modal fade");
        this.modalContainerDiv.id = this.divid + "_modal";
        $(this.modalContainerDiv).attr("role", "dialog");
        document.body.appendChild(this.modalContainerDiv);
        this.modalDialogDiv = document.createElement("div");
        $(this.modalDialogDiv).addClass("modal-dialog");
        this.modalContainerDiv.appendChild(this.modalDialogDiv);
        this.modalContentDiv = document.createElement("div");
        $(this.modalContentDiv).addClass("modal-content");
        this.modalDialogDiv.appendChild(this.modalContentDiv);
        this.modalHeaderDiv = document.createElement("div");
        $(this.modalHeaderDiv).addClass("modal-header");
        this.modalContentDiv.appendChild(this.modalHeaderDiv);
        this.modalButton = document.createElement("button");
        this.modalButton.type = "button";
        $(this.modalButton).addClass("close");
        $(this.modalButton).attr({
            "aria-hidden": "true",
            "data-dismiss": "modal",
        });
        this.modalButton.innerHTML = "&times";
        this.modalHeaderDiv.appendChild(this.modalButton);
        this.modalTitleE = document.createElement("h4");
        $(this.modalTitleE).addClass("modal-title");
        this.modalTitleE.innerHTML = this.modalTitle;
        this.modalHeaderDiv.appendChild(this.modalTitleE);
        this.modalBody = document.createElement("div");
        $(this.modalBody).addClass("modal-body");
        for (var i = 0; i < this.children.length; i++) {
            this.modalBody.appendChild(this.children[i]);
        }
        this.modalContentDiv.appendChild(this.modalBody);
        /*var html = "<div class='modal fade'>" +
                    "    <div class='modal-dialog compare-modal'>" +
                    "        <div class='modal-content'>" +
                    "            <div class='modal-header'>" +
                    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
                    "                <h4 class='modal-title'>" + this.modalTitle + "</h4>" +
                    "            </div>" +
                    "            <div class='modal-body'>" +
                    this.origContent +
                    "            </div>" +
                    "        </div>" +
                    "    </div>" +
                    "</div>";*/
        //var el = $(this.modalContainerDiv);
        //el.modal();
    }
    /*==================
    === Inline logic ===
    ==================*/
    showInline() {
        $(this.revealDiv).show();
        $(this.hbutt).show();
        $(this.revealDiv)
            .find(".CodeMirror")
            .each(function (i, el) {
                el.CodeMirror.refresh();
            });
    }
    hideInline() {
        $(this.revealDiv).hide();
        $(this.sbutt).show();
    }
}

/*=================================
== Find the custom HTML tags and ==
==     execute our code on them        ==
=================================*/

$(document).bind("runestone:login-complete", function () {
    $("[data-component=reveal]").each(function (index) {
        try {
            RevealList[this.id] = new Reveal({ orig: this });
        } catch (err) {
            console.log(`Error rendering Reveal ${this.id}`);
        }
    });

    if (eBookConfig.isInstructor) {
        for (const divid of Object.keys(RevealList)) {
            if (RevealList[divid].instructorOnly) {
                RevealList[divid].createInstructorButtons();
            }
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3JldmVhbF9qc19yZXZlYWxfanMuNTAwYTJlMDQ0NDdiOTQ2Mi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7O0FBRWIscUJBQXFCOztBQUVxQztBQUMvQjs7QUFFM0I7QUFDQSxxQkFBcUIsZ0VBQWE7QUFDbEM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUNBQXFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3SEFBd0g7QUFDeEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxZQUFZO0FBQzNELFVBQVU7QUFDVixrREFBa0QsUUFBUTtBQUMxRDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9yZXZlYWwvY3NzL3JldmVhbC5jc3M/NTJkNSIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL3JldmVhbC9qcy9yZXZlYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PT09PT0gICAgICBNYXN0ZXIgcmV2ZWFsLmpzICAgICAgID09PT09PT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT09ICAgICBUaGlzIGZpbGUgY29udGFpbnMgdGhlIEpTIGZvciAgICA9PT1cbj09PSAgICAgdGhlIFJ1bmVzdG9uZSByZXZhbCBjb21wb25lbnQuICAgPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT09ICAgICAgICAgICAgICBDcmVhdGVkIGJ5ICAgICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgSXNhaWFoIE1heWVyY2hhayAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgICAgICAwNi8xMi8xNSAgICAgICAgICAgICAgID09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgUmV2ZWFsTGlzdCA9IHt9OyAvLyBEaWN0aW9uYXJ5IHRoYXQgY29udGFpbnMgYWxsIGluc3RhbmNlcyBvZiBSZXZlYWwgb2JqZWN0c1xuXG5pbXBvcnQgUnVuZXN0b25lQmFzZSBmcm9tIFwiLi4vLi4vY29tbW9uL2pzL3J1bmVzdG9uZWJhc2VcIjtcbmltcG9ydCBcIi4uL2Nzcy9yZXZlYWwuY3NzXCI7XG5cbi8vIERlZmluZSBSZXZlYWwgb2JqZWN0XG5jbGFzcyBSZXZlYWwgZXh0ZW5kcyBSdW5lc3RvbmVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB2YXIgb3JpZyA9IG9wdHMub3JpZzsgLy8gZW50aXJlIDxkaXY+IGVsZW1lbnQgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGJ5IG5ldyBIVE1MXG4gICAgICAgIHRoaXMub3JpZ0VsZW0gPSBvcmlnO1xuICAgICAgICB0aGlzLmRpdmlkID0gb3JpZy5pZDtcbiAgICAgICAgdGhpcy5kYXRhTW9kYWwgPSBmYWxzZTsgLy8gaXMgYSBtb2RlbCBkaWFsb2cgdnMuIGlubGluZVxuICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtKS5pcyhcIltkYXRhLW1vZGFsXVwiKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhTW9kYWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmlzKFwiW2RhdGEtaW5zdHJ1Y3Rvcm9ubHldXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RydWN0b3JPbmx5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rvck9ubHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsVGl0bGUgPSBudWxsO1xuICAgICAgICB0aGlzLnNob3d0aXRsZSA9IG51bGw7IC8vIFRpdGxlIG9mIGJ1dHRvbiB0aGF0IHNob3dzIHRoZSBjb25jZWFsZWQgZGF0YVxuICAgICAgICB0aGlzLmhpZGV0aXRsZSA9IG51bGw7XG4gICAgICAgIHRoaXMub3JpZ0NvbnRlbnQgPSAkKHRoaXMub3JpZ0VsZW0pLmh0bWwoKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLmFkb3B0Q2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5jaGVja0ZvclRpdGxlKCk7XG4gICAgICAgIHRoaXMuZ2V0QnV0dG9uVGl0bGVzKCk7XG4gICAgICAgIC8vIERlbGF5IGNyZWF0aW5nIGluc3RydWN0b3Jvbmx5IGJ1dHRvbnMgdW50aWwgbG9naW5cbiAgICAgICAgaWYgKCF0aGlzLmluc3RydWN0b3JPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNob3dCdXR0b24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYXRhTW9kYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUhpZGVCdXR0b24oKTsgLy8gSGlkZSBidXR0b24gaXMgYWxyZWFkeSBpbXBsZW1lbnRlZCBpbiBtb2RhbCBkaWFsb2dcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGljYXRlX2NvbXBvbmVudF9yZWFkeSgpO1xuICAgIH1cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgID09IEdldCB0ZXh0IGZvciBidXR0b25zL21vZGFsIHRpdGxlID09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBhZG9wdENoaWxkcmVuKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3JpZ0VsZW0uY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHRoaXMub3JpZ0VsZW0uY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QnV0dG9uVGl0bGVzKCkge1xuICAgICAgICB0aGlzLnNob3d0aXRsZSA9ICQodGhpcy5vcmlnRWxlbSkuZGF0YShcInNob3d0aXRsZVwiKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd3RpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd3RpdGxlID0gXCJTaG93XCI7IC8vIGRlZmF1bHRcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnN0cnVjdG9yT25seSkge1xuICAgICAgICAgICAgdGhpcy5zaG93dGl0bGUgKz0gXCIgSUdcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGV0aXRsZSA9ICQodGhpcy5vcmlnRWxlbSkuZGF0YShcImhpZGV0aXRsZVwiKTtcbiAgICAgICAgaWYgKHRoaXMuaGlkZXRpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZXRpdGxlID0gXCJIaWRlXCI7IC8vIGRlZmF1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0ZvclRpdGxlKCkge1xuICAgICAgICB0aGlzLm1vZGFsVGl0bGUgPSAkKHRoaXMub3JpZ0VsZW0pLmRhdGEoXCJ0aXRsZVwiKTtcbiAgICAgICAgaWYgKHRoaXMubW9kYWxUaXRsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsVGl0bGUgPSBcIk1lc3NhZ2UgZnJvbSB0aGUgYXV0aG9yXCI7IC8vIGRlZmF1bHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBDcmVhdGUgc2hvdy9oaWRlIGJ1dHRvbnMgPT1cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBjcmVhdGVTaG93QnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIHdyYXBwZXIgZGl2XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmlkID0gdGhpcy5kaXZpZDtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFNb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5yZXZlYWxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvLyBEaXYgdGhhdCBpcyBoaWRkZW4gdGhhdCBjb250YWlucyBjb250ZW50XG4gICAgICAgICAgICAvLyBHZXQgb3JpZ2luYWwgY29udGVudCwgcHV0IGl0IGluc2lkZSByZXZlYWxEaXYgYW5kIHJlcGxhY2Ugb3JpZ2luYWwgZGl2IHdpdGggcmV2ZWFsRGl2XG4gICAgICAgICAgICAvLyQodGhpcy5yZXZlYWxEaXYpLmh0bWwodGhpcy5vcmlnQ29udGVudCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVhbERpdi5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5yZXZlYWxEaXYpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMucmV2ZWFsRGl2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnN0cnVjdG9yT25seSkge1xuICAgICAgICAgICAgJCh0aGlzLnJldmVhbERpdikuYWRkQ2xhc3MoXCJpZ3VpZGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYnV0dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICQodGhpcy5zYnV0dCkuYWRkQ2xhc3MoXCJidG4gcmV2ZWFsX2J1dHRvblwiKTtcbiAgICAgICAgaWYgKHRoaXMuaW5zdHJ1Y3Rvck9ubHkpIHtcbiAgICAgICAgICAgICQodGhpcy5zYnV0dCkuYWRkQ2xhc3MoXCJidG4taW5mb1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcy5zYnV0dCkuYWRkQ2xhc3MoXCJidG4tZGVmYXVsdFwiKTtcbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMuc2J1dHQpLmNzcyhcIm1hcmdpbi1ib3R0b21cIiwgXCIxMHB4XCIpO1xuICAgICAgICB0aGlzLnNidXR0LnRleHRDb250ZW50ID0gdGhpcy5zaG93dGl0bGU7XG4gICAgICAgIHRoaXMuc2J1dHQuaWQgPSB0aGlzLmRpdmlkICsgXCJfc2hvd1wiO1xuICAgICAgICBpZiAoIXRoaXMuZGF0YU1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLnNidXR0Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd0lubGluZSgpO1xuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9kYWwoKTtcbiAgICAgICAgICAgICQodGhpcy5zYnV0dCkuYXR0cih7XG4gICAgICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNcIiArIHRoaXMuZGl2aWQgKyBcIl9tb2RhbFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5zYnV0dCk7XG4gICAgICAgICQodGhpcy5vcmlnRWxlbSkucmVwbGFjZVdpdGgodGhpcy5jb250YWluZXJEaXYpO1xuICAgIH1cbiAgICBjcmVhdGVIaWRlQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmhidXR0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgJCh0aGlzLmhidXR0KS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaGJ1dHQudGV4dENvbnRlbnQgPSB0aGlzLmhpZGV0aXRsZTtcbiAgICAgICAgdGhpcy5oYnV0dC5jbGFzc05hbWUgPSBcImJ0biBidG4tZGVmYXVsdCByZXZlYWxfYnV0dG9uXCI7XG4gICAgICAgICQodGhpcy5oYnV0dCkuY3NzKFwibWFyZ2luLWJvdHRvbVwiLCBcIjEwcHhcIik7XG4gICAgICAgIHRoaXMuaGJ1dHQuaWQgPSB0aGlzLmRpdmlkICsgXCJfaGlkZVwiO1xuICAgICAgICB0aGlzLmhidXR0Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5oaWRlSW5saW5lKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5oYnV0dCk7XG4gICAgfVxuICAgIGNyZWF0ZUluc3RydWN0b3JCdXR0b25zKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVNob3dCdXR0b24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFNb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVIaWRlQnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyo9PT09PT09PT09PT09PT09PVxuICAgID09PSBNb2RhbCBsb2dpYyA9PT1cbiAgICA9PT09PT09PT09PT09PT09PSovXG4gICAgY3JlYXRlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWxDb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAkKHRoaXMubW9kYWxDb250YWluZXJEaXYpLmFkZENsYXNzKFwibW9kYWwgZmFkZVwiKTtcbiAgICAgICAgdGhpcy5tb2RhbENvbnRhaW5lckRpdi5pZCA9IHRoaXMuZGl2aWQgKyBcIl9tb2RhbFwiO1xuICAgICAgICAkKHRoaXMubW9kYWxDb250YWluZXJEaXYpLmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWxDb250YWluZXJEaXYpO1xuICAgICAgICB0aGlzLm1vZGFsRGlhbG9nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgJCh0aGlzLm1vZGFsRGlhbG9nRGl2KS5hZGRDbGFzcyhcIm1vZGFsLWRpYWxvZ1wiKTtcbiAgICAgICAgdGhpcy5tb2RhbENvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsRGlhbG9nRGl2KTtcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAkKHRoaXMubW9kYWxDb250ZW50RGl2KS5hZGRDbGFzcyhcIm1vZGFsLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMubW9kYWxEaWFsb2dEaXYuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbENvbnRlbnREaXYpO1xuICAgICAgICB0aGlzLm1vZGFsSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgJCh0aGlzLm1vZGFsSGVhZGVyRGl2KS5hZGRDbGFzcyhcIm1vZGFsLWhlYWRlclwiKTtcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnREaXYuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbEhlYWRlckRpdik7XG4gICAgICAgIHRoaXMubW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLm1vZGFsQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICAkKHRoaXMubW9kYWxCdXR0b24pLmFkZENsYXNzKFwiY2xvc2VcIik7XG4gICAgICAgICQodGhpcy5tb2RhbEJ1dHRvbikuYXR0cih7XG4gICAgICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSBcIiZ0aW1lc1wiO1xuICAgICAgICB0aGlzLm1vZGFsSGVhZGVyRGl2LmFwcGVuZENoaWxkKHRoaXMubW9kYWxCdXR0b24pO1xuICAgICAgICB0aGlzLm1vZGFsVGl0bGVFID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgICAgICAkKHRoaXMubW9kYWxUaXRsZUUpLmFkZENsYXNzKFwibW9kYWwtdGl0bGVcIik7XG4gICAgICAgIHRoaXMubW9kYWxUaXRsZUUuaW5uZXJIVE1MID0gdGhpcy5tb2RhbFRpdGxlO1xuICAgICAgICB0aGlzLm1vZGFsSGVhZGVyRGl2LmFwcGVuZENoaWxkKHRoaXMubW9kYWxUaXRsZUUpO1xuICAgICAgICB0aGlzLm1vZGFsQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICQodGhpcy5tb2RhbEJvZHkpLmFkZENsYXNzKFwibW9kYWwtYm9keVwiKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQm9keS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudERpdi5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsQm9keSk7XG4gICAgICAgIC8qdmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9J21vZGFsIGZhZGUnPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgPGRpdiBjbGFzcz0nbW9kYWwtZGlhbG9nIGNvbXBhcmUtbW9kYWwnPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgIDxkaXYgY2xhc3M9J21vZGFsLWNvbnRlbnQnPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdjbG9zZScgZGF0YS1kaXNtaXNzPSdtb2RhbCcgYXJpYS1oaWRkZW49J3RydWUnPiZ0aW1lczs8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICAgICAgICAgIDxoNCBjbGFzcz0nbW9kYWwtdGl0bGUnPlwiICsgdGhpcy5tb2RhbFRpdGxlICsgXCI8L2g0PlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICAgICA8L2Rpdj5cIiArXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICAgICAgPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+XCIgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yaWdDb250ZW50ICtcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICAgICA8L2Rpdj5cIiArXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICA8L2Rpdj5cIiArXG4gICAgICAgICAgICAgICAgICAgIFwiICAgIDwvZGl2PlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIjsqL1xuICAgICAgICAvL3ZhciBlbCA9ICQodGhpcy5tb2RhbENvbnRhaW5lckRpdik7XG4gICAgICAgIC8vZWwubW9kYWwoKTtcbiAgICB9XG4gICAgLyo9PT09PT09PT09PT09PT09PT1cbiAgICA9PT0gSW5saW5lIGxvZ2ljID09PVxuICAgID09PT09PT09PT09PT09PT09PSovXG4gICAgc2hvd0lubGluZSgpIHtcbiAgICAgICAgJCh0aGlzLnJldmVhbERpdikuc2hvdygpO1xuICAgICAgICAkKHRoaXMuaGJ1dHQpLnNob3coKTtcbiAgICAgICAgJCh0aGlzLnJldmVhbERpdilcbiAgICAgICAgICAgIC5maW5kKFwiLkNvZGVNaXJyb3JcIilcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgIGVsLkNvZGVNaXJyb3IucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGhpZGVJbmxpbmUoKSB7XG4gICAgICAgICQodGhpcy5yZXZlYWxEaXYpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzLnNidXR0KS5zaG93KCk7XG4gICAgfVxufVxuXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT0gRmluZCB0aGUgY3VzdG9tIEhUTUwgdGFncyBhbmQgPT1cbj09ICAgICBleGVjdXRlIG91ciBjb2RlIG9uIHRoZW0gICAgICAgID09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4kKGRvY3VtZW50KS5iaW5kKFwicnVuZXN0b25lOmxvZ2luLWNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiW2RhdGEtY29tcG9uZW50PXJldmVhbF1cIikuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJldmVhbExpc3RbdGhpcy5pZF0gPSBuZXcgUmV2ZWFsKHsgb3JpZzogdGhpcyB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgcmVuZGVyaW5nIFJldmVhbCAke3RoaXMuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChlQm9va0NvbmZpZy5pc0luc3RydWN0b3IpIHtcbiAgICAgICAgZm9yIChjb25zdCBkaXZpZCBvZiBPYmplY3Qua2V5cyhSZXZlYWxMaXN0KSkge1xuICAgICAgICAgICAgaWYgKFJldmVhbExpc3RbZGl2aWRdLmluc3RydWN0b3JPbmx5KSB7XG4gICAgICAgICAgICAgICAgUmV2ZWFsTGlzdFtkaXZpZF0uY3JlYXRlSW5zdHJ1Y3RvckJ1dHRvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9