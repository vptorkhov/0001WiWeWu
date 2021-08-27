// @fancyapps/ui/Panzoom v4.0.0-beta.3
const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),i=(...e)=>{let s=!1;"boolean"==typeof e[0]&&(s=e.shift());let n=e[0];if(!n||"object"!=typeof n)throw new Error("extendee must be an object");const o=e.slice(1),h=o.length;for(let e=0;e<h;e++){const h=o[e];for(let e in h)if(h.hasOwnProperty(e)){const o=h[e];if(s&&(Array.isArray(o)||t(o))){const t=Array.isArray(o)?[]:{};n[e]=i(!0,n.hasOwnProperty(e)?n[e]:t,o)}else n[e]=o}}return n},e=(t,i=1e4)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*i)/i),s="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t}observe(t){if(this.observables.some((i=>i.el===t)))return;const i={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(i)}unobserve(t){this.observables=this.observables.filter((i=>i.el!==t))}disconnect(){this.observables=[]}check(){const t=this.observables.filter((t=>{const i=t.el.clientHeight,e=t.el.clientWidth;if(t.size.height!==i||t.size.width!==e)return t.size.height=i,t.size.width=e,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck)}};class n{constructor(t){this.id=-1,this.id=t.pointerId||t.identifier||-1,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.nativePointer=t}}function o(t,i){return i?Math.sqrt((i.clientX-t.clientX)**2+(i.clientY-t.clientY)**2):0}function h(t,i){return i?{clientX:(t.clientX+i.clientX)/2,clientY:(t.clientY+i.clientY)/2}:t}class r{constructor(t,{start:i=(()=>!0),move:e=(()=>{}),end:s=(()=>{})}={}){this.element=t,this.startPointers=[],this.currentPointers=[],this.startCallback=i,this.moveCallback=e,this.endCallback=s,this.onStart=t=>{if(t.button&&0!==t.button)return;const i=new n(t);if(!1===this.startCallback(i,t))return!1;t.preventDefault(),(()=>{const t=window.getSelection?window.getSelection():document.selection;t&&t.rangeCount&&t.getRangeAt(0).getClientRects().length&&(t.removeAllRanges?t.removeAllRanges():t.empty&&t.empty())})(),this.currentPointers.push(i),this.startPointers.push(i);(t.target&&"setPointerCapture"in t.target?t.target:this.element).setPointerCapture(t.pointerId),this.element.addEventListener("pointermove",this.onMove),this.element.addEventListener("pointerup",this.onEnd),this.element.addEventListener("pointercancel",this.onEnd)},this.onMove=t=>{const i=this.currentPointers.slice(),e=[];for(const i of[new n(t)]){const t=this.currentPointers.findIndex((t=>t.id===i.id));t<0||(e.push(i),this.currentPointers[t]=i)}e.length&&this.moveCallback(i,this.currentPointers,t)},this.onEnd=t=>{const i=new n(t),e=this.currentPointers.findIndex((t=>t.id===i.id));if(-1===e)return!1;this.currentPointers.splice(e,1),this.startPointers.splice(e,1),this.endCallback(i,t),this.currentPointers.length||(this.element.removeEventListener("pointermove",this.onMove),this.element.removeEventListener("pointerup",this.onEnd),this.element.removeEventListener("pointercancel",this.onEnd))},this.element.addEventListener("pointerdown",this.onStart)}stop(){this.element.removeEventListener("pointerdown",this.onStart),this.element.removeEventListener("pointermove",this.onMove),this.element.removeEventListener("pointerup",this.onEnd),this.element.removeEventListener("pointercancel",this.onEnd)}}const a=function(t){return!(!t||t===document.body)&&(function(t){const i=window.getComputedStyle(t)["overflow-y"],e=window.getComputedStyle(t)["overflow-x"],s=("scroll"===i||"auto"===i)&&Math.abs(t.scrollHeight-t.clientHeight)>1,n=("scroll"===e||"auto"===e)&&Math.abs(t.scrollWidth-t.clientWidth)>1;return s||n}(t)?t:a(t.parentNode))};const c={touch:!0,zoom:!0,pinchToZoom:!0,panOnlyZoomed:!1,lockAxis:!1,friction:.64,decelFriction:.88,zoomFriction:.74,bounceForce:.2,baseScale:1,minScale:1,maxScale:2,step:.5,textSelection:!1,click:"toggleZoom",wheel:"zoom",wheelFactor:42,wheelLimit:5,draggableClass:"is-draggable",draggingClass:"is-dragging",ratio:1};class l extends class{constructor(t={}){this.options=i(!0,{},t),this.plugins=[],this.events={};for(const t of["on","once"])for(const i of Object.entries(this.options[t]||{}))this[t](...i)}option(t,i){t=String(t);let e=(s=t,n=this.options,s.split(".").reduce((function(t,i){return t&&t[i]}),n));var s,n;return"function"==typeof e&&(e=e.call(this,t)),void 0===e?i:e}localize(t,i=[]){return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,s)=>{let n=!1;if(n=s?this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${s}`):this.option(`l10n.${e}`),!n)return e;for(let t=0;t<i.length;t++)n=n.split(i[t][0]).join(i[t][1]);return n}))}on(i,e){if(t(i)){for(const t of Object.entries(i))this.on(...t);return this}return String(i).split(" ").forEach((t=>{const i=this.events[t]=this.events[t]||[];-1==i.indexOf(e)&&i.push(e)})),this}once(i,e){if(t(i)){for(const t of Object.entries(i))this.once(...t);return this}return String(i).split(" ").forEach((t=>{const i=(...s)=>{this.off(t,i),e.call(this,this,...s)};i._=e,this.on(t,i)})),this}off(i,e){if(!t(i))return i.split(" ").forEach((t=>{const i=this.events[t];if(!i||!i.length)return this;let s=-1;for(let t=0,n=i.length;t<n;t++){const n=i[t];if(n&&(n===e||n._===e)){s=t;break}}-1!=s&&i.splice(s,1)})),this;for(const t of Object.entries(i))this.off(...t)}trigger(t,...i){for(const e of[...this.events[t]||[]].slice())if(e&&!1===e.call(this,this,...i))return!1;for(const e of[...this.events["*"]||[]].slice())if(e&&!1===e.call(this,t,this,...i))return!1;return!0}attachPlugins(t){const e={};for(const[s,n]of Object.entries(t||{}))!1===this.options[s]||this.plugins[s]||(this.options[s]=i({},n.defaults||{},this.options[s]),e[s]=new n(this));for(const[t,i]of Object.entries(e))i.attach(this);return this.plugins=Object.assign({},this.plugins,e),this}detachPlugins(){for(const t in this.plugins){let i;(i=this.plugins[t])&&"function"==typeof i.detach&&i.detach(this)}return this.plugins={},this}}{constructor(t,e={}){super(i(!0,{},c,e)),this.state="init",this.$container=t;for(const t of["onLoad","onWheel","onClick"])this[t]=this[t].bind(this);this.initLayout(),this.resetValues(),this.attachPlugins(l.Plugins),this.trigger("init"),this.updateMetrics(),this.attachEvents(),this.trigger("ready"),!1===this.option("centerOnStart")?this.state="ready":this.panTo({friction:0})}initLayout(){const t=this.$container;if(!(t instanceof HTMLElement))throw new Error("Panzoom: Container not found");const i=this.option("content")||t.querySelector(".panzoom__content");if(!i)throw new Error("Panzoom: Content not found");this.$content=i;let e=this.option("viewport")||t.querySelector(".panzoom__viewport");e||!1===this.option("wrapInner")||(e=document.createElement("div"),e.classList.add("panzoom__viewport"),e.append(...t.childNodes),t.appendChild(e)),this.$viewport=e||i.parentNode}resetValues(){this.updateRate=this.option("updateRate",/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?250:24),this.container={width:0,height:0},this.viewport={width:0,height:0},this.content={origHeight:0,origWidth:0,width:0,height:0,x:this.option("x",0),y:this.option("y",0),scale:this.option("baseScale")},this.transform={x:0,y:0,scale:1},this.resetDragPosition()}onLoad(t){this.updateMetrics(),this.panTo({scale:this.option("baseScale"),friction:0}),this.trigger("load",t)}onClick(t){if(t.defaultPrevented)return;if(this.option("textSelection")&&window.getSelection().toString().length)return void t.stopPropagation();const i=this.$content.getClientRects()[0];if("ready"!==this.state&&(this.dragPosition.midPoint||Math.abs(i.top-this.dragStart.rect.top)>1||Math.abs(i.left-this.dragStart.rect.left)>1))return t.preventDefault(),void t.stopPropagation();!1!==this.trigger("click",t)&&this.option("zoom")&&"toggleZoom"===this.option("click")&&(t.preventDefault(),t.stopPropagation(),this.zoomWithClick(t))}onWheel(t){!1!==this.trigger("wheel",t)&&this.option("zoom")&&this.option("wheel")&&this.zoomWithWheel(t)}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);const i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)),e=this.content.scale;let s=e*(100+i*this.option("wheelFactor"))/100;if(i<0&&Math.abs(e-this.option("minScale"))<.01||i>0&&Math.abs(e-this.option("maxScale"))<.01?(this.changedDelta+=Math.abs(i),s=e):(this.changedDelta=0,s=Math.max(Math.min(s,this.option("maxScale")),this.option("minScale"))),this.changedDelta>this.option("wheelLimit"))return;if(t.preventDefault(),s===e)return;const n=this.$content.getBoundingClientRect(),o=t.clientX-n.left,h=t.clientY-n.top;this.zoomTo(s,{x:o,y:h})}zoomWithClick(t){const i=this.$content.getClientRects()[0],e=t.clientX-i.left,s=t.clientY-i.top;this.toggleZoom({x:e,y:s})}attachEvents(){this.$content.addEventListener("load",this.onLoad),this.$container.addEventListener("wheel",this.onWheel,{passive:!1}),this.$container.addEventListener("click",this.onClick,{passive:!1}),this.initObserver();const t=new r(this.$container,{start:(i,e)=>{if(!this.option("touch"))return!1;if(!(this.velocity.scale<0)){if(!t.currentPointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(e.target.nodeName))return!1;if(this.option("textSelection")&&((t,i,e)=>{const s=t.childNodes,n=document.createRange();for(let t=0;t<s.length;t++){const o=s[t];if(o.nodeType!==Node.TEXT_NODE)continue;n.selectNodeContents(o);const h=n.getBoundingClientRect();if(i>=h.left&&e>=h.top&&i<=h.right&&e<=h.bottom)return o}return!1})(e.target,e.clientX,e.clientY))return!1;if(a(e.target))return!1}return!1!==this.trigger("touchStart",e)&&(this.state="pointerdown",this.resetDragPosition(),this.dragPosition.midPoint=null,this.dragPosition.time=Date.now(),!0)}},move:(i,e,s)=>{if("pointerdown"!==this.state)return;if(0==this.trigger("touchMove",s))return void s.preventDefault();if(e.length<2&&1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale"))return;if(e.length>1&&(!this.option("zoom")||!1===this.option("pinchToZoom")))return;s.preventDefault(),s.stopPropagation();const n=h(i[0],i[1]),r=h(e[0],e[1]),a=r.clientX-n.clientX,c=r.clientY-n.clientY,l=o(i[0],i[1]),d=o(e[0],e[1]),g=l?d/l:1;this.dragOffset.x+=a,this.dragOffset.y+=c,this.dragOffset.scale*=g,this.dragOffset.time=Date.now()-this.dragPosition.time;const f=1===this.dragStart.scale&&this.option("lockAxis");if(f&&!this.lockAxis){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return;if("xy"===f){const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockAxis=t>45&&t<135?"y":"x"}else this.lockAxis=f}if(this.lockAxis&&(this.dragOffset["x"===this.lockAxis?"y":"x"]=0),this.$container.classList.add(this.option("draggingClass")),this.transform.scale===this.option("baseScale")&&"y"===this.lockAxis||(this.dragPosition.x=this.dragStart.x+this.dragOffset.x),this.transform.scale===this.option("baseScale")&&"x"===this.lockAxis||(this.dragPosition.y=this.dragStart.y+this.dragOffset.y),this.dragPosition.scale=this.dragStart.scale*this.dragOffset.scale,e.length>1){const i=h(t.startPointers[0],t.startPointers[1]),e=i.clientX-this.dragStart.rect.x,s=i.clientY-this.dragStart.rect.y,{deltaX:n,deltaY:o}=this.getZoomDelta(this.content.scale*this.dragOffset.scale,e,s);this.dragPosition.x-=n,this.dragPosition.y-=o,this.dragPosition.midPoint=r}else this.setDragResistance();this.transform={x:this.dragPosition.x,y:this.dragPosition.y,scale:this.dragPosition.scale},this.startAnimation()},end:(i,e)=>{if("pointerdown"!==this.state)return;if(this._dragOffset={...this.dragOffset},t.currentPointers.length)return void this.resetDragPosition();if(this.state="decel",this.friction=this.option("decelFriction"),this.recalculateTransform(),this.$container.classList.remove(this.option("draggingClass")),!1===this.trigger("touchEnd",e))return;if("decel"!==this.state)return;const s=this.option("minScale");if(this.transform.scale<s)return void this.zoomTo(s,{friction:.64});const n=this.option("maxScale");if(this.transform.scale-n>.01){const t=this.dragPosition.midPoint||i,e=this.$content.getClientRects()[0];this.zoomTo(n,{friction:.64,x:t.clientX-e.left,y:t.clientY-e.top})}else;}});this.pointerTracker=t}initObserver(){this.resizeObserver||(this.resizeObserver=new s((()=>{this.updateTimer||(this.updateTimer=setTimeout((()=>{const t=this.$container.getBoundingClientRect();t.width&&t.height?((Math.abs(t.width-this.container.width)>1||Math.abs(t.height-this.container.height)>1)&&(this.isAnimating()&&this.endAnimation(),this.updateMetrics(),this.panTo({x:this.content.x,y:this.content.y,scale:this.option("baseScale"),friction:0})),this.updateTimer=null):this.updateTimer=null}),this.updateRate))})),this.resizeObserver.observe(this.$container))}resetDragPosition(){this.lockAxis=null,this.friction=this.option("friction"),this.velocity={x:0,y:0,scale:0};const{x:t,y:i,scale:e}=this.content;this.dragStart={rect:this.$content.getBoundingClientRect(),x:t,y:i,scale:e},this.dragPosition={...this.dragPosition,x:t,y:i,scale:e},this.dragOffset={x:0,y:0,scale:1,time:0}}updateMetrics(t){!0!==t&&this.trigger("beforeUpdate");const i=this.$container,s=this.$content,n=this.$viewport,o=this.$content instanceof HTMLImageElement,h=this.option("zoom"),r=this.option("resizeParent",h);let a=(c=this.$content,Math.max(parseFloat(c.naturalWidth||0),parseFloat(c.width&&c.width.baseVal&&c.width.baseVal.value||0),parseFloat(c.offsetWidth||0),parseFloat(c.scrollWidth||0)));var c;let l=(t=>Math.max(parseFloat(t.naturalHeight||0),parseFloat(t.height&&t.height.baseVal&&t.height.baseVal.value||0),parseFloat(t.offsetHeight||0),parseFloat(t.scrollHeight||0)))(this.$content);Object.assign(s.style,{width:"",height:"",maxWidth:"",maxHeight:""}),r&&Object.assign(n.style,{width:"",height:""});const d=this.option("ratio");a=e(a*d),l=e(l*d);let g=a,f=l;const p=s.getBoundingClientRect(),m=n.getBoundingClientRect(),u=n==i?m:i.getBoundingClientRect();let v=Math.max(n.offsetWidth,e(m.width)),y=Math.max(n.offsetHeight,e(m.height)),b=window.getComputedStyle(n);if(v-=parseFloat(b.paddingLeft)+parseFloat(b.paddingRight),y-=parseFloat(b.paddingTop)+parseFloat(b.paddingBottom),this.viewport.width=v,this.viewport.height=y,h){if(Math.abs(a-p.width)>.1||Math.abs(l-p.height)>.1){const t=((t,i,e,s)=>{const n=Math.min(e/t||0,s/i);return{width:t*n||0,height:i*n||0}})(a,l,Math.min(a,p.width),Math.min(l,p.height));g=e(t.width),f=e(t.height)}Object.assign(s.style,{width:`${g}px`,height:`${f}px`,transform:""})}if(r&&(Object.assign(n.style,{width:`${g}px`,height:`${f}px`}),this.viewport={...this.viewport,width:g,height:f}),o&&h&&"function"!=typeof this.options.maxScale){const t=this.option("maxScale");this.options.maxScale=function(){return this.content.origWidth>0&&this.content.fitWidth>0?this.content.origWidth/this.content.fitWidth:t}}this.content={...this.content,origWidth:a,origHeight:l,fitWidth:g,fitHeight:f,width:g,height:f,scale:1,isZoomable:h},this.container={width:u.width,height:u.height},!0!==t&&this.trigger("afterUpdate")}zoomIn(t){this.zoomTo(this.content.scale+(t||this.option("step")))}zoomOut(t){this.zoomTo(this.content.scale-(t||this.option("step")))}toggleZoom(t={}){const i=this.option("maxScale"),e=this.option("baseScale"),s=this.content.scale>e+.5*(i-e)?e:i;this.zoomTo(s,t)}zoomTo(t=this.option("baseScale"),{x:i=null,y:s=null}={}){t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const n=e(this.content.scale/(this.content.width/this.content.fitWidth),1e7);null===i&&(i=this.content.width*n*.5),null===s&&(s=this.content.height*n*.5);const{deltaX:o,deltaY:h}=this.getZoomDelta(t,i,s);i=this.content.x-o,s=this.content.y-h,this.panTo({x:i,y:s,scale:t,friction:this.option("zoomFriction")})}getZoomDelta(t,i=0,e=0){const s=this.content.fitWidth*this.content.scale,n=this.content.fitHeight*this.content.scale,o=i>0&&s?i/s:0,h=e>0&&n?e/n:0;return{deltaX:(this.content.fitWidth*t-s)*o,deltaY:(this.content.fitHeight*t-n)*h}}panTo({x:t=this.content.x,y:i=this.content.y,scale:e,friction:s=this.option("friction"),ignoreBounds:n=!1}={}){if(e=e||this.content.scale||1,!n){const{boundX:s,boundY:n}=this.getBounds(e);s&&(t=Math.max(Math.min(t,s.to),s.from)),n&&(i=Math.max(Math.min(i,n.to),n.from))}this.friction=s,this.transform={x:t,y:i,scale:e},s?(this.state="panning",this.velocity={x:(1/this.friction-1)*(t-this.content.x),y:(1/this.friction-1)*(i-this.content.y),scale:(1/this.friction-1)*(e-this.content.scale)},this.startAnimation()):this.endAnimation()}startAnimation(){this.rAF?cancelAnimationFrame(this.rAF):this.trigger("startAnimation"),this.rAF=requestAnimationFrame((()=>this.animate()))}animate(){if(this.setEdgeForce(),this.setDragForce(),this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.content.x+=this.velocity.x,this.content.y+=this.velocity.y,this.content.scale+=this.velocity.scale,this.isAnimating())this.setTransform();else if("pointerdown"!==this.state)return this.endAnimation(),void this.trigger("endAnimation");this.rAF=requestAnimationFrame((()=>this.animate()))}getBounds(t){let i=this.boundX,s=this.boundY;if(void 0!==i&&void 0!==s)return{boundX:i,boundY:s};i={from:0,to:0},s={from:0,to:0},t=t||this.transform.scale;const n=this.content.fitWidth,o=this.content.fitHeight,h=n*t,r=o*t,a=this.viewport.width,c=this.viewport.height;if(n<=a){const t=.5*(a-h),s=.5*(h-n);i.from=e(t-s),i.to=e(t+s)}else i.from=e(a-h);if(o<=c){const t=.5*(c-r),i=.5*(r-o);s.from=e(t-i),s.to=e(t+i)}else s.from=e(c-h);return{boundX:i,boundY:s}}setEdgeForce(){if("decel"!==this.state)return;const t=this.option("bounceForce"),{boundX:i,boundY:e}=this.getBounds(Math.max(this.transform.scale,this.content.scale));let s,n,o,h;if(i&&(s=this.content.x<i.from,n=this.content.x>i.to),e&&(o=this.content.y<e.from,h=this.content.y>e.to),s||n){let e=((s?i.from:i.to)-this.content.x)*t;const n=this.content.x+(this.velocity.x+e)/this.friction;n>=i.from&&n<=i.to&&(e+=this.velocity.x),this.velocity.x=e,this.recalculateTransform()}if(o||h){let i=((o?e.from:e.to)-this.content.y)*t;const s=this.content.y+(i+this.velocity.y)/this.friction;s>=e.from&&s<=e.to&&(i+=this.velocity.y),this.velocity.y=i,this.recalculateTransform()}}setDragResistance(){if("pointerdown"!==this.state)return;const{boundX:t,boundY:i}=this.getBounds(this.dragPosition.scale);let e,s,n,o;if(t&&(e=this.dragPosition.x<t.from,s=this.dragPosition.x>t.to),i&&(n=this.dragPosition.y<i.from,o=this.dragPosition.y>i.to),(e||s)&&(!e||!s)){const i=e?t.from:t.to,s=i-this.dragPosition.x;this.dragPosition.x=i-.3*s}if((n||o)&&(!n||!o)){const t=n?i.from:i.to,e=t-this.dragPosition.y;this.dragPosition.y=t-.3*e}}setDragForce(){"pointerdown"===this.state&&(this.velocity.x=this.dragPosition.x-this.content.x,this.velocity.y=this.dragPosition.y-this.content.y,this.velocity.scale=this.dragPosition.scale-this.content.scale)}recalculateTransform(){this.transform.x=this.content.x+this.velocity.x/(1/this.friction-1),this.transform.y=this.content.y+this.velocity.y/(1/this.friction-1),this.transform.scale=this.content.scale+this.velocity.scale/(1/this.friction-1)}isAnimating(){return!(!this.friction||!(Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05))}setTransform(t){let i,s,n;if(t?(i=e(this.transform.x),s=e(this.transform.y),n=this.transform.scale,this.content={...this.content,x:i,y:s,scale:n}):(i=e(this.content.x),s=e(this.content.y),n=this.content.scale/(this.content.width/this.content.fitWidth),this.content={...this.content,x:i,y:s}),this.trigger("beforeTransform"),i=e(this.content.x),s=e(this.content.y),t&&this.option("zoom")){let t,o;t=e(this.content.fitWidth*n),o=e(this.content.fitHeight*n),this.content.width=t,this.content.height=o,this.transform={...this.transform,width:t,height:o,scale:n},Object.assign(this.$content.style,{width:`${t}px`,height:`${o}px`,maxWidth:"none",maxHeight:"none",transform:`translate3d(${i}px, ${s}px, 0) scale(1)`})}else this.$content.style.transform=`translate3d(${i}px, ${s}px, 0) scale(${n})`;this.trigger("afterTransform")}endAnimation(){cancelAnimationFrame(this.rAF),this.rAF=null,this.velocity={x:0,y:0,scale:0},this.setTransform(!0),this.state="ready",this.handleCursor()}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale")?this.$container.classList.remove(t):this.$container.classList.add(t))}detachEvents(){this.$content.removeEventListener("load",this.onLoad),this.$container.removeEventListener("wheel",this.onWheel,{passive:!1}),this.$container.removeEventListener("click",this.onClick,{passive:!1}),this.pointerTracker&&(this.pointerTracker.stop(),this.pointerTracker=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}destroy(){"destroy"!==this.state&&(this.state="destroy",clearTimeout(this.updateTimer),this.updateTimer=null,cancelAnimationFrame(this.rAF),this.rAF=null,this.detachEvents(),this.detachPlugins(),this.resetDragPosition())}}l.version="4.0.0-beta.3",l.Plugins={};export{l as Panzoom};
