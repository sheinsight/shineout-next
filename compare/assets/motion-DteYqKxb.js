const $=a=>({animationDuration:a,animationFillMode:"both"}),r=a=>({animationDuration:a,animationFillMode:"both"}),c=(a,t,i,n,o=!1)=>{const e=o?"&":"";return{[`
      ${e}${a}-enter,
      ${e}${a}-appear
    `]:Object.assign(Object.assign({},$(n)),{animationPlayState:"paused"}),[`${e}${a}-leave`]:Object.assign(Object.assign({},r(n)),{animationPlayState:"paused"}),[`
      ${e}${a}-enter${a}-enter-active,
      ${e}${a}-appear${a}-appear-active
    `]:{animationName:t,animationPlayState:"running"},[`${e}${a}-leave${a}-leave-active`]:{animationName:i,animationPlayState:"running",pointerEvents:"none"}}};export{c as i};
