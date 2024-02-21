"use strict";
(self["webpackChunkWebComponents"] = self["webpackChunkWebComponents"] || []).push([["runestone_groupsub_js_groupsub_js"],{

/***/ 26070:
/*!*********************************************!*\
  !*** ./runestone/groupsub/css/groupsub.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 45280:
/*!*******************************************!*\
  !*** ./runestone/groupsub/js/groupsub.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/js/runestonebase */ 2568);
/* harmony import */ var _css_groupsub_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/groupsub.css */ 26070);
/* harmony import */ var select2_dist_js_select2_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! select2/dist/js/select2.min.js */ 59298);
/* harmony import */ var select2_dist_js_select2_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(select2_dist_js_select2_min_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var select2_dist_css_select2_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! select2/dist/css/select2.css */ 75207);
/*==========================================
=======      Master groupsub.js       ========
============================================
===     This file contains the JS for    ===
===     the Runestone reval component.   ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/12/15               ===
==========================================*/







var pageReveal;

// Define Reveal object
class GroupSub extends _common_js_runestonebase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <div> element that will be replaced by new HTML
        this.origElem = orig;
        this.divid = orig.id;
        self.group = []
        this.limit = this.origElem.dataset.size_limit;

        // Create submit button
        let butt = document.createElement("button");
        butt.type = "button";
        butt.classList.add("btn", "btn-success")
        butt.innerHTML = "Submit Group"
        butt.onclick = this.submitAll.bind(this);
        let container = document.getElementById("groupsub_button")
        container.appendChild(butt);


    }

    async initialize() {
        // get the classlist to populate
        if (eBookConfig.useRunestoneServices) {
            // get classlist from admin/course_students
            let request = new Request("/runestone/admin/course_students", {
                method: "GET",
                headers: this.jsonHeaders,
            });
            try {
                let response = await fetch(request);
                if (!response.ok) {
                    throw new Error("Failed to save the log entry");
                }
                this.studentList = await response.json();
            } catch (e) {
                if (this.isTimed) {
                    alert(`Error: Your action was not saved! The error was ${e}`);
                }
                console.log(`Error: ${e}`);
            }

        } else {
            this.studentList = {
                s1: "User 1",
                s2: "User 2",
                s3: "User 3",
                s4: "User 4",
                s5: "User 5",
            }
        }
        let select = document.getElementById("assignment_group");
        for (let [sid, name] of Object.entries(this.studentList)) {
            let opt = document.createElement("option");
            opt.value = sid;
            opt.innerHTML = this.studentList[sid];
            select.appendChild(opt);
        }
        // Make the select element searchable with multiple selections
        $('.assignment_partner_select').select2({
            placeholder: "Select up to 4 team members",
            allowClear: true,
            maximumSelectionLength: this.limit
        });

    }

    async submitAll() {
        // find all components on the page and submit them for all group members
        let picker = document.getElementById("assignment_group")
        let group = []
        for (let student of picker.selectedOptions) {
            group.push(student.value);
        }
        // If the leader forgets to add themselves, add them here.
        let username = eBookConfig.username;
        if (username && !group.includes(username)) {
            group.push(username)
        }
        if (group.len > this.limit) {
            alert(`You may not have more than ${this.limit} students in a group`);
            return
        }
        this.logBookEvent({
            event: "group_start",
            act: group.join(","),
            div_id: window.location.pathname,
        });
        for (let student of group) {
            for (let question of window.allComponents) {
                try{
                    console.log(`${student} ${question}`)
                    await question.logCurrentAnswer(student)
                } catch(e) {
                    console.log(`failed to submit ${question} : ${e}`)
                }
            }
        }

        this.logBookEvent({
            event: "group_end",
            act: group.join(","),
            div_id: window.location.pathname,
        });
    }

}


$(document).on("runestone:login-complete", async function () {
    let gs = document.querySelectorAll("[data-component=groupsub]");
    if (gs.length > 1) {
        alert("Only one Group Submit is allowed per page")
        return;
    }
    let gsElement = gs[0];
    try {
        var pageReveal = new GroupSub({ orig: gsElement });
        await pageReveal.initialize();
    } catch (err) {
        console.log(`Error rendering GroupSub ${gsElement.id}`);
        console.log(`Details ${err}`);
    }
});



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuZXN0b25lX2dyb3Vwc3ViX2pzX2dyb3Vwc3ViX2pzLmY3M2VlOGVkMWQyYjFkYjEuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRzBEO0FBQzdCO0FBQ1c7QUFDRjs7QUFFdEM7O0FBRUE7QUFDQSx1QkFBdUIsZ0VBQWE7QUFDcEM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSw2RUFBNkUsRUFBRTtBQUMvRTtBQUNBLHNDQUFzQyxFQUFFO0FBQ3hDOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxZQUFZO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUyxFQUFFLFNBQVM7QUFDdkQ7QUFDQSxrQkFBa0I7QUFDbEIsb0RBQW9ELFVBQVUsSUFBSSxFQUFFO0FBQ3BFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpQkFBaUI7QUFDekQ7QUFDQSxNQUFNO0FBQ04sZ0RBQWdELGFBQWE7QUFDN0QsK0JBQStCLElBQUk7QUFDbkM7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2ViQ29tcG9uZW50cy8uL3J1bmVzdG9uZS9ncm91cHN1Yi9jc3MvZ3JvdXBzdWIuY3NzIiwid2VicGFjazovL1dlYkNvbXBvbmVudHMvLi9ydW5lc3RvbmUvZ3JvdXBzdWIvanMvZ3JvdXBzdWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj09PT09PT0gICAgICBNYXN0ZXIgZ3JvdXBzdWIuanMgICAgICAgPT09PT09PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT0gICAgIFRoaXMgZmlsZSBjb250YWlucyB0aGUgSlMgZm9yICAgID09PVxuPT09ICAgICB0aGUgUnVuZXN0b25lIHJldmFsIGNvbXBvbmVudC4gICA9PT1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49PT0gICAgICAgICAgICAgIENyZWF0ZWQgYnkgICAgICAgICAgICAgID09PVxuPT09ICAgICAgICAgICBJc2FpYWggTWF5ZXJjaGFrICAgICAgICAgICA9PT1cbj09PSAgICAgICAgICAgICAgIDA2LzEyLzE1ICAgICAgICAgICAgICAgPT09XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbmltcG9ydCBSdW5lc3RvbmVCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vanMvcnVuZXN0b25lYmFzZVwiO1xuaW1wb3J0IFwiLi4vY3NzL2dyb3Vwc3ViLmNzc1wiO1xuaW1wb3J0IFwic2VsZWN0Mi9kaXN0L2pzL3NlbGVjdDIubWluLmpzXCI7XG5pbXBvcnQgXCJzZWxlY3QyL2Rpc3QvY3NzL3NlbGVjdDIuY3NzXCI7XG5cbnZhciBwYWdlUmV2ZWFsO1xuXG4vLyBEZWZpbmUgUmV2ZWFsIG9iamVjdFxuY2xhc3MgR3JvdXBTdWIgZXh0ZW5kcyBSdW5lc3RvbmVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB2YXIgb3JpZyA9IG9wdHMub3JpZzsgLy8gZW50aXJlIDxkaXY+IGVsZW1lbnQgdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGJ5IG5ldyBIVE1MXG4gICAgICAgIHRoaXMub3JpZ0VsZW0gPSBvcmlnO1xuICAgICAgICB0aGlzLmRpdmlkID0gb3JpZy5pZDtcbiAgICAgICAgc2VsZi5ncm91cCA9IFtdXG4gICAgICAgIHRoaXMubGltaXQgPSB0aGlzLm9yaWdFbGVtLmRhdGFzZXQuc2l6ZV9saW1pdDtcblxuICAgICAgICAvLyBDcmVhdGUgc3VibWl0IGJ1dHRvblxuICAgICAgICBsZXQgYnV0dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGJ1dHQudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ1dHQuY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1zdWNjZXNzXCIpXG4gICAgICAgIGJ1dHQuaW5uZXJIVE1MID0gXCJTdWJtaXQgR3JvdXBcIlxuICAgICAgICBidXR0Lm9uY2xpY2sgPSB0aGlzLnN1Ym1pdEFsbC5iaW5kKHRoaXMpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cHN1Yl9idXR0b25cIilcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHQpO1xuXG5cbiAgICB9XG5cbiAgICBhc3luYyBpbml0aWFsaXplKCkge1xuICAgICAgICAvLyBnZXQgdGhlIGNsYXNzbGlzdCB0byBwb3B1bGF0ZVxuICAgICAgICBpZiAoZUJvb2tDb25maWcudXNlUnVuZXN0b25lU2VydmljZXMpIHtcbiAgICAgICAgICAgIC8vIGdldCBjbGFzc2xpc3QgZnJvbSBhZG1pbi9jb3Vyc2Vfc3R1ZGVudHNcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoXCIvcnVuZXN0b25lL2FkbWluL2NvdXJzZV9zdHVkZW50c1wiLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuanNvbkhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gc2F2ZSB0aGUgbG9nIGVudHJ5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRMaXN0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVGltZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoYEVycm9yOiBZb3VyIGFjdGlvbiB3YXMgbm90IHNhdmVkISBUaGUgZXJyb3Igd2FzICR7ZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEVycm9yOiAke2V9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSB7XG4gICAgICAgICAgICAgICAgczE6IFwiVXNlciAxXCIsXG4gICAgICAgICAgICAgICAgczI6IFwiVXNlciAyXCIsXG4gICAgICAgICAgICAgICAgczM6IFwiVXNlciAzXCIsXG4gICAgICAgICAgICAgICAgczQ6IFwiVXNlciA0XCIsXG4gICAgICAgICAgICAgICAgczU6IFwiVXNlciA1XCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXNzaWdubWVudF9ncm91cFwiKTtcbiAgICAgICAgZm9yIChsZXQgW3NpZCwgbmFtZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5zdHVkZW50TGlzdCkpIHtcbiAgICAgICAgICAgIGxldCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgb3B0LnZhbHVlID0gc2lkO1xuICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IHRoaXMuc3R1ZGVudExpc3Rbc2lkXTtcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2UgdGhlIHNlbGVjdCBlbGVtZW50IHNlYXJjaGFibGUgd2l0aCBtdWx0aXBsZSBzZWxlY3Rpb25zXG4gICAgICAgICQoJy5hc3NpZ25tZW50X3BhcnRuZXJfc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJTZWxlY3QgdXAgdG8gNCB0ZWFtIG1lbWJlcnNcIixcbiAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWUsXG4gICAgICAgICAgICBtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoOiB0aGlzLmxpbWl0XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgc3VibWl0QWxsKCkge1xuICAgICAgICAvLyBmaW5kIGFsbCBjb21wb25lbnRzIG9uIHRoZSBwYWdlIGFuZCBzdWJtaXQgdGhlbSBmb3IgYWxsIGdyb3VwIG1lbWJlcnNcbiAgICAgICAgbGV0IHBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXNzaWdubWVudF9ncm91cFwiKVxuICAgICAgICBsZXQgZ3JvdXAgPSBbXVxuICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHBpY2tlci5zZWxlY3RlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGdyb3VwLnB1c2goc3R1ZGVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGxlYWRlciBmb3JnZXRzIHRvIGFkZCB0aGVtc2VsdmVzLCBhZGQgdGhlbSBoZXJlLlxuICAgICAgICBsZXQgdXNlcm5hbWUgPSBlQm9va0NvbmZpZy51c2VybmFtZTtcbiAgICAgICAgaWYgKHVzZXJuYW1lICYmICFncm91cC5pbmNsdWRlcyh1c2VybmFtZSkpIHtcbiAgICAgICAgICAgIGdyb3VwLnB1c2godXNlcm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwLmxlbiA+IHRoaXMubGltaXQpIHtcbiAgICAgICAgICAgIGFsZXJ0KGBZb3UgbWF5IG5vdCBoYXZlIG1vcmUgdGhhbiAke3RoaXMubGltaXR9IHN0dWRlbnRzIGluIGEgZ3JvdXBgKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nQm9va0V2ZW50KHtcbiAgICAgICAgICAgIGV2ZW50OiBcImdyb3VwX3N0YXJ0XCIsXG4gICAgICAgICAgICBhY3Q6IGdyb3VwLmpvaW4oXCIsXCIpLFxuICAgICAgICAgICAgZGl2X2lkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIGdyb3VwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBxdWVzdGlvbiBvZiB3aW5kb3cuYWxsQ29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7c3R1ZGVudH0gJHtxdWVzdGlvbn1gKVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBxdWVzdGlvbi5sb2dDdXJyZW50QW5zd2VyKHN0dWRlbnQpXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBmYWlsZWQgdG8gc3VibWl0ICR7cXVlc3Rpb259IDogJHtlfWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dCb29rRXZlbnQoe1xuICAgICAgICAgICAgZXZlbnQ6IFwiZ3JvdXBfZW5kXCIsXG4gICAgICAgICAgICBhY3Q6IGdyb3VwLmpvaW4oXCIsXCIpLFxuICAgICAgICAgICAgZGl2X2lkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cbiQoZG9jdW1lbnQpLm9uKFwicnVuZXN0b25lOmxvZ2luLWNvbXBsZXRlXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtY29tcG9uZW50PWdyb3Vwc3ViXVwiKTtcbiAgICBpZiAoZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICBhbGVydChcIk9ubHkgb25lIEdyb3VwIFN1Ym1pdCBpcyBhbGxvd2VkIHBlciBwYWdlXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGdzRWxlbWVudCA9IGdzWzBdO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBwYWdlUmV2ZWFsID0gbmV3IEdyb3VwU3ViKHsgb3JpZzogZ3NFbGVtZW50IH0pO1xuICAgICAgICBhd2FpdCBwYWdlUmV2ZWFsLmluaXRpYWxpemUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIHJlbmRlcmluZyBHcm91cFN1YiAke2dzRWxlbWVudC5pZH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coYERldGFpbHMgJHtlcnJ9YCk7XG4gICAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==