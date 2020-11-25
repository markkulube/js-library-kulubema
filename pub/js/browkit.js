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

          const listItm = document.createElement('div')
          listItm.className = palette_tool.class_name
          listItm.innerText = palette_tool.inner_text
          listItm.onclick = palette_tool.display_fcn
          ulist.appendChild(listItm)

       });

        palette.appendChild(ulist) 

        const containerDiv = document.createElement('div')
        containerDiv.className = "browkit_container"
        containerDiv.id = 'browkit_container'
        containerDiv.appendChild(palette)
        
        document.querySelector('body').appendChild(containerDiv)
        const container = document.querySelector('.browkit_container');
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
