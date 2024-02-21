(self.webpackChunkWebComponents=self.webpackChunkWebComponents||[]).push([[526,990,536,444,106,146,152,254,382],{86151:()=>{$.i18n().load({en:{msg_no_answer:"No answer provided.",msg_fitb_check_me:"Check me",msg_fitb_compare_me:"Compare me"}})},61353:()=>{$.i18n().load({"pt-br":{msg_no_answer:"Nenhuma resposta dada.",msg_fitb_check_me:"Verificar",msg_fitb_compare_me:"Comparar"}})},23106:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});var s=i(2568);i(86151),i(61353);class n extends s.Z{constructor(e){super(e);var t=e.orig;this.useRunestoneServices=e.useRunestoneServices,this.origElem=t,this.divid=t.id,this.correct=null,this.feedbackArray=JSON.parse(this.scriptSelector(this.origElem).html()),this.createFITBElement(),this.caption="Fill in the Blank",this.addCaption("runestone"),this.checkServer("fillb",!0),"undefined"!=typeof Prism&&Prism.highlightAllUnder(this.containerDiv)}scriptSelector(e){return $(e).find('script[type="application/json"]')}createFITBElement(){this.renderFITBInput(),this.renderFITBButtons(),this.renderFITBFeedbackDiv(),$(this.origElem).replaceWith(this.containerDiv)}renderFITBInput(){this.containerDiv=document.createElement("div"),this.containerDiv.id=this.divid,$(this.origElem).children().clone().appendTo(this.containerDiv),this.scriptSelector(this.containerDiv).remove();let e=$(this.containerDiv).find(":input");e.attr("class","form form-control selectwidthauto"),e.attr("aria-label","input area"),this.blankArray=e.toArray();for(let e of this.blankArray)$(e).change(this.recordAnswered.bind(this))}recordAnswered(){this.isAnswered=!0}renderFITBButtons(){this.submitButton=document.createElement("button"),this.submitButton.textContent=$.i18n("msg_fitb_check_me"),$(this.submitButton).attr({class:"btn btn-success",name:"do answer",type:"button"}),this.submitButton.addEventListener("click",function(){this.checkCurrentAnswer(),this.logCurrentAnswer()}.bind(this),!1),this.containerDiv.appendChild(document.createElement("br")),this.containerDiv.appendChild(document.createElement("br")),this.containerDiv.appendChild(this.submitButton),this.useRunestoneServices&&(this.compareButton=document.createElement("button"),$(this.compareButton).attr({class:"btn btn-default",id:this.origElem.id+"_bcomp",disabled:"",name:"compare"}),this.compareButton.textContent=$.i18n("msg_fitb_compare_me"),this.compareButton.addEventListener("click",function(){this.compareFITBAnswers()}.bind(this),!1),this.containerDiv.appendChild(this.compareButton)),this.containerDiv.appendChild(document.createElement("div"))}renderFITBFeedbackDiv(){this.feedBackDiv=document.createElement("div"),this.feedBackDiv.id=this.divid+"_feedback",this.containerDiv.appendChild(document.createElement("br")),this.containerDiv.appendChild(this.feedBackDiv)}restoreAnswers(e){var t;try{if(t=JSON.parse(e.answer),!Array.isArray(t))throw new Error}catch(i){t=e.answer.split(",")}for(var i=0;i<this.blankArray.length;i++)$(this.blankArray[i]).attr("value",t[i]);this.feedbackArray?this.checkCurrentAnswer():(this.displayFeed=e.displayFeed,this.correct=e.correct,this.isCorrectArray=e.isCorrectArray,void 0!==this.displayFeed&&void 0!==this.correct&&void 0!==this.isCorrectArray&&this.renderFeedback())}checkLocalStorage(){var e;if(!this.graderactive&&localStorage.length>0){var t=localStorage.getItem(this.localStorageKey());if(null!==t){try{(e=JSON.parse(t)).answer}catch(e){return console.log(e.message),void localStorage.removeItem(this.localStorageKey())}this.restoreAnswers(e)}}}setLocalStorage(e){let t=this.localStorageKey();localStorage.setItem(t,JSON.stringify(e))}checkCurrentAnswer(){this.isCorrectArray=[],this.displayFeed=[],this.given_arr=[];for(var e=0;e<this.blankArray.length;e++)this.given_arr.push(this.blankArray[e].value);this.useRunestoneServices&&eBookConfig.enableCompareMe&&this.enableCompareButton(),this.feedbackArray&&(this.evaluateAnswers(),this.isTimed||this.renderFeedback())}async logCurrentAnswer(e){let t=JSON.stringify(this.given_arr),i=!0;this.setLocalStorage({answer:t,timestamp:new Date});let s={event:"fillb",act:t||"",answer:t||"",correct:this.correct?"T":"F",div_id:this.divid};void 0!==e&&(s.sid=e,i=!1),s=await this.logBookEvent(s);let n=s&&s.detail;if(i)return this.feedbackArray||(this.setLocalStorage({answer:t,timestamp:n.timestamp}),this.correct=n.correct,this.displayFeed=n.displayFeed,this.isCorrectArray=n.isCorrectArray,this.isTimed||this.renderFeedback()),n}evaluateAnswers(){this.correct=!0;for(var e=0;e<this.blankArray.length;e++){var t=this.blankArray[e].value;if(""===t)this.isCorrectArray.push(null),this.displayFeed.push($.i18n("msg_no_answer")),this.correct=!1;else{for(var i=this.feedbackArray[e]||[],s=0;s<i.length;s++){if(s===i.length-1){this.displayFeed.push(i[s].feedback);break}if("regex"in i[s]){if(RegExp(i[s].regex,i[s].regexFlags).test(t)){this.displayFeed.push(i[s].feedback);break}}else{console.assert("number"in i[s]);var[n,r]=i[s].number,a=+t;if(a>=n&&a<=r){this.displayFeed.push(i[s].feedback);break}}}let o=0===s&&i.length>1;this.isCorrectArray.push(o),o||(this.correct=!1)}}this.percent=this.isCorrectArray.filter(Boolean).length/this.blankArray.length}renderFeedback(){if(this.correct){$(this.feedBackDiv).attr("class","alert alert-info");for(let e=0;e<this.blankArray.length;e++)$(this.blankArray[e]).removeClass("input-validation-error")}else{null===this.displayFeed&&(this.displayFeed="");for(let e=0;e<this.blankArray.length;e++)!0!==this.isCorrectArray[e]?$(this.blankArray[e]).addClass("input-validation-error"):$(this.blankArray[e]).removeClass("input-validation-error");$(this.feedBackDiv).attr("class","alert alert-danger")}for(var e="<ul>",t=0;t<this.displayFeed.length;t++)e+="<li>"+this.displayFeed[t]+"</li>";e+="</ul>",1==this.displayFeed.length&&(e=e.slice(8,-10)),this.feedBackDiv.innerHTML=e,"undefined"!=typeof MathJax&&this.queueMathJax(document.body)}enableCompareButton(){this.compareButton.disabled=!1}compareFITBAnswers(){var e={};e.div_id=this.divid,e.course=eBookConfig.course,jQuery.get(`${eBookConfig.new_server_prefix}/assessment/gettop10Answers`,e,this.compareFITB)}compareFITB(e,t,i){var s=e.detail.res,n=(e.detail.miscdata,"<table>");for(var r in n+="<tr><th>Answer</th><th>Count</th></tr>",s)n+="<tr><td>"+s[r].answer+"</td><td>"+s[r].count+" times</td></tr>";n+="</table>",$("<div class='modal fade'>    <div class='modal-dialog compare-modal'>        <div class='modal-content'>            <div class='modal-header'>                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>                <h4 class='modal-title'>Top Answers</h4>            </div>            <div class='modal-body'>"+n+"            </div>        </div>    </div></div>").modal()}disableInteraction(){for(var e=0;e<this.blankArray.length;e++)this.blankArray[e].disabled=!0}}$(document).on("runestone:login-complete",(function(){$("[data-component=fillintheblank]").each((function(e){var t={orig:this,useRunestoneServices:eBookConfig.useRunestoneServices};if(0==$(this).closest("[data-component=timedAssessment]").length)try{window.componentMap[this.id]=new n(t)}catch(e){console.log(`Error rendering Fill in the Blank Problem ${this.id}\n                     Details: ${e}`)}}))}));class r extends n{constructor(e){super(e),this.renderTimedIcon(this.inputDiv),this.hideButtons(),this.needsReinitialization=!0}hideButtons(){$(this.submitButton).hide(),$(this.compareButton).hide()}renderTimedIcon(e){var t=document.createElement("div"),i=document.createElement("img");$(i).attr({src:"../_static/clock.png",style:"width:15px;height:15px"}),t.className="timeTip",t.title="",t.appendChild(i),$(e).prepend(t)}checkCorrectTimed(){switch(this.correct){case!0:return"T";case!1:return"F";default:return null}}hideFeedback(){for(var e=0;e<this.blankArray.length;e++)$(this.blankArray[e]).removeClass("input-validation-error");this.feedBackDiv.style.display="none"}reinitializeListeners(){for(let e of this.blankArray)$(e).change(this.recordAnswered.bind(this))}}void 0===window.component_factory&&(window.component_factory={}),window.component_factory.fillintheblank=function(e){return e.timed?new r(e):new n(e)}},82382:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});var s=i(2568);class n extends s.Z{constructor(e){if(super(e),e){var t=e.orig;this.useRunestoneServices=e.useRunestoneServices||eBookConfig.useRunestoneServices,this.origElem=t,this.divid=t.id,this.question=this.origElem.innerHTML,this.optional=!1,this.attachURL=e.attachURL,$(this.origElem).is("[data-optional]")&&(this.optional=!0),$(this.origElem).is("[data-mathjax]")&&(this.mathjax=!0),$(this.origElem).is("[data-attachment]")&&(this.attachment=!0),this.placeholder=$(this.origElem).data("placeholder")||"Write your answer here",this.renderHTML(),this.caption="shortanswer",this.addCaption("runestone"),this.checkServer("shortanswer",!0),"undefined"!=typeof Prism&&Prism.highlightAllUnder(this.containerDiv)}}renderHTML(){this.containerDiv=document.createElement("div"),this.containerDiv.id=this.divid,$(this.containerDiv).addClass(this.origElem.getAttribute("class")),this.newForm=document.createElement("form"),this.newForm.id=this.divid+"_journal",this.newForm.name=this.newForm.id,this.newForm.action="",this.containerDiv.appendChild(this.newForm),this.fieldSet=document.createElement("fieldset"),this.newForm.appendChild(this.fieldSet),this.firstLegendDiv=document.createElement("div"),this.firstLegendDiv.innerHTML=this.question,$(this.firstLegendDiv).addClass("journal-question"),this.fieldSet.appendChild(this.firstLegendDiv),this.jInputDiv=document.createElement("div"),this.jInputDiv.id=this.divid+"_journal_input",this.fieldSet.appendChild(this.jInputDiv),this.jOptionsDiv=document.createElement("div"),$(this.jOptionsDiv).addClass("journal-options"),this.jInputDiv.appendChild(this.jOptionsDiv),this.jLabel=document.createElement("label"),$(this.jLabel).addClass("radio-inline"),this.jOptionsDiv.appendChild(this.jLabel),this.jTextArea=document.createElement("textarea");let e=this;if(this.jTextArea.onchange=function(){e.isAnswered=!0},this.jTextArea.id=this.divid+"_solution",$(this.jTextArea).attr("aria-label","textarea"),this.jTextArea.placeholder=this.placeholder,$(this.jTextArea).css("display:inline, width:530px"),$(this.jTextArea).addClass("form-control"),this.jTextArea.rows=4,this.jTextArea.cols=50,this.jLabel.appendChild(this.jTextArea),this.jTextArea.onchange=function(){this.feedbackDiv.innerHTML="Your answer has not been saved yet!",$(this.feedbackDiv).removeClass("alert-success"),$(this.feedbackDiv).addClass("alert alert-danger")}.bind(this),this.fieldSet.appendChild(document.createElement("br")),this.mathjax&&(this.renderedAnswer=document.createElement("div"),$(this.renderedAnswer).addClass("latexoutput"),this.fieldSet.appendChild(this.renderedAnswer)),this.buttonDiv=document.createElement("div"),this.fieldSet.appendChild(this.buttonDiv),this.submitButton=document.createElement("button"),$(this.submitButton).addClass("btn btn-success"),this.submitButton.type="button",this.submitButton.textContent="Save",this.submitButton.onclick=function(){this.checkCurrentAnswer(),this.logCurrentAnswer(),this.renderFeedback()}.bind(this),this.buttonDiv.appendChild(this.submitButton),this.randomSpan=document.createElement("span"),this.randomSpan.innerHTML="Instructor's Feedback",this.fieldSet.appendChild(this.randomSpan),this.otherOptionsDiv=document.createElement("div"),$(this.otherOptionsDiv).css("padding-left:20px"),$(this.otherOptionsDiv).addClass("journal-options"),this.fieldSet.appendChild(this.otherOptionsDiv),this.feedbackDiv=document.createElement("div"),$(this.feedbackDiv).css("width:530px, font-style:italic"),this.feedbackDiv.id=this.divid+"_feedback",this.feedbackDiv.innerHTML="You have not answered this question yet.",$(this.feedbackDiv).addClass("alert alert-danger"),this.fieldSet.appendChild(this.feedbackDiv),this.attachment){let e=document.createElement("div");if(this.graderactive){let t=document.createElement("button");t.type="button",t.innerHTML="View Attachment",t.onclick=this.viewFile.bind(this),e.appendChild(t)}else this.fileUpload=document.createElement("input"),this.fileUpload.type="file",this.fileUpload.id=`${this.divid}_fileme`,e.appendChild(this.fileUpload);this.containerDiv.appendChild(e)}$(this.origElem).replaceWith(this.containerDiv),"undefined"!=typeof MathJax&&this.queueMathJax(this.containerDiv)}renderMath(e){this.mathjax&&(e=(e=e.replace(/\$\$(.*?)\$\$/g,"\\[ $1 \\]")).replace(/\$(.*?)\$/g,"\\( $1 \\)"),$(this.renderedAnswer).text(e),this.queueMathJax(this.renderedAnswer))}checkCurrentAnswer(){}async logCurrentAnswer(e){let t=$(document.getElementById(this.divid+"_solution")).val();this.renderMath(t),this.setLocalStorage({answer:t,timestamp:new Date});let i={event:"shortanswer",act:t,answer:t,div_id:this.divid};void 0!==e&&(i.sid=e),await this.logBookEvent(i),this.attachment&&await this.uploadFile()}renderFeedback(){this.feedbackDiv.innerHTML="Your answer has been saved.",$(this.feedbackDiv).removeClass("alert-danger"),$(this.feedbackDiv).addClass("alert alert-success")}setLocalStorage(e){if(!this.graderactive){let t=this.localStorageKey();localStorage.setItem(t,JSON.stringify(e))}}checkLocalStorage(){var e="";if(!this.graderactive&&localStorage.length>0){var t=localStorage.getItem(this.localStorageKey());if(null!==t){try{e=JSON.parse(t).answer}catch(e){return console.log(e.message),void localStorage.removeItem(this.localStorageKey())}$("#"+this.divid+"_solution").text(e),this.renderMath(e),this.feedbackDiv.innerHTML="Your current saved answer is shown above.",$(this.feedbackDiv).removeClass("alert-danger"),$(this.feedbackDiv).addClass("alert alert-success")}}}restoreAnswers(e){e.answer||(e.answer=""),this.answer=e.answer,this.jTextArea.value=this.answer,this.renderMath(this.answer);let t=document.createElement("p");this.jInputDiv.appendChild(t);var i;if(i=e.timestamp?new Date(e.timestamp).toLocaleString():"",$(t).text(i),e.last_answer){this.current_answer="ontime";let s=document.createElement("button");s.type="button",$(s).text("Show Late Answer"),$(s).addClass("btn btn-warning"),$(s).css("margin-left","5px"),$(s).click(function(){var n,r;"ontime"===this.current_answer?(this.jTextArea.value=e.last_answer,this.answer=e.last_answer,n=new Date(e.last_timestamp).toLocaleString(),r="Show on-Time Answer",this.current_answer="late"):(this.jTextArea.value=e.answer,this.answer=e.answer,n=i,r="Show Late Answer",this.current_answer="ontime"),this.renderMath(this.answer),$(t).text(`Submitted: ${n}`),$(s).text(r)}.bind(this)),this.buttonDiv.appendChild(s)}let s="Your current saved answer is shown above.";void 0!==e.score&&(s=`Score: ${e.score}`),e.comment&&(s+=` -- ${e.comment}`),this.feedbackDiv.innerHTML=s,$(this.feedbackDiv).removeClass("alert-danger"),$(this.feedbackDiv).addClass("alert alert-success")}disableInteraction(){this.jTextArea.disabled=!0}async uploadFile(){const e=this.fileUpload.files,t=new FormData;this.fileUpload.files.length>0&&(t.append("file",e[0]),fetch(`/ns/logger/upload/${this.divid}`,{method:"POST",body:t}).then((e=>e.json())).then((e=>{console.log(e)})).catch((e=>{console.error(e)})))}viewFile(){this.attachURL?window.open("","_blank").document.write(`\n                  <html>\n                    <head>\n                    </head>\n                    <body>\n                      <img src="${this.attachURL}" alt="Attachment" >\n                    </body>\n                  </html>\n            `):alert("No attachment for this student.")}}$(document).on("runestone:login-complete",(function(){$("[data-component=shortanswer]").each((function(){if(0==$(this).closest("[data-component=timedAssessment]").length)try{window.componentMap[this.id]=new n({orig:this,useRunestoneServices:eBookConfig.useRunestoneServices})}catch(e){console.log(`Error rendering ShortAnswer Problem ${this.id}\n                Details: ${e}`)}}))}));class r extends n{constructor(e){super(e),this.renderTimedIcon(this.containerDiv),this.hideButtons()}hideButtons(){$(this.submitButton).hide()}renderTimedIcon(e){var t=document.createElement("div"),i=document.createElement("img");$(i).attr({src:"../_static/clock.png",style:"width:15px;height:15px"}),t.className="timeTip",t.title="",t.appendChild(i),$(e).prepend(t)}checkCorrectTimed(){return"I"}hideFeedback(){$(this.feedbackDiv).hide()}}void 0===window.component_factory&&(window.component_factory={}),window.component_factory.shortanswer=function(e){return e.timed?new r(e):new n(e)}},58707:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});var s=i(2568),n=(i(23106),i(20338),i(82382),i(20735),i(68866),i(42556),i(79730),i(63931));class r extends s.Z{constructor(e){super(e);var t=e.orig;this.origElem=t,this.divid=t.id,this.children=this.origElem.childNodes,this.visited=[],this.timeLimit=0,this.limitedTime=!1,isNaN($(this.origElem).data("time"))||(this.timeLimit=60*parseInt($(this.origElem).data("time"),10),this.startingTime=this.timeLimit,this.limitedTime=!0),this.showFeedback=!0,$(this.origElem).is("[data-no-feedback]")&&(this.showFeedback=!1),this.showResults=!0,$(this.origElem).is("[data-no-result]")&&(this.showResults=!1),this.random=!1,$(this.origElem).is("[data-random]")&&(this.random=!0),this.showTimer=!0,$(this.origElem).is("[data-no-timer]")&&(this.showTimer=!1),this.fullwidth=!1,$(this.origElem).is("[data-fullwidth]")&&(this.fullwidth=!0),this.nopause=!1,$(this.origElem).is("[data-no-pause]")&&(this.nopause=!0),eBookConfig.enableScratchAC=!1,this.running=0,this.paused=0,this.done=0,this.taken=0,this.score=0,this.incorrect=0,this.correctStr="",this.incorrectStr="",this.skippedStr="",this.skipped=0,this.currentQuestionIndex=0,this.renderedQuestionArray=[],this.getNewChildren(),eBookConfig.enableDebug||(document.body.oncontextmenu=function(){return!1}),this.checkAssessmentStatus().then(function(){this.renderTimedAssess()}.bind(this))}getNewChildren(){this.newChildren=[];let e=this.origElem.querySelectorAll(".runestone");for(var t=0;t<e.length;t++)this.newChildren.push(e[t])}async checkAssessmentStatus(){let e={div_id:this.divid,course_name:eBookConfig.course};if(console.log(e),eBookConfig.useRunestoneServices){let t=new Request(`${eBookConfig.new_server_prefix}/assessment/tookTimedAssessment`,{method:"POST",headers:this.jsonHeaders,body:JSON.stringify(e)}),i=await fetch(t),s=await i.json();return s=s.detail,this.taken=s.tookAssessment,this.assessmentTaken=this.taken,this.taken||localStorage.clear(),console.log("done with check status"),i}return this.taken=!1,this.assessmentTaken=!1,Promise.resolve()}async renderTimedAssess(){console.log("rendering timed "),this.createRenderedQuestionArray(),this.random&&this.randomizeRQA(),this.renderContainer(),this.renderTimer(),await this.renderControlButtons(),this.containerDiv.appendChild(this.timedDiv),this.renderedQuestionArray.length>1&&this.renderNavControls(),this.renderSubmitButton(),this.renderFeedbackContainer(),this.useRunestoneServices=eBookConfig.useRunestoneServices,$(this.origElem).replaceWith(this.containerDiv),this.styleExamElements(),this.checkServer("timedExam",!0)}renderContainer(){this.containerDiv=document.createElement("div"),this.fullwidth&&$(this.containerDiv).attr({style:"max-width:none"}),this.containerDiv.classList.add("runestone-sphinx"),this.containerDiv.id=this.divid,this.timedDiv=document.createElement("div"),this.navDiv=document.createElement("div"),$(this.navDiv).attr({style:"text-align:center"}),this.flagDiv=document.createElement("div"),$(this.flagDiv).attr({style:"text-align: center"}),this.switchContainer=document.createElement("div"),this.switchContainer.classList.add("switchcontainer"),this.switchDiv=document.createElement("div"),this.timedDiv.appendChild(this.navDiv),this.timedDiv.appendChild(this.flagDiv),this.timedDiv.appendChild(this.switchContainer),this.switchContainer.appendChild(this.switchDiv),$(this.timedDiv).attr({id:"timed_Test",style:"display:none"})}renderTimer(){this.wrapperDiv=document.createElement("div"),this.timerContainer=document.createElement("P"),this.wrapperDiv.id=this.divid+"-startWrapper",this.timerContainer.id=this.divid+"-output",this.wrapperDiv.appendChild(this.timerContainer),this.showTime()}renderControlButtons(){this.controlDiv=document.createElement("div"),$(this.controlDiv).attr({id:"controls",style:"text-align: center"}),this.startBtn=document.createElement("button"),this.pauseBtn=document.createElement("button"),$(this.startBtn).attr({class:"btn btn-success",id:"start",tabindex:"0",role:"button"}),this.startBtn.textContent="Start",this.startBtn.addEventListener("click",async function(){$(this.finishButton).hide(),$(this.flagButton).show();let e=document.createElement("p");e.innerHTML="<strong>Warning: You will not be able to continue the exam if you close this tab, close the window, or navigate away from this page!</strong>  Make sure you click the Finish Exam button when you are done to submit your work!",this.controlDiv.appendChild(e),e.classList.add("examwarning"),await this.renderTimedQuestion(),this.startAssessment()}.bind(this),!1),$(this.pauseBtn).attr({class:"btn btn-default",id:"pause",disabled:"true",tabindex:"0",role:"button"}),this.pauseBtn.textContent="Pause",this.pauseBtn.addEventListener("click",function(){this.pauseAssessment()}.bind(this),!1),this.taken||this.controlDiv.appendChild(this.startBtn),this.nopause||this.controlDiv.appendChild(this.pauseBtn),this.containerDiv.appendChild(this.wrapperDiv),this.containerDiv.appendChild(this.controlDiv)}renderNavControls(){var e,t;this.pagNavList=document.createElement("ul"),$(this.pagNavList).addClass("pagination"),this.leftContainer=document.createElement("li"),this.leftNavButton=document.createElement("button"),this.leftNavButton.innerHTML="&#8249; Prev",$(this.leftNavButton).attr("aria-label","Previous"),$(this.leftNavButton).attr("tabindex","0"),$(this.leftNavButton).attr("role","button"),$(this.rightNavButton).attr("id","prev"),$(this.leftNavButton).css("cursor","pointer"),this.leftContainer.appendChild(this.leftNavButton),this.pagNavList.appendChild(this.leftContainer),this.flaggingPlace=document.createElement("ul"),$(this.flaggingPlace).addClass("pagination"),this.flagContainer=document.createElement("li"),this.flagButton=document.createElement("button"),$(this.flagButton).addClass("flagBtn"),this.flagButton.innerHTML="Flag Question",$(this.flagButton).attr("aria-labelledby","Flag"),$(this.flagButton).attr("tabindex","5"),$(this.flagButton).attr("role","button"),$(this.flagButton).attr("id","flag"),$(this.flagButton).css("cursor","pointer"),this.flagContainer.appendChild(this.flagButton),this.flaggingPlace.appendChild(this.flagContainer),this.rightContainer=document.createElement("li"),this.rightNavButton=document.createElement("button"),$(this.rightNavButton).attr("aria-label","Next"),$(this.rightNavButton).attr("tabindex","0"),$(this.rightNavButton).attr("role","button"),$(this.rightNavButton).attr("id","next"),this.rightNavButton.innerHTML="Next &#8250;",$(this.rightNavButton).css("cursor","pointer"),this.rightContainer.appendChild(this.rightNavButton),this.pagNavList.appendChild(this.rightContainer),this.ensureButtonSafety(),this.navDiv.appendChild(this.pagNavList),this.flagDiv.appendChild(this.flaggingPlace),this.break=document.createElement("br"),this.navDiv.appendChild(this.break),this.qNumList=document.createElement("ul"),$(this.qNumList).attr("id","pageNums"),this.qNumWrapperList=document.createElement("ul"),$(this.qNumWrapperList).addClass("pagination");for(var i=0;i<this.renderedQuestionArray.length;i++)e=document.createElement("li"),(t=document.createElement("a")).innerHTML=i+1,$(t).css("cursor","pointer"),0===i&&$(e).addClass("active"),e.appendChild(t),this.qNumWrapperList.appendChild(e);this.qNumList.appendChild(this.qNumWrapperList),this.navDiv.appendChild(this.qNumList),this.navBtnListeners(),this.flagBtnListener(),$(this.flagButton).hide()}async navigateAway(){"broken_exam"==this.renderedQuestionArray[this.currentQuestionIndex].state&&$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("broken"),"exam_ended"==this.renderedQuestionArray[this.currentQuestionIndex].state&&$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("toolate"),this.renderedQuestionArray[this.currentQuestionIndex].question.isAnswered&&($("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("answered"),await this.renderedQuestionArray[this.currentQuestionIndex].question.checkCurrentAnswer(),this.done||await this.renderedQuestionArray[this.currentQuestionIndex].question.logCurrentAnswer())}async handleNextPrev(e){this.taken||await this.navigateAway();var t=$(e.target).text();if(t.match(/Next/)){if($(this.rightContainer).hasClass("disabled"))return;this.currentQuestionIndex++}else if(t.match(/Prev/)){if($(this.leftContainer).hasClass("disabled"))return;this.currentQuestionIndex--}await this.renderTimedQuestion(),this.ensureButtonSafety();for(var i=0;i<this.qNumList.childNodes.length;i++)for(var s=0;s<this.qNumList.childNodes[i].childNodes.length;s++)$(this.qNumList.childNodes[i].childNodes[s]).removeClass("active");$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("active"),$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").hasClass("flagcolor")?this.flagButton.innerHTML="Unflag Question":this.flagButton.innerHTML="Flag Question"}async handleFlag(e){$(e.target).text().match(/Flag Question/)?($("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("flagcolor"),this.flagButton.innerHTML="Unflag Question"):($("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").removeClass("flagcolor"),this.flagButton.innerHTML="Flag Question")}async handleNumberedNav(e){this.taken||await this.navigateAway();for(var t=0;t<this.qNumList.childNodes.length;t++)for(var i=0;i<this.qNumList.childNodes[t].childNodes.length;i++)$(this.qNumList.childNodes[t].childNodes[i]).removeClass("active");var s=$(e.target).text();let n=this.currentQuestionIndex;this.currentQuestionIndex=parseInt(s)-1,this.currentQuestionIndex>this.renderedQuestionArray.length&&(console.log(`Error: bad index for ${s}`),this.currentQuestionIndex=n),$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").addClass("active"),$("ul#pageNums > ul > li:eq("+this.currentQuestionIndex+")").hasClass("flagcolor")?this.flagButton.innerHTML="Unflag Question":this.flagButton.innerHTML="Flag Question",await this.renderTimedQuestion(),this.ensureButtonSafety()}navBtnListeners(){this.pagNavList.addEventListener("click",this.handleNextPrev.bind(this),!1),this.qNumList.addEventListener("click",this.handleNumberedNav.bind(this),!1)}flagBtnListener(){this.flaggingPlace.addEventListener("click",this.handleFlag.bind(this),!1)}renderSubmitButton(){this.buttonContainer=document.createElement("div"),$(this.buttonContainer).attr({style:"text-align:center"}),this.finishButton=document.createElement("button"),$(this.finishButton).attr({id:"finish",class:"btn btn-primary"}),this.finishButton.textContent="Finish Exam",this.finishButton.addEventListener("click",async function(){window.confirm("Clicking OK means you are ready to submit your answers and are finished with this assessment.")&&(await this.finishAssessment(),$(this.flagButton).hide())}.bind(this),!1),this.controlDiv.appendChild(this.finishButton),$(this.finishButton).hide(),this.timedDiv.appendChild(this.buttonContainer)}ensureButtonSafety(){0===this.currentQuestionIndex&&(1!=this.renderedQuestionArray.length&&$(this.rightContainer).removeClass("disabled"),$(this.leftContainer).addClass("disabled")),this.currentQuestionIndex>=this.renderedQuestionArray.length-1&&(1!=this.renderedQuestionArray.length&&$(this.leftContainer).removeClass("disabled"),$(this.rightContainer).addClass("disabled")),this.currentQuestionIndex>0&&this.currentQuestionIndex<this.renderedQuestionArray.length-1&&($(this.rightContainer).removeClass("disabled"),$(this.leftContainer).removeClass("disabled"))}renderFeedbackContainer(){this.scoreDiv=document.createElement("P"),this.scoreDiv.id=this.divid+"results",this.scoreDiv.style.display="none",this.containerDiv.appendChild(this.scoreDiv)}createRenderedQuestionArray(){for(var e,t=0;t<this.newChildren.length;t++){var i=this.newChildren[t];e={state:"prepared",orig:i,question:{},useRunestoneServices:eBookConfig.useRunestoneServices,timed:!0,assessmentTaken:this.taken,timedWrapper:this.divid,initAttempts:0},$(i).children("[data-component]").length>0&&(i=$(i).children("[data-component]")[0],e.orig=i),$(i).is("[data-component]")&&this.renderedQuestionArray.push(e)}}randomizeRQA(){for(var e,t,i=this.renderedQuestionArray.length;0!==i;)t=Math.floor(Math.random()*i),i-=1,e=this.renderedQuestionArray[i],this.renderedQuestionArray[i]=this.renderedQuestionArray[t],this.renderedQuestionArray[t]=e}async renderTimedQuestion(){if(this.currentQuestionIndex>=this.renderedQuestionArray.length)return;let e,t=this.renderedQuestionArray[this.currentQuestionIndex];if("prepared"===t.state||"forreview"===t.state||"broken_exam"===t.state&&t.initAttempts<3){let e=t.orig;if($(e).is("[data-component=selectquestion]"))if(this.done&&"prepared"==t.state)this.renderedQuestionArray[this.currentQuestionIndex].state="exam_ended";else{t.rqa=this.renderedQuestionArray;let e=new n.default(t);this.renderedQuestionArray[this.currentQuestionIndex]={question:e};try{await e.initialize(),"broken_exam"==t.state&&$(`ul#pageNums > ul > li:eq(${this.currentQuestionIndex})`).removeClass("broken")}catch(e){t.state="broken_exam",this.renderedQuestionArray[this.currentQuestionIndex]=t,console.log(`Error initializing question: Details ${e}`)}}else if($(e).is("[data-component]")){let i=$(e).data("component");this.renderedQuestionArray[this.currentQuestionIndex]={question:window.component_factory[i](t),state:t.state}}}else if("broken_exam"===t.state)return;e=this.renderedQuestionArray[this.currentQuestionIndex].question,"forreview"===t.state&&(await e.component_ready_promise,await e.checkCurrentAnswer(),e.renderFeedback(),e.disableInteraction()),this.visited.includes(this.currentQuestionIndex)||(this.visited.push(this.currentQuestionIndex),this.visited.length!==this.renderedQuestionArray.length||this.done||$(this.finishButton).show()),e.containerDiv&&(0==e.containerDiv.classList.contains("runestone")&&e.containerDiv.classList.add("runestone"),$(this.switchDiv).replaceWith(e.containerDiv),this.switchDiv=e.containerDiv),e.needsReinitialization&&e.reinitializeListeners(this.taken)}handlePrevAssessment(){$(this.startBtn).hide(),$(this.pauseBtn).attr("disabled",!0),$(this.finishButton).attr("disabled",!0),this.running=0,this.done=1,this.showResults&&this.showFeedback?($(this.timedDiv).show(),this.restoreAnsweredQuestions()):($(this.pauseBtn).hide(),$(this.timerContainer).hide())}startAssessment(){if(this.taken)this.handlePrevAssessment();else{if($("#relations-next").hide(),$("#relations-prev").hide(),$(this.startBtn).hide(),$(this.pauseBtn).attr("disabled",!1),0===this.running&&0===this.paused){this.running=1,this.lastTime=Date.now(),$(this.timedDiv).show(),this.increment(),this.logBookEvent({event:"timedExam",act:"start",div_id:this.divid});var e=new Date,t={answer:[0,0,this.renderedQuestionArray.length,0],timestamp:e};localStorage.setItem(this.localStorageKey(),JSON.stringify(t))}$(window).on("beforeunload",function(e){if(!this.done)return e.preventDefault(),e.returnValue="Are you sure you want to leave?  Your work will be lost! And you will need your instructor to reset the exam!","Are you sure you want to leave?  Your work will be lost!"}.bind(this)),window.addEventListener("pagehide",async function(e){this.done||(await this.finishAssessment(),console.log("Exam exited by leaving page"))}.bind(this))}}pauseAssessment(){0===this.done&&(1===this.running?(this.logBookEvent({event:"timedExam",act:"pause",div_id:this.divid}),this.running=0,this.paused=1,this.pauseBtn.innerHTML="Resume",$(this.timedDiv).hide()):(this.logBookEvent({event:"timedExam",act:"resume",div_id:this.divid}),this.running=1,this.paused=0,this.increment(),this.pauseBtn.innerHTML="Pause",$(this.timedDiv).show()))}showTime(){if(this.showTimer){var e=Math.floor(this.timeLimit/60),t=Math.floor(this.timeLimit)%60,i=e,s=t;e<10&&(i="0"+e),t<10&&(s="0"+t);var n="Time Remaining    ";this.limitedTime||(n="Time Taken    ");var r=n+i+":"+s;if(this.done||this.taken){var a=Math.floor(this.timeTaken/60),o=Math.floor(this.timeTaken%60);a<10&&(a="0"+a),o<10&&(o="0"+o),r="Time taken: "+a+":"+o}this.timerContainer.innerHTML=r;for(var h=document.getElementsByClassName("timeTip"),d=0;d<=h.length-1;d++)h[d].title=r}else $(this.timerContainer).hide()}increment(){1!==this.running||this.taken||setTimeout(function(){let e=Date.now();if(this.limitedTime?this.timeLimit=this.timeLimit-Math.floor((e-this.lastTime)/1e3):this.timeLimit=this.timeLimit+Math.floor((e-this.lastTime)/1e3),this.lastTime=e,localStorage.setItem(eBookConfig.email+":"+this.divid+"-time",this.timeLimit),this.showTime(),this.timeLimit>0)this.increment();else if($(this.startBtn).attr({disabled:"true"}),$(this.finishButton).attr({disabled:"true"}),this.running=0,this.done=1,!this.taken){this.taken=!0;let e=document.createElement("h1");e.innerHTML="Sorry but you ran out of time. Your answers are being submitted",this.controlDiv.appendChild(e),this.finishAssessment()}}.bind(this),1e3)}styleExamElements(){$(this.timerContainer).css({width:"50%",margin:"0 auto","background-color":"#DFF0D8","text-align":"center",border:"2px solid #DFF0D8","border-radius":"25px"}),$(this.scoreDiv).css({width:"50%",margin:"0 auto","background-color":"#DFF0D8","text-align":"center",border:"2px solid #DFF0D8","border-radius":"25px"}),$(".tooltipTime").css({margin:"0",padding:"0","background-color":"black",color:"white"})}async finishAssessment(){$("#relations-next").show(),$("#relations-prev").show(),this.showFeedback||($(this.timedDiv).hide(),$(this.pauseBtn).hide(),$(this.timerContainer).hide()),this.findTimeTaken(),this.running=0,this.done=1,this.taken=1,await this.finalizeProblems(),this.checkScore(),this.displayScore(),this.storeScore(),this.logScore(),$(this.pauseBtn).attr("disabled",!0),this.finishButton.disabled=!0,$(window).off("beforeunload");let e=this.divid;setTimeout((function(){jQuery.ajax({url:eBookConfig.app+"/assignments/student_autograde",type:"POST",dataType:"JSON",data:{assignment_id:e,is_timed:!0},success:function(e){0==e.success?console.log(e.message):console.log("Autograder completed")}})}),2e3)}async finalizeProblems(){var e=this.renderedQuestionArray[this.currentQuestionIndex].question;await e.checkCurrentAnswer(),await e.logCurrentAnswer(),e.renderFeedback(),e.disableInteraction();for(var t=0;t<this.renderedQuestionArray.length;t++){let e=this.renderedQuestionArray[t];"broken_exam"!==e.state&&(e.state="forreview",e.question.disableInteraction())}this.showFeedback||this.hideTimedFeedback()}restoreAnsweredQuestions(){for(var e=0;e<this.renderedQuestionArray.length;e++){var t=this.renderedQuestionArray[e];"prepared"===t.state&&(t.state="forreview")}}hideTimedFeedback(){for(var e=0;e<this.renderedQuestionArray.length;e++)this.renderedQuestionArray[e].question.hideFeedback()}checkScore(){this.correctStr="",this.skippedStr="",this.incorrectStr="";for(var e=0;e<this.renderedQuestionArray.length;e++){var t=this.renderedQuestionArray[e].question.checkCorrectTimed();"T"==t?(this.score++,this.correctStr=this.correctStr+(e+1)+", "):"F"==t?(this.incorrect++,this.incorrectStr=this.incorrectStr+(e+1)+", "):null!==t&&"I"!==t||(this.skipped++,this.skippedStr=this.skippedStr+(e+1)+", ")}this.correctStr.length>0?this.correctStr=this.correctStr.substring(0,this.correctStr.length-2):this.correctStr="None",this.skippedStr.length>0?this.skippedStr=this.skippedStr.substring(0,this.skippedStr.length-2):this.skippedStr="None",this.incorrectStr.length>0?this.incorrectStr=this.incorrectStr.substring(0,this.incorrectStr.length-2):this.incorrectStr="None"}findTimeTaken(){this.limitedTime?this.timeTaken=this.startingTime-this.timeLimit:this.timeTaken=this.timeLimit}storeScore(){var e=[];e.push(this.score,this.correctStr,this.incorrect,this.incorrectStr,this.skipped,this.skippedStr,this.timeTaken);var t=new Date,i=JSON.stringify({answer:e,timestamp:t});localStorage.setItem(this.localStorageKey(),i)}logScore(){this.logBookEvent({event:"timedExam",act:"finish",div_id:this.divid,correct:this.score,incorrect:this.incorrect,skipped:this.skipped,time_taken:this.timeTaken})}shouldUseServer(e){var t;if(0===localStorage.length)return!0;var i=localStorage.getItem(this.localStorageKey());if(null===i)return!0;try{var s=JSON.parse(i).answer;if(4==s.length){if(e.correct==s[0]&&e.incorrect==s[1]&&e.skipped==s[2]&&e.timeTaken==s[3])return!0}else if(7==s.length&&e.correct==s[0]&&e.incorrect==s[2]&&e.skipped==s[4]&&e.timeTaken==s[6])return!1;t=new Date(JSON.parse(i[1]).timestamp)}catch(e){return console.log(e.message),localStorage.removeItem(this.localStorageKey()),!0}return!(new Date(e.timestamp)<t&&(this.logScore(),1))}checkLocalStorage(){localStorage.length>0&&null!==localStorage.getItem(this.localStorageKey())?(this.taken=1,this.restoreAnswers("")):this.taken=0}async restoreAnswers(e){var t;if(this.taken=1,""===e)try{t=JSON.parse(localStorage.getItem(this.localStorageKey())).answer}catch(e){return console.log(e.message),localStorage.removeItem(this.localStorageKey()),void(this.taken=0)}else t=[parseInt(e.correct),parseInt(e.incorrect),parseInt(e.skipped),parseInt(e.time_taken),e.reset],this.setLocalStorage(t);if(1==t.length)return this.reset=!0,void(this.taken=0);4==t.length||5==t.length?(this.score=t[0],this.incorrect=t[1],this.skipped=t[2],this.timeTaken=t[3]):7==t.length?(this.score=t[0],this.correctStr=t[1],this.incorrect=t[2],this.incorrectStr=t[3],this.skipped=t[4],this.skippedStr=t[5],this.timeTaken=t[6]):(this.score=0,this.incorrect=0,this.skipped=this.renderedQuestionArray.length,this.timeTaken=0),this.taken&&(this.skipped===this.renderedQuestionArray.length&&(this.showFeedback=!1),this.handlePrevAssessment()),await this.renderTimedQuestion(),this.displayScore(),this.showTime()}setLocalStorage(e){var t={answer:e,timestamp:new Date};localStorage.setItem(this.localStorageKey(),JSON.stringify(t))}displayScore(){if(this.showResults){var e,t="";this.correctStr.length>0||this.incorrectStr.length>0||this.skippedStr.length>0?(t=`Num Correct: ${this.score}. Questions: ${this.correctStr}<br>Num Wrong: ${this.incorrect}. Questions: ${this.incorrectStr}<br>Num Skipped: ${this.skipped}. Questions: ${this.skippedStr}<br>`,e=this.score+this.incorrect+this.skipped,t+="Percent Correct: "+(this.score/e*100).toFixed(2)+"%",$(this.scoreDiv).html(t),this.scoreDiv.style.display="block"):(t=`Num Correct: ${this.score}<br>Num Wrong: ${this.incorrect}<br>Num Skipped: ${this.skipped}<br>`,e=this.score+this.incorrect+this.skipped,t+="Percent Correct: "+(this.score/e*100).toFixed(2)+"%",$(this.scoreDiv).html(t),this.scoreDiv.style.display="block"),this.highlightNumberedList()}else $(this.scoreDiv).html("Thank you for taking the exam.  Your answers have been recorded."),this.scoreDiv.style.display="block"}highlightNumberedList(){var e=this.correctStr,t=this.incorrectStr,i=this.skippedStr;e=e.replace(/ /g,"").split(","),t=t.replace(/ /g,"").split(","),i=i.replace(/ /g,"").split(","),$((function(){var s=$("ul#pageNums > ul > li");s.hasClass("answered")&&s.removeClass("answered");for(var n=0;n<e.length;n++)parseInt(e[n]),s.eq(parseInt(e[n])-1).addClass("correctCount");for(var r=0;r<t.length;r++)s.eq(parseInt(t[r])-1).addClass("incorrectCount");for(var a=0;a<i.length;a++)s.eq(parseInt(i[a])-1).addClass("skippedCount")}))}}$(document).on("runestone:login-complete",(function(){$("[data-component=timedAssessment]").each((function(e){window.componentMap[this.id]=new r({orig:this,useRunestoneServices:eBookConfig.useRunestoneServices})}))}))}}]);
//# sourceMappingURL=prefix-526.e07ef93bdbf8b983.bundle.js.map