import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends Component {
  state = {
    error: null,
    name: {
        value: '',
        touched: false
    },
    folderId: {
        value: '',
        touched: false
    },
    content: {
        value: '',
        touched: false
    },
}
  static contextType = ApiContext;
  updateName(name) {
    this.setState({name: {value: name}});
  }
  updateContent(content) {
    this.setState({content: {value: content}});
  }
  updateFolder(folderId) {
    this.setState({name: {value: folderId}});
  }
      
  handleSubmit = e => {
    e.preventDefault()
    const { name, content, folderId } = this.state;
    const note = {
      
      name: name.value,
      modified: `${Date.now()}`,
      folderId: folderId.value,
      content: content.value
  }
  this.setState({error:null})
  console.log(note);
   
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })

      .then(note => {
        name.value = '';
        content.value = '';
        folderId.value = '';
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
AddNote.propTypes = {
  history:PropTypes.shape({
      push: PropTypes.func,
  })
};
