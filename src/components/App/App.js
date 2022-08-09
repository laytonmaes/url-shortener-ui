import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      errMessage: null
    }
  }

  componentDidMount() {
    getUrls()
    .then((data) => {
      console.log(data)
      this.setState({urls: data.urls})
    })
    .catch(err => {
      this.setState({...this.state, errMessage: `We are sorry, but something went wrong. ${err}`})
    })
  }
  
  getAgain = () => {
    getUrls()
    .then((data) => {
      console.log(data)
      this.setState({urls: data.urls})
    })
    .catch(err => {
      this.setState({...this.state, errMessage: `We are sorry, but something went wrong. ${err}`})
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm getAgain={this.getAgain}/>
        </header>
        {this.state.errMessage && <p>{this.state.errMessage}</p>}
        {!this.state.errMessage && 
        <UrlContainer urls={this.state.urls}/>
        }
      </main>
    );
  }
}

export default App;
