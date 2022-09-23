import React from 'react';
import './App.css';


class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  fetch() {
    this.setState({ image: null });
    fetch('https://dalle-mini.amasad.repl.co/gen/' + this.props.text)
      .then(response => response.blob())
      .then(image => {
        this.setState({ image });
      });
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.fetch();
    }
  }

  render() {
    const { image } = this.state;
    return (
      <React.Fragment>
        {image ? <img src={URL.createObjectURL(image)} alt="random" /> : <div className="loader"></div>}
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', text: 'robot as a realistic scifi cyberpunk knight, closeup portrait art by donato giancola and greg rutkowski, vintage retro scifi, realistic face, digital art, trending on artstation, symmetry!!! ' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ text: this.state.value });
  }

  render() {
    console.log(this.state)
    return (<main>
      <div className='search'>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="robot as a realistic scifi cyberpunk knight, closeup portrait art by donato giancola and greg rutkowski, vintage retro scifi, realistic face, digital art, trending on artstation, symmetry!!! " />
        <button onClick={this.handleSubmit}>generate</button>
      </div>
      <div className="container"><Image text={this.state.text} /></div>
    </main>)
  }
}
