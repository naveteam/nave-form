import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer'
import { eslint } from 'rollup-plugin-eslint'
import pkg from './package.json'

export default {
  input: './src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],
  plugins: [
    external(),
    postcss(),
    eslint({
      fix: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['cloneElement', 'createContext', 'Component', 'createElement'],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef', 'Memo', 'isFragment'],
        'node_modules/prop-types/index.js': ['elementType']
      }
    }),
    image(),
    visualizer()
  ]
}
