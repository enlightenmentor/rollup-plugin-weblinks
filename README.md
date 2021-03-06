# rollup-plugin-weblinks
Plugin for Rollup to bundle web-based resources


This is how you can use it:
```javascript
const rollup = require('rollup');
const weblinks = require('rollup-plugin-weblinks');

// see below for details on the options
const inputOptions = {
  input: 'https://raw.githubusercontent.com/enlightenmentor/pc-build/master/public/app.js',
  plugins: [ weblinks() ]
};
const outputOptions = {
  file: 'test/bundle.js',
  format: 'iife',
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
```
