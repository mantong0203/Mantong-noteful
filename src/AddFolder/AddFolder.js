import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './AddFolder.css'

export default class AddFolder extends Component {
  state = {
    name: {
        value: '',
        touched: false,
    },
    error: null,
  }
  static contextType = ApiContext;
  updateName(name) {
    this.setState({name: {value: name}});
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name } = this.state;
    const note = {
        
        name: name.value,
    }
    this.setState({error:null})
    console.log(note);

    fetch(`${config.API_ENDPOINT}/folders`, {
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
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type="text" className="registration__control"
           name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
AddFolder.propTypes = {
  history:PropTypes.shape({
      push: PropTypes.func,
  })
};
