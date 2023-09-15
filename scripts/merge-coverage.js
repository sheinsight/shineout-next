/**
 * This script can merge the coverage reports from Cypress and Jest by testing-library into a single one
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');

const REPORTS_FOLDER = 'reports';
const FINAL_OUTPUT_FOLDER = 'coverage';

fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync('cypress-coverage/coverage-final.json', `${REPORTS_FOLDER}/from-cypress.json`);
fs.copyFileSync('coverage/coverage-final.json', `${REPORTS_FOLDER}/from-jest.json`);

fs.emptyDirSync('.nyc_output');
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

execSync(`nyc merge ${REPORTS_FOLDER} && mv coverage.json .nyc_output/out.json`, {
  stdio: 'inherit',
});
execSync(
  `nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER} --temp-dir ./.nyc_output`,
  {
    stdio: 'inherit',
  },
);
