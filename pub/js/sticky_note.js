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
	//  each StickyNote instance should have a unique version of.
	//  In this case, each SN should have its own array of circles separate from
	//  other CGs.
	this.sticky_notes = []
	// this..
	// this.. (any values you need for each 'instance' of this library)
}

// For funcionality and values common to all StickNotes,
// we can add to the prototype property of the constructor.
StickyNote.prototype = {

    
	makeStickyNote: function() {

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
        // Implementation inspired by
        // https://codepen.io/edmondko/pen/udcHG
        const item_style = {
                    width: '375px',
                    height: '375px',
                    backgroundColor1: 'rgb(23, 132, 196)',
                    backgroundColor2: '#faaaca',
                    backgroundColor3: '#69f098',
                    backgroundColor4: 'hsl(14, 88%, 45%)',
                    border: '10px solid rgba(107, 17, 119, 0.438)',
                    left: (278 + noteNum*10 + 10) + 'px',
                    top: (noteNum*10 + 10) + 'px',
                    position: 'absolute',
                    cursor: 'move'
                          }

        const item = document.createElement('div')
        item.className = 'noteItem all-tools'
        item.id = 'item' + noteNum
        item.style.width = '375px'
        item.style.height =  '375px'
        item.style.backgroundColor = 'rgb(23, 132, 196)'
        if (((noteNum-1)%4)===1) {
          item.style.backgroundColor = '#faaaca'
        } else if(((noteNum-1)%4)===2) {
          item.style.backgroundColor = '#69f098'
        } else if(((noteNum-1)%4)===3) {
          item.style.backgroundColor = 'hsl(14, 88%, 45%)'
        } else {
          item.style.backgroundColor = 'rgb(23, 132, 196)'
        }

        item.style.border = '10px solid rgba(107, 17, 119, 0.438)'
        item.style.left = (278 + noteNum*10 + 10) + 'px'
        item.style.top = (noteNum*10 + 10) + 'px'
        item.style.position = 'absolute'
        item.style.cursor = 'move'

        const note = document.createElement('div')
        note.className = "note"
        const a = document.createElement('a')
        a.className ='button remove'
        note.appendChild(a)
        const note_cnt = document.createElement('div')
        note_cnt.className = 'note_cnt'
        const title = document.createElement('textarea')
        title.className = 'title'
        const titleText = document.createTextNode('Enter Note Title')
        title.appendChild(titleText)
        note_cnt.appendChild(title)
        const cnt = document.createElement('textarea')
        cnt.className = 'cnt'
        const cntText = document.createTextNode('Enter Note Details')
        cnt.appendChild(cntText)
        note_cnt.appendChild(cnt)
        note.appendChild(note_cnt)

        item.appendChild(note)

        let container
        if (document.getElementById('sticky_container') === null) {
          container = document.createElement('div')
          container.className = 'sticky_container'
          container.id = 'sticky_container'
          document.querySelector('body').appendChild(container)
        } else {
          container = document.getElementById('sticky_container')
        }

        container.appendChild(item)

        // Implementation inspired by
        // https://www.kirupa.com/html5/drag.htm
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