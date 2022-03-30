const addbtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notesArray'))
if (notes) {
    notes.forEach(note => addNewNote(note))
}

addbtn.addEventListener('click', () => addNewNote(''))

function addNewNote(text = "") {
        
        const note = document.createElement('div')
        note.classList.add('note-container')
    
        note.innerHTML = 
        `<div class="tools">
            <button class="edit"> <i class="fas fa-edit"></i></button>
            <button class="delete">  <i class="fas fa-trash-alt"></i></button>
        </div>
    
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea id="textarea" class="${text ? "hidden" : ""}"></textarea>
        `

        const delbtn = note.querySelector('.delete')
        const editbtn = note.querySelector('.edit')
        const textArea = note.querySelector('textarea')
        const main = note.querySelector('.main')

        textArea.value = text
        main.innerHTML = marked(text)
       
        delbtn.addEventListener('click', delNote)
        function delNote() {
            note.remove()
            //the fact that setLS() uses a forEach for every textarea
            //makes the removing easier - removed from the DOM meaning 
            //remove from LS via setLS() (which in this case updates the dom).

            setLS()
        }        
        
        editbtn.addEventListener('click', toggle)
        function toggle() {
            main.classList.toggle('hidden')
            textArea.classList.toggle('hidden')
        }        
        
        textArea.addEventListener('input', (e) => {
            const inputValue = e.target.value
            main.innerHTML = marked(inputValue)

            setLS()
        })

        function setLS() {
            const textAreas = document.querySelectorAll('textarea')
            const notesArray = []

            textAreas.forEach(note => notesArray.push(note.value))

            localStorage.setItem('notesArray', JSON.stringify(notesArray))

        }

        document.body.appendChild(note)

}


