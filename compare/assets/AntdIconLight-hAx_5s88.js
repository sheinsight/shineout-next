import{r as f,R as x}from"./registry-BHBdFNZN.js";import{c as j}from"./clsx-B-dksMZM.js";import{I as E}from"./Context-dQBo8d_Z.js";const R="data-rc-order",S="data-rc-priority",_="rc-util-key",h=new Map;function v(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function M(e,t){if(!e||!t)return!1;if(e.contains)return e.contains(t);let n=t;for(;n;){if(n===e)return!0;n=n.parentNode}return!1}function I({mark:e}={}){return e?e.startsWith("data-")?e:`data-${e}`:_}function C(e){return e.attachTo?e.attachTo:document.querySelector("head")||document.body}function D(e){return e==="queue"?"prependQueue":e?"prepend":"append"}function w(e){return Array.from((h.get(e)||e).children).filter(t=>t.tagName==="STYLE")}function T(e,t={}){if(!v())return null;const{csp:n,prepend:r,priority:a=0}=t,o=D(r),c=o==="prependQueue",i=document.createElement("style");i.setAttribute(R,o),c&&a&&i.setAttribute(S,`${a}`),n!=null&&n.nonce&&(i.nonce=n.nonce),i.innerHTML=e;const s=C(t),{firstChild:l}=s;if(r){if(c){const u=(t.styles||w(s)).filter(d=>{if(!["prepend","prependQueue"].includes(d.getAttribute(R)))return!1;const p=Number(d.getAttribute(S)||0);return a>=p});if(u.length)return s.insertBefore(i,u[u.length-1].nextSibling),i}s.insertBefore(i,l)}else s.appendChild(i);return i}function L(e,t={}){let{styles:n}=t;return n||(n=w(C(t))),n.find(r=>r.getAttribute(I(t))===e)}function z(e,t){const n=h.get(e);if(!n||!M(document,n)){const r=T("",t);if(!r)return;const{parentNode:a}=r;h.set(e,a),e.removeChild(r)}}function Q(e,t,n={}){var s;if(!v())return null;const r=C(n),a=w(r),o={...n,styles:a};z(r,o);const c=L(t,o);if(c)return(s=o.csp)!=null&&s.nonce&&c.nonce!==o.csp.nonce&&(c.nonce=o.csp.nonce),c.innerHTML!==e&&(c.innerHTML=e),c;const i=T(e,o);return i==null||i.setAttribute(I(o),t),i}function k(e){var t;return(t=e==null?void 0:e.getRootNode)==null?void 0:t.call(e)}function B(e){const t=k(e);return typeof ShadowRoot<"u"&&t instanceof ShadowRoot?t:null}const $={};function H(e,t){e||$[t]||($[t]=!0)}function Y(e){return e.replace(/-(.)/g,(t,n)=>n.toUpperCase())}function A(e,t){H(e,`[@ant-design/icons] ${t}`)}function m(e){return e!==null&&typeof e=="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(typeof e.icon=="object"||typeof e.icon=="function")}function N(e={}){return Object.keys(e).reduce((t,n)=>{const r=e[n];switch(n){case"class":t.className=r,delete t.class;break;default:delete t[n],t[Y(n)]=r}return t},{})}function y(e,t,n){return n?x.createElement(e.tag,{key:t,...N(e.attrs),...n},(e.children||[]).map((r,a)=>y(r,`${t}-${e.tag}-${a}`))):x.createElement(e.tag,{key:t,...N(e.attrs)},(e.children||[]).map((r,a)=>y(r,`${t}-${e.tag}-${a}`)))}const q=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin {
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,K=e=>{const{csp:t,prefixCls:n,layer:r,zeroRuntime:a}=f.useContext(E);let o=q;n&&(o=o.replace(/anticon/g,n)),r&&(o=`@layer ${r} {
${o}
}`),f.useEffect(()=>{if(a)return;const c=e.current,i=B(c);Q(o,"@ant-design-icons",{prepend:!r,csp:t,attachTo:i})},[])},O=e=>{const{icon:t,className:n,onClick:r,style:a,primaryColor:o,secondaryColor:c,...i}=e,s=f.useRef(null);if(K(s),A(m(t),`icon should be icon definiton, but got ${typeof t}`),!m(t))return null;const l=t;return y(l.icon,`svg-${l.name}`,{className:n,onClick:r,style:a,"data-icon":l.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",...i,ref:s})};O.displayName="IconReact";function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}const G=f.forwardRef((e,t)=>{const{className:n,icon:r,spin:a,rotate:o,tabIndex:c,onClick:i,twoToneColor:s,...l}=e,{prefixCls:u="anticon",rootClassName:d}=f.useContext(E);if(A(m(r),`icon should be icon definiton, but got ${typeof r}`),!m(r))return null;const p=j(d,u,{[`${u}-${r.name}`]:!!r.name,[`${u}-spin`]:!!a||r.name==="loading"},n);let g=c;g===void 0&&i&&(g=-1);const P=o?{msTransform:`rotate(${o}deg)`,transform:`rotate(${o}deg)`}:void 0;return f.createElement("span",b({role:"img","aria-label":r.name},l,{ref:t,tabIndex:g,onClick:i,className:p}),f.createElement(O,{icon:r,style:P}))});export{G as I};
