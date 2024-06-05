import { Plugin, OnLoadOptions } from 'esbuild'

/**
 * Plugin options.
 */
export interface EsbuildPluginLodashOptions extends OnLoadOptions {
  /**
   * If `true`, the plugin will append `.js` to the end of CommonJS lodash imports. Defaults to
   * `true`.
   */
  appendJsExtension: boolean
  /**
   * Specifies lodash package to use in output. Can be either `lodash` or `lodash-es`. Defaults to
   * `lodash`.
   */
  outputLodashPackage: 'lodash' | 'lodash-es'
}

/**
 * Returns esbuild plugin that transforms `lodash` imports.
 *
 * @param  {EsbuildPluginLodashOptions}  options  Plugin options
 * @return {Plugin}                      Returns esbuild plugin.
 */
export function transformLodashPlugin(options?: EsbuildPluginLodashOptions): Plugin
