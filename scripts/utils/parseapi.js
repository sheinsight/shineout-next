const path = require('path');
const { Project } = require('ts-morph');
const fs = require('fs');

// 不解析的类型
const noParseNames = ['ObjectKey', 'DropdownNode', 'XhrResult', 'FileRecord'];
// 替换类型
const parseTypes = {
  'boolean | React.ReactChild | React.ReactFragment | React.ReactPortal': 'ReactNode',
  'string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal':
    'ReactNode',
  'React.ReactElement<any, string | React.JSXElementConstructor<any>>': 'ReactElement',
  KeygenResult: 'string | number',
};

function parseApi(pack, filePath) {
  const root = path.resolve(__dirname, '../../packages', `./${pack}`);
  const fp = path.resolve(root, filePath);
  const project = new Project({
    tsConfigFilePath: path.resolve(root, './tsconfig.json'),
  });

  const typeChecker = project.getTypeChecker();
  const pathMap = {};

  // 解析注释
  function parseDocTag(jtTags) {
    return jtTags.reduce(
      (r, tag) => ({
        ...r,
        [tag.getTagName()]: tag.getComment(),
      }),
      {},
    );
  }

  // 处理注释中的引号
  function convertQuotes(str = '') {
    return str.replaceAll('"', '\\"').replaceAll("'", '\\"').replace(/\n/g, '\\n');
  }

  // 属性的类型处理
  function replaceStr(str) {
    let result = str;
    Object.keys(parseTypes).forEach((item) => {
      result = result.replaceAll(item, parseTypes[item]);
    });
    return result
      .replaceAll('| undefined', '')
      .replaceAll('React.', '')
      .replace(/\r?\n|\r/g, '');
  }

  // 解析引用的接口类型
  function getInterfaceType(type) {
    const strArr = [];
    const properties = typeChecker.getPropertiesOfType(type.getType());
    properties.forEach((property) => {
      const isOptional = property.isOptional();
      const name = property.getName();
      const pt = property.getDeclarations()[0].getType().getText().replaceAll('| undefined', '');
      strArr.push(` ${name}${isOptional ? '?:' : ':'} ${pt}`);
    });

    return `{ ${strArr.join(',')} }`;
  }

  // 获取文件中的某个属性的类型
  function getPathType(pp, name) {
    let sourceFile;
    try {
      sourceFile = project.addSourceFileAtPath(pp.replace(/\/dist\/([a-z0-9-])+\//g, '/src/'));
    } catch (error) {
      console.log('getPathType 失败', pp, name);
    }
    const type = sourceFile.getTypeAlias(name) || sourceFile.getInterface(name);
    if (type && type.getTypeNode) {
      return type.getTypeNode().getText();
    }
    if (type && type.getProperties) {
      return getInterfaceType(type);
    }
    console.warn('获取类型失败', pp, name);
    console.warn(type && type.getStructure());

    return '';
  }

  // 处理 import 的类型
  function getImportType(text) {
    // eslint-disable-next-line
    const reg = /import\("([^"]+)"\)\.(\w+)(<[\w\[\]]+>)?(\[\])?/g;
    let currentMatch;
    let resultStr = text;
    do {
      currentMatch = reg.exec(text);
      if (currentMatch) {
        const str = currentMatch[0];
        const pp = currentMatch[1];
        const name = currentMatch[2];
        const fanXin = currentMatch[3] || '';
        const isArray = currentMatch[4] || '';
        // console.log(str, pp, name, fanXin, isArray)
        // 过滤掉 xxxProps 和 ObjectKey 等不需要继续计算的属性
        if (!name.endsWith('Props') && !name.endsWith('Ref') && !noParseNames.includes(name)) {
          if (!pathMap[name]) {
            pathMap[name] = {
              form: pp,
              type: getPathType(`${pp}.ts`, name),
            };
          }
          resultStr = resultStr.replace(
            str,
            isArray ? `(${pathMap[name].type})[]` : pathMap[name].type,
          );
        } else {
          resultStr = resultStr.replace(str, `${name}${fanXin}${isArray}`);
        }
      }
    } while (currentMatch !== null);
    if (reg.test(resultStr)) return getImportType(resultStr);
    return resultStr;
  }

  // 获取类型字符串
  function getTypeStr(override, type, optional) {
    if (override && override !== 'union') {
      return override;
    }
    let text = type.getText();
    if (override === 'union') {
      text = type
        .getUnionTypes()
        .map((t) => t.getText())
        .filter((item) => optional && item !== 'undefined')
        .join(' | ');
    }
    text = getImportType(text);
    text = replaceStr(text);
    return text;
  }

  function getResult(pp) {
    try {
      if (!fs.statSync(pp).isFile()) return [];
    } catch (e) {
      return [];
    }
    const sourceFile = project.addSourceFileAtPath(pp);
    // 获取所有类型别名和接口
    const typeAliasesAndInterfaces = sourceFile.getTypeAliases().concat(sourceFile.getInterfaces());
    const results = [];
    typeAliasesAndInterfaces.forEach((inter) => {
      const declarations = inter.getSymbol().getDeclarations();
      const InterfaceJsDocTags = declarations
        .map((declaration) => declaration.getJsDocs())
        .flat()
        .map((jsDoc) => jsDoc.getTags())
        .flat();
      const mainTags = parseDocTag(InterfaceJsDocTags);
      if (!mainTags.title) return;
      const item = {
        title: mainTags.title,
        subTitle: mainTags.subTitle,
        isDetail: mainTags.isDetail,
        properties: [],
        cn: convertQuotes(mainTags.cn),
        en: convertQuotes(mainTags.en),
        sort: mainTags.sort || '0',
        tag: {
          whenCn: convertQuotes(mainTags.whenCn),
          whenEn: convertQuotes(mainTags.whenEn),
        },
      };
      const type = inter.getType();
      // const typeArgs = interface.getTypeParameters().reduce((result, param) => {
      //   const paramDefault = param.getDefault()
      //   if (paramDefault) return { ...result, [param.getName()]: getImportType(paramDefault.getType().getText()) }
      //   return result
      // }, {})
      const properties = typeChecker.getPropertiesOfType(type);
      const lost = [];
      for (let jj = 0; jj < properties.length; jj++) {
        const property = properties[jj];
        const declarations1 = property.getDeclarations();
        const sourceFiles = declarations1.map((d) => d.getSourceFile().getFilePath());
        // 过滤掉 @types/react 中的属性 这些是原生属性比如 input 的 autoComplete
        if (sourceFiles.every((s) => s.includes('@types/react'))) continue;
        const propertyJsDocTags = parseDocTag(
          declarations1
            .map((d) => d.getJsDocs())
            .flat()
            .map((jsDoc) => jsDoc.getTags())
            .flat(),
        );
        if (propertyJsDocTags.private || propertyJsDocTags.deprecated) continue;
        if (!propertyJsDocTags.cn) {
          lost.push(property.getName());
        }

        const nodeType = declarations1[0].getType();
        const optional = property.isOptional();
        const typeText = getTypeStr(
          propertyJsDocTags.override,
          nodeType,
          optional,
          property.getName(),
        );
        const itemProperty = {
          name: property.getName(),
          tag: {
            cn: convertQuotes(propertyJsDocTags.cn),
            en: convertQuotes(propertyJsDocTags.en),
            default: convertQuotes(propertyJsDocTags.default),
            version: convertQuotes(propertyJsDocTags.version),
            whenCn: convertQuotes(propertyJsDocTags.whenCn),
            whenEn: convertQuotes(propertyJsDocTags.whenEn),
          },
          required: !optional,
          type: convertQuotes(typeText),
        };
        item.properties.push(itemProperty);
        // console.log('---------');
        // console.log(itemProperty.name, itemProperty.type, itemProperty.tag.cn);
      }
      if (lost.length) {
        console.warn(`${mainTags.title}缺失`, lost.join(','));
      }
      results.push(item);
    });
    return results;
  }

  return getResult(fp);
}

// const data = parseApi('shineout', './src/input/input.type.ts');

// console.log(data);
const ModuleMap = {
  List: 'DataList',
};

module.exports = {
  parseApi,
  ModuleMap,
};
