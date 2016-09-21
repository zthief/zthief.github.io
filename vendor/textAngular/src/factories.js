angular.module("textAngular.factories",[]).factory("taBrowserTag",[function(){return function(e){return e?""===e?void 0===_browserDetect.ie?"div":_browserDetect.ie<=8?"P":"p":_browserDetect.ie<=8?e.toUpperCase():e:_browserDetect.ie<=8?"P":"p"}}]).factory("taApplyCustomRenderers",["taCustomRenderers","taDOM",function(e,t){return function(r){var n=angular.element("<div></div>");return n[0].innerHTML=r,angular.forEach(e,function(e){var r=[];e.selector&&""!==e.selector?r=n.find(e.selector):e.customAttribute&&""!==e.customAttribute&&(r=t.getByAttribute(n,e.customAttribute)),angular.forEach(r,function(t){t=angular.element(t),e.selector&&""!==e.selector&&e.customAttribute&&""!==e.customAttribute?void 0!==t.attr(e.customAttribute)&&e.renderLogic(t):e.renderLogic(t)})}),n[0].innerHTML}}]).factory("taFixChrome",function(){var e=function(e){if(!e||!angular.isString(e)||e.length<=0)return e;for(var t,r,n,i,a=/<([^>\/]+?)style=("([^\"]+)"|'([^']+)')([^>]*)>/gi,o=/<span class="Apple-converted-space">([^<]+)<\/span>/gi,s="",l=0;t=o.exec(e);)n=t[1],n=n.replace(/&nbsp;/gi," "),s+=e.substring(l,t.index)+n,l=t.index+t[0].length;for(l&&(s+=e.substring(l),e=s,s="",l=0);t=a.exec(e);)r=t[3]||t[4],r&&r.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;|color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/i)&&(r=r.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;|( |)color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|( |)background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/gi,""),i="<"+t[1].trim(),r.trim().length>0&&(i+=" style="+t[2].substring(0,1)+r+t[2].substring(0,1)),i+=t[5].trim()+">",s+=e.substring(l,t.index)+i,l=t.index+t[0].length);return s+=e.substring(l),l>0?s.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi,"$1"):e};return e}).factory("taSanitize",["$sanitize",function(e){function t(e,t){for(var r,n=0,i=0,a=/<[^>]*>/gi;r=a.exec(e);)if(i=r.index,"/"===r[0].substr(1,1)){if(0===n)break;n--}else n++;return t+e.substring(0,i)+angular.element(t)[0].outerHTML.substring(t.length)+e.substring(i)}function r(e){if(!e||!angular.isString(e)||e.length<=0)return e;for(var n,a,o,s,l,c,u=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,d="",f="",p=0;a=u.exec(e);){s=a[3]||a[4];var b=new RegExp(g,"i");if(angular.isString(s)&&b.test(s)){l="";for(var h=new RegExp(g,"ig");o=h.exec(s);)for(n=0;n<i.length;n++)o[2*n+2]&&(l+="<"+i[n].tag+">");c=r(e.substring(p,a.index)),f+=d.length>0?t(c,d):c,s=s.replace(new RegExp(g,"ig"),""),f+="<"+a[1].trim(),s.length>0&&(f+=' style="'+s+'"'),f+=a[5]+">",p=a.index+a[0].length,d=l}}return f+=d.length>0?t(e.substring(p),d):e.substring(p)}function n(e){if(!e||!angular.isString(e)||e.length<=0)return e;for(var t,r=/<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi,n="",i=0;t=r.exec(e);){n+=e.substring(i,t.index),i=t.index+t[0].length;var a="<"+t[1]+t[5];/style=("([^"]+)"|'([^']+)')/gi.test(a)?a=a.replace(/style=("([^"]+)"|'([^']+)')/i,'style="$2$3 text-align:'+(t[3]||t[4])+';"'):a+=' style="text-align:'+(t[3]||t[4])+';"',a+=">",n+=a}return n+e.substring(i)}for(var i=[{property:"font-weight",values:["bold"],tag:"b"},{property:"font-style",values:["italic"],tag:"i"}],a=[],o=0;o<i.length;o++){for(var s="("+i[o].property+":\\s*(",l=0;l<i[o].values.length;l++)l>0&&(s+="|"),s+=i[o].values[l];s+=");)",a.push(s)}var g="("+a.join("|")+")",c=new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/gi),u=new RegExp(/<span class="rangySelectionBoundary" id="selectionBoundary_\d+_\d+">[^<>]+?<\/span>/gi),d=new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/gi);return function(t,i,a){if(!a)try{t=r(t)}catch(o){}t=n(t),t&&(t=t.replace(c,""),t=t.replace(u,""),t=t.replace(c,""),t=t.replace(d,""));var s;try{s=e(t),a&&(s=t)}catch(o){s=i||""}var l,g=s.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),f=s.replace(/(&#(9|10);)*/gi,""),p=/<pre[^>]*>.*?<\/pre[^>]*>/gi,b=0,h=0;for(s="";null!==(l=p.exec(f))&&b<g.length;)s+=f.substring(h,l.index)+g[b],h=l.index+l[0].length,b++;return s+f.substring(h)}}]).factory("taToolExecuteAction",["$q","$log",function(e,t){return function(r){void 0!==r&&(this.$editor=function(){return r});var n,i=e.defer(),a=i.promise,o=this.$editor();try{n=this.action(i,o.startAction()),a["finally"](function(){o.endAction.call(o)})}catch(s){t.error(s)}(n||void 0===n)&&i.resolve()}}]);