import m from 'mithril'

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
  }
}

const app = {
  view: () => {
    return m('div',
      {style: {
        width: '100%',
      }},
      state.order.map(id => state.notes[id]).map(note =>
        m('div',
          {style: {
            minHeight: '1em',
            borderBottom: '1px solid lightgray',
            display: 'flex',
          }},
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
              },
              oninput: function (e) {
                state.notes[note.id].text = e.target.value
                e.target.style.minHeight = `${e.target.value.split('\n').length*1.15}em`
              },
            },
            note.text
          ),
          m('button',
            {
              style: {
                flex: 'auto vertical',
                width: '10%',
                fontSize: '1em',
                height: '2em',
                alignSelf: 'center',
              },
            },
            '='
          )
        )
      )
    )
  }
}

m.mount(document.getElementById('app'), app)
