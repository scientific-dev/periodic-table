var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function a(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function u(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function d(){return m(" ")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t){return""===t?null:+t}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e){t.value=null==e?"":e}function $(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function y(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}t.selectedIndex=-1}function x(t,e,n){t.classList[n?"add":"remove"](e)}let k;function w(t){k=t}function M(t){(function(){if(!k)throw new Error("Function called outside component initialization");return k})().$$.on_mount.push(t)}const H=[],_=[],C=[],E=[],R=Promise.resolve();let j=!1;function A(t){C.push(t)}const I=new Set;let O=0;function z(){const t=k;do{for(;O<H.length;){const t=H[O];O++,w(t),L(t.$$)}for(w(null),H.length=0,O=0;_.length;)_.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];I.has(e)||(I.add(e),e())}C.length=0}while(H.length);for(;E.length;)E.pop()();j=!1,I.clear(),w(t)}function L(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const N=new Set;let S;function B(){S={r:0,c:[],p:S}}function T(){S.r||o(S.c),S=S.p}function D(t,e){t&&t.i&&(N.delete(t),t.i(e))}function P(t,e,n,o){if(t&&t.o){if(N.has(t))return;N.add(t),S.c.push((()=>{N.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const F="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function q(t){t&&t.c()}function X(t,n,r,c){const{fragment:a,on_mount:s,on_destroy:i,after_update:u}=t.$$;a&&a.m(n,r),c||A((()=>{const n=s.map(e).filter(l);i?i.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(A)}function G(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(H.push(t),j||(j=!0,R.then(z)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function J(e,l,r,c,a,s,u,f=[-1]){const m=k;w(e);const d=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(m?m.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:l.target||m.$$.root};u&&u(d.root);let p=!1;if(d.ctx=r?r(e,l.props||{},((t,n,...o)=>{const l=o.length?o[0]:n;return d.ctx&&a(d.ctx[t],d.ctx[t]=l)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](l),p&&W(e,t)),n})):[],d.update(),p=!0,o(d.before_update),d.fragment=!!c&&c(d.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);d.fragment&&d.fragment.l(t),t.forEach(i)}else d.fragment&&d.fragment.c();l.intro&&D(e.$$.fragment),X(e,l.target,l.anchor,l.customElement),z()}w(m)}class K{$destroy(){G(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function V(t){let e,n,o,l,r,u,p;const h=t[4].default,b=function(t,e,n,o){if(t){const l=c(t,e,n,o);return t[0](l)}}(h,t,t[3],null);return{c(){e=f("div"),n=f("div"),o=f("h1"),l=m(t[1]),r=d(),u=f("p"),b&&b.c(),g(o,"class","m-0 svelte-1lxrfk8"),g(u,"class","svelte-1lxrfk8"),g(n,"class","logo-inner svelte-1lxrfk8"),g(e,"class","logo-main svelte-1lxrfk8"),$(e,"--size","min("+t[0]+"vh, "+t[0]+"vw)"),x(e,"center",t[2])},m(t,c){s(t,e,c),a(e,n),a(n,o),a(o,l),a(n,r),a(n,u),b&&b.m(u,null),p=!0},p(t,[n]){(!p||2&n)&&v(l,t[1]),b&&b.p&&(!p||8&n)&&function(t,e,n,o,l,r){if(l){const a=c(e,n,o,r);t.p(a,l)}}(b,h,t,t[3],p?function(t,e,n,o){if(t[2]&&o){const l=t[2](o(n));if(void 0===e.dirty)return l;if("object"==typeof l){const t=[],n=Math.max(e.dirty.length,l.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|l[o];return t}return e.dirty|l}return e.dirty}(h,t[3],n,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[3]),null),(!p||1&n)&&$(e,"--size","min("+t[0]+"vh, "+t[0]+"vw)"),4&n&&x(e,"center",t[2])},i(t){p||(D(b,t),p=!0)},o(t){P(b,t),p=!1},d(t){t&&i(e),b&&b.d(t)}}}function Q(t,e,n){let{$$slots:o={},$$scope:l}=e,{size:r=50,title:c,center:a}=e;return t.$$set=t=>{"size"in t&&n(0,r=t.size),"title"in t&&n(1,c=t.title),"center"in t&&n(2,a=t.center),"$$scope"in t&&n(3,l=t.$$scope)},[r,c,a,l,o]}class U extends K{constructor(t){super(),J(this,t,Q,V,r,{size:0,title:1,center:2})}}var Y,Z,tt=(Y=function(t){var e,n=Object.defineProperty,o=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,r=Object.prototype.hasOwnProperty,c=(t,e)=>n(t,"name",{value:e,configurable:!0}),a=(e="undefined"!=typeof WeakMap?new WeakMap:0,(t,c)=>e&&e.get(t)||(c=((t,e,c,a)=>{if(e&&"object"==typeof e||"function"==typeof e)for(let s of l(e))!r.call(t,s)&&(c||"default"!==s)&&n(t,s,{get:()=>e[s],enumerable:!(a=o(e,s))||a.enumerable});return t})((t=>n(t,"__esModule",{value:!0}))({}),t,1),e&&e.set(t,c),c)),s={};((t,e)=>{for(var o in e)n(t,o,{get:e[o],enumerable:!0})})(s,{ColorResult:()=>M,ansi16:()=>b,ansi256:()=>$,apple:()=>x,breakHex:()=>C,cmyk:()=>p,complement:()=>S,darken:()=>q,desaturate:()=>T,formatHex:()=>_,gray:()=>y,grayscale:()=>D,hex:()=>i,hsl:()=>m,hsv:()=>f,hue:()=>N,hwb:()=>d,invert:()=>L,lab:()=>h,lch:()=>v,lighten:()=>F,mixColor:()=>P,padHex:()=>E,random:()=>A,randomHex:()=>I,rawHex:()=>H,rgb:()=>u,saturate:()=>B,xyz:()=>g});var i,u,f,m,d,p,g,h,v,b,$,y,x,k=c((t=>"string"==typeof t?R(t):t),"RGB"),w=c((t=>Math.floor(Math.random()*t)),"RANDOM"),M=class{constructor(t){this.rgb=t}get hex(){return j(this.rgb)}valueOf(){return this.hex}};function H(t){if("#"==t[0]&&(t=t.slice(1)),t.length>=6)return t.slice(0,6);if(3==t.length){let e="";for(let n=0;n<t.length;n++)e+=`${t[n]}${t[n]}`;return e}return"000000"}function _(t){return`#${H(t)}`}function C(t){let e=parseInt(t,16);return[e>>16,e>>8&255,255&e]}function E(t){let e=Math.round(t).toString(16);return`${1==e.length?"0":""}${e}`}function R(t){return C(H(t))}function j([t,e,n,o]){return`#${E(t)}${E(e)}${E(n)}${o?E(255*o):""}`}function A(){return[w(255),w(255),w(255)]}function I(){return`#${w(16777215).toString(16)}`}function O(t){return parseFloat(t.toFixed(1))}function z(t,e){let n=u.toHsv("string"==typeof t?R(t):t);return e(n),new M(f.toRgb(n))}function L(t){let[e,n,o]=k(t);return new M([255-e,255-n,255-o])}function N(t,e=30){return e>360&&(e%=360),z(t,(t=>t[0]+=e))}function S(t){return N(t,180)}function B(t,e=20){return z(t,(t=>{let n=t[1]+e;n>100?n=100:n<0&&(n=0),t[1]=n}))}function T(t,e=20){return B(t,-e)}function D(t){let[e,n,o]=k(t),l=Math.floor((e+n+o)/765*100);return new M([l,l,l])}function P(t,e,n=.5){let o=[0,0,0],l=k(t),r=k(e);for(let t=0;t<3;t++)o[t]=l[t]*n+r[t]*(1-n);return new M(o)}function F(t,e=10){let n=k(t);e*=2.55;for(let t=0;t<3;t++)n[t]+=e,n[t]>255?n[t]=255:n[t]<0&&(n[t]=0);return new M(n)}function q(t,e=20){return F(t,-e)}c(M,"ColorResult"),c(H,"rawHex"),c(_,"formatHex"),c(C,"breakHex"),c(E,"padHex"),c(R,"hexToRgb"),c(j,"rgbToHex"),c(A,"random"),c(I,"randomHex"),c(O,"fixedFloat"),(t=>{function e(e){let n=Math.min(e,t.HEX_MAX).toString(16);return`#${"0".repeat(6-n.length)}${n}`}function n(e){return Math.min(parseInt(H(e),16),t.HEX_MAX)}t.HEX_MAX=16777215,t.toRgb=R,t.fromInt=e,c(e,"fromInt"),t.toInt=n,c(n,"toInt")})(i||(i={})),(t=>{function e([t,e,n]){t/=255,e/=255,n/=255;let o=Math.min(t,e,n),l=Math.max(t,e,n);if(o==l)return[0,0,O(100*o)];let r=l-o;return[u([t,e,n],l,o),O(100*r/l),O(100*l)]}function n([t,e,n]){t/=255,e/=255,n/=255;let o=Math.min(t,e,n),l=Math.max(t,e,n),r=l-o,c=(l+o)/2,a=0,s=0;return l!=o&&(s=l==o?0:r/(c>.5?2-r:l+o),a=u([t,e,n],l,o)),[a,O(100*s),O(100*c)]}function o([t,e,n]){let o=Math.min(t,e,n),l=Math.max(t,e,n);return[u([t,e,n],l,o),O(100/255*o),O(100*(1-1/255*l))]}function l([t,e,n]){let o=1-t/255,l=1-e/255,r=1-n/255,a=Math.min(o,l,r),s=1-a,i=c((t=>O((t-a)/s*255)||0),"f");return[i(o),i(l),i(r),O(255*a)]}function r([t,n,o],l=null){if(!(l=Math.round(("number"==typeof l?l:e([t,n,o])[2])/50)))return 30;let r=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(t/255));return 2==l&&(r+=60),r}function a([t,e,n]){return t>>4==e>>4&&e>>4==n>>4?t<8?16:t>248?231:Math.round((t-8)/247*24)+232:16+36*Math.round(t/255*5)+6*Math.round(e/255*5)+Math.round(n/255*5)}function s([t,e,n]){let o=c((t=>(t/=255)>.04045?((t+.055)/1.055)**2.4:t/12.92),"f");return[100*(.4124564*(t=o(t))+.3575761*(e=o(e))+.1804375*(n=o(n))),100*(.2126729*t+.7151522*e+.072175*n),100*(.0193339*t+.119192*e+.9503041*n)]}function i(t){return g.toLab(s(t))}function u([t,e,n],o,l){(!l||!o)&&(o=Math.max(t,e,n),l=Math.min(t,e,n));let r=t==l,c=n==l;return O(60*((r?3:c?1:5)-(r?e-n:c?t-e:n-t)/(o-l)))||0}function f([t,e,n]){return O((t+e+n)/765*100)}function m(t){return t.map((t=>O(t/255*65535)))}t.toHex=j,t.toHsv=e,c(e,"toHsv"),t.toHsl=n,c(n,"toHsl"),t.toHwb=o,c(o,"toHwb"),t.toCmyk=l,c(l,"toCmyk"),t.toAnsi16=r,c(r,"toAnsi16"),t.toAnsi256=a,c(a,"toAnsi256"),t.toXyz=s,c(s,"toXyz"),t.toLab=i,c(i,"toLab"),t.toHue=u,c(u,"toHue"),t.toGray=f,c(f,"toGray"),t.toApple=m,c(m,"toApple")})(u||(u={})),(t=>{function e([t,e,n]){e/=100,n/=100;let o=[0,0,0],l=Math.floor(t/60%6),r=t/60-l,c=n*(1-e),a=n*(1-r*e),s=n*(1-(1-r)*e);switch(l%6){case 0:o=[n,s,c];break;case 1:o=[a,n,c];break;case 2:o=[c,n,s];break;case 3:o=[c,a,n];break;case 4:o=[s,c,n];break;case 5:o=[n,c,a]}return o.map((t=>O(255*t)))}function n(t){return j(e(t))}function o([t,e,n]){e/=100,n/=100;let o=Math.max(.01,n),l=(2-e)*n,r=(2-e)*o;return[t,O(e*o/(r>1?2-r:r)*100),O(50*l)]}t.toRgb=e,c(e,"toRgb"),t.toHex=n,c(n,"toHex"),t.toHsl=o,c(o,"toHsl")})(f||(f={})),(t=>{function e([t,e,n]){e/=100,n/=100;let o=c((e=>(e+t/30)%12),"k"),l=e*Math.min(n,1-n),r=c((t=>O(255*(n-l*Math.max(-1,Math.min(o(t)-3,Math.min(9-o(t),1)))))),"f");return[r(0),r(8),r(4)]}function n([t,e,n]){e/=100,n/=100;let o=Math.max(.01,n),l=e;l*=o>1?2-o:o;let r=((n*=2)+(e*=n>1?2-n:n))/2;return[t,O(100*(0==n?2*l/(o+l):2*e/(n+e))),O(100*r)]}function o(t){return j(e(t))}t.toRgb=e,c(e,"toRgb"),t.toHsv=n,c(n,"toHsv"),t.toHex=o,c(o,"toHex")})(m||(m={})),(t=>{function e([t,e,n]){return m.toRgb([t,100,50]).map((t=>t*(100-e-n)/100+e))}t.toRgb=e,c(e,"toRgb")})(d||(d={})),(t=>{function e([t,e,n,o]){t/=100,e/=100,n/=100;let l=1-(o/=100),r=c((t=>O(255*(1-(t*l+o)))),"f");return[r(t),r(e),r(n)]}function n(t){return u.toCmyk(m.toRgb(t))}t.toRgb=e,c(e,"toRgb"),t.toHex=n,c(n,"toHex")})(p||(p={})),(t=>{function e([t,e,n]){t/=100,e/=100,n/=100;let o=c((t=>(t=t>.0031308?1.055*t**(1/2.4)-.055:12.92*t,O(255*Math.min(Math.max(0,t),1)))),"f");return[o(3.2404542*t+-1.5371385*e+-.4985314*n),o(-.969266*t+1.8760108*e+.041556*n),o(.0556434*t+-.2040259*e+1.0572252*n)]}function n([t,e,n]){let o=c((t=>t>.008856?t**(1/3):7.787*t+16/116),"f");return t=o(t/95.047),[116*(e=o(e/100))-16,500*(t-e),200*(e-(n=o(n/108.883)))]}t.toRgb=e,c(e,"toRgb"),t.toLab=n,c(n,"toLab")})(g||(g={})),(t=>{function e(t){return g.toRgb(n(t))}function n([t,e,n]){let o=(t+16)/116,l=e/500+o,r=o-n/200,a=c((t=>{let e=t**3;return e>.008856?e:(t-16/116)/7.787}),"f");return[95.047*a(l),100*a(o),108.883*a(r)]}function o([t,e,n]){let o=360*Math.atan2(n,e)/2/Math.PI;return o<0&&(o+=360),[t,Math.sqrt(e*e+n*n),o]}t.toRgb=e,c(e,"toRgb"),t.toXyz=n,c(n,"toXyz"),t.toLch=o,c(o,"toLch")})(h||(h={})),(t=>{function e([t,e,n]){let o=n/360*2*Math.PI;return[t,e*Math.cos(o),e*Math.sin(o)]}t.toLab=e,c(e,"toLab")})(v||(v={})),(t=>{function e(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e/=2677.5,[e,e,e];let n=.5*(1+~~(t>50));return[O((1&e)*n*255),O((e>>1&1)*n*255),O((e>>2&1)*n*255)]}t.toRgb=e,c(e,"toRgb")})(b||(b={})),(t=>{function e(t){if(t>=232){let e=10*(t-232)+8;return[e,e,e]}let e=(t-=16)%36;return[O(Math.floor(t/36)/5*255),O(Math.floor(e/6)/5*255),O(e%6/5*255)]}t.toRgb=e,c(e,"toRgb")})($||($={})),(t=>{function e(t){let e=O(t/100*255);return[e,e,e]}function n(t){let e=255&Math.round(t/100*255);return i.fromInt((e<<16)+(e<<8)+e)}t.toHsl=c((t=>[0,0,t]),"toHsl"),t.toHsv=c((t=>[0,0,t]),"toHsv"),t.toHwb=c((t=>[0,100,t]),"toHwb"),t.toCmyk=c((t=>[0,0,0,100-t]),"toCmyk"),t.toLab=c((t=>[t,0,0]),"toLab"),t.toRgb=e,c(e,"toRgb"),t.toHex=n,c(n,"toHex")})(y||(y={})),(t=>{function e(t){return t.map((t=>O(t/65535*255)))}t.toRgb=e,c(e,"toRgb")})(x||(x={})),c(z,"useHSV"),c(L,"invert"),c(N,"hue"),c(S,"complement"),c(B,"saturate"),c(T,"desaturate"),c(D,"grayscale"),c(P,"mixColor"),c(F,"lighten"),c(q,"darken"),t.exports=a(s)},Y(Z={exports:{}},Z.exports),Z.exports);const et={solid:"white",liquid:"#a3ccff",gas:"#ffa49e",unknown:"#d4d4d4"},nt=Object.fromEntries(Object.entries(et).map((t=>t.reverse()))),ot=Object.fromEntries(["alkali metal","alkaline earth metal","lanthanide","actinide","post-transition metal","transition metal","noble gas","metalloid","polyatomic nonmetal","diatomic nonmetal","unknown"].map((t=>[t,`var(--${t.replace(/ /g,"-")}-series)`]))),lt=["alkali metal","alkaline earth metal","lanthanide","actinide","transition metal","post-transition metal"],rt=["polyatomic nonmetal","diatomic nonmetal","noble gas"],ct=["n","am","d","b","m","mh","ep"],at={n:[1,119],am:[1.008,315],d:[0,40.7],b:[0,5869],m:[0,3823],mh:[0,62.7],ep:[0,3.98]},st={n:"Atomic Number",apprnc:"Appearance",ctg:"Category",clr:"Color",sym:"Symbol",am:"Atomic Mass",by:"Discovered By",nby:"Named by",d:"Density",b:"Boiling Point",m:"Melting Point",mh:"Molar Heat",p:"Period",phase:"Phase",shls:"Shells",ec:"Electronic Configuration",ecs:"Electronic Configuration Semantic",ea:"Electronic Affinity",ie:"Ionization Energies",ep:"Electronegativity Pauling"},it=t=>t?`${t}K (${parseFloat((t-273).toFixed(2))}°C) `:"No Data Available",ut={shls:t=>t?.join(", ")||"No Data Available",b:it,m:it,d:t=>t?`${t} kg/m³`:"No Data Available",c:t=>t||"No Color",ie:t=>t?.join(", ")||"No Data Available",am:t=>`${t.toString()} u`};function ft(t,e){return ut[t]?ut[t](e):e||"No Data Available"}function mt(e){let n,o,l,r,c,u,h,b,y,x,k,w,M,H,_,C=e[0].n+"",E=e[0].sym+"",R=e[0].nm+"",j=(parseFloat(e[0].am.toFixed(2))||"")+"";return{c(){n=f("div"),o=f("p"),l=m(C),r=d(),c=f("h3"),u=m(E),h=d(),b=f("h4"),y=m(R),x=d(),k=f("h5"),w=m(j),g(o,"class","svelte-eq0jc2"),g(c,"class","svelte-eq0jc2"),g(b,"class","svelte-eq0jc2"),g(k,"class","svelte-eq0jc2"),g(n,"class","element transition svelte-eq0jc2"),$(n,"--fg",e[2]),$(n,"background-color",ot[e[0].ctg]||ot.unknown),g(n,"id",M="elem-"+e[0].sym)},m(t,i){s(t,n,i),a(n,o),a(o,l),a(n,r),a(n,c),a(c,u),a(n,h),a(n,b),a(b,y),a(n,x),a(n,k),a(k,w),H||(_=p(n,"click",e[3]),H=!0)},p(t,[e]){1&e&&C!==(C=t[0].n+"")&&v(l,C),1&e&&E!==(E=t[0].sym+"")&&v(u,E),1&e&&R!==(R=t[0].nm+"")&&v(y,R),1&e&&j!==(j=(parseFloat(t[0].am.toFixed(2))||"")+"")&&v(w,j),4&e&&$(n,"--fg",t[2]),1&e&&$(n,"background-color",ot[t[0].ctg]||ot.unknown),1&e&&M!==(M="elem-"+t[0].sym)&&g(n,"id",M)},i:t,o:t,d(t){t&&i(n),H=!1,_()}}}function dt(t,e,n){let{element:o,handler:l,fg:r="white"}=e;return t.$$set=t=>{"element"in t&&n(0,o=t.element),"handler"in t&&n(1,l=t.handler),"fg"in t&&n(2,r=t.fg)},[o,l,r,()=>l(o)]}class pt extends K{constructor(t){super(),J(this,t,dt,mt,r,{element:0,handler:1,fg:2})}}function gt(t,e,n){const o=t.slice();return o[4]=e[n],o[6]=n,o}function ht(t,e,n){const o=t.slice();return o[7]=e[n],o}function vt(t,e,n){const o=t.slice();return o[10]=e[n],o[6]=n,o}function bt(e){let n,o,l,r,c=e[6]+1+"";return{c(){n=f("div"),o=f("p"),l=m(c),r=d(),g(o,"class","svelte-z2mm6o"),g(n,"class","index ix svelte-z2mm6o")},m(t,e){s(t,n,e),a(n,o),a(o,l),a(n,r)},p:t,d(t){t&&i(n)}}}function $t(e){let n;return{c(){n=f("div"),g(n,"class","empty-element svelte-z2mm6o")},m(t,e){s(t,n,e)},p:t,i:t,o:t,d(t){t&&i(n)}}}function yt(t){let e,n;return e=new pt({props:{handler:t[0],element:t[7]}}),{c(){q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.handler=t[0]),2&n&&(o.element=t[7]),e.$set(o)},i(t){n||(D(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function xt(t){let e,n,o,l;const r=[yt,$t],c=[];function a(t,e){return t[7]?0:1}return e=a(t),n=c[e]=r[e](t),{c(){n.c(),o=m("")},m(t,n){c[e].m(t,n),s(t,o,n),l=!0},p(t,l){let s=e;e=a(t),e===s?c[e].p(t,l):(B(),P(c[s],1,1,(()=>{c[s]=null})),T(),n=c[e],n?n.p(t,l):(n=c[e]=r[e](t),n.c()),D(n,1),n.m(o.parentNode,o))},i(t){l||(D(n),l=!0)},o(t){P(n),l=!1},d(t){c[e].d(t),t&&i(o)}}}function kt(t){let e,n,o,l,r,c,p,h,v=t[2](t[6])+"",b=t[4],$=[];for(let e=0;e<b.length;e+=1)$[e]=xt(ht(t,b,e));const y=t=>P($[t],1,1,(()=>{$[t]=null}));return{c(){e=f("div"),n=f("div"),o=f("p"),l=m(v),r=d();for(let t=0;t<$.length;t+=1)$[t].c();c=d(),g(o,"class","svelte-z2mm6o"),g(n,"class","index iy svelte-z2mm6o"),g(e,"class",p="row r-"+t[6]+" svelte-z2mm6o")},m(t,i){s(t,e,i),a(e,n),a(n,o),a(o,l),a(e,r);for(let t=0;t<$.length;t+=1)$[t].m(e,null);a(e,c),h=!0},p(t,n){if(3&n){let o;for(b=t[4],o=0;o<b.length;o+=1){const l=ht(t,b,o);$[o]?($[o].p(l,n),D($[o],1)):($[o]=xt(l),$[o].c(),D($[o],1),$[o].m(e,c))}for(B(),o=b.length;o<$.length;o+=1)y(o);T()}},i(t){if(!h){for(let t=0;t<b.length;t+=1)D($[t]);h=!0}},o(t){$=$.filter(Boolean);for(let t=0;t<$.length;t+=1)P($[t]);h=!1},d(t){t&&i(e),u($,t)}}}function wt(t){let e,n,o,l,r,c=Array(18),m=[];for(let e=0;e<c.length;e+=1)m[e]=bt(vt(t,c,e));let p=t[1],h=[];for(let e=0;e<p.length;e+=1)h[e]=kt(gt(t,p,e));const v=t=>P(h[t],1,1,(()=>{h[t]=null}));return{c(){e=f("div"),n=f("div"),o=f("div");for(let t=0;t<m.length;t+=1)m[t].c();l=d();for(let t=0;t<h.length;t+=1)h[t].c();g(o,"class","row svelte-z2mm6o"),$(o,"margin-left","calc(var(--font-size) + 6px)"),g(n,"class","table svelte-z2mm6o"),g(e,"class","table-wrapper svelte-z2mm6o")},m(t,c){s(t,e,c),a(e,n),a(n,o);for(let t=0;t<m.length;t+=1)m[t].m(o,null);a(n,l);for(let t=0;t<h.length;t+=1)h[t].m(n,null);r=!0},p(t,[e]){if(7&e){let o;for(p=t[1],o=0;o<p.length;o+=1){const l=gt(t,p,o);h[o]?(h[o].p(l,e),D(h[o],1)):(h[o]=kt(l),h[o].c(),D(h[o],1),h[o].m(n,null))}for(B(),o=p.length;o<h.length;o+=1)v(o);T()}},i(t){if(!r){for(let t=0;t<p.length;t+=1)D(h[t]);r=!0}},o(t){h=h.filter(Boolean);for(let t=0;t<h.length;t+=1)P(h[t]);r=!1},d(t){t&&i(e),u(m,t),u(h,t)}}}function Mt(t,e,n){let{elements:o,displayElementHandler:l}=e,r=[];return t.$$set=t=>{"elements"in t&&n(3,o=t.elements),"displayElementHandler"in t&&n(0,l=t.displayElementHandler)},t.$$.update=()=>{if(10&t.$$.dirty){for(let t=0;t<o.length;t++){let e=o[t],l=r[e.cors[1]-1];l?l[e.cors[0]-1]=e:(l=[],l[e.cors[0]-1]=e,n(1,r[e.cors[1]-1]=l,r))}n(1,r[5][2]={n:"57-71",nm:"Lanthanides",sym:"Ln ",ctg:"lanthanide",am:0},r),n(1,r[6][2]={n:"89-103",nm:"Actinides",sym:"Ac ",ctg:"actinide",am:0},r)}},[l,r,t=>7==t?"?":t>7?t-2:t+1,o]}class Ht extends K{constructor(t){super(),J(this,t,Mt,wt,r,{elements:3,displayElementHandler:0})}}function _t(t,e,n){const o=t.slice();return o[4]=e[n],o}function Ct(e){let n,o,l,r,c=e[4]+"";return{c(){n=f("option"),o=m(c),g(n,"label",l=st[e[4]]),n.__value=r=e[4],n.value=n.__value},m(t,e){s(t,n,e),a(n,o)},p:t,d(t){t&&i(n)}}}function Et(e){let n,o,l,r,c,m,h,v=ct,b=[];for(let t=0;t<v.length;t+=1)b[t]=Ct(_t(e,v,t));return{c(){n=f("div"),o=f("p"),o.textContent="Mode:",l=d(),r=f("select"),c=f("option"),c.textContent="default";for(let t=0;t<b.length;t+=1)b[t].c();$(o,"margin-top","1px"),g(o,"class","svelte-ouigpv"),g(c,"label","Default"),g(c,"default",""),c.__value="default",c.value=c.__value,g(r,"id","mode-select"),g(r,"class","svelte-ouigpv"),void 0===e[0]&&A((()=>e[3].call(r))),g(n,"class","mode-box flex flex-nowrap svelte-ouigpv")},m(t,i){s(t,n,i),a(n,o),a(n,l),a(n,r),a(r,c);for(let t=0;t<b.length;t+=1)b[t].m(r,null);y(r,e[0]),m||(h=p(r,"change",e[3]),m=!0)},p(t,[e]){if(0&e){let n;for(v=ct,n=0;n<v.length;n+=1){const o=_t(t,v,n);b[n]?b[n].p(o,e):(b[n]=Ct(o),b[n].c(),b[n].m(r,null))}for(;n<b.length;n+=1)b[n].d(1);b.length=v.length}1&e&&y(r,t[0])},i:t,o:t,d(t){t&&i(n),u(b,t),m=!1,h()}}}function Rt(t,e,n){let o,l,{onChange:r=(()=>{})}=e;return M((()=>n(2,l=!0))),t.$$set=t=>{"onChange"in t&&n(1,r=t.onChange)},t.$$.update=()=>{7&t.$$.dirty&&l&&r(o)},[o,r,l,function(){o=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(0,o)}]}class jt extends K{constructor(t){super(),J(this,t,Rt,Et,r,{onChange:1})}}const{window:At}=F;function It(t,e,n){const o=t.slice();return o[26]=e[n][0],o[27]=e[n][1],o}function Ot(t,e,n){const o=t.slice();return o[30]=e[n][0],o[27]=e[n][1],o}function zt(t,e,n){const o=t.slice();return o[33]=e[n][0],o[30]=e[n][1],o}function Lt(t){let e,n,o,r,c,u,h,b,$,y,x=t[30]+"",k=ft(t[33],t[3][t[33]])+"";return{c(){e=f("span"),n=f("p"),o=m(x),r=m(":"),c=d(),u=f("p"),h=m(k),b=d(),g(n,"class","strong svelte-8rc52a"),g(u,"class","svelte-8rc52a"),g(e,"class","transition svelte-8rc52a")},m(i,f){s(i,e,f),a(e,n),a(n,o),a(n,r),a(e,c),a(e,u),a(u,h),a(e,b),$||(y=p(e,"click",(function(){l(ct.includes(t[33])?t[11](t[33]):t[5]=!1)&&(ct.includes(t[33])?t[11](t[33]):t[5]=!1).apply(this,arguments)})),$=!0)},p(e,n){t=e,16&n[0]&&x!==(x=t[30]+"")&&v(o,x),24&n[0]&&k!==(k=ft(t[33],t[3][t[33]])+"")&&v(h,k)},d(t){t&&i(e),$=!1,y()}}}function Nt(e){let n,o,l;return{c(){n=f("a"),n.textContent="Read more",g(n,"href","./#"),g(n,"class","svelte-8rc52a")},m(t,r){s(t,n,r),o||(l=p(n,"click",e[15]),o=!0)},p:t,d(t){t&&i(n),o=!1,l()}}}function St(t){let e,n,o,l,r,c,u;return{c(){e=f("a"),n=m("Read more from Wikipedia"),l=d(),r=f("a"),r.textContent="Read less",g(e,"href",o=t[3].src),g(e,"target","_blank"),g(e,"class","svelte-8rc52a"),g(r,"href","./#"),g(r,"class","svelte-8rc52a")},m(o,i){s(o,e,i),a(e,n),s(o,l,i),s(o,r,i),c||(u=p(r,"click",t[14]),c=!0)},p(t,n){8&n[0]&&o!==(o=t[3].src)&&g(e,"href",o)},d(t){t&&i(e),t&&i(l),t&&i(r),c=!1,u()}}}function Bt(t){let e,n,o,l,r=t[30]+"";function c(){return t[16](t[30])}return{c(){e=f("span"),n=m(r),g(e,"class","item svelte-8rc52a"),$(e,"background-color",t[27])},m(t,r){s(t,e,r),a(e,n),o||(l=p(e,"click",c),o=!0)},p(e,n){t=e},d(t){t&&i(e),o=!1,l()}}}function Tt(t){let e,n,o,l,r,c,u,h,v,b,y=t[26]+"";function x(){return t[19](t[26])}return{c(){e=f("span"),n=f("p"),n.textContent="1",o=d(),l=f("h3"),l.textContent="H",r=d(),c=f("p"),u=m(y),h=d(),g(n,"class","svelte-8rc52a"),g(l,"class","svelte-8rc52a"),g(c,"class","trim-text svelte-8rc52a"),g(e,"class","item-state svelte-8rc52a"),$(e,"color",t[27]),$(e,"background-color",ot["diatomic nonmetal"])},m(t,i){s(t,e,i),a(e,n),a(e,o),a(e,l),a(e,r),a(e,c),a(c,u),a(e,h),v||(b=p(e,"click",x),v=!0)},p(e,n){t=e},d(t){t&&i(e),v=!1,b()}}}function Dt(t){let e;return{c(){e=f("div"),e.innerHTML='<p class="svelte-8rc52a">Min</p> \n            <span class="svelte-8rc52a"></span> \n            <p class="svelte-8rc52a">Max</p>',g(e,"class","g-index svelte-8rc52a")},m(t,n){s(t,e,n)},d(t){t&&i(e)}}}function Pt(t){let e,n,l,r,c,y,x,k,w,M,H,_,C,E,R,j,A,I,O,z,L,N,S,B,T,F,W,J,K,V,Q,U,Y,Z,tt,nt,lt,rt,ct,at,it,ut,ft,mt,dt,pt,gt,ht,vt,bt=t[3].nm+"",$t=(t[3].des||"No Description Available")+"",yt=t[4]?Object.entries(st):Object.entries(st).slice(0,3),xt=[];for(let e=0;e<yt.length;e+=1)xt[e]=Lt(zt(t,yt,e));function kt(t,e){return t[4]?St:Nt}let wt=kt(t),Mt=wt(t),_t=Object.entries(ot).slice(0,-1),Ct=[];for(let e=0;e<_t.length;e+=1)Ct[e]=Bt(Ot(t,_t,e));let Et=Object.entries(et),Rt=[];for(let e=0;e<Et.length;e+=1)Rt[e]=Tt(It(t,Et,e));let Pt=t[5]&&Dt();return lt=new jt({props:{onChange:t[23]}}),ut=new Ht({props:{elements:t[0],displayElementHandler:t[7]}}),{c(){e=f("div"),n=f("div"),l=f("h3"),r=m(bt),c=d(),y=f("p"),x=m($t),k=d(),w=f("div");for(let t=0;t<xt.length;t+=1)xt[t].c();M=d(),H=f("div"),Mt.c(),_=d(),C=f("div");for(let t=0;t<Ct.length;t+=1)Ct[t].c();E=d(),R=f("span"),R.textContent="Metal",j=d(),A=f("span"),A.textContent="Non Metal",I=d(),O=f("br"),z=d(),L=f("div");for(let t=0;t<Rt.length;t+=1)Rt[t].c();N=d(),S=f("div"),B=f("input"),T=d(),F=f("div"),W=f("input"),J=d(),K=f("p"),K.textContent="K",V=d(),Q=f("div"),U=f("input"),Y=d(),Z=f("p"),Z.textContent="°C",tt=d(),Pt&&Pt.c(),nt=d(),q(lt.$$.fragment),rt=d(),ct=f("br"),at=d(),it=f("div"),q(ut.$$.fragment),ft=d(),mt=f("hr"),dt=d(),pt=f("div"),pt.innerHTML='<p class="m-0">Made by <a class="strong svelte-8rc52a" href="https://github.com/scientific-dev">TheSudarsanDev</a></p> \n        <p style="margin-top: 4px">TheSudarsanDev © 2022</p>',g(l,"class","m-0 svelte-8rc52a"),g(y,"class","svelte-8rc52a"),g(w,"class","values svelte-8rc52a"),$(H,"margin-top","20px"),g(H,"class","svelte-8rc52a"),g(n,"class","display-element svelte-8rc52a"),g(R,"class","item svelte-8rc52a"),$(R,"background-color","var(--btn-bg)"),$(R,"margin-right","-2px"),g(A,"class","item svelte-8rc52a"),$(A,"background-color","var(--btn-bg)"),g(L,"class","flex flex-wrap"),g(C,"class","series svelte-8rc52a"),g(B,"type","range"),g(B,"min","0"),g(B,"max","6000"),g(B,"default","0"),g(B,"class","svelte-8rc52a"),g(W,"type","number"),g(W,"min","0"),g(W,"max","6000"),g(W,"class","svelte-8rc52a"),g(K,"class","svelte-8rc52a"),g(F,"class","flex flex-nowrap svelte-8rc52a"),g(U,"type","number"),g(U,"min","-273"),g(U,"max","5727"),U.value=t[2],g(U,"class","svelte-8rc52a"),g(Z,"class","svelte-8rc52a"),g(Q,"class","flex flex-nowrap svelte-8rc52a"),g(S,"class","inputs flex flex-wrap svelte-8rc52a"),g(S,"id","table-scroll"),$(mt,"margin-top","40px"),g(pt,"class","footer svelte-8rc52a"),g(e,"class","main"),g(e,"id","main")},m(o,i){s(o,e,i),a(e,n),a(n,l),a(l,r),a(n,c),a(n,y),a(y,x),a(n,k),a(n,w);for(let t=0;t<xt.length;t+=1)xt[t].m(w,null);a(n,M),a(n,H),Mt.m(H,null),a(e,_),a(e,C);for(let t=0;t<Ct.length;t+=1)Ct[t].m(C,null);a(C,E),a(C,R),a(C,j),a(C,A),a(C,I),a(C,O),a(C,z),a(C,L);for(let t=0;t<Rt.length;t+=1)Rt[t].m(L,null);a(e,N),a(e,S),a(S,B),b(B,t[1]),a(S,T),a(S,F),a(F,W),b(W,t[1]),a(F,J),a(F,K),a(S,V),a(S,Q),a(Q,U),a(Q,Y),a(Q,Z),a(e,tt),Pt&&Pt.m(e,null),a(e,nt),X(lt,e,null),a(e,rt),a(e,ct),a(e,at),a(e,it),X(ut,it,null),a(e,ft),a(e,mt),a(e,dt),a(e,pt),gt=!0,ht||(vt=[p(At,"hashchange",t[6]),p(l,"click",t[13]),p(R,"click",t[17]),p(A,"click",t[18]),p(B,"change",t[20]),p(B,"input",t[20]),p(W,"input",t[21]),p(U,"input",t[22]),p(it,"click",t[10])],ht=!0)},p(t,n){if((!gt||8&n[0])&&bt!==(bt=t[3].nm+"")&&v(r,bt),(!gt||8&n[0])&&$t!==($t=(t[3].des||"No Description Available")+"")&&v(x,$t),2104&n[0]){let e;for(yt=t[4]?Object.entries(st):Object.entries(st).slice(0,3),e=0;e<yt.length;e+=1){const o=zt(t,yt,e);xt[e]?xt[e].p(o,n):(xt[e]=Lt(o),xt[e].c(),xt[e].m(w,null))}for(;e<xt.length;e+=1)xt[e].d(1);xt.length=yt.length}if(wt===(wt=kt(t))&&Mt?Mt.p(t,n):(Mt.d(1),Mt=wt(t),Mt&&(Mt.c(),Mt.m(H,null))),256&n[0]){let e;for(_t=Object.entries(ot).slice(0,-1),e=0;e<_t.length;e+=1){const o=Ot(t,_t,e);Ct[e]?Ct[e].p(o,n):(Ct[e]=Bt(o),Ct[e].c(),Ct[e].m(C,E))}for(;e<Ct.length;e+=1)Ct[e].d(1);Ct.length=_t.length}if(512&n[0]){let e;for(Et=Object.entries(et),e=0;e<Et.length;e+=1){const o=It(t,Et,e);Rt[e]?Rt[e].p(o,n):(Rt[e]=Tt(o),Rt[e].c(),Rt[e].m(L,null))}for(;e<Rt.length;e+=1)Rt[e].d(1);Rt.length=Et.length}2&n[0]&&b(B,t[1]),2&n[0]&&h(W.value)!==t[1]&&b(W,t[1]),(!gt||4&n[0]&&U.value!==t[2])&&(U.value=t[2]),t[5]?Pt||(Pt=Dt(),Pt.c(),Pt.m(e,nt)):Pt&&(Pt.d(1),Pt=null);const o={};1&n[0]&&(o.elements=t[0]),ut.$set(o)},i(t){gt||(D(lt.$$.fragment,t),D(ut.$$.fragment,t),gt=!0)},o(t){P(lt.$$.fragment,t),P(ut.$$.fragment,t),gt=!1},d(t){t&&i(e),u(xt,t),Mt.d(),u(Ct,t),u(Rt,t),Pt&&Pt.d(),G(lt),G(ut),ht=!1,o(vt)}}}function Ft(t=.5){["Ln ","Ac "].forEach((e=>{let n=document.getElementById(`elem-${e}`);n&&(n.style.opacity=t)}))}function qt(t,e,n){let{elements:o=[]}=e,l=0,r=-273,c=o[0],a=!1,s=null,i=null;function u(){let t=window.location.hash.slice(1).toLowerCase();if(t){let e=parseInt(t);if(isNaN(e))for(let e=0;e<o.length;e++)o[e].nm.toLowerCase()==t&&n(3,c=o[e]);else o[e]?n(3,c=o[e]):n(3,c=o[parseInt(localStorage.getItem("d_el")||"")-1]||o[0])}}function f(t){return t.b&&t.b<=l?et.gas:t.b&&t.m<=l?t.m?et.liquid:et.unknown:t.m&&t.m>l?et.solid:et.unknown}function m(){for(let t=0;t<o.length;t++){let e=o[t],n=document.getElementById(`elem-${e.sym}`);n&&(n.style.color=f(e))}}function d(t){Ft();for(let e=0;e<o.length;e++){let n=o[e];document.getElementById(`elem-${n.sym}`).style.opacity=t(n)?1:.5}}function p(t){n(12,s=t),Ft();for(let e=0;e<o.length;e++){let n=o[e];document.getElementById(`elem-${n.sym}`).style.opacity=nt[f(n)]==t?1:.5}}function g(){n(12,s=!1),Ft(1);let t=i?t=>{let e=o[t],n=document.getElementById(`elem-${e.sym}`);n.style.opacity=1,n.style.backgroundColor=ot[e.ctg]||ot.unknown}:t=>document.getElementById(`elem-${o[t].sym}`).style.opacity=1;n(5,i=!1),document.getElementById("mode-select").value="default";for(let e=0;e<o.length;e++)t(e)}function v(t){if(i==t)return g();let[e,l]=at[t]||[0,0];Ft(0),n(5,i=t);for(let e=0;e<o.length;e++){let n=o[e],r=document.getElementById(`elem-${n.sym}`),c=n[t];c?r.style.backgroundColor=tt.mixColor("#63a125","#000",(l-c)/l).hex:(r.style.opacity=.2,r.style.backgroundColor="#000")}document.getElementById("table-scroll").scrollIntoView()}M((()=>{m(),u()}));return t.$$set=t=>{"elements"in t&&n(0,o=t.elements)},t.$$.update=()=>{4098&t.$$.dirty[0]&&(m(),n(2,r=l-273),s&&p(s))},[o,l,r,c,a,i,u,function(t){n(3,c=t),window.scrollTo({top:0}),localStorage.setItem("d_el",t.n)},d,p,g,v,s,()=>window.open(c.src),()=>n(4,a=!1),()=>n(4,a=!0),t=>d((e=>e.ctg==t)),()=>d((t=>lt.includes(t.ctg))),()=>d((t=>rt.includes(t.ctg))),t=>p(t),function(){l=h(this.value),n(1,l)},function(){l=h(this.value),n(1,l)},t=>n(1,l=parseFloat(t.target.value)+273),t=>"default"==t?g():v(t)]}class Xt extends K{constructor(t){super(),J(this,t,qt,Pt,r,{elements:0},null,[-1,-1])}}function Gt(t){let e,n;return e=new Xt({props:{elements:Object.values(t[0])}}),{c(){q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.elements=Object.values(t[0])),e.$set(o)},i(t){n||(D(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function Wt(t){let e,n;return e=new U({props:{title:"500!",center:!0,$$slots:{default:[Kt]},$$scope:{ctx:t}}}),{c(){q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},p(t,n){const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(D(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function Jt(t){let e,n;return e=new U({props:{title:"Loading stuff...",center:!0,$$slots:{default:[Vt]},$$scope:{ctx:t}}}),{c(){q(e.$$.fragment)},m(t,o){X(e,t,o),n=!0},p(t,n){const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(D(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function Kt(t){let e;return{c(){e=m("Internal Server Error. Try to refresh this page and if you see this again, kindly report this issue to the developers of the site.")},m(t,n){s(t,e,n)},d(t){t&&i(e)}}}function Vt(t){let e;return{c(){e=m("It takes us some time to make the periodic table ready...")},m(t,n){s(t,e,n)},d(t){t&&i(e)}}}function Qt(t){let e,n,o,l,r,c,u,h,b,$,y,x,k,w,M,H=t[1]?"light":"dark";const _=[Jt,Wt,Gt],C=[];function E(t,e){return t[0]?"error"==t[0]?1:2:0}return y=E(t),x=C[y]=_[y](t),{c(){e=f("div"),n=f("h1"),n.textContent="The Periodic Table",o=d(),l=f("a"),r=m("Toggle to "),c=m(H),u=m(" mode?"),h=d(),b=f("hr"),$=d(),x.c(),g(n,"class","m-0 svelte-16fa7fn"),g(l,"href","./#"),g(l,"class","svelte-16fa7fn"),g(e,"class","main svelte-16fa7fn")},m(i,f){s(i,e,f),a(e,n),a(e,o),a(e,l),a(l,r),a(l,c),a(l,u),a(e,h),a(e,b),a(e,$),C[y].m(e,null),k=!0,w||(M=p(l,"click",t[3]),w=!0)},p(t,[n]){(!k||2&n)&&H!==(H=t[1]?"light":"dark")&&v(c,H);let o=y;y=E(t),y===o?C[y].p(t,n):(B(),P(C[o],1,1,(()=>{C[o]=null})),T(),x=C[y],x?x.p(t,n):(x=C[y]=_[y](t),x.c()),D(x,1),x.m(e,null))},i(t){k||(D(x),k=!0)},o(t){P(x),k=!1},d(t){t&&i(e),C[y].d(),w=!1,M()}}}function Ut(t,e,n){let o=null,l=!1;const r=()=>document.body.classList[l?"add":"remove"]("darkmode");M((()=>{n(1,l=Boolean(JSON.parse(localStorage.getItem("dark_mode")||"false"))),r()})),fetch("./elements.json").then((t=>t.json())).then((t=>n(0,o=t)),(()=>n(0,o="error")));return[o,l,r,()=>{n(1,l=!l),localStorage.setItem("dark_mode",JSON.stringify(l)),r()}]}return new class extends K{constructor(t){super(),J(this,t,Ut,Qt,r,{})}}({target:document.body})}();