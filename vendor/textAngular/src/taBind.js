angular.module("textAngular.taBind",["textAngular.factories","textAngular.DOM"]).service("_taBlankTest",[function(){return function(e){if(!e)return!0;var t=stripHtmlToText(e);return""===t&&!/<img[^>]+>/.test(e)}}]).directive("taButton",[function(){return{link:function(e,t,n){t.attr("unselectable","on"),t.on("mousedown",function(e,t){return t&&angular.extend(e,t),e.preventDefault(),!1})}}}]).directive("taBind",["taSanitize","$timeout","$document","taFixChrome","taBrowserTag","taSelection","taSelectableElements","taApplyCustomRenderers","taOptions","_taBlankTest","$parse","taDOM","textAngularManager",function(e,t,n,a,r,i,o,l,s,d,u,c,f){return{priority:2,require:["ngModel","?ngModelOptions"],link:function(r,p,m,h){function v(e){var t;return U.forEach(function(n){if(n.keyCode===e.keyCode){var a=(e.metaKey?E:0)+(e.ctrlKey?T:0)+(e.shiftKey?H:0)+(e.altKey?_:0);if(n.forbiddenModifiers&a)return;n.mustHaveModifiers.every(function(e){return a&e})&&(t=n.specialKey)}}),t}var g,y,b,C,L=h[0],w=h[1]||{},k=void 0!==p.attr("contenteditable")&&p.attr("contenteditable"),N=k||"textarea"===p[0].tagName.toLowerCase()||"input"===p[0].tagName.toLowerCase(),x=!1,D=!1,K=!1,M=m.taUnsafeSanitizer||s.disableSanitizer,$=/^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,S=/^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i,T=1,E=2,_=4,H=8,W=13,A=16,I=9,V=37,B=39,U=[{specialKey:"UndoKey",forbiddenModifiers:_+H,mustHaveModifiers:[E+T],keyCode:90},{specialKey:"RedoKey",forbiddenModifiers:_,mustHaveModifiers:[E+T,H],keyCode:90},{specialKey:"RedoKey",forbiddenModifiers:_+H,mustHaveModifiers:[E+T],keyCode:89},{specialKey:"TabKey",forbiddenModifiers:E+H+_+T,mustHaveModifiers:[],keyCode:I},{specialKey:"ShiftTabKey",forbiddenModifiers:E+_+T,mustHaveModifiers:[H],keyCode:I}];void 0===m.taDefaultWrap&&(m.taDefaultWrap="p"),""===m.taDefaultWrap?(b="",C=void 0===_browserDetect.ie?"<div><br></div>":_browserDetect.ie>=11?"<p><br></p>":_browserDetect.ie<=8?"<P>&nbsp;</P>":"<p>&nbsp;</p>"):(b=void 0===_browserDetect.ie||_browserDetect.ie>=11?"<"+m.taDefaultWrap+"><br></"+m.taDefaultWrap+">":_browserDetect.ie<=8?"<"+m.taDefaultWrap.toUpperCase()+"></"+m.taDefaultWrap.toUpperCase()+">":"<"+m.taDefaultWrap+"></"+m.taDefaultWrap+">",C=void 0===_browserDetect.ie||_browserDetect.ie>=11?"<"+m.taDefaultWrap+"><br></"+m.taDefaultWrap+">":_browserDetect.ie<=8?"<"+m.taDefaultWrap.toUpperCase()+">&nbsp;</"+m.taDefaultWrap.toUpperCase()+">":"<"+m.taDefaultWrap+">&nbsp;</"+m.taDefaultWrap+">"),w.$options||(w.$options={});var O=function(e){if(d(e))return e;var t=angular.element("<div>"+e+"</div>");if(0===t.children().length)e="<"+m.taDefaultWrap+">"+e+"</"+m.taDefaultWrap+">";else{var n,a=t[0].childNodes,r=!1;for(n=0;n<a.length&&!(r=a[n].nodeName.toLowerCase().match(BLOCKELEMENTS));n++);if(r)for(e="",n=0;n<a.length;n++){var i=a[n],o=i.nodeName.toLowerCase();if("#comment"===o)e+="<!--"+i.nodeValue+"-->";else if("#text"===o){var l=i.textContent;e+=l.trim()?"<"+m.taDefaultWrap+">"+l+"</"+m.taDefaultWrap+">":l}else if(o.match(BLOCKELEMENTS))e+=i.outerHTML;else{var s=i.outerHTML||i.nodeValue;e+=""!==s.trim()?"<"+m.taDefaultWrap+">"+s+"</"+m.taDefaultWrap+">":s}}else e="<"+m.taDefaultWrap+">"+e+"</"+m.taDefaultWrap+">"}return e};m.taPaste&&(y=u(m.taPaste)),p.addClass("ta-bind");var R;r["$undoManager"+(m.id||"")]=L.$undoManager={_stack:[],_index:0,_max:1e3,push:function(e){return"undefined"==typeof e||null===e||"undefined"!=typeof this.current()&&null!==this.current()&&e===this.current()?e:(this._index<this._stack.length-1&&(this._stack=this._stack.slice(0,this._index+1)),this._stack.push(e),R&&t.cancel(R),this._stack.length>this._max&&this._stack.shift(),this._index=this._stack.length-1,e)},undo:function(){return this.setToIndex(this._index-1)},redo:function(){return this.setToIndex(this._index+1)},setToIndex:function(e){if(!(e<0||e>this._stack.length-1))return this._index=e,this.current()},current:function(){return this._stack[this._index]}};var F,z=function(){if(k)return p[0].innerHTML;if(N)return p.val();throw"textAngular Error: attempting to update non-editable taBind"},P=function(e){return r.$emit("ta-element-select",this),e.preventDefault(),!1},q=r["reApplyOnSelectorHandlers"+(m.id||"")]=function(){x||angular.forEach(o,function(e){p.find(e).off("click",P).on("click",P)})},j=function(e,t,n){K=n||!1,"undefined"!=typeof t&&null!==t||(t=k),"undefined"!=typeof e&&null!==e||(e=z()),d(e)?(""!==L.$viewValue&&L.$setViewValue(""),t&&""!==L.$undoManager.current()&&L.$undoManager.push("")):(q(),L.$viewValue!==e&&(L.$setViewValue(e),t&&L.$undoManager.push(e))),L.$render()},G=function(e){p[0].innerHTML=e},J=r["$undoTaBind"+(m.id||"")]=function(){if(!x&&k){var e=L.$undoManager.undo();"undefined"!=typeof e&&null!==e&&(G(e),j(e,!1),F&&t.cancel(F),F=t(function(){p[0].focus(),i.setSelectionToElementEnd(p[0])},1))}},Q=r["$redoTaBind"+(m.id||"")]=function(){if(!x&&k){var e=L.$undoManager.redo();"undefined"!=typeof e&&null!==e&&(G(e),j(e,!1),F&&t.cancel(F),F=t(function(){p[0].focus(),i.setSelectionToElementEnd(p[0])},1))}};r["updateTaBind"+(m.id||"")]=function(){x||j(void 0,void 0,!0)};var X=function(t){return L.$oldViewValue=e(a(t),L.$oldViewValue,M)};if(p.attr("required")&&(L.$validators.required=function(e,t){return!d(e||t)}),L.$parsers.push(X),L.$parsers.unshift(O),L.$formatters.push(X),L.$formatters.unshift(O),L.$formatters.unshift(function(e){return L.$undoManager.push(e||"")}),N)if(r.events={},k){var Y=!1,Z=function(n){var a=void 0!==n&&n.match(/content=["']*OneNote.File/i);if(n&&n.trim().length){if(n.match(/class=["']*Mso(Normal|List)/i)||n.match(/content=["']*Word.Document/i)||n.match(/content=["']*OneNote.File/i)){var o=n.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);o=o?o[1]:n,o=o.replace(/<o:p>[\s\S]*?<\/o:p>/gi,"").replace(/class=(["']|)MsoNormal(["']|)/gi,"");var l=angular.element("<div>"+o+"</div>"),s=angular.element("<div></div>"),d={element:null,lastIndent:[],lastLi:null,isUl:!1};d.lastIndent.peek=function(){var e=this.length;if(e>0)return this[e-1]};for(var u=function(e){d.isUl=e,d.element=angular.element(e?"<ul>":"<ol>"),d.lastIndent=[],d.lastIndent.peek=function(){var e=this.length;if(e>0)return this[e-1]},d.lastLevelMatch=null},f=0;f<=l[0].childNodes.length;f++)if(l[0].childNodes[f]&&"#text"!==l[0].childNodes[f].nodeName){var m=l[0].childNodes[f].tagName.toLowerCase();if("p"===m||"h1"===m||"h2"===m||"h3"===m||"h4"===m||"h5"===m||"h6"===m){var h=angular.element(l[0].childNodes[f]),v=(h.attr("class")||"").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);if(v){if(h[0].childNodes.length<2||h[0].childNodes[1].childNodes.length<1)continue;var g="bullet"===v[1].toLowerCase()||"number"!==v[1].toLowerCase()&&!(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(h[0].childNodes[1].innerHTML)||/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(h[0].childNodes[1].childNodes[0].innerHTML)),b=(h.attr("style")||"").match(/margin-left:([\-\.0-9]*)/i),C=parseFloat(b?b[1]:0),w=(h.attr("style")||"").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);if(w&&w[2]&&(C=parseInt(w[2])),w&&(!d.lastLevelMatch||w[1]!==d.lastLevelMatch[1])||!v[3]||"first"===v[3].toLowerCase()||null===d.lastIndent.peek()||d.isUl!==g&&d.lastIndent.peek()===C)u(g),s.append(d.element);else if(null!=d.lastIndent.peek()&&d.lastIndent.peek()<C)d.element=angular.element(g?"<ul>":"<ol>"),d.lastLi.append(d.element);else if(null!=d.lastIndent.peek()&&d.lastIndent.peek()>C){for(;null!=d.lastIndent.peek()&&d.lastIndent.peek()>C;)if("li"!==d.element.parent()[0].tagName.toLowerCase()){if(!/[uo]l/i.test(d.element.parent()[0].tagName.toLowerCase()))break;d.element=d.element.parent(),d.lastIndent.pop()}else d.element=d.element.parent();d.isUl="ul"===d.element[0].tagName.toLowerCase(),g!==d.isUl&&(u(g),s.append(d.element))}d.lastLevelMatch=w,C!==d.lastIndent.peek()&&d.lastIndent.push(C),d.lastLi=angular.element("<li>"),d.element.append(d.lastLi),d.lastLi.html(h.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi,"")),h.remove()}else u(!1),s.append(h)}}var k=function(e){e=angular.element(e);for(var t=e[0].childNodes.length-1;t>=0;t--)e.after(e[0].childNodes[t]);e.remove()};angular.forEach(s.find("span"),function(e){e.removeAttribute("lang"),e.attributes.length<=0&&k(e)}),angular.forEach(s.find("font"),k),n=s.html(),a&&(n=s.html()||l.html())}else{if(n=n.replace(/<(|\/)meta[^>]*?>/gi,""),n.match(/<[^>]*?(ta-bind)[^>]*?>/)){if(n.match(/<[^>]*?(text-angular)[^>]*?>/)){var N=angular.element("<div>"+n+"</div>");N.find("textarea").remove();for(var x=c.getByAttribute(N,"ta-bind"),D=0;D<x.length;D++){for(var K=x[D][0].parentNode.parentNode,$=0;$<x[D][0].childNodes.length;$++)K.parentNode.insertBefore(x[D][0].childNodes[$],K);K.parentNode.removeChild(K)}n=N.html().replace('<br class="Apple-interchange-newline">',"")}}else n.match(/^<span/)&&(n.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/gi)||(n=n.replace(/<(|\/)span[^>]*?>/gi,"")));n=n.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi,"").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi,"&nbsp;")}/<li(\s.*)?>/i.test(n)&&/(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(n)===!1&&(n=n.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i,"<ul>$&</ul>")),n=n.replace(/^[ |\u00A0]+/gm,function(e){for(var t="",n=0;n<e.length;n++)t+="&nbsp;";return t}).replace(/\n|\r\n|\r/g,"<br />").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;"),y&&(n=y(r,{$html:n})||n),n=e(n,"",M),i.insertHtml(n,p[0]),t(function(){L.$setViewValue(z()),Y=!1,p.removeClass("processing-paste")},0)}else Y=!1,p.removeClass("processing-paste")};p.on("paste",r.events.paste=function(e,a){if(a&&angular.extend(e,a),x||Y)return e.stopPropagation(),e.preventDefault(),!1;Y=!0,p.addClass("processing-paste");var r,i=(e.originalEvent||e).clipboardData;if(i&&i.getData&&i.types.length>0){for(var o="",l=0;l<i.types.length;l++)o+=" "+i.types[l];return/text\/html/i.test(o)?r=i.getData("text/html"):/text\/plain/i.test(o)&&(r=i.getData("text/plain")),Z(r),e.stopPropagation(),e.preventDefault(),!1}var s=rangy.saveSelection(),d=angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');n.find("body").append(d),d[0].focus(),t(function(){rangy.restoreSelection(s),Z(d[0].innerHTML),p[0].focus(),d.remove()},0)}),p.on("cut",r.events.cut=function(e){x?e.preventDefault():t(function(){L.$setViewValue(z())},0)}),p.on("keydown",r.events.keydown=function(e,t){t&&angular.extend(e,t),e.keyCode===A?i.setStateShiftKey(!0):i.setStateShiftKey(!1),e.specialKey=v(e);var n;if(s.keyMappings.forEach(function(t){e.specialKey===t.commandKeyCode&&(e.specialKey=void 0),t.testForKey(e)&&(n=t.commandKeyCode),"UndoKey"!==t.commandKeyCode&&"RedoKey"!==t.commandKeyCode||t.enablePropagation||e.preventDefault()}),"undefined"!=typeof n&&(e.specialKey=n),"undefined"==typeof e.specialKey||"UndoKey"===e.specialKey&&"RedoKey"===e.specialKey||(e.preventDefault(),f.sendKeyCommand(r,e)),!(x||("UndoKey"===e.specialKey&&(J(),e.preventDefault()),"RedoKey"===e.specialKey&&(Q(),e.preventDefault()),e.keyCode!==W||e.shiftKey||e.ctrlKey||e.metaKey||e.altKey))){var a,o=function(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return!0;return!1},l=i.getSelectionElement();if(!l.nodeName.match(VALIDELEMENTS))return;var d=angular.element(b),u=["blockquote","ul","ol"];if(o(u,l.parentNode.tagName.toLowerCase())){if(/^<br(|\/)>$/i.test(l.innerHTML.trim())&&!l.nextSibling){a=angular.element(l);var c=a.parent();c.after(d),a.remove(),0===c.children().length&&c.remove(),i.setSelectionToElementStart(d[0]),e.preventDefault()}/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(l.innerHTML.trim())&&(a=angular.element(l),a.after(d),a.remove(),i.setSelectionToElementStart(d[0]),e.preventDefault())}}});var ee;p.on("keyup",r.events.keyup=function(e,n){if(n&&angular.extend(e,n),i.setStateShiftKey(!1),e.keyCode===I){var a=i.getSelection();return void(a.start.element===p[0]&&p.children().length&&i.setSelectionToElementStart(p.children()[0]))}if(e.keyCode!==V||e.shiftKey||i.updateLeftArrowKey(p),e.keyCode!==B||e.shiftKey||i.updateRightArrowKey(p),R&&t.cancel(R),!x&&!$.test(e.keyCode))if(e.keyCode===W&&(e.ctrlKey||e.metaKey||e.altKey));else{if(!(""===b||e.keyCode!==W||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)){for(var r=i.getSelectionElement();!r.nodeName.match(VALIDELEMENTS)&&r!==p[0];)r=r.parentNode;if(r.tagName.toLowerCase()!==m.taDefaultWrap&&"li"!==r.tagName.toLowerCase()&&(""===r.innerHTML.trim()||"<br>"===r.innerHTML.trim())){var o=angular.element(b);angular.element(r).replaceWith(o),i.setSelectionToElementStart(o[0])}}var l=z();""===b||""!==l.trim()&&"<br>"!==l.trim()?"<"!==l.substring(0,1)&&""!==m.taDefaultWrap:(G(b),i.setSelectionToElementStart(p.children()[0]));var s=g!==e.keyCode&&S.test(e.keyCode);ee&&t.cancel(ee),ee=t(function(){j(l,s,!0)},w.$options.debounce||400),s||(R=t(function(){L.$undoManager.push(l)},250)),g=e.keyCode}});var te;if(p.on("input",function(){z()!==L.$viewValue&&(te&&t.cancel(te),te=t(function(){var e=z();e!==L.$viewValue&&j(e,!0)},1e3))}),p.on("blur",r.events.blur=function(){D=!1,x?(K=!0,L.$render()):j(void 0,void 0,!0)}),m.placeholder&&(_browserDetect.ie>8||void 0===_browserDetect.ie)){var ne;if(!m.id)throw"textAngular Error: An unique ID is required for placeholders to work";ne=addCSSRule("#"+m.id+".placeholder-text:before",'content: "'+m.placeholder+'"'),r.$on("$destroy",function(){removeCSSRule(ne)})}p.on("focus",r.events.focus=function(){D=!0,p.removeClass("placeholder-text"),q()}),p.on("mouseup",r.events.mouseup=function(){var e=i.getSelection();e.start.element===p[0]&&p.children().length&&i.setSelectionToElementStart(p.children()[0])}),p.on("mousedown",r.events.mousedown=function(e,t){t&&angular.extend(e,t),e.stopPropagation()})}else{p.on("change blur",r.events.change=r.events.blur=function(){x||L.$setViewValue(z())}),p.on("keydown",r.events.keydown=function(e,t){if(t&&angular.extend(e,t),e.keyCode===I){var n=this.selectionStart,a=this.selectionEnd,r=p.val();if(e.shiftKey){var i=r.lastIndexOf("\n",n),o=r.lastIndexOf("\t",n);o!==-1&&o>=i&&(p.val(r.substring(0,o)+r.substring(o+1)),this.selectionStart=this.selectionEnd=n-1)}else p.val(r.substring(0,n)+"\t"+r.substring(a)),this.selectionStart=this.selectionEnd=n+1;e.preventDefault()}});var ae=function(e,t){for(var n="",a=0;a<t;a++)n+=e;return n},re=function(e,t,n){for(var a=0;a<e.length;a++)t.call(n,a,e[a])},ie=function(e,t){var n="",a=e.childNodes;return t++,n+=ae("\t",t-1)+e.outerHTML.substring(0,4),re(a,function(e,a){var r=a.nodeName.toLowerCase();return"#comment"===r?void(n+="<!--"+a.nodeValue+"-->"):"#text"===r?void(n+=a.textContent):void(a.outerHTML&&(n+="ul"===r||"ol"===r?"\n"+ie(a,t):"\n"+ae("\t",t)+a.outerHTML))}),n+="\n"+ae("\t",t-1)+e.outerHTML.substring(e.outerHTML.lastIndexOf("<"))};L.$formatters.unshift(function(e){var t=angular.element("<div>"+e+"</div>")[0].childNodes;return t.length>0&&(e="",re(t,function(t,n){var a=n.nodeName.toLowerCase();return"#comment"===a?void(e+="<!--"+n.nodeValue+"-->"):"#text"===a?void(e+=n.textContent):void(n.outerHTML&&(e.length>0&&(e+="\n"),e+="ul"===a||"ol"===a?""+ie(n,0):""+n.outerHTML))})),e})}var oe,le=function(e,n){if(n&&angular.extend(e,n),!dropFired&&!x){dropFired=!0;var a;a=e.originalEvent?e.originalEvent.dataTransfer:e.dataTransfer,r.$emit("ta-drop-event",this,e,a),t(function(){dropFired=!1,j(void 0,void 0,!0)},100)}},se=!1;L.$render=function(){if(!se){se=!0;var e=L.$viewValue||"";K||(k&&D&&(p.removeClass("placeholder-text"),oe&&t.cancel(oe),oe=t(function(){D||(p[0].focus(),i.setSelectionToElementEnd(p.children()[p.children().length-1])),oe=void 0},1)),k?(G(m.placeholder?""===e?b:e:""===e?b:e),x?p.off("drop",le):(q(),p.on("drop",le))):"textarea"!==p[0].tagName.toLowerCase()&&"input"!==p[0].tagName.toLowerCase()?G(l(e)):p.val(e)),k&&m.placeholder&&(""===e?D?p.removeClass("placeholder-text"):p.addClass("placeholder-text"):p.removeClass("placeholder-text")),se=K=!1}},m.taReadonly&&(x=r.$eval(m.taReadonly),x?(p.addClass("ta-readonly"),"textarea"!==p[0].tagName.toLowerCase()&&"input"!==p[0].tagName.toLowerCase()||p.attr("disabled","disabled"),void 0!==p.attr("contenteditable")&&p.attr("contenteditable")&&p.removeAttr("contenteditable")):(p.removeClass("ta-readonly"),"textarea"===p[0].tagName.toLowerCase()||"input"===p[0].tagName.toLowerCase()?p.removeAttr("disabled"):k&&p.attr("contenteditable","true")),r.$watch(m.taReadonly,function(e,t){t!==e&&(e?(p.addClass("ta-readonly"),"textarea"!==p[0].tagName.toLowerCase()&&"input"!==p[0].tagName.toLowerCase()||p.attr("disabled","disabled"),void 0!==p.attr("contenteditable")&&p.attr("contenteditable")&&p.removeAttr("contenteditable"),angular.forEach(o,function(e){p.find(e).on("click",P)}),p.off("drop",le)):(p.removeClass("ta-readonly"),"textarea"===p[0].tagName.toLowerCase()||"input"===p[0].tagName.toLowerCase()?p.removeAttr("disabled"):k&&p.attr("contenteditable","true"),angular.forEach(o,function(e){p.find(e).off("click",P)}),p.on("drop",le)),x=e)})),k&&!x&&(angular.forEach(o,function(e){p.find(e).on("click",P)}),p.on("drop",le))}}}]);