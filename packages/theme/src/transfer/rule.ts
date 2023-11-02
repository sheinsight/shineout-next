const transferRules = {
  size: [
    ['', 'small', 'large'],
    ['font-size', 'header-height'],
  ],
  color: [
    ['', 'disabled'],
    ['border-color', 'font-color', 'icon-color'],
  ],
  radius: [['border-radius']],
  extra: [['header', 'footer', 'icon'], ['background-color']],
  nearly: [['icon'], ['nearly-margin']],
  item: [['item', 'checkbox'], ['hover'], ['background-color']],
};

module.exports = {
  transferRules,
};
