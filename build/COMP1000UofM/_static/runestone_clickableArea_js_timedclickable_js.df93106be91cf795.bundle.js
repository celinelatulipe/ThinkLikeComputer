"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_clickableArea_js_timedclickable_js"],{

/***/ 51168:
/*!***************************************************!*\
  !*** ./runestone/clickableArea/css/clickable.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5464:
/*!*************************************************!*\
  !*** ./runestone/clickableArea/js/clickable.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CAList": () => (/* binding */ CAList),
/* harmony export */   "default": () => (/* binding */ ClickableArea)
/* harmony export */ });
/* harmony import */ var _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase.js */ 2568);
/* harmony import */ var _css_clickable_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/clickable.css */ 51168);
/*==========================================
=======     Master clickable.js     ========
============================================
===   This file contains the JS for the  ===
===  Runestone clickable area component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/1/15                ===
==========================================*/





var CAList = {}; // Object that contains all instances of ClickableArea objects

class ClickableArea extends _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <div> element that will be replaced by new HTML
        this.origElem = orig;
        this.divid = orig.id;
        this.useRunestoneServices = opts.useRunestoneServices;
        this.clickableArray = []; // holds all clickable elements
        this.correctArray = []; // holds the IDs of all correct clickable span elements, used for eval
        this.incorrectArray = []; // holds IDs of all incorrect clickable span elements, used for eval
        //For use with Sphinx-rendered html
        this.isTable = false;
        if ($(this.origElem).data("cc") !== undefined) {
            if ($(this.origElem).is("[data-table]")) {
                this.isTable = true;
                this.ccArray = $(this.origElem).data("cc").split(";");
                this.ciArray = $(this.origElem).data("ci").split(";");
            } else {
                this.ccArray = $(this.origElem).data("cc").split(",");
                this.ciArray = $(this.origElem).data("ci").split(",");
            }
        }
        // For use in the recursive replace function
        this.clickIndex = 0; // Index of this.clickedIndexArray that we're checking against
        this.clickableCounter = 0; // Index of the current clickable element
        this.getQuestion();
        this.getFeedback();
        this.renderNewElements();
        this.caption = "Clickable";
        this.addCaption("runestone");
        this.checkServer("clickableArea", true);
    }
    /*===========================
    == Update basic attributes ==
    ===========================*/
    getQuestion() {
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            if ($(this.origElem.childNodes[i]).is("[data-question]")) {
                this.question = this.origElem.childNodes[i];
                break;
            }
        }
    }
    getFeedback() {
        this.feedback = "";
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            if ($(this.origElem.childNodes[i]).is("[data-feedback]")) {
                this.feedback = this.origElem.childNodes[i];
            }
        }
        if (this.feedback !== "") {
            // Get the feedback element out of the container if the user has defined feedback
            $(this.feedback).remove();
            this.feedback = this.feedback.innerHTML;
        }
    }
    /*===========================================
    ====   Functions generating final HTML   ====
    ===========================================*/
    renderNewElements() {
        // wrapper function for generating everything
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.origElem.id;
        this.containerDiv.appendChild(this.question);
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
        this.newDiv = document.createElement("div");
        var newContent = $(this.origElem).html();
        while (newContent[0] === "\n") {
            newContent = newContent.slice(1);
        }
        this.newDiv.innerHTML = newContent;
        this.containerDiv.appendChild(this.newDiv);
        this.createButtons();
        this.createFeedbackDiv();
        $(this.origElem).replaceWith(this.containerDiv);
    }
    createButtons() {
        this.submitButton = document.createElement("button"); // Check me button
        this.submitButton.textContent = "Check Me";
        $(this.submitButton).attr({
            class: "btn btn-success",
            name: "do answer",
            type: "button",
        });
        this.submitButton.onclick = function () {
            this.checkCurrentAnswer();
            this.logCurrentAnswer();
            this.renderFeedback();
        }.bind(this);
        this.containerDiv.appendChild(this.submitButton);
    }
    createFeedbackDiv() {
        this.feedBackDiv = document.createElement("div");
        this.containerDiv.appendChild(document.createElement("br"));
        this.containerDiv.appendChild(this.feedBackDiv);
    }
    /*===================================
    === Checking/restoring from storage ===
    ===================================*/
    restoreAnswers(data) {
        // Restore answers from storage retrieval done in RunestoneBase or from local storage
        if (data.answer !== undefined) {
            // if we got data from the server
            this.hasStoredAnswers = true;
            this.clickedIndexArray = data.answer.split(";");
        }
        if (this.ccArray === undefined) {
            this.modifyClickables(this.newDiv.childNodes);
        } else {
            // For use with Sphinx-rendered HTML
            this.ccCounter = 0;
            this.ccIndex = 0;
            this.ciIndex = 0;
            if (!this.isTable) {
                this.modifyViaCC(this.newDiv.children);
            } else {
                this.modifyTableViaCC(this.newDiv.children);
            }
        }
    }
    checkLocalStorage() {
        if (this.graderactive) {
            return;
        }
        var storageObj;
        // Gets previous answer data from local storage if it exists
        this.hasStoredAnswers = false;
        var len = localStorage.length;
        if (len > 0) {
            var ex = localStorage.getItem(this.localStorageKey());
            if (ex !== null) {
                this.hasStoredAnswers = true;
                try {
                    storageObj = JSON.parse(ex);
                    this.clickedIndexArray = storageObj.answer.split(";");
                } catch (err) {
                    // error while parsing; likely due to bad value stored in storage
                    console.log(err.message);
                    localStorage.removeItem(this.localStorageKey());
                    this.hasStoredAnswers = false;
                    this.restoreAnswers({});
                    return;
                }
                if (this.useRunestoneServices) {
                    // log answer to server
                    this.givenIndexArray = [];
                    for (var i = 0; i < this.clickableArray.length; i++) {
                        if (
                            $(this.clickableArray[i]).hasClass(
                                "clickable-clicked"
                            )
                        ) {
                            this.givenIndexArray.push(i);
                        }
                    }
                    this.logBookEvent({
                        event: "clickableArea",
                        act: this.clickedIndexArray.join(";"),
                        div_id: this.divid,
                        correct: storageObj.correct,
                    });
                }
            }
        }
        this.restoreAnswers({}); // pass empty object
    }
    setLocalStorage(data) {
        // Array of the indices of clicked elements is passed to local storage
        var answer;
        if (data.answer !== undefined) {
            // If we got data from the server, we can just use that
            answer = this.clickedIndexArray.join(";");
        } else {
            this.givenIndexArray = [];
            for (var i = 0; i < this.clickableArray.length; i++) {
                if ($(this.clickableArray[i]).hasClass("clickable-clicked")) {
                    this.givenIndexArray.push(i);
                }
            }
            answer = this.givenIndexArray.join(";");
        }
        var timeStamp = new Date();
        var correct = data.correct;
        var storageObject = {
            answer: answer,
            correct: correct,
            timestamp: timeStamp,
        };
        localStorage.setItem(
            this.localStorageKey(),
            JSON.stringify(storageObject)
        );
    }
    /*==========================
    === Auxilliary functions ===
    ==========================*/
    modifyClickables(childNodes) {
        // Strips the data-correct/data-incorrect labels and updates the correct/incorrect arrays
        for (var i = 0; i < childNodes.length; i++) {
            if (
                $(childNodes[i]).is("[data-correct]") ||
                $(childNodes[i]).is("[data-incorrect]")
            ) {
                this.manageNewClickable(childNodes[i]);
                if ($(childNodes[i]).is("[data-correct]")) {
                    $(childNodes[i]).removeAttr("data-correct");
                    this.correctArray.push(childNodes[i]);
                } else {
                    $(childNodes[i]).removeAttr("data-incorrect");
                    this.incorrectArray.push(childNodes[i]);
                }
            }
            if (childNodes[i].childNodes.length !== 0) {
                this.modifyClickables(childNodes[i].childNodes);
            }
        }
    }
    modifyViaCC(children) {
        for (var i = 0; i < children.length; i++) {
            if (children[i].children.length !== 0) {
                this.modifyViaCC(children[i].children);
            } else {
                this.ccCounter++;
                if (this.ccCounter === Math.floor(this.ccArray[this.ccIndex])) {
                    this.manageNewClickable(children[i]);
                    this.correctArray.push(children[i]);
                    this.ccIndex++;
                } else if (
                    this.ccCounter === Math.floor(this.ciArray[this.ciIndex])
                ) {
                    this.manageNewClickable(children[i]);
                    this.incorrectArray.push(children[i]);
                    this.ciIndex++;
                }
            }
        }
    }
    modifyTableViaCC(children) {
        // table version of modifyViaCC
        var tComponentArr = [];
        for (let i = 0; i < children.length; i++) {
            if (children[i].nodeName === "TABLE") {
                let tmp = children[i];
                for (let j = 0; j < tmp.children.length; j++) {
                    if (tmp.children[j].nodeName === "THEAD") {
                        tComponentArr.push(tmp.children[j]);
                    } else if (tmp.children[j].nodeName === "TBODY") {
                        tComponentArr.push(tmp.children[j]);
                    } else if (tmp.children[j].nodeName === "TFOOT") {
                        tComponentArr.push(tmp.children[j]);
                    }
                }
            }
        }
        for (var t = 0; t < tComponentArr.length; t++) {
            for (let i = 0; i < tComponentArr[t].children.length; i++) {
                this.ccCounter++;
                // First check if the entire row needs to be clickable
                if (
                    this.ccIndex < this.ccArray.length &&
                    this.ccCounter ===
                    Math.floor(this.ccArray[this.ccIndex].split(",")[0]) &&
                    Math.floor(this.ccArray[this.ccIndex].split(",")[1]) === 0
                ) {
                    this.manageNewClickable(tComponentArr[t].children[i]);
                    this.correctArray.push(tComponentArr[t].children[i]);
                    this.ccIndex++;
                } else if (
                    this.ciIndex < this.ciArray.length &&
                    this.ccCounter ===
                    Math.floor(this.ciArray[this.ciIndex].split(",")[0]) &&
                    Math.floor(this.ciArray[this.ciIndex].split(",")[1]) === 0
                ) {
                    this.manageNewClickable(tComponentArr[t].children[i]);
                    this.incorrectArray.push(tComponentArr[t].children[i]);
                    this.ciIndex++;
                } else {
                    // If not, check the individual data cells
                    for (
                        let j = 0;
                        j < tComponentArr[t].children[i].children.length;
                        j++
                    ) {
                        let tmp = j + 1;
                        if (
                            this.ccIndex < this.ccArray.length &&
                            tmp ===
                            Math.floor(
                                this.ccArray[this.ccIndex].split(",")[1]
                            ) &&
                            this.ccCounter ===
                            Math.floor(
                                this.ccArray[this.ccIndex].split(",")[0]
                            )
                        ) {
                            this.manageNewClickable(
                                tComponentArr[t].children[i].children[j]
                            );
                            this.correctArray.push(
                                tComponentArr[t].children[i].children[j]
                            );
                            this.ccIndex++;
                        } else if (
                            this.ciIndex < this.ciArray.length &&
                            tmp ===
                            Math.floor(
                                this.ciArray[this.ciIndex].split(",")[1]
                            ) &&
                            this.ccCounter ===
                            Math.floor(
                                this.ciArray[this.ciIndex].split(",")[0]
                            )
                        ) {
                            this.manageNewClickable(
                                tComponentArr[t].children[i].children[j]
                            );
                            this.incorrectArray.push(
                                tComponentArr[t].children[i].children[j]
                            );
                            this.ciIndex++;
                        }
                    }
                }
            }
        }
    }
    manageNewClickable(clickable) {
        // adds the "clickable" functionality
        $(clickable).addClass("clickable");
        if (this.hasStoredAnswers) {
            // Check if the element we're about to append to the pre was in local storage as clicked via its index
            if (
                this.clickedIndexArray[this.clickIndex].toString() ===
                this.clickableCounter.toString()
            ) {
                $(clickable).addClass("clickable-clicked");
                this.clickIndex++;
                if (this.clickIndex === this.clickedIndexArray.length) {
                    // Stop doing this if the index array is used up
                    this.hasStoredAnswers = false;
                }
            }
        }
        let self = this;
        clickable.onclick = function () {
            self.isAnswered = true;
            if ($(this).hasClass("clickable-clicked")) {
                $(this).removeClass("clickable-clicked");
                $(this).removeClass("clickable-incorrect");
            } else {
                $(this).addClass("clickable-clicked");
            }
        };
        this.clickableArray.push(clickable);
        this.clickableCounter++;
    }
    /*======================================
    == Evaluation and displaying feedback ==
    ======================================*/
    checkCurrentAnswer() {
        // Evaluation is done by iterating over the correct/incorrect arrays and checking by class
        this.correct = true;
        this.correctNum = 0;
        this.incorrectNum = 0;
        for (let i = 0; i < this.correctArray.length; i++) {
            if (!$(this.correctArray[i]).hasClass("clickable-clicked")) {
                this.correct = false;
            } else {
                this.correctNum++;
            }
        }
        for (let i = 0; i < this.incorrectArray.length; i++) {
            if ($(this.incorrectArray[i]).hasClass("clickable-clicked")) {
                this.correct = false;
                this.incorrectNum++;
            } else {
                $(this.incorrectArray[i]).removeClass("clickable-incorrect");
            }
        }
        this.percent =
            (this.correctNum - this.incorrectNum) / this.correctArray.length;
        this.setLocalStorage({ correct: this.correct ? "T" : "F" });
    }

    async logCurrentAnswer(sid) {
        const answer = this.givenIndexArray.join(";");
        let data = {
            event: "clickableArea",
            answer: answer,
            act: answer,
            div_id: this.divid,
            correct: this.correct ? "T" : "F",
        };
        if (typeof sid !== "undefined") {
            data.sid = sid;
        }
        await this.logBookEvent(data);
    }

    renderFeedback() {
        if (this.correct) {
            $(this.feedBackDiv).html("You are Correct!");
            $(this.feedBackDiv).attr("class", "alert alert-info");
        } else {
            for (let i = 0; i < this.incorrectArray.length; i++) {
                if ($(this.incorrectArray[i]).hasClass("clickable-clicked")) {
                    $(this.incorrectArray[i]).addClass("clickable-incorrect");
                } else {
                    $(this.incorrectArray[i]).removeClass(
                        "clickable-incorrect"
                    );
                }
            }
            $(this.feedBackDiv).html(
                "Incorrect. You clicked on " +
                this.correctNum +
                " of the " +
                this.correctArray.length.toString() +
                " correct elements and " +
                this.incorrectNum +
                " of the " +
                this.incorrectArray.length.toString() +
                " incorrect elements. " +
                this.feedback
            );
            $(this.feedBackDiv).attr("class", "alert alert-danger");
        }
    }

    disableInteraction() {
        for (var i = 0; i < this.clickableArray.length; i++) {
            $(this.clickableArray[i]).css("cursor", "initial");
            this.clickableArray[i].onclick = function () {
                return;
            };
        }
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=clickablearea]").each(function (index) {
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            try {
                CAList[this.id] = new ClickableArea({
                    orig: this,
                    useRunestoneServices: eBookConfig.useRunestoneServices,
                });
            } catch (err) {
                console.log(`Error rendering ClickableArea Problem ${this.id}
                             Details: ${err}`);
            }
        }
    });
});


/***/ }),

/***/ 61581:
/*!******************************************************!*\
  !*** ./runestone/clickableArea/js/timedclickable.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimedClickableArea)
/* harmony export */ });
/* harmony import */ var _clickable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickable.js */ 5464);


("use strict");

class TimedClickableArea extends _clickable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        this.restoreAnswers({});
        this.renderTimedIcon(this.containerDiv);
        this.hideButtons();
    }

    hideButtons() {
        $(this.submitButton).hide();
    }

    renderTimedIcon(component) {
        // renders the clock icon on timed components.    The component parameter
        // is the element that the icon should be appended to.
        var timeIconDiv = document.createElement("div");
        var timeIcon = document.createElement("img");
        $(timeIcon).attr({
            src: "../_static/clock.png",
            style: "width:15px;height:15px",
        });
        timeIconDiv.className = "timeTip";
        timeIconDiv.title = "";
        timeIconDiv.appendChild(timeIcon);
        $(component).prepend(timeIconDiv);
    }

    checkCorrectTimed() {
        // Returns if the question was correct, incorrect, or skipped (return null in the last case)
        if (this.correctNum === 0 && this.incorrectNum === 0) {
            this.correct = null;
        }
        switch (this.correct) {
            case true:
                return "T";
            case false:
                return "F";
            default:
                return null;
        }
    }

    hideFeedback() {
        $(this.feedBackDiv).hide();
    }
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory.clickablearea = function (opts) {
    if (opts.timed) {
        return new TimedClickableArea(opts);
    }
    return new _clickable_js__WEBPACK_IMPORTED_MODULE_0__["default"](opts);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2NsaWNrYWJsZUFyZWFfanNfdGltZWRjbGlja2FibGVfanMuZGY5MzEwNmJlOTFjZjc5NS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUVnRDtBQUMvQjs7QUFFdkIsaUJBQWlCOztBQUVULDRCQUE0QixtRUFBYTtBQUN4RDtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkUsbUVBQW1FO0FBQ25FLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBLFVBQVU7QUFDViw0QkFBNEIsZ0NBQWdDO0FBQzVEO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixnQ0FBZ0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxxRUFBcUU7QUFDckUsd0NBQXdDLElBQUk7QUFDNUM7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM2QwQzs7QUFFM0M7O0FBRWUsaUNBQWlDLHFEQUFhO0FBQzdEO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxREFBYTtBQUM1QiIsInNvdXJjZXMiOlsid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvY2xpY2thYmxlQXJlYS9jc3MvY2xpY2thYmxlLmNzcz82MWE3Iiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvY2xpY2thYmxlQXJlYS9qcy9jbGlja2FibGUuanMiLCJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9jbGlja2FibGVBcmVhL2pzL3RpbWVkY2xpY2thYmxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT09PT09ICAgICBNYXN0ZXIgY2xpY2thYmxlLmpzICAgICA9PT09PT09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgIFRoaXMgZmlsZSBjb250YWlucyB0aGUgSlMgZm9yIHRoZSAgPT09XG49PT0gIFJ1bmVzdG9uZSBjbGlja2FibGUgYXJlYSBjb21wb25lbnQuID09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgICAgICAgICAgICAgQ3JlYXRlZCBieSAgICAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgIElzYWlhaCBNYXllcmNoYWsgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICAgICAgIDcvMS8xNSAgICAgICAgICAgICAgICA9PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFJ1bmVzdG9uZUJhc2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9qcy9ydW5lc3RvbmViYXNlLmpzXCI7XG5pbXBvcnQgXCIuLi9jc3MvY2xpY2thYmxlLmNzc1wiO1xuXG5leHBvcnQgdmFyIENBTGlzdCA9IHt9OyAvLyBPYmplY3QgdGhhdCBjb250YWlucyBhbGwgaW5zdGFuY2VzIG9mIENsaWNrYWJsZUFyZWEgb2JqZWN0c1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlja2FibGVBcmVhIGV4dGVuZHMgUnVuZXN0b25lQmFzZSB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdmFyIG9yaWcgPSBvcHRzLm9yaWc7IC8vIGVudGlyZSA8ZGl2PiBlbGVtZW50IHRoYXQgd2lsbCBiZSByZXBsYWNlZCBieSBuZXcgSFRNTFxuICAgICAgICB0aGlzLm9yaWdFbGVtID0gb3JpZztcbiAgICAgICAgdGhpcy5kaXZpZCA9IG9yaWcuaWQ7XG4gICAgICAgIHRoaXMudXNlUnVuZXN0b25lU2VydmljZXMgPSBvcHRzLnVzZVJ1bmVzdG9uZVNlcnZpY2VzO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUFycmF5ID0gW107IC8vIGhvbGRzIGFsbCBjbGlja2FibGUgZWxlbWVudHNcbiAgICAgICAgdGhpcy5jb3JyZWN0QXJyYXkgPSBbXTsgLy8gaG9sZHMgdGhlIElEcyBvZiBhbGwgY29ycmVjdCBjbGlja2FibGUgc3BhbiBlbGVtZW50cywgdXNlZCBmb3IgZXZhbFxuICAgICAgICB0aGlzLmluY29ycmVjdEFycmF5ID0gW107IC8vIGhvbGRzIElEcyBvZiBhbGwgaW5jb3JyZWN0IGNsaWNrYWJsZSBzcGFuIGVsZW1lbnRzLCB1c2VkIGZvciBldmFsXG4gICAgICAgIC8vRm9yIHVzZSB3aXRoIFNwaGlueC1yZW5kZXJlZCBodG1sXG4gICAgICAgIHRoaXMuaXNUYWJsZSA9IGZhbHNlO1xuICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtKS5kYXRhKFwiY2NcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbSkuaXMoXCJbZGF0YS10YWJsZV1cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2NBcnJheSA9ICQodGhpcy5vcmlnRWxlbSkuZGF0YShcImNjXCIpLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNpQXJyYXkgPSAkKHRoaXMub3JpZ0VsZW0pLmRhdGEoXCJjaVwiKS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2NBcnJheSA9ICQodGhpcy5vcmlnRWxlbSkuZGF0YShcImNjXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNpQXJyYXkgPSAkKHRoaXMub3JpZ0VsZW0pLmRhdGEoXCJjaVwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIHVzZSBpbiB0aGUgcmVjdXJzaXZlIHJlcGxhY2UgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5jbGlja0luZGV4ID0gMDsgLy8gSW5kZXggb2YgdGhpcy5jbGlja2VkSW5kZXhBcnJheSB0aGF0IHdlJ3JlIGNoZWNraW5nIGFnYWluc3RcbiAgICAgICAgdGhpcy5jbGlja2FibGVDb3VudGVyID0gMDsgLy8gSW5kZXggb2YgdGhlIGN1cnJlbnQgY2xpY2thYmxlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5nZXRRdWVzdGlvbigpO1xuICAgICAgICB0aGlzLmdldEZlZWRiYWNrKCk7XG4gICAgICAgIHRoaXMucmVuZGVyTmV3RWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gXCJDbGlja2FibGVcIjtcbiAgICAgICAgdGhpcy5hZGRDYXB0aW9uKFwicnVuZXN0b25lXCIpO1xuICAgICAgICB0aGlzLmNoZWNrU2VydmVyKFwiY2xpY2thYmxlQXJlYVwiLCB0cnVlKTtcbiAgICB9XG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBVcGRhdGUgYmFzaWMgYXR0cmlidXRlcyA9PVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgZ2V0UXVlc3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtLmNoaWxkTm9kZXNbaV0pLmlzKFwiW2RhdGEtcXVlc3Rpb25dXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHRoaXMub3JpZ0VsZW0uY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRGZWVkYmFjaygpIHtcbiAgICAgICAgdGhpcy5mZWVkYmFjayA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtLmNoaWxkTm9kZXNbaV0pLmlzKFwiW2RhdGEtZmVlZGJhY2tdXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkYmFjayA9IHRoaXMub3JpZ0VsZW0uY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mZWVkYmFjayAhPT0gXCJcIikge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBmZWVkYmFjayBlbGVtZW50IG91dCBvZiB0aGUgY29udGFpbmVyIGlmIHRoZSB1c2VyIGhhcyBkZWZpbmVkIGZlZWRiYWNrXG4gICAgICAgICAgICAkKHRoaXMuZmVlZGJhY2spLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5mZWVkYmFjayA9IHRoaXMuZmVlZGJhY2suaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgID09PT0gICBGdW5jdGlvbnMgZ2VuZXJhdGluZyBmaW5hbCBIVE1MICAgPT09PVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHJlbmRlck5ld0VsZW1lbnRzKCkge1xuICAgICAgICAvLyB3cmFwcGVyIGZ1bmN0aW9uIGZvciBnZW5lcmF0aW5nIGV2ZXJ5dGhpbmdcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5pZCA9IHRoaXMub3JpZ0VsZW0uaWQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMucXVlc3Rpb24pO1xuICAgICAgICAkKHRoaXMuY29udGFpbmVyRGl2KS5hZGRDbGFzcyh0aGlzLm9yaWdFbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpKTtcbiAgICAgICAgdGhpcy5uZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgbmV3Q29udGVudCA9ICQodGhpcy5vcmlnRWxlbSkuaHRtbCgpO1xuICAgICAgICB3aGlsZSAobmV3Q29udGVudFswXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgbmV3Q29udGVudCA9IG5ld0NvbnRlbnQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZXdEaXYuaW5uZXJIVE1MID0gbmV3Q29udGVudDtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5uZXdEaXYpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVGZWVkYmFja0RpdigpO1xuICAgICAgICAkKHRoaXMub3JpZ0VsZW0pLnJlcGxhY2VXaXRoKHRoaXMuY29udGFpbmVyRGl2KTtcbiAgICB9XG4gICAgY3JlYXRlQnV0dG9ucygpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpOyAvLyBDaGVjayBtZSBidXR0b25cbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkNoZWNrIE1lXCI7XG4gICAgICAgICQodGhpcy5zdWJtaXRCdXR0b24pLmF0dHIoe1xuICAgICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1zdWNjZXNzXCIsXG4gICAgICAgICAgICBuYW1lOiBcImRvIGFuc3dlclwiLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudEFuc3dlcigpO1xuICAgICAgICAgICAgdGhpcy5sb2dDdXJyZW50QW5zd2VyKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZlZWRiYWNrKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5zdWJtaXRCdXR0b24pO1xuICAgIH1cbiAgICBjcmVhdGVGZWVkYmFja0RpdigpIHtcbiAgICAgICAgdGhpcy5mZWVkQmFja0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMuZmVlZEJhY2tEaXYpO1xuICAgIH1cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgPT09IENoZWNraW5nL3Jlc3RvcmluZyBmcm9tIHN0b3JhZ2UgPT09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHJlc3RvcmVBbnN3ZXJzKGRhdGEpIHtcbiAgICAgICAgLy8gUmVzdG9yZSBhbnN3ZXJzIGZyb20gc3RvcmFnZSByZXRyaWV2YWwgZG9uZSBpbiBSdW5lc3RvbmVCYXNlIG9yIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgICAgICBpZiAoZGF0YS5hbnN3ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gaWYgd2UgZ290IGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgICAgICB0aGlzLmhhc1N0b3JlZEFuc3dlcnMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXhBcnJheSA9IGRhdGEuYW5zd2VyLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jY0FycmF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubW9kaWZ5Q2xpY2thYmxlcyh0aGlzLm5ld0Rpdi5jaGlsZE5vZGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZvciB1c2Ugd2l0aCBTcGhpbngtcmVuZGVyZWQgSFRNTFxuICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5jY0luZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2lJbmRleCA9IDA7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kaWZ5VmlhQ0ModGhpcy5uZXdEaXYuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGlmeVRhYmxlVmlhQ0ModGhpcy5uZXdEaXYuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5ncmFkZXJhY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RvcmFnZU9iajtcbiAgICAgICAgLy8gR2V0cyBwcmV2aW91cyBhbnN3ZXIgZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2UgaWYgaXQgZXhpc3RzXG4gICAgICAgIHRoaXMuaGFzU3RvcmVkQW5zd2VycyA9IGZhbHNlO1xuICAgICAgICB2YXIgbGVuID0gbG9jYWxTdG9yYWdlLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIHZhciBleCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KCkpO1xuICAgICAgICAgICAgaWYgKGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNTdG9yZWRBbnN3ZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlT2JqID0gSlNPTi5wYXJzZShleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4QXJyYXkgPSBzdG9yYWdlT2JqLmFuc3dlci5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIHdoaWxlIHBhcnNpbmc7IGxpa2VseSBkdWUgdG8gYmFkIHZhbHVlIHN0b3JlZCBpbiBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU3RvcmVkQW5zd2VycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVBbnN3ZXJzKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VSdW5lc3RvbmVTZXJ2aWNlcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBsb2cgYW5zd2VyIHRvIHNlcnZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdpdmVuSW5kZXhBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2xpY2thYmxlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMuY2xpY2thYmxlQXJyYXlbaV0pLmhhc0NsYXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrYWJsZS1jbGlja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpdmVuSW5kZXhBcnJheS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nQm9va0V2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBcImNsaWNrYWJsZUFyZWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdDogdGhpcy5jbGlja2VkSW5kZXhBcnJheS5qb2luKFwiO1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdl9pZDogdGhpcy5kaXZpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHN0b3JhZ2VPYmouY29ycmVjdCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdG9yZUFuc3dlcnMoe30pOyAvLyBwYXNzIGVtcHR5IG9iamVjdFxuICAgIH1cbiAgICBzZXRMb2NhbFN0b3JhZ2UoZGF0YSkge1xuICAgICAgICAvLyBBcnJheSBvZiB0aGUgaW5kaWNlcyBvZiBjbGlja2VkIGVsZW1lbnRzIGlzIHBhc3NlZCB0byBsb2NhbCBzdG9yYWdlXG4gICAgICAgIHZhciBhbnN3ZXI7XG4gICAgICAgIGlmIChkYXRhLmFuc3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBnb3QgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIsIHdlIGNhbiBqdXN0IHVzZSB0aGF0XG4gICAgICAgICAgICBhbnN3ZXIgPSB0aGlzLmNsaWNrZWRJbmRleEFycmF5LmpvaW4oXCI7XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5naXZlbkluZGV4QXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jbGlja2FibGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMuY2xpY2thYmxlQXJyYXlbaV0pLmhhc0NsYXNzKFwiY2xpY2thYmxlLWNsaWNrZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5naXZlbkluZGV4QXJyYXkucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbnN3ZXIgPSB0aGlzLmdpdmVuSW5kZXhBcnJheS5qb2luKFwiO1wiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGltZVN0YW1wID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIGNvcnJlY3QgPSBkYXRhLmNvcnJlY3Q7XG4gICAgICAgIHZhciBzdG9yYWdlT2JqZWN0ID0ge1xuICAgICAgICAgICAgYW5zd2VyOiBhbnN3ZXIsXG4gICAgICAgICAgICBjb3JyZWN0OiBjb3JyZWN0LFxuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lU3RhbXAsXG4gICAgICAgIH07XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VLZXkoKSxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VPYmplY3QpXG4gICAgICAgICk7XG4gICAgfVxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PT0gQXV4aWxsaWFyeSBmdW5jdGlvbnMgPT09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIG1vZGlmeUNsaWNrYWJsZXMoY2hpbGROb2Rlcykge1xuICAgICAgICAvLyBTdHJpcHMgdGhlIGRhdGEtY29ycmVjdC9kYXRhLWluY29ycmVjdCBsYWJlbHMgYW5kIHVwZGF0ZXMgdGhlIGNvcnJlY3QvaW5jb3JyZWN0IGFycmF5c1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGNoaWxkTm9kZXNbaV0pLmlzKFwiW2RhdGEtY29ycmVjdF1cIikgfHxcbiAgICAgICAgICAgICAgICAkKGNoaWxkTm9kZXNbaV0pLmlzKFwiW2RhdGEtaW5jb3JyZWN0XVwiKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VOZXdDbGlja2FibGUoY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKCQoY2hpbGROb2Rlc1tpXSkuaXMoXCJbZGF0YS1jb3JyZWN0XVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAkKGNoaWxkTm9kZXNbaV0pLnJlbW92ZUF0dHIoXCJkYXRhLWNvcnJlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdEFycmF5LnB1c2goY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChjaGlsZE5vZGVzW2ldKS5yZW1vdmVBdHRyKFwiZGF0YS1pbmNvcnJlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0QXJyYXkucHVzaChjaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kaWZ5Q2xpY2thYmxlcyhjaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1vZGlmeVZpYUNDKGNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXS5jaGlsZHJlbi5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGlmeVZpYUNDKGNoaWxkcmVuW2ldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jY0NvdW50ZXIgPT09IE1hdGguZmxvb3IodGhpcy5jY0FycmF5W3RoaXMuY2NJbmRleF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlTmV3Q2xpY2thYmxlKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3JyZWN0QXJyYXkucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2NJbmRleCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2NDb3VudGVyID09PSBNYXRoLmZsb29yKHRoaXMuY2lBcnJheVt0aGlzLmNpSW5kZXhdKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZU5ld0NsaWNrYWJsZShjaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0QXJyYXkucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2lJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb2RpZnlUYWJsZVZpYUNDKGNoaWxkcmVuKSB7XG4gICAgICAgIC8vIHRhYmxlIHZlcnNpb24gb2YgbW9kaWZ5VmlhQ0NcbiAgICAgICAgdmFyIHRDb21wb25lbnRBcnIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVOYW1lID09PSBcIlRBQkxFXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0bXAuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRtcC5jaGlsZHJlbltqXS5ub2RlTmFtZSA9PT0gXCJUSEVBRFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0Q29tcG9uZW50QXJyLnB1c2godG1wLmNoaWxkcmVuW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXAuY2hpbGRyZW5bal0ubm9kZU5hbWUgPT09IFwiVEJPRFlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdENvbXBvbmVudEFyci5wdXNoKHRtcC5jaGlsZHJlbltqXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wLmNoaWxkcmVuW2pdLm5vZGVOYW1lID09PSBcIlRGT09UXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRDb21wb25lbnRBcnIucHVzaCh0bXAuY2hpbGRyZW5bal0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdENvbXBvbmVudEFyci5sZW5ndGg7IHQrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0Q29tcG9uZW50QXJyW3RdLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBjaGVjayBpZiB0aGUgZW50aXJlIHJvdyBuZWVkcyB0byBiZSBjbGlja2FibGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2NJbmRleCA8IHRoaXMuY2NBcnJheS5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIgPT09XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5jY0FycmF5W3RoaXMuY2NJbmRleF0uc3BsaXQoXCIsXCIpWzBdKSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuY2NBcnJheVt0aGlzLmNjSW5kZXhdLnNwbGl0KFwiLFwiKVsxXSkgPT09IDBcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VOZXdDbGlja2FibGUodENvbXBvbmVudEFyclt0XS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdEFycmF5LnB1c2godENvbXBvbmVudEFyclt0XS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2NJbmRleCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2lJbmRleCA8IHRoaXMuY2lBcnJheS5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIgPT09XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5jaUFycmF5W3RoaXMuY2lJbmRleF0uc3BsaXQoXCIsXCIpWzBdKSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuY2lBcnJheVt0aGlzLmNpSW5kZXhdLnNwbGl0KFwiLFwiKVsxXSkgPT09IDBcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VOZXdDbGlja2FibGUodENvbXBvbmVudEFyclt0XS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0QXJyYXkucHVzaCh0Q29tcG9uZW50QXJyW3RdLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaUluZGV4Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90LCBjaGVjayB0aGUgaW5kaXZpZHVhbCBkYXRhIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBqIDwgdENvbXBvbmVudEFyclt0XS5jaGlsZHJlbltpXS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wID0gaiArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jY0luZGV4IDwgdGhpcy5jY0FycmF5Lmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNjQXJyYXlbdGhpcy5jY0luZGV4XS5zcGxpdChcIixcIilbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jY0NvdW50ZXIgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jY0FycmF5W3RoaXMuY2NJbmRleF0uc3BsaXQoXCIsXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VOZXdDbGlja2FibGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRDb21wb25lbnRBcnJbdF0uY2hpbGRyZW5baV0uY2hpbGRyZW5bal1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdEFycmF5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRDb21wb25lbnRBcnJbdF0uY2hpbGRyZW5baV0uY2hpbGRyZW5bal1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2NJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNpSW5kZXggPCB0aGlzLmNpQXJyYXkubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2lBcnJheVt0aGlzLmNpSW5kZXhdLnNwbGl0KFwiLFwiKVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNjQ291bnRlciA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNpQXJyYXlbdGhpcy5jaUluZGV4XS5zcGxpdChcIixcIilbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZU5ld0NsaWNrYWJsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdENvbXBvbmVudEFyclt0XS5jaGlsZHJlbltpXS5jaGlsZHJlbltqXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RBcnJheS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Q29tcG9uZW50QXJyW3RdLmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNpSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYW5hZ2VOZXdDbGlja2FibGUoY2xpY2thYmxlKSB7XG4gICAgICAgIC8vIGFkZHMgdGhlIFwiY2xpY2thYmxlXCIgZnVuY3Rpb25hbGl0eVxuICAgICAgICAkKGNsaWNrYWJsZSkuYWRkQ2xhc3MoXCJjbGlja2FibGVcIik7XG4gICAgICAgIGlmICh0aGlzLmhhc1N0b3JlZEFuc3dlcnMpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IHdlJ3JlIGFib3V0IHRvIGFwcGVuZCB0byB0aGUgcHJlIHdhcyBpbiBsb2NhbCBzdG9yYWdlIGFzIGNsaWNrZWQgdmlhIGl0cyBpbmRleFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4QXJyYXlbdGhpcy5jbGlja0luZGV4XS50b1N0cmluZygpID09PVxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2thYmxlQ291bnRlci50b1N0cmluZygpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKGNsaWNrYWJsZSkuYWRkQ2xhc3MoXCJjbGlja2FibGUtY2xpY2tlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGlja0luZGV4ID09PSB0aGlzLmNsaWNrZWRJbmRleEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGRvaW5nIHRoaXMgaWYgdGhlIGluZGV4IGFycmF5IGlzIHVzZWQgdXBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNTdG9yZWRBbnN3ZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgY2xpY2thYmxlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmlzQW5zd2VyZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJjbGlja2FibGUtY2xpY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJjbGlja2FibGUtY2xpY2tlZFwiKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiY2xpY2thYmxlLWluY29ycmVjdFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImNsaWNrYWJsZS1jbGlja2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUFycmF5LnB1c2goY2xpY2thYmxlKTtcbiAgICAgICAgdGhpcy5jbGlja2FibGVDb3VudGVyKys7XG4gICAgfVxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICA9PSBFdmFsdWF0aW9uIGFuZCBkaXNwbGF5aW5nIGZlZWRiYWNrID09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIGNoZWNrQ3VycmVudEFuc3dlcigpIHtcbiAgICAgICAgLy8gRXZhbHVhdGlvbiBpcyBkb25lIGJ5IGl0ZXJhdGluZyBvdmVyIHRoZSBjb3JyZWN0L2luY29ycmVjdCBhcnJheXMgYW5kIGNoZWNraW5nIGJ5IGNsYXNzXG4gICAgICAgIHRoaXMuY29ycmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29ycmVjdE51bSA9IDA7XG4gICAgICAgIHRoaXMuaW5jb3JyZWN0TnVtID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvcnJlY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMuY29ycmVjdEFycmF5W2ldKS5oYXNDbGFzcyhcImNsaWNrYWJsZS1jbGlja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3JyZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdE51bSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbmNvcnJlY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCQodGhpcy5pbmNvcnJlY3RBcnJheVtpXSkuaGFzQ2xhc3MoXCJjbGlja2FibGUtY2xpY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0TnVtKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcy5pbmNvcnJlY3RBcnJheVtpXSkucmVtb3ZlQ2xhc3MoXCJjbGlja2FibGUtaW5jb3JyZWN0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVyY2VudCA9XG4gICAgICAgICAgICAodGhpcy5jb3JyZWN0TnVtIC0gdGhpcy5pbmNvcnJlY3ROdW0pIC8gdGhpcy5jb3JyZWN0QXJyYXkubGVuZ3RoO1xuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSh7IGNvcnJlY3Q6IHRoaXMuY29ycmVjdCA/IFwiVFwiIDogXCJGXCIgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9nQ3VycmVudEFuc3dlcihzaWQpIHtcbiAgICAgICAgY29uc3QgYW5zd2VyID0gdGhpcy5naXZlbkluZGV4QXJyYXkuam9pbihcIjtcIik7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgZXZlbnQ6IFwiY2xpY2thYmxlQXJlYVwiLFxuICAgICAgICAgICAgYW5zd2VyOiBhbnN3ZXIsXG4gICAgICAgICAgICBhY3Q6IGFuc3dlcixcbiAgICAgICAgICAgIGRpdl9pZDogdGhpcy5kaXZpZCxcbiAgICAgICAgICAgIGNvcnJlY3Q6IHRoaXMuY29ycmVjdCA/IFwiVFwiIDogXCJGXCIsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2Ygc2lkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBkYXRhLnNpZCA9IHNpZDtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ0Jvb2tFdmVudChkYXRhKTtcbiAgICB9XG5cbiAgICByZW5kZXJGZWVkYmFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ycmVjdCkge1xuICAgICAgICAgICAgJCh0aGlzLmZlZWRCYWNrRGl2KS5odG1sKFwiWW91IGFyZSBDb3JyZWN0IVwiKTtcbiAgICAgICAgICAgICQodGhpcy5mZWVkQmFja0RpdikuYXR0cihcImNsYXNzXCIsIFwiYWxlcnQgYWxlcnQtaW5mb1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbmNvcnJlY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMuaW5jb3JyZWN0QXJyYXlbaV0pLmhhc0NsYXNzKFwiY2xpY2thYmxlLWNsaWNrZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzLmluY29ycmVjdEFycmF5W2ldKS5hZGRDbGFzcyhcImNsaWNrYWJsZS1pbmNvcnJlY3RcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzLmluY29ycmVjdEFycmF5W2ldKS5yZW1vdmVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2thYmxlLWluY29ycmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzLmZlZWRCYWNrRGl2KS5odG1sKFxuICAgICAgICAgICAgICAgIFwiSW5jb3JyZWN0LiBZb3UgY2xpY2tlZCBvbiBcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JyZWN0TnVtICtcbiAgICAgICAgICAgICAgICBcIiBvZiB0aGUgXCIgK1xuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdEFycmF5Lmxlbmd0aC50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICBcIiBjb3JyZWN0IGVsZW1lbnRzIGFuZCBcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3ROdW0gK1xuICAgICAgICAgICAgICAgIFwiIG9mIHRoZSBcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RBcnJheS5sZW5ndGgudG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgXCIgaW5jb3JyZWN0IGVsZW1lbnRzLiBcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5mZWVkYmFja1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICQodGhpcy5mZWVkQmFja0RpdikuYXR0cihcImNsYXNzXCIsIFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUludGVyYWN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2xpY2thYmxlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICQodGhpcy5jbGlja2FibGVBcnJheVtpXSkuY3NzKFwiY3Vyc29yXCIsIFwiaW5pdGlhbFwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2thYmxlQXJyYXlbaV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT0gRmluZCB0aGUgY3VzdG9tIEhUTUwgdGFncyBhbmQgPT1cbj09ICAgZXhlY3V0ZSBvdXIgY29kZSBvbiB0aGVtICAgID09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuJChkb2N1bWVudCkuYmluZChcInJ1bmVzdG9uZTpsb2dpbi1jb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgJChcIltkYXRhLWNvbXBvbmVudD1jbGlja2FibGVhcmVhXVwiKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5jbG9zZXN0KFwiW2RhdGEtY29tcG9uZW50PXRpbWVkQXNzZXNzbWVudF1cIikubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBleGlzdHMgd2l0aGluIGEgdGltZWQgY29tcG9uZW50LCBkb24ndCByZW5kZXIgaXQgaGVyZVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBDQUxpc3RbdGhpcy5pZF0gPSBuZXcgQ2xpY2thYmxlQXJlYSh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWc6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHVzZVJ1bmVzdG9uZVNlcnZpY2VzOiBlQm9va0NvbmZpZy51c2VSdW5lc3RvbmVTZXJ2aWNlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciByZW5kZXJpbmcgQ2xpY2thYmxlQXJlYSBQcm9ibGVtICR7dGhpcy5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGV0YWlsczogJHtlcnJ9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIiwiaW1wb3J0IENsaWNrYWJsZUFyZWEgZnJvbSBcIi4vY2xpY2thYmxlLmpzXCI7XG5cbihcInVzZSBzdHJpY3RcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVkQ2xpY2thYmxlQXJlYSBleHRlbmRzIENsaWNrYWJsZUFyZWEge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMucmVzdG9yZUFuc3dlcnMoe30pO1xuICAgICAgICB0aGlzLnJlbmRlclRpbWVkSWNvbih0aGlzLmNvbnRhaW5lckRpdik7XG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBoaWRlQnV0dG9ucygpIHtcbiAgICAgICAgJCh0aGlzLnN1Ym1pdEJ1dHRvbikuaGlkZSgpO1xuICAgIH1cblxuICAgIHJlbmRlclRpbWVkSWNvbihjb21wb25lbnQpIHtcbiAgICAgICAgLy8gcmVuZGVycyB0aGUgY2xvY2sgaWNvbiBvbiB0aW1lZCBjb21wb25lbnRzLiAgICBUaGUgY29tcG9uZW50IHBhcmFtZXRlclxuICAgICAgICAvLyBpcyB0aGUgZWxlbWVudCB0aGF0IHRoZSBpY29uIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICAgICAgdmFyIHRpbWVJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIHRpbWVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgJCh0aW1lSWNvbikuYXR0cih7XG4gICAgICAgICAgICBzcmM6IFwiLi4vX3N0YXRpYy9jbG9jay5wbmdcIixcbiAgICAgICAgICAgIHN0eWxlOiBcIndpZHRoOjE1cHg7aGVpZ2h0OjE1cHhcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRpbWVJY29uRGl2LmNsYXNzTmFtZSA9IFwidGltZVRpcFwiO1xuICAgICAgICB0aW1lSWNvbkRpdi50aXRsZSA9IFwiXCI7XG4gICAgICAgIHRpbWVJY29uRGl2LmFwcGVuZENoaWxkKHRpbWVJY29uKTtcbiAgICAgICAgJChjb21wb25lbnQpLnByZXBlbmQodGltZUljb25EaXYpO1xuICAgIH1cblxuICAgIGNoZWNrQ29ycmVjdFRpbWVkKCkge1xuICAgICAgICAvLyBSZXR1cm5zIGlmIHRoZSBxdWVzdGlvbiB3YXMgY29ycmVjdCwgaW5jb3JyZWN0LCBvciBza2lwcGVkIChyZXR1cm4gbnVsbCBpbiB0aGUgbGFzdCBjYXNlKVxuICAgICAgICBpZiAodGhpcy5jb3JyZWN0TnVtID09PSAwICYmIHRoaXMuaW5jb3JyZWN0TnVtID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5jb3JyZWN0KSB7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiVFwiO1xuICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJGXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUZlZWRiYWNrKCkge1xuICAgICAgICAkKHRoaXMuZmVlZEJhY2tEaXYpLmhpZGUoKTtcbiAgICB9XG59XG5cbmlmICh0eXBlb2Ygd2luZG93LmNvbXBvbmVudF9mYWN0b3J5ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luZG93LmNvbXBvbmVudF9mYWN0b3J5ID0ge307XG59XG53aW5kb3cuY29tcG9uZW50X2ZhY3RvcnkuY2xpY2thYmxlYXJlYSA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKG9wdHMudGltZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lZENsaWNrYWJsZUFyZWEob3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ2xpY2thYmxlQXJlYShvcHRzKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=