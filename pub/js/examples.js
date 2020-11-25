/* JS Library usage examples */
"use strict";
console.log('----------')
console.log('SCRIPT: Examples of using our libraries')
console.log('In general, we should have the code that uses our libraries separate from the actual library code.')

const paletteTools = ['calculator', 'stick_notes']
// Circle Generator
const paletteMaker = new PaletteMaker(paletteTools)
paletteMaker.makePaletteBase()
//paletteMaker.changePalettesColor()