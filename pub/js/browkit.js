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
        palette.className = "palette-class sidebar"

        {/* <button class="openbtn" onclick="openNav()">☰ Open Sidebar</button> */}  
        const openNavButton = document.createElement('button')
        openNavButton.className = "openbtn"
        openNavButton.id = "openbtn"
        openNavButton.onclick = openNav
        const textNode = document.createTextNode('☰ Open Browkit')
        openNavButton.appendChild(textNode)
        document.querySelector('body').appendChild(openNavButton)

        {/* <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a> */}
        const closeNavLink = document.createElement('a')
        closeNavLink.href = "javascript:void(0)"
        closeNavLink.className = "closebtn"
        closeNavLink.onclick = closeNav
        closeNavLink.innerText = "×"

        palette.appendChild(closeNavLink)

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

        function openNav() {
            document.getElementById("palette").style.width = "250px";
            document.querySelector("body").style.marginLeft = "250px";
            document.getElementById("openbtn").innerText = '☰ Close Browkit'
        }
          
        function closeNav() {
            document.getElementById("palette").style.width = "0";
            document.querySelector("body").style.marginLeft= "0";
            document.getElementById("openbtn").innerText = '☰ Open Browkit'
        }

    }
}
