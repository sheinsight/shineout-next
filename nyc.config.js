const target = '**';
module.exports = {
  all: true,
  include: [`packages/**`, `packages/shineout/src`],
  exclude: [`packages/shineout/src/**/__test__`],
  reporter: ['json', 'html'],
  sourceMap: false,
  instrument: false,
  'temp-dir': 'cypress-coverage/.nyc_output',
  'report-dir': 'cypress-coverage',
  target,
};
