import m from 'mithril'
import 'drag-drop-webkit-mobile'

window.addEventListener('touchmove', () => {})

const state = {
  order: [
    'ACFEEAC8-595B-4831-9566-AF3621A4E465',
    '75337580-57AB-4248-8983-24BB88025970',
    '6D2E2793-5B05-4AF3-B7A9-3F54D8BA1FFA',
    '0478EEE2-ADFC-4D4D-9F30-47DE019CBFB5',
  ],
  notes: {
    'ACFEEAC8-595B-4831-9566-AF3621A4E465': {
      id: 'ACFEEAC8-595B-4831-9566-AF3621A4E465',
      text: 'abcd'
    },
    '6D2E2793-5B05-4AF3-B7A9-3F54D8BA1FFA': {
      id: '6D2E2793-5B05-4AF3-B7A9-3F54D8BA1FFA',
      text: 'lol'
    },
    '0478EEE2-ADFC-4D4D-9F30-47DE019CBFB5': {
      id: '0478EEE2-ADFC-4D4D-9F30-47DE019CBFB5',
      text: 'asfs agasgasgas gasg'
    },
    '75337580-57AB-4248-8983-24BB88025970': {
      id: '75337580-57AB-4248-8983-24BB88025970',
      text: ''
    },
  },
  draggedNoteId: null,
}

function moveNoteIntoPlaceOfAnother (noteId, anotherId) {
  const noteIndex = state.order.indexOf(noteId)
  const anotherIndex = state.order.indexOf(anotherId)
  if (anotherIndex < noteIndex) {
    return state.order
      .slice(0, anotherIndex)
      .concat([noteId])
      .concat(state.order.slice(anotherIndex, noteIndex))
      .concat(state.order.slice(noteIndex + 1))
  } else if (anotherIndex > noteIndex) {
    return state.order
      .slice(0, noteIndex)
      .concat(state.order.slice(noteIndex + 1, anotherIndex + 1))
      .concat([noteId])
      .concat(state.order.slice(anotherIndex + 1))
  } else {
    return state.order
  }
}

const app = {
  view: () => {
    return m('div',
      {style: {
        width: '100%',
      }},
      state.order.map(id => state.notes[id]).map((note, i) =>
        m('div',
          {
            style: {
              minHeight: '1em',
              display: 'flex',
              padding: '0.3em 0',
              boxShadow: note.id === state.draggedNoteId ? '0 0 1em lightgray' : null,
            },
            ondragover: (e) => e.preventDefault(),
            ondrop: e => {
              if ([...e.dataTransfer.types].includes('text/x-note-id')) {
                e.preventDefault()
                e.dataTransfer.dropEffect = "move"
                state.order = moveNoteIntoPlaceOfAnother(
                  e.dataTransfer.getData('text/x-note-id'),
                  note.id
                )

                state.draggedNoteId = null
              }
            },
            ondragenter: e => {
              if ([...e.dataTransfer.types].includes('text/x-note-id')) {
                e.preventDefault()
                e.dataTransfer.dropEffect = "move"
                state.order = moveNoteIntoPlaceOfAnother(
                  state.draggedNoteId,
                  note.id
                )
              }
            },
          },
          m('textarea',
            {
              style: {
                border: 'none',
                fontSize: '1em',
                width: '90%',
                height: '100%',
                overflow: 'hidden',
                flex: 'auto',
                outline: 'none',
                resize: 'none',
                padding: '1em',
                backgroundColor: 'rgba(0,0,0,0)',
              },
              oninput: function (e) {
                state.notes[note.id].text = e.target.value
                e.target.style.minHeight = `${e.target.value.split('\n').length*1.15}em`
              },
            },
            note.text
          ),
          m('div',
            {
              draggable: true,
              'data-note-id': note.id,
              style: {
                flex: 'auto vertical',
                width: '10%',
                fontSize: '3em',
                alignSelf: 'center',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                textAlign: 'center',
              },
              ondragstart: e => {
                state.draggedNoteId = note.id
                e.dataTransfer.setData('text/x-note-id', note.id)
                e.dataTransfer.effectAllowed = 'move'
              },
              onclick: () => console.log('click')
            },
            '≡'
          )
        )
      )
    )
  }
}

m.mount(document.getElementById('app'), app)
