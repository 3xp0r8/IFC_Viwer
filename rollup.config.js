import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/scene.js',
  output: {
    format: 'esm',
    file: 'dist/bundle.js',
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    "three",
    "three/examples/jsm/controls/OrbitControls",
    "web-ifc-three/IFCLoader",
    "web-ifc",
    "three/examples/js/libs/draco/draco_decoder",
    "three/examples/js/libs/draco/draco_wasm_wrapper",
  ]  
};
