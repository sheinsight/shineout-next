const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const { compileContent, formatApi, formatExamples, formatGuides, capitalizeFirstLetter } = require('./doc-markdown')

const targetPath = 'https://sodoc.sheincorp.cn/api/public/saveEmbeddings'
const shineoutDir = path.join(__dirname, '../packages', 'shineout', 'src');
const urlBase = 'http://localhost:2333/#/cn/component/shineout/'

const url = (key, tabType) => `${urlBase}/${key}?tab=${tabType}`

const formatData = () => {
  const conpomentMap = compileContent(shineoutDir);
  if (!conpomentMap) return;

  const result = []

  Object.entries(conpomentMap).forEach(([key, value]) => {
    const api = value.api;
    const { describe = {}, examples = [], guides = {} } = value.content || {};
    const apiResult = formatApi(api);
    const examplesResult = formatExamples(examples, key);
    const guidesResult = formatGuides(guides);

    result.push({
      title: `${capitalizeFirstLetter(key)}-examples`,
      contents: describe?.cn + '\n' + examplesResult.join('\n'),
      address: url(capitalizeFirstLetter(key), 'examples')
    })
    result.push({
      title: `${capitalizeFirstLetter(key)}-api`,
      contents: apiResult.join('\n'),
      address: url(capitalizeFirstLetter(key), 'api')
    })
    result.push({
      title: `${capitalizeFirstLetter(key)}-guide`,
      contents: guidesResult.join('\n'),
      address: url(capitalizeFirstLetter(key), 'guide')
    })
  })

  return {
    columnId: '',
    version: {
      version: package.version,
      description: ''
    },
    data: result,
    token: ''
  }
}

const requestToServer = (data) => {
  // send data to server

}
console.log(formatData())
