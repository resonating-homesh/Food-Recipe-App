import React, { Component } from 'react'
import './App.css';

export default class Spinner extends Component {
  render() {
    return (
      <div>
          <img className='loader' src='loading.gif' alt="loading"/>
      </div>
    )
  }
}
