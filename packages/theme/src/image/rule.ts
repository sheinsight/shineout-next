const imageRules = {
  shape: [
    ['circle', 'rounded', 'thumbnail'],
    ['border-radius', 'border-color'],
  ],
  status: [
    ['placeholder', 'error'],
    ['background-color', 'font-color', 'font-size'],
  ],
  group: [['group'], ['nearly-margin']],
  mask: [['mask'], ['background-color']],
  default: [[''], ['background-color']],
};

module.exports = {
  imageRules,
};
