import{_ as D}from"./extends-CF3RwP-h.js";import{c as l,d as I}from"./slicedToArray-Br1Nt6Eo.js";import{_ as b}from"./defineProperty-Bb2VVi7Q.js";import{_ as N}from"./objectWithoutProperties-BCNJXcVV.js";import{r as s,R as x}from"./registry-BT99pFa4.js";import{c as L}from"./index-CAK2nDKI.js";import{b as U,d as W,w as q,e as F}from"./useToken-CKGUVj2R.js";import{I as S}from"./CSSMotionList-BkqOy4Ku.js";import{_ as h}from"./toPropertyKey-DmnHUh_E.js";import{g as G}from"./shadow-smhd3i8u.js";function H(n){return n.replace(/-(.)/g,function(o,e){return e.toUpperCase()})}function J(n,o){q(n,"[@ant-design/icons] ".concat(o))}function _(n){return h(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(h(n.icon)==="object"||typeof n.icon=="function")}function k(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(o,e){var r=n[e];switch(e){case"class":o.className=r,delete o.class;break;default:delete o[e],o[H(e)]=r}return o},{})}function T(n,o,e){return e?x.createElement(n.tag,l(l({key:o},k(n.attrs)),e),(n.children||[]).map(function(r,a){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(a))})):x.createElement(n.tag,l({key:o},k(n.attrs)),(n.children||[]).map(function(r,a){return T(r,"".concat(o,"-").concat(n.tag,"-").concat(a))}))}function R(n){return U(n)[0]}function E(n){return n?Array.isArray(n)?n:[n]:[]}var K=`
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

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
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
`,M=function(o){var e=s.useContext(S),r=e.csp,a=e.prefixCls,c=e.layer,t=K;a&&(t=t.replace(/anticon/g,a)),c&&(t="@layer ".concat(c,` {
`).concat(t,`
}`)),s.useEffect(function(){var m=o.current,C=G(m);W(t,"@ant-design-icons",{prepend:!c,csp:r,attachTo:C})},[])},Q=["icon","className","onClick","style","primaryColor","secondaryColor"],u={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function V(n){var o=n.primaryColor,e=n.secondaryColor;u.primaryColor=o,u.secondaryColor=e||R(o),u.calculated=!!e}function X(){return l({},u)}var d=function(o){var e=o.icon,r=o.className,a=o.onClick,c=o.style,t=o.primaryColor,m=o.secondaryColor,C=N(o,Q),y=s.useRef(),f=u;if(t&&(f={primaryColor:t,secondaryColor:m||R(t)}),M(y),J(_(e),"icon should be icon definiton, but got ".concat(e)),!_(e))return null;var i=e;return i&&typeof i.icon=="function"&&(i=l(l({},i),{},{icon:i.icon(f.primaryColor,f.secondaryColor)})),T(i.icon,"svg-".concat(i.name),l(l({className:r,onClick:a,style:c,"data-icon":i.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},C),{},{ref:y}))};d.displayName="IconReact";d.getTwoToneColors=X;d.setTwoToneColors=V;function z(n){var o=E(n),e=I(o,2),r=e[0],a=e[1];return d.setTwoToneColors({primaryColor:r,secondaryColor:a})}function Y(){var n=d.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var Z=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];z(F.primary);var v=s.forwardRef(function(n,o){var e=n.className,r=n.icon,a=n.spin,c=n.rotate,t=n.tabIndex,m=n.onClick,C=n.twoToneColor,y=N(n,Z),f=s.useContext(S),i=f.prefixCls,g=i===void 0?"anticon":i,j=f.rootClassName,A=L(j,g,b(b({},"".concat(g,"-").concat(r.name),!!r.name),"".concat(g,"-spin"),!!a||r.name==="loading"),e),p=t;p===void 0&&m&&(p=-1);var $=c?{msTransform:"rotate(".concat(c,"deg)"),transform:"rotate(".concat(c,"deg)")}:void 0,P=E(C),w=I(P,2),B=w[0],O=w[1];return s.createElement("span",D({role:"img","aria-label":r.name},y,{ref:o,tabIndex:p,onClick:m,className:A}),s.createElement(d,{icon:r,primaryColor:B,secondaryColor:O,style:$}))});v.displayName="AntdIcon";v.getTwoToneColor=Y;v.setTwoToneColor=z;export{v as I};
