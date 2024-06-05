const fs = require('node:fs')
const path = require('node:path')

function transformLodashPlugin(options = {}) {
  const {
    filter = /\.(js|cjs|mjs|ts|cts|mts|tsx)$/,
    namespace,
    outputLodashPackage = 'lodash',
    appendJsExtension = true
  } = options
  return {
    name: 'lodash',
    setup(build) {
      build.onLoad({ filter, namespace }, async args => {
        const contents = await fs.promises.readFile(args.path, 'utf8')
        const extension = path.extname(args.path).replace('.', '')
        const loader = ['mjs', 'cjs'].includes(extension)
          ? 'js'
          : ['mts', 'cts'].includes(extension)
            ? 'ts'
            : extension

        const lodashImportRegex =
          /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g

        const lodashImports = contents.match(lodashImportRegex)
        if (!lodashImports) {
          return { loader, contents }
        }

        const destructuredImportRegex = /\{\s?(((\w+),?\s?)+)\}/g
        let finalContents = contents

        lodashImports.forEach(line => {
          // Capture content inside curly braces within imports
          // For example:
          //   import noop from 'lodash/noop';
          //   import { noop, isEmpty, debounce as _debounce } from 'lodash';
          const destructuredImports = line.match(destructuredImportRegex)
          if (!destructuredImports) {
            return
          }
          const importName = destructuredImports[0].replace(/[{}]/g, '').trim().split(', ')
          let result = ''
          const ext = appendJsExtension ? '.js' : ''
          importName.forEach(name => {
            const previousResult = `${result ? `${result}\n` : ''}`
            if (name.includes(' as ')) {
              const [realName, alias] = name.split(' as ')
              result = `${previousResult}import ${alias} from '${outputLodashPackage}/${realName}${ext}';`
            } else {
              result = `${previousResult}import ${name} from '${outputLodashPackage}/${name}${ext}';`
            }
          })

          finalContents = contents.replace(line, result)
        })

        return { loader, contents: finalContents }
      })
    }
  }
}

module.exports = { transformLodashPlugin }
