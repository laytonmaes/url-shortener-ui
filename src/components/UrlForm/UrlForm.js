import React, { Component } from 'react';
import { postUrl } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.state = {
      title: '',
      urlToShorten: '',
      errMessage: ""
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const urlBody = {
        title: this.state.title,
        long_url: this.state.urlToShorten
    }

    if(this.state.title.length > 0 && this.state.urlToShorten.length > 0){
      postUrl(urlBody)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        this.setState({...this.state, errMessage:`Sorry something went wrong and we were unable to send your url. ${err}`})
      })

      this.props.getAgain()
      this.clearInputs();
    } else {
      this.setState({...this.state, errMessage:"Please fill out the title and url fields"})
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: '', errMessage: ""});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />
        <p>{this.state.errMessage}</p>
        <button type="submit" onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
