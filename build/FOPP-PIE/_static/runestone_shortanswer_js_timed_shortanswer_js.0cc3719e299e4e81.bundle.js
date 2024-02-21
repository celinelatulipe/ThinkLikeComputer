"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_shortanswer_js_timed_shortanswer_js"],{

/***/ 76199:
/*!***************************************************!*\
  !*** ./runestone/shortanswer/css/shortanswer.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 67230:
/*!*************************************************!*\
  !*** ./runestone/shortanswer/js/shortanswer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "saList": () => (/* binding */ saList),
/* harmony export */   "default": () => (/* binding */ ShortAnswer)
/* harmony export */ });
/* harmony import */ var _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase.js */ 2568);
/* harmony import */ var _css_shortanswer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../css/shortanswer.css */ 76199);
/*==========================================
=======    Master shortanswer.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone shortanswer component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/2/15                ===
===              Brad Miller             ===
===                2019                  ===
==========================================*/




var saList;
if (saList === undefined) saList = {}; // Dictionary that contains all instances of shortanswer objects

class ShortAnswer extends _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        if (opts) {
            var orig = opts.orig; // entire <p> element that will be replaced by new HTML
            this.useRunestoneServices =
                opts.useRunestoneServices || eBookConfig.useRunestoneServices;
            this.origElem = orig;
            this.divid = orig.id;
            this.question = this.origElem.innerHTML;
            this.optional = false;
            if ($(this.origElem).is("[data-optional]")) {
                this.optional = true;
            }
            if ($(this.origElem).is("[data-mathjax]")) {
                this.mathjax = true;
            }
            this.renderHTML();
            this.caption = "shortanswer";
            this.addCaption("runestone");
            this.checkServer("shortanswer", true);
        }
    }

    renderHTML() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
        this.newForm = document.createElement("form");
        this.newForm.id = this.divid + "_journal";
        this.newForm.name = this.newForm.id;
        this.newForm.action = "";
        this.containerDiv.appendChild(this.newForm);
        this.fieldSet = document.createElement("fieldset");
        this.newForm.appendChild(this.fieldSet);
        this.legend = document.createElement("legend");
        this.legend.innerHTML = "Short Answer";
        this.fieldSet.appendChild(this.legend);
        this.firstLegendDiv = document.createElement("div");
        this.firstLegendDiv.innerHTML = this.question;
        $(this.firstLegendDiv).addClass("journal-question");
        this.fieldSet.appendChild(this.firstLegendDiv);
        this.jInputDiv = document.createElement("div");
        this.jInputDiv.id = this.divid + "_journal_input";
        this.fieldSet.appendChild(this.jInputDiv);
        this.jOptionsDiv = document.createElement("div");
        $(this.jOptionsDiv).addClass("journal-options");
        this.jInputDiv.appendChild(this.jOptionsDiv);
        this.jLabel = document.createElement("label");
        $(this.jLabel).addClass("radio-inline");
        this.jOptionsDiv.appendChild(this.jLabel);
        this.jTextArea = document.createElement("textarea");
        let self = this;
        this.jTextArea.onchange = function () {
            self.isAnswered = true;
        };
        this.jTextArea.id = this.divid + "_solution";
        $(this.jTextArea).attr("aria-label", "textarea");
        $(this.jTextArea).css("display:inline, width:530px");
        $(this.jTextArea).addClass("form-control");
        this.jTextArea.rows = 4;
        this.jTextArea.cols = 50;
        this.jLabel.appendChild(this.jTextArea);
        this.jTextArea.onchange = function () {
            this.feedbackDiv.innerHTML = "Your answer has not been saved yet!";
            $(this.feedbackDiv).removeClass("alert-success");
            $(this.feedbackDiv).addClass("alert alert-danger");
        }.bind(this);
        this.fieldSet.appendChild(document.createElement("br"));
        if (this.mathjax) {
            this.renderedAnswer = document.createElement("div");
            $(this.renderedAnswer).addClass("latexoutput");
            this.fieldSet.appendChild(this.renderedAnswer);
        }
        this.buttonDiv = document.createElement("div");
        this.fieldSet.appendChild(this.buttonDiv);
        this.submitButton = document.createElement("button");
        $(this.submitButton).addClass("btn btn-success");
        this.submitButton.type = "button";
        this.submitButton.textContent = "Save";
        this.submitButton.onclick = function () {
            this.checkCurrentAnswer();
            this.logCurrentAnswer();
            this.renderFeedback();
        }.bind(this);
        this.buttonDiv.appendChild(this.submitButton);
        this.randomSpan = document.createElement("span");
        this.randomSpan.innerHTML = "Instructor's Feedback";
        this.fieldSet.appendChild(this.randomSpan);
        this.otherOptionsDiv = document.createElement("div");
        $(this.otherOptionsDiv).css("padding-left:20px");
        $(this.otherOptionsDiv).addClass("journal-options");
        this.fieldSet.appendChild(this.otherOptionsDiv);
        // add a feedback div to give user feedback
        this.feedbackDiv = document.createElement("div");
        //$(this.feedbackDiv).addClass("bg-info form-control");
        //$(this.feedbackDiv).css("width:530px, background-color:#eee, font-style:italic");
        $(this.feedbackDiv).css("width:530px, font-style:italic");
        this.feedbackDiv.id = this.divid + "_feedback";
        this.feedbackDiv.innerHTML = "You have not answered this question yet.";
        $(this.feedbackDiv).addClass("alert alert-danger");
        //this.otherOptionsDiv.appendChild(this.feedbackDiv);
        this.fieldSet.appendChild(this.feedbackDiv);
        //this.fieldSet.appendChild(document.createElement("br"));
        $(this.origElem).replaceWith(this.containerDiv);
        // This is a stopgap measure for when MathJax is not loaded at all.  There is another
        // more difficult case that when MathJax is loaded asynchronously we will get here
        // before MathJax is loaded.  In that case we will need to implement something
        // like `the solution described here <https://stackoverflow.com/questions/3014018/how-to-detect-when-mathjax-is-fully-loaded>`_
        if (typeof MathJax !== "undefined") {
            this.queueMathJax(this.containerDiv)
        }
    }

    renderMath(value) {
        if (this.mathjax) {
            value = value.replace(/\$\$(.*?)\$\$/g, "\\[ $1 \\]");
            value = value.replace(/\$(.*?)\$/g, "\\( $1 \\)");
            $(this.renderedAnswer).text(value);
            this.queueMathJax(this.renderedAnswer)
        }
    }

    checkCurrentAnswer() { }

    async logCurrentAnswer(sid) {
        let value = $(document.getElementById(this.divid + "_solution")).val();
        this.renderMath(value);
        this.setLocalStorage({
            answer: value,
            timestamp: new Date(),
        });
        let data = {
            event: "shortanswer",
            act: value,
            answer: value,
            div_id: this.divid,
        };
        if (typeof sid !== "undefined") {
            data.sid = sid;
        }
        await this.logBookEvent(data);
    }

    renderFeedback() {
        this.feedbackDiv.innerHTML = "Your answer has been saved.";
        $(this.feedbackDiv).removeClass("alert-danger");
        $(this.feedbackDiv).addClass("alert alert-success");
    }
    setLocalStorage(data) {
        if (!this.graderactive) {
            let key = this.localStorageKey();
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
    checkLocalStorage() {
        // Repopulates the short answer text
        // which was stored into local storage.
        var answer = "";
        if (this.graderactive) {
            return;
        }
        var len = localStorage.length;
        if (len > 0) {
            var ex = localStorage.getItem(this.localStorageKey());
            if (ex !== null) {
                try {
                    var storedData = JSON.parse(ex);
                    answer = storedData.answer;
                } catch (err) {
                    // error while parsing; likely due to bad value stored in storage
                    console.log(err.message);
                    localStorage.removeItem(this.localStorageKey());
                    return;
                }
                let solution = $("#" + this.divid + "_solution");
                solution.text(answer);
                this.renderMath(answer);
                this.feedbackDiv.innerHTML =
                    "Your current saved answer is shown above.";
                $(this.feedbackDiv).removeClass("alert-danger");
                $(this.feedbackDiv).addClass("alert alert-success");
            }
        }
    }
    restoreAnswers(data) {
        // Restore answers from storage retrieval done in RunestoneBase
        // sometimes data.answer can be null
        if (!data.answer) {
            data.answer = "";
        }
        this.answer = data.answer;
        this.jTextArea.value = this.answer;
        this.renderMath(this.answer);

        let p = document.createElement("p");
        this.jInputDiv.appendChild(p);
        var tsString = "";
        if (data.timestamp) {
            tsString = new Date(data.timestamp).toLocaleString();
        } else {
            tsString = "";
        }
        $(p).text(tsString);
        if (data.last_answer) {
            this.current_answer = "ontime";
            let toggle_answer_button = document.createElement("button");
            toggle_answer_button.type = "button";
            $(toggle_answer_button).text("Show Late Answer");
            $(toggle_answer_button).addClass("btn btn-warning");
            $(toggle_answer_button).css("margin-left", "5px");

            $(toggle_answer_button).click(
                function () {
                    var display_timestamp, button_text;
                    if (this.current_answer === "ontime") {
                        this.jTextArea.value = data.last_answer;
                        this.answer = data.last_answer;
                        display_timestamp = new Date(
                            data.last_timestamp
                        ).toLocaleString();
                        button_text = "Show on-Time Answer";
                        this.current_answer = "late";
                    } else {
                        this.jTextArea.value = data.answer;
                        this.answer = data.answer;
                        display_timestamp = tsString;
                        button_text = "Show Late Answer";
                        this.current_answer = "ontime";
                    }
                    this.renderMath(this.answer);
                    $(p).text(`Submitted: ${display_timestamp}`);
                    $(toggle_answer_button).text(button_text);
                }.bind(this)
            );

            this.buttonDiv.appendChild(toggle_answer_button);
        }
        let feedbackStr = "Your current saved answer is shown above.";
        if (typeof data.score !== "undefined") {
            feedbackStr = `Score: ${data.score}`;
        }
        if (data.comment) {
            feedbackStr += ` -- ${data.comment}`;
        }
        this.feedbackDiv.innerHTML = feedbackStr;

        $(this.feedbackDiv).removeClass("alert-danger");
        $(this.feedbackDiv).addClass("alert alert-success");
    }

    disableInteraction() {
        this.jTextArea.disabled = true;
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=shortanswer]").each(function () {
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            try {
                saList[this.id] = new ShortAnswer({
                    orig: this,
                    useRunestoneServices: eBookConfig.useRunestoneServices,
                });
            } catch (err) {
                console.log(`Error rendering ShortAnswer Problem ${this.id}
                Details: ${err}`);
            }
        }
    });
});


/***/ }),

/***/ 87483:
/*!*******************************************************!*\
  !*** ./runestone/shortanswer/js/timed_shortanswer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimedShortAnswer)
/* harmony export */ });
/* harmony import */ var _shortanswer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shortanswer.js */ 67230);


class TimedShortAnswer extends _shortanswer_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
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
        return "I"; // we ignore this in the grading
    }
    hideFeedback() {
        $(this.feedbackDiv).hide();
    }
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.shortanswer = function (opts) {
    if (opts.timed) {
        return new TimedShortAnswer(opts);
    }
    return new _shortanswer_js__WEBPACK_IMPORTED_MODULE_0__["default"](opts);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3Nob3J0YW5zd2VyX2pzX3RpbWVkX3Nob3J0YW5zd2VyX2pzLjBjYzM3MTllMjk5ZTRlODEuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2RDtBQUMzQjs7QUFFM0I7QUFDUCx1Q0FBdUM7O0FBRXhCLDBCQUEwQixtRUFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGtCQUFrQjtBQUM5RDtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQSxrQ0FBa0MsYUFBYTtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsY0FBYztBQUNkLG1FQUFtRTtBQUNuRSwyQkFBMkIsSUFBSTtBQUMvQjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0UzBDOztBQUU1QiwrQkFBK0IsdURBQVc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVEQUFXO0FBQzFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9zaG9ydGFuc3dlci9jc3Mvc2hvcnRhbnN3ZXIuY3NzP2RmYjQiLCJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9zaG9ydGFuc3dlci9qcy9zaG9ydGFuc3dlci5qcyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL3Nob3J0YW5zd2VyL2pzL3RpbWVkX3Nob3J0YW5zd2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT09PT09ICAgIE1hc3RlciBzaG9ydGFuc3dlci5qcyAgICA9PT09PT09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgICAgVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBKUyBmb3IgICAgPT09XG49PT0gdGhlIFJ1bmVzdG9uZSBzaG9ydGFuc3dlciBjb21wb25lbnQuID09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PSAgICAgICAgICAgICAgQ3JlYXRlZCBieSAgICAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgIElzYWlhaCBNYXllcmNoYWsgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICAgICAgIDcvMi8xNSAgICAgICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgICAgQnJhZCBNaWxsZXIgICAgICAgICAgICAgPT09XG49PT0gICAgICAgICAgICAgICAgMjAxOSAgICAgICAgICAgICAgICAgID09PVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuaW1wb3J0IFJ1bmVzdG9uZUJhc2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9qcy9ydW5lc3RvbmViYXNlLmpzXCI7XG5pbXBvcnQgXCIuLy4uL2Nzcy9zaG9ydGFuc3dlci5jc3NcIjtcblxuZXhwb3J0IHZhciBzYUxpc3Q7XG5pZiAoc2FMaXN0ID09PSB1bmRlZmluZWQpIHNhTGlzdCA9IHt9OyAvLyBEaWN0aW9uYXJ5IHRoYXQgY29udGFpbnMgYWxsIGluc3RhbmNlcyBvZiBzaG9ydGFuc3dlciBvYmplY3RzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3J0QW5zd2VyIGV4dGVuZHMgUnVuZXN0b25lQmFzZSB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgaWYgKG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBvcmlnID0gb3B0cy5vcmlnOyAvLyBlbnRpcmUgPHA+IGVsZW1lbnQgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGJ5IG5ldyBIVE1MXG4gICAgICAgICAgICB0aGlzLnVzZVJ1bmVzdG9uZVNlcnZpY2VzID1cbiAgICAgICAgICAgICAgICBvcHRzLnVzZVJ1bmVzdG9uZVNlcnZpY2VzIHx8IGVCb29rQ29uZmlnLnVzZVJ1bmVzdG9uZVNlcnZpY2VzO1xuICAgICAgICAgICAgdGhpcy5vcmlnRWxlbSA9IG9yaWc7XG4gICAgICAgICAgICB0aGlzLmRpdmlkID0gb3JpZy5pZDtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSB0aGlzLm9yaWdFbGVtLmlubmVySFRNTDtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmlzKFwiW2RhdGEtb3B0aW9uYWxdXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25hbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9yaWdFbGVtKS5pcyhcIltkYXRhLW1hdGhqYXhdXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRoamF4ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVySFRNTCgpO1xuICAgICAgICAgICAgdGhpcy5jYXB0aW9uID0gXCJzaG9ydGFuc3dlclwiO1xuICAgICAgICAgICAgdGhpcy5hZGRDYXB0aW9uKFwicnVuZXN0b25lXCIpO1xuICAgICAgICAgICAgdGhpcy5jaGVja1NlcnZlcihcInNob3J0YW5zd2VyXCIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySFRNTCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5pZCA9IHRoaXMuZGl2aWQ7XG4gICAgICAgICQodGhpcy5jb250YWluZXJEaXYpLmFkZENsYXNzKHRoaXMub3JpZ0VsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpO1xuICAgICAgICB0aGlzLm5ld0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgICAgdGhpcy5uZXdGb3JtLmlkID0gdGhpcy5kaXZpZCArIFwiX2pvdXJuYWxcIjtcbiAgICAgICAgdGhpcy5uZXdGb3JtLm5hbWUgPSB0aGlzLm5ld0Zvcm0uaWQ7XG4gICAgICAgIHRoaXMubmV3Rm9ybS5hY3Rpb24gPSBcIlwiO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aGlzLm5ld0Zvcm0pO1xuICAgICAgICB0aGlzLmZpZWxkU2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuICAgICAgICB0aGlzLm5ld0Zvcm0uYXBwZW5kQ2hpbGQodGhpcy5maWVsZFNldCk7XG4gICAgICAgIHRoaXMubGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKTtcbiAgICAgICAgdGhpcy5sZWdlbmQuaW5uZXJIVE1MID0gXCJTaG9ydCBBbnN3ZXJcIjtcbiAgICAgICAgdGhpcy5maWVsZFNldC5hcHBlbmRDaGlsZCh0aGlzLmxlZ2VuZCk7XG4gICAgICAgIHRoaXMuZmlyc3RMZWdlbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmZpcnN0TGVnZW5kRGl2LmlubmVySFRNTCA9IHRoaXMucXVlc3Rpb247XG4gICAgICAgICQodGhpcy5maXJzdExlZ2VuZERpdikuYWRkQ2xhc3MoXCJqb3VybmFsLXF1ZXN0aW9uXCIpO1xuICAgICAgICB0aGlzLmZpZWxkU2V0LmFwcGVuZENoaWxkKHRoaXMuZmlyc3RMZWdlbmREaXYpO1xuICAgICAgICB0aGlzLmpJbnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuaklucHV0RGl2LmlkID0gdGhpcy5kaXZpZCArIFwiX2pvdXJuYWxfaW5wdXRcIjtcbiAgICAgICAgdGhpcy5maWVsZFNldC5hcHBlbmRDaGlsZCh0aGlzLmpJbnB1dERpdik7XG4gICAgICAgIHRoaXMuak9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAkKHRoaXMuak9wdGlvbnNEaXYpLmFkZENsYXNzKFwiam91cm5hbC1vcHRpb25zXCIpO1xuICAgICAgICB0aGlzLmpJbnB1dERpdi5hcHBlbmRDaGlsZCh0aGlzLmpPcHRpb25zRGl2KTtcbiAgICAgICAgdGhpcy5qTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICQodGhpcy5qTGFiZWwpLmFkZENsYXNzKFwicmFkaW8taW5saW5lXCIpO1xuICAgICAgICB0aGlzLmpPcHRpb25zRGl2LmFwcGVuZENoaWxkKHRoaXMuakxhYmVsKTtcbiAgICAgICAgdGhpcy5qVGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5qVGV4dEFyZWEub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmlzQW5zd2VyZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmpUZXh0QXJlYS5pZCA9IHRoaXMuZGl2aWQgKyBcIl9zb2x1dGlvblwiO1xuICAgICAgICAkKHRoaXMualRleHRBcmVhKS5hdHRyKFwiYXJpYS1sYWJlbFwiLCBcInRleHRhcmVhXCIpO1xuICAgICAgICAkKHRoaXMualRleHRBcmVhKS5jc3MoXCJkaXNwbGF5OmlubGluZSwgd2lkdGg6NTMwcHhcIik7XG4gICAgICAgICQodGhpcy5qVGV4dEFyZWEpLmFkZENsYXNzKFwiZm9ybS1jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmpUZXh0QXJlYS5yb3dzID0gNDtcbiAgICAgICAgdGhpcy5qVGV4dEFyZWEuY29scyA9IDUwO1xuICAgICAgICB0aGlzLmpMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmpUZXh0QXJlYSk7XG4gICAgICAgIHRoaXMualRleHRBcmVhLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5mZWVkYmFja0Rpdi5pbm5lckhUTUwgPSBcIllvdXIgYW5zd2VyIGhhcyBub3QgYmVlbiBzYXZlZCB5ZXQhXCI7XG4gICAgICAgICAgICAkKHRoaXMuZmVlZGJhY2tEaXYpLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICQodGhpcy5mZWVkYmFja0RpdikuYWRkQ2xhc3MoXCJhbGVydCBhbGVydC1kYW5nZXJcIik7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5maWVsZFNldC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgICBpZiAodGhpcy5tYXRoamF4KSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkQW5zd2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICQodGhpcy5yZW5kZXJlZEFuc3dlcikuYWRkQ2xhc3MoXCJsYXRleG91dHB1dFwiKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRTZXQuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlZEFuc3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmZpZWxkU2V0LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uRGl2KTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAkKHRoaXMuc3VibWl0QnV0dG9uKS5hZGRDbGFzcyhcImJ0biBidG4tc3VjY2Vzc1wiKTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudEFuc3dlcigpO1xuICAgICAgICAgICAgdGhpcy5sb2dDdXJyZW50QW5zd2VyKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZlZWRiYWNrKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25EaXYuYXBwZW5kQ2hpbGQodGhpcy5zdWJtaXRCdXR0b24pO1xuICAgICAgICB0aGlzLnJhbmRvbVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgdGhpcy5yYW5kb21TcGFuLmlubmVySFRNTCA9IFwiSW5zdHJ1Y3RvcidzIEZlZWRiYWNrXCI7XG4gICAgICAgIHRoaXMuZmllbGRTZXQuYXBwZW5kQ2hpbGQodGhpcy5yYW5kb21TcGFuKTtcbiAgICAgICAgdGhpcy5vdGhlck9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAkKHRoaXMub3RoZXJPcHRpb25zRGl2KS5jc3MoXCJwYWRkaW5nLWxlZnQ6MjBweFwiKTtcbiAgICAgICAgJCh0aGlzLm90aGVyT3B0aW9uc0RpdikuYWRkQ2xhc3MoXCJqb3VybmFsLW9wdGlvbnNcIik7XG4gICAgICAgIHRoaXMuZmllbGRTZXQuYXBwZW5kQ2hpbGQodGhpcy5vdGhlck9wdGlvbnNEaXYpO1xuICAgICAgICAvLyBhZGQgYSBmZWVkYmFjayBkaXYgdG8gZ2l2ZSB1c2VyIGZlZWRiYWNrXG4gICAgICAgIHRoaXMuZmVlZGJhY2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAvLyQodGhpcy5mZWVkYmFja0RpdikuYWRkQ2xhc3MoXCJiZy1pbmZvIGZvcm0tY29udHJvbFwiKTtcbiAgICAgICAgLy8kKHRoaXMuZmVlZGJhY2tEaXYpLmNzcyhcIndpZHRoOjUzMHB4LCBiYWNrZ3JvdW5kLWNvbG9yOiNlZWUsIGZvbnQtc3R5bGU6aXRhbGljXCIpO1xuICAgICAgICAkKHRoaXMuZmVlZGJhY2tEaXYpLmNzcyhcIndpZHRoOjUzMHB4LCBmb250LXN0eWxlOml0YWxpY1wiKTtcbiAgICAgICAgdGhpcy5mZWVkYmFja0Rpdi5pZCA9IHRoaXMuZGl2aWQgKyBcIl9mZWVkYmFja1wiO1xuICAgICAgICB0aGlzLmZlZWRiYWNrRGl2LmlubmVySFRNTCA9IFwiWW91IGhhdmUgbm90IGFuc3dlcmVkIHRoaXMgcXVlc3Rpb24geWV0LlwiO1xuICAgICAgICAkKHRoaXMuZmVlZGJhY2tEaXYpLmFkZENsYXNzKFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIpO1xuICAgICAgICAvL3RoaXMub3RoZXJPcHRpb25zRGl2LmFwcGVuZENoaWxkKHRoaXMuZmVlZGJhY2tEaXYpO1xuICAgICAgICB0aGlzLmZpZWxkU2V0LmFwcGVuZENoaWxkKHRoaXMuZmVlZGJhY2tEaXYpO1xuICAgICAgICAvL3RoaXMuZmllbGRTZXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgJCh0aGlzLm9yaWdFbGVtKS5yZXBsYWNlV2l0aCh0aGlzLmNvbnRhaW5lckRpdik7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBzdG9wZ2FwIG1lYXN1cmUgZm9yIHdoZW4gTWF0aEpheCBpcyBub3QgbG9hZGVkIGF0IGFsbC4gIFRoZXJlIGlzIGFub3RoZXJcbiAgICAgICAgLy8gbW9yZSBkaWZmaWN1bHQgY2FzZSB0aGF0IHdoZW4gTWF0aEpheCBpcyBsb2FkZWQgYXN5bmNocm9ub3VzbHkgd2Ugd2lsbCBnZXQgaGVyZVxuICAgICAgICAvLyBiZWZvcmUgTWF0aEpheCBpcyBsb2FkZWQuICBJbiB0aGF0IGNhc2Ugd2Ugd2lsbCBuZWVkIHRvIGltcGxlbWVudCBzb21ldGhpbmdcbiAgICAgICAgLy8gbGlrZSBgdGhlIHNvbHV0aW9uIGRlc2NyaWJlZCBoZXJlIDxodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDE0MDE4L2hvdy10by1kZXRlY3Qtd2hlbi1tYXRoamF4LWlzLWZ1bGx5LWxvYWRlZD5gX1xuICAgICAgICBpZiAodHlwZW9mIE1hdGhKYXggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWVNYXRoSmF4KHRoaXMuY29udGFpbmVyRGl2KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0aCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5tYXRoamF4KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcJFxcJCguKj8pXFwkXFwkL2csIFwiXFxcXFsgJDEgXFxcXF1cIik7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcJCguKj8pXFwkL2csIFwiXFxcXCggJDEgXFxcXClcIik7XG4gICAgICAgICAgICAkKHRoaXMucmVuZGVyZWRBbnN3ZXIpLnRleHQodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5xdWV1ZU1hdGhKYXgodGhpcy5yZW5kZXJlZEFuc3dlcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQ3VycmVudEFuc3dlcigpIHsgfVxuXG4gICAgYXN5bmMgbG9nQ3VycmVudEFuc3dlcihzaWQpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gJChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmRpdmlkICsgXCJfc29sdXRpb25cIikpLnZhbCgpO1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgodmFsdWUpO1xuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSh7XG4gICAgICAgICAgICBhbnN3ZXI6IHZhbHVlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBldmVudDogXCJzaG9ydGFuc3dlclwiLFxuICAgICAgICAgICAgYWN0OiB2YWx1ZSxcbiAgICAgICAgICAgIGFuc3dlcjogdmFsdWUsXG4gICAgICAgICAgICBkaXZfaWQ6IHRoaXMuZGl2aWQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2Ygc2lkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBkYXRhLnNpZCA9IHNpZDtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmxvZ0Jvb2tFdmVudChkYXRhKTtcbiAgICB9XG5cbiAgICByZW5kZXJGZWVkYmFjaygpIHtcbiAgICAgICAgdGhpcy5mZWVkYmFja0Rpdi5pbm5lckhUTUwgPSBcIllvdXIgYW5zd2VyIGhhcyBiZWVuIHNhdmVkLlwiO1xuICAgICAgICAkKHRoaXMuZmVlZGJhY2tEaXYpLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpO1xuICAgICAgICAkKHRoaXMuZmVlZGJhY2tEaXYpLmFkZENsYXNzKFwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiKTtcbiAgICB9XG4gICAgc2V0TG9jYWxTdG9yYWdlKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdyYWRlcmFjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMubG9jYWxTdG9yYWdlS2V5KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgLy8gUmVwb3B1bGF0ZXMgdGhlIHNob3J0IGFuc3dlciB0ZXh0XG4gICAgICAgIC8vIHdoaWNoIHdhcyBzdG9yZWQgaW50byBsb2NhbCBzdG9yYWdlLlxuICAgICAgICB2YXIgYW5zd2VyID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMuZ3JhZGVyYWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IGxvY2FsU3RvcmFnZS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICB2YXIgZXggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSgpKTtcbiAgICAgICAgICAgIGlmIChleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZWREYXRhID0gSlNPTi5wYXJzZShleCk7XG4gICAgICAgICAgICAgICAgICAgIGFuc3dlciA9IHN0b3JlZERhdGEuYW5zd2VyO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciB3aGlsZSBwYXJzaW5nOyBsaWtlbHkgZHVlIHRvIGJhZCB2YWx1ZSBzdG9yZWQgaW4gc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzb2x1dGlvbiA9ICQoXCIjXCIgKyB0aGlzLmRpdmlkICsgXCJfc29sdXRpb25cIik7XG4gICAgICAgICAgICAgICAgc29sdXRpb24udGV4dChhbnN3ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTWF0aChhbnN3ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmVlZGJhY2tEaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgXCJZb3VyIGN1cnJlbnQgc2F2ZWQgYW5zd2VyIGlzIHNob3duIGFib3ZlLlwiO1xuICAgICAgICAgICAgICAgICQodGhpcy5mZWVkYmFja0RpdikucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIik7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmZlZWRiYWNrRGl2KS5hZGRDbGFzcyhcImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdG9yZUFuc3dlcnMoZGF0YSkge1xuICAgICAgICAvLyBSZXN0b3JlIGFuc3dlcnMgZnJvbSBzdG9yYWdlIHJldHJpZXZhbCBkb25lIGluIFJ1bmVzdG9uZUJhc2VcbiAgICAgICAgLy8gc29tZXRpbWVzIGRhdGEuYW5zd2VyIGNhbiBiZSBudWxsXG4gICAgICAgIGlmICghZGF0YS5hbnN3ZXIpIHtcbiAgICAgICAgICAgIGRhdGEuYW5zd2VyID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuc3dlciA9IGRhdGEuYW5zd2VyO1xuICAgICAgICB0aGlzLmpUZXh0QXJlYS52YWx1ZSA9IHRoaXMuYW5zd2VyO1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgodGhpcy5hbnN3ZXIpO1xuXG4gICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHRoaXMuaklucHV0RGl2LmFwcGVuZENoaWxkKHApO1xuICAgICAgICB2YXIgdHNTdHJpbmcgPSBcIlwiO1xuICAgICAgICBpZiAoZGF0YS50aW1lc3RhbXApIHtcbiAgICAgICAgICAgIHRzU3RyaW5nID0gbmV3IERhdGUoZGF0YS50aW1lc3RhbXApLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0c1N0cmluZyA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgJChwKS50ZXh0KHRzU3RyaW5nKTtcbiAgICAgICAgaWYgKGRhdGEubGFzdF9hbnN3ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9hbnN3ZXIgPSBcIm9udGltZVwiO1xuICAgICAgICAgICAgbGV0IHRvZ2dsZV9hbnN3ZXJfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIHRvZ2dsZV9hbnN3ZXJfYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgJCh0b2dnbGVfYW5zd2VyX2J1dHRvbikudGV4dChcIlNob3cgTGF0ZSBBbnN3ZXJcIik7XG4gICAgICAgICAgICAkKHRvZ2dsZV9hbnN3ZXJfYnV0dG9uKS5hZGRDbGFzcyhcImJ0biBidG4td2FybmluZ1wiKTtcbiAgICAgICAgICAgICQodG9nZ2xlX2Fuc3dlcl9idXR0b24pLmNzcyhcIm1hcmdpbi1sZWZ0XCIsIFwiNXB4XCIpO1xuXG4gICAgICAgICAgICAkKHRvZ2dsZV9hbnN3ZXJfYnV0dG9uKS5jbGljayhcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXNwbGF5X3RpbWVzdGFtcCwgYnV0dG9uX3RleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRfYW5zd2VyID09PSBcIm9udGltZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpUZXh0QXJlYS52YWx1ZSA9IGRhdGEubGFzdF9hbnN3ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuc3dlciA9IGRhdGEubGFzdF9hbnN3ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5X3RpbWVzdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGFzdF90aW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgICAgICAgICkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbl90ZXh0ID0gXCJTaG93IG9uLVRpbWUgQW5zd2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfYW5zd2VyID0gXCJsYXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpUZXh0QXJlYS52YWx1ZSA9IGRhdGEuYW5zd2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbnN3ZXIgPSBkYXRhLmFuc3dlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlfdGltZXN0YW1wID0gdHNTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25fdGV4dCA9IFwiU2hvdyBMYXRlIEFuc3dlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2Fuc3dlciA9IFwib250aW1lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJNYXRoKHRoaXMuYW5zd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgJChwKS50ZXh0KGBTdWJtaXR0ZWQ6ICR7ZGlzcGxheV90aW1lc3RhbXB9YCk7XG4gICAgICAgICAgICAgICAgICAgICQodG9nZ2xlX2Fuc3dlcl9idXR0b24pLnRleHQoYnV0dG9uX3RleHQpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5idXR0b25EaXYuYXBwZW5kQ2hpbGQodG9nZ2xlX2Fuc3dlcl9idXR0b24pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmZWVkYmFja1N0ciA9IFwiWW91ciBjdXJyZW50IHNhdmVkIGFuc3dlciBpcyBzaG93biBhYm92ZS5cIjtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnNjb3JlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBmZWVkYmFja1N0ciA9IGBTY29yZTogJHtkYXRhLnNjb3JlfWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuY29tbWVudCkge1xuICAgICAgICAgICAgZmVlZGJhY2tTdHIgKz0gYCAtLSAke2RhdGEuY29tbWVudH1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmVlZGJhY2tEaXYuaW5uZXJIVE1MID0gZmVlZGJhY2tTdHI7XG5cbiAgICAgICAgJCh0aGlzLmZlZWRiYWNrRGl2KS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKTtcbiAgICAgICAgJCh0aGlzLmZlZWRiYWNrRGl2KS5hZGRDbGFzcyhcImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZUludGVyYWN0aW9uKCkge1xuICAgICAgICB0aGlzLmpUZXh0QXJlYS5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxufVxuXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT0gRmluZCB0aGUgY3VzdG9tIEhUTUwgdGFncyBhbmQgPT1cbj09ICAgZXhlY3V0ZSBvdXIgY29kZSBvbiB0aGVtICAgID09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuJChkb2N1bWVudCkuYmluZChcInJ1bmVzdG9uZTpsb2dpbi1jb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgJChcIltkYXRhLWNvbXBvbmVudD1zaG9ydGFuc3dlcl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmNsb3Nlc3QoXCJbZGF0YS1jb21wb25lbnQ9dGltZWRBc3Nlc3NtZW50XVwiKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGV4aXN0cyB3aXRoaW4gYSB0aW1lZCBjb21wb25lbnQsIGRvbid0IHJlbmRlciBpdCBoZXJlXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNhTGlzdFt0aGlzLmlkXSA9IG5ldyBTaG9ydEFuc3dlcih7XG4gICAgICAgICAgICAgICAgICAgIG9yaWc6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHVzZVJ1bmVzdG9uZVNlcnZpY2VzOiBlQm9va0NvbmZpZy51c2VSdW5lc3RvbmVTZXJ2aWNlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciByZW5kZXJpbmcgU2hvcnRBbnN3ZXIgUHJvYmxlbSAke3RoaXMuaWR9XG4gICAgICAgICAgICAgICAgRGV0YWlsczogJHtlcnJ9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIiwiaW1wb3J0IFNob3J0QW5zd2VyIGZyb20gXCIuL3Nob3J0YW5zd2VyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVkU2hvcnRBbnN3ZXIgZXh0ZW5kcyBTaG9ydEFuc3dlciB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUaW1lZEljb24odGhpcy5jb250YWluZXJEaXYpO1xuICAgICAgICB0aGlzLmhpZGVCdXR0b25zKCk7XG4gICAgfVxuICAgIGhpZGVCdXR0b25zKCkge1xuICAgICAgICAkKHRoaXMuc3VibWl0QnV0dG9uKS5oaWRlKCk7XG4gICAgfVxuICAgIHJlbmRlclRpbWVkSWNvbihjb21wb25lbnQpIHtcbiAgICAgICAgLy8gcmVuZGVycyB0aGUgY2xvY2sgaWNvbiBvbiB0aW1lZCBjb21wb25lbnRzLiAgICBUaGUgY29tcG9uZW50IHBhcmFtZXRlclxuICAgICAgICAvLyBpcyB0aGUgZWxlbWVudCB0aGF0IHRoZSBpY29uIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICAgICAgdmFyIHRpbWVJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIHRpbWVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgJCh0aW1lSWNvbikuYXR0cih7XG4gICAgICAgICAgICBzcmM6IFwiLi4vX3N0YXRpYy9jbG9jay5wbmdcIixcbiAgICAgICAgICAgIHN0eWxlOiBcIndpZHRoOjE1cHg7aGVpZ2h0OjE1cHhcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRpbWVJY29uRGl2LmNsYXNzTmFtZSA9IFwidGltZVRpcFwiO1xuICAgICAgICB0aW1lSWNvbkRpdi50aXRsZSA9IFwiXCI7XG4gICAgICAgIHRpbWVJY29uRGl2LmFwcGVuZENoaWxkKHRpbWVJY29uKTtcbiAgICAgICAgJChjb21wb25lbnQpLnByZXBlbmQodGltZUljb25EaXYpO1xuICAgIH1cbiAgICBjaGVja0NvcnJlY3RUaW1lZCgpIHtcbiAgICAgICAgcmV0dXJuIFwiSVwiOyAvLyB3ZSBpZ25vcmUgdGhpcyBpbiB0aGUgZ3JhZGluZ1xuICAgIH1cbiAgICBoaWRlRmVlZGJhY2soKSB7XG4gICAgICAgICQodGhpcy5mZWVkYmFja0RpdikuaGlkZSgpO1xuICAgIH1cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cuY29tcG9uZW50X2ZhY3RvcnkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW5kb3cuY29tcG9uZW50X2ZhY3RvcnkgPSB7fTtcbn1cblxud2luZG93LmNvbXBvbmVudF9mYWN0b3J5LnNob3J0YW5zd2VyID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBpZiAob3B0cy50aW1lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVkU2hvcnRBbnN3ZXIob3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2hvcnRBbnN3ZXIob3B0cyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9