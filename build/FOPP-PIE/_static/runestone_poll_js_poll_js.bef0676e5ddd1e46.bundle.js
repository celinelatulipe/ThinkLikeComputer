"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_poll_js_poll_js"],{

/***/ 55475:
/*!*************************************!*\
  !*** ./runestone/poll/css/poll.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 37350:
/*!***********************************!*\
  !*** ./runestone/poll/js/poll.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pollList": () => (/* binding */ pollList),
/* harmony export */   "default": () => (/* binding */ Poll)
/* harmony export */ });
/* harmony import */ var _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase */ 2568);
/* harmony import */ var _css_poll_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/poll.css */ 55475);
/*
__author__ = Kirby Olson
__date__ = 6/12/2015  */





var pollList = {};

class Poll extends _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; //entire <p> element
        this.origElem = orig;
        this.divid = orig.id;
        this.children = this.origElem.childNodes;
        this.optionList = [];
        this.optsArray = [];
        this.comment = false;
        if ($(this.origElem).is("[data-comment]")) {
            this.comment = true;
        }
        this.resultsViewer = $(orig).data("results");
        this.getQuestionText();
        this.getOptionText(); //populates optionList
        this.renderPoll(); //generates HTML
        // Checks localStorage to see if this poll has already been completed by this user.
        this.checkPollStorage();
        this.caption = "Poll";
        this.addCaption("runestone");
    }
    getQuestionText() {
        //finds the text inside the parent tag, but before the first <li> tag and sets it as the question
        var _this = this;
        var firstAnswer;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tagName == "LI") {
                firstAnswer = _this.children[i];
                break;
            }
        }
        var delimiter = firstAnswer.outerHTML;
        var fulltext = $(this.origElem).html();
        var temp = fulltext.split(delimiter);
        this.question = temp[0];
    }
    getOptionText() {
        //Gets the text from each <li> tag and places it in this.optionList
        var _this = this;
        for (var i = 0; i < this.children.length; i++) {
            if (_this.children[i].tagName == "LI") {
                _this.optionList.push($(_this.children[i]).text());
            }
        }
    }
    renderPoll() {
        //generates the HTML that the user interacts with
        var _this = this;
        this.containerDiv = document.createElement("div");
        this.pollForm = document.createElement("form");
        this.resultsDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
        $(this.pollForm).html(
            `<span style='font-size: Large'>${this.question}</span>`
        );
        $(this.pollForm).attr({
            id: this.divid + "_form",
            method: "get",
            action: "",
            onsubmit: "return false;",
        });
        this.pollForm.appendChild(document.createElement("br"));
        for (var i = 0; i < this.optionList.length; i++) {
            var radio = document.createElement("input");
            var tmpid = _this.divid + "_opt_" + i;
            $(radio).attr({
                id: tmpid,
                name: this.divid + "_group1",
                type: "radio",
                value: i,
            });
            $(radio).click(this.submitPoll.bind(this));
            var label = document.createElement("label");
            $(label).attr("for", tmpid);
            $(label).text(this.optionList[i]);
            this.pollForm.appendChild(radio);
            this.optsArray.push(radio);
            this.pollForm.appendChild(label);
            this.pollForm.appendChild(document.createElement("br"));
        }
        if (this.comment) {
            this.renderTextField();
        }
        this.resultsDiv.id = this.divid + "_results";
        this.containerDiv.appendChild(this.pollForm);
        this.containerDiv.appendChild(this.resultsDiv);
        $(this.origElem).replaceWith(this.containerDiv);
    }
    renderTextField() {
        this.textfield = document.createElement("input");
        this.textfield.type = "text";
        $(this.textfield).addClass("form-control");
        this.textfield.style.width = "300px";
        this.textfield.name = this.divid + "_comment";
        this.textfield.placeholder = "Any comments?";
        this.pollForm.appendChild(this.textfield);
        this.pollForm.appendChild(document.createElement("br"));
    }
    submitPoll() {
        //checks the poll, sets localstorage and submits to the server
        var poll_val = null;
        for (var i = 0; i < this.optsArray.length; i++) {
            if (this.optsArray[i].checked) {
                poll_val = this.optsArray[i].value;
                break;
            }
        }
        if (poll_val === null) return;
        var comment_val = "";
        if (this.comment) {
            comment_val = this.textfield.value;
        }
        var act = "";
        if (comment_val !== "") {
            act = poll_val + ":" + comment_val;
        } else {
            act = poll_val;
        }
        var eventInfo = { event: "poll", act: act, div_id: this.divid };
        // log the response to the database
        this.logBookEvent(eventInfo); // in bookfuncs.js
        // log the fact that the user has answered the poll to local storage
        localStorage.setItem(this.divid, "true");
        if (!document.getElementById(`${this.divid}_sent`)) {
            $(this.pollForm).append(
                `<span id=${this.divid}_sent><strong>Thanks, your response has been recorded</strong></span>`
            );
        } else {
            $(`#${this.divid}_sent`).html(
                "<strong>Only Your last reponse is recorded</strong>"
            );
        }
        // show the results of the poll
        if (this.resultsViewer === "all") {
            var data = {};
            data.div_id = this.divid;
            data.course = eBookConfig.course;
            jQuery.get(
                `${eBookConfig.new_server_prefix}/assessment/getpollresults`,
                data,
                this.showPollResults
            );
        }
    }
    showPollResults(results) {
        //displays the results returned by the server
        results = results.detail;
        var total = results["total"];
        var optCounts = results["opt_counts"]
        var div_id = results["div_id"];
        var my_vote = results["my_vote"];
        // restore current users vote
        if (my_vote > -1) {
            this.optsArray[my_vote].checked = "checked";
        }
        // show results summary if appropriate
        if (
            (this.resultsViewer === "all" &&
                localStorage.getItem(this.divid === "true")) ||
            eBookConfig.isInstructor
        ) {
            $(this.resultsDiv).html(
                `<b>Results:</b> ${total} responses <br><br>`
            );
            var list = $(document.createElement("div"));
            $(list).addClass("results-container");
            for (var i = 0; i < this.optionList.length; i++) {
                var count;
                var percent;
                if (optCounts[i] > 0) {
                    count = optCounts[i]
                    percent = (count / total) * 100;
                } else {
                    count = 0;
                    percent = 0;
                }
                var text = count + " (" + Math.round(10 * percent) / 10 + "%)"; // round percent to 10ths
                var html;
                if (percent > 10) {
                    html =
                        `<div class="progresscounter">${i + 1}. </div>` +
                        "<div class='progress'>" +
                        "<div class='progress-bar progress-bar-success'" +
                        `style="width: ${percent}%; min-width: 2em;">` +
                        "<span class='poll-text'>" +
                        text +
                        "</span></div></div>";
                } else {
                    html =
                        `<div class="progresscounter">${i + 1}. </div>` +
                        "<div class='progress'>" +
                        "<div class='progress-bar progress-bar-success'" +
                        `style="width: ${percent}%; min-width: 2em;"></div>` +
                        "<span class='poll-text' style='margin: 0 0 0 10px;'>" +
                        text +
                        "</span></div>";
                }
                var el = $(html);
                list.append(el);
            }
            $(this.resultsDiv).append(list);
        }
        this.indicate_component_ready();
    }
    disableOptions() { }
    checkPollStorage() {
        //checks the localstorage to see if the poll has been completed already
        var _this = this;
        var len = localStorage.length;
        if (len > 0) {
            //If the poll has already been completed, show the results
            var data = {};
            data.div_id = this.divid;
            data.course = eBookConfig.course;
            jQuery.get(
                `${eBookConfig.new_server_prefix}/assessment/getpollresults`,
                data,
                this.showPollResults.bind(this)
            ).fail(this.indicate_component_ready.bind(this));
        } else {
            this.indicate_component_ready();
        }
    }
}

// Do not render poll data until login-complete event so we know instructor status
$(document).bind("runestone:login-complete", function () {
    $("[data-component=poll]").each(function (index) {
        try {
            pollList[this.id] = new Poll({ orig: this });
        } catch (err) {
            console.log(`Error rendering Poll Problem ${this.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    });
});

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory.poll = function (opts) {
    return new Poll(opts);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX3BvbGxfanNfcG9sbF9qcy5iZWYwNjc2ZTVkZGQxZTQ2LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNhOztBQUU2QztBQUNqQzs7QUFFbEI7O0FBRVEsbUJBQW1CLGdFQUFhO0FBQy9DO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsU0FBUztBQUNUO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQSxVQUFVO0FBQ1Ysa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDhCQUE4QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRCQUE0QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsTUFBTTtBQUM5RDtBQUNBO0FBQ0EseUNBQXlDLFFBQVEsR0FBRyxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLHdEQUF3RCxNQUFNO0FBQzlEO0FBQ0E7QUFDQSx5Q0FBeUMsUUFBUSxHQUFHLGVBQWU7QUFDbkUsMkVBQTJFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw4QkFBOEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFlBQVk7QUFDdkQsVUFBVTtBQUNWLHdEQUF3RDtBQUN4RCxvQ0FBb0MsSUFBSTtBQUN4QztBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9wb2xsL2Nzcy9wb2xsLmNzcz84Y2E4Iiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvcG9sbC9qcy9wb2xsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qXG5fX2F1dGhvcl9fID0gS2lyYnkgT2xzb25cbl9fZGF0ZV9fID0gNi8xMi8yMDE1ICAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBSdW5lc3RvbmVCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vanMvcnVuZXN0b25lYmFzZVwiO1xuaW1wb3J0IFwiLi4vY3NzL3BvbGwuY3NzXCI7XG5cbmV4cG9ydCB2YXIgcG9sbExpc3QgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sbCBleHRlbmRzIFJ1bmVzdG9uZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHZhciBvcmlnID0gb3B0cy5vcmlnOyAvL2VudGlyZSA8cD4gZWxlbWVudFxuICAgICAgICB0aGlzLm9yaWdFbGVtID0gb3JpZztcbiAgICAgICAgdGhpcy5kaXZpZCA9IG9yaWcuaWQ7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLm9yaWdFbGVtLmNoaWxkTm9kZXM7XG4gICAgICAgIHRoaXMub3B0aW9uTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLm9wdHNBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCQodGhpcy5vcmlnRWxlbSkuaXMoXCJbZGF0YS1jb21tZW50XVwiKSkge1xuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3VsdHNWaWV3ZXIgPSAkKG9yaWcpLmRhdGEoXCJyZXN1bHRzXCIpO1xuICAgICAgICB0aGlzLmdldFF1ZXN0aW9uVGV4dCgpO1xuICAgICAgICB0aGlzLmdldE9wdGlvblRleHQoKTsgLy9wb3B1bGF0ZXMgb3B0aW9uTGlzdFxuICAgICAgICB0aGlzLnJlbmRlclBvbGwoKTsgLy9nZW5lcmF0ZXMgSFRNTFxuICAgICAgICAvLyBDaGVja3MgbG9jYWxTdG9yYWdlIHRvIHNlZSBpZiB0aGlzIHBvbGwgaGFzIGFscmVhZHkgYmVlbiBjb21wbGV0ZWQgYnkgdGhpcyB1c2VyLlxuICAgICAgICB0aGlzLmNoZWNrUG9sbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gXCJQb2xsXCI7XG4gICAgICAgIHRoaXMuYWRkQ2FwdGlvbihcInJ1bmVzdG9uZVwiKTtcbiAgICB9XG4gICAgZ2V0UXVlc3Rpb25UZXh0KCkge1xuICAgICAgICAvL2ZpbmRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgcGFyZW50IHRhZywgYnV0IGJlZm9yZSB0aGUgZmlyc3QgPGxpPiB0YWcgYW5kIHNldHMgaXQgYXMgdGhlIHF1ZXN0aW9uXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBmaXJzdEFuc3dlcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpXS50YWdOYW1lID09IFwiTElcIikge1xuICAgICAgICAgICAgICAgIGZpcnN0QW5zd2VyID0gX3RoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGltaXRlciA9IGZpcnN0QW5zd2VyLm91dGVySFRNTDtcbiAgICAgICAgdmFyIGZ1bGx0ZXh0ID0gJCh0aGlzLm9yaWdFbGVtKS5odG1sKCk7XG4gICAgICAgIHZhciB0ZW1wID0gZnVsbHRleHQuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHRlbXBbMF07XG4gICAgfVxuICAgIGdldE9wdGlvblRleHQoKSB7XG4gICAgICAgIC8vR2V0cyB0aGUgdGV4dCBmcm9tIGVhY2ggPGxpPiB0YWcgYW5kIHBsYWNlcyBpdCBpbiB0aGlzLm9wdGlvbkxpc3RcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuY2hpbGRyZW5baV0udGFnTmFtZSA9PSBcIkxJXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25MaXN0LnB1c2goJChfdGhpcy5jaGlsZHJlbltpXSkudGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQb2xsKCkge1xuICAgICAgICAvL2dlbmVyYXRlcyB0aGUgSFRNTCB0aGF0IHRoZSB1c2VyIGludGVyYWN0cyB3aXRoXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5wb2xsRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLnJlc3VsdHNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5pZCA9IHRoaXMuZGl2aWQ7XG4gICAgICAgICQodGhpcy5jb250YWluZXJEaXYpLmFkZENsYXNzKHRoaXMub3JpZ0VsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpO1xuICAgICAgICAkKHRoaXMucG9sbEZvcm0pLmh0bWwoXG4gICAgICAgICAgICBgPHNwYW4gc3R5bGU9J2ZvbnQtc2l6ZTogTGFyZ2UnPiR7dGhpcy5xdWVzdGlvbn08L3NwYW4+YFxuICAgICAgICApO1xuICAgICAgICAkKHRoaXMucG9sbEZvcm0pLmF0dHIoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuZGl2aWQgKyBcIl9mb3JtXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiZ2V0XCIsXG4gICAgICAgICAgICBhY3Rpb246IFwiXCIsXG4gICAgICAgICAgICBvbnN1Ym1pdDogXCJyZXR1cm4gZmFsc2U7XCIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICB2YXIgdG1waWQgPSBfdGhpcy5kaXZpZCArIFwiX29wdF9cIiArIGk7XG4gICAgICAgICAgICAkKHJhZGlvKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBpZDogdG1waWQsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5kaXZpZCArIFwiX2dyb3VwMVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChyYWRpbykuY2xpY2sodGhpcy5zdWJtaXRQb2xsLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgICAgJChsYWJlbCkuYXR0cihcImZvclwiLCB0bXBpZCk7XG4gICAgICAgICAgICAkKGxhYmVsKS50ZXh0KHRoaXMub3B0aW9uTGlzdFtpXSk7XG4gICAgICAgICAgICB0aGlzLnBvbGxGb3JtLmFwcGVuZENoaWxkKHJhZGlvKTtcbiAgICAgICAgICAgIHRoaXMub3B0c0FycmF5LnB1c2gocmFkaW8pO1xuICAgICAgICAgICAgdGhpcy5wb2xsRm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgICAgICB0aGlzLnBvbGxGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29tbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUZXh0RmllbGQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3VsdHNEaXYuaWQgPSB0aGlzLmRpdmlkICsgXCJfcmVzdWx0c1wiO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aGlzLnBvbGxGb3JtKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGhpcy5yZXN1bHRzRGl2KTtcbiAgICAgICAgJCh0aGlzLm9yaWdFbGVtKS5yZXBsYWNlV2l0aCh0aGlzLmNvbnRhaW5lckRpdik7XG4gICAgfVxuICAgIHJlbmRlclRleHRGaWVsZCgpIHtcbiAgICAgICAgdGhpcy50ZXh0ZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHRoaXMudGV4dGZpZWxkLnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgJCh0aGlzLnRleHRmaWVsZCkuYWRkQ2xhc3MoXCJmb3JtLWNvbnRyb2xcIik7XG4gICAgICAgIHRoaXMudGV4dGZpZWxkLnN0eWxlLndpZHRoID0gXCIzMDBweFwiO1xuICAgICAgICB0aGlzLnRleHRmaWVsZC5uYW1lID0gdGhpcy5kaXZpZCArIFwiX2NvbW1lbnRcIjtcbiAgICAgICAgdGhpcy50ZXh0ZmllbGQucGxhY2Vob2xkZXIgPSBcIkFueSBjb21tZW50cz9cIjtcbiAgICAgICAgdGhpcy5wb2xsRm9ybS5hcHBlbmRDaGlsZCh0aGlzLnRleHRmaWVsZCk7XG4gICAgICAgIHRoaXMucG9sbEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICB9XG4gICAgc3VibWl0UG9sbCgpIHtcbiAgICAgICAgLy9jaGVja3MgdGhlIHBvbGwsIHNldHMgbG9jYWxzdG9yYWdlIGFuZCBzdWJtaXRzIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgdmFyIHBvbGxfdmFsID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0c0FycmF5W2ldLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBwb2xsX3ZhbCA9IHRoaXMub3B0c0FycmF5W2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwb2xsX3ZhbCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB2YXIgY29tbWVudF92YWwgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy5jb21tZW50KSB7XG4gICAgICAgICAgICBjb21tZW50X3ZhbCA9IHRoaXMudGV4dGZpZWxkLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhY3QgPSBcIlwiO1xuICAgICAgICBpZiAoY29tbWVudF92YWwgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGFjdCA9IHBvbGxfdmFsICsgXCI6XCIgKyBjb21tZW50X3ZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdCA9IHBvbGxfdmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmVudEluZm8gPSB7IGV2ZW50OiBcInBvbGxcIiwgYWN0OiBhY3QsIGRpdl9pZDogdGhpcy5kaXZpZCB9O1xuICAgICAgICAvLyBsb2cgdGhlIHJlc3BvbnNlIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLmxvZ0Jvb2tFdmVudChldmVudEluZm8pOyAvLyBpbiBib29rZnVuY3MuanNcbiAgICAgICAgLy8gbG9nIHRoZSBmYWN0IHRoYXQgdGhlIHVzZXIgaGFzIGFuc3dlcmVkIHRoZSBwb2xsIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5kaXZpZCwgXCJ0cnVlXCIpO1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMuZGl2aWR9X3NlbnRgKSkge1xuICAgICAgICAgICAgJCh0aGlzLnBvbGxGb3JtKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgYDxzcGFuIGlkPSR7dGhpcy5kaXZpZH1fc2VudD48c3Ryb25nPlRoYW5rcywgeW91ciByZXNwb25zZSBoYXMgYmVlbiByZWNvcmRlZDwvc3Ryb25nPjwvc3Bhbj5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChgIyR7dGhpcy5kaXZpZH1fc2VudGApLmh0bWwoXG4gICAgICAgICAgICAgICAgXCI8c3Ryb25nPk9ubHkgWW91ciBsYXN0IHJlcG9uc2UgaXMgcmVjb3JkZWQ8L3N0cm9uZz5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaG93IHRoZSByZXN1bHRzIG9mIHRoZSBwb2xsXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdHNWaWV3ZXIgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgICAgICBkYXRhLmRpdl9pZCA9IHRoaXMuZGl2aWQ7XG4gICAgICAgICAgICBkYXRhLmNvdXJzZSA9IGVCb29rQ29uZmlnLmNvdXJzZTtcbiAgICAgICAgICAgIGpRdWVyeS5nZXQoXG4gICAgICAgICAgICAgICAgYCR7ZUJvb2tDb25maWcubmV3X3NlcnZlcl9wcmVmaXh9L2Fzc2Vzc21lbnQvZ2V0cG9sbHJlc3VsdHNgLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UG9sbFJlc3VsdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd1BvbGxSZXN1bHRzKHJlc3VsdHMpIHtcbiAgICAgICAgLy9kaXNwbGF5cyB0aGUgcmVzdWx0cyByZXR1cm5lZCBieSB0aGUgc2VydmVyXG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmRldGFpbDtcbiAgICAgICAgdmFyIHRvdGFsID0gcmVzdWx0c1tcInRvdGFsXCJdO1xuICAgICAgICB2YXIgb3B0Q291bnRzID0gcmVzdWx0c1tcIm9wdF9jb3VudHNcIl1cbiAgICAgICAgdmFyIGRpdl9pZCA9IHJlc3VsdHNbXCJkaXZfaWRcIl07XG4gICAgICAgIHZhciBteV92b3RlID0gcmVzdWx0c1tcIm15X3ZvdGVcIl07XG4gICAgICAgIC8vIHJlc3RvcmUgY3VycmVudCB1c2VycyB2b3RlXG4gICAgICAgIGlmIChteV92b3RlID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub3B0c0FycmF5W215X3ZvdGVdLmNoZWNrZWQgPSBcImNoZWNrZWRcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaG93IHJlc3VsdHMgc3VtbWFyeSBpZiBhcHByb3ByaWF0ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodGhpcy5yZXN1bHRzVmlld2VyID09PSBcImFsbFwiICYmXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5kaXZpZCA9PT0gXCJ0cnVlXCIpKSB8fFxuICAgICAgICAgICAgZUJvb2tDb25maWcuaXNJbnN0cnVjdG9yXG4gICAgICAgICkge1xuICAgICAgICAgICAgJCh0aGlzLnJlc3VsdHNEaXYpLmh0bWwoXG4gICAgICAgICAgICAgICAgYDxiPlJlc3VsdHM6PC9iPiAke3RvdGFsfSByZXNwb25zZXMgPGJyPjxicj5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdmFyIGxpc3QgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgJChsaXN0KS5hZGRDbGFzcyhcInJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQ7XG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdENvdW50c1tpXSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBvcHRDb3VudHNbaV1cbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IChjb3VudCAvIHRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGNvdW50ICsgXCIgKFwiICsgTWF0aC5yb3VuZCgxMCAqIHBlcmNlbnQpIC8gMTAgKyBcIiUpXCI7IC8vIHJvdW5kIHBlcmNlbnQgdG8gMTB0aHNcbiAgICAgICAgICAgICAgICB2YXIgaHRtbDtcbiAgICAgICAgICAgICAgICBpZiAocGVyY2VudCA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJwcm9ncmVzc2NvdW50ZXJcIj4ke2kgKyAxfS4gPC9kaXY+YCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3Byb2dyZXNzJz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2VzcydcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBgc3R5bGU9XCJ3aWR0aDogJHtwZXJjZW50fSU7IG1pbi13aWR0aDogMmVtO1wiPmAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0ncG9sbC10ZXh0Jz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPjwvZGl2PjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJwcm9ncmVzc2NvdW50ZXJcIj4ke2kgKyAxfS4gPC9kaXY+YCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3Byb2dyZXNzJz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2VzcydcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBgc3R5bGU9XCJ3aWR0aDogJHtwZXJjZW50fSU7IG1pbi13aWR0aDogMmVtO1wiPjwvZGl2PmAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0ncG9sbC10ZXh0JyBzdHlsZT0nbWFyZ2luOiAwIDAgMCAxMHB4Oyc+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj48L2Rpdj5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gJChodG1sKTtcbiAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHRoaXMucmVzdWx0c0RpdikuYXBwZW5kKGxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5kaWNhdGVfY29tcG9uZW50X3JlYWR5KCk7XG4gICAgfVxuICAgIGRpc2FibGVPcHRpb25zKCkgeyB9XG4gICAgY2hlY2tQb2xsU3RvcmFnZSgpIHtcbiAgICAgICAgLy9jaGVja3MgdGhlIGxvY2Fsc3RvcmFnZSB0byBzZWUgaWYgdGhlIHBvbGwgaGFzIGJlZW4gY29tcGxldGVkIGFscmVhZHlcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxlbiA9IGxvY2FsU3RvcmFnZS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICAvL0lmIHRoZSBwb2xsIGhhcyBhbHJlYWR5IGJlZW4gY29tcGxldGVkLCBzaG93IHRoZSByZXN1bHRzXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICAgICAgZGF0YS5kaXZfaWQgPSB0aGlzLmRpdmlkO1xuICAgICAgICAgICAgZGF0YS5jb3Vyc2UgPSBlQm9va0NvbmZpZy5jb3Vyc2U7XG4gICAgICAgICAgICBqUXVlcnkuZ2V0KFxuICAgICAgICAgICAgICAgIGAke2VCb29rQ29uZmlnLm5ld19zZXJ2ZXJfcHJlZml4fS9hc3Nlc3NtZW50L2dldHBvbGxyZXN1bHRzYCxcbiAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvbGxSZXN1bHRzLmJpbmQodGhpcylcbiAgICAgICAgICAgICkuZmFpbCh0aGlzLmluZGljYXRlX2NvbXBvbmVudF9yZWFkeS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdGVfY29tcG9uZW50X3JlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIERvIG5vdCByZW5kZXIgcG9sbCBkYXRhIHVudGlsIGxvZ2luLWNvbXBsZXRlIGV2ZW50IHNvIHdlIGtub3cgaW5zdHJ1Y3RvciBzdGF0dXNcbiQoZG9jdW1lbnQpLmJpbmQoXCJydW5lc3RvbmU6bG9naW4tY29tcGxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICQoXCJbZGF0YS1jb21wb25lbnQ9cG9sbF1cIikuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBvbGxMaXN0W3RoaXMuaWRdID0gbmV3IFBvbGwoeyBvcmlnOiB0aGlzIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciByZW5kZXJpbmcgUG9sbCBQcm9ibGVtICR7dGhpcy5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICBEZXRhaWxzOiAke2Vycn1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5pZiAodHlwZW9mIHdpbmRvdy5jb21wb25lbnRfZmFjdG9yeSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5jb21wb25lbnRfZmFjdG9yeSA9IHt9O1xufVxud2luZG93LmNvbXBvbmVudF9mYWN0b3J5LnBvbGwgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIHJldHVybiBuZXcgUG9sbChvcHRzKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=