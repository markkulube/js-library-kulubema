// A javascript library that renders various tools in the
// browser like a calculator, stick notes
function PaletteMaker(paletteTools) {

	this.paletteTools = paletteTools

}

// For funcionality and values common to all PaletteMaker,
//  we can add to the prototype property of the constructor.
PaletteMaker.prototype = {

	// Every PM will make use of the same makePaletteBase()
	makePaletteBase: function() {
        const palette = document.createElement('div')
        palette.id = "palette"
        palette.className = "palette-class"

        const ulist = document.createElement('div')
        ulist.className = "tool-box"
        ulist.style.fontFamily = "Lato", "sans-serif"

        paletteTools.forEach(palette_tool => {

           switch (palette_tool) {
                case "calculator":
                    const listItm1 = document.createElement('div')
                    listItm1.className = "tool"
                    listItm1.innerText = "Caculator"
                    listItm1.onclick = (e) => { 
                                        e.preventDefault
                                        displayCalculator()
                                    }
                    ulist.appendChild(listItm1)
                    break;
                case "stick_notes":
                    const listItm2 = document.createElement('div')
                    listItm2.className = "tool"
                    listItm2.innerText = "Sticky Note"
                    listItm2.onclick = (e) => { 
                        e.preventDefault
                        displayStickyButtons()
                    }
                    ulist.appendChild(listItm2)
                    break;
           
               default:
                   break;
           }
       });

        palette.appendChild(ulist) 

        const containerDiv = document.createElement('div')
        containerDiv.className = "container"
        containerDiv.id = 'container'
        containerDiv.appendChild(palette)
        
        document.querySelector('body').appendChild(containerDiv)
        const container = document.querySelector('.container');
        container.addEventListener('mousedown', userPressed);

        function userPressed(event) {

            const allTool = document.getElementsByClassName('all-tools')
            for (let index = 0; index < allTool.length; index++) {
                const tool = allTool[index];
                tool.style.display = 'none'
                
            }
        };

	}
}



/* const containerDiv = document.createElement('div')
containerDiv.className = "container"
const boxDiv = document.createElement('div')
boxDiv.className = 'box'
containerDiv.appendChild(boxDiv)
document.querySelector('body').appendChild(containerDiv)
const container = document.querySelector('.container');
container.addEventListener('pointerdown', userPressed, { passive: true });

var element, bbox, startX, startY;

function userPressed(event) {
  element = event.target;
  if (element.classList.contains('box')) {
    startX = event.clientX;
    startY = event.clientY;
    bbox = element.getBoundingClientRect();
    container.addEventListener('pointermove', userMoved, { passive: true });
    container.addEventListener('pointerup', userReleased, { passive: true });
    container.addEventListener('pointercancel', userReleased, { passive: true });
  };
};

function userMoved(event) {
  let deltaX = event.clientX - startX;
  let deltaY = event.clientY - startY;
  element.style.left = bbox.left + deltaX + "px";
  element.style.top = bbox.top + deltaY + "px";
};

function userReleased(event) {
  container.removeEventListener('pointermove', userMoved);
  container.removeEventListener('pointerup', userReleased);
  container.removeEventListener('pointercancel', userReleased);
};  */