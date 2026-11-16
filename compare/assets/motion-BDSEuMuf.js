const t=a=>({animationDuration:a,animationFillMode:"both"}),p=(a,i,$,n,r=!1)=>{const e=r?"&":"";return{[`
      ${e}${a}-enter,
      ${e}${a}-appear
    `]:{...t(n),animationPlayState:"paused"},[`${e}${a}-leave`]:{...t(n),animationPlayState:"paused"},[`
      ${e}${a}-enter${a}-enter-active,
      ${e}${a}-appear${a}-appear-active
    `]:{animationName:i,animationPlayState:"running"},[`${e}${a}-leave${a}-leave-active`]:{animationName:$,animationPlayState:"running",pointerEvents:"none"}}};export{p as i};
