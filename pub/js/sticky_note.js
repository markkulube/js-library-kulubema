function newSticky (e) {
    const sticky_note = new StickyNote()
    sticky_note.makeStickyNote()
    if (document.getElementsByClassName('note').length === 1) {
      document.getElementById('hide_notes').style.display = 'block'
      //document.getElementById('show_notes').style.display = 'block'
    }

}

function hideSticky (e) {
    const notes = document.getElementsByClassName('noteItem')
    let numNotes = 0
    if(notes !== null) {
        numNotes = notes.length
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            note.style.display = 'none'
        }
    }
    document.getElementById('show_notes').style.display = 'block'
    document.getElementById('hide_notes').style.display = 'none'
}

function showSticky (e) {
    const notes = document.getElementsByClassName('noteItem')
    let numNotes = 0
    if(notes !== null) {
        numNotes = notes.length
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            note.style.display = 'block'        
        }
    }

    document.getElementById('show_notes').style.display = 'none'
    document.getElementById('hide_notes').style.display = 'block'
}

function displayStickyButtons () {
    if (document.querySelector('#board') === null) {
        const buttonBlock = document.createElement('div')
        buttonBlock.id = 'board'
        buttonBlock.className = 'all-tools'
        /* const buttonStr = '<div id="board" class="all-tools">'
        + '<a onclick="newSticky()" class="button" id="add_new">New Note</a>'
        + '<a onclick="hideSticky()" class="button" id="hide_notes">Hide Notes</a>'
        + '<a onclick="showSticky()" class="button" id="show_notes">Show Notes</a>'
        + '</div>' */

        const buttonStr = '<a onclick="newSticky()" class="button" id="add_new">New Note</a>'
        + '<a onclick="hideSticky()" class="button" id="hide_notes">Hide Notes</a>'
        + '<a onclick="showSticky()" class="button" id="show_notes">Show Notes</a>'
        buttonBlock.innerHTML = buttonStr
        document.querySelector('body').prepend(buttonBlock)
    }

    document.getElementById('board').style.display = 'block'
    const allTool = document.getElementsByClassName('noteItem')
    for (let index = 0; index < allTool.length; index++) {
        const tool = allTool[index];
        tool.style.display = 'block'
        
    }

    if(document.getElementsByClassName('note').length === 0) {
      document.getElementById('hide_notes').style.display = 'none'
      document.getElementById('show_notes').style.display = 'none'
    }
}

function StickyNote() {
	// the constructor function shouhld instantiate any variables that
	//  each Circle Generator instance should have a unique version of.
	//  In this case, each CG should have its own array of circles separate from
	//  other CGs.
	this.sticky_notes = []
	// this..
	// this.. (any values you need for each 'instance' of this library)
}

// For funcionality and values common to all CircleGenerators,
//  we can add to the prototype property of the constructor.
StickyNote.prototype = {

    
	makeStickyNote: function() {

        /*
             var noteTemp =  '<div class="note">'
				+	'<a href="javascript:;" class="button remove">X</a>'
				+ 	'<div class="note_cnt">'
				+		'<textarea class="title" placeholder="Enter note title"></textarea>'
				+ 		'<textarea class="cnt" placeholder="Enter note description here"></textarea>'
				+	'</div> '
				+'</div>';
         */
        let noteNum
        const noteList = document.getElementsByClassName('note')
        if (noteList !== null) {
            noteNum = noteList.length + 1
        } else {
            noteNum = 1
        }

/*         width: 350px;
        height: 350px;
        background-color: rgb(23, 132, 196);
        border: 10px solid rgba(107, 17, 119, 0.438);
        touch-action: none;
        user-select: none;
 */     
        const item = document.createElement('div')
        item.className = 'noteItem all-tools'
        item.id = 'item' + noteNum
        item.style.width = '350px'
        item.style.height =  '350px'
        item.style.backgroundColor = 'rgb(23, 132, 196)'
        item.style.border = '10px solid rgba(107, 17, 119, 0.438)'
        item.style.left = (250 + noteNum*10) + 'px'
        item.style.top = (noteNum*10) + 'px'
        item.style.position = 'absolute'
       /*  item.style.cursor = 'move' */

        const note = document.createElement('div')
        note.className = "note"
        const a = document.createElement('a')
        a.className ='button remove'
        note.appendChild(a)
        const note_cnt = document.createElement('div')
        note_cnt.className = 'note_cnt'
        const title = document.createElement('textarea')
        title.className = 'title'
        const titleText = document.createTextNode('Enter note title')
        title.appendChild(titleText)
        note_cnt.appendChild(title)
        const cnt = document.createElement('textarea')
        cnt.className = 'cnt'
        const cntText = document.createTextNode('textarea')
        cnt.appendChild(cntText)
        note_cnt.appendChild(cnt)
        note.appendChild(note_cnt)

        item.appendChild(note)
        
        let container = document.querySelector("#container3");
        container.appendChild(item)
        let dragItem = item;
        
    
        let active = false;
        let currentX, currentY, initialX, initialY;
        let xOffset = 0;
        let yOffset = 0;
    
        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);
    
        container.addEventListener("mousedown", dragStart, false);
        container.addEventListener("mouseup", dragEnd, false);
        container.addEventListener("mousemove", drag, false);
    
        function dragStart(e) {
          if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
          } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
          }
    
          if (e.target === dragItem) {
            active = true;
          }
        }
    
        function dragEnd(e) {
          initialX = currentX;
          initialY = currentY;
    
          active = false;
        }
    
        function drag(e) {
          if (active) {
          
            e.preventDefault();
          
            if (e.type === "touchmove") {
              currentX = e.touches[0].clientX - initialX;
              currentY = e.touches[0].clientY - initialY;
            } else {
              currentX = e.clientX - initialX;
              currentY = e.clientY - initialY;
            }
    
            xOffset = currentX;
            yOffset = currentY;
    
            setTranslate(currentX, currentY, dragItem);
          }
        }
    
        function setTranslate(xPos, yPos, el) {
          el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }

        this.sticky_notes.push(note)
        
	}

}


