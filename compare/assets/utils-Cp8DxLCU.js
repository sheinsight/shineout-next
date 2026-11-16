import{c as s}from"./config-BV45PSQz.js";var f={},p={sm:"568",md:"768",lg:"992",xl:"1200"},o=s.prefix+"-grid",u=s.prefix+"-grid-full",m="md";function d(t,r){if(!document.head.querySelector("#"+r)){var i=document.createElement("style");i.type="text/css",i.id=r,i.innerHTML=t,document.head.appendChild(i)}}function g(t,r,i){var e=p[i],n="@media screen and (min-width: "+e+"px) { ."+r+"{width: "+t+"%} }";d(n,r)}function h(t,r,i){var e=p[i],n="@media screen and (min-width: "+e+"px) { ."+r+"{margin-left: "+t+"%} }";d(n,r)}function l(t,r,i){var e=t,n=i||m;if(!e||e<=0)return"";e>1&&(e=1),e=(e*100).toFixed(4),e=e.substr(0,e.length-1);var a=s.prefix+"-"+r+"-"+n+"-"+e.replace(".","-");return f[a]||(r==="grid"?g(e,a,n):h(e,a,n),f[a]=!0),a}function C(t){var r=t;if(!r)return"";typeof r=="number"&&(r={width:r});var i=r,e=i.width,n=i.offset,a=i.responsive,v=l(e,"grid",a),c=l(n,"offset",a);return o+" "+u+" "+v+" "+c}function x(){var t=[];t.push(`
.`+o+` {
  position: relative;
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  box-sizing: border-box;
}`),t.push("."+u+"{width:100%}"),d(t.join(""),o)}x();export{C as g};
