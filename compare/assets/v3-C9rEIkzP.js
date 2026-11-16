import{j as e}from"./jsx-runtime-BxtGCiM5.js";import{p as t,C as i}from"./panel-et0WBjdG.js";import{B as o}from"./index-Y_EwlT0V.js";import"./registry-CoINQWyI.js";import"./normalize-C-iFbS0j.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-Dsqj8S3w.js";import"./createClass-D022HrCp.js";import"./toPropertyKey-DmnHUh_E.js";import"./inheritsLoose-B6jfs0L0.js";import"./setPrototypeOf-DgZC2w_0.js";import"./assertThisInitialized-B9jnkVVz.js";import"./toConsumableArray-Di4bH4Ci.js";import"./index-emrU1FF-.js";import"./index-NR0onkN-.js";const r=`
.bench-beam-host { position: relative; width: 360px; }
.bench-beam { opacity: 0; transition: opacity 0.2s ease-in-out; }
.bench-beam::before { animation-play-state: paused; }
.bench-beam-host:hover > .bench-beam { opacity: 1; }
.bench-beam-host:hover > .bench-beam::before { animation-play-state: running; }
`;function f(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:r}),e.jsx(o,{className:"bench-beam",children:e.jsxs("div",{className:"bench-beam-host",style:{...t,width:360},children:[e.jsx("strong",{children:"Hover preview"}),e.jsx("p",{style:{margin:"8px 0 0",color:i.subText},children:"The beam is visible while this container is hovered."})]})})]})}export{f as default};
