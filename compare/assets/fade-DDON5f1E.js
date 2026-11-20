import"./useToken-Dr6D6f3e.js";import"./registry-BHBdFNZN.js";import{K as a}from"./Keyframes-VcHHgFOx.js";import{i as r}from"./motion-DteYqKxb.js";const c=new a("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),m=new a("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),$=(t,o=!1)=>{const{antCls:e}=t,i=`${e}-fade`,n=o?"&":"";return[r(i,c,m,t.motionDurationMid,o),{[`
        ${n}${i}-enter,
        ${n}${i}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${n}${i}-leave`]:{animationTimingFunction:"linear"}}]};export{$ as i};
