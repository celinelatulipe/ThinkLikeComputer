"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_selectquestion_js_selectone_js"],{

/***/ 52675:
/*!*********************************************************!*\
  !*** ./runestone/selectquestion/css/selectquestion.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 72773:
/*!************************************************!*\
  !*** ./runestone/common/js/renderComponent.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderRunestoneComponent": () => (/* binding */ renderRunestoneComponent),
/* harmony export */   "createTimedComponent": () => (/* binding */ createTimedComponent)
/* harmony export */ });
/* harmony import */ var _webpack_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../webpack.index.js */ 36350);


async function renderRunestoneComponent(componentSrc, whereDiv, moreOpts) {
    /**
     *  The easy part is adding the componentSrc to the existing div.
     *  The tedious part is calling the right functions to turn the
     *  source into the actual component.
     */
    if (!componentSrc) {
        jQuery(`#${whereDiv}`).html(`<p>Sorry, no source is available for preview.</p>`);
        return;
    }
    let patt = /..\/_images/g;
    componentSrc = componentSrc.replace(
        patt,
        `${eBookConfig.app}/books/published/${eBookConfig.basecourse}/_images`
    );
    jQuery(`#${whereDiv}`).html(componentSrc);

    if (typeof window.edList === "undefined") {
        window.edList = {};
    }

    let componentKind = $($(`#${whereDiv} [data-component]`)[0]).data(
        "component"
    );
    // Import the JavaScript for this component before proceeding.
    await (0,_webpack_index_js__WEBPACK_IMPORTED_MODULE_0__.runestone_import)(componentKind);
    let opt = {};
    opt.orig = jQuery(`#${whereDiv} [data-component]`)[0];
    if (opt.orig) {
        opt.lang = $(opt.orig).data("lang");
        opt.useRunestoneServices = true;
        opt.graderactive = false;
        opt.python3 = true;
        if (typeof moreOpts !== "undefined") {
            for (let key in moreOpts) {
                opt[key] = moreOpts[key];
            }
        }
    }

    if (typeof component_factory === "undefined") {
        alert(
            "Error:  Missing the component factory!"
        );
    } else {
        if (
            !window.component_factory[componentKind] &&
            !jQuery(`#${whereDiv}`).html()
        ) {
            jQuery(`#${whereDiv}`).html(
                `<p>Preview not available for ${componentKind}</p>`
            );
        } else {
            let res = window.component_factory[componentKind](opt);
            if (componentKind === "activecode") {
                if (moreOpts.multiGrader) {
                    window.edList[
                        `${moreOpts.gradingContainer} ${res.divid}`
                    ] = res;
                } else {
                    window.edList[res.divid] = res;
                }
            }
        }
    }
}

function createTimedComponent(componentSrc, moreOpts) {
    /* The important distinction is that the component does not really need to be rendered
    into the page, in fact, due to the async nature of getting the source the list of questions
    is made and the original html is replaced by the look of the exam.
    */

    let patt = /..\/_images/g;
    componentSrc = componentSrc.replace(
        patt,
        `${eBookConfig.app}/books/published/${eBookConfig.basecourse}/_images`
    );

    let componentKind = $($(componentSrc).find("[data-component]")[0]).data(
        "component"
    );

    let origId = $(componentSrc).find("[data-component]").first().attr("id");

    // Double check -- if the component source is not in the DOM, then briefly add it
    // and call the constructor.
    let hdiv;
    if (!document.getElementById(origId)) {
        hdiv = $("<div/>", {
            css: { display: "none" },
        }).appendTo("body");
        hdiv.html(componentSrc);
    }
    // at this point hdiv is a jquery object

    let ret;
    let opts = {
        orig: document.getElementById(origId),
        timed: true,
    };
    if (typeof moreOpts !== "undefined") {
        for (let key in moreOpts) {
            opts[key] = moreOpts[key];
        }
    }

    if (componentKind in window.component_factory) {
        ret = window.component_factory[componentKind](opts);
    }

    let rdict = {};
    rdict.question = ret;
    return rdict;
}


/***/ }),

/***/ 63931:
/*!**************************************************!*\
  !*** ./runestone/selectquestion/js/selectone.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectOne)
/* harmony export */ });
/* harmony import */ var _common_js_renderComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/renderComponent.js */ 72773);
/* harmony import */ var _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/js/runestonebase.js */ 2568);
/* harmony import */ var _css_selectquestion_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/selectquestion.css */ 52675);
/**
 * *******************************
 * |docname| - SelectOne Component
 * *******************************
 */




class SelectOne extends _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
     * constructor --
     * Making an instance of a selectone is a bit more complicated because it is
     * a kind of meta directive.  That is, go to the server and randomly select
     * a question to display in this spot.  Or, if a student has already seen this question
     * in the context of an exam retrieve the question they saw in the first place.
     * Making an API call and waiting for the response is handled asynchronously.
     * But lots of code is not written with that assumption.  So we do the initialization in
     * two parts.
     * 1. Create the object with the usual constructor
     * 2. call initialize, which returns a promise.  When that promise is resolved
     * the "replacement" component will replace the original selectone component in the DOM.
     *
     * @param  {} opts
     */
    constructor(opts) {
        super(opts);
        this.origOpts = opts;
        this.questions = $(opts.orig).data("questionlist");
        this.proficiency = $(opts.orig).data("proficiency");
        this.minDifficulty = $(opts.orig).data("minDifficulty");
        this.maxDifficulty = $(opts.orig).data("maxDifficulty");
        this.points = $(opts.orig).data("points");
        this.autogradable = $(opts.orig).data("autogradable");
        this.not_seen_ever = $(opts.orig).data("not_seen_ever");
        this.selector_id = $(opts.orig).first().attr("id");
        this.primaryOnly = $(opts.orig).data("primary");
        this.ABExperiment = $(opts.orig).data("ab");
        this.toggleOptions = $(opts.orig).data("toggleoptions");
        this.toggleLabels = $(opts.orig).data("togglelabels");
        this.limitBaseCourse = $(opts.orig).data("limit-basecourse");
        opts.orig.id = this.selector_id;
    }
    /**
     * initialize --
     * initialize is used so that the constructor does not have to be async.
     * Constructors should definitely not return promises that would seriously
     * mess things up.
     * @return {Promise} Will resolve after component from DB is reified
     */
    async initialize() {
        let self = this;
        let data = { selector_id: this.selector_id };
        if (this.questions) {
            data.questions = this.questions;
        } else if (this.proficiency) {
            data.proficiency = this.proficiency;
        }
        if (this.minDifficulty) {
            data.minDifficulty = this.minDifficulty;
        }
        if (this.maxDifficulty) {
            data.maxDifficulty = this.maxDifficulty;
        }
        if (this.points) {
            data.points = this.points;
        }
        if (this.autogradable) {
            data.autogradable = this.autogradable;
        }
        if (this.not_seen_ever) {
            data.not_seen_ever = this.not_seen_ever;
        }
        if (this.primaryOnly) {
            data.primary = this.primaryOnly;
        }
        if (this.ABExperiment) {
            data.AB = this.ABExperiment;
        }
        if (this.timedWrapper) {
            data.timedWrapper = this.timedWrapper;
        }
        if (this.toggleOptions) {
            data.toggleOptions = this.toggleOptions;
        }
        if (this.toggleLabels) {
            data.toggleLabels = this.toggleLabels;
        }
        if (this.limitBaseCourse) {
            data.limitBaseCourse = eBookConfig.basecourse;
        }
        let opts = this.origOpts;
        let selectorId = this.selector_id;
        console.log("getting question source");
        let request = new Request(
            `${eBookConfig.new_server_prefix}/assessment/get_question_source`,
            {
                method: "POST",
                headers: this.jsonHeaders,
                body: JSON.stringify(data),
            }
        );
        let response = await fetch(request);
        let htmlsrc = await response.json();
        htmlsrc = htmlsrc.detail;
        if (htmlsrc.indexOf("No preview") >= 0) {
            alert(
                `Error: Not able to find a question for ${selectorId} based on the criteria`
            );
            throw new Error(`Unable to find a question for ${selectorId}`);
        }
        let res;
        if (opts.timed) {
            // timed components are not rendered immediately, only when the student
            // starts the assessment and visits this particular entry.
            res = (0,_common_js_renderComponent_js__WEBPACK_IMPORTED_MODULE_0__.createTimedComponent)(htmlsrc, {
                timed: true,
                selector_id: selectorId,
                assessmentTaken: opts.assessmentTaken,
            });
            // replace the entry in the timed assessment's list of components
            // with the component created by createTimedComponent
            for (let component of opts.rqa) {
                if (component.question == self) {
                    component.question = res.question;
                    break;
                }
            }
            self.realComponent = res.question;
            self.containerDiv = res.question.containerDiv;
            self.realComponent.selectorId = selectorId;
        } else {
            if (data.toggleOptions) {
                var toggleLabels = data.toggleLabels
                    .replace("togglelabels:", "")
                    .trim();
                if (toggleLabels) {
                    toggleLabels = toggleLabels.split(",");
                    for (var t = 0; t < toggleLabels.length; t++) {
                        toggleLabels[t] = toggleLabels[t].trim();
                    }
                }
                var toggleQuestions = this.questions.split(", ");
                var toggleUI = "";
                // check so that only the first toggle select question on the assignments page has a preview panel created, then all toggle select previews use this same panel
                if (!document.getElementById("component-preview")) {
                    toggleUI +=
                        '<div id="component-preview" class="col-md-6 toggle-preview" style="z-index: 999;">' +
                        '<div id="toggle-buttons"></div>' +
                        '<div id="toggle-preview"></div>' +
                        "</div>";
                }
                // dropdown menu containing the question options
                toggleUI +=
                    '<label for="' +
                    selectorId +
                    '-toggleQuestion" style="margin-left: 10px">Toggle Question:</label><select id="' +
                    selectorId +
                    '-toggleQuestion">';
                var i;
                var toggleQuestionHTMLSrc;
                var toggleQuestionSubstring;
                var toggleQuestionType;
                var toggleQuestionTypes = [];
                for (i = 0; i < toggleQuestions.length; i++) {
                    toggleQuestionHTMLSrc = await this.getToggleSrc(
                        toggleQuestions[i]
                    );
                    toggleQuestionSubstring =
                        toggleQuestionHTMLSrc.split('data-component="')[1];
                    switch (
                        toggleQuestionSubstring.slice(
                            0,
                            toggleQuestionSubstring.indexOf('"')
                        )
                    ) {
                        case "activecode":
                            toggleQuestionType = "Active Write Code";
                            break;
                        case "clickablearea":
                            toggleQuestionType = "Clickable Area";
                            break;
                        case "dragndrop":
                            toggleQuestionType = "Drag n Drop";
                            break;
                        case "fillintheblank":
                            toggleQuestionType = "Fill in the Blank";
                            break;
                        case "multiplechoice":
                            toggleQuestionType = "Multiple Choice";
                            break;
                        case "parsons":
                            toggleQuestionType = "Parsons Mixed-Up Code";
                            break;
                        case "shortanswer":
                            toggleQuestionType = "Short Answer";
                            break;
                    }
                    toggleQuestionTypes[i] = toggleQuestionType;
                    toggleUI += '<option value="' + toggleQuestions[i] + '">';
                    if (toggleLabels) {
                        if (toggleLabels[i]) {
                            toggleUI += toggleLabels[i];
                        } else {
                            toggleUI +=
                                toggleQuestionType + " - " + toggleQuestions[i];
                        }
                    } else {
                        toggleUI +=
                            toggleQuestionType + " - " + toggleQuestions[i];
                    }
                    if (i == 0 && data.toggleOptions.includes("lock")) {
                        toggleUI += " (only this question will be graded)";
                    }
                    toggleUI += "</option>";
                }
                toggleUI +=
                    '</select><div id="' +
                    selectorId +
                    '-toggleSelectedQuestion">';
                var toggleFirstID = htmlsrc.split('id="')[1];
                toggleFirstID = toggleFirstID.split('"')[0];
                htmlsrc = toggleUI + htmlsrc + "</div>";
            }
            // just render this component on the page in its usual place
            await (0,_common_js_renderComponent_js__WEBPACK_IMPORTED_MODULE_0__.renderRunestoneComponent)(htmlsrc, selectorId, {
                selector_id: selectorId,
                is_toggle: this.toggleOptions,
                is_select: true,
                useRunestoneServices: true,
            });
            if (data.toggleOptions) {
                $("#component-preview").hide();
                var toggleQuestionSelect = document.getElementById(
                    selectorId + "-toggleQuestion"
                );
                for (i = 0; i < toggleQuestionSelect.options.length; i++) {
                    if (
                        toggleQuestionSelect.options[i].value == toggleFirstID
                    ) {
                        toggleQuestionSelect.value = toggleFirstID;
                        $("#" + selectorId).data(
                            "toggle_current",
                            toggleFirstID
                        );
                        $("#" + selectorId).data(
                            "toggle_current_type",
                            toggleQuestionTypes[0]
                        );
                        break;
                    }
                }
                toggleQuestionSelect.addEventListener(
                    "change",
                    async function () {
                        await this.togglePreview(
                            toggleQuestionSelect.parentElement.id,
                            data.toggleOptions,
                            toggleQuestionTypes
                        );
                        this.logBookEvent({
                            event: "view_toggle",
                            act: toggleQuestionSelect.value,
                            div_id: toggleQuestionSelect.parentElement.id,
                        });
                    }.bind(this)
                );
            }
        }
        return response;
    }

    // retrieve html source of a question, for use in various toggle functionalities
    async getToggleSrc(toggleQuestionID) {
        let request = new Request(
            `${eBookConfig.new_server_prefix}/assessment/htmlsrc?acid=${toggleQuestionID}`,
            {
                method: "GET",
            }
        );
        let response = await fetch(request);
        let data = await response.json();
        let htmlsrc = data.detail;
        return htmlsrc;
    }

    // on changing the value of toggle select dropdown, render selected question in preview panel, add appropriate buttons, then make preview panel visible
    async togglePreview(parentID, toggleOptions, toggleQuestionTypes) {
        $("#toggle-buttons").html("");
        var parentDiv = document.getElementById(parentID);
        var toggleQuestionSelect = parentDiv.getElementsByTagName("select")[0];
        var selectedQuestion =
            toggleQuestionSelect.options[toggleQuestionSelect.selectedIndex]
                .value;
        var htmlsrc = await this.getToggleSrc(selectedQuestion);
        (0,_common_js_renderComponent_js__WEBPACK_IMPORTED_MODULE_0__.renderRunestoneComponent)(htmlsrc, "toggle-preview", {
            selector_id: "toggle-preview",
            is_toggle: this.toggleOptions,
            is_select: true,
            useRunestoneServices: true,
        });

        // add "Close Preview" button to the preview panel
        let closeButton = document.createElement("button");
        $(closeButton).text("Close Preview");
        $(closeButton).addClass("btn btn-default");
        $(closeButton).click(function (event) {
            $("#toggle-preview").html("");
            toggleQuestionSelect.value = $("#" + parentID).data(
                "toggle_current"
            );
            $("#component-preview").hide();
        });
        $("#toggle-buttons").append(closeButton);

        // if "lock" is not in toggle options, then allow adding more buttons to the preview panel
        if (!toggleOptions.includes("lock")) {
            let setButton = document.createElement("button");
            $(setButton).text("Select this Problem");
            $(setButton).addClass("btn btn-primary");
            $(setButton).click(
                async function () {
                    await this.toggleSet(
                        parentID,
                        selectedQuestion,
                        htmlsrc,
                        toggleQuestionTypes
                    );
                    $("#component-preview").hide();
                    this.logBookEvent({
                        event: "select_toggle",
                        act: selectedQuestion,
                        div_id: parentID,
                    });
                }.bind(this)
            );
            $("#toggle-buttons").append(setButton);

            // if "transfer" in toggle options, and if current question type is Parsons and selected question type is active code, then add "Transfer" button to preview panel
            if (toggleOptions.includes("transfer")) {
                var currentType = $("#" + parentID).data("toggle_current_type");
                var selectedType =
                    toggleQuestionTypes[toggleQuestionSelect.selectedIndex];
                if (
                    currentType == "Parsons Mixed-Up Code" &&
                    selectedType == "Active Write Code"
                ) {
                    let transferButton = document.createElement("button");
                    $(transferButton).text("Transfer Response");
                    $(transferButton).addClass("btn btn-primary");
                    $(transferButton).click(
                        async function () {
                            await this.toggleTransfer(
                                parentID,
                                selectedQuestion,
                                htmlsrc,
                                toggleQuestionTypes
                            );
                        }.bind(this)
                    );
                    $("#toggle-buttons").append(transferButton);
                }
            }
        }

        $("#component-preview").show();
    }

    // on clicking "Select this Problem" button, close preview panel, replace current question in assignments page with selected question, and send request to update grading database
    // _ `toggleSet`
    async toggleSet(parentID, selectedQuestion, htmlsrc, toggleQuestionTypes) {
        var selectorId = parentID + "-toggleSelectedQuestion";
        var toggleQuestionSelect = document
            .getElementById(parentID)
            .getElementsByTagName("select")[0];
        document.getElementById(selectorId).innerHTML = ""; // need to check whether this is even necessary
        await (0,_common_js_renderComponent_js__WEBPACK_IMPORTED_MODULE_0__.renderRunestoneComponent)(htmlsrc, selectorId, {
            selector_id: selectorId,
            is_toggle: this.toggleOptions,
            is_select: true,
            useRunestoneServices: true,
        });
        let request = new Request(
            `${eBookConfig.new_server_prefix}/assessment/set_selected_question?metaid=${parentID}&selected=${selectedQuestion}`,
            {}
        );
        await fetch(request);
        $("#toggle-preview").html("");
        $("#" + parentID).data("toggle_current", selectedQuestion);
        $("#" + parentID).data(
            "toggle_current_type",
            toggleQuestionTypes[toggleQuestionSelect.selectedIndex]
        );
    }

    // on clicking "Transfer" button, extract the current text and indentation of the Parsons blocks in the answer space, then paste that into the selected active code question
    async toggleTransfer(
        parentID,
        selectedQuestion,
        htmlsrc,
        toggleQuestionTypes
    ) {
        // retrieve all Parsons lines within the answer space and loop through this list
        var currentParsons = document
            .getElementById(parentID + "-toggleSelectedQuestion")
            .querySelectorAll("div[class^='answer']")[0]
            .getElementsByClassName("prettyprint lang-py");
        var currentParsonsClass;
        var currentBlockIndent;
        var indentCount;
        var indent;
        var parsonsLine;
        var parsonsLines = ``;
        var count;
        for (var p = 0; p < currentParsons.length; p++) {
            indentCount = 0;
            indent = "";
            // for Parsons blocks that have built-in indentation in their lines
            currentParsonsClass = currentParsons[p].classList[2];
            if (currentParsonsClass) {
                if (currentParsonsClass.includes("indent")) {
                    indentCount =
                        parseInt(indentCount) +
                        parseInt(
                            currentParsonsClass.slice(
                                6,
                                currentParsonsClass.length
                            )
                        );
                }
            }
            // for Parsons answer spaces with vertical lines that allow student to define their own line indentation
            currentBlockIndent =
                currentParsons[p].parentElement.parentElement.style.left;
            if (currentBlockIndent) {
                indentCount =
                    parseInt(indentCount) +
                    parseInt(
                        currentBlockIndent.slice(
                            0,
                            currentBlockIndent.indexOf("px")
                        ) / 30
                    );
            }
            for (var d = 0; d < indentCount; d++) {
                indent += "    ";
            }
            // retrieve each text snippet of each Parsons line and loop through this list
            parsonsLine = currentParsons[p].getElementsByTagName("span");
            count = 0;
            for (var l = 0; l < parsonsLine.length; l++) {
                if (parsonsLine[l].childNodes[0].nodeName == "#text") {
                    // Parsons blocks have differing amounts of hierarchy levels (spans within spans)
                    if (p == 0 && count == 0) {
                        // need different check than l == 0 because the l numbering doesn't align with location within line due to inconsistent span heirarchy
                        parsonsLines += indent + parsonsLine[l].innerHTML;
                        count++;
                    } else if (count != 0) {
                        parsonsLines += parsonsLine[l].innerHTML;
                        count++;
                    } else {
                        parsonsLines =
                            parsonsLines +
                            `
                            ` +
                            indent +
                            parsonsLine[l].innerHTML;
                        parsonsLines = parsonsLines.replace(
                            "                            ",
                            ""
                        );
                        count++;
                    }
                }
            }
        }
        // replace all existing code within selected active code question with extracted Parsons text
        var htmlsrcFormer = htmlsrc.slice(
            0,
            htmlsrc.indexOf("<textarea") +
                htmlsrc.split("<textarea")[1].indexOf(">") +
                10
        );
        var htmlsrcLatter = htmlsrc.slice(
            htmlsrc.indexOf("</textarea>"),
            htmlsrc.length
        );
        htmlsrc = htmlsrcFormer + parsonsLines + htmlsrcLatter;

        await this.toggleSet(
            parentID,
            selectedQuestion,
            htmlsrc,
            toggleQuestionTypes
        );
        $("#component-preview").hide();
    }
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.selectquestion = function (opts) {
    return new SelectOne(opts);
};

/*
 * When the page is loaded and the login checks are complete find and render
 * each selectquestion component that is not part of a timedAssessment.
 **/
$(document).bind("runestone:login-complete", async function () {
    let selQuestions = document.querySelectorAll(
        "[data-component=selectquestion]"
    );
    for (let cq of selQuestions) {
        try {
            if ($(cq).closest("[data-component=timedAssessment]").length == 0) {
                // If this element exists within a timed component, don't render it here
                let tmp = new SelectOne({ orig: cq });
                await tmp.initialize();
            }
        } catch (err) {
            console.log(`Error rendering New Exercise ${cq.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3NlbGVjdHF1ZXN0aW9uX2pzX3NlbGVjdG9uZV9qcy4zMGRkYTJhYjdjNzZlYzYwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTZEOztBQUV0RDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQixtQkFBbUIsdUJBQXVCO0FBQ3JFO0FBQ0EsZUFBZSxTQUFTOztBQUV4QjtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLFVBQVU7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtRUFBZ0I7QUFDMUI7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBLHVCQUF1QixTQUFTO0FBQ2hDLGdEQUFnRCxjQUFjO0FBQzlEO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDJCQUEyQixFQUFFLFVBQVU7QUFDbEU7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0IsbUJBQW1CLHVCQUF1QjtBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEMsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBLFVBQVU7QUFDVix3REFBd0Q7QUFDeEQsb0NBQW9DLElBQUk7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvc2VsZWN0cXVlc3Rpb24vY3NzL3NlbGVjdHF1ZXN0aW9uLmNzcz9iZWQzIiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvY29tbW9uL2pzL3JlbmRlckNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9XZWJDb21wb25lbnRzLy4vcnVuZXN0b25lL3NlbGVjdHF1ZXN0aW9uL2pzL3NlbGVjdG9uZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBydW5lc3RvbmVfaW1wb3J0IH0gZnJvbSBcIi4uLy4uLy4uL3dlYnBhY2suaW5kZXguanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlclJ1bmVzdG9uZUNvbXBvbmVudChjb21wb25lbnRTcmMsIHdoZXJlRGl2LCBtb3JlT3B0cykge1xuICAgIC8qKlxuICAgICAqICBUaGUgZWFzeSBwYXJ0IGlzIGFkZGluZyB0aGUgY29tcG9uZW50U3JjIHRvIHRoZSBleGlzdGluZyBkaXYuXG4gICAgICogIFRoZSB0ZWRpb3VzIHBhcnQgaXMgY2FsbGluZyB0aGUgcmlnaHQgZnVuY3Rpb25zIHRvIHR1cm4gdGhlXG4gICAgICogIHNvdXJjZSBpbnRvIHRoZSBhY3R1YWwgY29tcG9uZW50LlxuICAgICAqL1xuICAgIGlmICghY29tcG9uZW50U3JjKSB7XG4gICAgICAgIGpRdWVyeShgIyR7d2hlcmVEaXZ9YCkuaHRtbChgPHA+U29ycnksIG5vIHNvdXJjZSBpcyBhdmFpbGFibGUgZm9yIHByZXZpZXcuPC9wPmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwYXR0ID0gLy4uXFwvX2ltYWdlcy9nO1xuICAgIGNvbXBvbmVudFNyYyA9IGNvbXBvbmVudFNyYy5yZXBsYWNlKFxuICAgICAgICBwYXR0LFxuICAgICAgICBgJHtlQm9va0NvbmZpZy5hcHB9L2Jvb2tzL3B1Ymxpc2hlZC8ke2VCb29rQ29uZmlnLmJhc2Vjb3Vyc2V9L19pbWFnZXNgXG4gICAgKTtcbiAgICBqUXVlcnkoYCMke3doZXJlRGl2fWApLmh0bWwoY29tcG9uZW50U3JjKTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93LmVkTGlzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cuZWRMaXN0ID0ge307XG4gICAgfVxuXG4gICAgbGV0IGNvbXBvbmVudEtpbmQgPSAkKCQoYCMke3doZXJlRGl2fSBbZGF0YS1jb21wb25lbnRdYClbMF0pLmRhdGEoXG4gICAgICAgIFwiY29tcG9uZW50XCJcbiAgICApO1xuICAgIC8vIEltcG9ydCB0aGUgSmF2YVNjcmlwdCBmb3IgdGhpcyBjb21wb25lbnQgYmVmb3JlIHByb2NlZWRpbmcuXG4gICAgYXdhaXQgcnVuZXN0b25lX2ltcG9ydChjb21wb25lbnRLaW5kKTtcbiAgICBsZXQgb3B0ID0ge307XG4gICAgb3B0Lm9yaWcgPSBqUXVlcnkoYCMke3doZXJlRGl2fSBbZGF0YS1jb21wb25lbnRdYClbMF07XG4gICAgaWYgKG9wdC5vcmlnKSB7XG4gICAgICAgIG9wdC5sYW5nID0gJChvcHQub3JpZykuZGF0YShcImxhbmdcIik7XG4gICAgICAgIG9wdC51c2VSdW5lc3RvbmVTZXJ2aWNlcyA9IHRydWU7XG4gICAgICAgIG9wdC5ncmFkZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgb3B0LnB5dGhvbjMgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIG1vcmVPcHRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbW9yZU9wdHMpIHtcbiAgICAgICAgICAgICAgICBvcHRba2V5XSA9IG1vcmVPcHRzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudF9mYWN0b3J5ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGFsZXJ0KFxuICAgICAgICAgICAgXCJFcnJvcjogIE1pc3NpbmcgdGhlIGNvbXBvbmVudCBmYWN0b3J5IVwiXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXdpbmRvdy5jb21wb25lbnRfZmFjdG9yeVtjb21wb25lbnRLaW5kXSAmJlxuICAgICAgICAgICAgIWpRdWVyeShgIyR7d2hlcmVEaXZ9YCkuaHRtbCgpXG4gICAgICAgICkge1xuICAgICAgICAgICAgalF1ZXJ5KGAjJHt3aGVyZURpdn1gKS5odG1sKFxuICAgICAgICAgICAgICAgIGA8cD5QcmV2aWV3IG5vdCBhdmFpbGFibGUgZm9yICR7Y29tcG9uZW50S2luZH08L3A+YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZXMgPSB3aW5kb3cuY29tcG9uZW50X2ZhY3RvcnlbY29tcG9uZW50S2luZF0ob3B0KTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRLaW5kID09PSBcImFjdGl2ZWNvZGVcIikge1xuICAgICAgICAgICAgICAgIGlmIChtb3JlT3B0cy5tdWx0aUdyYWRlcikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZWRMaXN0W1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7bW9yZU9wdHMuZ3JhZGluZ0NvbnRhaW5lcn0gJHtyZXMuZGl2aWR9YFxuICAgICAgICAgICAgICAgICAgICBdID0gcmVzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5lZExpc3RbcmVzLmRpdmlkXSA9IHJlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUaW1lZENvbXBvbmVudChjb21wb25lbnRTcmMsIG1vcmVPcHRzKSB7XG4gICAgLyogVGhlIGltcG9ydGFudCBkaXN0aW5jdGlvbiBpcyB0aGF0IHRoZSBjb21wb25lbnQgZG9lcyBub3QgcmVhbGx5IG5lZWQgdG8gYmUgcmVuZGVyZWRcbiAgICBpbnRvIHRoZSBwYWdlLCBpbiBmYWN0LCBkdWUgdG8gdGhlIGFzeW5jIG5hdHVyZSBvZiBnZXR0aW5nIHRoZSBzb3VyY2UgdGhlIGxpc3Qgb2YgcXVlc3Rpb25zXG4gICAgaXMgbWFkZSBhbmQgdGhlIG9yaWdpbmFsIGh0bWwgaXMgcmVwbGFjZWQgYnkgdGhlIGxvb2sgb2YgdGhlIGV4YW0uXG4gICAgKi9cblxuICAgIGxldCBwYXR0ID0gLy4uXFwvX2ltYWdlcy9nO1xuICAgIGNvbXBvbmVudFNyYyA9IGNvbXBvbmVudFNyYy5yZXBsYWNlKFxuICAgICAgICBwYXR0LFxuICAgICAgICBgJHtlQm9va0NvbmZpZy5hcHB9L2Jvb2tzL3B1Ymxpc2hlZC8ke2VCb29rQ29uZmlnLmJhc2Vjb3Vyc2V9L19pbWFnZXNgXG4gICAgKTtcblxuICAgIGxldCBjb21wb25lbnRLaW5kID0gJCgkKGNvbXBvbmVudFNyYykuZmluZChcIltkYXRhLWNvbXBvbmVudF1cIilbMF0pLmRhdGEoXG4gICAgICAgIFwiY29tcG9uZW50XCJcbiAgICApO1xuXG4gICAgbGV0IG9yaWdJZCA9ICQoY29tcG9uZW50U3JjKS5maW5kKFwiW2RhdGEtY29tcG9uZW50XVwiKS5maXJzdCgpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIERvdWJsZSBjaGVjayAtLSBpZiB0aGUgY29tcG9uZW50IHNvdXJjZSBpcyBub3QgaW4gdGhlIERPTSwgdGhlbiBicmllZmx5IGFkZCBpdFxuICAgIC8vIGFuZCBjYWxsIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICBsZXQgaGRpdjtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9yaWdJZCkpIHtcbiAgICAgICAgaGRpdiA9ICQoXCI8ZGl2Lz5cIiwge1xuICAgICAgICAgICAgY3NzOiB7IGRpc3BsYXk6IFwibm9uZVwiIH0sXG4gICAgICAgIH0pLmFwcGVuZFRvKFwiYm9keVwiKTtcbiAgICAgICAgaGRpdi5odG1sKGNvbXBvbmVudFNyYyk7XG4gICAgfVxuICAgIC8vIGF0IHRoaXMgcG9pbnQgaGRpdiBpcyBhIGpxdWVyeSBvYmplY3RcblxuICAgIGxldCByZXQ7XG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIG9yaWc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9yaWdJZCksXG4gICAgICAgIHRpbWVkOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKHR5cGVvZiBtb3JlT3B0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbW9yZU9wdHMpIHtcbiAgICAgICAgICAgIG9wdHNba2V5XSA9IG1vcmVPcHRzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50S2luZCBpbiB3aW5kb3cuY29tcG9uZW50X2ZhY3RvcnkpIHtcbiAgICAgICAgcmV0ID0gd2luZG93LmNvbXBvbmVudF9mYWN0b3J5W2NvbXBvbmVudEtpbmRdKG9wdHMpO1xuICAgIH1cblxuICAgIGxldCByZGljdCA9IHt9O1xuICAgIHJkaWN0LnF1ZXN0aW9uID0gcmV0O1xuICAgIHJldHVybiByZGljdDtcbn1cbiIsIi8qKlxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogfGRvY25hbWV8IC0gU2VsZWN0T25lIENvbXBvbmVudFxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5pbXBvcnQge1xuICAgIHJlbmRlclJ1bmVzdG9uZUNvbXBvbmVudCxcbiAgICBjcmVhdGVUaW1lZENvbXBvbmVudCxcbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9qcy9yZW5kZXJDb21wb25lbnQuanNcIjtcbmltcG9ydCBSdW5lc3RvbmVCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vanMvcnVuZXN0b25lYmFzZS5qc1wiO1xuaW1wb3J0IFwiLi4vY3NzL3NlbGVjdHF1ZXN0aW9uLmNzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RPbmUgZXh0ZW5kcyBSdW5lc3RvbmVCYXNlIHtcbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvciAtLVxuICAgICAqIE1ha2luZyBhbiBpbnN0YW5jZSBvZiBhIHNlbGVjdG9uZSBpcyBhIGJpdCBtb3JlIGNvbXBsaWNhdGVkIGJlY2F1c2UgaXQgaXNcbiAgICAgKiBhIGtpbmQgb2YgbWV0YSBkaXJlY3RpdmUuICBUaGF0IGlzLCBnbyB0byB0aGUgc2VydmVyIGFuZCByYW5kb21seSBzZWxlY3RcbiAgICAgKiBhIHF1ZXN0aW9uIHRvIGRpc3BsYXkgaW4gdGhpcyBzcG90LiAgT3IsIGlmIGEgc3R1ZGVudCBoYXMgYWxyZWFkeSBzZWVuIHRoaXMgcXVlc3Rpb25cbiAgICAgKiBpbiB0aGUgY29udGV4dCBvZiBhbiBleGFtIHJldHJpZXZlIHRoZSBxdWVzdGlvbiB0aGV5IHNhdyBpbiB0aGUgZmlyc3QgcGxhY2UuXG4gICAgICogTWFraW5nIGFuIEFQSSBjYWxsIGFuZCB3YWl0aW5nIGZvciB0aGUgcmVzcG9uc2UgaXMgaGFuZGxlZCBhc3luY2hyb25vdXNseS5cbiAgICAgKiBCdXQgbG90cyBvZiBjb2RlIGlzIG5vdCB3cml0dGVuIHdpdGggdGhhdCBhc3N1bXB0aW9uLiAgU28gd2UgZG8gdGhlIGluaXRpYWxpemF0aW9uIGluXG4gICAgICogdHdvIHBhcnRzLlxuICAgICAqIDEuIENyZWF0ZSB0aGUgb2JqZWN0IHdpdGggdGhlIHVzdWFsIGNvbnN0cnVjdG9yXG4gICAgICogMi4gY2FsbCBpbml0aWFsaXplLCB3aGljaCByZXR1cm5zIGEgcHJvbWlzZS4gIFdoZW4gdGhhdCBwcm9taXNlIGlzIHJlc29sdmVkXG4gICAgICogdGhlIFwicmVwbGFjZW1lbnRcIiBjb21wb25lbnQgd2lsbCByZXBsYWNlIHRoZSBvcmlnaW5hbCBzZWxlY3RvbmUgY29tcG9uZW50IGluIHRoZSBET00uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHt9IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLm9yaWdPcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSAkKG9wdHMub3JpZykuZGF0YShcInF1ZXN0aW9ubGlzdFwiKTtcbiAgICAgICAgdGhpcy5wcm9maWNpZW5jeSA9ICQob3B0cy5vcmlnKS5kYXRhKFwicHJvZmljaWVuY3lcIik7XG4gICAgICAgIHRoaXMubWluRGlmZmljdWx0eSA9ICQob3B0cy5vcmlnKS5kYXRhKFwibWluRGlmZmljdWx0eVwiKTtcbiAgICAgICAgdGhpcy5tYXhEaWZmaWN1bHR5ID0gJChvcHRzLm9yaWcpLmRhdGEoXCJtYXhEaWZmaWN1bHR5XCIpO1xuICAgICAgICB0aGlzLnBvaW50cyA9ICQob3B0cy5vcmlnKS5kYXRhKFwicG9pbnRzXCIpO1xuICAgICAgICB0aGlzLmF1dG9ncmFkYWJsZSA9ICQob3B0cy5vcmlnKS5kYXRhKFwiYXV0b2dyYWRhYmxlXCIpO1xuICAgICAgICB0aGlzLm5vdF9zZWVuX2V2ZXIgPSAkKG9wdHMub3JpZykuZGF0YShcIm5vdF9zZWVuX2V2ZXJcIik7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JfaWQgPSAkKG9wdHMub3JpZykuZmlyc3QoKS5hdHRyKFwiaWRcIik7XG4gICAgICAgIHRoaXMucHJpbWFyeU9ubHkgPSAkKG9wdHMub3JpZykuZGF0YShcInByaW1hcnlcIik7XG4gICAgICAgIHRoaXMuQUJFeHBlcmltZW50ID0gJChvcHRzLm9yaWcpLmRhdGEoXCJhYlwiKTtcbiAgICAgICAgdGhpcy50b2dnbGVPcHRpb25zID0gJChvcHRzLm9yaWcpLmRhdGEoXCJ0b2dnbGVvcHRpb25zXCIpO1xuICAgICAgICB0aGlzLnRvZ2dsZUxhYmVscyA9ICQob3B0cy5vcmlnKS5kYXRhKFwidG9nZ2xlbGFiZWxzXCIpO1xuICAgICAgICB0aGlzLmxpbWl0QmFzZUNvdXJzZSA9ICQob3B0cy5vcmlnKS5kYXRhKFwibGltaXQtYmFzZWNvdXJzZVwiKTtcbiAgICAgICAgb3B0cy5vcmlnLmlkID0gdGhpcy5zZWxlY3Rvcl9pZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAtLVxuICAgICAqIGluaXRpYWxpemUgaXMgdXNlZCBzbyB0aGF0IHRoZSBjb25zdHJ1Y3RvciBkb2VzIG5vdCBoYXZlIHRvIGJlIGFzeW5jLlxuICAgICAqIENvbnN0cnVjdG9ycyBzaG91bGQgZGVmaW5pdGVseSBub3QgcmV0dXJuIHByb21pc2VzIHRoYXQgd291bGQgc2VyaW91c2x5XG4gICAgICogbWVzcyB0aGluZ3MgdXAuXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIGFmdGVyIGNvbXBvbmVudCBmcm9tIERCIGlzIHJlaWZpZWRcbiAgICAgKi9cbiAgICBhc3luYyBpbml0aWFsaXplKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBkYXRhID0geyBzZWxlY3Rvcl9pZDogdGhpcy5zZWxlY3Rvcl9pZCB9O1xuICAgICAgICBpZiAodGhpcy5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIGRhdGEucXVlc3Rpb25zID0gdGhpcy5xdWVzdGlvbnM7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9maWNpZW5jeSkge1xuICAgICAgICAgICAgZGF0YS5wcm9maWNpZW5jeSA9IHRoaXMucHJvZmljaWVuY3k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWluRGlmZmljdWx0eSkge1xuICAgICAgICAgICAgZGF0YS5taW5EaWZmaWN1bHR5ID0gdGhpcy5taW5EaWZmaWN1bHR5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1heERpZmZpY3VsdHkpIHtcbiAgICAgICAgICAgIGRhdGEubWF4RGlmZmljdWx0eSA9IHRoaXMubWF4RGlmZmljdWx0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wb2ludHMpIHtcbiAgICAgICAgICAgIGRhdGEucG9pbnRzID0gdGhpcy5wb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXV0b2dyYWRhYmxlKSB7XG4gICAgICAgICAgICBkYXRhLmF1dG9ncmFkYWJsZSA9IHRoaXMuYXV0b2dyYWRhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5vdF9zZWVuX2V2ZXIpIHtcbiAgICAgICAgICAgIGRhdGEubm90X3NlZW5fZXZlciA9IHRoaXMubm90X3NlZW5fZXZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmltYXJ5T25seSkge1xuICAgICAgICAgICAgZGF0YS5wcmltYXJ5ID0gdGhpcy5wcmltYXJ5T25seTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5BQkV4cGVyaW1lbnQpIHtcbiAgICAgICAgICAgIGRhdGEuQUIgPSB0aGlzLkFCRXhwZXJpbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aW1lZFdyYXBwZXIpIHtcbiAgICAgICAgICAgIGRhdGEudGltZWRXcmFwcGVyID0gdGhpcy50aW1lZFdyYXBwZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlT3B0aW9ucykge1xuICAgICAgICAgICAgZGF0YS50b2dnbGVPcHRpb25zID0gdGhpcy50b2dnbGVPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZUxhYmVscykge1xuICAgICAgICAgICAgZGF0YS50b2dnbGVMYWJlbHMgPSB0aGlzLnRvZ2dsZUxhYmVscztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5saW1pdEJhc2VDb3Vyc2UpIHtcbiAgICAgICAgICAgIGRhdGEubGltaXRCYXNlQ291cnNlID0gZUJvb2tDb25maWcuYmFzZWNvdXJzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3JpZ09wdHM7XG4gICAgICAgIGxldCBzZWxlY3RvcklkID0gdGhpcy5zZWxlY3Rvcl9pZDtcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXR0aW5nIHF1ZXN0aW9uIHNvdXJjZVwiKTtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcbiAgICAgICAgICAgIGAke2VCb29rQ29uZmlnLm5ld19zZXJ2ZXJfcHJlZml4fS9hc3Nlc3NtZW50L2dldF9xdWVzdGlvbl9zb3VyY2VgLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5qc29uSGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgIGxldCBodG1sc3JjID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBodG1sc3JjID0gaHRtbHNyYy5kZXRhaWw7XG4gICAgICAgIGlmIChodG1sc3JjLmluZGV4T2YoXCJObyBwcmV2aWV3XCIpID49IDApIHtcbiAgICAgICAgICAgIGFsZXJ0KFxuICAgICAgICAgICAgICAgIGBFcnJvcjogTm90IGFibGUgdG8gZmluZCBhIHF1ZXN0aW9uIGZvciAke3NlbGVjdG9ySWR9IGJhc2VkIG9uIHRoZSBjcml0ZXJpYWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGEgcXVlc3Rpb24gZm9yICR7c2VsZWN0b3JJZH1gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzO1xuICAgICAgICBpZiAob3B0cy50aW1lZCkge1xuICAgICAgICAgICAgLy8gdGltZWQgY29tcG9uZW50cyBhcmUgbm90IHJlbmRlcmVkIGltbWVkaWF0ZWx5LCBvbmx5IHdoZW4gdGhlIHN0dWRlbnRcbiAgICAgICAgICAgIC8vIHN0YXJ0cyB0aGUgYXNzZXNzbWVudCBhbmQgdmlzaXRzIHRoaXMgcGFydGljdWxhciBlbnRyeS5cbiAgICAgICAgICAgIHJlcyA9IGNyZWF0ZVRpbWVkQ29tcG9uZW50KGh0bWxzcmMsIHtcbiAgICAgICAgICAgICAgICB0aW1lZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvcl9pZDogc2VsZWN0b3JJZCxcbiAgICAgICAgICAgICAgICBhc3Nlc3NtZW50VGFrZW46IG9wdHMuYXNzZXNzbWVudFRha2VuLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBlbnRyeSBpbiB0aGUgdGltZWQgYXNzZXNzbWVudCdzIGxpc3Qgb2YgY29tcG9uZW50c1xuICAgICAgICAgICAgLy8gd2l0aCB0aGUgY29tcG9uZW50IGNyZWF0ZWQgYnkgY3JlYXRlVGltZWRDb21wb25lbnRcbiAgICAgICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiBvcHRzLnJxYSkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQucXVlc3Rpb24gPT0gc2VsZikge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQucXVlc3Rpb24gPSByZXMucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucmVhbENvbXBvbmVudCA9IHJlcy5xdWVzdGlvbjtcbiAgICAgICAgICAgIHNlbGYuY29udGFpbmVyRGl2ID0gcmVzLnF1ZXN0aW9uLmNvbnRhaW5lckRpdjtcbiAgICAgICAgICAgIHNlbGYucmVhbENvbXBvbmVudC5zZWxlY3RvcklkID0gc2VsZWN0b3JJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvZ2dsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlTGFiZWxzID0gZGF0YS50b2dnbGVMYWJlbHNcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ0b2dnbGVsYWJlbHM6XCIsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUxhYmVscykge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVMYWJlbHMgPSB0b2dnbGVMYWJlbHMuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRvZ2dsZUxhYmVscy5sZW5ndGg7IHQrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlTGFiZWxzW3RdID0gdG9nZ2xlTGFiZWxzW3RdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlUXVlc3Rpb25zID0gdGhpcy5xdWVzdGlvbnMuc3BsaXQoXCIsIFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlVUkgPSBcIlwiO1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIHNvIHRoYXQgb25seSB0aGUgZmlyc3QgdG9nZ2xlIHNlbGVjdCBxdWVzdGlvbiBvbiB0aGUgYXNzaWdubWVudHMgcGFnZSBoYXMgYSBwcmV2aWV3IHBhbmVsIGNyZWF0ZWQsIHRoZW4gYWxsIHRvZ2dsZSBzZWxlY3QgcHJldmlld3MgdXNlIHRoaXMgc2FtZSBwYW5lbFxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wb25lbnQtcHJldmlld1wiKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVVSSArPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgaWQ9XCJjb21wb25lbnQtcHJldmlld1wiIGNsYXNzPVwiY29sLW1kLTYgdG9nZ2xlLXByZXZpZXdcIiBzdHlsZT1cInotaW5kZXg6IDk5OTtcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGlkPVwidG9nZ2xlLWJ1dHRvbnNcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGlkPVwidG9nZ2xlLXByZXZpZXdcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRyb3Bkb3duIG1lbnUgY29udGFpbmluZyB0aGUgcXVlc3Rpb24gb3B0aW9uc1xuICAgICAgICAgICAgICAgIHRvZ2dsZVVJICs9XG4gICAgICAgICAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiJyArXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySWQgK1xuICAgICAgICAgICAgICAgICAgICAnLXRvZ2dsZVF1ZXN0aW9uXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogMTBweFwiPlRvZ2dsZSBRdWVzdGlvbjo8L2xhYmVsPjxzZWxlY3QgaWQ9XCInICtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JJZCArXG4gICAgICAgICAgICAgICAgICAgICctdG9nZ2xlUXVlc3Rpb25cIj4nO1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVRdWVzdGlvbkhUTUxTcmM7XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZVF1ZXN0aW9uU3Vic3RyaW5nO1xuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVRdWVzdGlvblR5cGU7XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZVF1ZXN0aW9uVHlwZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9nZ2xlUXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uSFRNTFNyYyA9IGF3YWl0IHRoaXMuZ2V0VG9nZ2xlU3JjKFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25zW2ldXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU3Vic3RyaW5nID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uSFRNTFNyYy5zcGxpdCgnZGF0YS1jb21wb25lbnQ9XCInKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU3Vic3RyaW5nLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25TdWJzdHJpbmcuaW5kZXhPZignXCInKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhY3RpdmVjb2RlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlID0gXCJBY3RpdmUgV3JpdGUgQ29kZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNsaWNrYWJsZWFyZWFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVRdWVzdGlvblR5cGUgPSBcIkNsaWNrYWJsZSBBcmVhXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZHJhZ25kcm9wXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlID0gXCJEcmFnIG4gRHJvcFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZpbGxpbnRoZWJsYW5rXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlID0gXCJGaWxsIGluIHRoZSBCbGFua1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm11bHRpcGxlY2hvaWNlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlID0gXCJNdWx0aXBsZSBDaG9pY2VcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwYXJzb25zXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlID0gXCJQYXJzb25zIE1peGVkLVVwIENvZGVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzaG9ydGFuc3dlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZSA9IFwiU2hvcnQgQW5zd2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlc1tpXSA9IHRvZ2dsZVF1ZXN0aW9uVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlVUkgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgdG9nZ2xlUXVlc3Rpb25zW2ldICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGVMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGVMYWJlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVVSSArPSB0b2dnbGVMYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVVJICs9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZSArIFwiIC0gXCIgKyB0b2dnbGVRdWVzdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVVSSArPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZSArIFwiIC0gXCIgKyB0b2dnbGVRdWVzdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCAmJiBkYXRhLnRvZ2dsZU9wdGlvbnMuaW5jbHVkZXMoXCJsb2NrXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVVSSArPSBcIiAob25seSB0aGlzIHF1ZXN0aW9uIHdpbGwgYmUgZ3JhZGVkKVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVVJICs9IFwiPC9vcHRpb24+XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZVVJICs9XG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD48ZGl2IGlkPVwiJyArXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySWQgK1xuICAgICAgICAgICAgICAgICAgICAnLXRvZ2dsZVNlbGVjdGVkUXVlc3Rpb25cIj4nO1xuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVGaXJzdElEID0gaHRtbHNyYy5zcGxpdCgnaWQ9XCInKVsxXTtcbiAgICAgICAgICAgICAgICB0b2dnbGVGaXJzdElEID0gdG9nZ2xlRmlyc3RJRC5zcGxpdCgnXCInKVswXTtcbiAgICAgICAgICAgICAgICBodG1sc3JjID0gdG9nZ2xlVUkgKyBodG1sc3JjICsgXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGp1c3QgcmVuZGVyIHRoaXMgY29tcG9uZW50IG9uIHRoZSBwYWdlIGluIGl0cyB1c3VhbCBwbGFjZVxuICAgICAgICAgICAgYXdhaXQgcmVuZGVyUnVuZXN0b25lQ29tcG9uZW50KGh0bWxzcmMsIHNlbGVjdG9ySWQsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rvcl9pZDogc2VsZWN0b3JJZCxcbiAgICAgICAgICAgICAgICBpc190b2dnbGU6IHRoaXMudG9nZ2xlT3B0aW9ucyxcbiAgICAgICAgICAgICAgICBpc19zZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlUnVuZXN0b25lU2VydmljZXM6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvZ2dsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAkKFwiI2NvbXBvbmVudC1wcmV2aWV3XCIpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlUXVlc3Rpb25TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JJZCArIFwiLXRvZ2dsZVF1ZXN0aW9uXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2dnbGVRdWVzdGlvblNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU2VsZWN0Lm9wdGlvbnNbaV0udmFsdWUgPT0gdG9nZ2xlRmlyc3RJRFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU2VsZWN0LnZhbHVlID0gdG9nZ2xlRmlyc3RJRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzZWxlY3RvcklkKS5kYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9nZ2xlX2N1cnJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVGaXJzdElEXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNcIiArIHNlbGVjdG9ySWQpLmRhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2dnbGVfY3VycmVudF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlc1swXVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUHJldmlldyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVRdWVzdGlvblNlbGVjdC5wYXJlbnRFbGVtZW50LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudG9nZ2xlT3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVRdWVzdGlvblR5cGVzXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBcInZpZXdfdG9nZ2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0OiB0b2dnbGVRdWVzdGlvblNlbGVjdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZfaWQ6IHRvZ2dsZVF1ZXN0aW9uU2VsZWN0LnBhcmVudEVsZW1lbnQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gcmV0cmlldmUgaHRtbCBzb3VyY2Ugb2YgYSBxdWVzdGlvbiwgZm9yIHVzZSBpbiB2YXJpb3VzIHRvZ2dsZSBmdW5jdGlvbmFsaXRpZXNcbiAgICBhc3luYyBnZXRUb2dnbGVTcmModG9nZ2xlUXVlc3Rpb25JRCkge1xuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KFxuICAgICAgICAgICAgYCR7ZUJvb2tDb25maWcubmV3X3NlcnZlcl9wcmVmaXh9L2Fzc2Vzc21lbnQvaHRtbHNyYz9hY2lkPSR7dG9nZ2xlUXVlc3Rpb25JRH1gLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBsZXQgaHRtbHNyYyA9IGRhdGEuZGV0YWlsO1xuICAgICAgICByZXR1cm4gaHRtbHNyYztcbiAgICB9XG5cbiAgICAvLyBvbiBjaGFuZ2luZyB0aGUgdmFsdWUgb2YgdG9nZ2xlIHNlbGVjdCBkcm9wZG93biwgcmVuZGVyIHNlbGVjdGVkIHF1ZXN0aW9uIGluIHByZXZpZXcgcGFuZWwsIGFkZCBhcHByb3ByaWF0ZSBidXR0b25zLCB0aGVuIG1ha2UgcHJldmlldyBwYW5lbCB2aXNpYmxlXG4gICAgYXN5bmMgdG9nZ2xlUHJldmlldyhwYXJlbnRJRCwgdG9nZ2xlT3B0aW9ucywgdG9nZ2xlUXVlc3Rpb25UeXBlcykge1xuICAgICAgICAkKFwiI3RvZ2dsZS1idXR0b25zXCIpLmh0bWwoXCJcIik7XG4gICAgICAgIHZhciBwYXJlbnREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRJRCk7XG4gICAgICAgIHZhciB0b2dnbGVRdWVzdGlvblNlbGVjdCA9IHBhcmVudERpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlbGVjdFwiKVswXTtcbiAgICAgICAgdmFyIHNlbGVjdGVkUXVlc3Rpb24gPVxuICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25TZWxlY3Qub3B0aW9uc1t0b2dnbGVRdWVzdGlvblNlbGVjdC5zZWxlY3RlZEluZGV4XVxuICAgICAgICAgICAgICAgIC52YWx1ZTtcbiAgICAgICAgdmFyIGh0bWxzcmMgPSBhd2FpdCB0aGlzLmdldFRvZ2dsZVNyYyhzZWxlY3RlZFF1ZXN0aW9uKTtcbiAgICAgICAgcmVuZGVyUnVuZXN0b25lQ29tcG9uZW50KGh0bWxzcmMsIFwidG9nZ2xlLXByZXZpZXdcIiwge1xuICAgICAgICAgICAgc2VsZWN0b3JfaWQ6IFwidG9nZ2xlLXByZXZpZXdcIixcbiAgICAgICAgICAgIGlzX3RvZ2dsZTogdGhpcy50b2dnbGVPcHRpb25zLFxuICAgICAgICAgICAgaXNfc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgdXNlUnVuZXN0b25lU2VydmljZXM6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkZCBcIkNsb3NlIFByZXZpZXdcIiBidXR0b24gdG8gdGhlIHByZXZpZXcgcGFuZWxcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgJChjbG9zZUJ1dHRvbikudGV4dChcIkNsb3NlIFByZXZpZXdcIik7XG4gICAgICAgICQoY2xvc2VCdXR0b24pLmFkZENsYXNzKFwiYnRuIGJ0bi1kZWZhdWx0XCIpO1xuICAgICAgICAkKGNsb3NlQnV0dG9uKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICQoXCIjdG9nZ2xlLXByZXZpZXdcIikuaHRtbChcIlwiKTtcbiAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uU2VsZWN0LnZhbHVlID0gJChcIiNcIiArIHBhcmVudElEKS5kYXRhKFxuICAgICAgICAgICAgICAgIFwidG9nZ2xlX2N1cnJlbnRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICQoXCIjY29tcG9uZW50LXByZXZpZXdcIikuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChcIiN0b2dnbGUtYnV0dG9uc1wiKS5hcHBlbmQoY2xvc2VCdXR0b24pO1xuXG4gICAgICAgIC8vIGlmIFwibG9ja1wiIGlzIG5vdCBpbiB0b2dnbGUgb3B0aW9ucywgdGhlbiBhbGxvdyBhZGRpbmcgbW9yZSBidXR0b25zIHRvIHRoZSBwcmV2aWV3IHBhbmVsXG4gICAgICAgIGlmICghdG9nZ2xlT3B0aW9ucy5pbmNsdWRlcyhcImxvY2tcIikpIHtcbiAgICAgICAgICAgIGxldCBzZXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgJChzZXRCdXR0b24pLnRleHQoXCJTZWxlY3QgdGhpcyBQcm9ibGVtXCIpO1xuICAgICAgICAgICAgJChzZXRCdXR0b24pLmFkZENsYXNzKFwiYnRuIGJ0bi1wcmltYXJ5XCIpO1xuICAgICAgICAgICAgJChzZXRCdXR0b24pLmNsaWNrKFxuICAgICAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy50b2dnbGVTZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUXVlc3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sc3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUXVlc3Rpb25UeXBlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbXBvbmVudC1wcmV2aWV3XCIpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IFwic2VsZWN0X3RvZ2dsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0OiBzZWxlY3RlZFF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2X2lkOiBwYXJlbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgJChcIiN0b2dnbGUtYnV0dG9uc1wiKS5hcHBlbmQoc2V0QnV0dG9uKTtcblxuICAgICAgICAgICAgLy8gaWYgXCJ0cmFuc2ZlclwiIGluIHRvZ2dsZSBvcHRpb25zLCBhbmQgaWYgY3VycmVudCBxdWVzdGlvbiB0eXBlIGlzIFBhcnNvbnMgYW5kIHNlbGVjdGVkIHF1ZXN0aW9uIHR5cGUgaXMgYWN0aXZlIGNvZGUsIHRoZW4gYWRkIFwiVHJhbnNmZXJcIiBidXR0b24gdG8gcHJldmlldyBwYW5lbFxuICAgICAgICAgICAgaWYgKHRvZ2dsZU9wdGlvbnMuaW5jbHVkZXMoXCJ0cmFuc2ZlclwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VHlwZSA9ICQoXCIjXCIgKyBwYXJlbnRJRCkuZGF0YShcInRvZ2dsZV9jdXJyZW50X3R5cGVcIik7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkVHlwZSA9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZXNbdG9nZ2xlUXVlc3Rpb25TZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHlwZSA9PSBcIlBhcnNvbnMgTWl4ZWQtVXAgQ29kZVwiICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVHlwZSA9PSBcIkFjdGl2ZSBXcml0ZSBDb2RlXCJcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zZmVyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0cmFuc2ZlckJ1dHRvbikudGV4dChcIlRyYW5zZmVyIFJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgICAgICAkKHRyYW5zZmVyQnV0dG9uKS5hZGRDbGFzcyhcImJ0biBidG4tcHJpbWFyeVwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0cmFuc2ZlckJ1dHRvbikuY2xpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy50b2dnbGVUcmFuc2ZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUXVlc3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjdG9nZ2xlLWJ1dHRvbnNcIikuYXBwZW5kKHRyYW5zZmVyQnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiI2NvbXBvbmVudC1wcmV2aWV3XCIpLnNob3coKTtcbiAgICB9XG5cbiAgICAvLyBvbiBjbGlja2luZyBcIlNlbGVjdCB0aGlzIFByb2JsZW1cIiBidXR0b24sIGNsb3NlIHByZXZpZXcgcGFuZWwsIHJlcGxhY2UgY3VycmVudCBxdWVzdGlvbiBpbiBhc3NpZ25tZW50cyBwYWdlIHdpdGggc2VsZWN0ZWQgcXVlc3Rpb24sIGFuZCBzZW5kIHJlcXVlc3QgdG8gdXBkYXRlIGdyYWRpbmcgZGF0YWJhc2VcbiAgICAvLyBfIGB0b2dnbGVTZXRgXG4gICAgYXN5bmMgdG9nZ2xlU2V0KHBhcmVudElELCBzZWxlY3RlZFF1ZXN0aW9uLCBodG1sc3JjLCB0b2dnbGVRdWVzdGlvblR5cGVzKSB7XG4gICAgICAgIHZhciBzZWxlY3RvcklkID0gcGFyZW50SUQgKyBcIi10b2dnbGVTZWxlY3RlZFF1ZXN0aW9uXCI7XG4gICAgICAgIHZhciB0b2dnbGVRdWVzdGlvblNlbGVjdCA9IGRvY3VtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQocGFyZW50SUQpXG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzZWxlY3RcIilbMF07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ySWQpLmlubmVySFRNTCA9IFwiXCI7IC8vIG5lZWQgdG8gY2hlY2sgd2hldGhlciB0aGlzIGlzIGV2ZW4gbmVjZXNzYXJ5XG4gICAgICAgIGF3YWl0IHJlbmRlclJ1bmVzdG9uZUNvbXBvbmVudChodG1sc3JjLCBzZWxlY3RvcklkLCB7XG4gICAgICAgICAgICBzZWxlY3Rvcl9pZDogc2VsZWN0b3JJZCxcbiAgICAgICAgICAgIGlzX3RvZ2dsZTogdGhpcy50b2dnbGVPcHRpb25zLFxuICAgICAgICAgICAgaXNfc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgdXNlUnVuZXN0b25lU2VydmljZXM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KFxuICAgICAgICAgICAgYCR7ZUJvb2tDb25maWcubmV3X3NlcnZlcl9wcmVmaXh9L2Fzc2Vzc21lbnQvc2V0X3NlbGVjdGVkX3F1ZXN0aW9uP21ldGFpZD0ke3BhcmVudElEfSZzZWxlY3RlZD0ke3NlbGVjdGVkUXVlc3Rpb259YCxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuICAgICAgICAkKFwiI3RvZ2dsZS1wcmV2aWV3XCIpLmh0bWwoXCJcIik7XG4gICAgICAgICQoXCIjXCIgKyBwYXJlbnRJRCkuZGF0YShcInRvZ2dsZV9jdXJyZW50XCIsIHNlbGVjdGVkUXVlc3Rpb24pO1xuICAgICAgICAkKFwiI1wiICsgcGFyZW50SUQpLmRhdGEoXG4gICAgICAgICAgICBcInRvZ2dsZV9jdXJyZW50X3R5cGVcIixcbiAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZXNbdG9nZ2xlUXVlc3Rpb25TZWxlY3Quc2VsZWN0ZWRJbmRleF1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBvbiBjbGlja2luZyBcIlRyYW5zZmVyXCIgYnV0dG9uLCBleHRyYWN0IHRoZSBjdXJyZW50IHRleHQgYW5kIGluZGVudGF0aW9uIG9mIHRoZSBQYXJzb25zIGJsb2NrcyBpbiB0aGUgYW5zd2VyIHNwYWNlLCB0aGVuIHBhc3RlIHRoYXQgaW50byB0aGUgc2VsZWN0ZWQgYWN0aXZlIGNvZGUgcXVlc3Rpb25cbiAgICBhc3luYyB0b2dnbGVUcmFuc2ZlcihcbiAgICAgICAgcGFyZW50SUQsXG4gICAgICAgIHNlbGVjdGVkUXVlc3Rpb24sXG4gICAgICAgIGh0bWxzcmMsXG4gICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZXNcbiAgICApIHtcbiAgICAgICAgLy8gcmV0cmlldmUgYWxsIFBhcnNvbnMgbGluZXMgd2l0aGluIHRoZSBhbnN3ZXIgc3BhY2UgYW5kIGxvb3AgdGhyb3VnaCB0aGlzIGxpc3RcbiAgICAgICAgdmFyIGN1cnJlbnRQYXJzb25zID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZChwYXJlbnRJRCArIFwiLXRvZ2dsZVNlbGVjdGVkUXVlc3Rpb25cIilcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2NsYXNzXj0nYW5zd2VyJ11cIilbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJldHR5cHJpbnQgbGFuZy1weVwiKTtcbiAgICAgICAgdmFyIGN1cnJlbnRQYXJzb25zQ2xhc3M7XG4gICAgICAgIHZhciBjdXJyZW50QmxvY2tJbmRlbnQ7XG4gICAgICAgIHZhciBpbmRlbnRDb3VudDtcbiAgICAgICAgdmFyIGluZGVudDtcbiAgICAgICAgdmFyIHBhcnNvbnNMaW5lO1xuICAgICAgICB2YXIgcGFyc29uc0xpbmVzID0gYGA7XG4gICAgICAgIHZhciBjb3VudDtcbiAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBjdXJyZW50UGFyc29ucy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgaW5kZW50Q291bnQgPSAwO1xuICAgICAgICAgICAgaW5kZW50ID0gXCJcIjtcbiAgICAgICAgICAgIC8vIGZvciBQYXJzb25zIGJsb2NrcyB0aGF0IGhhdmUgYnVpbHQtaW4gaW5kZW50YXRpb24gaW4gdGhlaXIgbGluZXNcbiAgICAgICAgICAgIGN1cnJlbnRQYXJzb25zQ2xhc3MgPSBjdXJyZW50UGFyc29uc1twXS5jbGFzc0xpc3RbMl07XG4gICAgICAgICAgICBpZiAoY3VycmVudFBhcnNvbnNDbGFzcykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFyc29uc0NsYXNzLmluY2x1ZGVzKFwiaW5kZW50XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGVudENvdW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGluZGVudENvdW50KSArXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFyc29uc0NsYXNzLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFyc29uc0NsYXNzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yIFBhcnNvbnMgYW5zd2VyIHNwYWNlcyB3aXRoIHZlcnRpY2FsIGxpbmVzIHRoYXQgYWxsb3cgc3R1ZGVudCB0byBkZWZpbmUgdGhlaXIgb3duIGxpbmUgaW5kZW50YXRpb25cbiAgICAgICAgICAgIGN1cnJlbnRCbG9ja0luZGVudCA9XG4gICAgICAgICAgICAgICAgY3VycmVudFBhcnNvbnNbcF0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmxlZnQ7XG4gICAgICAgICAgICBpZiAoY3VycmVudEJsb2NrSW5kZW50KSB7XG4gICAgICAgICAgICAgICAgaW5kZW50Q291bnQgPVxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChpbmRlbnRDb3VudCkgK1xuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9ja0luZGVudC5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9ja0luZGVudC5pbmRleE9mKFwicHhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICkgLyAzMFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBpbmRlbnRDb3VudDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0cmlldmUgZWFjaCB0ZXh0IHNuaXBwZXQgb2YgZWFjaCBQYXJzb25zIGxpbmUgYW5kIGxvb3AgdGhyb3VnaCB0aGlzIGxpc3RcbiAgICAgICAgICAgIHBhcnNvbnNMaW5lID0gY3VycmVudFBhcnNvbnNbcF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzcGFuXCIpO1xuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBwYXJzb25zTGluZS5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzb25zTGluZVtsXS5jaGlsZE5vZGVzWzBdLm5vZGVOYW1lID09IFwiI3RleHRcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzb25zIGJsb2NrcyBoYXZlIGRpZmZlcmluZyBhbW91bnRzIG9mIGhpZXJhcmNoeSBsZXZlbHMgKHNwYW5zIHdpdGhpbiBzcGFucylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPT0gMCAmJiBjb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIGRpZmZlcmVudCBjaGVjayB0aGFuIGwgPT0gMCBiZWNhdXNlIHRoZSBsIG51bWJlcmluZyBkb2Vzbid0IGFsaWduIHdpdGggbG9jYXRpb24gd2l0aGluIGxpbmUgZHVlIHRvIGluY29uc2lzdGVudCBzcGFuIGhlaXJhcmNoeVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc29uc0xpbmVzICs9IGluZGVudCArIHBhcnNvbnNMaW5lW2xdLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc29uc0xpbmVzICs9IHBhcnNvbnNMaW5lW2xdLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzb25zTGluZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNvbnNMaW5lcyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc29uc0xpbmVbbF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc29uc0xpbmVzID0gcGFyc29uc0xpbmVzLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVwbGFjZSBhbGwgZXhpc3RpbmcgY29kZSB3aXRoaW4gc2VsZWN0ZWQgYWN0aXZlIGNvZGUgcXVlc3Rpb24gd2l0aCBleHRyYWN0ZWQgUGFyc29ucyB0ZXh0XG4gICAgICAgIHZhciBodG1sc3JjRm9ybWVyID0gaHRtbHNyYy5zbGljZShcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBodG1sc3JjLmluZGV4T2YoXCI8dGV4dGFyZWFcIikgK1xuICAgICAgICAgICAgICAgIGh0bWxzcmMuc3BsaXQoXCI8dGV4dGFyZWFcIilbMV0uaW5kZXhPZihcIj5cIikgK1xuICAgICAgICAgICAgICAgIDEwXG4gICAgICAgICk7XG4gICAgICAgIHZhciBodG1sc3JjTGF0dGVyID0gaHRtbHNyYy5zbGljZShcbiAgICAgICAgICAgIGh0bWxzcmMuaW5kZXhPZihcIjwvdGV4dGFyZWE+XCIpLFxuICAgICAgICAgICAgaHRtbHNyYy5sZW5ndGhcbiAgICAgICAgKTtcbiAgICAgICAgaHRtbHNyYyA9IGh0bWxzcmNGb3JtZXIgKyBwYXJzb25zTGluZXMgKyBodG1sc3JjTGF0dGVyO1xuXG4gICAgICAgIGF3YWl0IHRoaXMudG9nZ2xlU2V0KFxuICAgICAgICAgICAgcGFyZW50SUQsXG4gICAgICAgICAgICBzZWxlY3RlZFF1ZXN0aW9uLFxuICAgICAgICAgICAgaHRtbHNyYyxcbiAgICAgICAgICAgIHRvZ2dsZVF1ZXN0aW9uVHlwZXNcbiAgICAgICAgKTtcbiAgICAgICAgJChcIiNjb21wb25lbnQtcHJldmlld1wiKS5oaWRlKCk7XG4gICAgfVxufVxuXG5pZiAodHlwZW9mIHdpbmRvdy5jb21wb25lbnRfZmFjdG9yeSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5jb21wb25lbnRfZmFjdG9yeSA9IHt9O1xufVxuXG53aW5kb3cuY29tcG9uZW50X2ZhY3Rvcnkuc2VsZWN0cXVlc3Rpb24gPSBmdW5jdGlvbiAob3B0cykge1xuICAgIHJldHVybiBuZXcgU2VsZWN0T25lKG9wdHMpO1xufTtcblxuLypcbiAqIFdoZW4gdGhlIHBhZ2UgaXMgbG9hZGVkIGFuZCB0aGUgbG9naW4gY2hlY2tzIGFyZSBjb21wbGV0ZSBmaW5kIGFuZCByZW5kZXJcbiAqIGVhY2ggc2VsZWN0cXVlc3Rpb24gY29tcG9uZW50IHRoYXQgaXMgbm90IHBhcnQgb2YgYSB0aW1lZEFzc2Vzc21lbnQuXG4gKiovXG4kKGRvY3VtZW50KS5iaW5kKFwicnVuZXN0b25lOmxvZ2luLWNvbXBsZXRlXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsUXVlc3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgXCJbZGF0YS1jb21wb25lbnQ9c2VsZWN0cXVlc3Rpb25dXCJcbiAgICApO1xuICAgIGZvciAobGV0IGNxIG9mIHNlbFF1ZXN0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCQoY3EpLmNsb3Nlc3QoXCJbZGF0YS1jb21wb25lbnQ9dGltZWRBc3Nlc3NtZW50XVwiKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBleGlzdHMgd2l0aGluIGEgdGltZWQgY29tcG9uZW50LCBkb24ndCByZW5kZXIgaXQgaGVyZVxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSBuZXcgU2VsZWN0T25lKHsgb3JpZzogY3EgfSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdG1wLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgcmVuZGVyaW5nIE5ldyBFeGVyY2lzZSAke2NxLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgIERldGFpbHM6ICR7ZXJyfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9