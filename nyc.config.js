const target = '**';
module.exports = {
  all: true,
  include: [
    `packages/base/src/**/`,
    `packages/shineout/src`,
    `packages/hooks/src/components/`,
    `packages/theme/src`,
    `packages/shineout-style/src`,
  ],
  exclude: [`packages/shineout/src/**/__test__`, `packages/shineout/src/**/__doc__`],
  reporter: ['json', 'html'],
  sourceMap: false,
  instrument: false,
  'temp-dir': 'cypress-coverage/.nyc_output',
  'report-dir': 'cypress-coverage',
  target,
};
