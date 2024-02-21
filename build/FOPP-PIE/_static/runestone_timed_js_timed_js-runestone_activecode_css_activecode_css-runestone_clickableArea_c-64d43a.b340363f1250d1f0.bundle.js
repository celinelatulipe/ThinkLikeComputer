"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_timed_js_timed_js-runestone_activecode_css_activecode_css-runestone_clickableArea_c-64d43a"],{

/***/ 23369:
/*!***************************************!*\
  !*** ./runestone/timed/css/timed.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 58707:
/*!*************************************!*\
  !*** ./runestone/timed/js/timed.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimedList": () => (/* binding */ TimedList),
/* harmony export */   "default": () => (/* binding */ Timed)
/* harmony export */ });
/* harmony import */ var _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase.js */ 2568);
/* harmony import */ var _fitb_js_timedfitb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../fitb/js/timedfitb.js */ 74309);
/* harmony import */ var _mchoice_js_timedmc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mchoice/js/timedmc.js */ 95983);
/* harmony import */ var _shortanswer_js_timed_shortanswer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shortanswer/js/timed_shortanswer.js */ 87483);
/* harmony import */ var _activecode_js_acfactory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../activecode/js/acfactory.js */ 86902);
/* harmony import */ var _clickableArea_js_timedclickable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../clickableArea/js/timedclickable */ 61581);
/* harmony import */ var _dragndrop_js_timeddnd_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dragndrop/js/timeddnd.js */ 47496);
/* harmony import */ var _parsons_js_timedparsons_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../parsons/js/timedparsons.js */ 79661);
/* harmony import */ var _selectquestion_js_selectone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../selectquestion/js/selectone */ 63931);
/* harmony import */ var _css_timed_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../css/timed.css */ 23369);
/*==========================================
========      Master timed.js     =========
============================================
===     This file contains the JS for    ===
===     the Runestone timed component.   ===
============================================
===              Created By              ===
===             Kirby Olson              ===
===               6/11/15                ===
==========================================*/













var TimedList = {}; // Timed dictionary

// Timed constructor
class Timed extends _common_js_runestonebase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig;
        this.origElem = orig; // the entire element of this timed assessment and all of its children
        this.divid = orig.id;
        this.children = this.origElem.childNodes;
        this.visited = [];
        this.timeLimit = 0;
        this.limitedTime = false;
        if (!isNaN($(this.origElem).data("time"))) {
            this.timeLimit = parseInt($(this.origElem).data("time"), 10) * 60; // time in seconds to complete the exam
            this.startingTime = this.timeLimit;
            this.limitedTime = true;
        }
        this.showFeedback = true;
        if ($(this.origElem).is("[data-no-feedback]")) {
            this.showFeedback = false;
        }
        this.showResults = true;
        if ($(this.origElem).is("[data-no-result]")) {
            this.showResults = false;
        }
        this.random = false;
        if ($(this.origElem).is("[data-random]")) {
            this.random = true;
        }
        this.showTimer = true;
        if ($(this.origElem).is("[data-no-timer]")) {
            this.showTimer = false;
        }
        this.fullwidth = false;
        if ($(this.origElem).is("[data-fullwidth]")) {
            this.fullwidth = true;
        }
        this.nopause = false;
        if ($(this.origElem).is("[data-no-pause]")) {
            this.nopause = true;
        }

        this.running = 0;
        this.paused = 0;
        this.done = 0;
        this.taken = 0;
        this.score = 0;
        this.incorrect = 0;
        this.correctStr = "";
        this.incorrectStr = "";
        this.skippedStr = "";
        this.skipped = 0;
        this.currentQuestionIndex = 0; // Which question is currently displaying on the page
        this.renderedQuestionArray = []; // list of all problems
        this.getNewChildren();
        // One small step to eliminate students from doing view source
        // this won't stop anyone with determination but may prevent casual peeking
        if (!eBookConfig.enableDebug) {
            document.body.oncontextmenu = function () {
                return false;
            };
        }
        this.checkAssessmentStatus().then(
            function () {
                this.renderTimedAssess();
            }.bind(this)
        );
    }

    getNewChildren() {
        this.newChildren = [];
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            this.newChildren.push(this.origElem.childNodes[i]);
        }
    }

    async checkAssessmentStatus() {
        // Has the user taken this exam?  Inquiring minds want to know
        // If a user has not taken this exam then we want to make sure
        // that if a question has been seen by the student before we do
        // not populate previous answers.
        let sendInfo = {
            div_id: this.divid,
            course_name: eBookConfig.course,
        };
        console.log(sendInfo);
        if (eBookConfig.useRunestoneServices) {
            let request = new Request(
                `${eBookConfig.new_server_prefix}/assessment/tookTimedAssessment`,
                {
                    method: "POST",
                    headers: this.jsonHeaders,
                    body: JSON.stringify(sendInfo),
                }
            );
            let response = await fetch(request);
            let data = await response.json();
            data = data.detail;
            this.taken = data.tookAssessment;
            this.assessmentTaken = this.taken;
            if (!this.taken) {
                localStorage.clear();
            }
            console.log("done with check status");
            return response;
        } else {
            this.taken = false;
            this.assessmentTaken = false;
            return Promise.resolve();
        }
    }

    /*===============================
    === Generating new Timed HTML ===
    ===============================*/
    async renderTimedAssess() {
        console.log("rendering timed ");
        // create renderedQuestionArray returns a promise
        //
        this.createRenderedQuestionArray();
        if (this.random) {
            this.randomizeRQA();
        }
        this.renderContainer();
        this.renderTimer();
        await this.renderControlButtons();
        this.containerDiv.appendChild(this.timedDiv); // This can't be appended in renderContainer because then it renders above the timer and control buttons.
        if (this.renderedQuestionArray.length > 1) this.renderNavControls();
        this.renderSubmitButton();
        this.renderFeedbackContainer();
        this.useRunestoneServices = eBookConfig.useRunestoneServices;
        // Replace intermediate HTML with rendered HTML
        $(this.origElem).replaceWith(this.containerDiv);
        // check if already taken and if so show results
        this.styleExamElements(); // rename to renderPossibleResults
        this.checkServer("timedExam", true);
    }

    renderContainer() {
        this.containerDiv = document.createElement("div"); // container for the entire Timed Component
        if (this.fullwidth) {
            // allow the container to fill the width - barb
            $(this.containerDiv).attr({
                style: "max-width:none",
            });
        }
        this.containerDiv.id = this.divid;
        this.timedDiv = document.createElement("div"); // div that will hold the questions for the timed assessment
        this.navDiv = document.createElement("div"); // For navigation control
        $(this.navDiv).attr({
            style: "text-align:center",
        });
        this.flagDiv = document.createElement("div"); // div that will hold the "Flag Question" button
        $(this.flagDiv).attr({
            style: "text-align: center",
        });
        this.switchContainer = document.createElement("div");
        this.switchContainer.classList.add("switchcontainer");
        this.switchDiv = document.createElement("div"); // is replaced by the questions
        this.timedDiv.appendChild(this.navDiv);
        this.timedDiv.appendChild(this.flagDiv); // add flagDiv to timedDiv, which holds components for navigation and questions for timed assessment
        this.timedDiv.appendChild(this.switchContainer);
        this.switchContainer.appendChild(this.switchDiv);
        $(this.timedDiv).attr({
            id: "timed_Test",
            style: "display:none",
        });
    }

    renderTimer() {
        this.wrapperDiv = document.createElement("div");
        this.timerContainer = document.createElement("P");
        this.wrapperDiv.id = this.divid + "-startWrapper";
        this.timerContainer.id = this.divid + "-output";
        this.wrapperDiv.appendChild(this.timerContainer);
        this.showTime();
    }

    renderControlButtons() {
        this.controlDiv = document.createElement("div");
        $(this.controlDiv).attr({
            id: "controls",
            style: "text-align: center",
        });
        this.startBtn = document.createElement("button");
        this.pauseBtn = document.createElement("button");
        $(this.startBtn).attr({
            class: "btn btn-success",
            id: "start",
            tabindex: "0",
            role: "button",
        });
        this.startBtn.textContent = "Start";
        this.startBtn.addEventListener(
            "click",
            async function () {
                $(this.finishButton).hide(); // hide the finish button for now
                $(this.flagButton).show();
                let mess = document.createElement("p");
                mess.innerHTML =
                    "<strong>Warning: You will not be able to continue the exam if you close this tab, close the window, or navigate away from this page!</strong>  Make sure you click the Finish Exam button when you are done to submit your work!";
                this.controlDiv.appendChild(mess);
                mess.classList.add("examwarning");
                await this.renderTimedQuestion();
                this.startAssessment();
            }.bind(this),
            false
        );
        $(this.pauseBtn).attr({
            class: "btn btn-default",
            id: "pause",
            disabled: "true",
            tabindex: "0",
            role: "button",
        });
        this.pauseBtn.textContent = "Pause";
        this.pauseBtn.addEventListener(
            "click",
            function () {
                this.pauseAssessment();
            }.bind(this),
            false
        );
        if (!this.taken) {
            this.controlDiv.appendChild(this.startBtn);
        }
        if (!this.nopause) {
            this.controlDiv.appendChild(this.pauseBtn);
        }
        this.containerDiv.appendChild(this.wrapperDiv);
        this.containerDiv.appendChild(this.controlDiv);
    }

    renderNavControls() {
        // making "Prev" button
        this.pagNavList = document.createElement("ul");
        $(this.pagNavList).addClass("pagination");
        this.leftContainer = document.createElement("li");
        this.leftNavButton = document.createElement("button");
        this.leftNavButton.innerHTML = "&#8249; Prev";
        $(this.leftNavButton).attr("aria-label", "Previous");
        $(this.leftNavButton).attr("tabindex", "0");
        $(this.leftNavButton).attr("role", "button");
        $(this.rightNavButton).attr("id", "prev");
        $(this.leftNavButton).css("cursor", "pointer");
        this.leftContainer.appendChild(this.leftNavButton);
        this.pagNavList.appendChild(this.leftContainer);
        // making "Flag Question" button
        this.flaggingPlace = document.createElement("ul");
        $(this.flaggingPlace).addClass("pagination");
        this.flagContainer = document.createElement("li");
        this.flagButton = document.createElement("button");
        $(this.flagButton).addClass("flagBtn");
        this.flagButton.innerHTML = "Flag Question";            // name on button
        $(this.flagButton).attr("aria-labelledby", "Flag");
        $(this.flagButton).attr("tabindex", "5");
        $(this.flagButton).attr("role", "button");
        $(this.flagButton).attr("id", "flag");
        $(this.flagButton).css("cursor", "pointer");
        this.flagContainer.appendChild(this.flagButton);        // adding button to container
        this.flaggingPlace.appendChild(this.flagContainer);     // adding container to flaggingPlace
        // making "Next" button
        this.rightContainer = document.createElement("li");
        this.rightNavButton = document.createElement("button");
        $(this.rightNavButton).attr("aria-label", "Next");
        $(this.rightNavButton).attr("tabindex", "0");
        $(this.rightNavButton).attr("role", "button");
        $(this.rightNavButton).attr("id", "next");
        this.rightNavButton.innerHTML = "Next &#8250;";
        $(this.rightNavButton).css("cursor", "pointer");
        this.rightContainer.appendChild(this.rightNavButton);
        this.pagNavList.appendChild(this.rightContainer);
        this.ensureButtonSafety();
        this.navDiv.appendChild(this.pagNavList);
        this.flagDiv.appendChild(this.flaggingPlace);           // adds flaggingPlace to the flagDiv
        this.break = document.createElement("br");
        this.navDiv.appendChild(this.break);
        // render the question number jump buttons
        this.qNumList = document.createElement("ul");
        $(this.qNumList).attr("id", "pageNums");
        this.qNumWrapperList = document.createElement("ul");
        $(this.qNumWrapperList).addClass("pagination");
        var tmpLi, tmpA;
        for (var i = 0; i < this.renderedQuestionArray.length; i++) {
            tmpLi = document.createElement("li");
            tmpA = document.createElement("a");
            tmpA.innerHTML = i + 1;
            $(tmpA).css("cursor", "pointer");
            if (i === 0) {
                $(tmpLi).addClass("active");
            }
            tmpLi.appendChild(tmpA);
            this.qNumWrapperList.appendChild(tmpLi);
        }
        this.qNumList.appendChild(this.qNumWrapperList);
        this.navDiv.appendChild(this.qNumList);
        this.navBtnListeners();
        this.flagBtnListener();                                 // listens for click on flag button
        $(this.flagButton).hide();
    }

    // when moving off of a question in an active exam:
    // 1. show that the question has been seen, or mark it broken if it is in error.
    // 2. check and log the current answer
    async navigateAway() {
        if (
            this.renderedQuestionArray[this.currentQuestionIndex].state ==
            "broken_exam"
        ) {
            $(
                "ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
            ).addClass("broken");
        }
        if (
            this.renderedQuestionArray[this.currentQuestionIndex].state ==
            "exam_ended"
        ) {
            $(
                "ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
            ).addClass("toolate");
        }
        if (
            this.renderedQuestionArray[this.currentQuestionIndex].question
                .isAnswered
        ) {
            $(
                "ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
            ).addClass("answered");
            await this.renderedQuestionArray[
                this.currentQuestionIndex
            ].question.checkCurrentAnswer();
            if (!this.done) {
                this.renderedQuestionArray[
                    this.currentQuestionIndex
                ].question.logCurrentAnswer();
            }
        }
    }
    async handleNextPrev(event) {
        if (!this.taken) {
            await this.navigateAway();
        }
        var target = $(event.target).text();
        if (target.match(/Next/)) {                   // checks given text to match "Next"
            if ($(this.rightContainer).hasClass("disabled")) {
                return;
            }
            this.currentQuestionIndex++;
        } else if (target.match(/Prev/)) {               // checks given text to match "Prev"
            if ($(this.leftContainer).hasClass("disabled")) {
                return;
            }
            this.currentQuestionIndex--;
        }
        await this.renderTimedQuestion();
        this.ensureButtonSafety();
        for (var i = 0; i < this.qNumList.childNodes.length; i++) {
            for (
                var j = 0;
                j < this.qNumList.childNodes[i].childNodes.length;
                j++
            ) {
                $(this.qNumList.childNodes[i].childNodes[j]).removeClass(
                    "active"
                );
            }
        }
        $(
            "ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
        ).addClass("active");
        if ($("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
        ).hasClass("flagcolor")) {                                           // checking for class
            this.flagButton.innerHTML = "Unflag Question";                  // changes text on button
        }
        else {
            this.flagButton.innerHTML = "Flag Question";                    // changes text on button
        }
    }

    async handleFlag(event) {
        // called when flag button is clicked
        var target = $(event.target).text()
        if (target.match(/Flag Question/)) {
            $("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
            ).addClass("flagcolor");                            // class will change color of question block
            this.flagButton.innerHTML = "Unflag Question";
        } else {
            $("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
            ).removeClass("flagcolor");                         // will restore current color of question block
            this.flagButton.innerHTML = "Flag Question";        // also sets name back
        }
    }

    async handleNumberedNav(event) {
        if (!this.taken) {
            await this.navigateAway();
        }
        for (var i = 0; i < this.qNumList.childNodes.length; i++) {
            for (
                var j = 0;
                j < this.qNumList.childNodes[i].childNodes.length;
                j++
            ) {
                $(this.qNumList.childNodes[i].childNodes[j]).removeClass(
                    "active"
                );
            }
        }

        var target = $(event.target).text();
        let oldIndex = this.currentQuestionIndex;
        this.currentQuestionIndex = parseInt(target) - 1;
        if (this.currentQuestionIndex > this.renderedQuestionArray.length) {
            console.log(`Error: bad index for ${target}`);
            this.currentQuestionIndex = oldIndex;
        }
        $(
            "ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"
        ).addClass("active");
        if ($("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")"      // checking for flagcolor class
        ).hasClass("flagcolor")) {
            this.flagButton.innerHTML = "Unflag Question";
        }
        else {
            this.flagButton.innerHTML = "Flag Question";
        }
        await this.renderTimedQuestion();
        this.ensureButtonSafety();
    }

    // set up events for navigation
    navBtnListeners() {
        // Next and Prev Listener
        this.pagNavList.addEventListener(
            "click",
            this.handleNextPrev.bind(this),
            false
        );

        // Numbered Listener
        this.qNumList.addEventListener(
            "click",
            this.handleNumberedNav.bind(this),
            false
        );
    }

    // set up event for flag
    flagBtnListener() {
        this.flaggingPlace.addEventListener(
            "click",
            this.handleFlag.bind(this),     // calls this to take action
            false
        );
    }

    renderSubmitButton() {
        this.buttonContainer = document.createElement("div");
        $(this.buttonContainer).attr({
            style: "text-align:center",
        });
        this.finishButton = document.createElement("button");
        $(this.finishButton).attr({
            id: "finish",
            class: "btn btn-primary",
        });
        this.finishButton.textContent = "Finish Exam";
        this.finishButton.addEventListener(
            "click",
            async function () {
                if (
                    window.confirm(
                        "Clicking OK means you are ready to submit your answers and are finished with this assessment."
                    )
                ) {
                    await this.finishAssessment();
                    $(this.flagButton).hide();
                }
            }.bind(this),
            false
        );
        this.controlDiv.appendChild(this.finishButton);
        $(this.finishButton).hide();
        this.timedDiv.appendChild(this.buttonContainer);
    }
    ensureButtonSafety() {
        if (this.currentQuestionIndex === 0) {
            if (this.renderedQuestionArray.length != 1) {
                $(this.rightContainer).removeClass("disabled");
            }
            $(this.leftContainer).addClass("disabled");
        }
        if (
            this.currentQuestionIndex >=
            this.renderedQuestionArray.length - 1
        ) {
            if (this.renderedQuestionArray.length != 1) {
                $(this.leftContainer).removeClass("disabled");
            }
            $(this.rightContainer).addClass("disabled");
        }
        if (
            this.currentQuestionIndex > 0 &&
            this.currentQuestionIndex < this.renderedQuestionArray.length - 1
        ) {
            $(this.rightContainer).removeClass("disabled");
            $(this.leftContainer).removeClass("disabled");
        }
    }
    renderFeedbackContainer() {
        this.scoreDiv = document.createElement("P");
        this.scoreDiv.id = this.divid + "results";
        this.scoreDiv.style.display = "none";
        this.containerDiv.appendChild(this.scoreDiv);
    }

    createRenderedQuestionArray() {
        // this finds all the assess questions in this timed assessment
        // We need to make a list of all the questions up front so we can set up navigation
        // but we do not want to render the questions until the student has navigated
        // Also adds them to this.renderedQuestionArray

        // todo:  This needs to be updated to account for the runestone div wrapper.

        // To accommodate the selectquestion type -- which is async! we need to wrap
        // all of this in a promise, so that we don't continue to render the timed
        // exam until all of the questions have been realized.
        var opts;
        for (var i = 0; i < this.newChildren.length; i++) {
            var tmpChild = this.newChildren[i];
            opts = {
                state: "prepared",
                orig: tmpChild,
                question: {},
                useRunestoneServices: eBookConfig.useRunestoneServices,
                timed: true,
                assessmentTaken: this.taken,
                timedWrapper: this.divid,
                initAttempts: 0,
            };
            if ($(tmpChild).children("[data-component]").length > 0) {
                tmpChild = $(tmpChild).children("[data-component]")[0];
                opts.orig = tmpChild;
            }
            if ($(tmpChild).is("[data-component]")) {
                this.renderedQuestionArray.push(opts);
            }
        }
    }

    randomizeRQA() {
        var currentIndex = this.renderedQuestionArray.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.renderedQuestionArray[currentIndex];
            this.renderedQuestionArray[
                currentIndex
            ] = this.renderedQuestionArray[randomIndex];
            this.renderedQuestionArray[randomIndex] = temporaryValue;
        }
    }

    async renderTimedQuestion() {
        if (this.currentQuestionIndex >= this.renderedQuestionArray.length) {
            // sometimes the user clicks in the event area for the qNumList
            // But misses a number in that case the text is the concatenation
            // of all the numbers in the list!
            return;
        }
        // check the renderedQuestionArray to see if it has been rendered.
        let opts = this.renderedQuestionArray[this.currentQuestionIndex];
        let currentQuestion;
        if (
            opts.state === "prepared" ||
            opts.state === "forreview" ||
            (opts.state === "broken_exam" && opts.initAttempts < 3)
        ) {
            let tmpChild = opts.orig;
            if ($(tmpChild).is("[data-component=selectquestion]")) {
                if (this.done && opts.state == "prepared") {
                    this.renderedQuestionArray[
                        this.currentQuestionIndex
                    ].state = "exam_ended";
                } else {
                    // SelectOne is async and will replace itself in this array with
                    // the actual selected question
                    opts.rqa = this.renderedQuestionArray;
                    let newq = new _selectquestion_js_selectone__WEBPACK_IMPORTED_MODULE_8__["default"](opts);
                    this.renderedQuestionArray[this.currentQuestionIndex] = {
                        question: newq,
                    };
                    try {
                        await newq.initialize();
                        if (opts.state == "broken_exam") {
                            // remove the broken class from this question if we get here.
                            $(
                                `ul#pageNums > ul > li:eq(${this.currentQuestionIndex})`
                            ).removeClass("broken");
                        }
                    } catch (e) {
                        opts.state = "broken_exam";
                        this.renderedQuestionArray[
                            this.currentQuestionIndex
                        ] = opts;
                        console.log(
                            `Error initializing question: Details ${e}`
                        );
                    }
                }
            } else if ($(tmpChild).is("[data-component]")) {
                let componentKind = $(tmpChild).data("component");
                this.renderedQuestionArray[this.currentQuestionIndex] = {
                    question: window.component_factory[componentKind](opts),
                };
            }
        } else if (opts.state === "broken_exam") {
            return;
        }

        currentQuestion = this.renderedQuestionArray[this.currentQuestionIndex]
            .question;
        if (opts.state === "forreview") {
            await currentQuestion.checkCurrentAnswer();
            currentQuestion.renderFeedback();
            currentQuestion.disableInteraction();
        }

        if (!this.visited.includes(this.currentQuestionIndex)) {
            this.visited.push(this.currentQuestionIndex);
            if (
                this.visited.length === this.renderedQuestionArray.length &&
                !this.done
            ) {
                $(this.finishButton).show();
            }
        }

        if (currentQuestion.containerDiv) {
            $(this.switchDiv).replaceWith(currentQuestion.containerDiv);
            this.switchDiv = currentQuestion.containerDiv;
        }

        // If the timed component has listeners, those might need to be reinitialized
        // This flag will only be set in the elements that need it--it will be undefined in the others and thus evaluate to false
        if (currentQuestion.needsReinitialization) {
            currentQuestion.reinitializeListeners(this.taken);
        }
    }

    /*=================================
    === Timer and control Functions ===
    =================================*/
    handlePrevAssessment() {
        $(this.startBtn).hide();
        $(this.pauseBtn).attr("disabled", true);
        $(this.finishButton).attr("disabled", true);
        this.running = 0;
        this.done = 1;
        // showFeedback sand showResults should both be true before we show the
        // questions and their state of correctness.
        if (this.showResults && this.showFeedback) {
            $(this.timedDiv).show();
            this.restoreAnsweredQuestions(); // do not log these results
        } else {
            $(this.pauseBtn).hide();
            $(this.timerContainer).hide();
        }
    }
    startAssessment() {
        if (!this.taken) {
            $("#relations-next").hide(); // hide the next page button for now
            $("#relations-prev").hide(); // hide the previous button for now
            $(this.startBtn).hide();
            $(this.pauseBtn).attr("disabled", false);
            if (this.running === 0 && this.paused === 0) {
                this.running = 1;
                this.lastTime = Date.now();
                $(this.timedDiv).show();
                this.increment();
                this.logBookEvent({
                    event: "timedExam",
                    act: "start",
                    div_id: this.divid,
                });
                var timeStamp = new Date();
                var storageObj = {
                    answer: [0, 0, this.renderedQuestionArray.length, 0],
                    timestamp: timeStamp,
                };
                localStorage.setItem(
                    this.localStorageKey(),
                    JSON.stringify(storageObj)
                );
            }
            $(window).on(
                "beforeunload",
                function (event) {
                    // this actual value gets ignored by newer browsers
                    if (this.done) {
                        return;
                    }
                    event.preventDefault();
                    event.returnValue =
                        "Are you sure you want to leave?  Your work will be lost! And you will need your instructor to reset the exam!";
                    return "Are you sure you want to leave?  Your work will be lost!";
                }.bind(this)
            );
            window.addEventListener(
                "pagehide",
                async function (event) {
                    if (!this.done) {
                        await this.finishAssessment();
                        console.log("Exam exited by leaving page");
                    }
                }.bind(this)
            );
        } else {
            this.handlePrevAssessment();
        }
    }
    pauseAssessment() {
        if (this.done === 0) {
            if (this.running === 1) {
                this.logBookEvent({
                    event: "timedExam",
                    act: "pause",
                    div_id: this.divid,
                });
                this.running = 0;
                this.paused = 1;
                this.pauseBtn.innerHTML = "Resume";
                $(this.timedDiv).hide();
            } else {
                this.logBookEvent({
                    event: "timedExam",
                    act: "resume",
                    div_id: this.divid,
                });
                this.running = 1;
                this.paused = 0;
                this.increment();
                this.pauseBtn.innerHTML = "Pause";
                $(this.timedDiv).show();
            }
        }
    }

    showTime() {
        if (this.showTimer) {
            var mins = Math.floor(this.timeLimit / 60);
            var secs = Math.floor(this.timeLimit) % 60;
            var minsString = mins;
            var secsString = secs;
            if (mins < 10) {
                minsString = "0" + mins;
            }
            if (secs < 10) {
                secsString = "0" + secs;
            }
            var beginning = "Time Remaining    ";
            if (!this.limitedTime) {
                beginning = "Time Taken    ";
            }
            var timeString = beginning + minsString + ":" + secsString;
            if (this.done || this.taken) {
                var minutes = Math.floor(this.timeTaken / 60);
                var seconds = Math.floor(this.timeTaken % 60);
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                timeString = "Time taken: " + minutes + ":" + seconds;
            }
            this.timerContainer.innerHTML = timeString;
            var timeTips = document.getElementsByClassName("timeTip");
            for (var i = 0; i <= timeTips.length - 1; i++) {
                timeTips[i].title = timeString;
            }
        } else {
            $(this.timerContainer).hide();
        }
    }

    increment() {
        // if running (not paused) and not taken
        if (this.running === 1 && !this.taken) {
            setTimeout(
                function () {
                    // When a browser loses focus, setTimeout may not be called on the
                    // schedule expected.  Browsers are free to save power by lengthening
                    // the interval to some longer time.  So we cannot just subtract 1
                    // from the timeLimit we need to measure the elapsed time from the last
                    // call to the current call and subtract that number of seconds.
                    let currentTime = Date.now();
                    if (this.limitedTime) {
                        // If there's a time limit, count down to 0
                        this.timeLimit =
                            this.timeLimit -
                            Math.floor((currentTime - this.lastTime) / 1000);
                    } else {
                        // Else count up to keep track of how long it took to complete
                        this.timeLimit =
                            this.timeLimit +
                            Math.floor((currentTime - this.lastTime) / 1000);
                    }
                    this.lastTime = currentTime;
                    localStorage.setItem(
                        eBookConfig.email + ":" + this.divid + "-time",
                        this.timeLimit
                    );
                    this.showTime();
                    if (this.timeLimit > 0) {
                        this.increment();
                        // ran out of time
                    } else {
                        $(this.startBtn).attr({
                            disabled: "true",
                        });
                        $(this.finishButton).attr({
                            disabled: "true",
                        });
                        this.running = 0;
                        this.done = 1;
                        if (!this.taken) {
                            this.taken = true;
                            // embed the message in the page -- an alert actually prevents
                            // the answers from being submitted and if a student closes their
                            // laptop then the answers will not be submitted ever!  Even when they
                            // reopen the laptop their session cookie is likely invalid.
                            let mess = document.createElement("h1");
                            mess.innerHTML =
                                "Sorry but you ran out of time. Your answers are being submitted";
                            this.controlDiv.appendChild(mess);
                            this.finishAssessment();
                        }
                    }
                }.bind(this),
                1000
            );
        }
    }

    styleExamElements() {
        // Checks if this exam has been taken before
        $(this.timerContainer).css({
            width: "50%",
            margin: "0 auto",
            "background-color": "#DFF0D8",
            "text-align": "center",
            border: "2px solid #DFF0D8",
            "border-radius": "25px",
        });
        $(this.scoreDiv).css({
            width: "50%",
            margin: "0 auto",
            "background-color": "#DFF0D8",
            "text-align": "center",
            border: "2px solid #DFF0D8",
            "border-radius": "25px",
        });
        $(".tooltipTime").css({
            margin: "0",
            padding: "0",
            "background-color": "black",
            color: "white",
        });
    }

    async finishAssessment() {
        $("#relations-next").show(); // show the next page button for now
        $("#relations-prev").show(); // show the previous button for now
        if (!this.showFeedback) {
            // bje - changed from showResults
            $(this.timedDiv).hide();
            $(this.pauseBtn).hide();
            $(this.timerContainer).hide();
        }
        this.findTimeTaken();
        this.running = 0;
        this.done = 1;
        this.taken = 1;
        await this.finalizeProblems();
        this.checkScore();
        this.displayScore();
        this.storeScore();
        this.logScore();
        $(this.pauseBtn).attr("disabled", true);
        this.finishButton.disabled = true;
        $(window).off("beforeunload");
        // turn off the pagehide listener
        let assignment_id = this.divid;
        setTimeout(function () {
            jQuery.ajax({
                url: eBookConfig.app + "/assignments/student_autograde",
                type: "POST",
                dataType: "JSON",
                data: {
                    assignment_id: assignment_id,
                    is_timed: true,
                },
                success: function (retdata) {
                    if (retdata.success == false) {
                        console.log(retdata.message);
                    } else {
                        console.log("Autograder completed");
                    }
                },
            });
        }, 2000);
    }

    // finalizeProblems
    // ----------------
    async finalizeProblems() {
        // Because we have submitted each question as we navigate we only need to
        // send the final version of the question the student is on when they press the
        // finish exam button.

        var currentQuestion = this.renderedQuestionArray[
            this.currentQuestionIndex
        ].question;
        await currentQuestion.checkCurrentAnswer();
        currentQuestion.logCurrentAnswer();
        currentQuestion.renderFeedback();
        currentQuestion.disableInteraction();

        for (var i = 0; i < this.renderedQuestionArray.length; i++) {
            let currentQuestion = this.renderedQuestionArray[i];
            // set the state to forreview so we know that feedback may be appropriate
            if (currentQuestion.state !== "broken_exam") {
                currentQuestion.state = "forreview";
                currentQuestion.question.disableInteraction();
            }
        }

        if (!this.showFeedback) {
            this.hideTimedFeedback();
        }
    }

    // restoreAnsweredQuestions
    // ------------------------
    restoreAnsweredQuestions() {
        for (var i = 0; i < this.renderedQuestionArray.length; i++) {
            var currentQuestion = this.renderedQuestionArray[i];
            if (currentQuestion.state === "prepared") {
                currentQuestion.state = "forreview";
            }
        }
    }

    // hideTimedFeedback
    // -----------------
    hideTimedFeedback() {
        for (var i = 0; i < this.renderedQuestionArray.length; i++) {
            var currentQuestion = this.renderedQuestionArray[i].question;
            currentQuestion.hideFeedback();
        }
    }

    // checkScore
    // ----------
    // This is a simple all or nothing score of one point per question for
    // that includes our best guess if a question was skipped.
    checkScore() {
        this.correctStr = "";
        this.skippedStr = "";
        this.incorrectStr = "";
        // Gets the score of each problem
        for (var i = 0; i < this.renderedQuestionArray.length; i++) {
            var correct = this.renderedQuestionArray[
                i
            ].question.checkCorrectTimed();
            if (correct == "T") {
                this.score++;
                this.correctStr = this.correctStr + (i + 1) + ", ";
            } else if (correct == "F") {
                this.incorrect++;
                this.incorrectStr = this.incorrectStr + (i + 1) + ", ";
            } else if (correct === null || correct === "I") {
                this.skipped++;
                this.skippedStr = this.skippedStr + (i + 1) + ", ";
            } else {
                // ignored question; just do nothing
            }
        }
        // remove extra comma and space at end if any
        if (this.correctStr.length > 0)
            this.correctStr = this.correctStr.substring(
                0,
                this.correctStr.length - 2
            );
        else this.correctStr = "None";
        if (this.skippedStr.length > 0)
            this.skippedStr = this.skippedStr.substring(
                0,
                this.skippedStr.length - 2
            );
        else this.skippedStr = "None";
        if (this.incorrectStr.length > 0)
            this.incorrectStr = this.incorrectStr.substring(
                0,
                this.incorrectStr.length - 2
            );
        else this.incorrectStr = "None";
    }
    findTimeTaken() {
        if (this.limitedTime) {
            this.timeTaken = this.startingTime - this.timeLimit;
        } else {
            this.timeTaken = this.timeLimit;
        }
    }
    storeScore() {
        var storage_arr = [];
        storage_arr.push(
            this.score,
            this.correctStr,
            this.incorrect,
            this.incorrectStr,
            this.skipped,
            this.skippedStr,
            this.timeTaken
        );
        var timeStamp = new Date();
        var storageObj = JSON.stringify({
            answer: storage_arr,
            timestamp: timeStamp,
        });
        localStorage.setItem(this.localStorageKey(), storageObj);
    }
    // _`timed exam endpoint parameters`
    //----------------------------------
    logScore() {
        this.logBookEvent({
            event: "timedExam",
            act: "finish",
            div_id: this.divid,
            correct: this.score,
            incorrect: this.incorrect,
            skipped: this.skipped,
            time_taken: this.timeTaken,
        });
    }
    shouldUseServer(data) {
        // We override the RunestoneBase version because there is no "correct" attribute, and there are 2 possible localStorage schemas
        // --we also want to default to local storage because it contains more information specifically which questions are correct, incorrect, and skipped.
        var storageDate;
        if (localStorage.length === 0) return true;
        var storageObj = localStorage.getItem(this.localStorageKey());
        if (storageObj === null) return true;
        try {
            var storedData = JSON.parse(storageObj).answer;
            if (storedData.length == 4) {
                if (
                    data.correct == storedData[0] &&
                    data.incorrect == storedData[1] &&
                    data.skipped == storedData[2] &&
                    data.timeTaken == storedData[3]
                )
                    return true;
            } else if (storedData.length == 7) {
                if (
                    data.correct == storedData[0] &&
                    data.incorrect == storedData[2] &&
                    data.skipped == storedData[4] &&
                    data.timeTaken == storedData[6]
                ) {
                    return false; // In this case, because local storage has more info, we want to use that if it's consistent
                }
            }
            storageDate = new Date(JSON.parse(storageObj[1]).timestamp);
        } catch (err) {
            // error while parsing; likely due to bad value stored in storage
            console.log(err.message);
            localStorage.removeItem(this.localStorageKey());
            return true;
        }
        var serverDate = new Date(data.timestamp);
        if (serverDate < storageDate) {
            this.logScore();
            return false;
        }
        return true;
    }

    checkLocalStorage() {
        var len = localStorage.length;
        if (len > 0) {
            if (localStorage.getItem(this.localStorageKey()) !== null) {
                this.taken = 1;
                this.restoreAnswers("");
            } else {
                this.taken = 0;
            }
        } else {
            this.taken = 0;
        }
    }
    async restoreAnswers(data) {
        this.taken = 1;
        var tmpArr;
        if (data === "") {
            try {
                tmpArr = JSON.parse(
                    localStorage.getItem(this.localStorageKey())
                ).answer;
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(this.localStorageKey());
                this.taken = 0;
                return;
            }
        } else {
            // Parse results from the database
            tmpArr = [
                parseInt(data.correct),
                parseInt(data.incorrect),
                parseInt(data.skipped),
                parseInt(data.timeTaken),
                data.reset,
            ];
            this.setLocalStorage(tmpArr);
        }
        if (tmpArr.length == 1) {
            // Exam was previously reset
            this.reset = true;
            this.taken = 0;
            return;
        }
        if (tmpArr.length == 4) {
            // Accidental Reload OR Database Entry
            this.score = tmpArr[0];
            this.incorrect = tmpArr[1];
            this.skipped = tmpArr[2];
            this.timeTaken = tmpArr[3];
        } else if (tmpArr.length == 7) {
            // Loaded Completed Exam
            this.score = tmpArr[0];
            this.correctStr = tmpArr[1];
            this.incorrect = tmpArr[2];
            this.incorrectStr = tmpArr[3];
            this.skipped = tmpArr[4];
            this.skippedStr = tmpArr[5];
            this.timeTaken = tmpArr[6];
        } else {
            // Set localStorage in case of "accidental" reload
            this.score = 0;
            this.incorrect = 0;
            this.skipped = this.renderedQuestionArray.length;
            this.timeTaken = 0;
        }
        if (this.taken) {
            if (this.skipped === this.renderedQuestionArray.length) {
                this.showFeedback = false;
            }
            this.handlePrevAssessment();
        }
        await this.renderTimedQuestion();
        this.displayScore();
        this.showTime();
    }
    setLocalStorage(parsedData) {
        var timeStamp = new Date();
        var storageObj = {
            answer: parsedData,
            timestamp: timeStamp,
        };
        localStorage.setItem(
            this.localStorageKey(),
            JSON.stringify(storageObj)
        );
    }
    displayScore() {
        if (this.showResults) {
            var scoreString = "";
            var numQuestions;
            var percentCorrect;
            // if we have some information
            if (
                this.correctStr.length > 0 ||
                this.incorrectStr.length > 0 ||
                this.skippedStr.length > 0
            ) {
                scoreString = `Num Correct: ${this.score}. Questions: ${this.correctStr}<br>Num Wrong: ${this.incorrect}. Questions: ${this.incorrectStr}<br>Num Skipped: ${this.skipped}. Questions: ${this.skippedStr}<br>`;
                numQuestions = this.score + this.incorrect + this.skipped;
                percentCorrect = (this.score / numQuestions) * 100;
                scoreString += "Percent Correct: " + percentCorrect + "%";
                $(this.scoreDiv).html(scoreString);
                this.scoreDiv.style.display = "block";
            } else {
                scoreString = `Num Correct: ${this.score}<br>Num Wrong: ${this.incorrect}<br>Num Skipped: ${this.skipped}<br>`;
                numQuestions = this.score + this.incorrect + this.skipped;
                percentCorrect = (this.score / numQuestions) * 100;
                scoreString += "Percent Correct: " + percentCorrect + "%";
                $(this.scoreDiv).html(scoreString);
                this.scoreDiv.style.display = "block";
            }
            this.highlightNumberedList();
        } else {
            $(this.scoreDiv).html(
                "Thank you for taking the exam.  Your answers have been recorded."
            );
            this.scoreDiv.style.display = "block";
        }
    }
    highlightNumberedList() {
        var correctCount = this.correctStr;
        var incorrectCount = this.incorrectStr;
        var skippedCount = this.skippedStr;
        correctCount = correctCount.replace(/ /g, "").split(",");
        incorrectCount = incorrectCount.replace(/ /g, "").split(",");
        skippedCount = skippedCount.replace(/ /g, "").split(",");
        $(function () {
            var numberedBtns = $("ul#pageNums > ul > li");
            if (numberedBtns.hasClass("answered")) {
                numberedBtns.removeClass("answered");
            }
            for (var i = 0; i < correctCount.length; i++) {
                var test = parseInt(correctCount[i]) - 1;
                numberedBtns
                    .eq(parseInt(correctCount[i]) - 1)
                    .addClass("correctCount");
            }
            for (var j = 0; j < incorrectCount.length; j++) {
                numberedBtns
                    .eq(parseInt(incorrectCount[j]) - 1)
                    .addClass("incorrectCount");
            }
            for (var k = 0; k < skippedCount.length; k++) {
                numberedBtns
                    .eq(parseInt(skippedCount[k]) - 1)
                    .addClass("skippedCount");
            }
        });
    }
}

/*=======================================================
=== Function that calls the constructors on page load ===
=======================================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=timedAssessment]").each(function (index) {
        TimedList[this.id] = new Timed({
            orig: this,
            useRunestoneServices: eBookConfig.useRunestoneServices,
        });
    });
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3RpbWVkX2pzX3RpbWVkX2pzLXJ1bmVzdG9uZV9hY3RpdmVjb2RlX2Nzc19hY3RpdmVjb2RlX2Nzcy1ydW5lc3RvbmVfY2xpY2thYmxlQXJlYV9jLTY0ZDQzYS5iMzQwMzYzZjEyNTBkMWYwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFZ0Q7QUFDVjtBQUNEO0FBQ3VCO0FBQ2hCO0FBQ2M7QUFDWDtBQUNBO0FBQ0Y7QUFDaEM7O0FBRW5CLG9CQUFvQjs7QUFFM0I7QUFDZSxvQkFBb0IsbUVBQWE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDhCQUE4QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTs7QUFFQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsU0FBUztBQUNULHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUF1QztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0NBQStDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFO0FBQzdFLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQ0FBcUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw2QkFBNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvRUFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELDBCQUEwQjtBQUN0RjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsRUFBRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwQkFBMEI7QUFDdEQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsdUNBQXVDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1Q0FBdUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1Q0FBdUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUF1QztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVyxlQUFlLGdCQUFnQixpQkFBaUIsZUFBZSxlQUFlLGtCQUFrQixtQkFBbUIsYUFBYSxlQUFlLGdCQUFnQjtBQUN4TjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLDhDQUE4QyxXQUFXLGlCQUFpQixlQUFlLG1CQUFtQixhQUFhO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5QkFBeUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseUJBQXlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvdGltZWQvY3NzL3RpbWVkLmNzcz8yYmUyIiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvdGltZWQvanMvdGltZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PT09PT09ICAgICAgTWFzdGVyIHRpbWVkLmpzICAgICA9PT09PT09PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT0gICAgIFRoaXMgZmlsZSBjb250YWlucyB0aGUgSlMgZm9yICAgID09PVxuPT09ICAgICB0aGUgUnVuZXN0b25lIHRpbWVkIGNvbXBvbmVudC4gICA9PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT0gICAgICAgICAgICAgIENyZWF0ZWQgQnkgICAgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICAgIEtpcmJ5IE9sc29uICAgICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgICAgIDYvMTEvMTUgICAgICAgICAgICAgICAgPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBSdW5lc3RvbmVCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vanMvcnVuZXN0b25lYmFzZS5qc1wiO1xuaW1wb3J0IFRpbWVkRklUQiBmcm9tIFwiLi4vLi4vZml0Yi9qcy90aW1lZGZpdGIuanNcIjtcbmltcG9ydCBUaW1lZE1DIGZyb20gXCIuLi8uLi9tY2hvaWNlL2pzL3RpbWVkbWMuanNcIjtcbmltcG9ydCBUaW1lZFNob3J0QW5zd2VyIGZyb20gXCIuLi8uLi9zaG9ydGFuc3dlci9qcy90aW1lZF9zaG9ydGFuc3dlci5qc1wiO1xuaW1wb3J0IEFDRmFjdG9yeSBmcm9tIFwiLi4vLi4vYWN0aXZlY29kZS9qcy9hY2ZhY3RvcnkuanNcIjtcbmltcG9ydCBUaW1lZENsaWNrYWJsZUFyZWEgZnJvbSBcIi4uLy4uL2NsaWNrYWJsZUFyZWEvanMvdGltZWRjbGlja2FibGVcIjtcbmltcG9ydCBUaW1lZERyYWdORHJvcCBmcm9tIFwiLi4vLi4vZHJhZ25kcm9wL2pzL3RpbWVkZG5kLmpzXCI7XG5pbXBvcnQgVGltZWRQYXJzb25zIGZyb20gXCIuLi8uLi9wYXJzb25zL2pzL3RpbWVkcGFyc29ucy5qc1wiO1xuaW1wb3J0IFNlbGVjdE9uZSBmcm9tIFwiLi4vLi4vc2VsZWN0cXVlc3Rpb24vanMvc2VsZWN0b25lXCI7XG5pbXBvcnQgXCIuLi9jc3MvdGltZWQuY3NzXCI7XG5cbmV4cG9ydCB2YXIgVGltZWRMaXN0ID0ge307IC8vIFRpbWVkIGRpY3Rpb25hcnlcblxuLy8gVGltZWQgY29uc3RydWN0b3JcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVkIGV4dGVuZHMgUnVuZXN0b25lQmFzZSB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdmFyIG9yaWcgPSBvcHRzLm9yaWc7XG4gICAgICAgIHRoaXMub3JpZ0VsZW0gPSBvcmlnOyAvLyB0aGUgZW50aXJlIGVsZW1lbnQgb2YgdGhpcyB0aW1lZCBhc3Nlc3NtZW50IGFuZCBhbGwgb2YgaXRzIGNoaWxkcmVuXG4gICAgICAgIHRoaXMuZGl2aWQgPSBvcmlnLmlkO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzO1xuICAgICAgICB0aGlzLnZpc2l0ZWQgPSBbXTtcbiAgICAgICAgdGhpcy50aW1lTGltaXQgPSAwO1xuICAgICAgICB0aGlzLmxpbWl0ZWRUaW1lID0gZmFsc2U7XG4gICAgICAgIGlmICghaXNOYU4oJCh0aGlzLm9yaWdFbGVtKS5kYXRhKFwidGltZVwiKSkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZUxpbWl0ID0gcGFyc2VJbnQoJCh0aGlzLm9yaWdFbGVtKS5kYXRhKFwidGltZVwiKSwgMTApICogNjA7IC8vIHRpbWUgaW4gc2Vjb25kcyB0byBjb21wbGV0ZSB0aGUgZXhhbVxuICAgICAgICAgICAgdGhpcy5zdGFydGluZ1RpbWUgPSB0aGlzLnRpbWVMaW1pdDtcbiAgICAgICAgICAgIHRoaXMubGltaXRlZFRpbWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0ZlZWRiYWNrID0gdHJ1ZTtcbiAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbSkuaXMoXCJbZGF0YS1uby1mZWVkYmFja11cIikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZlZWRiYWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93UmVzdWx0cyA9IHRydWU7XG4gICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmlzKFwiW2RhdGEtbm8tcmVzdWx0XVwiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmFuZG9tID0gZmFsc2U7XG4gICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmlzKFwiW2RhdGEtcmFuZG9tXVwiKSkge1xuICAgICAgICAgICAgdGhpcy5yYW5kb20gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd1RpbWVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbSkuaXMoXCJbZGF0YS1uby10aW1lcl1cIikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbSkuaXMoXCJbZGF0YS1mdWxsd2lkdGhdXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3BhdXNlID0gZmFsc2U7XG4gICAgICAgIGlmICgkKHRoaXMub3JpZ0VsZW0pLmlzKFwiW2RhdGEtbm8tcGF1c2VdXCIpKSB7XG4gICAgICAgICAgICB0aGlzLm5vcGF1c2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gMDtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSAwO1xuICAgICAgICB0aGlzLmRvbmUgPSAwO1xuICAgICAgICB0aGlzLnRha2VuID0gMDtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuaW5jb3JyZWN0ID0gMDtcbiAgICAgICAgdGhpcy5jb3JyZWN0U3RyID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbmNvcnJlY3RTdHIgPSBcIlwiO1xuICAgICAgICB0aGlzLnNraXBwZWRTdHIgPSBcIlwiO1xuICAgICAgICB0aGlzLnNraXBwZWQgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID0gMDsgLy8gV2hpY2ggcXVlc3Rpb24gaXMgY3VycmVudGx5IGRpc3BsYXlpbmcgb24gdGhlIHBhZ2VcbiAgICAgICAgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkgPSBbXTsgLy8gbGlzdCBvZiBhbGwgcHJvYmxlbXNcbiAgICAgICAgdGhpcy5nZXROZXdDaGlsZHJlbigpO1xuICAgICAgICAvLyBPbmUgc21hbGwgc3RlcCB0byBlbGltaW5hdGUgc3R1ZGVudHMgZnJvbSBkb2luZyB2aWV3IHNvdXJjZVxuICAgICAgICAvLyB0aGlzIHdvbid0IHN0b3AgYW55b25lIHdpdGggZGV0ZXJtaW5hdGlvbiBidXQgbWF5IHByZXZlbnQgY2FzdWFsIHBlZWtpbmdcbiAgICAgICAgaWYgKCFlQm9va0NvbmZpZy5lbmFibGVEZWJ1Zykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0Fzc2Vzc21lbnRTdGF0dXMoKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGltZWRBc3Nlc3MoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE5ld0NoaWxkcmVuKCkge1xuICAgICAgICB0aGlzLm5ld0NoaWxkcmVuID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm5ld0NoaWxkcmVuLnB1c2godGhpcy5vcmlnRWxlbS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrQXNzZXNzbWVudFN0YXR1cygpIHtcbiAgICAgICAgLy8gSGFzIHRoZSB1c2VyIHRha2VuIHRoaXMgZXhhbT8gIElucXVpcmluZyBtaW5kcyB3YW50IHRvIGtub3dcbiAgICAgICAgLy8gSWYgYSB1c2VyIGhhcyBub3QgdGFrZW4gdGhpcyBleGFtIHRoZW4gd2Ugd2FudCB0byBtYWtlIHN1cmVcbiAgICAgICAgLy8gdGhhdCBpZiBhIHF1ZXN0aW9uIGhhcyBiZWVuIHNlZW4gYnkgdGhlIHN0dWRlbnQgYmVmb3JlIHdlIGRvXG4gICAgICAgIC8vIG5vdCBwb3B1bGF0ZSBwcmV2aW91cyBhbnN3ZXJzLlxuICAgICAgICBsZXQgc2VuZEluZm8gPSB7XG4gICAgICAgICAgICBkaXZfaWQ6IHRoaXMuZGl2aWQsXG4gICAgICAgICAgICBjb3Vyc2VfbmFtZTogZUJvb2tDb25maWcuY291cnNlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhzZW5kSW5mbyk7XG4gICAgICAgIGlmIChlQm9va0NvbmZpZy51c2VSdW5lc3RvbmVTZXJ2aWNlcykge1xuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcbiAgICAgICAgICAgICAgICBgJHtlQm9va0NvbmZpZy5uZXdfc2VydmVyX3ByZWZpeH0vYXNzZXNzbWVudC90b29rVGltZWRBc3Nlc3NtZW50YCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuanNvbkhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNlbmRJbmZvKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRldGFpbDtcbiAgICAgICAgICAgIHRoaXMudGFrZW4gPSBkYXRhLnRvb2tBc3Nlc3NtZW50O1xuICAgICAgICAgICAgdGhpcy5hc3Nlc3NtZW50VGFrZW4gPSB0aGlzLnRha2VuO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRha2VuKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRvbmUgd2l0aCBjaGVjayBzdGF0dXNcIik7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRha2VuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFzc2Vzc21lbnRUYWtlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgPT09IEdlbmVyYXRpbmcgbmV3IFRpbWVkIEhUTUwgPT09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgYXN5bmMgcmVuZGVyVGltZWRBc3Nlc3MoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyaW5nIHRpbWVkIFwiKTtcbiAgICAgICAgLy8gY3JlYXRlIHJlbmRlcmVkUXVlc3Rpb25BcnJheSByZXR1cm5zIGEgcHJvbWlzZVxuICAgICAgICAvL1xuICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVkUXVlc3Rpb25BcnJheSgpO1xuICAgICAgICBpZiAodGhpcy5yYW5kb20pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9taXplUlFBKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUaW1lcigpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckNvbnRyb2xCdXR0b25zKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMudGltZWREaXYpOyAvLyBUaGlzIGNhbid0IGJlIGFwcGVuZGVkIGluIHJlbmRlckNvbnRhaW5lciBiZWNhdXNlIHRoZW4gaXQgcmVuZGVycyBhYm92ZSB0aGUgdGltZXIgYW5kIGNvbnRyb2wgYnV0dG9ucy5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5Lmxlbmd0aCA+IDEpIHRoaXMucmVuZGVyTmF2Q29udHJvbHMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTdWJtaXRCdXR0b24oKTtcbiAgICAgICAgdGhpcy5yZW5kZXJGZWVkYmFja0NvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnVzZVJ1bmVzdG9uZVNlcnZpY2VzID0gZUJvb2tDb25maWcudXNlUnVuZXN0b25lU2VydmljZXM7XG4gICAgICAgIC8vIFJlcGxhY2UgaW50ZXJtZWRpYXRlIEhUTUwgd2l0aCByZW5kZXJlZCBIVE1MXG4gICAgICAgICQodGhpcy5vcmlnRWxlbSkucmVwbGFjZVdpdGgodGhpcy5jb250YWluZXJEaXYpO1xuICAgICAgICAvLyBjaGVjayBpZiBhbHJlYWR5IHRha2VuIGFuZCBpZiBzbyBzaG93IHJlc3VsdHNcbiAgICAgICAgdGhpcy5zdHlsZUV4YW1FbGVtZW50cygpOyAvLyByZW5hbWUgdG8gcmVuZGVyUG9zc2libGVSZXN1bHRzXG4gICAgICAgIHRoaXMuY2hlY2tTZXJ2ZXIoXCJ0aW1lZEV4YW1cIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIGNvbnRhaW5lciBmb3IgdGhlIGVudGlyZSBUaW1lZCBDb21wb25lbnRcbiAgICAgICAgaWYgKHRoaXMuZnVsbHdpZHRoKSB7XG4gICAgICAgICAgICAvLyBhbGxvdyB0aGUgY29udGFpbmVyIHRvIGZpbGwgdGhlIHdpZHRoIC0gYmFyYlxuICAgICAgICAgICAgJCh0aGlzLmNvbnRhaW5lckRpdikuYXR0cih7XG4gICAgICAgICAgICAgICAgc3R5bGU6IFwibWF4LXdpZHRoOm5vbmVcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmlkID0gdGhpcy5kaXZpZDtcbiAgICAgICAgdGhpcy50aW1lZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIGRpdiB0aGF0IHdpbGwgaG9sZCB0aGUgcXVlc3Rpb25zIGZvciB0aGUgdGltZWQgYXNzZXNzbWVudFxuICAgICAgICB0aGlzLm5hdkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIEZvciBuYXZpZ2F0aW9uIGNvbnRyb2xcbiAgICAgICAgJCh0aGlzLm5hdkRpdikuYXR0cih7XG4gICAgICAgICAgICBzdHlsZTogXCJ0ZXh0LWFsaWduOmNlbnRlclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mbGFnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8gZGl2IHRoYXQgd2lsbCBob2xkIHRoZSBcIkZsYWcgUXVlc3Rpb25cIiBidXR0b25cbiAgICAgICAgJCh0aGlzLmZsYWdEaXYpLmF0dHIoe1xuICAgICAgICAgICAgc3R5bGU6IFwidGV4dC1hbGlnbjogY2VudGVyXCIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN3aXRjaENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuc3dpdGNoQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzd2l0Y2hjb250YWluZXJcIik7XG4gICAgICAgIHRoaXMuc3dpdGNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8gaXMgcmVwbGFjZWQgYnkgdGhlIHF1ZXN0aW9uc1xuICAgICAgICB0aGlzLnRpbWVkRGl2LmFwcGVuZENoaWxkKHRoaXMubmF2RGl2KTtcbiAgICAgICAgdGhpcy50aW1lZERpdi5hcHBlbmRDaGlsZCh0aGlzLmZsYWdEaXYpOyAvLyBhZGQgZmxhZ0RpdiB0byB0aW1lZERpdiwgd2hpY2ggaG9sZHMgY29tcG9uZW50cyBmb3IgbmF2aWdhdGlvbiBhbmQgcXVlc3Rpb25zIGZvciB0aW1lZCBhc3Nlc3NtZW50XG4gICAgICAgIHRoaXMudGltZWREaXYuYXBwZW5kQ2hpbGQodGhpcy5zd2l0Y2hDb250YWluZXIpO1xuICAgICAgICB0aGlzLnN3aXRjaENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN3aXRjaERpdik7XG4gICAgICAgICQodGhpcy50aW1lZERpdikuYXR0cih7XG4gICAgICAgICAgICBpZDogXCJ0aW1lZF9UZXN0XCIsXG4gICAgICAgICAgICBzdHlsZTogXCJkaXNwbGF5Om5vbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGltZXIoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMudGltZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiUFwiKTtcbiAgICAgICAgdGhpcy53cmFwcGVyRGl2LmlkID0gdGhpcy5kaXZpZCArIFwiLXN0YXJ0V3JhcHBlclwiO1xuICAgICAgICB0aGlzLnRpbWVyQ29udGFpbmVyLmlkID0gdGhpcy5kaXZpZCArIFwiLW91dHB1dFwiO1xuICAgICAgICB0aGlzLndyYXBwZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy50aW1lckNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcbiAgICB9XG5cbiAgICByZW5kZXJDb250cm9sQnV0dG9ucygpIHtcbiAgICAgICAgdGhpcy5jb250cm9sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgJCh0aGlzLmNvbnRyb2xEaXYpLmF0dHIoe1xuICAgICAgICAgICAgaWQ6IFwiY29udHJvbHNcIixcbiAgICAgICAgICAgIHN0eWxlOiBcInRleHQtYWxpZ246IGNlbnRlclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMucGF1c2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAkKHRoaXMuc3RhcnRCdG4pLmF0dHIoe1xuICAgICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1zdWNjZXNzXCIsXG4gICAgICAgICAgICBpZDogXCJzdGFydFwiLFxuICAgICAgICAgICAgdGFiaW5kZXg6IFwiMFwiLFxuICAgICAgICAgICAgcm9sZTogXCJidXR0b25cIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnRCdG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG4gICAgICAgIHRoaXMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuZmluaXNoQnV0dG9uKS5oaWRlKCk7IC8vIGhpZGUgdGhlIGZpbmlzaCBidXR0b24gZm9yIG5vd1xuICAgICAgICAgICAgICAgICQodGhpcy5mbGFnQnV0dG9uKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgbGV0IG1lc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICBtZXNzLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgIFwiPHN0cm9uZz5XYXJuaW5nOiBZb3Ugd2lsbCBub3QgYmUgYWJsZSB0byBjb250aW51ZSB0aGUgZXhhbSBpZiB5b3UgY2xvc2UgdGhpcyB0YWIsIGNsb3NlIHRoZSB3aW5kb3csIG9yIG5hdmlnYXRlIGF3YXkgZnJvbSB0aGlzIHBhZ2UhPC9zdHJvbmc+ICBNYWtlIHN1cmUgeW91IGNsaWNrIHRoZSBGaW5pc2ggRXhhbSBidXR0b24gd2hlbiB5b3UgYXJlIGRvbmUgdG8gc3VibWl0IHlvdXIgd29yayFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQobWVzcyk7XG4gICAgICAgICAgICAgICAgbWVzcy5jbGFzc0xpc3QuYWRkKFwiZXhhbXdhcm5pbmdcIik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJUaW1lZFF1ZXN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEFzc2Vzc21lbnQoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgICQodGhpcy5wYXVzZUJ0bikuYXR0cih7XG4gICAgICAgICAgICBjbGFzczogXCJidG4gYnRuLWRlZmF1bHRcIixcbiAgICAgICAgICAgIGlkOiBcInBhdXNlXCIsXG4gICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsXG4gICAgICAgICAgICB0YWJpbmRleDogXCIwXCIsXG4gICAgICAgICAgICByb2xlOiBcImJ1dHRvblwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wYXVzZUJ0bi50ZXh0Q29udGVudCA9IFwiUGF1c2VcIjtcbiAgICAgICAgdGhpcy5wYXVzZUJ0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VBc3Nlc3NtZW50KCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBpZiAoIXRoaXMudGFrZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbERpdi5hcHBlbmRDaGlsZCh0aGlzLnN0YXJ0QnRuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMubm9wYXVzZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sRGl2LmFwcGVuZENoaWxkKHRoaXMucGF1c2VCdG4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMud3JhcHBlckRpdik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRoaXMuY29udHJvbERpdik7XG4gICAgfVxuXG4gICAgcmVuZGVyTmF2Q29udHJvbHMoKSB7XG4gICAgICAgIC8vIG1ha2luZyBcIlByZXZcIiBidXR0b25cbiAgICAgICAgdGhpcy5wYWdOYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICAkKHRoaXMucGFnTmF2TGlzdCkuYWRkQ2xhc3MoXCJwYWdpbmF0aW9uXCIpO1xuICAgICAgICB0aGlzLmxlZnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIHRoaXMubGVmdE5hdkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHRoaXMubGVmdE5hdkJ1dHRvbi5pbm5lckhUTUwgPSBcIiYjODI0OTsgUHJldlwiO1xuICAgICAgICAkKHRoaXMubGVmdE5hdkJ1dHRvbikuYXR0cihcImFyaWEtbGFiZWxcIiwgXCJQcmV2aW91c1wiKTtcbiAgICAgICAgJCh0aGlzLmxlZnROYXZCdXR0b24pLmF0dHIoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgICAgICQodGhpcy5sZWZ0TmF2QnV0dG9uKS5hdHRyKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgJCh0aGlzLnJpZ2h0TmF2QnV0dG9uKS5hdHRyKFwiaWRcIiwgXCJwcmV2XCIpO1xuICAgICAgICAkKHRoaXMubGVmdE5hdkJ1dHRvbikuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcbiAgICAgICAgdGhpcy5sZWZ0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGVmdE5hdkJ1dHRvbik7XG4gICAgICAgIHRoaXMucGFnTmF2TGlzdC5hcHBlbmRDaGlsZCh0aGlzLmxlZnRDb250YWluZXIpO1xuICAgICAgICAvLyBtYWtpbmcgXCJGbGFnIFF1ZXN0aW9uXCIgYnV0dG9uXG4gICAgICAgIHRoaXMuZmxhZ2dpbmdQbGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgJCh0aGlzLmZsYWdnaW5nUGxhY2UpLmFkZENsYXNzKFwicGFnaW5hdGlvblwiKTtcbiAgICAgICAgdGhpcy5mbGFnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICB0aGlzLmZsYWdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAkKHRoaXMuZmxhZ0J1dHRvbikuYWRkQ2xhc3MoXCJmbGFnQnRuXCIpO1xuICAgICAgICB0aGlzLmZsYWdCdXR0b24uaW5uZXJIVE1MID0gXCJGbGFnIFF1ZXN0aW9uXCI7ICAgICAgICAgICAgLy8gbmFtZSBvbiBidXR0b25cbiAgICAgICAgJCh0aGlzLmZsYWdCdXR0b24pLmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJGbGFnXCIpO1xuICAgICAgICAkKHRoaXMuZmxhZ0J1dHRvbikuYXR0cihcInRhYmluZGV4XCIsIFwiNVwiKTtcbiAgICAgICAgJCh0aGlzLmZsYWdCdXR0b24pLmF0dHIoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAkKHRoaXMuZmxhZ0J1dHRvbikuYXR0cihcImlkXCIsIFwiZmxhZ1wiKTtcbiAgICAgICAgJCh0aGlzLmZsYWdCdXR0b24pLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG4gICAgICAgIHRoaXMuZmxhZ0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmZsYWdCdXR0b24pOyAgICAgICAgLy8gYWRkaW5nIGJ1dHRvbiB0byBjb250YWluZXJcbiAgICAgICAgdGhpcy5mbGFnZ2luZ1BsYWNlLmFwcGVuZENoaWxkKHRoaXMuZmxhZ0NvbnRhaW5lcik7ICAgICAvLyBhZGRpbmcgY29udGFpbmVyIHRvIGZsYWdnaW5nUGxhY2VcbiAgICAgICAgLy8gbWFraW5nIFwiTmV4dFwiIGJ1dHRvblxuICAgICAgICB0aGlzLnJpZ2h0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICB0aGlzLnJpZ2h0TmF2QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgJCh0aGlzLnJpZ2h0TmF2QnV0dG9uKS5hdHRyKFwiYXJpYS1sYWJlbFwiLCBcIk5leHRcIik7XG4gICAgICAgICQodGhpcy5yaWdodE5hdkJ1dHRvbikuYXR0cihcInRhYmluZGV4XCIsIFwiMFwiKTtcbiAgICAgICAgJCh0aGlzLnJpZ2h0TmF2QnV0dG9uKS5hdHRyKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgJCh0aGlzLnJpZ2h0TmF2QnV0dG9uKS5hdHRyKFwiaWRcIiwgXCJuZXh0XCIpO1xuICAgICAgICB0aGlzLnJpZ2h0TmF2QnV0dG9uLmlubmVySFRNTCA9IFwiTmV4dCAmIzgyNTA7XCI7XG4gICAgICAgICQodGhpcy5yaWdodE5hdkJ1dHRvbikuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcbiAgICAgICAgdGhpcy5yaWdodENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJpZ2h0TmF2QnV0dG9uKTtcbiAgICAgICAgdGhpcy5wYWdOYXZMaXN0LmFwcGVuZENoaWxkKHRoaXMucmlnaHRDb250YWluZXIpO1xuICAgICAgICB0aGlzLmVuc3VyZUJ1dHRvblNhZmV0eSgpO1xuICAgICAgICB0aGlzLm5hdkRpdi5hcHBlbmRDaGlsZCh0aGlzLnBhZ05hdkxpc3QpO1xuICAgICAgICB0aGlzLmZsYWdEaXYuYXBwZW5kQ2hpbGQodGhpcy5mbGFnZ2luZ1BsYWNlKTsgICAgICAgICAgIC8vIGFkZHMgZmxhZ2dpbmdQbGFjZSB0byB0aGUgZmxhZ0RpdlxuICAgICAgICB0aGlzLmJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpO1xuICAgICAgICB0aGlzLm5hdkRpdi5hcHBlbmRDaGlsZCh0aGlzLmJyZWFrKTtcbiAgICAgICAgLy8gcmVuZGVyIHRoZSBxdWVzdGlvbiBudW1iZXIganVtcCBidXR0b25zXG4gICAgICAgIHRoaXMucU51bUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICQodGhpcy5xTnVtTGlzdCkuYXR0cihcImlkXCIsIFwicGFnZU51bXNcIik7XG4gICAgICAgIHRoaXMucU51bVdyYXBwZXJMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICAkKHRoaXMucU51bVdyYXBwZXJMaXN0KS5hZGRDbGFzcyhcInBhZ2luYXRpb25cIik7XG4gICAgICAgIHZhciB0bXBMaSwgdG1wQTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG1wTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICB0bXBBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICB0bXBBLmlubmVySFRNTCA9IGkgKyAxO1xuICAgICAgICAgICAgJCh0bXBBKS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKHRtcExpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRtcExpLmFwcGVuZENoaWxkKHRtcEEpO1xuICAgICAgICAgICAgdGhpcy5xTnVtV3JhcHBlckxpc3QuYXBwZW5kQ2hpbGQodG1wTGkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucU51bUxpc3QuYXBwZW5kQ2hpbGQodGhpcy5xTnVtV3JhcHBlckxpc3QpO1xuICAgICAgICB0aGlzLm5hdkRpdi5hcHBlbmRDaGlsZCh0aGlzLnFOdW1MaXN0KTtcbiAgICAgICAgdGhpcy5uYXZCdG5MaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5mbGFnQnRuTGlzdGVuZXIoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaXN0ZW5zIGZvciBjbGljayBvbiBmbGFnIGJ1dHRvblxuICAgICAgICAkKHRoaXMuZmxhZ0J1dHRvbikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIHdoZW4gbW92aW5nIG9mZiBvZiBhIHF1ZXN0aW9uIGluIGFuIGFjdGl2ZSBleGFtOlxuICAgIC8vIDEuIHNob3cgdGhhdCB0aGUgcXVlc3Rpb24gaGFzIGJlZW4gc2Vlbiwgb3IgbWFyayBpdCBicm9rZW4gaWYgaXQgaXMgaW4gZXJyb3IuXG4gICAgLy8gMi4gY2hlY2sgYW5kIGxvZyB0aGUgY3VycmVudCBhbnN3ZXJcbiAgICBhc3luYyBuYXZpZ2F0ZUF3YXkoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhdLnN0YXRlID09XG4gICAgICAgICAgICBcImJyb2tlbl9leGFtXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgIFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICAgICApLmFkZENsYXNzKFwiYnJva2VuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhdLnN0YXRlID09XG4gICAgICAgICAgICBcImV4YW1fZW5kZWRcIlxuICAgICAgICApIHtcbiAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgICAgXCJ1bCNwYWdlTnVtcyA+IHVsID4gbGk6ZXEoXCIgKyB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ICsgXCIpXCJcbiAgICAgICAgICAgICkuYWRkQ2xhc3MoXCJ0b29sYXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhdLnF1ZXN0aW9uXG4gICAgICAgICAgICAgICAgLmlzQW5zd2VyZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgIFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICAgICApLmFkZENsYXNzKFwiYW5zd2VyZWRcIik7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4XG4gICAgICAgICAgICBdLnF1ZXN0aW9uLmNoZWNrQ3VycmVudEFuc3dlcigpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRvbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleFxuICAgICAgICAgICAgICAgIF0ucXVlc3Rpb24ubG9nQ3VycmVudEFuc3dlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZU5leHRQcmV2KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50YWtlbikge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5uYXZpZ2F0ZUF3YXkoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpLnRleHQoKTtcbiAgICAgICAgaWYgKHRhcmdldC5tYXRjaCgvTmV4dC8pKSB7ICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrcyBnaXZlbiB0ZXh0IHRvIG1hdGNoIFwiTmV4dFwiXG4gICAgICAgICAgICBpZiAoJCh0aGlzLnJpZ2h0Q29udGFpbmVyKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCsrO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5tYXRjaCgvUHJldi8pKSB7ICAgICAgICAgICAgICAgLy8gY2hlY2tzIGdpdmVuIHRleHQgdG8gbWF0Y2ggXCJQcmV2XCJcbiAgICAgICAgICAgIGlmICgkKHRoaXMubGVmdENvbnRhaW5lcikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgtLTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlclRpbWVkUXVlc3Rpb24oKTtcbiAgICAgICAgdGhpcy5lbnN1cmVCdXR0b25TYWZldHkoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnFOdW1MaXN0LmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgIGogPCB0aGlzLnFOdW1MaXN0LmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaisrXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMucU51bUxpc3QuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzW2pdKS5yZW1vdmVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJChcbiAgICAgICAgICAgIFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIGlmICgkKFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICkuaGFzQ2xhc3MoXCJmbGFnY29sb3JcIikpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2tpbmcgZm9yIGNsYXNzXG4gICAgICAgICAgICB0aGlzLmZsYWdCdXR0b24uaW5uZXJIVE1MID0gXCJVbmZsYWcgUXVlc3Rpb25cIjsgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2VzIHRleHQgb24gYnV0dG9uXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsYWdCdXR0b24uaW5uZXJIVE1MID0gXCJGbGFnIFF1ZXN0aW9uXCI7ICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2VzIHRleHQgb24gYnV0dG9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVGbGFnKGV2ZW50KSB7XG4gICAgICAgIC8vIGNhbGxlZCB3aGVuIGZsYWcgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KS50ZXh0KClcbiAgICAgICAgaWYgKHRhcmdldC5tYXRjaCgvRmxhZyBRdWVzdGlvbi8pKSB7XG4gICAgICAgICAgICAkKFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICAgICApLmFkZENsYXNzKFwiZmxhZ2NvbG9yXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjbGFzcyB3aWxsIGNoYW5nZSBjb2xvciBvZiBxdWVzdGlvbiBibG9ja1xuICAgICAgICAgICAgdGhpcy5mbGFnQnV0dG9uLmlubmVySFRNTCA9IFwiVW5mbGFnIFF1ZXN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwidWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKFwiICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCArIFwiKVwiXG4gICAgICAgICAgICApLnJlbW92ZUNsYXNzKFwiZmxhZ2NvbG9yXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHJlc3RvcmUgY3VycmVudCBjb2xvciBvZiBxdWVzdGlvbiBibG9ja1xuICAgICAgICAgICAgdGhpcy5mbGFnQnV0dG9uLmlubmVySFRNTCA9IFwiRmxhZyBRdWVzdGlvblwiOyAgICAgICAgLy8gYWxzbyBzZXRzIG5hbWUgYmFja1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlTnVtYmVyZWROYXYoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRha2VuKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm5hdmlnYXRlQXdheSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xTnVtTGlzdC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgICAgICAgICBqIDwgdGhpcy5xTnVtTGlzdC5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGorK1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLnFOdW1MaXN0LmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlc1tqXSkucmVtb3ZlQ2xhc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KS50ZXh0KCk7XG4gICAgICAgIGxldCBvbGRJbmRleCA9IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXg7XG4gICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPSBwYXJzZUludCh0YXJnZXQpIC0gMTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPiB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvcjogYmFkIGluZGV4IGZvciAke3RhcmdldH1gKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPSBvbGRJbmRleDtcbiAgICAgICAgfVxuICAgICAgICAkKFxuICAgICAgICAgICAgXCJ1bCNwYWdlTnVtcyA+IHVsID4gbGk6ZXEoXCIgKyB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ICsgXCIpXCJcbiAgICAgICAgKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgaWYgKCQoXCJ1bCNwYWdlTnVtcyA+IHVsID4gbGk6ZXEoXCIgKyB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ICsgXCIpXCIgICAgICAvLyBjaGVja2luZyBmb3IgZmxhZ2NvbG9yIGNsYXNzXG4gICAgICAgICkuaGFzQ2xhc3MoXCJmbGFnY29sb3JcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZmxhZ0J1dHRvbi5pbm5lckhUTUwgPSBcIlVuZmxhZyBRdWVzdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mbGFnQnV0dG9uLmlubmVySFRNTCA9IFwiRmxhZyBRdWVzdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMucmVuZGVyVGltZWRRdWVzdGlvbigpO1xuICAgICAgICB0aGlzLmVuc3VyZUJ1dHRvblNhZmV0eSgpO1xuICAgIH1cblxuICAgIC8vIHNldCB1cCBldmVudHMgZm9yIG5hdmlnYXRpb25cbiAgICBuYXZCdG5MaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIE5leHQgYW5kIFByZXYgTGlzdGVuZXJcbiAgICAgICAgdGhpcy5wYWdOYXZMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU5leHRQcmV2LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIE51bWJlcmVkIExpc3RlbmVyXG4gICAgICAgIHRoaXMucU51bUxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTnVtYmVyZWROYXYuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHVwIGV2ZW50IGZvciBmbGFnXG4gICAgZmxhZ0J0bkxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmZsYWdnaW5nUGxhY2UuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRmxhZy5iaW5kKHRoaXMpLCAgICAgLy8gY2FsbHMgdGhpcyB0byB0YWtlIGFjdGlvblxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdWJtaXRCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgJCh0aGlzLmJ1dHRvbkNvbnRhaW5lcikuYXR0cih7XG4gICAgICAgICAgICBzdHlsZTogXCJ0ZXh0LWFsaWduOmNlbnRlclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5maW5pc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAkKHRoaXMuZmluaXNoQnV0dG9uKS5hdHRyKHtcbiAgICAgICAgICAgIGlkOiBcImZpbmlzaFwiLFxuICAgICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZpbmlzaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRmluaXNoIEV4YW1cIjtcbiAgICAgICAgdGhpcy5maW5pc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jb25maXJtKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDbGlja2luZyBPSyBtZWFucyB5b3UgYXJlIHJlYWR5IHRvIHN1Ym1pdCB5b3VyIGFuc3dlcnMgYW5kIGFyZSBmaW5pc2hlZCB3aXRoIHRoaXMgYXNzZXNzbWVudC5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmluaXNoQXNzZXNzbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMuZmxhZ0J1dHRvbikuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29udHJvbERpdi5hcHBlbmRDaGlsZCh0aGlzLmZpbmlzaEJ1dHRvbik7XG4gICAgICAgICQodGhpcy5maW5pc2hCdXR0b24pLmhpZGUoKTtcbiAgICAgICAgdGhpcy50aW1lZERpdi5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbkNvbnRhaW5lcik7XG4gICAgfVxuICAgIGVuc3VyZUJ1dHRvblNhZmV0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGggIT0gMSkge1xuICAgICAgICAgICAgICAgICQodGhpcy5yaWdodENvbnRhaW5lcikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5sZWZ0Q29udGFpbmVyKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPj1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMubGVmdENvbnRhaW5lcikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcy5yaWdodENvbnRhaW5lcikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID4gMCAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA8IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMucmlnaHRDb250YWluZXIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAkKHRoaXMubGVmdENvbnRhaW5lcikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJGZWVkYmFja0NvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5zY29yZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJQXCIpO1xuICAgICAgICB0aGlzLnNjb3JlRGl2LmlkID0gdGhpcy5kaXZpZCArIFwicmVzdWx0c1wiO1xuICAgICAgICB0aGlzLnNjb3JlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5zY29yZURpdik7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVuZGVyZWRRdWVzdGlvbkFycmF5KCkge1xuICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCB0aGUgYXNzZXNzIHF1ZXN0aW9ucyBpbiB0aGlzIHRpbWVkIGFzc2Vzc21lbnRcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIGEgbGlzdCBvZiBhbGwgdGhlIHF1ZXN0aW9ucyB1cCBmcm9udCBzbyB3ZSBjYW4gc2V0IHVwIG5hdmlnYXRpb25cbiAgICAgICAgLy8gYnV0IHdlIGRvIG5vdCB3YW50IHRvIHJlbmRlciB0aGUgcXVlc3Rpb25zIHVudGlsIHRoZSBzdHVkZW50IGhhcyBuYXZpZ2F0ZWRcbiAgICAgICAgLy8gQWxzbyBhZGRzIHRoZW0gdG8gdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXlcblxuICAgICAgICAvLyB0b2RvOiAgVGhpcyBuZWVkcyB0byBiZSB1cGRhdGVkIHRvIGFjY291bnQgZm9yIHRoZSBydW5lc3RvbmUgZGl2IHdyYXBwZXIuXG5cbiAgICAgICAgLy8gVG8gYWNjb21tb2RhdGUgdGhlIHNlbGVjdHF1ZXN0aW9uIHR5cGUgLS0gd2hpY2ggaXMgYXN5bmMhIHdlIG5lZWQgdG8gd3JhcFxuICAgICAgICAvLyBhbGwgb2YgdGhpcyBpbiBhIHByb21pc2UsIHNvIHRoYXQgd2UgZG9uJ3QgY29udGludWUgdG8gcmVuZGVyIHRoZSB0aW1lZFxuICAgICAgICAvLyBleGFtIHVudGlsIGFsbCBvZiB0aGUgcXVlc3Rpb25zIGhhdmUgYmVlbiByZWFsaXplZC5cbiAgICAgICAgdmFyIG9wdHM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5uZXdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRtcENoaWxkID0gdGhpcy5uZXdDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFwicHJlcGFyZWRcIixcbiAgICAgICAgICAgICAgICBvcmlnOiB0bXBDaGlsZCxcbiAgICAgICAgICAgICAgICBxdWVzdGlvbjoge30sXG4gICAgICAgICAgICAgICAgdXNlUnVuZXN0b25lU2VydmljZXM6IGVCb29rQ29uZmlnLnVzZVJ1bmVzdG9uZVNlcnZpY2VzLFxuICAgICAgICAgICAgICAgIHRpbWVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzc2Vzc21lbnRUYWtlbjogdGhpcy50YWtlbixcbiAgICAgICAgICAgICAgICB0aW1lZFdyYXBwZXI6IHRoaXMuZGl2aWQsXG4gICAgICAgICAgICAgICAgaW5pdEF0dGVtcHRzOiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICgkKHRtcENoaWxkKS5jaGlsZHJlbihcIltkYXRhLWNvbXBvbmVudF1cIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRtcENoaWxkID0gJCh0bXBDaGlsZCkuY2hpbGRyZW4oXCJbZGF0YS1jb21wb25lbnRdXCIpWzBdO1xuICAgICAgICAgICAgICAgIG9wdHMub3JpZyA9IHRtcENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodG1wQ2hpbGQpLmlzKFwiW2RhdGEtY29tcG9uZW50XVwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5LnB1c2gob3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByYW5kb21pemVSUUEoKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGgsXG4gICAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSxcbiAgICAgICAgICAgIHJhbmRvbUluZGV4O1xuICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgICB3aGlsZSAoY3VycmVudEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXlbXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4XG4gICAgICAgICAgICBdID0gdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJUaW1lZFF1ZXN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCA+PSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNvbWV0aW1lcyB0aGUgdXNlciBjbGlja3MgaW4gdGhlIGV2ZW50IGFyZWEgZm9yIHRoZSBxTnVtTGlzdFxuICAgICAgICAgICAgLy8gQnV0IG1pc3NlcyBhIG51bWJlciBpbiB0aGF0IGNhc2UgdGhlIHRleHQgaXMgdGhlIGNvbmNhdGVuYXRpb25cbiAgICAgICAgICAgIC8vIG9mIGFsbCB0aGUgbnVtYmVycyBpbiB0aGUgbGlzdCFcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayB0aGUgcmVuZGVyZWRRdWVzdGlvbkFycmF5IHRvIHNlZSBpZiBpdCBoYXMgYmVlbiByZW5kZXJlZC5cbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVt0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4XTtcbiAgICAgICAgbGV0IGN1cnJlbnRRdWVzdGlvbjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb3B0cy5zdGF0ZSA9PT0gXCJwcmVwYXJlZFwiIHx8XG4gICAgICAgICAgICBvcHRzLnN0YXRlID09PSBcImZvcnJldmlld1wiIHx8XG4gICAgICAgICAgICAob3B0cy5zdGF0ZSA9PT0gXCJicm9rZW5fZXhhbVwiICYmIG9wdHMuaW5pdEF0dGVtcHRzIDwgMylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgdG1wQ2hpbGQgPSBvcHRzLm9yaWc7XG4gICAgICAgICAgICBpZiAoJCh0bXBDaGlsZCkuaXMoXCJbZGF0YS1jb21wb25lbnQ9c2VsZWN0cXVlc3Rpb25dXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSAmJiBvcHRzLnN0YXRlID09IFwicHJlcGFyZWRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgXS5zdGF0ZSA9IFwiZXhhbV9lbmRlZFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdE9uZSBpcyBhc3luYyBhbmQgd2lsbCByZXBsYWNlIGl0c2VsZiBpbiB0aGlzIGFycmF5IHdpdGhcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCBzZWxlY3RlZCBxdWVzdGlvblxuICAgICAgICAgICAgICAgICAgICBvcHRzLnJxYSA9IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3cSA9IG5ldyBTZWxlY3RPbmUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IG5ld3EsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBuZXdxLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0YXRlID09IFwiYnJva2VuX2V4YW1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYnJva2VuIGNsYXNzIGZyb20gdGhpcyBxdWVzdGlvbiBpZiB3ZSBnZXQgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdWwjcGFnZU51bXMgPiB1bCA+IGxpOmVxKCR7dGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleH0pYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkucmVtb3ZlQ2xhc3MoXCJicm9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuc3RhdGUgPSBcImJyb2tlbl9leGFtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gb3B0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBFcnJvciBpbml0aWFsaXppbmcgcXVlc3Rpb246IERldGFpbHMgJHtlfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQodG1wQ2hpbGQpLmlzKFwiW2RhdGEtY29tcG9uZW50XVwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRLaW5kID0gJCh0bXBDaGlsZCkuZGF0YShcImNvbXBvbmVudFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVt0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IHdpbmRvdy5jb21wb25lbnRfZmFjdG9yeVtjb21wb25lbnRLaW5kXShvcHRzKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuc3RhdGUgPT09IFwiYnJva2VuX2V4YW1cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFF1ZXN0aW9uID0gdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXlbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleF1cbiAgICAgICAgICAgIC5xdWVzdGlvbjtcbiAgICAgICAgaWYgKG9wdHMuc3RhdGUgPT09IFwiZm9ycmV2aWV3XCIpIHtcbiAgICAgICAgICAgIGF3YWl0IGN1cnJlbnRRdWVzdGlvbi5jaGVja0N1cnJlbnRBbnN3ZXIoKTtcbiAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5yZW5kZXJGZWVkYmFjaygpO1xuICAgICAgICAgICAgY3VycmVudFF1ZXN0aW9uLmRpc2FibGVJbnRlcmFjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnZpc2l0ZWQuaW5jbHVkZXModGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaXRlZC5wdXNoKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZC5sZW5ndGggPT09IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5Lmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmRvbmVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICQodGhpcy5maW5pc2hCdXR0b24pLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50UXVlc3Rpb24uY29udGFpbmVyRGl2KSB7XG4gICAgICAgICAgICAkKHRoaXMuc3dpdGNoRGl2KS5yZXBsYWNlV2l0aChjdXJyZW50UXVlc3Rpb24uY29udGFpbmVyRGl2KTtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRGl2ID0gY3VycmVudFF1ZXN0aW9uLmNvbnRhaW5lckRpdjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSB0aW1lZCBjb21wb25lbnQgaGFzIGxpc3RlbmVycywgdGhvc2UgbWlnaHQgbmVlZCB0byBiZSByZWluaXRpYWxpemVkXG4gICAgICAgIC8vIFRoaXMgZmxhZyB3aWxsIG9ubHkgYmUgc2V0IGluIHRoZSBlbGVtZW50cyB0aGF0IG5lZWQgaXQtLWl0IHdpbGwgYmUgdW5kZWZpbmVkIGluIHRoZSBvdGhlcnMgYW5kIHRodXMgZXZhbHVhdGUgdG8gZmFsc2VcbiAgICAgICAgaWYgKGN1cnJlbnRRdWVzdGlvbi5uZWVkc1JlaW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5yZWluaXRpYWxpemVMaXN0ZW5lcnModGhpcy50YWtlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgID09PSBUaW1lciBhbmQgY29udHJvbCBGdW5jdGlvbnMgPT09XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBoYW5kbGVQcmV2QXNzZXNzbWVudCgpIHtcbiAgICAgICAgJCh0aGlzLnN0YXJ0QnRuKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5wYXVzZUJ0bikuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAkKHRoaXMuZmluaXNoQnV0dG9uKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucnVubmluZyA9IDA7XG4gICAgICAgIHRoaXMuZG9uZSA9IDE7XG4gICAgICAgIC8vIHNob3dGZWVkYmFjayBzYW5kIHNob3dSZXN1bHRzIHNob3VsZCBib3RoIGJlIHRydWUgYmVmb3JlIHdlIHNob3cgdGhlXG4gICAgICAgIC8vIHF1ZXN0aW9ucyBhbmQgdGhlaXIgc3RhdGUgb2YgY29ycmVjdG5lc3MuXG4gICAgICAgIGlmICh0aGlzLnNob3dSZXN1bHRzICYmIHRoaXMuc2hvd0ZlZWRiYWNrKSB7XG4gICAgICAgICAgICAkKHRoaXMudGltZWREaXYpLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFuc3dlcmVkUXVlc3Rpb25zKCk7IC8vIGRvIG5vdCBsb2cgdGhlc2UgcmVzdWx0c1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzLnBhdXNlQnRuKS5oaWRlKCk7XG4gICAgICAgICAgICAkKHRoaXMudGltZXJDb250YWluZXIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydEFzc2Vzc21lbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy50YWtlbikge1xuICAgICAgICAgICAgJChcIiNyZWxhdGlvbnMtbmV4dFwiKS5oaWRlKCk7IC8vIGhpZGUgdGhlIG5leHQgcGFnZSBidXR0b24gZm9yIG5vd1xuICAgICAgICAgICAgJChcIiNyZWxhdGlvbnMtcHJldlwiKS5oaWRlKCk7IC8vIGhpZGUgdGhlIHByZXZpb3VzIGJ1dHRvbiBmb3Igbm93XG4gICAgICAgICAgICAkKHRoaXMuc3RhcnRCdG4pLmhpZGUoKTtcbiAgICAgICAgICAgICQodGhpcy5wYXVzZUJ0bikuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bm5pbmcgPT09IDAgJiYgdGhpcy5wYXVzZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICQodGhpcy50aW1lZERpdikuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogXCJ0aW1lZEV4YW1cIixcbiAgICAgICAgICAgICAgICAgICAgYWN0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIGRpdl9pZDogdGhpcy5kaXZpZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmFnZU9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiBbMCwgMCwgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkubGVuZ3RoLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VLZXkoKSxcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZU9iailcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFxuICAgICAgICAgICAgICAgIFwiYmVmb3JldW5sb2FkXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgYWN0dWFsIHZhbHVlIGdldHMgaWdub3JlZCBieSBuZXdlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbGVhdmU/ICBZb3VyIHdvcmsgd2lsbCBiZSBsb3N0ISBBbmQgeW91IHdpbGwgbmVlZCB5b3VyIGluc3RydWN0b3IgdG8gcmVzZXQgdGhlIGV4YW0hXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZT8gIFlvdXIgd29yayB3aWxsIGJlIGxvc3QhXCI7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgXCJwYWdlaGlkZVwiLFxuICAgICAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5maW5pc2hBc3Nlc3NtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4YW0gZXhpdGVkIGJ5IGxlYXZpbmcgcGFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUHJldkFzc2Vzc21lbnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXVzZUFzc2Vzc21lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbmUgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bm5pbmcgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ0Jvb2tFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBcInRpbWVkRXhhbVwiLFxuICAgICAgICAgICAgICAgICAgICBhY3Q6IFwicGF1c2VcIixcbiAgICAgICAgICAgICAgICAgICAgZGl2X2lkOiB0aGlzLmRpdmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VCdG4uaW5uZXJIVE1MID0gXCJSZXN1bWVcIjtcbiAgICAgICAgICAgICAgICAkKHRoaXMudGltZWREaXYpLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogXCJ0aW1lZEV4YW1cIixcbiAgICAgICAgICAgICAgICAgICAgYWN0OiBcInJlc3VtZVwiLFxuICAgICAgICAgICAgICAgICAgICBkaXZfaWQ6IHRoaXMuZGl2aWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlQnRuLmlubmVySFRNTCA9IFwiUGF1c2VcIjtcbiAgICAgICAgICAgICAgICAkKHRoaXMudGltZWREaXYpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dUaW1lKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZXIpIHtcbiAgICAgICAgICAgIHZhciBtaW5zID0gTWF0aC5mbG9vcih0aGlzLnRpbWVMaW1pdCAvIDYwKTtcbiAgICAgICAgICAgIHZhciBzZWNzID0gTWF0aC5mbG9vcih0aGlzLnRpbWVMaW1pdCkgJSA2MDtcbiAgICAgICAgICAgIHZhciBtaW5zU3RyaW5nID0gbWlucztcbiAgICAgICAgICAgIHZhciBzZWNzU3RyaW5nID0gc2VjcztcbiAgICAgICAgICAgIGlmIChtaW5zIDwgMTApIHtcbiAgICAgICAgICAgICAgICBtaW5zU3RyaW5nID0gXCIwXCIgKyBtaW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlY3MgPCAxMCkge1xuICAgICAgICAgICAgICAgIHNlY3NTdHJpbmcgPSBcIjBcIiArIHNlY3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmVnaW5uaW5nID0gXCJUaW1lIFJlbWFpbmluZyAgICBcIjtcbiAgICAgICAgICAgIGlmICghdGhpcy5saW1pdGVkVGltZSkge1xuICAgICAgICAgICAgICAgIGJlZ2lubmluZyA9IFwiVGltZSBUYWtlbiAgICBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0aW1lU3RyaW5nID0gYmVnaW5uaW5nICsgbWluc1N0cmluZyArIFwiOlwiICsgc2Vjc1N0cmluZztcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbmUgfHwgdGhpcy50YWtlbikge1xuICAgICAgICAgICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aGlzLnRpbWVUYWtlbiAvIDYwKTtcbiAgICAgICAgICAgICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IodGhpcy50aW1lVGFrZW4gJSA2MCk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gXCIwXCIgKyBtaW51dGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kcyA8IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBcIjBcIiArIHNlY29uZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVTdHJpbmcgPSBcIlRpbWUgdGFrZW46IFwiICsgbWludXRlcyArIFwiOlwiICsgc2Vjb25kcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGltZXJDb250YWluZXIuaW5uZXJIVE1MID0gdGltZVN0cmluZztcbiAgICAgICAgICAgIHZhciB0aW1lVGlwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0aW1lVGlwXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gdGltZVRpcHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGltZVRpcHNbaV0udGl0bGUgPSB0aW1lU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzLnRpbWVyQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIC8vIGlmIHJ1bm5pbmcgKG5vdCBwYXVzZWQpIGFuZCBub3QgdGFrZW5cbiAgICAgICAgaWYgKHRoaXMucnVubmluZyA9PT0gMSAmJiAhdGhpcy50YWtlbikge1xuICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gYSBicm93c2VyIGxvc2VzIGZvY3VzLCBzZXRUaW1lb3V0IG1heSBub3QgYmUgY2FsbGVkIG9uIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzY2hlZHVsZSBleHBlY3RlZC4gIEJyb3dzZXJzIGFyZSBmcmVlIHRvIHNhdmUgcG93ZXIgYnkgbGVuZ3RoZW5pbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGludGVydmFsIHRvIHNvbWUgbG9uZ2VyIHRpbWUuICBTbyB3ZSBjYW5ub3QganVzdCBzdWJ0cmFjdCAxXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyb20gdGhlIHRpbWVMaW1pdCB3ZSBuZWVkIHRvIG1lYXN1cmUgdGhlIGVsYXBzZWQgdGltZSBmcm9tIHRoZSBsYXN0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgdG8gdGhlIGN1cnJlbnQgY2FsbCBhbmQgc3VidHJhY3QgdGhhdCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGltaXRlZFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSB0aW1lIGxpbWl0LCBjb3VudCBkb3duIHRvIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZUxpbWl0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMaW1pdCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBjb3VudCB1cCB0byBrZWVwIHRyYWNrIG9mIGhvdyBsb25nIGl0IHRvb2sgdG8gY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZUxpbWl0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMaW1pdCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICBlQm9va0NvbmZpZy5lbWFpbCArIFwiOlwiICsgdGhpcy5kaXZpZCArIFwiLXRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZUxpbWl0XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZUxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJhbiBvdXQgb2YgdGltZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzLnN0YXJ0QnRuKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcy5maW5pc2hCdXR0b24pLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9uZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRha2VuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgbWVzc2FnZSBpbiB0aGUgcGFnZSAtLSBhbiBhbGVydCBhY3R1YWxseSBwcmV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhbnN3ZXJzIGZyb20gYmVpbmcgc3VibWl0dGVkIGFuZCBpZiBhIHN0dWRlbnQgY2xvc2VzIHRoZWlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFwdG9wIHRoZW4gdGhlIGFuc3dlcnMgd2lsbCBub3QgYmUgc3VibWl0dGVkIGV2ZXIhICBFdmVuIHdoZW4gdGhleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlb3BlbiB0aGUgbGFwdG9wIHRoZWlyIHNlc3Npb24gY29va2llIGlzIGxpa2VseSBpbnZhbGlkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3MuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTb3JyeSBidXQgeW91IHJhbiBvdXQgb2YgdGltZS4gWW91ciBhbnN3ZXJzIGFyZSBiZWluZyBzdWJtaXR0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQobWVzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBc3Nlc3NtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgMTAwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0eWxlRXhhbUVsZW1lbnRzKCkge1xuICAgICAgICAvLyBDaGVja3MgaWYgdGhpcyBleGFtIGhhcyBiZWVuIHRha2VuIGJlZm9yZVxuICAgICAgICAkKHRoaXMudGltZXJDb250YWluZXIpLmNzcyh7XG4gICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbiAgICAgICAgICAgIG1hcmdpbjogXCIwIGF1dG9cIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiNERkYwRDhcIixcbiAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9yZGVyOiBcIjJweCBzb2xpZCAjREZGMEQ4XCIsXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCIyNXB4XCIsXG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMuc2NvcmVEaXYpLmNzcyh7XG4gICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbiAgICAgICAgICAgIG1hcmdpbjogXCIwIGF1dG9cIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiNERkYwRDhcIixcbiAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9yZGVyOiBcIjJweCBzb2xpZCAjREZGMEQ4XCIsXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXNcIjogXCIyNXB4XCIsXG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLnRvb2x0aXBUaW1lXCIpLmNzcyh7XG4gICAgICAgICAgICBtYXJnaW46IFwiMFwiLFxuICAgICAgICAgICAgcGFkZGluZzogXCIwXCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCJibGFja1wiLFxuICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluaXNoQXNzZXNzbWVudCgpIHtcbiAgICAgICAgJChcIiNyZWxhdGlvbnMtbmV4dFwiKS5zaG93KCk7IC8vIHNob3cgdGhlIG5leHQgcGFnZSBidXR0b24gZm9yIG5vd1xuICAgICAgICAkKFwiI3JlbGF0aW9ucy1wcmV2XCIpLnNob3coKTsgLy8gc2hvdyB0aGUgcHJldmlvdXMgYnV0dG9uIGZvciBub3dcbiAgICAgICAgaWYgKCF0aGlzLnNob3dGZWVkYmFjaykge1xuICAgICAgICAgICAgLy8gYmplIC0gY2hhbmdlZCBmcm9tIHNob3dSZXN1bHRzXG4gICAgICAgICAgICAkKHRoaXMudGltZWREaXYpLmhpZGUoKTtcbiAgICAgICAgICAgICQodGhpcy5wYXVzZUJ0bikuaGlkZSgpO1xuICAgICAgICAgICAgJCh0aGlzLnRpbWVyQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5kVGltZVRha2VuKCk7XG4gICAgICAgIHRoaXMucnVubmluZyA9IDA7XG4gICAgICAgIHRoaXMuZG9uZSA9IDE7XG4gICAgICAgIHRoaXMudGFrZW4gPSAxO1xuICAgICAgICBhd2FpdCB0aGlzLmZpbmFsaXplUHJvYmxlbXMoKTtcbiAgICAgICAgdGhpcy5jaGVja1Njb3JlKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheVNjb3JlKCk7XG4gICAgICAgIHRoaXMuc3RvcmVTY29yZSgpO1xuICAgICAgICB0aGlzLmxvZ1Njb3JlKCk7XG4gICAgICAgICQodGhpcy5wYXVzZUJ0bikuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmZpbmlzaEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICQod2luZG93KS5vZmYoXCJiZWZvcmV1bmxvYWRcIik7XG4gICAgICAgIC8vIHR1cm4gb2ZmIHRoZSBwYWdlaGlkZSBsaXN0ZW5lclxuICAgICAgICBsZXQgYXNzaWdubWVudF9pZCA9IHRoaXMuZGl2aWQ7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogZUJvb2tDb25maWcuYXBwICsgXCIvYXNzaWdubWVudHMvc3R1ZGVudF9hdXRvZ3JhZGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJKU09OXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50X2lkOiBhc3NpZ25tZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICBpc190aW1lZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXRkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRkYXRhLnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1dG9ncmFkZXIgY29tcGxldGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICAvLyBmaW5hbGl6ZVByb2JsZW1zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzeW5jIGZpbmFsaXplUHJvYmxlbXMoKSB7XG4gICAgICAgIC8vIEJlY2F1c2Ugd2UgaGF2ZSBzdWJtaXR0ZWQgZWFjaCBxdWVzdGlvbiBhcyB3ZSBuYXZpZ2F0ZSB3ZSBvbmx5IG5lZWQgdG9cbiAgICAgICAgLy8gc2VuZCB0aGUgZmluYWwgdmVyc2lvbiBvZiB0aGUgcXVlc3Rpb24gdGhlIHN0dWRlbnQgaXMgb24gd2hlbiB0aGV5IHByZXNzIHRoZVxuICAgICAgICAvLyBmaW5pc2ggZXhhbSBidXR0b24uXG5cbiAgICAgICAgdmFyIGN1cnJlbnRRdWVzdGlvbiA9IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleFxuICAgICAgICBdLnF1ZXN0aW9uO1xuICAgICAgICBhd2FpdCBjdXJyZW50UXVlc3Rpb24uY2hlY2tDdXJyZW50QW5zd2VyKCk7XG4gICAgICAgIGN1cnJlbnRRdWVzdGlvbi5sb2dDdXJyZW50QW5zd2VyKCk7XG4gICAgICAgIGN1cnJlbnRRdWVzdGlvbi5yZW5kZXJGZWVkYmFjaygpO1xuICAgICAgICBjdXJyZW50UXVlc3Rpb24uZGlzYWJsZUludGVyYWN0aW9uKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWVzdGlvbiA9IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W2ldO1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBzdGF0ZSB0byBmb3JyZXZpZXcgc28gd2Uga25vdyB0aGF0IGZlZWRiYWNrIG1heSBiZSBhcHByb3ByaWF0ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWVzdGlvbi5zdGF0ZSAhPT0gXCJicm9rZW5fZXhhbVwiKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXN0aW9uLnN0YXRlID0gXCJmb3JyZXZpZXdcIjtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVlc3Rpb24ucXVlc3Rpb24uZGlzYWJsZUludGVyYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc2hvd0ZlZWRiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lZEZlZWRiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXN0b3JlQW5zd2VyZWRRdWVzdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICByZXN0b3JlQW5zd2VyZWRRdWVzdGlvbnMoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UXVlc3Rpb24gPSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVlc3Rpb24uc3RhdGUgPT09IFwicHJlcGFyZWRcIikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5zdGF0ZSA9IFwiZm9ycmV2aWV3XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlVGltZWRGZWVkYmFja1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaGlkZVRpbWVkRmVlZGJhY2soKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UXVlc3Rpb24gPSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheVtpXS5xdWVzdGlvbjtcbiAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5oaWRlRmVlZGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoZWNrU2NvcmVcbiAgICAvLyAtLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBpcyBhIHNpbXBsZSBhbGwgb3Igbm90aGluZyBzY29yZSBvZiBvbmUgcG9pbnQgcGVyIHF1ZXN0aW9uIGZvclxuICAgIC8vIHRoYXQgaW5jbHVkZXMgb3VyIGJlc3QgZ3Vlc3MgaWYgYSBxdWVzdGlvbiB3YXMgc2tpcHBlZC5cbiAgICBjaGVja1Njb3JlKCkge1xuICAgICAgICB0aGlzLmNvcnJlY3RTdHIgPSBcIlwiO1xuICAgICAgICB0aGlzLnNraXBwZWRTdHIgPSBcIlwiO1xuICAgICAgICB0aGlzLmluY29ycmVjdFN0ciA9IFwiXCI7XG4gICAgICAgIC8vIEdldHMgdGhlIHNjb3JlIG9mIGVhY2ggcHJvYmxlbVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29ycmVjdCA9IHRoaXMucmVuZGVyZWRRdWVzdGlvbkFycmF5W1xuICAgICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0ucXVlc3Rpb24uY2hlY2tDb3JyZWN0VGltZWQoKTtcbiAgICAgICAgICAgIGlmIChjb3JyZWN0ID09IFwiVFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSsrO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdFN0ciA9IHRoaXMuY29ycmVjdFN0ciArIChpICsgMSkgKyBcIiwgXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvcnJlY3QgPT0gXCJGXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29ycmVjdCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0U3RyID0gdGhpcy5pbmNvcnJlY3RTdHIgKyAoaSArIDEpICsgXCIsIFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3JyZWN0ID09PSBudWxsIHx8IGNvcnJlY3QgPT09IFwiSVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5za2lwcGVkKys7XG4gICAgICAgICAgICAgICAgdGhpcy5za2lwcGVkU3RyID0gdGhpcy5za2lwcGVkU3RyICsgKGkgKyAxKSArIFwiLCBcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlZCBxdWVzdGlvbjsganVzdCBkbyBub3RoaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIGV4dHJhIGNvbW1hIGFuZCBzcGFjZSBhdCBlbmQgaWYgYW55XG4gICAgICAgIGlmICh0aGlzLmNvcnJlY3RTdHIubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdFN0ciA9IHRoaXMuY29ycmVjdFN0ci5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvcnJlY3RTdHIubGVuZ3RoIC0gMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSB0aGlzLmNvcnJlY3RTdHIgPSBcIk5vbmVcIjtcbiAgICAgICAgaWYgKHRoaXMuc2tpcHBlZFN0ci5sZW5ndGggPiAwKVxuICAgICAgICAgICAgdGhpcy5za2lwcGVkU3RyID0gdGhpcy5za2lwcGVkU3RyLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZFN0ci5sZW5ndGggLSAyXG4gICAgICAgICAgICApO1xuICAgICAgICBlbHNlIHRoaXMuc2tpcHBlZFN0ciA9IFwiTm9uZVwiO1xuICAgICAgICBpZiAodGhpcy5pbmNvcnJlY3RTdHIubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0U3RyID0gdGhpcy5pbmNvcnJlY3RTdHIuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RTdHIubGVuZ3RoIC0gMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSB0aGlzLmluY29ycmVjdFN0ciA9IFwiTm9uZVwiO1xuICAgIH1cbiAgICBmaW5kVGltZVRha2VuKCkge1xuICAgICAgICBpZiAodGhpcy5saW1pdGVkVGltZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lVGFrZW4gPSB0aGlzLnN0YXJ0aW5nVGltZSAtIHRoaXMudGltZUxpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lVGFrZW4gPSB0aGlzLnRpbWVMaW1pdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9yZVNjb3JlKCkge1xuICAgICAgICB2YXIgc3RvcmFnZV9hcnIgPSBbXTtcbiAgICAgICAgc3RvcmFnZV9hcnIucHVzaChcbiAgICAgICAgICAgIHRoaXMuc2NvcmUsXG4gICAgICAgICAgICB0aGlzLmNvcnJlY3RTdHIsXG4gICAgICAgICAgICB0aGlzLmluY29ycmVjdCxcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0U3RyLFxuICAgICAgICAgICAgdGhpcy5za2lwcGVkLFxuICAgICAgICAgICAgdGhpcy5za2lwcGVkU3RyLFxuICAgICAgICAgICAgdGhpcy50aW1lVGFrZW5cbiAgICAgICAgKTtcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBzdG9yYWdlT2JqID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgYW5zd2VyOiBzdG9yYWdlX2FycixcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGltZVN0YW1wLFxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkoKSwgc3RvcmFnZU9iaik7XG4gICAgfVxuICAgIC8vIF9gdGltZWQgZXhhbSBlbmRwb2ludCBwYXJhbWV0ZXJzYFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGxvZ1Njb3JlKCkge1xuICAgICAgICB0aGlzLmxvZ0Jvb2tFdmVudCh7XG4gICAgICAgICAgICBldmVudDogXCJ0aW1lZEV4YW1cIixcbiAgICAgICAgICAgIGFjdDogXCJmaW5pc2hcIixcbiAgICAgICAgICAgIGRpdl9pZDogdGhpcy5kaXZpZCxcbiAgICAgICAgICAgIGNvcnJlY3Q6IHRoaXMuc2NvcmUsXG4gICAgICAgICAgICBpbmNvcnJlY3Q6IHRoaXMuaW5jb3JyZWN0LFxuICAgICAgICAgICAgc2tpcHBlZDogdGhpcy5za2lwcGVkLFxuICAgICAgICAgICAgdGltZV90YWtlbjogdGhpcy50aW1lVGFrZW4sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaG91bGRVc2VTZXJ2ZXIoZGF0YSkge1xuICAgICAgICAvLyBXZSBvdmVycmlkZSB0aGUgUnVuZXN0b25lQmFzZSB2ZXJzaW9uIGJlY2F1c2UgdGhlcmUgaXMgbm8gXCJjb3JyZWN0XCIgYXR0cmlidXRlLCBhbmQgdGhlcmUgYXJlIDIgcG9zc2libGUgbG9jYWxTdG9yYWdlIHNjaGVtYXNcbiAgICAgICAgLy8gLS13ZSBhbHNvIHdhbnQgdG8gZGVmYXVsdCB0byBsb2NhbCBzdG9yYWdlIGJlY2F1c2UgaXQgY29udGFpbnMgbW9yZSBpbmZvcm1hdGlvbiBzcGVjaWZpY2FsbHkgd2hpY2ggcXVlc3Rpb25zIGFyZSBjb3JyZWN0LCBpbmNvcnJlY3QsIGFuZCBza2lwcGVkLlxuICAgICAgICB2YXIgc3RvcmFnZURhdGU7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIHN0b3JhZ2VPYmogPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSgpKTtcbiAgICAgICAgaWYgKHN0b3JhZ2VPYmogPT09IG51bGwpIHJldHVybiB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHN0b3JlZERhdGEgPSBKU09OLnBhcnNlKHN0b3JhZ2VPYmopLmFuc3dlcjtcbiAgICAgICAgICAgIGlmIChzdG9yZWREYXRhLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvcnJlY3QgPT0gc3RvcmVkRGF0YVswXSAmJlxuICAgICAgICAgICAgICAgICAgICBkYXRhLmluY29ycmVjdCA9PSBzdG9yZWREYXRhWzFdICYmXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2tpcHBlZCA9PSBzdG9yZWREYXRhWzJdICYmXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGltZVRha2VuID09IHN0b3JlZERhdGFbM11cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdG9yZWREYXRhLmxlbmd0aCA9PSA3KSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvcnJlY3QgPT0gc3RvcmVkRGF0YVswXSAmJlxuICAgICAgICAgICAgICAgICAgICBkYXRhLmluY29ycmVjdCA9PSBzdG9yZWREYXRhWzJdICYmXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2tpcHBlZCA9PSBzdG9yZWREYXRhWzRdICYmXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGltZVRha2VuID09IHN0b3JlZERhdGFbNl1cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBJbiB0aGlzIGNhc2UsIGJlY2F1c2UgbG9jYWwgc3RvcmFnZSBoYXMgbW9yZSBpbmZvLCB3ZSB3YW50IHRvIHVzZSB0aGF0IGlmIGl0J3MgY29uc2lzdGVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JhZ2VEYXRlID0gbmV3IERhdGUoSlNPTi5wYXJzZShzdG9yYWdlT2JqWzFdKS50aW1lc3RhbXApO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGVycm9yIHdoaWxlIHBhcnNpbmc7IGxpa2VseSBkdWUgdG8gYmFkIHZhbHVlIHN0b3JlZCBpbiBzdG9yYWdlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZXJ2ZXJEYXRlID0gbmV3IERhdGUoZGF0YS50aW1lc3RhbXApO1xuICAgICAgICBpZiAoc2VydmVyRGF0ZSA8IHN0b3JhZ2VEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ1Njb3JlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY2hlY2tMb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIHZhciBsZW4gPSBsb2NhbFN0b3JhZ2UubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWtlbiA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQW5zd2VycyhcIlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWtlbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRha2VuID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyByZXN0b3JlQW5zd2VycyhkYXRhKSB7XG4gICAgICAgIHRoaXMudGFrZW4gPSAxO1xuICAgICAgICB2YXIgdG1wQXJyO1xuICAgICAgICBpZiAoZGF0YSA9PT0gXCJcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0bXBBcnIgPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSgpKVxuICAgICAgICAgICAgICAgICkuYW5zd2VyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3Igd2hpbGUgcGFyc2luZzsgbGlrZWx5IGR1ZSB0byBiYWQgdmFsdWUgc3RvcmVkIGluIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWtlbiA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUGFyc2UgcmVzdWx0cyBmcm9tIHRoZSBkYXRhYmFzZVxuICAgICAgICAgICAgdG1wQXJyID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGRhdGEuY29ycmVjdCksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZGF0YS5pbmNvcnJlY3QpLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGRhdGEuc2tpcHBlZCksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZGF0YS50aW1lVGFrZW4pLFxuICAgICAgICAgICAgICAgIGRhdGEucmVzZXQsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UodG1wQXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG1wQXJyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAvLyBFeGFtIHdhcyBwcmV2aW91c2x5IHJlc2V0XG4gICAgICAgICAgICB0aGlzLnJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGFrZW4gPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0bXBBcnIubGVuZ3RoID09IDQpIHtcbiAgICAgICAgICAgIC8vIEFjY2lkZW50YWwgUmVsb2FkIE9SIERhdGFiYXNlIEVudHJ5XG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gdG1wQXJyWzBdO1xuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3QgPSB0bXBBcnJbMV07XG4gICAgICAgICAgICB0aGlzLnNraXBwZWQgPSB0bXBBcnJbMl07XG4gICAgICAgICAgICB0aGlzLnRpbWVUYWtlbiA9IHRtcEFyclszXTtcbiAgICAgICAgfSBlbHNlIGlmICh0bXBBcnIubGVuZ3RoID09IDcpIHtcbiAgICAgICAgICAgIC8vIExvYWRlZCBDb21wbGV0ZWQgRXhhbVxuICAgICAgICAgICAgdGhpcy5zY29yZSA9IHRtcEFyclswXTtcbiAgICAgICAgICAgIHRoaXMuY29ycmVjdFN0ciA9IHRtcEFyclsxXTtcbiAgICAgICAgICAgIHRoaXMuaW5jb3JyZWN0ID0gdG1wQXJyWzJdO1xuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RTdHIgPSB0bXBBcnJbM107XG4gICAgICAgICAgICB0aGlzLnNraXBwZWQgPSB0bXBBcnJbNF07XG4gICAgICAgICAgICB0aGlzLnNraXBwZWRTdHIgPSB0bXBBcnJbNV07XG4gICAgICAgICAgICB0aGlzLnRpbWVUYWtlbiA9IHRtcEFycls2XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNldCBsb2NhbFN0b3JhZ2UgaW4gY2FzZSBvZiBcImFjY2lkZW50YWxcIiByZWxvYWRcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3QgPSAwO1xuICAgICAgICAgICAgdGhpcy5za2lwcGVkID0gdGhpcy5yZW5kZXJlZFF1ZXN0aW9uQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy50aW1lVGFrZW4gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRha2VuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5za2lwcGVkID09PSB0aGlzLnJlbmRlcmVkUXVlc3Rpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGZWVkYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVQcmV2QXNzZXNzbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMucmVuZGVyVGltZWRRdWVzdGlvbigpO1xuICAgICAgICB0aGlzLmRpc3BsYXlTY29yZSgpO1xuICAgICAgICB0aGlzLnNob3dUaW1lKCk7XG4gICAgfVxuICAgIHNldExvY2FsU3RvcmFnZShwYXJzZWREYXRhKSB7XG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgc3RvcmFnZU9iaiA9IHtcbiAgICAgICAgICAgIGFuc3dlcjogcGFyc2VkRGF0YSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGltZVN0YW1wLFxuICAgICAgICB9O1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlS2V5KCksXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShzdG9yYWdlT2JqKVxuICAgICAgICApO1xuICAgIH1cbiAgICBkaXNwbGF5U2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dSZXN1bHRzKSB7XG4gICAgICAgICAgICB2YXIgc2NvcmVTdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIG51bVF1ZXN0aW9ucztcbiAgICAgICAgICAgIHZhciBwZXJjZW50Q29ycmVjdDtcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgc29tZSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdFN0ci5sZW5ndGggPiAwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvcnJlY3RTdHIubGVuZ3RoID4gMCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZFN0ci5sZW5ndGggPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzY29yZVN0cmluZyA9IGBOdW0gQ29ycmVjdDogJHt0aGlzLnNjb3JlfS4gUXVlc3Rpb25zOiAke3RoaXMuY29ycmVjdFN0cn08YnI+TnVtIFdyb25nOiAke3RoaXMuaW5jb3JyZWN0fS4gUXVlc3Rpb25zOiAke3RoaXMuaW5jb3JyZWN0U3RyfTxicj5OdW0gU2tpcHBlZDogJHt0aGlzLnNraXBwZWR9LiBRdWVzdGlvbnM6ICR7dGhpcy5za2lwcGVkU3RyfTxicj5gO1xuICAgICAgICAgICAgICAgIG51bVF1ZXN0aW9ucyA9IHRoaXMuc2NvcmUgKyB0aGlzLmluY29ycmVjdCArIHRoaXMuc2tpcHBlZDtcbiAgICAgICAgICAgICAgICBwZXJjZW50Q29ycmVjdCA9ICh0aGlzLnNjb3JlIC8gbnVtUXVlc3Rpb25zKSAqIDEwMDtcbiAgICAgICAgICAgICAgICBzY29yZVN0cmluZyArPSBcIlBlcmNlbnQgQ29ycmVjdDogXCIgKyBwZXJjZW50Q29ycmVjdCArIFwiJVwiO1xuICAgICAgICAgICAgICAgICQodGhpcy5zY29yZURpdikuaHRtbChzY29yZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29yZVN0cmluZyA9IGBOdW0gQ29ycmVjdDogJHt0aGlzLnNjb3JlfTxicj5OdW0gV3Jvbmc6ICR7dGhpcy5pbmNvcnJlY3R9PGJyPk51bSBTa2lwcGVkOiAke3RoaXMuc2tpcHBlZH08YnI+YDtcbiAgICAgICAgICAgICAgICBudW1RdWVzdGlvbnMgPSB0aGlzLnNjb3JlICsgdGhpcy5pbmNvcnJlY3QgKyB0aGlzLnNraXBwZWQ7XG4gICAgICAgICAgICAgICAgcGVyY2VudENvcnJlY3QgPSAodGhpcy5zY29yZSAvIG51bVF1ZXN0aW9ucykgKiAxMDA7XG4gICAgICAgICAgICAgICAgc2NvcmVTdHJpbmcgKz0gXCJQZXJjZW50IENvcnJlY3Q6IFwiICsgcGVyY2VudENvcnJlY3QgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICAkKHRoaXMuc2NvcmVEaXYpLmh0bWwoc2NvcmVTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0TnVtYmVyZWRMaXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMuc2NvcmVEaXYpLmh0bWwoXG4gICAgICAgICAgICAgICAgXCJUaGFuayB5b3UgZm9yIHRha2luZyB0aGUgZXhhbS4gIFlvdXIgYW5zd2VycyBoYXZlIGJlZW4gcmVjb3JkZWQuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGlnaGxpZ2h0TnVtYmVyZWRMaXN0KCkge1xuICAgICAgICB2YXIgY29ycmVjdENvdW50ID0gdGhpcy5jb3JyZWN0U3RyO1xuICAgICAgICB2YXIgaW5jb3JyZWN0Q291bnQgPSB0aGlzLmluY29ycmVjdFN0cjtcbiAgICAgICAgdmFyIHNraXBwZWRDb3VudCA9IHRoaXMuc2tpcHBlZFN0cjtcbiAgICAgICAgY29ycmVjdENvdW50ID0gY29ycmVjdENvdW50LnJlcGxhY2UoLyAvZywgXCJcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICBpbmNvcnJlY3RDb3VudCA9IGluY29ycmVjdENvdW50LnJlcGxhY2UoLyAvZywgXCJcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICBza2lwcGVkQ291bnQgPSBza2lwcGVkQ291bnQucmVwbGFjZSgvIC9nLCBcIlwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG51bWJlcmVkQnRucyA9ICQoXCJ1bCNwYWdlTnVtcyA+IHVsID4gbGlcIik7XG4gICAgICAgICAgICBpZiAobnVtYmVyZWRCdG5zLmhhc0NsYXNzKFwiYW5zd2VyZWRcIikpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJlZEJ0bnMucmVtb3ZlQ2xhc3MoXCJhbnN3ZXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdENvdW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBwYXJzZUludChjb3JyZWN0Q291bnRbaV0pIC0gMTtcbiAgICAgICAgICAgICAgICBudW1iZXJlZEJ0bnNcbiAgICAgICAgICAgICAgICAgICAgLmVxKHBhcnNlSW50KGNvcnJlY3RDb3VudFtpXSkgLSAxKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJjb3JyZWN0Q291bnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluY29ycmVjdENvdW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyZWRCdG5zXG4gICAgICAgICAgICAgICAgICAgIC5lcShwYXJzZUludChpbmNvcnJlY3RDb3VudFtqXSkgLSAxKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJpbmNvcnJlY3RDb3VudFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgc2tpcHBlZENvdW50Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyZWRCdG5zXG4gICAgICAgICAgICAgICAgICAgIC5lcShwYXJzZUludChza2lwcGVkQ291bnRba10pIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwic2tpcHBlZENvdW50XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPT09IEZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGNvbnN0cnVjdG9ycyBvbiBwYWdlIGxvYWQgPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiQoZG9jdW1lbnQpLmJpbmQoXCJydW5lc3RvbmU6bG9naW4tY29tcGxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICQoXCJbZGF0YS1jb21wb25lbnQ9dGltZWRBc3Nlc3NtZW50XVwiKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBUaW1lZExpc3RbdGhpcy5pZF0gPSBuZXcgVGltZWQoe1xuICAgICAgICAgICAgb3JpZzogdGhpcyxcbiAgICAgICAgICAgIHVzZVJ1bmVzdG9uZVNlcnZpY2VzOiBlQm9va0NvbmZpZy51c2VSdW5lc3RvbmVTZXJ2aWNlcyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==