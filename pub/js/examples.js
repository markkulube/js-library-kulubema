/* JS Library usage examples */
"use strict";
console.log('----------')
console.log('SCRIPT: Examples of using our libraries')
console.log('In general, we should have the code that uses our libraries separate from the actual library code.')

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

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();