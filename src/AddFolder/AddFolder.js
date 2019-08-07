import React, { Component } from 'react'
//import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
//import config from '../config'
//import PropTypes from 'prop-types';

import './AddFolder.css'

export default class AddFolder extends Component {
  
  static contextType = ApiContext;
  render() {
    return (
      <form onSubmit={e => this.context.handleSave(e)}>
        <label htmlFor="folder-input">Folder Name: </label>
        <input
          type="text"
          name="newFolder"
          id="folder-input"
          placeholder="Not Important"
          className="form-input"
          aria-label="New folder name"
          aria-required="true"
          required
          onChange={e => this.context.updateUserInput(e.target.value)}
        />
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    );
  }
}
