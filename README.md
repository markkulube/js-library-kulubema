# browkit

## Landing Page: 
https://pure-lake-46085.herokuapp.com/index.html 

## Getting Started
Include the library scripts browkit.js, and any js files the library uses:  
  
```
<script defer type="text/javascript" src='js/calculator.js'></script>  
<script defer type="text/javascript" src='js/sticky_notes.js'></script>  
<script defer type="text/javascript" src='js/browkit.js'></script>  
<link rel="stylesheet" type="text/css" href="css/browkit.css"></link>
```  
  
Then include any javascript files that depend on and/or use the browkit.js lirbary:  
```
<script defer type="text/javascript" src='js/examples.js'></script>
```  
  
Then load any css that are used by the js scripts:  
```
<link rel="stylesheet" type="text/css" href="css/calculator.css"></link>  
<link rel="stylesheet" type="text/css" href="css/calculator.css"></link>  
<link rel="stylesheet" type="text/css" href="css/browkit.css"></link>
```  
  
Create an instance of the 'browkit' sidebar in examples.js  
```
const calc = {  
    tool_name: "calculator",  
    class_name: "tool",  
    inner_text: "Calculator",  
    display_fcn: displayCalculator  
}
  
  
const sticky_notes =  {  
                    tool_name: "sticky_notes",  
                    class_name: "tool",  
                    inner_text: "Sticky Notes",  
                    display_fcn: displayStickyButtons  
                }  
  
const paletteTools = []  
paletteTools.push(calc)  
paletteTools.push(sticky_notes)  
const paletteMaker = new PaletteMaker(paletteTools)  
paletteMaker.makePaletteBase()
```  
  
## API - Documentation:
https://pure-lake-46085.herokuapp.com/api-browkit.html 