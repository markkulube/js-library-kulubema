
/* JS Library */
"use strict"; // always need a semicolon before an IIFE

/* 
Wrap the code that creates your library in an Immediately-Invoked function expression (IIFE).
This allows you to do any setup necessary in this function scope and then only put on the
the global scope the variables needed for developers to access.  Prevents pollution of the 
global scope and conflicts with variables from other libraries, and gives some control over functionality access.
*/

// We use parameters to create *local* variables in the function, which are faster to lookup than globals, for performance.
// We can also name them something else - like `global` for the window object.
(function(global, document, $) { 
    let paletteOpen = false

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
        //document.querySelector('body').appendChild(openNavButton)
        document.querySelector('body').insertBefore(openNavButton, document.querySelector('#tab-code'))

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

        function userPressed() {

            const allTool = document.getElementsByClassName('all-tools')
            for (let index = 0; index < allTool.length; index++) {
                const tool = allTool[index];
                tool.style.display = 'none'
                
            }
        };

        // https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp
        // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapse_sidebar
        function openNav() {
            if (paletteOpen) {
                closeNav()
                userPressed()
            } else {
                document.getElementById("palette").style.width = "250px";
                document.querySelector("body").style.marginLeft = "250px";
                document.getElementById("openbtn").innerText = '☰ Close Browkit'
                document.getElementById("tab-code").style.display = 'block'
             
            }
            paletteOpen = !paletteOpen
            
        }
          
        function closeNav() {
            document.getElementById("palette").style.width = "0";
            document.querySelector("body").style.marginLeft= "0";
            document.getElementById("openbtn").innerText = '☰ Open Browkit'
            document.getElementById("tab-code").style.display = 'none'
            document.getElementById('js-tab-para').innerText = 'Click A Browkit Tool In Sidebar'
            document.getElementById('html-tab-para').innerText = 'Click A Browkit Tool In Sidebar'
            document.getElementById('css-tab-para').innerText = 'Click A Browkit Tool In Sidebar'
        }

    }
}

/* Can do all other library setup below without conflicting with the global namespace */
	// ...
	// ...

	// After setup:
	// Add the PaletteMaker to the window object if it doesn't already exist.
	global.PaletteMaker = global.PaletteMaker || PaletteMaker

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.