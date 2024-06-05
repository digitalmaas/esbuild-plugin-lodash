# Esbuild Lodash Transform Plugin

[![NPM version][version-badge]][npm-url]
[![NPM downloads][downloads-badge]][npm-url]
[![digitalmaas][dmaas-badge]][dmaas-url]

> An [esbuild](https://esbuild.github.io/) plugin that transforms [lodash](https://lodash.com/) imports.

## Installation

```bash
npm install @digitalmaas/esbuild-plugin-lodash --save-dev
```

## Setup

```js
import esbuild from 'esbuild'
import { transformLodashPlugin } from '@digitalmaas/esbuild-plugin-lodash'

await esbuild.build({
  /* all of your config */,
  plugins: [
    transformLodashPlugin({ /* options */ }),
  ]
})
```

## Usage

Having this input file:

```js
import { get, isEmpty } from 'lodash'

const something = {}

get(something)
isEmpty(something)
```

It will output this following file content:

```js
import get from 'lodash/get.js'
import isEmpty from 'lodash/isEmpty.js'

const something = {}

get(something)
isEmpty(something)
```

## Options

### `filter: RegExp`

You can specify your own `filter` as per according to esbuild docs [here][esbuild-onload]. Defaults to `/\.(js|cjs|mjs|ts|cts|mts|tsx)$/`.

### `namespace: string`

You can specify your own `namespace` as per according to esbuild docs [here][esbuild-onload].

### `appendJsExtension: boolean`

If `true`, the plugin will append `.js` to the end of CommonJS lodash imports. Defaults to `true`.

### `outputLodashPackage: string`

Specifies lodash package to use in output. Can be either `lodash` or `lodash-es`. Defaults to `lodash`.

## More Info

-   https://esbuild.github.io/
-   https://lodash.com/

## License

MIT License.

Complete license in [./LICENSE](./LICENSE) file.

[version-badge]: https://img.shields.io/npm/v/@digitalmaas/esbuild-plugin-lodash.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/@digitalmaas/esbuild-plugin-lodash.svg?style=flat-square
[dmaas-badge]: https://img.shields.io/badge/sponsored%20by-digitalmaas-green.svg?colorB=00CD98&style=flat-square
[npm-url]: https://www.npmjs.com/package/@digitalmaas/esbuild-plugin-lodash
[dmaas-url]: https://digitalmaas.com/
[esbuild-onload]: https://esbuild.github.io/plugins/#on-load-options
