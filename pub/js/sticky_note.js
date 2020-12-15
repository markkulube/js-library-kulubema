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

        

        const note = document.createElement('div')
        note.className = "note"
        note.id = "note"
        const a = document.createElement('a')
        a.className ='button remove'
        a.addEventListener('click', (e) => {
                                  e.preventDefault
                                  a.parentElement.parentElement.style.display = 'none'
                                  const notes = document.getElementsByClassName('noteItem')
                                  let hidden = []
                                  for (let index = 0; index < notes.length; index++) {
                                    const element = notes[index];
                                    if(element.style.display === 'none') {
                                          hidden.push(hidden)
                                    }
                                  }
                  
                                  if (hidden.length === notes.length) {
                                    document.getElementById('show_notes').style.display = 'block'
                                    document.getElementById('hide_notes').style.display = 'none'
                                  }
                                    
                                  })
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

        const mydiv = document.createElement("div")
        mydiv.id = "mydiv_sticky"
        mydiv.className = "noteItem all-tools"
        /* const mydivheader = document.createElement("div")
        mydivheader.id = "mydivheader"
        mydiv.appendChild(mydivheader)
        const mydivheadertext = document.createTextNode("Drag Text")
        mydivheader.appendChild(mydivheadertext)
        const mydivtext = document.createTextNode("My Div Text") */

        mydiv.style.backgroundColor = 'rgb(23, 132, 196)'
        if (((noteNum-1)%4)===1) {
          mydiv.style.backgroundColor = '#faaaca'
          note.style.backgroundColor = '#69f098'
        } else if(((noteNum-1)%4)===2) {
          mydiv.style.backgroundColor = '#69f098'
          note.style.backgroundColor = 'hsl(14, 88%, 45%)'
        } else if(((noteNum-1)%4)===3) {
          mydiv.style.backgroundColor = 'hsl(14, 88%, 45%)'
          note.style.backgroundColor = '#b83f1a'
        } else {
          mydiv.style.backgroundColor = 'rgb(23, 132, 196)'
        }

        mydiv.style.border = '10px solid rgba(107, 17, 119, 0.438)'
        mydiv.style.left = (278 + noteNum*10 + 10) + 'px'
        mydiv.style.top = (noteNum*10 + 10) + 'px'
        mydiv.style.position = 'absolute'
        mydiv.style.cursor = 'move'
        mydiv.appendChild(note)
        dragElement(mydiv)

        let container
        if (document.getElementById('sticky_container') === null) {
          container = document.createElement('div')
          container.className = 'sticky_container'
          container.id = 'sticky_container'
          document.querySelector('body').appendChild(container)
        } else {
          container = document.getElementById('sticky_container')
        }

        container.appendChild(mydiv)

        this.sticky_notes.push(note)
	}
}