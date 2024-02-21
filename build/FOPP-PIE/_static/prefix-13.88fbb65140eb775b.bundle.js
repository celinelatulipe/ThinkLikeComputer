(self.webpackChunkWebComponents=self.webpackChunkWebComponents||[]).push([[13],{28902:(e,i,t)=>{!function(e){"use strict";e.defineMode("gas",(function(e,i){var t=[],n="",l={".abort":"builtin",".align":"builtin",".altmacro":"builtin",".ascii":"builtin",".asciz":"builtin",".balign":"builtin",".balignw":"builtin",".balignl":"builtin",".bundle_align_mode":"builtin",".bundle_lock":"builtin",".bundle_unlock":"builtin",".byte":"builtin",".cfi_startproc":"builtin",".comm":"builtin",".data":"builtin",".def":"builtin",".desc":"builtin",".dim":"builtin",".double":"builtin",".eject":"builtin",".else":"builtin",".elseif":"builtin",".end":"builtin",".endef":"builtin",".endfunc":"builtin",".endif":"builtin",".equ":"builtin",".equiv":"builtin",".eqv":"builtin",".err":"builtin",".error":"builtin",".exitm":"builtin",".extern":"builtin",".fail":"builtin",".file":"builtin",".fill":"builtin",".float":"builtin",".func":"builtin",".global":"builtin",".gnu_attribute":"builtin",".hidden":"builtin",".hword":"builtin",".ident":"builtin",".if":"builtin",".incbin":"builtin",".include":"builtin",".int":"builtin",".internal":"builtin",".irp":"builtin",".irpc":"builtin",".lcomm":"builtin",".lflags":"builtin",".line":"builtin",".linkonce":"builtin",".list":"builtin",".ln":"builtin",".loc":"builtin",".loc_mark_labels":"builtin",".local":"builtin",".long":"builtin",".macro":"builtin",".mri":"builtin",".noaltmacro":"builtin",".nolist":"builtin",".octa":"builtin",".offset":"builtin",".org":"builtin",".p2align":"builtin",".popsection":"builtin",".previous":"builtin",".print":"builtin",".protected":"builtin",".psize":"builtin",".purgem":"builtin",".pushsection":"builtin",".quad":"builtin",".reloc":"builtin",".rept":"builtin",".sbttl":"builtin",".scl":"builtin",".section":"builtin",".set":"builtin",".short":"builtin",".single":"builtin",".size":"builtin",".skip":"builtin",".sleb128":"builtin",".space":"builtin",".stab":"builtin",".string":"builtin",".struct":"builtin",".subsection":"builtin",".symver":"builtin",".tag":"builtin",".text":"builtin",".title":"builtin",".type":"builtin",".uleb128":"builtin",".val":"builtin",".version":"builtin",".vtable_entry":"builtin",".vtable_inherit":"builtin",".warning":"builtin",".weak":"builtin",".weakref":"builtin",".word":"builtin"},r={};var a=(i.architecture||"x86").toLowerCase();function s(e,i){for(var t,n=!1;null!=(t=e.next());){if("/"===t&&n){i.tokenize=null;break}n="*"===t}return"comment"}return"x86"===a?(n="#",r.al="variable",r.ah="variable",r.ax="variable",r.eax="variable-2",r.rax="variable-3",r.bl="variable",r.bh="variable",r.bx="variable",r.ebx="variable-2",r.rbx="variable-3",r.cl="variable",r.ch="variable",r.cx="variable",r.ecx="variable-2",r.rcx="variable-3",r.dl="variable",r.dh="variable",r.dx="variable",r.edx="variable-2",r.rdx="variable-3",r.si="variable",r.esi="variable-2",r.rsi="variable-3",r.di="variable",r.edi="variable-2",r.rdi="variable-3",r.sp="variable",r.esp="variable-2",r.rsp="variable-3",r.bp="variable",r.ebp="variable-2",r.rbp="variable-3",r.ip="variable",r.eip="variable-2",r.rip="variable-3",r.cs="keyword",r.ds="keyword",r.ss="keyword",r.es="keyword",r.fs="keyword",r.gs="keyword"):"arm"!==a&&"armv6"!==a||(n="@",l.syntax="builtin",r.r0="variable",r.r1="variable",r.r2="variable",r.r3="variable",r.r4="variable",r.r5="variable",r.r6="variable",r.r7="variable",r.r8="variable",r.r9="variable",r.r10="variable",r.r11="variable",r.r12="variable",r.sp="variable-2",r.lr="variable-2",r.pc="variable-2",r.r13=r.sp,r.r14=r.lr,r.r15=r.pc,t.push((function(e,i){if("#"===e)return i.eatWhile(/\w/),"number"}))),{startState:function(){return{tokenize:null}},token:function(e,i){if(i.tokenize)return i.tokenize(e,i);if(e.eatSpace())return null;var a,b,u=e.next();if("/"===u&&e.eat("*"))return i.tokenize=s,s(e,i);if(u===n)return e.skipToEnd(),"comment";if('"'===u)return function(e,i){for(var t,n=!1;null!=(t=e.next());){if(t===i&&!n)return!1;n=!n&&"\\"===t}}(e,'"'),"string";if("."===u)return e.eatWhile(/\w/),b=e.current().toLowerCase(),(a=l[b])||null;if("="===u)return e.eatWhile(/\w/),"tag";if("{"===u)return"bracket";if("}"===u)return"bracket";if(/\d/.test(u))return"0"===u&&e.eat("x")?(e.eatWhile(/[0-9a-fA-F]/),"number"):(e.eatWhile(/\d/),"number");if(/\w/.test(u))return e.eatWhile(/\w/),e.eat(":")?"tag":(b=e.current().toLowerCase(),(a=r[b])||null);for(var o=0;o<t.length;o++)if(a=t[o](u,e,i))return a},lineComment:n,blockCommentStart:"/*",blockCommentEnd:"*/"}}))}(t(4631))},2013:(e,i,t)=>{"use strict";t.r(i);var n=t(2568),l=t(4631),r=t.n(l);t(28902),t(5321),t(96876),t(54086),t(99762),t(15734),window.LPList={};class a extends n.Z{constructor(e){super(e),this.useRunestoneServices=e.useRunestoneServices,this.element=e.orig,this.containerDiv=this.element,this.divid=this.element.id,this.resultElement=$(this.element).siblings(".lp-result"),this.feedbackElement=$(this.element).siblings(".lp-feedback").children("div"),this.textAreas=[],this.initTextAreas();let i=this;$(this.element).click((e=>i.onSaveAndRun(e).then(null))),this.checkServer("lp_build",!0)}initTextAreas(e=!1){let i=this;$('textarea.code_snippet:not([style="display: none;"])').each((function(t,n){let l=r().fromTextArea(n,{lineNumbers:!0,mode:$(i.element).attr("data-lang"),indentUnit:4,matchBrackets:!0,readOnly:e,autoMatchParens:!0,extraKeys:{Tab:"indentMore","Shift-Tab":"indentLess"}});$(l.getWrapperElement()).resizable({resize:function(){l.setSize($(this).width(),$(this).height()),l.refresh()}}),i.textAreas.push(l)}))}async onSaveAndRun(e){$(this.element).attr("disabled",!0),$(this.resultElement).val("Building..."),$(this.feedbackElement).text("").attr("");let i,t=this.textareasToData();this.setLocalStorage({answer:{code_snippets:t},timestamp:new Date});try{i=await this.logBookEvent({event:"lp_build",answer:JSON.stringify(t),act:"",path:window.location.href.replace(eBookConfig.app,"").slice(1),div_id:this.divid})}catch(e){return void $(this.feedbackElement).val("Error contacting server: {err}.").attr("class","alert alert-danger")}finally{$(this.element).attr("disabled",!1)}i=i.detail,"answer"in i||(i.answer={}),i.answer.code_snippets=t,this.displayAnswer(i),this.setLocalStorage(i)}displayAnswer(e){"errors"in e?$(this.feedbackElement).text(e.errors.join("<br>")).attr("class","alert alert-danger"):($(this.resultElement).val(e.answer.resultString),null==e.correct?$(this.feedbackElement).text("Response recorded.").attr("class","alert alert-success"):e.correct>=100?$(this.feedbackElement).text("Correct. Grade: "+e.correct+"%").attr("class","alert alert-success"):$(this.feedbackElement).text("Incorrect. Grade: "+e.correct+"%").attr("class","alert alert-danger"),$(this.resultElement).scrollTop(this.resultElement[0].scrollHeight))}textareasToData(){return $.map(this.textAreas,(function(e,i){return e.getValue()}))}dataToTextareas(e){this.textAreas.length||($(this.element).before((e.answer.code_snippets||[]).map((()=>'<textarea class="code_snippet"></textarea><br />'))),this.initTextAreas(!0),$(this.element).prop("disabled",!0)),$(this.textAreas).each((function(i,t){t.setValue((e.answer.code_snippets||"")[i]||"")}))}restoreAnswers(e){e.answer=JSON.parse(e.answer||"{}"),this.dataToTextareas(e),this.displayAnswer(e)}checkLocalStorage(){var e;if(localStorage.length>0){var i=this.localStorageKey(),t=localStorage.getItem(i);if(null!==t){try{e=JSON.parse(t)}catch(e){return console.log(e.message),void localStorage.removeItem(i)}this.restoreAnswers(e)}}}setLocalStorage(e){let i=Object.assign({},e);i.answer=JSON.stringify(e.answer),localStorage.setItem(this.localStorageKey(),JSON.stringify(i))}}$(document).on("runestone:login-complete",(function(){$("[data-component=lp_build]").each((function(e){try{window.LPList[this.id]=new a({orig:this,useRunestoneServices:eBookConfig.useRunestoneServices})}catch(e){console.log(`Error rendering LP Problem ${this.id}`)}}))})),void 0===window.component_factory&&(window.component_factory={}),window.component_factory.lp_build=function(e){return new a(e)}}}]);
//# sourceMappingURL=prefix-13.88fbb65140eb775b.bundle.js.map